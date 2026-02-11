/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://neevnews.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  
  // Exclude admin and other private pages
  exclude: [
    '/admin',
    '/admin/*',
    '/api/*',
    '/404',
    '/500',
  ],

  // Robot.txt options
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Googlebot-News',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://neevnews.com/sitemap-news.xml',
      'https://neevnews.com/server-sitemap.xml',
    ],
  },

  // Change frequency for different page types
  changefreq: 'daily',
  priority: 0.7,
  
  // Additional paths
  additionalPaths: async (config) => {
    const result = [];

    // Add custom priority for important pages
    result.push({
      loc: '/',
      changefreq: 'hourly',
      priority: 1.0,
      lastmod: new Date().toISOString(),
    });

    return result;
  },

  // Transform function for custom sitemap entries
  transform: async (config, path) => {
    // Custom priority for different page types
    let priority = 0.7;
    let changefreq = 'daily';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'hourly';
    } else if (path.includes('/article/')) {
      priority = 0.9;
      changefreq = 'daily';
    } else if (path.includes('/category/')) {
      priority = 0.8;
      changefreq = 'daily';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
      alternateRefs: [],
    };
  },
};

