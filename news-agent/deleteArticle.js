/**
 * Delete Article — removes article from Firestore AND its image from Storage
 *
 * Usage:
 *   node news-agent/deleteArticle.js <docId>
 *
 * Or require() and call deleteArticleWithImage(docId) programmatically.
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });

const { doc, getDoc, deleteDoc } = require('firebase/firestore/lite');
const { db } = require('./firebaseClient');
const { deleteImageFromFirebase } = require('./uploadImage');

/**
 * Delete a single article and its Firebase Storage image.
 *
 * @param {string} docId - The Firestore document ID
 * @returns {boolean} true if article was deleted
 */
async function deleteArticleWithImage(docId) {
    try {
        const docRef = doc(db, 'news', docId);
        const snapshot = await getDoc(docRef);

        if (!snapshot.exists()) {
            console.log(`   ⚠️  Article ${docId} not found in Firestore`);
            return false;
        }

        const data = snapshot.data();
        const title = (data.title || '').substring(0, 60);

        // Delete image from Firebase Storage if it's a Firebase URL
        if (data.imageUrl) {
            await deleteImageFromFirebase(data.imageUrl);
        }

        // Delete the Firestore document
        await deleteDoc(docRef);
        console.log(`   ✅ Deleted article: ${title}... (${docId})`);
        return true;
    } catch (error) {
        console.error(`   ❌ Error deleting article ${docId}: ${error.message}`);
        return false;
    }
}

module.exports = { deleteArticleWithImage };

// ── CLI usage ──
if (require.main === module) {
    const docId = process.argv[2];
    if (!docId) {
        console.error('Usage: node news-agent/deleteArticle.js <docId>');
        process.exit(1);
    }

    deleteArticleWithImage(docId).then((ok) => {
        process.exit(ok ? 0 : 1);
    });
}
