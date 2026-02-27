/**
 * Article Saver — ZERO Firestore reads
 *
 * Daily limit is tracked in a local file (not queried from Firestore).
 * Category limits are enforced in-memory.
 * The ONLY Firestore operation is addDoc (write).
 */

const fs = require('fs');
const path = require('path');
const { collection, addDoc, Timestamp } = require('firebase/firestore/lite');
const { db } = require('./firebaseClient');
const rssSources = require('./rssSources');

const CACHE_DIR = path.join(__dirname, '.cache');
const COUNTER_FILE = path.join(CACHE_DIR, 'daily-count.json');

// ------------------------------------------------------------------
// Local daily counter (zero Firestore reads)
// ------------------------------------------------------------------

function ensureCacheDir() {
  if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });
}

function loadDailyCount() {
  ensureCacheDir();
  if (!fs.existsSync(COUNTER_FILE)) return { date: '', count: 0 };
  try {
    return JSON.parse(fs.readFileSync(COUNTER_FILE, 'utf-8'));
  } catch {
    return { date: '', count: 0 };
  }
}

function saveDailyCount(data) {
  ensureCacheDir();
  fs.writeFileSync(COUNTER_FILE, JSON.stringify(data), 'utf-8');
}

function getDailyRemaining() {
  const todayStr = new Date().toISOString().slice(0, 10); // "2026-02-10"
  const counter = loadDailyCount();

  // Reset counter if it's a new day
  if (counter.date !== todayStr) {
    saveDailyCount({ date: todayStr, count: 0 });
    return rssSources.maxArticlesPerDay;
  }

  return Math.max(0, rssSources.maxArticlesPerDay - counter.count);
}

function incrementDailyCount(n) {
  const todayStr = new Date().toISOString().slice(0, 10);
  const counter = loadDailyCount();
  if (counter.date !== todayStr) {
    saveDailyCount({ date: todayStr, count: n });
  } else {
    saveDailyCount({ date: todayStr, count: counter.count + n });
  }
}

// ------------------------------------------------------------------
// Save a single article (write only, no reads)
// ------------------------------------------------------------------

async function saveArticle(article) {
  try {
    const articleData = {
      ...article,
      createdAt: Timestamp.fromDate(article.createdAt instanceof Date ? article.createdAt : new Date()),
      publishedAt: Timestamp.fromDate(article.publishedAt instanceof Date ? article.publishedAt : new Date()),
      updatedAt: Timestamp.now(),
    };

    await addDoc(collection(db, 'news'), articleData);
    console.log(`   ✅ Saved: ${article.title.substring(0, 60)}...`);
    return true;
  } catch (error) {
    console.error(`   ❌ Error saving: ${error.message}`);
    return false;
  }
}

// ------------------------------------------------------------------
// Save multiple articles
// ------------------------------------------------------------------

async function saveArticles(articles) {
  console.log('\n💾 Saving articles to database...\n');

  // Check daily limit from local file (zero reads)
  const remaining = getDailyRemaining();
  console.log(`📊 Daily limit: ${rssSources.maxArticlesPerDay - remaining} used, ${remaining} remaining`);

  if (remaining <= 0) {
    console.log('   ⚠️  Daily limit reached. Skipping all.\n');
    return { total: articles.length, saved: 0, skipped: articles.length, errors: 0 };
  }

  const results = { total: articles.length, saved: 0, skipped: 0, errors: 0 };

  // Category limits (in-memory, no reads)
  const catCounts = {};
  const eligible = [];

  for (const article of articles) {
    const cat = article.category;
    catCounts[cat] = (catCounts[cat] || 0) + 1;
    if (catCounts[cat] <= rssSources.maxPerCategoryPerRun) {
      eligible.push(article);
    } else {
      results.skipped++;
    }
  }

  // Cap by daily remaining
  const toSave = eligible.slice(0, remaining);
  results.skipped += eligible.length - toSave.length;

  // Write to Firestore (only writes, zero reads)
  for (const article of toSave) {
    const ok = await saveArticle(article);
    if (ok) results.saved++;
    else results.errors++;
    await new Promise((r) => setTimeout(r, 300));
  }

  // Update local daily counter
  incrementDailyCount(results.saved);

  console.log(`\n📊 Save: ${results.saved} saved, ${results.skipped} skipped, ${results.errors} errors\n`);
  return results;
}

module.exports = { saveArticle, saveArticles };
