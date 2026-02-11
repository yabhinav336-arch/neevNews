/**
 * RSS News Agent API Route
 * 
 * This API route can be called by a cron service to fetch and publish news.
 * 
 * HOW TO USE:
 * 1. Deploy your site to Netlify/Vercel
 * 2. Set up a cron job to call: https://neevnews.com/api/rss-agent
 * 3. Cron runs every 30 minutes automatically
 * 
 * OR call manually: https://neevnews.com/api/rss-agent
 */

import { collection, addDoc, getDocs, query, where, limit, Timestamp } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import Parser from 'rss-parser';

// Initialize RSS Parser
const parser = new Parser({
  timeout: 10000,
  customFields: {
    item: ['media:content', 'enclosure'],
  },
});

// RSS Sources Configuration
// IMPORTANT: Categories must match your website categories exactly!
// Available: Politics, Technology, Business, Science, Health, Sports, Entertainment, World
const RSS_SOURCES = [
  {
    name: 'Google News - India',
    url: 'https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en',
    category: 'Politics', // Changed from 'General' to 'Politics'
    maxPerRun: 2,
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
];

const DEFAULT_AUTHOR = 'Neev News Desk';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';
const MAX_ARTICLES_PER_DAY = 40;
const MAX_PER_CATEGORY_PER_RUN = 2;

// Helper Functions
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .substring(0, 100);
}

function generateSummary(description, title) {
  if (!description || description.trim().length === 0) {
    return `${title}. Read more for details.`;
  }

  const cleanText = description
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .trim();

  if (cleanText.length <= 200) {
    return cleanText;
  }

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

function extractImage(item) {
  if (item.enclosure && item.enclosure.type && item.enclosure.type.startsWith('image/')) {
    return item.enclosure.url;
  }

  if (item.content) {
    const imgMatch = item.content.match(/<img[^>]+src="([^"]+)"/i);
    if (imgMatch && imgMatch[1]) {
      return imgMatch[1];
    }
  }

  return null;
}

function extractKeywords(title, description) {
  const text = `${title} ${description}`.toLowerCase();
  const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
  
  const words = text
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3 && !commonWords.includes(word))
    .slice(0, 5);

  return words.join(', ');
}

function normalizeArticle(item, source) {
  try {
    const title = item.title || '';
    if (!title || title.trim().length < 10) {
      return null;
    }

    const link = item.link || item.guid || '';
    if (!link) {
      return null;
    }

    const description = item.contentSnippet || item.content || item.summary || '';
    const summary = generateSummary(description, title);
    const imageUrl = extractImage(item) || DEFAULT_IMAGE;
    const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();
    const slug = generateSlug(title);

    // Clean description for content
    const cleanDescription = description
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .trim();

    const articleContent = cleanDescription.length > 0 
      ? `${cleanDescription.substring(0, 500)}\n\n---\n\n*This article was automatically sourced from RSS feeds. [Read original article](${link})*`
      : `${title}\n\n*This article was automatically sourced from RSS feeds. [Read original article](${link})*`;

    return {
      title: title.trim(),
      summary: summary.trim(),
      content: articleContent,
      imageUrl: imageUrl,
      category: source.category,
      author: DEFAULT_AUTHOR,
      metaDescription: summary.substring(0, 160),
      keywords: extractKeywords(title, description),
      tags: extractKeywords(title, description).split(',').map(k => k.trim()).filter(k => k),
      featured: false,
      status: 'published',
      slug: slug,
      createdAt: Timestamp.fromDate(pubDate),
      publishedAt: Timestamp.fromDate(pubDate),
      updatedAt: Timestamp.now(),
      views: 0,
      likes: 0,
      sourceUrl: link,
      sourceName: source.name,
      isRssSource: true,
    };
  } catch (error) {
    console.error('Error normalizing article:', error);
    return null;
  }
}

async function fetchFromSource(source) {
  try {
    const feed = await parser.parseURL(source.url);
    
    if (!feed.items || feed.items.length === 0) {
      return [];
    }

    const articles = feed.items
      .slice(0, source.maxPerRun)
      .map(item => normalizeArticle(item, source))
      .filter(article => article !== null);

    return articles;
  } catch (error) {
    console.error(`Error fetching from ${source.name}:`, error.message);
    return [];
  }
}

