import { NextRequest, NextResponse } from 'next/server';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../../../utils/firebase';
import { getArticleUrl } from '../../../utils/data';

export const runtime = 'edge';

// Specialized RSS Feed for Google Publisher Center
// Follows strict RSS 2.0 specifications with full content
export default async function handler(req: NextRequest) {
    try {
        const articlesRef = collection(db, 'news');
        // Fetch last 50 published articles
        // Google Publisher Center recommends keeping the feed fresh but having enough content
        const q = query(
            articlesRef,
            where('status', '==', 'published'),
            // Remove orderBy to avoid index requirement
            // limit(100) is safer w/o order, but we filter in code
            limit(100)
        );

        const querySnapshot = await getDocs(q);
        const articles = querySnapshot.docs
            .map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            .sort((a: any, b: any) => {
                // Sort descending
                const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
                const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
                return dateB - dateA;
            })
            .slice(0, 50);

        const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Neev News</title>
    <link>https://neevnews.com</link>
    <description>Neev News - Global News &amp; In-Depth Analysis</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://neevnews.com/api/feed/gn" rel="self" type="application/rss+xml"/>
    <copyright>Copyright ${new Date().getFullYear()} Neev News</copyright>
    <image>
      <url>https://neevnews.com/logo.png</url>
      <title>Neev News</title>
      <link>https://neevnews.com</link>
      <width>144</width>
      <height>144</height>
    </image>
${articles
                .map((article: any) => {
                    // Ensure date is RFC 822 compliant (toUTCString does this)
                    const pubDate = article.createdAt?.toDate
                        ? article.createdAt.toDate()
                        : new Date(article.createdAt);

                    const articleUrl = `https://neevnews.com${getArticleUrl(article)}`;

                    // Clean content for XML safety but keep HTML tags for Google News
                    // Google News prefers full content in <content:encoded>
                    let content = article.content || article.summary;

                    // Add Featured Image to content if not present
                    if (article.imageUrl) {
                        content = `<img src="${article.imageUrl}" alt="${article.title}" /><br/>${content}`;
                    }

                    return `    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${articleUrl}</link>
      <guid isPermaLink="true">${articleUrl}</guid>
      <description><![CDATA[${article.summary}]]></description>
      <content:encoded><![CDATA[${content}]]></content:encoded>
      <pubDate>${pubDate.toUTCString()}</pubDate>
      <dc:creator><![CDATA[${article.author || 'Neev News Desk'}]]></dc:creator>
      <category><![CDATA[${article.category || 'News'}]]></category>
      ${article.imageUrl ? `<media:content url="${article.imageUrl}" medium="image" type="image/jpeg">
        <media:title><![CDATA[${article.title}]]></media:title>
        <media:description><![CDATA[${article.summary}]]></media:description>
      </media:content>` : ''}
    </item>`;
                })
                .join('\n')}
  </channel>
</rss>`;

        return new NextResponse(rssFeed, {
            status: 200,
            headers: {
                'Content-Type': 'application/rss+xml; charset=utf-8',
                'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=600',
            },
        });
    } catch (error: any) {
        console.error('Error generating Google News feed:', error);
        return NextResponse.json({
            error: 'Error generating feed',
            message: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
