import React, { useState, useEffect } from 'react';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import { getCachedArticles } from '../utils/articlesCache';
import { categories, trendingTopics, getArticleUrl } from '../utils/data';
import { getImageUrl } from '../utils/images';
import { subscribeToNewsletter } from '../services/newsletter';
import Layout from '@/components/Layout/Layout';
import {
  TrendingUp,
  Clock,
  User,
  ArrowRight,
  Play,
  ChevronRight,
  Flame,
  Globe,
  Zap,
  Pin
} from 'lucide-react';

interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  category: string;
  author: string;
  createdAt: any;
  metaDescription: string;
  keywords: string;
  tags: string[];
  featured: boolean;
  status: string;
  slug: string;
  views: number;
  likes: number;
  // CMS fields
  isBreaking?: boolean;
  isTrending?: boolean;
  isPinned?: boolean;
  homepagePosition?: number;
  publishedAt?: any;
}

const HomePage: React.FC = () => {
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [latestNews, setLatestNews] = useState<Article[]>([]);
  const [trendingArticles, setTrendingArticles] = useState<Article[]>([]);
  const [breakingNews, setBreakingNews] = useState<Article[]>([]);
  const [pinnedArticles, setPinnedArticles] = useState<Article[]>([]);
  const [categoryNews, setCategoryNews] = useState<{ [key: string]: Article[] }>({});
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterMessage, setNewsletterMessage] = useState('');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      // Fetch from cache (only hits Firestore if cache expired)
      const allArticles = await getCachedArticles() as Article[];

      // Filter published articles
      const publishedArticles = allArticles.filter(article => article.status === 'published');

      // Sort by date (newest first)
      const sortedArticles = publishedArticles.sort((a, b) => {
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });

      // Get breaking news articles (marked as breaking in CMS)
      const breaking = sortedArticles.filter(article => article.isBreaking);
      setBreakingNews(breaking);

      // Get featured articles (marked as featured in CMS)
      const featured = sortedArticles.filter(article => article.featured);
      setFeaturedArticles(featured.slice(0, 3));

      // Get trending articles (marked as trending in CMS, fallback to latest if none)
      const trending = sortedArticles.filter(article => article.isTrending);
      setTrendingArticles(trending.length > 0 ? trending.slice(0, 5) : sortedArticles.slice(0, 5));

      // Get pinned articles (marked as pinned in CMS)
      const pinned = sortedArticles.filter(article => article.isPinned);
      setPinnedArticles(pinned);

      // For latest news, show pinned first, then rest sorted by date
      const unpinnedArticles = sortedArticles.filter(article => !article.isPinned);
      const orderedLatest = [...pinned, ...unpinnedArticles];
      setLatestNews(orderedLatest.slice(0, 12));

      // Group by category
      const categoryGroups: { [key: string]: Article[] } = {};
      categories.slice(0, 4).forEach(cat => {
        categoryGroups[cat.name] = sortedArticles
          .filter(article => article.category === cat.name)
          .slice(0, 4);
      });
      setCategoryNews(categoryGroups);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterStatus('loading');

    const result = await subscribeToNewsletter(newsletterEmail, 'homepage-hero');

    if (result.success) {
      setNewsletterStatus('success');
      setNewsletterMessage(result.message);
      setNewsletterEmail('');
    } else {
      setNewsletterStatus('error');
      setNewsletterMessage(result.message);
    }

    setTimeout(() => {
      setNewsletterStatus('idle');
      setNewsletterMessage('');
    }, 5000);
  };

  const formatDate = (date: any) => {
    if (!date) return '';
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTimeAgo = (date: any) => {
    if (!date) return '';
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    const seconds = Math.floor((new Date().getTime() - dateObj.getTime()) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const getCategoryColor = (category: string) => {
    const categoryData = categories.find(cat => cat.name === category);
    return categoryData?.color || 'bg-blue-500';
  };

  const seoData = {
    title: 'Neev News - Breaking News, Latest Updates & Global Headlines',
    description: 'Stay informed with Neev News - your trusted source for breaking news, global headlines, and in-depth analysis. Covering politics, technology, business, science, and world events 24/7.',
    keywords: 'breaking news, latest news, global headlines, world news, politics, technology, business, science, health, sports, entertainment, journalism, live news, Neev News',
    openGraph: {
      title: 'Neev News - Breaking News & Global Headlines',
      description: 'Your trusted source for breaking news, global headlines, and in-depth analysis from around the world.',
      images: [
        {
          url: 'https://neevnews.com/og-home.jpg',
          width: 1200,
          height: 630,
          alt: 'NeevNews Homepage',
        },
      ],
    },
  };

  return (
    <>
      <NextSeo {...seoData} />
      <Layout>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Neev News',
              url: 'https://neevnews.com',
              description: 'Global news and articles platform providing trusted journalism and in-depth analysis.',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://neevnews.com/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
              publisher: {
                '@type': 'NewsMediaOrganization',
                name: 'Neev News',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://neevnews.com/logo.png',
                },
                sameAs: [
                  'https://www.linkedin.com/in/neev-news-855010395/',
                  'https://x.com/NeevNews',
                  'https://www.instagram.com/neevnews/'
                ]
              },
            }),
          }}
        />

        <div className="bg-white dark:bg-secondary-950">
          {/* Breaking News Ticker */}
          {breakingNews.length > 0 && (
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white overflow-hidden">
              <div className="container-custom py-2">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full flex-shrink-0">
                    <Zap size={14} className="fill-current animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider">Breaking</span>
                  </div>
                  <div className="overflow-hidden flex-1">
                    <div className="animate-marquee whitespace-nowrap">
                      {breakingNews.map((article, index) => (
                        <Link
                          key={article.id}
                          href={getArticleUrl(article)}
                          className="inline-block hover:underline mr-16"
                        >
                          <span className="font-medium">{article.title}</span>
                          {index < breakingNews.length - 1 && (
                            <span className="mx-8 text-white/50">|</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Empty State - Only show if no content at all */}
          {latestNews.length === 0 && featuredArticles.length === 0 && breakingNews.length === 0 && (
            <section className="container-custom py-20">
              <div className="max-w-2xl mx-auto text-center">
                <div className="w-24 h-24 bg-secondary-100 dark:bg-secondary-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-secondary-400 text-4xl">📰</span>
                </div>
                <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-2 font-serif">
                  No Articles Found
                </h2>
                <p className="text-secondary-600 dark:text-secondary-400">
                  We couldn't find any articles at the moment. Please check back later or verify your internet connection.
                </p>
              </div>
            </section>
          )}

          {/* Hero Section - Main Featured Story */}
          {featuredArticles.length > 0 && (
            <section className="relative bg-gradient-to-b from-secondary-50 to-white dark:from-secondary-900 dark:to-secondary-950">
              <div className="container-custom py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Featured Article */}
                  <div className="lg:col-span-2">
                    <Link href={getArticleUrl(featuredArticles[0])} className="group">
                      <div className="relative aspect-[16/9] lg:aspect-[21/9] overflow-hidden rounded-2xl">
                        <Image
                          src={getImageUrl(featuredArticles[0].imageUrl)}
                          alt={featuredArticles[0].title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          priority
                          sizes="(max-width: 768px) 100vw, 66vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                        {/* Badges */}
                        <div className="absolute top-6 left-6 flex items-center space-x-2">
                          {featuredArticles[0].isBreaking && (
                            <span className="px-4 py-1.5 bg-red-600 text-white text-xs font-bold rounded-full animate-pulse flex items-center space-x-1">
                              <Zap size={12} className="fill-current" />
                              <span>BREAKING</span>
                            </span>
                          )}
                          <span className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-full flex items-center space-x-1">
                            <Flame size={12} className="fill-current" />
                            <span>FEATURED</span>
                          </span>
                          <span className={`px-3 py-1.5 text-white text-xs font-medium rounded-full ${getCategoryColor(featuredArticles[0].category)}`}>
                            {featuredArticles[0].category}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight group-hover:text-primary-300 transition-colors duration-200">
                            {featuredArticles[0].title}
                          </h1>
                          <p className="text-lg text-white/90 mb-4 line-clamp-2">
                            {featuredArticles[0].summary}
                          </p>
                          <div className="flex items-center space-x-4 text-white/80 text-sm">
                            <span className="flex items-center space-x-1">
                              <User size={14} />
                              <span>{featuredArticles[0].author}</span>
                            </span>
                            <span>•</span>
                            <span className="flex items-center space-x-1">
                              <Clock size={14} />
                              <span>{formatTimeAgo(featuredArticles[0].createdAt)}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>

                    {/* Secondary Featured Articles */}
                    {featuredArticles.length > 1 && (
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        {featuredArticles.slice(1, 3).map((article) => (
                          <Link key={article.id} href={getArticleUrl(article)} className="group">
                            <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                              <Image
                                src={getImageUrl(article.imageUrl)}
                                alt={article.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                              <div className="absolute bottom-0 left-0 right-0 p-4">
                                <span className={`inline-block px-2 py-0.5 text-white text-xs font-medium rounded mb-2 ${getCategoryColor(article.category)}`}>
                                  {article.category}
                                </span>
                                <h3 className="text-white font-semibold line-clamp-2 group-hover:text-primary-300 transition-colors duration-200">
                                  {article.title}
                                </h3>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Sidebar - Trending & Newsletter */}
                  <div className="space-y-6">
                    {/* Trending Now */}
                    <div className="card p-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <TrendingUp size={20} className="text-orange-600" />
                        <h3 className="text-lg font-bold text-secondary-900 dark:text-white">
                          Trending Now
                        </h3>
                      </div>
                      <div className="space-y-4">
                        {trendingArticles.map((article, index) => (
                          <Link
                            key={article.id}
                            href={getArticleUrl(article)}
                            className="group block"
                          >
                            <div className="flex space-x-3">
                              <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                                {index + 1}
                              </span>
                              <div className="flex-1">
                                <h4 className="text-sm font-semibold text-secondary-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 line-clamp-2">
                                  {article.title}
                                </h4>
                                <div className="flex items-center space-x-2 mt-1 text-xs text-secondary-500">
                                  <span>{article.category}</span>
                                  <span>•</span>
                                  <span>{formatTimeAgo(article.createdAt)}</span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Newsletter Signup */}
                    <div className="card p-6 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 border-primary-200 dark:border-primary-800">
                      <h3 className="text-lg font-bold text-secondary-900 dark:text-white mb-2">
                        Daily Newsletter
                      </h3>
                      <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-4">
                        Get the day's top stories delivered to your inbox every morning.
                      </p>
                      <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                        <input
                          type="email"
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          placeholder="Enter your email"
                          disabled={newsletterStatus === 'loading'}
                          className="w-full px-4 py-3 rounded-lg border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm disabled:opacity-50"
                          required
                        />
                        <button
                          type="submit"
                          disabled={newsletterStatus === 'loading'}
                          className="w-full btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {newsletterStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
                        </button>
                        {newsletterMessage && (
                          <p className={`text-xs ${newsletterStatus === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            {newsletterMessage}
                          </p>
                        )}
                      </form>
                      <p className="text-xs text-secondary-500 mt-3">
                        Free. No spam. Unsubscribe anytime.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Latest News Grid */}
          <section className="container-custom py-12">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-8 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full"></div>
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif">
                  Latest News
                </h2>
              </div>
              <Link
                href="/news"
                className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold transition-colors duration-200"
              >
                <span>View All</span>
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {latestNews.map((article) => (
                <article key={article.id} className="group">
                  <Link href={getArticleUrl(article)}>
                    <div className="card-hover overflow-hidden">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={getImageUrl(article.imageUrl)}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3 flex items-center space-x-2">
                          {article.isPinned && (
                            <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded flex items-center space-x-1">
                              <Pin size={10} />
                              <span>Pinned</span>
                            </span>
                          )}
                          {article.isBreaking && (
                            <span className="px-2 py-1 bg-red-600 text-white text-xs font-medium rounded flex items-center space-x-1">
                              <Zap size={10} className="fill-current" />
                              <span>Breaking</span>
                            </span>
                          )}
                          <span className={`px-2 py-1 text-white text-xs font-medium rounded ${getCategoryColor(article.category)}`}>
                            {article.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-base font-semibold text-secondary-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                          {article.title}
                        </h3>
                        <p className="text-secondary-600 dark:text-secondary-400 text-sm line-clamp-2 mb-3">
                          {article.summary}
                        </p>
                        <div className="flex items-center text-xs text-secondary-500">
                          <span className="flex items-center space-x-1">
                            <Clock size={12} />
                            <span>{formatTimeAgo(article.createdAt)}</span>
                          </span>
                          {article.isTrending && (
                            <>
                              <span className="mx-2">•</span>
                              <span className="flex items-center space-x-1 text-orange-600">
                                <TrendingUp size={12} />
                                <span>Trending</span>
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>

          {/* Category Sections */}
          {Object.entries(categoryNews).map(([categoryName, articles]) => (
            articles.length > 0 && (
              <section key={categoryName} className="bg-secondary-50 dark:bg-secondary-900/50 py-12">
                <div className="container-custom">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-3">
                      <div className="w-1 h-8 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full"></div>
                      <h2 className="text-2xl font-bold text-secondary-900 dark:text-white font-serif">
                        {categoryName}
                      </h2>
                    </div>
                    <Link
                      href={`/category/${categories.find(c => c.name === categoryName)?.slug}`}
                      className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm transition-colors duration-200"
                    >
                      <span>More {categoryName}</span>
                      <ChevronRight size={16} />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {articles.map((article) => (
                      <article key={article.id} className="group">
                        <Link href={getArticleUrl(article)}>
                          <div className="card-hover overflow-hidden">
                            <div className="relative aspect-[16/10] overflow-hidden">
                              <Image
                                src={getImageUrl(article.imageUrl)}
                                alt={article.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                loading="lazy"
                              />
                              {article.isTrending && (
                                <div className="absolute top-3 left-3">
                                  <span className="px-2 py-1 bg-orange-600 text-white text-xs font-medium rounded flex items-center space-x-1">
                                    <TrendingUp size={10} />
                                    <span>Trending</span>
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="p-4">
                              <h3 className="text-sm font-semibold text-secondary-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                                {article.title}
                              </h3>
                              <div className="flex items-center text-xs text-secondary-500">
                                <span>{formatTimeAgo(article.createdAt)}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            )
          ))}
        </div>
      </Layout>
    </>
  );
};

export default HomePage;
