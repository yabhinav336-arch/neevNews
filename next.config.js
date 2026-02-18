/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  trailingSlash: true,

  async rewrites() {
    return [
      { source: '/sitemap-news.xml', destination: '/api/sitemap-news.xml' },
      { source: '/sitemap-news.xml/', destination: '/api/sitemap-news.xml' },
      { source: '/server-sitemap.xml', destination: '/api/sitemap.xml' },
      { source: '/server-sitemap.xml/', destination: '/api/sitemap.xml' },
      { source: '/rss.xml', destination: '/api/rss.xml' },
      { source: '/rss.xml/', destination: '/api/rss.xml' },
    ];
  },

  async headers() {
    return [
      // Force fresh HTML for news pages (instant updates)
      {
        source: '/',
        headers: [
          { key: 'Cache-Control', value: 'no-store, max-age=0' },
        ],
      },
      {
        source: '/news',
        headers: [
          { key: 'Cache-Control', value: 'no-store, max-age=0' },
        ],
      },
      {
        source: '/news/',
        headers: [
          { key: 'Cache-Control', value: 'no-store, max-age=0' },
        ],
      },
      {
        source: '/category/:slug*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, max-age=0' },
        ],
      },
      {
        source: '/article/:slug*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, max-age=0' },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
        ],
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
};

module.exports = nextConfig;
