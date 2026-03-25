import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const INDEXNOW_KEY = 'neevnews-indexnow-key';

/**
 * IndexNow API endpoint
 * POST /api/indexnow with body: { urls: string[] }
 * Pings Bing, Yandex, and other IndexNow-supporting engines instantly.
 */
export default async function handler(req: NextRequest) {
  if (req.method !== 'POST') {
    return new NextResponse('Method Not Allowed', { status: 405 });
  }

  try {
    const body = await req.json();
    const urls: string[] = body.urls || [];

    if (urls.length === 0) {
      return NextResponse.json({ message: 'No URLs provided' }, { status: 400 });
    }

    const host = 'neevnews.com';
    const keyLocation = `https://${host}/${INDEXNOW_KEY}.txt`;

    // IndexNow supports batch submission (up to 10,000 URLs)
    const indexNowPayload = {
      host,
      key: INDEXNOW_KEY,
      keyLocation,
      urlList: urls.map(u => u.startsWith('http') ? u : `https://${host}${u}`),
    };

    // Submit to IndexNow (Bing is the primary endpoint; it fans out to Yandex, DuckDuckGo, etc.)
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(indexNowPayload),
    });

    return NextResponse.json({
      submitted: urls.length,
      indexNowStatus: response.status,
      message: response.ok ? 'URLs submitted to IndexNow successfully' : 'IndexNow returned non-OK status',
    });

  } catch (error: any) {
    console.error('IndexNow error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
