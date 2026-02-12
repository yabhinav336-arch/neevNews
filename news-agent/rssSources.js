/**
 * RSS Feed Sources Configuration
 * 
 * This file contains all the RSS feed URLs we'll fetch news from.
 * Each source has a category assigned to it.
 */

module.exports = {
  sources: [
    // ──────────────── POLITICS ────────────────
    {
      name: 'Google News - Top Stories',
      url: 'https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en',
      category: 'Politics',
      maxPerRun: 5,
    },
    {
      name: 'Google News - India',
      url: 'https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en',
      category: 'Politics',
      maxPerRun: 5,
    },
    {
      name: 'NPR Politics',
      url: 'https://feeds.npr.org/1014/rss.xml',
      category: 'Politics',
      maxPerRun: 4,
    },
    {
      name: 'Al Jazeera',
      url: 'https://www.aljazeera.com/xml/rss/all.xml',
      category: 'Politics',
      maxPerRun: 4,
    },

    // ──────────────── WORLD ────────────────
    {
      name: 'BBC World News',
      url: 'https://feeds.bbci.co.uk/news/world/rss.xml',
      category: 'World',
      maxPerRun: 5,
    },
    {
      name: 'The Guardian - World',
      url: 'https://www.theguardian.com/world/rss',
      category: 'World',
      maxPerRun: 4,
    },

    // ──────────────── TECHNOLOGY ────────────────
    {
      name: 'TechCrunch',
      url: 'https://techcrunch.com/feed/',
      category: 'Technology',
      maxPerRun: 5,
    },
    {
      name: 'Wired',
      url: 'https://www.wired.com/feed/rss',
      category: 'Technology',
      maxPerRun: 4,
    },
    {
      name: 'Ars Technica',
      url: 'https://feeds.arstechnica.com/arstechnica/index',
      category: 'Technology',
      maxPerRun: 4,
    },
    {
      name: 'The Verge',
      url: 'https://www.theverge.com/rss/index.xml',
      category: 'Technology',
      maxPerRun: 4,
    },

    // ──────────────── BUSINESS ────────────────
    {
      name: 'CNBC Top News',
      url: 'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=100003114',
      category: 'Business',
      maxPerRun: 5,
    },
    {
      name: 'Yahoo Finance',
      url: 'https://finance.yahoo.com/news/rssindex',
      category: 'Business',
      maxPerRun: 4,
    },
    {
      name: 'BBC Business',
      url: 'https://feeds.bbci.co.uk/news/business/rss.xml',
      category: 'Business',
      maxPerRun: 4,
    },

    // ──────────────── SCIENCE ────────────────
    {
      name: 'Science Daily',
      url: 'https://www.sciencedaily.com/rss/all.xml',
      category: 'Science',
      maxPerRun: 5,
    },
    {
      name: 'Phys.org',
      url: 'https://phys.org/rss-feed/',
      category: 'Science',
      maxPerRun: 4,
    },
    {
      name: 'Space.com',
      url: 'https://www.space.com/feeds/all',
      category: 'Science',
      maxPerRun: 4,
    },

    // ──────────────── HEALTH ────────────────
    {
      name: 'Medical Xpress',
      url: 'https://medicalxpress.com/rss-feed/',
      category: 'Health',
      maxPerRun: 5,
    },
    {
      name: 'BBC Health',
      url: 'https://feeds.bbci.co.uk/news/health/rss.xml',
      category: 'Health',
      maxPerRun: 4,
    },
    {
      name: 'NPR Health',
      url: 'https://feeds.npr.org/103537970/rss.xml',
      category: 'Health',
      maxPerRun: 4,
    },

    // ──────────────── SPORTS ────────────────
    {
      name: 'ESPN Sports',
      url: 'https://www.espn.com/espn/rss/news',
      category: 'Sports',
      maxPerRun: 5,
    },
    {
      name: 'BBC Sport',
      url: 'https://feeds.bbci.co.uk/sport/rss.xml',
      category: 'Sports',
      maxPerRun: 4,
    },
  ],

  // Default author name for all RSS articles
  defaultAuthor: 'Neev News Desk',

  // Default image if RSS feed doesn't provide one
  defaultImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',

  // Maximum articles to publish per day (safety limit)
  maxArticlesPerDay: 80,

  // Maximum articles per category per run
  maxPerCategoryPerRun: 5,
};

