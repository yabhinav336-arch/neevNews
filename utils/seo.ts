// SEO Utility Functions for NeevNews

export interface ArticleSEO {
  title: string;
  description: string;
  keywords: string;
  imageUrl: string;
  author: string;
  publishedTime: string;
  modifiedTime: string;
  category: string;
  tags: string[];
  slug: string;
}

/**
 * Generate comprehensive meta tags for articles
 */
export const generateArticleMetaTags = (article: ArticleSEO) => {
  return {
    title: `${article.title} | NeevNews`,
    description: article.description,
    canonical: `https://neevnews.com/article/${article.slug}`,
    openGraph: {
      type: 'article',
      url: `https://neevnews.com/article/${article.slug}`,
      title: article.title,
      description: article.description,
      images: [
        {
          url: article.imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      article: {
        publishedTime: article.publishedTime,
        modifiedTime: article.modifiedTime,
        authors: [article.author],
        section: article.category,
        tags: article.tags,
      },
      siteName: 'NeevNews',
    },
    twitter: {
      cardType: 'summary_large_image',
      site: '@neevnews',
      handle: '@neevnews',
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content: article.keywords,
      },
      {
        name: 'author',
        content: article.author,
      },
      {
        property: 'article:publisher',
        content: 'https://neevnews.com',
      },
      {
        name: 'news_keywords',
        content: article.keywords,
      },
      {
        name: 'robots',
        content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },
      {
        name: 'googlebot',
        content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },
      {
        name: 'bingbot',
        content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },
    ],
  };
};

/**
 * Generate NewsArticle Schema.org structured data
 */
export const generateNewsArticleSchema = (article: ArticleSEO) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.description,
    image: {
      '@type': 'ImageObject',
      url: article.imageUrl,
      width: 1200,
      height: 630,
    },
    datePublished: article.publishedTime,
    dateModified: article.modifiedTime,
    author: {
      '@type': 'Person',
      name: article.author,
      url: `https://neevnews.com/author/${article.author.toLowerCase().replace(/\s+/g, '-')}`,
    },
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: 'NeevNews',
      logo: {
        '@type': 'ImageObject',
        url: 'https://neevnews.com/logo.svg',
        width: 200,
        height: 200,
      },
      url: 'https://neevnews.com',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-93693-36080',
        contactType: 'customer service',
        email: 'abhinavvoicebox@gmail.com',
        areaServed: 'IN',
        availableLanguage: 'English',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://neevnews.com/article/${article.slug}`,
    },
    articleSection: article.category,
    keywords: article.keywords,
    articleBody: article.description,
    isAccessibleForFree: true,
    inLanguage: 'en-US',
  };
};

/**
 * Generate BreadcrumbList Schema
 */
export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

/**
 * Notify Google Indexing API (requires setup)
 */
export const notifyGoogleIndexing = async (url: string, type: 'URL_UPDATED' | 'URL_DELETED' = 'URL_UPDATED') => {
  // This requires Google Indexing API setup with service account
  // Implementation would use googleapis package
  console.log(`Would notify Google about ${type} for ${url}`);
  // In production, implement actual Google Indexing API call here
};

/**
 * Generate optimal slug for SEO
 */
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

/**
 * Calculate reading time
 */
export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

/**
 * Generate excerpt from content
 */
export const generateExcerpt = (content: string, maxLength: number = 160): string => {
  if (content.length <= maxLength) return content;
  return content.substring(0, maxLength).trim() + '...';
};

