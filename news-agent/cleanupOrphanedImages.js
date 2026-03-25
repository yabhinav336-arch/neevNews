/**
 * Orphaned Image Cleanup — Paginated version for large buckets
 *
 * Usage:
 *   node news-agent/cleanupOrphanedImages.js            # delete orphans
 *   node news-agent/cleanupOrphanedImages.js --dry-run   # preview only
 *
 * Deletes Firebase Storage images not linked to any article.
 * Uses paginated list() to handle 10K+ images without memory issues,
 * and parallel batch deletion (100 concurrent) for maximum speed.
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });

const { collection, getDocs } = require('firebase/firestore/lite');
const { ref, list, deleteObject } = require('firebase/storage');
const { db, storage } = require('./firebaseClient');

const BATCH_SIZE = 100;       // Delete 100 images concurrently
const PAGE_SIZE = 1000;       // List 1000 items per page (Firebase max)
const DRY_RUN = process.argv.includes('--dry-run');

async function cleanupOrphanedImages() {
    console.log('\n' + '='.repeat(60));
    console.log('🧹 CLEANUP: Removing orphaned Firebase Storage images');
    if (DRY_RUN) console.log('   ⚠️  DRY RUN MODE — no images will be deleted');
    console.log('='.repeat(60) + '\n');

    try {
        // Step 1: Get ALL image URLs currently used by articles
        console.log('📥 Fetching all article image URLs from Firestore...');
        const snapshot = await getDocs(collection(db, 'news'));
        const usedPaths = new Set();

        snapshot.forEach((doc) => {
            const data = doc.data();
            if (data.imageUrl && data.imageUrl.includes('firebasestorage.googleapis.com')) {
                const match = data.imageUrl.match(/\/o\/([^?]+)/);
                if (match && match[1]) {
                    usedPaths.add(decodeURIComponent(match[1]));
                }
            }
        });
        console.log(`   ✅ ${snapshot.size} articles, ${usedPaths.size} use Firebase images.\n`);

        // Step 2: List ALL files in Storage using pagination
        console.log('📂 Listing all files in news-images/ (paginated)...');
        const storageRef = ref(storage, 'news-images');
        const allItems = [];
        let pageToken = undefined;
        let pageNum = 0;

        do {
            const listResult = await list(storageRef, {
                maxResults: PAGE_SIZE,
                pageToken: pageToken,
            });
            allItems.push(...listResult.items);
            pageToken = listResult.nextPageToken;
            pageNum++;
            console.log(`   📄 Page ${pageNum}: ${listResult.items.length} items (total so far: ${allItems.length})`);
        } while (pageToken);

        console.log(`   ✅ ${allItems.length} total images in Storage.\n`);

        // Step 3: Find orphaned images
        const orphaned = allItems.filter(item => !usedPaths.has(item.fullPath));
        console.log(`📊 Orphaned: ${orphaned.length} / ${allItems.length} total`);
        console.log(`   Used by articles: ${allItems.length - orphaned.length}\n`);

        if (orphaned.length === 0) {
            console.log('✅ No orphaned images. Storage is clean!\n');
            return;
        }

        if (DRY_RUN) {
            console.log(`🔍 DRY RUN: Would delete ${orphaned.length} orphaned images.`);
            console.log('   Run without --dry-run to actually delete them.\n');
            // Show first 20 as sample
            console.log('   Sample orphaned files:');
            orphaned.slice(0, 20).forEach(item => {
                console.log(`     - ${item.fullPath}`);
            });
            if (orphaned.length > 20) {
                console.log(`     ... and ${orphaned.length - 20} more\n`);
            }
            return;
        }

        // Step 4: Delete in parallel batches
        console.log(`🗑️  Deleting ${orphaned.length} orphaned images in batches of ${BATCH_SIZE}...\n`);
        let deleted = 0;
        let errors = 0;
        const startTime = Date.now();

        for (let i = 0; i < orphaned.length; i += BATCH_SIZE) {
            const batch = orphaned.slice(i, i + BATCH_SIZE);

            const results = await Promise.allSettled(
                batch.map(itemRef => deleteObject(itemRef))
            );

            for (const r of results) {
                if (r.status === 'fulfilled') deleted++;
                else {
                    if (r.reason && r.reason.code === 'storage/object-not-found') deleted++;
                    else errors++;
                }
            }

            // Progress with time estimate
            const elapsed = (Date.now() - startTime) / 1000;
            const progress = deleted + errors;
            const rate = progress / elapsed;
            const remaining = ((orphaned.length - progress) / rate).toFixed(0);
            console.log(`   📊 Progress: ${progress}/${orphaned.length} (${deleted} deleted, ${errors} errors) ~${remaining}s remaining`);
        }

        // Summary
        console.log('\n' + '='.repeat(60));
        console.log('✅ ORPHANED IMAGE CLEANUP COMPLETE');
        console.log('='.repeat(60));
        console.log(`   - Total in Storage: ${allItems.length}`);
        console.log(`   - Used by articles: ${usedPaths.size}`);
        console.log(`   - Orphaned deleted: ${deleted}`);
        console.log(`   - Errors: ${errors}`);
        console.log(`   - Time: ${((Date.now() - startTime) / 1000).toFixed(1)}s`);
        console.log('='.repeat(60) + '\n');

    } catch (error) {
        console.error('\n❌ FATAL ERROR:', error);
    }
}

cleanupOrphanedImages().then(() => {
    console.log('🏁 Done.');
    process.exit(0);
}).catch((err) => {
    console.error('Fatal:', err);
    process.exit(1);
});
