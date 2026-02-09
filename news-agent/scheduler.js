/**
 * RSS News Scheduler
 * 
 * Runs the news agent every 30 minutes.
 * It runs automatically when the script starts.
 */

const cron = require('node-cron');
const { fetchAllNews } = require('./fetchNews');
const { filterDuplicates } = require('./dedupe');
const { saveArticles } = require('./saveArticle');
const { rewriteArticlesWithAI } = require('./rewriteWithAI');
const rssSources = require('./rssSources');

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

    // Step 4: Save to database
    const results = await saveArticles(rewrittenArticles);

    // Step 4: Summary
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
 * Setup cron job to run every 30 minutes
 */
function startScheduler() {
  console.log('⏰ Starting RSS News Scheduler...');
  console.log('   Schedule: Every 30 minutes');
  console.log('   Next run: immediately, then every 30 min\n');

  // Run immediately on start
  runNewsAgent();

  // Then run every 30 minutes
  cron.schedule('0,30 * * * *', () => {
    runNewsAgent();
  });

  console.log('✅ Scheduler started successfully!\n');
}

module.exports = {
  runNewsAgent,
  startScheduler,
};

