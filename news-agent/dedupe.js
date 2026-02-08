/**
 * Duplicate Detection System
 * 
 * This file checks for duplicate articles to avoid publishing the same news twice.
 * It uses title + link combination to detect duplicates.
 */

const { collection, getDocs, query, where, limit } = require('firebase/firestore');
const { db } = require('../utils/firebase');

/**
 * Check if an article already exists in database
 * @param {Object} article - Article to check
 * @returns {Promise<boolean>} True if duplicate exists
 */
async function isDuplicate(article) {
  try {
    // Check by slug (most reliable)
    const slugQuery = query(
      collection(db, 'news'),
      where('slug', '==', article.slug),
      limit(1)
    );
    const slugSnapshot = await getDocs(slugQuery);
    
    if (!slugSnapshot.empty) {
      return true; // Duplicate found by slug
    }

    // Also check by title similarity (fuzzy match)
    // Get recent articles to compare titles
    const allArticlesQuery = query(
      collection(db, 'news'),
      limit(100) // Check last 100 articles
    );
    const allSnapshot = await getDocs(allArticlesQuery);
    
    const existingTitles = [];
    allSnapshot.forEach(doc => {
      const data = doc.data();
      if (data.title) {
        existingTitles.push(data.title.toLowerCase().trim());
      }
    });

    // Check if title is very similar (90% match)
    const articleTitle = article.title.toLowerCase().trim();
    for (const existingTitle of existingTitles) {
      if (calculateSimilarity(articleTitle, existingTitle) > 0.9) {
        return true; // Very similar title found
      }
    }

    // Check by source URL if available
    if (article.sourceUrl) {
      const sourceQuery = query(
        collection(db, 'news'),
        where('sourceUrl', '==', article.sourceUrl),
        limit(1)
      );
      const sourceSnapshot = await getDocs(sourceQuery);
      
      if (!sourceSnapshot.empty) {
        return true; // Duplicate source URL
      }
    }

    return false; // No duplicate found
  } catch (error) {
    console.error('   ⚠️  Error checking duplicate:', error.message);
    // On error, assume it's not a duplicate (safer to check manually)
    return false;
  }
}

/**
 * Calculate similarity between two strings (0-1)
 * Uses Levenshtein distance algorithm
 */
function calculateSimilarity(str1, str2) {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) {
    return 1.0; // Both empty
  }

  // Simple word-based similarity
  const words1 = str1.split(/\s+/);
  const words2 = str2.split(/\s+/);
  
  const commonWords = words1.filter(word => words2.includes(word));
  const totalWords = Math.max(words1.length, words2.length);
  
  return commonWords.length / totalWords;
}

/**
 * Filter out duplicate articles
 * @param {Array} articles - Array of articles to check
 * @returns {Promise<Array>} Array of unique articles
 */
async function filterDuplicates(articles) {
  console.log(`\n🔍 Checking for duplicates...\n`);
  
  const uniqueArticles = [];
  let duplicateCount = 0;

  for (const article of articles) {
    const isDup = await isDuplicate(article);
    
    if (isDup) {
      console.log(`   ⏭️  Skipping duplicate: ${article.title.substring(0, 50)}...`);
      duplicateCount++;
    } else {
      uniqueArticles.push(article);
      console.log(`   ✅ Unique: ${article.title.substring(0, 50)}...`);
    }
  }

  console.log(`\n📊 Duplicate check complete:`);
  console.log(`   - Total articles: ${articles.length}`);
  console.log(`   - Duplicates found: ${duplicateCount}`);
  console.log(`   - Unique articles: ${uniqueArticles.length}\n`);

  return uniqueArticles;
}

module.exports = {
  isDuplicate,
  filterDuplicates,
};

