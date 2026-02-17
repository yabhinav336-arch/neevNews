import React, { useState } from 'react';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { categories, getArticleUrl } from '../utils/data';
import { getImageUrl } from '../utils/images';
import { subscribeToNewsletter } from '../services/newsletter';
import Layout from '@/components/Layout/Layout';
import {
  TrendingUp,
  Clock,
  User,
  ArrowRight,
  ChevronRight,
  Flame,
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
  createdAt: string; // ISO string for serialization
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
  publishedAt?: string;
}

interface HomePageProps {
  featuredArticles: Article[];
  latestNews: Article[];
  trendingArticles: Article[];
  breakingNews: Article[];
  pinnedArticles: Article[];
  categoryNews: { [key: string]: Article[] };
}

const HomePage: React.FC<HomePageProps> = ({
  featuredArticles,
  latestNews,
  trendingArticles,
  breakingNews,
  pinnedArticles,
  categoryNews
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterMessage, setNewsletterMessage] = useState('');

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

  const formatTimeAgo = (date: string) => {
    if (!date) return '';
    const dateObj = new Date(date);
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
                  We couldn't find any articles at the moment. Please check back later.
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
                      <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                        {/* Hero Image */}
                        <Image
                          src={getImageUrl(featuredArticles[0].imageUrl)}
                          alt={featuredArticles[0].title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          priority
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                        {/* Badges */}
                        <div className="absolute top-2 left-2 right-2 md:top-4 md:left-4 md:right-4 flex flex-wrap gap-1.5 md:gap-2">
                          {featuredArticles[0].isBreaking && (
                            <span className="px-2 py-0.5 md:px-3 md:py-1 bg-red-600 text-white text-[10px] md:text-xs font-bold rounded-full animate-pulse flex items-center space-x-1">
                              <Zap size={10} className="fill-current" />
                              <span>BREAKING</span>
                            </span>
                          )}
                          <span className="px-2 py-0.5 md:px-3 md:py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[10px] md:text-xs font-bold rounded-full flex items-center space-x-1">
                            <Flame size={10} className="fill-current" />
                            <span>FEATURED</span>
                          </span>
                          <span className={`px-2 py-0.5 md:px-3 md:py-1 text-white text-[10px] md:text-xs font-medium rounded-full ${getCategoryColor(featuredArticles[0].category)}`}>
                            {featuredArticles[0].category}
                          </span>
                        </div>

                        {/* Hero Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
                          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-4 font-serif leading-tight">
                            {featuredArticles[0].title}
                          </h2>
                          <p className="text-gray-200 line-clamp-2 md:line-clamp-3 mb-2 md:mb-4 text-xs md:text-base hidden sm:block">
                            {featuredArticles[0].summary}
                          </p>
                          <div className="flex items-center text-gray-300 text-[10px] md:text-sm space-x-4">
                            <span className="flex items-center space-x-1.5">
                              <User size={12} className="md:w-4 md:h-4" />
                              <span>{featuredArticles[0].author}</span>
                            </span>
                            <span className="flex items-center space-x-1.5">
                              <Clock size={12} className="md:w-4 md:h-4" />
                              <span>{formatTimeAgo(featuredArticles[0].createdAt)}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>

                    {/* Secondary Featured Articles */}
                    {featuredArticles.length > 1 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-3 md:mt-4">
                        {featuredArticles.slice(1, 3).map((article) => (
                          <Link key={article.id} href={getArticleUrl(article)} className="group">
                            <div className="relative aspect-[16/9] overflow-hidden rounded-lg md:rounded-xl">
                              <Image
                                src={getImageUrl(article.imageUrl)}
                                alt={article.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 25vw"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                                <span className={`inline-block px-1.5 py-0.5 md:px-2 md:py-1 text-[9px] md:text-[10px] font-bold text-white rounded mb-1 md:mb-2 ${getCategoryColor(article.category)}`}>
                                  {article.category}
                                </span>
                                <h3 className="text-sm md:text-lg font-bold text-white line-clamp-2 leading-tight">
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
                    <div className="card p-4 sm:p-6">
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
          <section className="container-custom py-4 md:py-12">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 md:mb-8">
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="w-1 h-6 md:h-8 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full"></div>
                <h2 className="text-xl md:text-3xl font-bold text-secondary-900 dark:text-white font-serif">
                  Latest News
                </h2>
              </div>
              <Link
                href="/news"
                className="flex items-center space-x-1 md:space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold text-sm transition-colors duration-200"
              >
                <span>View All</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
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
                        <div className="absolute top-2 left-2 flex items-center space-x-2">
                          {article.isPinned && (
                            <span className="px-2 py-1 bg-blue-600 text-white text-[10px] font-medium rounded flex items-center space-x-1">
                              <Pin size={10} />
                              <span>Pinned</span>
                            </span>
                          )}
                          {article.isBreaking && (
                            <span className="px-2 py-1 bg-red-600 text-white text-[10px] font-medium rounded flex items-center space-x-1">
                              <Zap size={10} className="fill-current" />
                              <span>Breaking</span>
                            </span>
                          )}
                          <span className={`px-2 py-1 text-white text-[10px] font-medium rounded ${getCategoryColor(article.category)}`}>
                            {article.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-3 md:p-4">
                        <h3 className="text-base font-semibold text-secondary-900 dark:text-white mb-2 line-clamp-2 leading-snug group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                          {article.title}
                        </h3>
                        <p className="text-secondary-600 dark:text-secondary-400 text-xs md:text-sm line-clamp-2 mb-2 md:mb-3">
                          {article.summary}
                        </p>
                        <div className="flex items-center text-[10px] md:text-xs text-secondary-500">
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
              <section key={categoryName} className="bg-secondary-50 dark:bg-secondary-900/50 py-6 md:py-12">
                <div className="container-custom">
                  <div className="flex items-center justify-between mb-4 md:mb-8">
                    <div className="flex items-center space-x-2 md:space-x-3">
                      <div className="w-1 h-6 md:h-8 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full"></div>
                      <h2 className="text-lg md:text-2xl font-bold text-secondary-900 dark:text-white font-serif">
                        {categoryName}
                      </h2>
                    </div>
                    <Link
                      href={`/category/${categories.find(c => c.name === categoryName)?.slug}`}
                      className="flex items-center space-x-1 md:space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-xs md:text-sm transition-colors duration-200"
                    >
                      <span>More {categoryName}</span>
                      <ChevronRight size={14} />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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
                                <div className="absolute top-2 left-2">
                                  <span className="px-2 py-1 bg-orange-600 text-white text-[10px] font-medium rounded flex items-center space-x-1">
                                    <TrendingUp size={10} />
                                    <span>Trending</span>
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="p-3 md:p-4">
                              <h3 className="text-sm font-semibold text-secondary-900 dark:text-white mb-1 md:mb-2 line-clamp-2 leading-snug group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                                {article.title}
                              </h3>
                              <div className="flex items-center text-[10px] md:text-xs text-secondary-500">
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

export const getStaticProps: GetStaticProps = async () => {
  try {
    const newsRef = collection(db, 'news');
    // We fetch all published news first. Sorting in JS is often safer/easier if the collection isn't huge
    // to avoid index issues, but for production with many docs, use orderBy/limit.
    // Given the constraints (we want correct sorting), let's try to query efficiently
    // provided indices exist.
    const q = query(
      newsRef,
      where('status', '==', 'published')
      // orderBy('createdAt', 'desc') // Requires index, but best practice
    );

    const snapshot = await getDocs(q);
    const articles: Article[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      articles.push({
        id: doc.id,
        title: data.title || '',
        summary: data.summary || '',
        content: data.content || '',
        imageUrl: data.imageUrl || '',
        category: data.category || '',
        author: data.author || '',
        slug: data.slug || '',
        status: data.status,
        featured: data.featured || false,
        isBreaking: data.isBreaking || false,
        isTrending: data.isTrending || false,
        isPinned: data.isPinned || false,
        homepagePosition: data.homepagePosition || 0,
        views: data.views || 0,
        likes: data.likes || 0,
        tags: data.tags || [],
        keywords: data.keywords || '',
        metaDescription: data.metaDescription || '',
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
        publishedAt: data.publishedAt?.toDate ? data.publishedAt.toDate().toISOString() : null,
      });
    });

    // Sort in memory to avoid missing index errors during this critical fix
    articles.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Derived lists
    const breakingNews = articles.filter(a => a.isBreaking);
    const featuredArticles = articles.filter(a => a.featured).slice(0, 3);
    const trending = articles.filter(a => a.isTrending);
    const trendingArticles = trending.length > 0 ? trending.slice(0, 5) : articles.slice(0, 5);
    const pinnedArticles = articles.filter(a => a.isPinned);

    // Latest news logic
    const unpinnedArticles = articles.filter(a => !a.isPinned);
    const orderedLatest = [...pinnedArticles, ...unpinnedArticles].slice(0, 12);

    // Category grouping
    const categoryNews: { [key: string]: Article[] } = {};
    categories.slice(0, 4).forEach(cat => {
      categoryNews[cat.name] = articles
        .filter(a => a.category === cat.name)
        .slice(0, 4);
    });

    return {
      props: {
        featuredArticles,
        latestNews: orderedLatest,
        trendingArticles,
        breakingNews,
        pinnedArticles,
        categoryNews
      },
      revalidate: 60, // IRS: Revalidate every 60 seconds
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        featuredArticles: [],
        latestNews: [],
        trendingArticles: [],
        breakingNews: [],
        pinnedArticles: [],
        categoryNews: {}
      },
      revalidate: 60
    };
  }
};

export default HomePage;
