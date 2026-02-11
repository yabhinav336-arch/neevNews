/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Removed output: 'export' to enable dynamic routes
  // Dynamic routes like [category]/[slug] require SSR
  trailingSlash: true,
  async rewrites() {
    return [
      // Expose XML endpoints at root (crawl-friendly) while keeping /api disallowed in robots.txt
      { source: '/sitemap-news.xml', destination: '/api/sitemap-news.xml' },
      { source: '/sitemap-news.xml/', destination: '/api/sitemap-news.xml' },
      { source: '/server-sitemap.xml', destination: '/api/sitemap.xml' },
      { source: '/server-sitemap.xml/', destination: '/api/sitemap.xml' },
      { source: '/rss.xml', destination: '/api/rss.xml' },
      { source: '/rss.xml/', destination: '/api/rss.xml' },
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
};

module.exports = nextConfig;
