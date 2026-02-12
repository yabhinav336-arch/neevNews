import { NextApiRequest, NextApiResponse } from 'next';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { getArticleUrl } from '../../utils/data';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Fetch recent published articles (last 14 days for initial validation)
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 14);

    const articlesRef = collection(db, 'news');
    const q = query(
      articlesRef,
      where('status', '==', 'published'),
      // orderBy('createdAt', 'desc'), // Removed to avoid index error
      limit(100) // Increased limit slightly to filter in code
    );

    const querySnapshot = await getDocs(q);
    const articles = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    })).sort((a: any, b: any) => {
      const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
      const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
      return dateB - dateA;
    });

    // Filter articles from last 2 days
    const recentArticles = articles.filter((article: any) => {
      const articleDate = article.createdAt?.toDate ? article.createdAt.toDate() : new Date(article.createdAt);
      return articleDate >= twoDaysAgo;
    });

    // Generate Google News Sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${recentArticles
        .map((article: any) => {
          const publicationDate = article.createdAt?.toDate
            ? article.createdAt.toDate()
            : new Date(article.createdAt);

          const articleUrl = getArticleUrl(article);
          return `  <url>
    <loc>https://neevnews.com${articleUrl}</loc>
    <news:news>
      <news:publication>
        <news:name>NeevNews</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${publicationDate.toISOString()}</news:publication_date>
      <news:title><![CDATA[${article.title}]]></news:title>
      <news:keywords><![CDATA[${article.keywords || article.category}]]></news:keywords>
    </news:news>
    ${article.imageUrl ? `<image:image>
      <image:loc>${article.imageUrl.replace(/&/g, '&amp;')}</image:loc>
      <image:title><![CDATA[${article.title}]]></image:title>
      <image:caption><![CDATA[${article.summary}]]></image:caption>
    </image:image>` : ''}
    <lastmod>${publicationDate.toISOString()}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>1.0</priority>
  </url>`;
        })
        .join('\n')}
</urlset>`;

    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=300');
    res.status(200).send(sitemap);
  } catch (error) {
    console.error('Error generating news sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
}

