import { NextApiRequest, NextApiResponse } from 'next';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { categories } from '../../utils/data';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Fetch all published articles
    const articlesRef = collection(db, 'news');
    const q = query(articlesRef, where('status', '==', 'published'));
    const querySnapshot = await getDocs(q);
    
    const articles = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));

    const baseUrl = 'https://neevnews.com';

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Homepage - Highest Priority -->
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- All News Page -->
  <url>
    <loc>${baseUrl}/news</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Category Pages -->
${categories
  .map(
    category => `  <url>
    <loc>${baseUrl}/category/${category.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('\n')}

  <!-- Article Pages -->
${articles
  .map((article: any) => {
    const lastmod = article.updatedAt?.toDate 
      ? article.updatedAt.toDate() 
      : article.createdAt?.toDate 
      ? article.createdAt.toDate() 
      : new Date();

    return `  <url>
    <loc>${baseUrl}/article/${article.slug || article.id}</loc>
    <lastmod>${lastmod.toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
    ${article.imageUrl ? `<image:image>
      <image:loc>${article.imageUrl}</image:loc>
      <image:title><![CDATA[${article.title}]]></image:title>
    </image:image>` : ''}
  </url>`;
  })
  .join('\n')}
</urlset>`;

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=300');
    res.status(200).send(sitemap);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
}

