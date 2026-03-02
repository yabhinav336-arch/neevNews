/**
 * Firebase Storage Image Uploader for Neev News Agent
 *
 * Uploads a local image file to Firebase Storage and returns the public
 * download URL. The URL is then used as the article's imageUrl.
 *
 * IMPORTANT: Firebase Storage security rules must allow writes.
 * If you get a "storage/unauthorized" error, update your Firebase Storage
 * rules at: Firebase Console > Storage > Rules
 *
 *   rules_version = '2';
 *   service firebase.storage {
 *     match /b/{bucket}/o {
 *       match /news-images/{allPaths=**} {
 *         allow read: if true;
 *         allow write: if true;   // or restrict to authenticated users
 *       }
 *     }
 *   }
 */

const fs = require('fs');
const path = require('path');
const { ref, uploadBytes, getDownloadURL, deleteObject } = require('firebase/storage');
const { storage } = require('./firebaseClient');

/**
 * Upload a local image file to Firebase Storage.
 *
 * @param {string} localPath - Absolute path to the image on disk
 * @param {string} slug      - Article slug (used to build the storage path)
 * @returns {string|null}    Public download URL on success, null on failure
 */
async function uploadImageToFirebase(localPath, slug) {
  try {
    // Read the image file as a buffer (Buffer extends Uint8Array, so uploadBytes accepts it)
    const fileBuffer = fs.readFileSync(localPath);
    const ext = path.extname(localPath) || '.jpg';
    const safeSlug = slug.substring(0, 80).replace(/[^a-z0-9-]/gi, '');
    const filename = safeSlug + '-' + Date.now() + ext;

    // Determine content type
    const ctMap = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.webp': 'image/webp',
      '.gif': 'image/gif',
    };
    const contentType = ctMap[ext.toLowerCase()] || 'image/jpeg';

    // Upload to Firebase Storage under news-images/
    const storageRef = ref(storage, 'news-images/' + filename);
    const snapshot = await uploadBytes(storageRef, fileBuffer, {
      contentType: contentType,
      customMetadata: { source: 'news-agent', slug: slug },
    });

    // Get the public download URL
    const downloadUrl = await getDownloadURL(snapshot.ref);

    console.log('   ☁️  Uploaded to Firebase Storage: ' + filename);

    // Clean up local file after successful upload
    try { fs.unlinkSync(localPath); } catch (_) { }

    return downloadUrl;
  } catch (error) {
    console.error('   ❌ Firebase Storage upload failed: ' + error.message);

    // If it is an auth/rules error, give a helpful hint
    if (error.code === 'storage/unauthorized' || error.code === 'storage/unauthenticated') {
      console.error('   ℹ️  HINT: Update your Firebase Storage rules to allow writes to news-images/');
      console.error('      Go to Firebase Console > Storage > Rules and add:');
      console.error('      match /news-images/{allPaths=**} { allow read, write: if true; }');
    }

    // Clean up local file on failure too
    try { if (fs.existsSync(localPath)) fs.unlinkSync(localPath); } catch (_) { }

    return null;
  }
}

/**
 * Delete an image from Firebase Storage given its download URL.
 *
 * Extracts the storage path from a Firebase download URL and deletes the file.
 * Fails silently if the URL is not a Firebase Storage URL or the file doesn't exist.
 *
 * @param {string} imageUrl - The Firebase Storage download URL
 * @returns {boolean} true if deleted, false otherwise
 */
async function deleteImageFromFirebase(imageUrl) {
  try {
    if (!imageUrl || !imageUrl.includes('firebasestorage.googleapis.com')) {
      return false; // Not a Firebase Storage URL, nothing to delete
    }

    // Extract file path from Firebase download URL
    // URL format: https://firebasestorage.googleapis.com/v0/b/BUCKET/o/ENCODED_PATH?alt=media&token=...
    const match = imageUrl.match(/\/o\/([^?]+)/);
    if (!match || !match[1]) {
      console.log('   ⚠️  Could not extract storage path from URL');
      return false;
    }

    const storagePath = decodeURIComponent(match[1]);
    const storageRef = ref(storage, storagePath);
    await deleteObject(storageRef);

    console.log('   🗑️  Deleted from Firebase Storage: ' + storagePath);
    return true;
  } catch (error) {
    if (error.code === 'storage/object-not-found') {
      console.log('   ℹ️  Image already deleted from Storage');
      return true; // Already gone, that's fine
    }
    console.error('   ❌ Firebase Storage delete failed: ' + error.message);
    return false;
  }
}

module.exports = { uploadImageToFirebase, deleteImageFromFirebase };
