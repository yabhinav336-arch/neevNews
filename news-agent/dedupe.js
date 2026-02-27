/**
 * Duplicate Detection — Local File Cache (ZERO Firestore reads)
 *
 * Uses a local JSON file to track every slug and sourceUrl we've
 * ever published. Duplicate checks happen entirely on disk/memory.
 *
 * On first-ever run (empty cache), seeds from Firestore once.
 * After that, Firestore is NEVER read for dedup again.
 */

const fs = require('fs');
const path = require('path');
const { collection, getDocs, query, limit } = require('firebase/firestore/lite');
const { db } = require('./firebaseClient');

const CACHE_DIR = path.join(__dirname, '.cache');
const CACHE_FILE = path.join(CACHE_DIR, 'published.json');
// Cap title history so we don't block new stories
// Lower = more articles can pass (today target 100–400)
const MAX_TITLES_FOR_SIMILARITY = 1200;

// ------------------------------------------------------------------
// Cache helpers
// ------------------------------------------------------------------

function ensureCacheDir() {
  if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });
}

function loadCache() {
  ensureCacheDir();
  if (!fs.existsSync(CACHE_FILE)) return { slugs: [], sourceUrls: [], titles: [] };
  try {
    const raw = fs.readFileSync(CACHE_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return { slugs: [], sourceUrls: [], titles: [] };
  }
}

function saveCache(data) {
  ensureCacheDir();
  fs.writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// ------------------------------------------------------------------
// One-time seed: if cache is empty, pull existing data from Firestore
// This is the ONLY time this module reads from Firestore.
// ------------------------------------------------------------------

async function seedCacheIfEmpty() {
  const cache = loadCache();
  if (cache.slugs.length > 0) return cache; // already seeded

  console.log('   📥 First run — seeding cache from Firestore (one-time)...');
  try {
    const snapshot = await getDocs(query(collection(db, 'news'), limit(1000)));
    snapshot.forEach((doc) => {
      const d = doc.data();
      if (d.slug) cache.slugs.push(d.slug);
      if (d.sourceUrl) cache.sourceUrls.push(d.sourceUrl);
      if (d.title) cache.titles.push(d.title.toLowerCase().trim());
    });
    saveCache(cache);
    console.log(`   ✅ Cache seeded with ${snapshot.size} existing articles`);
  } catch (err) {
    console.error('   ⚠️  Error seeding cache:', err.message);
  }
  return cache;
}

// ------------------------------------------------------------------
// Similarity
// ------------------------------------------------------------------

function calculateSimilarity(a, b) {
  if (!a || !b) return 0;
  const w1 = a.split(/\s+/);
  const w2 = b.split(/\s+/);
  const common = w1.filter((w) => w2.includes(w));
  const total = Math.max(w1.length, w2.length);
  return total === 0 ? 0 : common.length / total;
}

// ------------------------------------------------------------------
// Public API
// ------------------------------------------------------------------

/**
 * Filter out duplicates using the local cache.
 * Firestore reads: 0 (unless first-ever run).
 */
async function filterDuplicates(articles) {
  console.log('\n🔍 Checking for duplicates (local cache)...\n');

  const cache = await seedCacheIfEmpty();
  // Use only recent titles for similarity check so new stories can get through
  const recentTitles = cache.titles.slice(-MAX_TITLES_FOR_SIMILARITY);
  const slugSet = new Set(cache.slugs);
  const urlSet = new Set(cache.sourceUrls);

  const uniqueArticles = [];
  let dupCount = 0;

  for (const article of articles) {
    // Similarity threshold 0.82 to allow more unique articles (today target 100–400)
    const isDup =
      slugSet.has(article.slug) ||
      (article.sourceUrl && urlSet.has(article.sourceUrl)) ||
      recentTitles.some((t) => calculateSimilarity(article.title.toLowerCase().trim(), t) > 0.82);

    if (isDup) {
      console.log(`   ⏭️  Duplicate: ${article.title.substring(0, 55)}...`);
      dupCount++;
    } else {
      uniqueArticles.push(article);
      // Update in-memory sets so we don't duplicate within this batch
      slugSet.add(article.slug);
      cache.slugs.push(article.slug);
      if (article.sourceUrl) {
        urlSet.add(article.sourceUrl);
        cache.sourceUrls.push(article.sourceUrl);
      }
      cache.titles.push(article.title.toLowerCase().trim());
      console.log(`   ✅ New: ${article.title.substring(0, 55)}...`);
    }
  }

  // Keep title history capped so new stories can be published over time
  if (cache.titles.length > MAX_TITLES_FOR_SIMILARITY) {
    cache.titles = cache.titles.slice(-MAX_TITLES_FOR_SIMILARITY);
  }
  saveCache(cache);

  console.log(`\n📊 Dedup: ${articles.length} checked, ${dupCount} duplicates, ${uniqueArticles.length} new\n`);
  return uniqueArticles;
}

module.exports = { filterDuplicates };
