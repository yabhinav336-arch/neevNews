/**
 * Analytics Event Optimizer
 * Reduces analytics events by batching and aggregating
 */

interface ArticleView {
  articleId: string;
  category: string;
  timestamp: number;
  timeSpent: number;
}

interface SessionData {
  articlesViewed: string[];
  totalTimeSpent: number;
  sessionStart: number;
  lastActivity: number;
}

const MIN_TIME_TO_TRACK = 5000; // 5 seconds minimum to count as "viewed"
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
const BATCH_SIZE = 10; // Send analytics after 10 views or session end

class AnalyticsOptimizer {
  private sessionData: SessionData;
  private articleViews: ArticleView[] = [];
  private viewStartTime: number = 0;
  private currentArticleId: string | null = null;

  constructor() {
    this.sessionData = this.loadSession();
    
    // Send batched analytics on page unload
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        this.endSession();
      });
      
      // Also check for session timeout periodically
      setInterval(() => this.checkSessionTimeout(), 60000); // Check every minute
    }
  }

  /**
   * Load session from localStorage
   */
  private loadSession(): SessionData {
    if (typeof window === 'undefined') {
      return this.createNewSession();
    }

    try {
      const stored = localStorage.getItem('neevnews_analytics_session');
      if (stored) {
        const session: SessionData = JSON.parse(stored);
        
        // Check if session expired
        if (Date.now() - session.lastActivity > SESSION_TIMEOUT) {
          return this.createNewSession();
        }
        
        return session;
      }
    } catch (error) {
      console.warn('Failed to load analytics session:', error);
    }

    return this.createNewSession();
  }

  /**
   * Create new session
   */
  private createNewSession(): SessionData {
    return {
      articlesViewed: [],
      totalTimeSpent: 0,
      sessionStart: Date.now(),
      lastActivity: Date.now(),
    };
  }

  /**
   * Save session to localStorage
   */
  private saveSession(): void {
    if (typeof window === 'undefined') return;

    try {
      this.sessionData.lastActivity = Date.now();
      localStorage.setItem('neevnews_analytics_session', JSON.stringify(this.sessionData));
    } catch (error) {
      console.warn('Failed to save analytics session:', error);
    }
  }

  /**
   * Start tracking article view
   */
  startArticleView(articleId: string): void {
    this.currentArticleId = articleId;
    this.viewStartTime = Date.now();
  }

  /**
   * End tracking article view
   */
  endArticleView(articleId: string, category: string): void {
    if (this.currentArticleId !== articleId || !this.viewStartTime) {
      return;
    }

    const timeSpent = Date.now() - this.viewStartTime;
    
    // Only track if user spent minimum time (reduces noise)
    if (timeSpent >= MIN_TIME_TO_TRACK) {
      this.articleViews.push({
        articleId,
        category,
        timestamp: Date.now(),
        timeSpent,
      });

      // Add to session data
      if (!this.sessionData.articlesViewed.includes(articleId)) {
        this.sessionData.articlesViewed.push(articleId);
      }
      this.sessionData.totalTimeSpent += timeSpent;
      
      this.saveSession();

      // Send batch if reached threshold
      if (this.articleViews.length >= BATCH_SIZE) {
        this.sendBatchedAnalytics();
      }
    }

    this.currentArticleId = null;
    this.viewStartTime = 0;
  }

  /**
   * Send batched analytics events
   */
  private sendBatchedAnalytics(): void {
    if (this.articleViews.length === 0) return;

    // Aggregate data
    const uniqueArticles = new Set(this.articleViews.map(v => v.articleId)).size;
    const totalTime = this.articleViews.reduce((sum, v) => sum + v.timeSpent, 0);
    const categories = [...new Set(this.articleViews.map(v => v.category))];

    // Log single aggregated event instead of multiple
    console.log('📊 Batched Analytics Event:', {
      event: 'batch_article_views',
      unique_articles: uniqueArticles,
      total_views: this.articleViews.length,
      total_time_seconds: Math.round(totalTime / 1000),
      categories: categories.join(','),
      session_duration: Math.round((Date.now() - this.sessionData.sessionStart) / 1000),
    });

    // Here you would send to your actual analytics service
    // Example: gtag('event', 'batch_article_views', {...});
    // Or: analytics.track('batch_article_views', {...});

    // Clear the batch
    this.articleViews = [];
  }

  /**
   * End current session and send final analytics
   */
  endSession(): void {
    // Send any pending analytics
    this.sendBatchedAnalytics();

    // Send session summary
    if (this.sessionData.articlesViewed.length > 0) {
      console.log('📊 Session Summary:', {
        event: 'session_end',
        articles_viewed: this.sessionData.articlesViewed.length,
        total_time_seconds: Math.round(this.sessionData.totalTimeSpent / 1000),
        session_duration: Math.round((Date.now() - this.sessionData.sessionStart) / 1000),
      });

      // Here you would send to your actual analytics service
    }

    // Clear session
    if (typeof window !== 'undefined') {
      localStorage.removeItem('neevnews_analytics_session');
    }
  }

  /**
   * Check if session timed out
   */
  private checkSessionTimeout(): void {
    if (Date.now() - this.sessionData.lastActivity > SESSION_TIMEOUT) {
      this.endSession();
      this.sessionData = this.createNewSession();
    }
  }

  /**
   * Track page view (not article specific)
   */
  trackPageView(pagePath: string): void {
    console.log('📊 Page View:', pagePath);
    // Send to your analytics service
    // Example: gtag('config', 'GA_MEASUREMENT_ID', { page_path: pagePath });
  }

  /**
   * Get session stats (useful for debugging)
   */
  getSessionStats(): SessionData {
    return { ...this.sessionData };
  }
}

// Export singleton instance
export const analyticsOptimizer = new AnalyticsOptimizer();

