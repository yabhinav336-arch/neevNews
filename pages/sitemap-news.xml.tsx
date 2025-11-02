import { GetServerSideProps } from 'next';
import { collection, getDocs, query, where, orderBy, limit, Timestamp } from 'firebase/firestore';
import { db } from '../utils/firebase';

interface NewsArticle {
  slug: string;
  category: string;
  title: string;
  createdAt: any;
  keywords?: string;
}

function generateNewsMap(articles: NewsArticle[]): string {
  const baseUrl = 'https://neevnews.app';

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${articles
    .map((article) => {
      const articleDate = article.createdAt?.toDate 
        ? article.createdAt.toDate()
        : new Date();
      
      const formattedDate = articleDate.toISOString();
      const publishDate = articleDate.toISOString().split('T')[0]; // YYYY-MM-DD format

      return `
  <url>
    <loc>${baseUrl}/article/${article.category}/${article.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>Neev News</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${formattedDate}</news:publication_date>
      <news:title><![CDATA[${article.title}]]></news:title>
      ${article.keywords ? `<news:keywords>${article.keywords}</news:keywords>` : ''}
    </news:news>
    <lastmod>${formattedDate}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>1.0</priority>
  </url>`;
    })
    .join('')}
</urlset>`;
}

function NewsMap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    // Get articles from the last 2 days (Google News requirement)
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    
    const articlesRef = collection(db, 'articles');
    const q = query(
      articlesRef,
      where('status', '==', 'published'),
      where('createdAt', '>=', Timestamp.fromDate(twoDaysAgo)),
      orderBy('createdAt', 'desc'),
      limit(1000) // Google News max
    );
    
    const querySnapshot = await getDocs(q);
    const articles: NewsArticle[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      articles.push({
        slug: data.slug || doc.id,
        category: data.category || 'general',
        title: data.title || 'Untitled',
        createdAt: data.createdAt,
        keywords: data.keywords || '',
      });
    });

    const sitemap = generateNewsMap(articles);

    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    res.write(sitemap);
    res.end();

    return {
      props: {},
    };
  } catch (error) {
    console.error('Error generating news sitemap:', error);
    
    const emptySitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
</urlset>`;
    
    res.setHeader('Content-Type', 'text/xml');
    res.write(emptySitemap);
    res.end();

    return {
      props: {},
    };
  }
};

export default NewsMap;

