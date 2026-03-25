/**
 * COMPREHENSIVE Cleanup — Remove ALL articles with bad/broken/placeholder images
 * AND fix HTML entities in remaining articles.
 *
 * Usage:
 *   node news-agent/cleanupBadImages.js          (dry run — shows what would be deleted)
 *   node news-agent/cleanupBadImages.js --delete  (actually deletes bad-image articles)
 *
 * This script:
 * 1. Fetches ALL articles from Firestore
 * 2. Checks each image URL — no image, placeholder, empty, non-http, or unreachable = BAD
 * 3. Deletes articles with bad images (in --delete mode)
 * 4. Fixes HTML entities & raw HTML in remaining articles' titles/summaries/content
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { collection, getDocs, query, deleteDoc, doc, updateDoc } = require('firebase/firestore/lite');
const { db } = require('./firebaseClient');
const { deleteImageFromFirebase } = require('./uploadImage');

const CACHE_DIR = path.join(__dirname, '.cache');
const CACHE_FILE = path.join(CACHE_DIR, 'published.json');

// Known bad image patterns
const BAD_IMAGE_PATTERNS = [
  'images.unsplash.com/photo-1504711434969',   // default placeholder
  'images.unsplash.com',                        // any unsplash fallback
  'via.placeholder.com',                        // placeholder service
  'placehold.co',                               // placeholder service
  'placekitten.com',                            // placeholder service
  'dummyimage.com',                             // placeholder service
];

/**
 * Check if an imageUrl is obviously bad (no network request needed).
 */
function isObviouslyBad(imageUrl) {
  if (!imageUrl || typeof imageUrl !== 'string') return 'NO_IMAGE';
  const trimmed = imageUrl.trim();
  if (trimmed.length === 0) return 'EMPTY';
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) return 'BAD_URL';

  for (const pattern of BAD_IMAGE_PATTERNS) {
    if (trimmed.includes(pattern)) return 'PLACEHOLDER';
  }

  return null; // not obviously bad
}

/**
 * Check if a URL is actually reachable (HEAD request, follows redirects).
 * Returns true if reachable (2xx), false otherwise.
 */
function isImageReachable(url, redirectsLeft) {
  if (redirectsLeft === undefined) redirectsLeft = 3;
  return new Promise(function (resolve) {
    if (redirectsLeft <= 0) return resolve(false);

    const proto = url.startsWith('https') ? https : http;
    const req = proto.request(url, {
      method: 'HEAD',
      timeout: 8000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NeevNewsBot/1.0)',
      },
    }, function (res) {
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
        res.destroy();
        isImageReachable(res.headers.location, redirectsLeft - 1).then(resolve);
        return;
      }
      res.destroy();
      const ct = res.headers['content-type'] || '';
      // Must be 2xx and content-type must be image/*
      resolve(res.statusCode >= 200 && res.statusCode < 300 && ct.startsWith('image/'));
    });
    req.on('error', function () { resolve(false); });
    req.on('timeout', function () { req.destroy(); resolve(false); });
    req.end();
  });
}

/**
 * Decode HTML entities in a string.
 */
function decodeHtmlEntities(str) {
  if (!str) return str;
  return str
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/\u2019/g, "'")
    .replace(/\u2018/g, "'")
    .replace(/\u201c/g, '"')
    .replace(/\u201d/g, '"');
}

/**
 * Strip HTML tags from a string.
 */
