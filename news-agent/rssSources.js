/**
 * RSS Feed Sources Configuration
 * 
 * Focused on Top World News, Latest & Information.
 * Daily limit: 40 articles.
 */

module.exports = {
  sources: [
    // ──────────────── INDIA (top stories) ────────────────
    {
      name: 'NDTV India News',
      url: 'https://feeds.feedburner.com/ndtvnews-india-news',
      category: 'Politics',
      maxPerRun: 8,
    },
    {
      name: 'NDTV Latest',
      url: 'https://feeds.feedburner.com/ndtvnews-latest',
      category: 'Politics',
      maxPerRun: 8,
    },
    {
      name: 'NDTV Top Stories',
      url: 'https://feeds.feedburner.com/ndtvnews-top-stories',
      category: 'Politics',
      maxPerRun: 8,
    },
    {
      name: 'NDTV World',
      url: 'https://feeds.feedburner.com/ndtvnews-world-news',
      category: 'World',
      maxPerRun: 8,
    },
    {
      name: 'NDTV Business (Profit)',
      url: 'https://feeds.feedburner.com/ndtvprofit-latest',
      category: 'Business',
      maxPerRun: 6,
    },
    {
      name: 'NDTV Tech (Gadgets 360)',
      url: 'https://feeds.feedburner.com/gadgets360-latest',
      category: 'Technology',
      maxPerRun: 6,
    },
    {
      name: 'NDTV Cricket',
      url: 'https://feeds.feedburner.com/ndtvsports-cricket',
      category: 'Sports',
      maxPerRun: 6,
    },
    {
      name: 'NDTV Sports',
      url: 'https://feeds.feedburner.com/ndtvsports-latest',
      category: 'Sports',
      maxPerRun: 6,
    },

    // ──────────────── TOP WORLD NEWS ────────────────
    {
      name: 'Google News - Top Stories',
      url: 'https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en',
      category: 'World',
      maxPerRun: 8,
    },
    {
      name: 'Google News - India',
      url: 'https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en',
      category: 'Politics',
      maxPerRun: 8,
    },
    {
      name: 'BBC World News',
      url: 'https://feeds.bbci.co.uk/news/world/rss.xml',
      category: 'World',
      maxPerRun: 6,
    },
    {
      name: 'The Guardian - World',
      url: 'https://www.theguardian.com/world/rss',
      category: 'World',
      maxPerRun: 6,
    },
    {
      name: 'Al Jazeera',
      url: 'https://www.aljazeera.com/xml/rss/all.xml',
      category: 'World',
      maxPerRun: 6,
    },

    // ──────────────── TECHNOLOGY (top only) ────────────────
    {
      name: 'TechCrunch',
      url: 'https://techcrunch.com/feed/',
      category: 'Technology',
      maxPerRun: 5,
    },

    // ──────────────── BUSINESS (top only) ────────────────
    {
      name: 'CNBC Top News',
      url: 'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=100003114',
      category: 'Business',
      maxPerRun: 5,
    },
  ],

  // Default author name for all RSS articles
  defaultAuthor: 'Neev News Desk',

  // Default image if RSS feed doesn't provide one
  defaultImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',

  // Maximum articles to publish per day
  maxArticlesPerDay: 10,

  // Maximum articles per category per run
  maxPerCategoryPerRun: 3,
};
