/**
 * Local Cache Manager for News Articles
 * Reduces Firestore reads by caching data in localStorage
 */

const CACHE_KEYS = {
  ARTICLES: 'neevnews_articles_cache',
  LAST_SYNC: 'neevnews_last_sync',
  VERSION: 'neevnews_cache_version',
};

const CACHE_VERSION = '1.0';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface CachedData<T> {
  data: T;
  timestamp: number;
  version: string;
}

export class CacheManager {
  /**
   * Save data to cache with timestamp
   */
  static set<T>(key: string, data: T): void {
    if (typeof window === 'undefined') return;
    
    try {
      const cacheData: CachedData<T> = {
        data,
        timestamp: Date.now(),
        version: CACHE_VERSION,
      };
      localStorage.setItem(key, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Cache write failed:', error);
    }
  }

  /**
   * Get data from cache if not expired
   */
  static get<T>(key: string, maxAge: number = CACHE_DURATION): T | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const cached = localStorage.getItem(key);
      if (!cached) return null;

      const cacheData: CachedData<T> = JSON.parse(cached);
      
      // Check version
      if (cacheData.version !== CACHE_VERSION) {
        this.remove(key);
        return null;
      }

      // Check if expired
      const age = Date.now() - cacheData.timestamp;
      if (age > maxAge) {
        this.remove(key);
        return null;
      }

      return cacheData.data;
    } catch (error) {
      console.warn('Cache read failed:', error);
      return null;
    }
  }

  /**
   * Remove item from cache
   */
  static remove(key: string): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Cache remove failed:', error);
    }
  }

  /**
   * Clear all cache
   */
  static clear(): void {
    if (typeof window === 'undefined') return;
    
    try {
      Object.values(CACHE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.warn('Cache clear failed:', error);
    }
  }

  /**
   * Get last sync timestamp
   */
  static getLastSync(): number {
    if (typeof window === 'undefined') return 0;
    
    try {
      const lastSync = localStorage.getItem(CACHE_KEYS.LAST_SYNC);
      return lastSync ? parseInt(lastSync, 10) : 0;
    } catch (error) {
      return 0;
    }
  }

  /**
   * Set last sync timestamp
   */
  static setLastSync(timestamp: number = Date.now()): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(CACHE_KEYS.LAST_SYNC, timestamp.toString());
    } catch (error) {
      console.warn('Failed to set last sync:', error);
    }
  }
}

export { CACHE_KEYS };