async function isDuplicate(article) {
  try {
    // Check by slug
    const slugQuery = query(
      collection(db, 'news'),
      where('slug', '==', article.slug),
      limit(1)
    );
    const slugSnapshot = await getDocs(slugQuery);
    
    if (!slugSnapshot.empty) {
      return true;
    }

    // Check by source URL
    if (article.sourceUrl) {
      const sourceQuery = query(
        collection(db, 'news'),
        where('sourceUrl', '==', article.sourceUrl),
        limit(1)
      );
      const sourceSnapshot = await getDocs(sourceQuery);
      
      if (!sourceSnapshot.empty) {
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error('Error checking duplicate:', error);
    return false;
  }
}

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
    return snapshot.size < MAX_ARTICLES_PER_DAY;
  } catch (error) {
    console.error('Error checking daily limit:', error);
    return true; // Fail open
  }
}

async function saveArticle(article) {
  try {
    await addDoc(collection(db, 'news'), article);
    return true;
  } catch (error) {
    console.error('Error saving article:', error);
    return false;
  }
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  // Only allow GET requests (for cron jobs)
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Optional: Add a secret key for security
  // if (req.query.key !== process.env.RSS_AGENT_KEY) {
  //   return res.status(401).json({ error: 'Unauthorized' });
  // }

  const startTime = Date.now();
  const results = {
    success: true,
    timestamp: new Date().toISOString(),
    fetched: 0,
    unique: 0,
    saved: 0,
    skipped: 0,
    errors: 0,
    message: '',
  };

  try {
    console.log('🚀 RSS Agent started at', new Date().toISOString());

    // Step 1: Check daily limit
    console.log('📊 Checking daily limit...');
    const canPublish = await checkDailyLimit();
    if (!canPublish) {
      results.message = 'Daily limit reached';
      console.log('⚠️  Daily limit reached, skipping fetch');
      return res.status(200).json(results);
    }
    console.log('✅ Daily limit check passed');

    // Step 2: Fetch from all sources
    console.log(`📡 Fetching from ${RSS_SOURCES.length} RSS sources...`);
    const allArticles = [];
    for (const source of RSS_SOURCES) {
      try {
        const articles = await fetchFromSource(source);
        allArticles.push(...articles);
        console.log(`   ✅ ${source.name}: ${articles.length} articles`);
      } catch (error) {
        console.error(`   ❌ ${source.name}: ${error.message}`);
      }
    }

    results.fetched = allArticles.length;

    if (allArticles.length === 0) {
      results.message = 'No articles fetched';
      return res.status(200).json(results);
    }

    // Step 3: Filter duplicates
    console.log(`🔍 Checking ${allArticles.length} articles for duplicates...`);
    const uniqueArticles = [];
    for (const article of allArticles) {
      try {
        const isDup = await isDuplicate(article);
        if (!isDup) {
          uniqueArticles.push(article);
        } else {
          results.skipped++;
        }
      } catch (error) {
        console.error(`   ⚠️  Error checking duplicate: ${error.message}`);
        results.skipped++;
      }
    }
    console.log(`✅ Found ${uniqueArticles.length} unique articles`);

    results.unique = uniqueArticles.length;

    if (uniqueArticles.length === 0) {
      results.message = 'All articles are duplicates';
      return res.status(200).json(results);
    }

    // Step 4: Apply category limits
    const categoryCounts = {};
    const articlesToSave = [];

    for (const article of uniqueArticles) {
      const category = article.category;
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      
      if (categoryCounts[category] <= MAX_PER_CATEGORY_PER_RUN) {
        articlesToSave.push(article);
      } else {
        results.skipped++;
      }
    }

    // Step 5: Save articles
    for (const article of articlesToSave) {
      const canStillPublish = await checkDailyLimit();
      if (!canStillPublish) {
        results.skipped += articlesToSave.length - results.saved;
        break;
      }

      const saved = await saveArticle(article);
      if (saved) {
        results.saved++;
      } else {
        results.errors++;
      }

      // Small delay
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    results.message = `Completed in ${duration}s. Saved ${results.saved} articles.`;

    console.log('✅ RSS Agent completed:', results);

    return res.status(200).json(results);

  } catch (error) {
    console.error('❌ RSS Agent fatal error:', error);
    console.error('Error stack:', error.stack);
    results.success = false;
    results.message = error.message || 'Unknown error occurred';
    results.error = process.env.NODE_ENV === 'development' ? error.stack : undefined;
    return res.status(500).json(results);
  }
}

