/**
 * RSS News Scheduler
 *
 * Runs every 15 minutes until 6 PM. Daily limit: 10 articles.
 * Pings IndexNow + Google after publishing for fast indexing.
 */

const cron = require('node-cron');
const https = require('https');
const { fetchAllNews } = require('./fetchNews');
const { filterDuplicates } = require('./dedupe');
const { saveArticles, getEligibleArticles } = require('./saveArticle');
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

      // If image fetch or upload failed, check if we have a valid original RSS image.
      // If we only have the default placeholder, drop the article completely.
      if (article.imageUrl && article.imageUrl !== rssSources.defaultImage) {
        console.log('   \u2139\ufe0f  Keeping original RSS image for: ' + article.title.substring(0, 50) + '...');
        updated.push(article);
      } else {
        console.log('   \u26a0\ufe0f  No relevant image found. Dropping article: ' + article.title.substring(0, 50) + '...');
      }
    } catch (error) {
      console.error('   \u274c Image processing error: ' + error.message);
      if (article.imageUrl && article.imageUrl !== rssSources.defaultImage) {
        updated.push(article);
      }
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

    // Step 1: Fetch news from all RSS sources
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

    // Step 4: Check daily & category limits — get only eligible articles
    const { eligible, skipped } = getEligibleArticles(rewrittenArticles);

    if (eligible.length === 0) {
      console.log('⚠️  No eligible articles after limit checks.\n');
      return;
    }

    // Step 5: Fetch images ONLY for articles that will actually be published
    const articlesWithImages = await fetchImagesForArticles(eligible);

    // Step 6: Save to database
    const results = await saveArticles(articlesWithImages);

    // Step 7: Cleanup old cached images from disk
    cleanupOldImages();

    // Step 8: Ping search engines for newly published articles
    if (results.saved > 0) {
      await pingSearchEngines(articlesWithImages);
    }

    const droppedDuringImageFetch = eligible.length - articlesWithImages.length;

    // Summary
    console.log('='.repeat(60));
    console.log('✅ RSS AGENT RUN COMPLETE');
    console.log('='.repeat(60));
    console.log(`📊 Summary:`);
    console.log(`   - Fetched: ${allArticles.length} articles`);
    console.log(`   - Unique (pre-AI): ${uniqueArticles.length} articles`);
    console.log(`   - Eligible (post-limits): ${eligible.length} articles`);
    console.log(`   - Dropped (no image): ${droppedDuringImageFetch} articles`);
    console.log(`   - Published: ${results.saved} articles`);
    console.log(`   - Skipped (limits): ${skipped + results.skipped} articles`);
    console.log(`   - Errors during save: ${results.errors} articles`);
    console.log('='.repeat(60) + '\n');

  } catch (error) {
    console.error('\n❌ FATAL ERROR in news agent:');
    console.error(error);
    console.error('\n');
  }
}

/**
 * Ping search engines (IndexNow + Google) after publishing articles.
 * This tells search engines to come crawl the new content ASAP.
 */
async function pingSearchEngines(articles) {
  if (!articles || articles.length === 0) return;

  console.log('\n\ud83d\udd14 Pinging search engines for ' + articles.length + ' new article(s)...\n');

  // Build article URLs
  const categories = require('./rssSources').sources;
  const urls = articles.map(function (a) {
    const catSlug = (a.category || 'news').toLowerCase().replace(/\s+/g, '-');
    return 'https://neevnews.com/' + catSlug + '/' + a.slug + '/';
  });

  // 1. Ping IndexNow (Bing, Yandex, DuckDuckGo, etc.)
  try {
    const indexNowPayload = JSON.stringify({
      host: 'neevnews.com',
      key: 'neevnews-indexnow-key',
      keyLocation: 'https://neevnews.com/neevnews-indexnow-key.txt',
      urlList: urls,
    });

    await new Promise(function (resolve, reject) {
      const req = https.request({
        hostname: 'api.indexnow.org',
        path: '/indexnow',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': Buffer.byteLength(indexNowPayload),
        },
        timeout: 10000,
      }, function (res) {
        console.log('   \u2705 IndexNow response: HTTP ' + res.statusCode);
        res.resume();
        resolve();
      });
      req.on('error', function (err) {
        console.log('   \u26a0\ufe0f  IndexNow ping failed: ' + err.message);
        resolve(); // non-critical, don't fail
      });
      req.on('timeout', function () {
        req.destroy();
        console.log('   \u26a0\ufe0f  IndexNow ping timed out');
        resolve();
      });
      req.write(indexNowPayload);
      req.end();
    });
  } catch (err) {
    console.log('   \u26a0\ufe0f  IndexNow error: ' + err.message);
  }

  // 2. Ping Google to re-crawl the sitemap
  try {
    await new Promise(function (resolve) {
      https.get(
        'https://www.google.com/ping?sitemap=' + encodeURIComponent('https://neevnews.com/sitemap.xml'),
        function (res) {
          console.log('   \u2705 Google sitemap ping: HTTP ' + res.statusCode);
          res.resume();
          resolve();
        }
      ).on('error', function (err) {
        console.log('   \u26a0\ufe0f  Google ping failed: ' + err.message);
        resolve();
      });
    });
  } catch (err) {
    console.log('   \u26a0\ufe0f  Google ping error: ' + err.message);
  }

  console.log('   \ud83d\ude80 Search engine pings complete\n');
}

/**
 * Setup cron: every 15 minutes until 6 PM (daily limit: 10 articles)
 */
function startScheduler() {
  console.log('⏰ Starting RSS News Scheduler...');
  console.log('   Schedule: Every 15 minutes until 6 PM');
  console.log('   Daily limit: ' + rssSources.maxArticlesPerDay + ' articles\n');

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

