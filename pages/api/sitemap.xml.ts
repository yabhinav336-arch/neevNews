import { NextRequest, NextResponse } from 'next/server';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { categories, getArticleUrl } from '../../utils/data';

export const runtime = 'edge';

export default async function handler(req: NextRequest) {
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

          const articleUrl = getArticleUrl(article);
          return `  <url>
    <loc>${baseUrl}${articleUrl}</loc>
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

    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}

