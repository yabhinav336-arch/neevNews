/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Removed output: 'export' to enable dynamic routes
  // Dynamic routes like [category]/[slug] require SSR
  trailingSlash: true,
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
