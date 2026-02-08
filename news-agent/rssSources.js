/**
 * RSS Feed Sources Configuration
 * 
 * This file contains all the RSS feed URLs we'll fetch news from.
 * Each source has a category assigned to it.
 */

module.exports = {
  sources: [
    {
      name: 'Google News - India',
      url: 'https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en',
      category: 'General',
      maxPerRun: 2, // Max articles to fetch per run
    },
    {
      name: 'BBC World News',
      url: 'https://feeds.bbci.co.uk/news/world/rss.xml',
      category: 'World',
      maxPerRun: 2,
    },
    {
      name: 'Reuters World News',
      url: 'https://www.reuters.com/rssFeed/worldNews',
      category: 'World',
      maxPerRun: 2,
    },
    {
      name: 'TechCrunch',
      url: 'https://techcrunch.com/feed/',
      category: 'Technology',
      maxPerRun: 2,
    },
    {
      name: 'ESPN Sports',
      url: 'https://www.espn.com/espn/rss/news',
      category: 'Sports',
      maxPerRun: 2,
    },
    {
      name: 'Science Daily',
      url: 'https://www.sciencedaily.com/rss/all.xml',
      category: 'Science',
      maxPerRun: 2,
    },
  ],

  // Default author name for all RSS articles
  defaultAuthor: 'Neev News Desk',

  // Default image if RSS feed doesn't provide one
  defaultImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',

  // Maximum articles to publish per day (safety limit)
  maxArticlesPerDay: 40,

  // Maximum articles per category per run
  maxPerCategoryPerRun: 2,
};

