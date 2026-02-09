/**
 * RSS News Fetcher
 * 
 * This file fetches news from RSS feeds and normalizes the data.
 * It handles errors gracefully and returns clean article data.
 */

const Parser = require('rss-parser');
const parser = new Parser({
  timeout: 10000, // 10 second timeout
  customFields: {
    item: ['media:content', 'enclosure'],
  },
});

/**
 * Fetch articles from a single RSS feed
 * @param {Object} source - RSS source configuration
 * @returns {Array} Array of normalized articles
 */
async function fetchFromSource(source) {
  try {
    console.log(`📡 Fetching from: ${source.name}...`);
    
    const feed = await parser.parseURL(source.url);
    
    if (!feed.items || feed.items.length === 0) {
      console.log(`   ⚠️  No items found in ${source.name}`);
      return [];
    }

    // Normalize articles from this feed
    const articles = feed.items
      .slice(0, source.maxPerRun) // Limit articles per source
      .map(item => normalizeArticle(item, source))
      .filter(article => article !== null); // Remove any null articles

    console.log(`   ✅ Fetched ${articles.length} articles from ${source.name}`);
    return articles;
    
  } catch (error) {
    console.error(`   ❌ Error fetching from ${source.name}:`, error.message);
    return []; // Return empty array on error (fail gracefully)
  }
}

/**
 * Normalize RSS item to our article format
 * @param {Object} item - RSS feed item
 * @param {Object} source - Source configuration
 * @returns {Object|null} Normalized article or null if invalid
 */
function normalizeArticle(item, source) {
  try {
    // Extract title
    const title = item.title || '';
    if (!title || title.trim().length < 10) {
      return null; // Skip articles with very short titles
    }

    // Extract link
    const link = item.link || item.guid || '';
    if (!link) {
      return null; // Skip articles without links
    }

    // Extract description/summary
    const description = item.contentSnippet || item.content || item.summary || '';
    const summary = generateSummary(description, title);

    // Extract image
    const imageUrl = extractImage(item) || source.defaultImage || require('./rssSources').defaultImage;

    // Extract publish date
    const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();

    // (24-hour filter disabled for testing – publish any age)
    // Generate slug from title
    const slug = generateSlug(title);

    return {
      title: title.trim(),
      summary: summary.trim(),
      content: generateContent(item, link),
      imageUrl: imageUrl,
      category: source.category,
      author: source.defaultAuthor || require('./rssSources').defaultAuthor,
      metaDescription: summary.substring(0, 160), // Max 160 chars for SEO
      keywords: extractKeywords(title, description),
      tags: extractTags(title, description),
      featured: false,
      status: 'published', // Auto-publish RSS articles
      slug: slug,
      createdAt: pubDate,
      publishedAt: pubDate,
      views: 0,
      likes: 0,
      // Store original link for attribution
      sourceUrl: link,
      sourceName: source.name,
      // Mark as RSS-sourced
      isRssSource: true,
    };
  } catch (error) {
    console.error(`   ⚠️  Error normalizing article:`, error.message);
    return null;
  }
}

/**
 * Generate a short summary (2-3 lines max)
 */
function generateSummary(description, title) {
  if (!description || description.trim().length === 0) {
    // If no description, create one from title
    return `${title}. Read more for details.`;
  }

  // Clean HTML tags
  const cleanText = description
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();

  // Limit to 200 characters (2-3 lines)
  if (cleanText.length <= 200) {
    return cleanText;
  }

  // Cut at last sentence before 200 chars
  const truncated = cleanText.substring(0, 200);
  const lastPeriod = truncated.lastIndexOf('.');
  const lastSpace = truncated.lastIndexOf(' ');

  if (lastPeriod > 150) {
    return truncated.substring(0, lastPeriod + 1);
  } else if (lastSpace > 150) {
    return truncated.substring(0, lastSpace) + '...';
  }

  return truncated + '...';
}

/**
 * Generate article content (not full article, just attribution)
 */
function generateContent(item, link) {
  const description = item.contentSnippet || item.content || item.summary || '';
  const cleanText = description
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .trim();

  // Use first 500 characters as content
  const content = cleanText.substring(0, 500);
  
  // Add source attribution at the end
  return `${content}\n\n---\n\n*This article was automatically sourced from RSS feeds. [Read original article](${link})*`;
}

/**
 * Extract image URL from RSS item
 */
function extractImage(item) {
  // Try different possible image sources
  if (item.enclosure && item.enclosure.type && item.enclosure.type.startsWith('image/')) {
    return item.enclosure.url;
  }

  if (item['media:content'] && item['media:content'].$.url) {
    return item['media:content'].$.url;
  }

  // Try to extract from content HTML
  if (item.content) {
    const imgMatch = item.content.match(/<img[^>]+src="([^"]+)"/i);
    if (imgMatch && imgMatch[1]) {
      return imgMatch[1];
    }
  }

  // Try content:encoded
  if (item['content:encoded']) {
    const imgMatch = item['content:encoded'].match(/<img[^>]+src="([^"]+)"/i);
    if (imgMatch && imgMatch[1]) {
      return imgMatch[1];
    }
  }

  return null;
}

/**
 * Generate URL-friendly slug from title
 */
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with dash
    .replace(/(^-|-$)/g, '') // Remove leading/trailing dashes
    .substring(0, 100); // Limit length
}

/**
 * Extract keywords from title and description
 */
function extractKeywords(title, description) {
  const text = `${title} ${description}`.toLowerCase();
  const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those'];
  
  const words = text
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3 && !commonWords.includes(word))
    .slice(0, 5); // Max 5 keywords

  return words.join(', ');
}

/**
 * Extract tags (similar to keywords but as array)
 */
function extractTags(title, description) {
  const keywords = extractKeywords(title, description);
  return keywords.split(',').map(k => k.trim()).filter(k => k);
}

/**
 * Fetch articles from all RSS sources
 * @param {Array} sources - Array of RSS source configurations
 * @returns {Array} Array of all normalized articles
 */
async function fetchAllNews(sources) {
  console.log(`\n🚀 Starting RSS fetch at ${new Date().toLocaleString()}\n`);
  
  const allArticles = [];
  
  // Fetch from all sources in parallel
  const fetchPromises = sources.map(source => fetchFromSource(source));
  const results = await Promise.all(fetchPromises);
  
  // Flatten results
  results.forEach(articles => {
    allArticles.push(...articles);
  });

  console.log(`\n✅ Total articles fetched: ${allArticles.length}\n`);
  return allArticles;
}

module.exports = {
  fetchAllNews,
  fetchFromSource,
};

