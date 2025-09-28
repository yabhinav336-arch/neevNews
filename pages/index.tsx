import React from 'react';
import { NextSeo } from 'next-seo';
import Layout from '@/components/Layout/Layout';
import Hero from '@/components/Sections/Hero';
import LatestNews from '@/components/Sections/LatestNews';
import Categories from '@/components/Sections/Categories';
import Newsletter from '@/components/Sections/Newsletter';

const HomePage: React.FC = () => {
  const seoData = {
    title: 'NeevNews - Global News & Articles | Your Trusted News Source',
    description: 'Stay informed with NeevNews - your trusted source for global news, breaking stories, in-depth analysis, and compelling articles from around the world. Covering politics, technology, business, science, and more.',
    keywords: 'global news, world news, breaking news, politics, technology, business, science, health, sports, entertainment, journalism, articles, analysis',
    openGraph: {
      title: 'NeevNews - Global News & Articles',
      description: 'Your trusted source for global news and in-depth analysis from around the world.',
      images: [
        {
          url: 'https://neevnews.com/og-home.jpg',
          width: 1200,
          height: 630,
          alt: 'NeevNews Homepage',
        },
      ],
    },
    additionalMetaTags: [
      {
        name: 'google-site-verification',
        content: 'your-google-verification-code',
      },
    ],
  };

  return (
    <>
      <NextSeo {...seoData} />
      <Layout>
        {/* Structured Data for Homepage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'NeevNews',
              url: 'https://neevnews.com',
              description: 'Global news and articles platform providing trusted journalism and in-depth analysis.',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://neevnews.com/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
              publisher: {
                '@type': 'NewsMediaOrganization',
                name: 'NeevNews',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://neevnews.com/logo.png',
                },
              },
            }),
          }}
        />

        {/* Main Content Sections */}
        <Hero />
        <LatestNews />
        <Categories />
        <Newsletter />
      </Layout>
    </>
  );
};

export default HomePage;
