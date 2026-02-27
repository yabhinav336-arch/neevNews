/**
 * RSS Feed Sources Configuration
 * 
 * This file contains all the RSS feed URLs we'll fetch news from.
 * Each source has a category assigned to it.
 */

module.exports = {
  sources: [
    // ──────────────── INDIA (priority today) ────────────────
    {
      name: 'NDTV India News',
      url: 'https://feeds.feedburner.com/ndtvnews-india-news',
      category: 'Politics',
      maxPerRun: 12,
    },
    {
      name: 'NDTV Latest',
      url: 'https://feeds.feedburner.com/ndtvnews-latest',
      category: 'Politics',
      maxPerRun: 12,
    },
    {
      name: 'NDTV Top Stories',
      url: 'https://feeds.feedburner.com/ndtvnews-top-stories',
      category: 'Politics',
      maxPerRun: 10,
    },
    {
      name: 'NDTV World',
      url: 'https://feeds.feedburner.com/ndtvnews-world-news',
      category: 'World',
      maxPerRun: 10,
    },
    {
      name: 'NDTV Cities',
      url: 'https://feeds.feedburner.com/ndtvnews-cities-news',
      category: 'World',
      maxPerRun: 8,
    },
    {
      name: 'NDTV South India',
      url: 'https://feeds.feedburner.com/ndtvnews-south',
      category: 'Politics',
      maxPerRun: 8,
    },
    {
      name: 'NDTV Business (Profit)',
      url: 'https://feeds.feedburner.com/ndtvprofit-latest',
      category: 'Business',
      maxPerRun: 10,
    },
    {
      name: 'NDTV Tech (Gadgets 360)',
      url: 'https://feeds.feedburner.com/gadgets360-latest',
      category: 'Technology',
      maxPerRun: 10,
    },
    {
      name: 'NDTV Cricket',
      url: 'https://feeds.feedburner.com/ndtvsports-cricket',
      category: 'Sports',
      maxPerRun: 10,
    },
    {
      name: 'NDTV Sports',
      url: 'https://feeds.feedburner.com/ndtvsports-latest',
      category: 'Sports',
      maxPerRun: 8,
    },
    {
      name: 'NDTV People',
      url: 'https://feeds.feedburner.com/ndtvnews-people',
      category: 'World',
      maxPerRun: 6,
    },
    {
      name: 'NDTV Trending',
      url: 'https://feeds.feedburner.com/ndtvnews-trending-news',
      category: 'Politics',
      maxPerRun: 8,
    },

    // ──────────────── POLITICS ────────────────
    {
      name: 'Google News - Top Stories',
      url: 'https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en',
      category: 'Politics',
      maxPerRun: 12,
    },
    {
      name: 'Google News - India',
      url: 'https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en',
      category: 'Politics',
      maxPerRun: 12,
    },
    {
      name: 'NPR Politics',
      url: 'https://feeds.npr.org/1014/rss.xml',
      category: 'Politics',
      maxPerRun: 6,
    },
    {
      name: 'Al Jazeera',
      url: 'https://www.aljazeera.com/xml/rss/all.xml',
      category: 'Politics',
      maxPerRun: 6,
    },

    // ──────────────── WORLD ────────────────
    {
      name: 'BBC World News',
      url: 'https://feeds.bbci.co.uk/news/world/rss.xml',
      category: 'World',
      maxPerRun: 7,
    },
    {
      name: 'The Guardian - World',
      url: 'https://www.theguardian.com/world/rss',
      category: 'World',
      maxPerRun: 6,
    },

    // ──────────────── TECHNOLOGY ────────────────
    {
      name: 'TechCrunch',
      url: 'https://techcrunch.com/feed/',
      category: 'Technology',
      maxPerRun: 7,
    },
    {
      name: 'Wired',
      url: 'https://www.wired.com/feed/rss',
      category: 'Technology',
      maxPerRun: 6,
    },
    {
      name: 'Ars Technica',
      url: 'https://feeds.arstechnica.com/arstechnica/index',
      category: 'Technology',
      maxPerRun: 6,
    },
    {
      name: 'The Verge',
      url: 'https://www.theverge.com/rss/index.xml',
      category: 'Technology',
      maxPerRun: 6,
    },
    {
      name: 'NDTV AI & Technology',
      url: 'https://www.ndtv.com/rss/artificial-intelligence',
      category: 'Technology',
      maxPerRun: 5,
    },

    // ──────────────── BUSINESS ────────────────
    {
      name: 'CNBC Top News',
      url: 'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=100003114',
      category: 'Business',
      maxPerRun: 7,
    },
    {
      name: 'Yahoo Finance',
      url: 'https://finance.yahoo.com/news/rssindex',
      category: 'Business',
      maxPerRun: 6,
    },
    {
      name: 'BBC Business',
      url: 'https://feeds.bbci.co.uk/news/business/rss.xml',
      category: 'Business',
      maxPerRun: 6,
    },

    // ──────────────── SCIENCE ────────────────
    {
      name: 'Science Daily',
      url: 'https://www.sciencedaily.com/rss/all.xml',
      category: 'Science',
      maxPerRun: 7,
    },
    {
      name: 'Phys.org',
      url: 'https://phys.org/rss-feed/',
      category: 'Science',
      maxPerRun: 6,
    },
    {
      name: 'Space.com',
      url: 'https://www.space.com/feeds/all',
      category: 'Science',
      maxPerRun: 6,
    },

    // ──────────────── HEALTH ────────────────
    {
      name: 'Medical Xpress',
      url: 'https://medicalxpress.com/rss-feed/',
      category: 'Health',
      maxPerRun: 7,
    },
    {
      name: 'BBC Health',
      url: 'https://feeds.bbci.co.uk/news/health/rss.xml',
      category: 'Health',
      maxPerRun: 6,
    },
    {
      name: 'NPR Health',
      url: 'https://feeds.npr.org/103537970/rss.xml',
      category: 'Health',
      maxPerRun: 6,
    },

    // ──────────────── SPORTS ────────────────
    {
      name: 'ESPN Sports',
      url: 'https://www.espn.com/espn/rss/news',
      category: 'Sports',
      maxPerRun: 7,
    },
    {
      name: 'BBC Sport',
      url: 'https://feeds.bbci.co.uk/sport/rss.xml',
      category: 'Sports',
      maxPerRun: 6,
    },
  ],

  // Default author name for all RSS articles
  defaultAuthor: 'Neev News Desk',

  // Default image if RSS feed doesn't provide one
  defaultImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',

  // Maximum articles to publish per day
  maxArticlesPerDay: 50,

  // Maximum articles per category per run
  maxPerCategoryPerRun: 15,
};

