/**
 * Client-side articles cache — fetches from /api/articles (NOT Firestore directly)
 *
 * Flow:
 *   Browser → /api/articles (CDN-cached 5 min) → Firestore
 *
 * Firestore reads:
 *   - 1 fetch of N docs every 5 min on the server (CDN miss)
 *   - 0 reads from every visitor's browser
 *
 * Client-side caching on top:
 *   - In-memory cache survives SPA navigation (no re-fetch)
 *   - sessionStorage survives page reload (no re-fetch)
 *   - TTL: 3 min client-side (API has 5 min CDN cache on top)
 */

interface CachedArticle {
  id: string;
  [key: string]: any;
}

interface CacheEntry {
  articles: CachedArticle[];
  timestamp: number;
}

const CLIENT_TTL = 3 * 60 * 1000; // 3 minutes
const CACHE_KEY = 'neevnews_articles_v2';

let memoryCache: CacheEntry | null = null;

function loadFromSession(): CacheEntry | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed: CacheEntry = JSON.parse(raw);
    if (Date.now() - parsed.timestamp > CLIENT_TTL) {
      sessionStorage.removeItem(CACHE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function saveToSession(entry: CacheEntry) {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    // ignore
  }
}

/**
 * Get all published articles.
 * Hits /api/articles (CDN-cached) instead of Firestore directly.
 */
export async function getCachedArticles(): Promise<CachedArticle[]> {
  // 1. In-memory (fastest)
  if (memoryCache && Date.now() - memoryCache.timestamp < CLIENT_TTL) {
    return memoryCache.articles;
  }

  // 2. sessionStorage (survives reload)
  const session = loadFromSession();
  if (session) {
    memoryCache = session;
    return session.articles;
  }

  // 3. Fetch from API route (CDN-cached, NOT direct Firestore)
  try {
    const res = await fetch('/api/articles');
    if (!res.ok) throw new Error(`API ${res.status}`);
    const data = await res.json();
    const articles: CachedArticle[] = data.articles || [];

    const entry: CacheEntry = { articles, timestamp: Date.now() };
    memoryCache = entry;
    saveToSession(entry);
    return articles;
  } catch (err) {
    console.error('[Cache] Failed to fetch /api/articles:', err);
    return [];
  }
}

/**
 * Clear cache (e.g. after publishing from admin)
 */
export function invalidateArticlesCache() {
  memoryCache = null;
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(CACHE_KEY);
  }
}
