/**
 * /api/articles — cached proxy for Firestore articles
 *
 * Instead of every visitor's browser querying Firestore directly
 * (150 docs = 150 reads per visitor), this API route:
 *
 * 1. Fetches from Firestore on the server (150 reads)
 * 2. Returns JSON with CDN cache headers (5 min)
 * 3. Netlify/CDN serves the cached response to all visitors (0 reads)
 *
 * Result: ~150 reads every 5 minutes, regardless of visitor count.
 * 100 visitors in 5 min = 150 reads (not 15,000).
 */

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || 'AIzaSyDTAjMPLylkSq3Gjh90ggtW3-c7Mg8Yads',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'test-auth-4866a.firebaseapp.com',
  projectId: process.env.FIREBASE_PROJECT_ID || 'test-auth-4866a',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'test-auth-4866a.appspot.com',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '366848713693',
  appId: process.env.FIREBASE_APP_ID || '1:366848713693:web:fc497de18c13062be94c34',
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);

export default async function handler(req, res) {
  try {
    const snapshot = await getDocs(collection(db, 'news'));
    const articles = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.status === 'published') {
        // Convert Firestore Timestamps to ISO strings for JSON
        const createdAt = data.createdAt?.toDate
          ? data.createdAt.toDate().toISOString()
          : data.createdAt || null;
        const publishedAt = data.publishedAt?.toDate
          ? data.publishedAt.toDate().toISOString()
          : data.publishedAt || null;
        const updatedAt = data.updatedAt?.toDate
          ? data.updatedAt.toDate().toISOString()
          : data.updatedAt || null;

        articles.push({
          id: doc.id,
          title: data.title || '',
          summary: data.summary || '',
          content: data.content || '',
          imageUrl: data.imageUrl || '',
          category: data.category || '',
          author: data.author || '',
          slug: data.slug || '',
          status: data.status,
          featured: data.featured || false,
          isBreaking: data.isBreaking || false,
          isTrending: data.isTrending || false,
          isPinned: data.isPinned || false,
          homepagePosition: data.homepagePosition || 0,
          views: data.views || 0,
          likes: data.likes || 0,
          tags: data.tags || [],
          keywords: data.keywords || '',
          metaDescription: data.metaDescription || '',
          sourceUrl: data.sourceUrl || '',
          sourceName: data.sourceName || '',
          isRssSource: data.isRssSource || false,
          createdAt,
          publishedAt,
          updatedAt,
        });
      }
    });

    // Sort newest first
    articles.sort((a, b) => {
      const da = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const db2 = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return db2 - da;
    });

    // CDN cache: serve stale for 5 min, revalidate in background
    // s-maxage = CDN cache time (300s = 5 min)
    // stale-while-revalidate = serve stale while fetching fresh (600s = 10 min)
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=300, stale-while-revalidate=600'
    );

    return res.status(200).json({
      articles,
      count: articles.length,
      cachedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in /api/articles:', error);
    return res.status(500).json({ error: 'Failed to fetch articles' });
  }
}
