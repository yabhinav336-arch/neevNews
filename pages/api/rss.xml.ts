import { NextRequest, NextResponse } from 'next/server';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore/lite';
import { db } from '../../utils/firebase';
import { getArticleUrl } from '../../utils/data';

export const runtime = 'edge';

export default async function handler(req: NextRequest) {
  try {
    const articlesRef = collection(db, 'news');
    const q = query(
      articlesRef,
      where('status', '==', 'published'),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const querySnapshot = await getDocs(q);
    const articles = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));

    const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>NeevNews - Breaking News &amp; Global Headlines</title>
    <link>https://neevnews.com</link>
    <description>Stay informed with NeevNews - your trusted source for breaking news, global headlines, and in-depth analysis.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://neevnews.com/api/rss.xml" rel="self" type="application/rss+xml"/>
    <copyright>Copyright ${new Date().getFullYear()} NeevNews. All rights reserved.</copyright>
    <managingEditor>abhinavvoicebox@gmail.com (NeevNews Editorial Team)</managingEditor>
    <webMaster>abhinavvoicebox@gmail.com (NeevNews Tech Team)</webMaster>
    <category>News</category>
    <ttl>60</ttl>
    <image>
      <url>https://neevnews.com/logo.png</url>
      <title>NeevNews</title>
      <link>https://neevnews.com</link>
    </image>
${articles
        .map((article: any) => {
          const pubDate = article.createdAt?.toDate
            ? article.createdAt.toDate()
            : new Date(article.createdAt);

          const articleUrl = getArticleUrl(article);
          return `    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>https://neevnews.com${articleUrl}</link>
      <guid isPermaLink="true">https://neevnews.com${articleUrl}</guid>
      <description><![CDATA[${article.summary}]]></description>
      <content:encoded><![CDATA[${article.content}]]></content:encoded>
      <pubDate>${pubDate.toUTCString()}</pubDate>
      <dc:creator><![CDATA[${article.author}]]></dc:creator>
      <category><![CDATA[${article.category}]]></category>
      ${article.imageUrl ? `<media:content url="${article.imageUrl}" medium="image">
        <media:title><![CDATA[${article.title}]]></media:title>
        <media:description><![CDATA[${article.summary}]]></media:description>
      </media:content>` : ''}
      ${article.tags ? article.tags.map((tag: string) => `<category><![CDATA[${tag}]]></category>`).join('\n      ') : ''}
    </item>`;
        })
        .join('\n')}
  </channel>
</rss>`;

    return new NextResponse(rssFeed, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new NextResponse('Error generating RSS feed', { status: 500 });
  }
}

