/**
 * RSS News Scheduler
 *
 * Today's mode: run every 15 minutes until 6 PM. Target 100–400 articles.
 * Uses cron: every 15 min = at :00, :15, :30, :45. Stops after 6 PM run.
 */

const cron = require('node-cron');
const { fetchAllNews } = require('./fetchNews');
const { filterDuplicates } = require('./dedupe');
const { saveArticles } = require('./saveArticle');
const { rewriteArticlesWithAI } = require('./rewriteWithAI');
const { fetchImageForArticle, cleanupOldImages } = require('./fetchImage');
const { uploadImageToFirebase } = require('./uploadImage');
const rssSources = require('./rssSources');

/** Return true if current time is before 6 PM (18:00) */
function isBefore6PM() {
  const now = new Date();
  return now.getHours() < 18;
}

/**
 * For each article, search Google Images by headline, download a relevant
 * image, upload it to Firebase Storage, and replace the article's imageUrl.
 * If anything fails for a particular article it keeps its original image.
 */
async function fetchImagesForArticles(articles) {
  if (!articles || articles.length === 0) return [];

  console.log('\n\ud83d\uddbc\ufe0f  Fetching images for ' + articles.length + ' article(s)...\n');

  const updated = [];
  for (const article of articles) {
    try {
      // 1. Search Google Images & download locally
      const localPath = await fetchImageForArticle(article.title, article.slug);

      if (localPath) {
        // 2. Upload to Firebase Storage & get public URL
        const firebaseUrl = await uploadImageToFirebase(localPath, article.slug);

        if (firebaseUrl) {
          updated.push(Object.assign({}, article, { imageUrl: firebaseUrl }));
          continue;
        }
      }

      // If image fetch or upload failed, keep the original imageUrl
      console.log('   \u2139\ufe0f  Keeping original image for: ' + article.title.substring(0, 50) + '...');
      updated.push(article);
    } catch (error) {
      console.error('   \u274c Image processing error: ' + error.message);
      updated.push(article);
    }

    // Delay between searches to avoid rate-limiting by Google
    await new Promise(function (r) { setTimeout(r, 3000); });
  }

  console.log('\n\u2705 Image processing complete for ' + updated.length + ' article(s)\n');
  return updated;
}

/**
 * Main function to fetch and publish news
 */
async function runNewsAgent() {
  try {
    console.log('\n' + '='.repeat(60));
    console.log('🚀 NEEV NEWS RSS AGENT - Starting Run');
    console.log('='.repeat(60) + '\n');

    // Step 1: Fetch news from all RSS sources (last 24 hours only)
    const allArticles = await fetchAllNews(rssSources.sources);

    if (allArticles.length === 0) {
      console.log('⚠️  No articles fetched. Skipping save.\n');
      return;
    }

    // Step 2: Filter duplicates
    const uniqueArticles = await filterDuplicates(allArticles);

    if (uniqueArticles.length === 0) {
      console.log('⚠️  All articles are duplicates. Nothing to publish.\n');
      return;
    }

    // Step 3: Rewrite with OpenAI (if configured)
    const rewrittenArticles = await rewriteArticlesWithAI(uniqueArticles);

    // Step 4: Fetch relevant images from Google Images & upload to Firebase Storage
    const articlesWithImages = await fetchImagesForArticles(rewrittenArticles);

    // Step 5: Save to database
    const results = await saveArticles(articlesWithImages);

    // Step 6: Cleanup old cached images from disk
    cleanupOldImages();

    // Summary
    console.log('='.repeat(60));
    console.log('✅ RSS AGENT RUN COMPLETE');
    console.log('='.repeat(60));
    console.log(`📊 Summary:`);
    console.log(`   - Fetched: ${allArticles.length} articles`);
    console.log(`   - Unique (pre-AI): ${uniqueArticles.length} articles`);
    console.log(`   - Published: ${results.saved} articles`);
    console.log(`   - Skipped: ${results.skipped} articles`);
    console.log(`   - Errors: ${results.errors} articles`);
    console.log('='.repeat(60) + '\n');

  } catch (error) {
    console.error('\n❌ FATAL ERROR in news agent:');
    console.error(error);
    console.error('\n');
  }
}

/**
 * Setup cron: every 15 minutes until 6 PM (target 100–400 articles today)
 */
function startScheduler() {
  console.log('⏰ Starting RSS News Scheduler...');
  console.log('   Schedule: Every 15 minutes until 6 PM');
  console.log('   Target today: 100–400 articles\n');

  // Run immediately on start
  if (isBefore6PM()) runNewsAgent();

  // Every 15 minutes (:00, :15, :30, :45); only run if before 6 PM
  cron.schedule('0,15,30,45 * * * *', () => {
    if (isBefore6PM()) {
      runNewsAgent();
    } else {
      console.log('\n⏹️  After 6 PM — skipping run. Restart tomorrow for next day.\n');
    }
  });

  console.log('✅ Scheduler started successfully!\n');
}

module.exports = {
  runNewsAgent,
  startScheduler,
};

