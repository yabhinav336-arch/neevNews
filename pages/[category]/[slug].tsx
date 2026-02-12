import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { categories } from '../../utils/data';
import { getImageUrl } from '../../utils/images';
import Layout from '../../components/Layout/Layout';
import {
  Clock,
  User,
  Heart,
  Share2,
  Calendar,
  ArrowLeft,
  Tag,
  TrendingUp,
  MessageCircle,
  Twitter,
  Facebook,
  Linkedin,
  Mail,
  MessageSquare,
  Send
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
  updatedAt?: any;
  metaDescription: string;
  keywords: string;
  tags: string[];
  featured: boolean;
  status: string;
  slug: string;
  views: number;
  likes: number;
  sourceUrl?: string;
  sourceName?: string;
}

// Helper function to get category slug from category name
const getCategorySlug = (categoryName: string): string => {
  const category = categories.find(cat => cat.name === categoryName);
  return category?.slug || categoryName.toLowerCase().replace(/\s+/g, '-');
};

// Helper function to get article URL
const getArticleUrl = (article: Article): string => {
  const categorySlug = getCategorySlug(article.category);
  return `/${categorySlug}/${article.slug}`;
};

const ArticlePage = () => {
  const router = useRouter();
  const { category: categorySlug, slug: articleSlug } = router.query;
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    // Wait for router to be ready
    if (!router.isReady) return;

    if (articleSlug && typeof articleSlug === 'string') {
      fetchArticle(articleSlug);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleSlug, categorySlug, router.isReady]);

  useEffect(() => {
    if (article?.content) {
      // Calculate reading time (average 200 words per minute)
      const wordCount = article.content.split(' ').length;
      setReadingTime(Math.ceil(wordCount / 200));
    }
  }, [article]);

  // Category validation is now handled in fetchArticle
  // This effect is no longer needed

  const fetchArticle = async (articleSlug: string) => {
    if (!articleSlug) return;

    setLoading(true);
    setError(null);

    // Set a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (loading) {
        console.error('Article fetch timeout for slug:', articleSlug);
        setError('Request timeout. Please check your connection and try again.');
        setLoading(false);
      }
    }, 10000); // 10 second timeout

    try {
      const articlesRef = collection(db, 'news');

      // First try querying with slug and status (requires composite index)
      let querySnapshot;
      try {
        const q = query(
          articlesRef,
          where('slug', '==', articleSlug),
          where('status', '==', 'published')
        );
        querySnapshot = await getDocs(q);
      } catch (indexError: any) {
        // If index error, fallback to query by slug only, then filter client-side
        if (indexError?.code === 'failed-precondition') {
          console.warn('Composite index not found. Falling back to slug-only query.');
          const q = query(articlesRef, where('slug', '==', articleSlug));
          querySnapshot = await getDocs(q);
        } else {
          throw indexError;
        }
      }

      clearTimeout(timeoutId);

      if (!querySnapshot || querySnapshot.empty) {
        console.error('Article not found for slug:', articleSlug);
        setError(`Article not found: ${articleSlug}`);
        setLoading(false);
        return;
      }

      // Get all articles with this slug (in case of fallback query)
      const articles = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as Article[];

      // Filter by status if we used fallback query
      const publishedArticles = articles.filter(article => article.status === 'published');

      if (publishedArticles.length === 0) {
        console.error('No published article found for slug:', articleSlug);
        setError(`No published article found for: ${articleSlug}`);
        setLoading(false);
        return;
      }

      const articleData = publishedArticles[0];
      setArticle(articleData);
      setLoading(false);

      // Validate category matches URL category
      if (categorySlug && typeof categorySlug === 'string') {
        const expectedCategorySlug = getCategorySlug(articleData.category);
        if (categorySlug !== expectedCategorySlug) {
          // Redirect to correct URL with proper category
          const correctUrl = getArticleUrl(articleData);
          router.replace(correctUrl);
          return;
        }
      }

      fetchRelatedArticles(articleData.category, articleSlug);
    } catch (error: any) {
      clearTimeout(timeoutId);
      console.error('Error fetching article:', error);
      console.error('Error details:', {
        code: error?.code,
        message: error?.message,
        slug: articleSlug
      });
      setError(error?.message || 'Failed to load article. Please try again.');
      setLoading(false);
    }
  };

  const fetchRelatedArticles = async (category: string, currentSlug: string) => {
    try {
      const articlesRef = collection(db, 'news');
      const q = query(
        articlesRef,
        where('category', '==', category),
        where('status', '==', 'published'),
        orderBy('createdAt', 'desc'),
        limit(4)
      );
      const querySnapshot = await getDocs(q);
      const articles = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as Article[];
      // Filter out current article
      setRelatedArticles(articles.filter(article => article.slug !== currentSlug));
    } catch (error) {
      console.error('Error fetching related articles:', error);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    // Here you would typically update the like count in Firebase
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = article?.title || '';
    const text = article?.summary || '';

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`);
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`);
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`);
        break;
    }
    setShowShareMenu(false);
  };


  const formatDateIST = (date: any) => {
    if (!date) return '';
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    return dateObj.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Kolkata'
    }) + ' IST';
  };

  const shouldShowUpdated = (created: any, updated: any) => {
    if (!updated) return false;
    const createdDate = created.toDate ? created.toDate() : new Date(created);
    const updatedDate = updated.toDate ? updated.toDate() : new Date(updated);

    // Check if invalid dates
    if (isNaN(createdDate.getTime()) || isNaN(updatedDate.getTime())) return false;

    // Show updated if difference is more than 15 minutes (900000 ms)
    return updatedDate.getTime() - createdDate.getTime() > 900000;
  };

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(cat => cat.name === category);
    return categoryData?.icon || '📰';
  };

  const getCategoryColor = (category: string) => {
    const categoryData = categories.find(cat => cat.name === category);
    return categoryData?.color || 'bg-blue-500';
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-secondary-600 dark:text-secondary-400">Loading article...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!article) {
    return (
      <Layout>
        <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 flex items-center justify-center">
          <div className="text-center max-w-2xl mx-auto px-4">
            {error ? (
              <>
                <div className="text-6xl mb-6">📰</div>
                <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-4">Article Not Found</h1>
                <p className="text-secondary-600 dark:text-secondary-400 mb-2">
                  We couldn't find the article you're looking for.
                </p>
                <p className="text-sm text-secondary-500 dark:text-secondary-500 mb-6 font-mono bg-secondary-100 dark:bg-secondary-800 p-3 rounded">
                  {error}
                </p>
                <div className="space-x-4">
                  <Link href="/" className="inline-block px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200">
                    Back to Home
                  </Link>
                  <button
                    onClick={() => router.back()}
                    className="inline-block px-6 py-3 bg-secondary-200 dark:bg-secondary-700 hover:bg-secondary-300 dark:hover:bg-secondary-600 text-secondary-700 dark:text-secondary-300 font-semibold rounded-lg transition-colors duration-200"
                  >
                    Go Back
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-secondary-600 dark:text-secondary-400">Loading article...</p>
              </>
            )}
          </div>
        </div>
      </Layout>
    );
  }

  const articleUrl = getArticleUrl(article);

  // Structured data for the article (NewsArticle schema for Google)
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.metaDescription || article.summary,
    image: article.imageUrl,
    datePublished: article.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
    dateModified: article.updatedAt?.toDate?.()?.toISOString() || article.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: article.author || 'Neev News',
      url: 'https://neevnews.com/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Neev News',
      url: 'https://neevnews.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://neevnews.com/logo.png',
        width: 600,
        height: 60,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://neevnews.com${articleUrl}`,
    },
    articleSection: article.category,
    keywords: article.keywords || article.tags?.join(', ') || '',
    articleBody: article.content,
    wordCount: article.content?.split(' ').length || 0,
    inLanguage: 'en-US',
  };

  return (
    <Layout
      title={article.title}
      description={article.metaDescription || article.summary}
      keywords={article.keywords}
      canonicalUrl={`https://neevnews.com${articleUrl}`}
    >
      <Head>
        {/* Structured Data for NewsArticle */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.metaDescription || article.summary} />
        <meta property="og:image" content={article.imageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://neevnews.com${articleUrl}`} />
        <meta property="article:author" content={article.author} />
        <meta property="article:published_time" content={article.createdAt?.toDate?.()?.toISOString() || ''} />
        <meta property="article:section" content={article.category} />
        {article.tags.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@neevnews" />
        <meta name="twitter:creator" content="@neevnews" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.metaDescription || article.summary} />
        <meta name="twitter:image" content={article.imageUrl} />
        <meta name="twitter:image:alt" content={article.title} />

        {/* Additional SEO Meta Tags */}
        <meta name="news_keywords" content={article.keywords || article.category} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

        {/* Mobile App Meta Tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="NeevNews" />

        {/* Microsoft Tags */}
        <meta name="msapplication-TileColor" content="#D9774A" />
        <meta name="msapplication-TileImage" content="/logo.png" />

        {/* Google News Subscribe with Google */}
        <script async type="application/javascript" src="https://news.google.com/swg/js/v1/swg-basic.js"></script>

        {/* Structured Data - NewsArticle */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'NewsArticle',
              headline: article.title,
              description: article.summary,
              image: {
                '@type': 'ImageObject',
                url: article.imageUrl,
                width: 1200,
                height: 630,
              },
              datePublished: article.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
              dateModified: article.updatedAt?.toDate?.()?.toISOString() || article.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
              author: {
                '@type': 'Person',
                name: article.author,
                url: `https://neevnews.com/author/${article.author.toLowerCase().replace(/\s+/g, '-')}`,
              },
              publisher: {
                '@type': 'NewsMediaOrganization',
                name: 'Neev News',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://neevnews.com/logo.png',
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
                '@id': `https://neevnews.com${articleUrl}`,
              },
              articleSection: article.category,
              keywords: article.keywords || article.tags?.join(', ') || article.category,
              wordCount: article.content?.split(' ').length || 0,
              articleBody: article.content,
              isAccessibleForFree: true,
              inLanguage: 'en-US',
            })
          }}
        />

        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://neevnews.com',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: article.category,
                  item: `https://neevnews.com/category/${getCategorySlug(article.category)}`,
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: article.title,
                  item: `https://neevnews.com${articleUrl}`,
                },
              ],
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
        {/* Google News Subscribe with Google Initialization */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (self.SWG_BASIC = self.SWG_BASIC || []).push( basicSubscriptions => {
                basicSubscriptions.init({
                  type: "NewsArticle",
                  isPartOfType: ["Product"],
                  isPartOfProductId: "CAow-YPCDA:openaccess",
                  clientOptions: { theme: "light", lang: "en" },
                });
              });
            `,
          }}
        />

        {/* Header Section */}
        <div className="bg-white dark:bg-secondary-950 border-b border-secondary-200 dark:border-secondary-800">
          <div className="container-custom py-6">
            {/* Back Button */}
            <Link
              href="/"
              className="inline-flex items-center space-x-2 px-4 py-2 mb-6 text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
            >
              <ArrowLeft size={18} />
              <span>Back to News</span>
            </Link>
          </div>
        </div>

        <div className="container-custom py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-3">
              <div className="max-w-4xl">
                {/* Category Badge */}
                <div className="mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(article.category)} text-white`}>
                    <span className="mr-2">{getCategoryIcon(article.category)}</span>
                    {article.category}
                  </span>
                </div>

                {/* Article Title - First */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-900 dark:text-white mb-6 font-serif leading-tight">
                  {article.title}
                </h1>

                {/* Article Meta Info */}
                <div className="flex flex-col gap-2 text-secondary-600 dark:text-secondary-400 text-sm mb-8">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-secondary-900 dark:text-white text-base">By {article.author}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-secondary-500 dark:text-secondary-400">
                    <span className="font-medium">Published: {formatDateIST(article.createdAt)}</span>
                    {shouldShowUpdated(article.createdAt, article.updatedAt) && (
                      <>
                        <span className="hidden sm:inline mx-1 text-secondary-300 dark:text-secondary-600">|</span>
                        <span className="font-medium">Updated: {formatDateIST(article.updatedAt)}</span>
                      </>
                    )}
                    <span className="hidden sm:inline mx-1 text-secondary-300 dark:text-secondary-600">|</span>
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{readingTime} min read</span>
                    </div>
                  </div>
                </div>

                {/* Featured Image - Second */}
                <div className="relative w-full aspect-video mb-8 rounded-xl overflow-hidden">
                  <Image
                    src={getImageUrl(article.imageUrl)}
                    alt={article.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 900px"
                  />
                </div>

                {/* Article Summary */}
                <div className="mb-8 p-6 bg-primary-50 dark:bg-primary-900/20 rounded-xl border-l-4 border-primary-500">
                  <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                {/* Article Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <div
                    className="whitespace-pre-wrap text-secondary-800 dark:text-secondary-200 leading-[1.8] text-lg md:text-xl font-normal"
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      lineHeight: '1.8',
                      letterSpacing: '0.01em'
                    }}
                  >
                    {article.content.split(/(https?:\/\/[^\s]+)/g).map((part, index) => {
                      if (part.match(/https?:\/\/[^\s]+/)) {
                        return (
                          <a
                            key={index}
                            href={part}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 dark:text-primary-400 hover:underline break-all"
                          >
                            {part}
                          </a>
                        );
                      }
                      return part;
                    })}
                  </div>
                </div>

                {/* Source Link */}
                {article.sourceUrl && (
                  <div className="mt-8 pt-4 border-t border-secondary-200 dark:border-secondary-700">
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">
                      Source: {' '}
                      <a
                        href={article.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
                      >
                        {article.sourceName || 'Read Original Article'}
                        <span className="inline-block ml-1">↗</span>
                      </a>
                    </p>
                  </div>
                )}

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-secondary-200 dark:border-secondary-700">
                    <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4 flex items-center">
                      <Tag size={20} className="mr-2" />
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-secondary-200 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 rounded-full text-sm hover:bg-secondary-300 dark:hover:bg-secondary-600 transition-colors duration-200 cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Social Actions */}
                <div className="mt-12 pt-8 border-t border-secondary-200 dark:border-secondary-700">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={handleLike}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${isLiked
                          ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                          : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400 hover:bg-secondary-200 dark:hover:bg-secondary-700'
                          }`}
                      >
                        <Heart size={18} className={isLiked ? 'fill-current' : ''} />
                        <span>{article.likes + (isLiked ? 1 : 0)}</span>
                      </button>

                      <button className="flex items-center space-x-2 px-4 py-2 bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400 rounded-lg hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors duration-200">
                        <MessageCircle size={18} />
                        <span>Comment</span>
                      </button>
                    </div>

                    <div className="relative w-full sm:w-auto">
                      <button
                        onClick={() => setShowShareMenu(!showShareMenu)}
                        className="w-full sm:w-auto flex items-center justify-center space-x-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-900/30 transition-colors duration-200 min-h-[44px]"
                      >
                        <Share2 size={18} />
                        <span>Share</span>
                      </button>

                      {showShareMenu && (
                        <div className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-secondary-800 rounded-lg shadow-lg border border-secondary-200 dark:border-secondary-700 py-2 z-50">
                          <button
                            onClick={() => handleShare('whatsapp')}
                            className="w-full px-4 py-2 text-left hover:bg-secondary-100 dark:hover:bg-secondary-700 flex items-center space-x-3"
                          >
                            <MessageSquare size={18} className="text-green-500" />
                            <span>WhatsApp</span>
                          </button>
                          <button
                            onClick={() => handleShare('telegram')}
                            className="w-full px-4 py-2 text-left hover:bg-secondary-100 dark:hover:bg-secondary-700 flex items-center space-x-3"
                          >
                            <Send size={18} className="text-blue-400" />
                            <span>Telegram</span>
                          </button>
                          <button
                            onClick={() => handleShare('twitter')}
                            className="w-full px-4 py-2 text-left hover:bg-secondary-100 dark:hover:bg-secondary-700 flex items-center space-x-3"
                          >
                            <Twitter size={18} className="text-blue-400" />
                            <span>Twitter</span>
                          </button>
                          <button
                            onClick={() => handleShare('facebook')}
                            className="w-full px-4 py-2 text-left hover:bg-secondary-100 dark:hover:bg-secondary-700 flex items-center space-x-3"
                          >
                            <Facebook size={18} className="text-blue-600" />
                            <span>Facebook</span>
                          </button>
                          <button
                            onClick={() => handleShare('linkedin')}
                            className="w-full px-4 py-2 text-left hover:bg-secondary-100 dark:hover:bg-secondary-700 flex items-center space-x-3"
                          >
                            <Linkedin size={18} className="text-blue-700" />
                            <span>LinkedIn</span>
                          </button>
                          <button
                            onClick={() => handleShare('email')}
                            className="w-full px-4 py-2 text-left hover:bg-secondary-100 dark:hover:bg-secondary-700 flex items-center space-x-3"
                          >
                            <Mail size={18} className="text-secondary-600" />
                            <span>Email</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-8">
              {/* Author Card */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">About the Author</h3>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {article.author.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary-900 dark:text-white">{article.author}</h4>
                    <p className="text-secondary-600 dark:text-secondary-400 text-sm">News Reporter</p>
                  </div>
                </div>
              </div>

              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4 flex items-center">
                    <TrendingUp size={20} className="mr-2" />
                    Related Articles
                  </h3>
                  <div className="space-y-4">
                    {relatedArticles.slice(0, 3).map((relatedArticle) => (
                      <Link
                        key={relatedArticle.id}
                        href={getArticleUrl(relatedArticle)}
                        className="block group"
                      >
                        <div className="flex space-x-3">
                          <div className="relative w-16 h-16 flex-shrink-0">
                            <Image
                              src={getImageUrl(relatedArticle.imageUrl)}
                              alt={relatedArticle.title}
                              fill
                              className="object-cover rounded-lg"
                              sizes="64px"
                              loading="lazy"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-secondary-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 line-clamp-2">
                              {relatedArticle.title}
                            </h4>
                            <p className="text-xs text-secondary-500 dark:text-secondary-500 mt-1">
                              {formatDateIST(relatedArticle.createdAt)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Newsletter Signup */}
              <div className="card p-6 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 border-primary-200 dark:border-primary-800">
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                  Stay Updated
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400 text-sm mb-4">
                  Get the latest news delivered straight to your inbox.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-3 py-2 rounded-lg border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  />
                  <button type="submit" className="w-full btn-primary text-sm">
                    Subscribe
                  </button>
                </form>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ArticlePage;

