import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import '@/styles/globals.css';

const defaultSEO = {
  title: 'NeevNews - Global News & Articles',
  description: 'Stay informed with NeevNews - your trusted source for global news, in-depth analysis, and compelling stories from around the world.',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://neevnews.com',
    siteName: 'NeevNews',
    images: [
      {
        url: 'https://neevnews.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NeevNews - Global News & Articles',
      },
    ],
  },
  twitter: {
    handle: '@neevnews',
    site: '@neevnews',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'keywords',
      content: 'news, global news, articles, world news, politics, technology, business, breaking news, journalism',
    },
    {
      name: 'author',
      content: 'NeevNews',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
    {
      httpEquiv: 'x-ua-compatible' as const,
      content: 'IE=edge',
    },
  ],
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...defaultSEO} />
      <Component {...pageProps} />
    </>
  );
}
