/**
 * Cleanup Script — Remove all articles with bad/missing/placeholder images
 *
 * Usage:
 *   node news-agent/cleanupBadImages.js          (dry run — shows what would be deleted)
 *   node news-agent/cleanupBadImages.js --delete  (actually deletes)
 *
 * ⚠️  WARNING: --delete permanently removes articles and images. Cannot be undone.
 *
 * "Bad image" means:
 *   - No imageUrl field at all
 *   - Empty string imageUrl
 *   - Default Unsplash placeholder image
 *   - Non-HTTP URL (broken/relative link)
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });

const fs = require('fs');
const path = require('path');
const { collection, getDocs, query, where, deleteDoc, doc } = require('firebase/firestore/lite');
const { db } = require('./firebaseClient');
const { deleteImageFromFirebase } = require('./uploadImage');

// The default placeholder image used by rssSources.js
const DEFAULT_PLACEHOLDER = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c';

const CACHE_DIR = path.join(__dirname, '.cache');
const CACHE_FILE = path.join(CACHE_DIR, 'published.json');

/**
 * Check if an imageUrl is bad/missing/placeholder.
 */
function isBadImage(imageUrl) {
  // No image at all
  if (!imageUrl || typeof imageUrl !== 'string') return true;

  const trimmed = imageUrl.trim();

  // Empty string
  if (trimmed.length === 0) return true;

  // Default Unsplash placeholder
  if (trimmed.startsWith(DEFAULT_PLACEHOLDER)) return true;

  // Not a real HTTP(S) URL
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) return true;

  return false;
}

async function cleanupBadImages() {
  const isDryRun = !process.argv.includes('--delete');

  console.log('\n' + '='.repeat(60));
  console.log('🧹 CLEANUP: Articles with bad/missing images');
  console.log('   Mode: ' + (isDryRun ? '🔍 DRY RUN (use --delete to actually remove)' : '⚠️  LIVE DELETE'));
  console.log('='.repeat(60) + '\n');

  try {
    // Fetch ALL published articles
    console.log('📥 Fetching all articles from Firestore...\n');
    const q = query(collection(db, 'news'));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log('⚠️  No articles found.\n');
      return;
    }

    console.log(`📊 Total articles in database: ${snapshot.size}\n`);

    // Identify articles with bad images
    const badArticles = [];
    const goodArticles = [];

    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();
      if (isBadImage(data.imageUrl)) {
        badArticles.push({ id: docSnap.id, title: data.title, imageUrl: data.imageUrl });
      } else {
        goodArticles.push(docSnap.id);
      }
    }

    console.log(`📊 Articles with GOOD images: ${goodArticles.length}`);
    console.log(`📊 Articles with BAD/MISSING images: ${badArticles.length}\n`);

    if (badArticles.length === 0) {
      console.log('✅ All articles have valid images. Nothing to clean up!\n');
      return;
    }

    // List the bad articles
    console.log('─'.repeat(60));
    console.log('Articles to be deleted:\n');
    badArticles.forEach((a, i) => {
      const reason = !a.imageUrl ? 'NO IMAGE'
        : a.imageUrl.startsWith(DEFAULT_PLACEHOLDER) ? 'PLACEHOLDER'
        : a.imageUrl.trim().length === 0 ? 'EMPTY'
        : 'BAD URL';
      console.log(`  ${i + 1}. [${reason}] ${(a.title || 'Untitled').substring(0, 70)}`);
    });
    console.log('\n' + '─'.repeat(60) + '\n');

    if (isDryRun) {
      console.log(`🔍 DRY RUN complete. ${badArticles.length} articles would be deleted.`);
      console.log('   Run with --delete to actually remove them:\n');
      console.log('   node news-agent/cleanupBadImages.js --delete\n');
      return;
    }

    // Actually delete
    console.log(`🗑️  Deleting ${badArticles.length} articles...\n`);

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

        // Delete the Firestore document
        await deleteDoc(doc(db, 'news', article.id));
        deleted++;

        if (deleted % 20 === 0) {
          console.log(`   📊 Progress: ${deleted}/${badArticles.length} deleted...`);
        }

        // Small delay
        await new Promise((r) => setTimeout(r, 150));
      } catch (err) {
        console.error(`   ❌ Error deleting "${(article.title || '').substring(0, 50)}..." (${article.id}): ${err.message}`);
        errors++;
      }
    }

    // Clear dedup cache so it re-seeds cleanly
    try {
      if (fs.existsSync(CACHE_FILE)) fs.unlinkSync(CACHE_FILE);
      console.log('\n   🗑️  Cleared dedup cache.');
    } catch (_) {}

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('✅ CLEANUP COMPLETE');
    console.log('='.repeat(60));
    console.log(`📊 Summary:`);
    console.log(`   - Articles deleted: ${deleted}`);
    console.log(`   - Images deleted: ${imagesDeleted}`);
    console.log(`   - Errors: ${errors}`);
    console.log(`   - Remaining articles: ${goodArticles.length}`);
    console.log('='.repeat(60) + '\n');

  } catch (error) {
    console.error('\n❌ FATAL ERROR during cleanup:');
    console.error(error);
    console.error('\n');
  }
}

cleanupBadImages().then(() => {
  console.log('🏁 Cleanup script finished.');
  process.exit(0);
}).catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
