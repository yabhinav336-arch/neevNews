/**
 * Orphaned Image Cleanup — FAST parallel version
 *
 * Usage:
 *   node news-agent/cleanupOrphanedImages.js
 *
 * Deletes Firebase Storage images not linked to any article.
 * Uses parallel batch deletion (50 concurrent) for maximum speed.
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });

const { collection, getDocs } = require('firebase/firestore/lite');
const { ref, listAll, deleteObject } = require('firebase/storage');
const { db, storage } = require('./firebaseClient');

const BATCH_SIZE = 50; // Delete 50 images concurrently

async function cleanupOrphanedImages() {
    console.log('\n' + '='.repeat(60));
    console.log('🧹 FAST CLEANUP: Removing orphaned Firebase Storage images');
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

        // Step 2: List ALL files in Storage
        console.log('📂 Listing all files in news-images/...');
        const storageRef = ref(storage, 'news-images');
        const listResult = await listAll(storageRef);
        console.log(`   ✅ ${listResult.items.length} images in Storage.\n`);

        // Step 3: Find orphaned images
        const orphaned = listResult.items.filter(item => !usedPaths.has(item.fullPath));
        console.log(`📊 Orphaned: ${orphaned.length} / ${listResult.items.length} total\n`);

        if (orphaned.length === 0) {
            console.log('✅ No orphaned images. Storage is clean!\n');
            return;
        }

        // Step 4: Delete in parallel batches
        console.log(`🗑️  Deleting ${orphaned.length} orphaned images in batches of ${BATCH_SIZE}...\n`);
        let deleted = 0;
        let errors = 0;

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

            console.log(`   📊 Progress: ${deleted + errors}/${orphaned.length} (${deleted} deleted, ${errors} errors)`);
        }

        // Summary
        console.log('\n' + '='.repeat(60));
        console.log('✅ ORPHANED IMAGE CLEANUP COMPLETE');
        console.log('='.repeat(60));
        console.log(`   - Total in Storage: ${listResult.items.length}`);
        console.log(`   - Used by articles: ${usedPaths.size}`);
        console.log(`   - Orphaned deleted: ${deleted}`);
        console.log(`   - Errors: ${errors}`);
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
