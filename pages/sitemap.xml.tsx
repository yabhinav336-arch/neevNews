import { GetServerSideProps } from 'next';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { categories } from '../utils/data';

interface Article {
  slug: string;
  category: string;
  createdAt: any;
}

function generateSiteMap(articles: Article[]): string {
  const baseUrl = 'https://neevnews.app';
  const currentDate = new Date().toISOString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <!-- Homepage - Highest Priority -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Category Pages -->
  ${categories
    .map((category) => {
      return `
  <url>
    <loc>${baseUrl}/category/${category.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;
    })
    .join('')}

  <!-- Article Pages -->
  ${articles
    .map((article) => {
      const articleDate = article.createdAt?.toDate 
        ? article.createdAt.toDate().toISOString()
        : currentDate;
      
      return `
  <url>
    <loc>${baseUrl}/article/${article.category}/${article.slug}</loc>
    <lastmod>${articleDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
    })
    .join('')}

  <!-- Static Pages -->
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>

  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>

  <url>
    <loc>${baseUrl}/privacy</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>

  <url>
    <loc>${baseUrl}/terms</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>

</urlset>`;
}

function SiteMap() {
  // getServerSideProps will handle this
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    // Fetch all published articles from Firestore
    const articlesRef = collection(db, 'articles');
    const q = query(
      articlesRef,
      where('status', '==', 'published'),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const articles: Article[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      articles.push({
        slug: data.slug || doc.id,
        category: data.category || 'general',
        createdAt: data.createdAt,
      });
    });

    // Generate the XML sitemap
    const sitemap = generateSiteMap(articles);

    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.write(sitemap);
    res.end();

    return {
      props: {},
    };
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Return empty sitemap on error
    const emptySitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://neevnews.com/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>`;
    
    res.setHeader('Content-Type', 'text/xml');
    res.write(emptySitemap);
    res.end();

    return {
      props: {},
    };
  }
};

export default SiteMap;

