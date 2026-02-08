/**
 * Neev News RSS Agent - Main Entry Point
 * 
 * This is the main file that starts the automated news publishing system.
 * 
 * HOW TO RUN:
 * 1. Install dependencies: npm install
 * 2. Run: node news-agent/index.js
 * 
 * The system will:
 * - Fetch news from RSS feeds every 30 minutes
 * - Check for duplicates
 * - Save new articles to your database
 * - Auto-publish articles
 */

// Import Firebase admin SDK (we'll use the client SDK in a special way)
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

// Firebase configuration (same as your website)
const firebaseConfig = {
  apiKey: "AIzaSyDTAjMPLylkSq3Gjh90ggtW3-c7Mg8Yads",
  authDomain: "test-auth-4866a.firebaseapp.com",
  projectId: "test-auth-4866a",
  storageBucket: "test-auth-4866a.appspot.com",
  messagingSenderId: "366848713693",
  appId: "1:366848713693:web:fc497de18c13062be94c34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export db for use in other modules
// We need to make it available globally for the other modules
global.db = db;

// Import and start scheduler
const { startScheduler } = require('./scheduler');

console.log('\n' + '='.repeat(60));
console.log('📰 NEEV NEWS RSS AGENT');
console.log('='.repeat(60));
console.log('Starting automated news publishing system...\n');

// Start the scheduler
startScheduler();

// Keep the process running
process.on('SIGINT', () => {
  console.log('\n\n👋 Shutting down RSS Agent...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n\n👋 Shutting down RSS Agent...');
  process.exit(0);
});

