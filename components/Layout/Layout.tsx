import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = 'NeevNews - Global News & Articles',
  description = 'Stay informed with NeevNews - your trusted source for global news, in-depth analysis, and compelling stories from around the world.',
  keywords = 'news, global news, articles, world news, politics, technology, business, breaking news',
  ogImage = '/og-image.jpg',
  canonicalUrl,
}) => {
  const fullTitle = title.includes('NeevNews') ? title : `${title} | NeevNews`;

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="NeevNews" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="NeevNews" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        
        {/* Canonical URL */}
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
        
        {/* Favicon */}
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo.svg" />
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        
        {/* RSS Feed */}
        <link rel="alternate" type="application/rss+xml" title="NeevNews RSS Feed" href="/api/rss.xml" />
        <link rel="alternate" type="application/atom+xml" title="NeevNews Atom Feed" href="/api/rss.xml" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
      </Head>
      
      <div className="min-h-screen flex flex-col bg-white dark:bg-secondary-950">
        <Header />
        <main className="flex-1 pt-16 lg:pt-20">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
