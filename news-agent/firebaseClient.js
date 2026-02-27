/**
 * Firebase client for the Node-based news-agent
 *
 * This uses the SAME Firebase project as your website.
 * Configuration is read from environment variables, with safe fallbacks
 * to the existing client config so your current setup keeps working.
 *
 * IMPORTANT:
 * - For production, set these env vars on your server/host:
 *   - FIREBASE_API_KEY
 *   - FIREBASE_AUTH_DOMAIN
 *   - FIREBASE_PROJECT_ID
 *   - FIREBASE_STORAGE_BUCKET
 *   - FIREBASE_MESSAGING_SENDER_ID
 *   - FIREBASE_APP_ID
 *   - DATABASE_URL (optional for Firestore, but kept for compatibility)
 */

const { initializeApp, getApps } = require('firebase/app');
const { getFirestore } = require('firebase/firestore/lite');
const { getStorage } = require('firebase/storage');

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || 'AIzaSyDTAjMPLylkSq3Gjh90ggtW3-c7Mg8Yads',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'test-auth-4866a.firebaseapp.com',
  projectId: process.env.FIREBASE_PROJECT_ID || 'test-auth-4866a',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'test-auth-4866a.appspot.com',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '366848713693',
  appId: process.env.FIREBASE_APP_ID || '1:366848713693:web:fc497de18c13062be94c34',
  // Firestore doesn’t require databaseURL, but we accept it to honour DATABASE_URL
  databaseURL: process.env.DATABASE_URL || undefined,
};

// Avoid initializing Firebase more than once in the same process
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

module.exports = { app, db, storage };

