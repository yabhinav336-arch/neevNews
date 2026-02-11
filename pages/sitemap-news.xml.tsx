import { GetServerSideProps } from 'next';
import { collection, getDocs, query, where, orderBy, limit, Timestamp } from 'firebase/firestore';
import { db } from '../utils/firebase';

const SitemapNews = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    // Check if we can fetch data server-side using the client SDK
    // Note: Standard Firebase Client SDK works in Node.js environment for Firestore queries
    // provided the collections are public or authenticated.

    let articles: any[] = [];

    try {
        const articlesRef = collection(db, 'news');

        // Google News Sitemap should only contain articles from the last 2 days
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

        // Create query
        // Note: This requires a composite index on status + publishedAt/createdAt
        // If index is missing, this might fail. We'll try a simpler query if needed.
        const q = query(
            articlesRef,
            where('status', '==', 'published'),
            // Ideally we filter by date, but without admin SDK or complex indexes, 
            // simple filtering might be safer. Let's get latest 100 and filter in code
            // to avoid "Precondition Failed" index errors if possible.
            orderBy('createdAt', 'desc'),
            limit(100)
        );

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const createdAt = data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt);

            // Filter for last 48 hours manually to be safe
            if (createdAt > twoDaysAgo) {
                articles.push({
                    slug: data.slug,
                    title: data.title,
                    createdAt: createdAt.toISOString(),
                    // Default to 'World' if no category, or map appropriately
                    category: data.category || 'General',
                });
            }
        });

    } catch (error) {
        console.error('Error generating news sitemap:', error);
        // Continue with empty articles to avoid 500 error, 
        // but log it so we know to fix permissions/indexes.
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${articles
            .map((article) => {
                return `
  <url>
    <loc>https://neevnews.com/article/${article.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>Neev News</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${article.createdAt}</news:publication_date>
      <news:title>${article.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')}</news:title>
    </news:news>
  </url>`;
            })
            .join('')}
</urlset>`;

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default SitemapNews;
