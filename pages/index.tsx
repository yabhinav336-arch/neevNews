import React, { useState, useEffect } from 'react';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { categories, trendingTopics } from '../utils/data';
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
  Zap
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
}

const HomePage: React.FC = () => {
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [latestNews, setLatestNews] = useState<Article[]>([]);
  const [trendingArticles, setTrendingArticles] = useState<Article[]>([]);
  const [categoryNews, setCategoryNews] = useState<{ [key: string]: Article[] }>({});
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterMessage, setNewsletterMessage] = useState('');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      // Fetch all articles from Firebase
      const querySnapshot = await getDocs(collection(db, 'news'));
      const allArticles = querySnapshot.docs.map(doc => ({ 
        ...doc.data(), 
        id: doc.id 
      })) as Article[];

      console.log('Fetched articles from Firebase:', allArticles.length);

      // Filter published articles
      const publishedArticles = allArticles.filter(article => article.status === 'published');
      
      // Sort by date (newest first)
      const sortedArticles = publishedArticles.sort((a, b) => {
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });

      setFeaturedArticles(sortedArticles.filter(article => article.featured).slice(0, 1));
      setLatestNews(sortedArticles.slice(0, 12));
      setTrendingArticles(sortedArticles.slice(0, 3));

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
    title: 'NeevNews - Breaking News, Latest Updates & Global Headlines',
    description: 'Stay informed with NeevNews - your trusted source for breaking news, global headlines, and in-depth analysis. Covering politics, technology, business, science, and world events 24/7.',
    keywords: 'breaking news, latest news, global headlines, world news, politics, technology, business, science, health, sports, entertainment, journalism, live news',
    openGraph: {
      title: 'NeevNews - Breaking News & Global Headlines',
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
                  url: 'https://neevnews.com/logo.svg',
                },
              },
            }),
          }}
        />

        <div className="bg-white dark:bg-secondary-950">
          {/* Empty State */}
          {latestNews.length === 0 && (
            <section className="container-custom py-20">
              <div className="max-w-2xl mx-auto text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-4xl">📰</span>
                </div>
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-4 font-serif">
                  No Articles Yet
                </h2>
                <p className="text-lg text-secondary-600 dark:text-secondary-400 mb-8">
                  Start creating amazing news articles using the admin panel to see them appear here.
                </p>
                <Link
                  href="/admin"
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  <span>Create Your First Article</span>
                  <ArrowRight size={20} />
                </Link>
                <div className="mt-12 p-6 bg-secondary-50 dark:bg-secondary-900 rounded-xl">
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-3">
                    Quick Start Guide:
                  </h3>
                  <ol className="text-left space-y-2 text-secondary-700 dark:text-secondary-300">
                    <li className="flex items-start space-x-2">
                      <span className="font-bold text-primary-600">1.</span>
                      <span>Go to <Link href="/admin" className="text-primary-600 hover:underline">/admin</Link> page</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="font-bold text-primary-600">2.</span>
                      <span>Fill in article title, summary, and content</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="font-bold text-primary-600">3.</span>
                      <span>Add an image URL from Unsplash or your server</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="font-bold text-primary-600">4.</span>
                      <span>Select category, author, and set status to "Published"</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="font-bold text-primary-600">5.</span>
                      <span>Click "Create Article" and watch it appear here!</span>
                    </li>
                  </ol>
                </div>
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
                    <Link href={`/article/${featuredArticles[0].slug || featuredArticles[0].id}`} className="group">
                      <div className="relative aspect-[16/9] lg:aspect-[21/9] overflow-hidden rounded-2xl">
                        <Image
                          src={featuredArticles[0].imageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'}
                          alt={featuredArticles[0].title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                        
                        {/* Breaking Badge */}
                        <div className="absolute top-6 left-6 flex items-center space-x-2">
                          <span className="px-4 py-1.5 bg-red-600 text-white text-xs font-bold rounded-full animate-pulse flex items-center space-x-1">
                            <Zap size={12} className="fill-current" />
                            <span>BREAKING</span>
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
                  </div>

                  {/* Sidebar - Trending & Newsletter */}
                  <div className="space-y-6">
                    {/* Trending Now */}
                    <div className="card p-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <Flame size={20} className="text-red-600" />
                        <h3 className="text-lg font-bold text-secondary-900 dark:text-white">
                          Trending Now
                        </h3>
                      </div>
                      <div className="space-y-4">
                        {trendingArticles.map((article, index) => (
                          <Link
                            key={article.id}
                            href={`/article/${article.slug || article.id}`}
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
                  <Link href={`/article/${article.slug || article.id}`}>
                    <div className="card-hover overflow-hidden">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={article.imageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3">
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
                        <Link href={`/article/${article.slug || article.id}`}>
                          <div className="card-hover overflow-hidden">
                            <div className="relative aspect-[16/10] overflow-hidden">
                              <Image
                                src={article.imageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'}
                                alt={article.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
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
