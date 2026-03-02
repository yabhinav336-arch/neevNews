/**
 * One-Time Cleanup Script — Remove oldest 1000 articles + their Firebase Storage images
 *
 * Usage:
 *   node news-agent/cleanupOldArticles.js
 *
 * ⚠️  WARNING: This permanently deletes articles and images. Cannot be undone.
 *
 * What it does:
 * 1. Queries oldest 1000 articles from Firestore (by createdAt ascending)
 * 2. Deletes their images from Firebase Storage (if Firebase URL)
 * 3. Deletes the Firestore documents
 * 4. Clears the local dedup cache so it re-seeds on next agent run
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });

const fs = require('fs');
const path = require('path');
const { collection, getDocs, query, orderBy, limit, deleteDoc, doc } = require('firebase/firestore/lite');
const { db } = require('./firebaseClient');
const { deleteImageFromFirebase } = require('./uploadImage');

const CACHE_DIR = path.join(__dirname, '.cache');
const CACHE_FILE = path.join(CACHE_DIR, 'published.json');
const COUNTER_FILE = path.join(CACHE_DIR, 'daily-count.json');

async function cleanupOldArticles() {
    console.log('\n' + '='.repeat(60));
    console.log('🧹 CLEANUP: Removing oldest 1000 articles');
    console.log('='.repeat(60) + '\n');

    try {
        // Step 1: Query oldest 1000 articles
        console.log('📥 Fetching oldest 1000 articles from Firestore...\n');
        const q = query(
            collection(db, 'news'),
            orderBy('createdAt', 'asc'),
            limit(1000)
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            console.log('⚠️  No articles found in Firestore.\n');
            return;
        }

        console.log(`📊 Found ${snapshot.size} articles to delete.\n`);

        let deleted = 0;
        let imagesDeleted = 0;
        let errors = 0;

        // Step 2 & 3: Delete images and documents
        for (const docSnap of snapshot.docs) {
            const data = docSnap.data();
            const title = (data.title || 'Untitled').substring(0, 50);
            const docId = docSnap.id;

            try {
                // Delete Firebase Storage image if it's a Firebase URL
                if (data.imageUrl && data.imageUrl.includes('firebasestorage.googleapis.com')) {
                    const imgDeleted = await deleteImageFromFirebase(data.imageUrl);
                    if (imgDeleted) imagesDeleted++;
                }

                // Delete the Firestore document
                await deleteDoc(doc(db, 'news', docId));
                deleted++;

                if (deleted % 50 === 0) {
                    console.log(`   📊 Progress: ${deleted}/${snapshot.size} deleted...`);
                }

                // Small delay to avoid hammering Firebase
                await new Promise((r) => setTimeout(r, 200));
            } catch (err) {
                console.error(`   ❌ Error deleting "${title}..." (${docId}): ${err.message}`);
                errors++;
            }
        }

        // Step 4: Clear local dedup cache so it re-seeds cleanly on next run
        console.log('\n🗑️  Clearing local dedup cache...');
        try {
            if (fs.existsSync(CACHE_FILE)) fs.unlinkSync(CACHE_FILE);
            if (fs.existsSync(COUNTER_FILE)) fs.unlinkSync(COUNTER_FILE);
            console.log('   ✅ Cache cleared. It will re-seed on next agent run.\n');
        } catch (err) {
            console.error('   ⚠️  Error clearing cache:', err.message);
        }

        // Summary
        console.log('='.repeat(60));
        console.log('✅ CLEANUP COMPLETE');
        console.log('='.repeat(60));
        console.log(`📊 Summary:`);
        console.log(`   - Articles deleted: ${deleted}`);
        console.log(`   - Images deleted: ${imagesDeleted}`);
        console.log(`   - Errors: ${errors}`);
        console.log('='.repeat(60) + '\n');

    } catch (error) {
        console.error('\n❌ FATAL ERROR during cleanup:');
        console.error(error);
        console.error('\n');
    }
}

// Run immediately
cleanupOldArticles().then(() => {
    console.log('🏁 Cleanup script finished.');
    process.exit(0);
}).catch((err) => {
    console.error('Fatal:', err);
    process.exit(1);
});