function stripHtml(str) {
  if (!str) return str;
  return str
    .replace(/<[^>]*>/g, '')
    .replace(/&lt;[^&]*&gt;/g, '')       // encoded HTML tags
    .replace(/&lt;/g, '').replace(/&gt;/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

async function cleanupBadImages() {
  const isDelete = process.argv.includes('--delete');

  console.log('\n' + '='.repeat(60));
  console.log('🧹 COMPREHENSIVE CLEANUP: Bad images + HTML content');
  console.log('   Mode: ' + (isDelete ? '⚠️  LIVE DELETE' : '🔍 DRY RUN (use --delete to remove)'));
  console.log('='.repeat(60) + '\n');

  try {
    console.log('📥 Fetching all articles from Firestore...\n');
    const q = query(collection(db, 'news'));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log('⚠️  No articles found.\n');
      return;
    }

    console.log(`📊 Total articles in database: ${snapshot.size}\n`);

    // Phase 1: Check all image URLs
    console.log('🔍 Phase 1: Checking image URLs...\n');

    const badArticles = [];
    const goodArticles = [];
    const needsContentFix = [];
    let checked = 0;

    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();
      const id = docSnap.id;
      checked++;

      if (checked % 50 === 0) {
        console.log(`   📊 Checked ${checked}/${snapshot.size}...`);
      }

      // Check for obvious bad images first (fast, no network)
      const obviousReason = isObviouslyBad(data.imageUrl);
      if (obviousReason) {
        badArticles.push({ id, title: data.title, imageUrl: data.imageUrl, reason: obviousReason });
        continue;
      }

      // Check if image URL is actually reachable
      const reachable = await isImageReachable(data.imageUrl);
      if (!reachable) {
        badArticles.push({ id, title: data.title, imageUrl: data.imageUrl, reason: 'UNREACHABLE' });
        continue;
      }

      goodArticles.push({ id, data });

      // Check if content/title/summary has HTML issues
      const title = data.title || '';
      const summary = data.summary || '';
      const content = data.content || '';
      const hasHtmlIssue =
        /&[#a-z]/i.test(title) || /&[#a-z]/i.test(summary) ||
        /<[a-z]/i.test(summary) || /&lt;/i.test(summary) ||
        /<ol>|<ul>|<li>|<a /i.test(content) ||
        /&lt;ol|&lt;ul|&lt;li|&lt;a /i.test(summary);

      if (hasHtmlIssue) {
        needsContentFix.push({ id, data });
      }

      // Small delay to avoid hammering servers with HEAD requests
      await new Promise(r => setTimeout(r, 50));
    }

    console.log(`\n📊 Results:`);
    console.log(`   ✅ Good images: ${goodArticles.length}`);
    console.log(`   ❌ Bad images: ${badArticles.length}`);
    console.log(`   🔧 Need content fix: ${needsContentFix.length}\n`);

    // Show bad articles grouped by reason
    if (badArticles.length > 0) {
      const byReason = {};
      badArticles.forEach(a => {
        byReason[a.reason] = (byReason[a.reason] || 0) + 1;
      });
      console.log('   Breakdown by reason:');
      Object.entries(byReason).forEach(([reason, count]) => {
        console.log(`     ${reason}: ${count}`);
      });
      console.log('');

      // List first 30
      console.log('   Sample articles to delete:');
      badArticles.slice(0, 30).forEach((a, i) => {
        console.log(`     ${i + 1}. [${a.reason}] ${(a.title || 'Untitled').substring(0, 65)}`);
      });
      if (badArticles.length > 30) {
        console.log(`     ... and ${badArticles.length - 30} more\n`);
      }
    }

    if (!isDelete) {
      console.log(`\n🔍 DRY RUN complete.`);
      console.log(`   ${badArticles.length} articles would be deleted.`);
      console.log(`   ${needsContentFix.length} articles would have content fixed.`);
      console.log(`   Run with --delete to execute:\n`);
      console.log(`   node news-agent/cleanupBadImages.js --delete\n`);
      return;
    }

    // Phase 2: Delete bad articles
    if (badArticles.length > 0) {
      console.log(`\n🗑️  Phase 2: Deleting ${badArticles.length} bad-image articles...\n`);

      let deleted = 0;
      let imagesDeleted = 0;
      let errors = 0;

      for (const article of badArticles) {
        try {
          // Delete Firebase Storage image if applicable
          if (article.imageUrl && article.imageUrl.includes('firebasestorage.googleapis.com')) {
            const imgDel = await deleteImageFromFirebase(article.imageUrl);
            if (imgDel) imagesDeleted++;
          }
          await deleteDoc(doc(db, 'news', article.id));
          deleted++;
          if (deleted % 50 === 0) console.log(`   📊 Deleted ${deleted}/${badArticles.length}...`);
          await new Promise(r => setTimeout(r, 150));
        } catch (err) {
          console.error(`   ❌ Error: ${err.message}`);
          errors++;
        }
      }
      console.log(`   ✅ Deleted ${deleted} articles (${errors} errors)`);
    }

    // Phase 3: Fix HTML in remaining articles
    if (needsContentFix.length > 0) {
      console.log(`\n🔧 Phase 3: Fixing HTML in ${needsContentFix.length} articles...\n`);

      let fixed = 0;
      for (const { id, data } of needsContentFix) {
        try {
          const updates = {};
          const cleanTitle = decodeHtmlEntities(data.title);
          const cleanSummary = decodeHtmlEntities(stripHtml(data.summary));
          const cleanMeta = decodeHtmlEntities(stripHtml(data.metaDescription));

          if (cleanTitle !== data.title) updates.title = cleanTitle;
          if (cleanSummary !== data.summary) updates.summary = cleanSummary;
          if (cleanMeta !== data.metaDescription) updates.metaDescription = cleanMeta;

          if (Object.keys(updates).length > 0) {
            await updateDoc(doc(db, 'news', id), updates);
            fixed++;
          }
          await new Promise(r => setTimeout(r, 100));
        } catch (err) {
          console.error(`   ❌ Fix error: ${err.message}`);
        }
      }
      console.log(`   ✅ Fixed ${fixed} articles`);
    }

    // Clear dedup cache
    try {
      if (fs.existsSync(CACHE_FILE)) fs.unlinkSync(CACHE_FILE);
    } catch (_) {}

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('✅ COMPREHENSIVE CLEANUP COMPLETE');
    console.log('='.repeat(60));
    console.log(`   Deleted: ${badArticles.length} articles with bad images`);
    console.log(`   Fixed HTML: ${needsContentFix.length} articles`);
    console.log(`   Remaining: ${goodArticles.length - needsContentFix.length} clean articles`);
    console.log('='.repeat(60) + '\n');

  } catch (error) {
    console.error('\n❌ FATAL ERROR:', error);
  }
}

cleanupBadImages().then(() => {
  console.log('🏁 Done.');
  process.exit(0);
}).catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
