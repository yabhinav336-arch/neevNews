/**
 * Article Saver
 * 
 * This file saves articles to Firebase Firestore database.
 * It includes safety checks and rate limiting.
 */

const { collection, addDoc, getDocs, query, where, Timestamp } = require('firebase/firestore');
const { db } = require('../utils/firebase');
const rssSources = require('./rssSources');

/**
 * Check daily article limit
 * @returns {Promise<boolean>} True if under daily limit
 */
async function checkDailyLimit() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayQuery = query(
      collection(db, 'news'),
      where('createdAt', '>=', Timestamp.fromDate(today)),
      where('isRssSource', '==', true)
    );
    
    const snapshot = await getDocs(todayQuery);
    const todayCount = snapshot.size;
    
    console.log(`📊 Articles published today: ${todayCount}/${rssSources.maxArticlesPerDay}`);
    
    if (todayCount >= rssSources.maxArticlesPerDay) {
      console.log(`   ⚠️  Daily limit reached (${rssSources.maxArticlesPerDay}). Skipping new articles.`);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('   ⚠️  Error checking daily limit:', error.message);
    // On error, allow publishing (fail open)
    return true;
  }
}

/**
 * Check category limit for this run
 * @param {String} category - Category to check
 * @param {Array} articlesToPublish - Articles we're about to publish
 * @returns {Number} How many more articles allowed in this category
 */
function getCategoryLimit(category, articlesToPublish) {
  const categoryCount = articlesToPublish.filter(a => a.category === category).length;
  const remaining = rssSources.maxPerCategoryPerRun - categoryCount;
  return Math.max(0, remaining);
}

/**
 * Save a single article to database
 * @param {Object} article - Article to save
 * @returns {Promise<boolean>} True if saved successfully
 */
async function saveArticle(article) {
  try {
    // Convert dates to Firestore Timestamp
    const articleData = {
      ...article,
      createdAt: Timestamp.fromDate(article.createdAt),
      publishedAt: Timestamp.fromDate(article.publishedAt),
      updatedAt: Timestamp.now(),
    };

    await addDoc(collection(db, 'news'), articleData);
    console.log(`   ✅ Saved: ${article.title.substring(0, 60)}...`);
    return true;
  } catch (error) {
    console.error(`   ❌ Error saving article: ${error.message}`);
    return false;
  }
}

/**
 * Save multiple articles with rate limiting
 * @param {Array} articles - Articles to save
 * @returns {Promise<Object>} Save results statistics
 */
async function saveArticles(articles) {
  console.log(`\n💾 Saving articles to database...\n`);

  // Check daily limit
  const canPublish = await checkDailyLimit();
  if (!canPublish) {
    return {
      total: articles.length,
      saved: 0,
      skipped: articles.length,
      reason: 'Daily limit reached',
    };
  }

  const results = {
    total: articles.length,
    saved: 0,
    skipped: 0,
    errors: 0,
  };

  // Group by category and apply limits
  const categoryCounts = {};
  const articlesToSave = [];

  for (const article of articles) {
    const category = article.category;
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    
    // Check category limit
    const categoryLimit = getCategoryLimit(category, articlesToSave);
    if (categoryLimit > 0) {
      articlesToSave.push(article);
    } else {
      console.log(`   ⏭️  Category limit reached for ${category}: ${article.title.substring(0, 50)}...`);
      results.skipped++;
    }
  }

  // Check daily limit again after filtering
  const canStillPublish = await checkDailyLimit();
  if (!canStillPublish) {
    results.skipped += articlesToSave.length;
    return results;
  }

  // Save articles one by one (to avoid overwhelming database)
  for (const article of articlesToSave) {
    // Double-check daily limit before each save
    const canPublishNow = await checkDailyLimit();
    if (!canPublishNow) {
      console.log(`   ⏭️  Daily limit reached. Stopping saves.`);
      results.skipped += articlesToSave.length - results.saved;
      break;
    }

    const saved = await saveArticle(article);
    if (saved) {
      results.saved++;
    } else {
      results.errors++;
    }

    // Small delay between saves (be nice to database)
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\n📊 Save results:`);
  console.log(`   - Total articles: ${results.total}`);
  console.log(`   - Saved: ${results.saved}`);
  console.log(`   - Skipped: ${results.skipped}`);
  console.log(`   - Errors: ${results.errors}\n`);

  return results;
}

module.exports = {
  saveArticle,
  saveArticles,
  checkDailyLimit,
};

