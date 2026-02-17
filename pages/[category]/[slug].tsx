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
  return `/${categorySlug}/${article.slug}/`;
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

  if (loading || router.isFallback) {
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
            <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-4">Article Not Found</h1>
            <div className="space-x-4">
              <Link href="/" className="inline-block px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200">
                Back to Home
              </Link>
            </div>
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
          <div className="container-custom py-3 md:py-6">
            {/* Back Button */}
            <Link
              href="/"
              className="inline-flex items-center space-x-1 md:space-x-2 px-0 md:px-4 py-1.5 md:py-2 mb-1 md:mb-6 text-sm text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
            >
              <ArrowLeft size={16} />
              <span>Back to News</span>
            </Link>
          </div>
        </div>

        <div className="container-custom py-3 md:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-12">
            {/* Main Content */}
            <article className="lg:col-span-3">
              <div className="max-w-4xl">
                {/* Category Badge - tighter spacing */}
                <div className="mb-2">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold ${getCategoryColor(article.category)} text-white`}>
                    {article.category}
                  </span>
                </div>

                {/* Article Title - Premium Serif */}
                <h1 className="text-2xl md:text-5xl lg:text-6xl font-black text-secondary-900 dark:text-white mb-2 md:mb-4 font-serif leading-tight tracking-tight">
                  {article.title}
                </h1>

                {/* Article Meta Info - Compact */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs md:text-sm text-secondary-500 dark:text-secondary-400 mb-4 md:mb-6 border-b border-secondary-100 dark:border-secondary-800 pb-3 md:pb-5">
                  <span className="font-bold text-secondary-900 dark:text-white uppercase tracking-wide">
                    By {article.author}
                  </span>
                  <span className="text-secondary-300 dark:text-secondary-700">|</span>
                  <span className="flex items-center space-x-1.5">
                    <Clock size={12} />
                    <span>{formatDateIST(article.createdAt)}</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <Clock size={12} />
                    <span>{readingTime} min read</span>
                  </span>
                </div>

                {/* Featured Image - Adjusted aspect ratio */}
                <div className="relative w-full aspect-video mb-4 md:mb-8 rounded-lg overflow-hidden shadow-sm">
                  <Image
                    src={getImageUrl(article.imageUrl)}
                    alt={article.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 900px"
                  />
                </div>

                {/* Article Summary (Lead) - Refined */}
                <div className="mb-6 md:mb-8">
                  <p className="text-lg md:text-2xl text-secondary-700 dark:text-secondary-300 font-serif leading-relaxed italic">
                    {article.summary}
                  </p>
                </div>

                {/* Article Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  {article.content.split('\n').map((line, lineIdx) => {
                    // Render ## headings as H2 elements
                    const h2Match = line.match(/^## (.+)$/);
                    if (h2Match) {
                      return (
                        <h2
                          key={lineIdx}
                          className="text-2xl font-bold text-secondary-900 dark:text-white mt-8 mb-4 font-serif"
                        >
                          {h2Match[1]}
                        </h2>
                      );
                    }

                    // Skip empty lines
                    if (line.trim() === '') return null;

                    // Normal text with URL detection
                    return (
                      <p
                        key={lineIdx}
                        className="text-secondary-800 dark:text-secondary-200 leading-[1.8] text-lg md:text-xl font-normal mb-4"
                        style={{
                          fontFamily: 'Inter, system-ui, sans-serif',
                          lineHeight: '1.8',
                          letterSpacing: '0.01em'
                        }}
                      >
                        {line.split(/(https?:\/\/[^\s]+)/g).map((part, partIdx) => {
                          if (part.match(/https?:\/\/[^\s]+/)) {
                            return (
                              <a
                                key={partIdx}
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
                      </p>
                    );
                  })}
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
                        className="text-primary-600 dark:text-primary-400 hover:underline font-medium break-all"
                      >
                        {article.sourceName || 'Read Original Article'}
                        <span className="inline-block ml-1">↗</span>
                      </a>
                    </p>
                  </div>
                )}

                {/* Tags */}
                {article.keywords && (Array.isArray(article.keywords) ? article.keywords : article.keywords.split(',').map((k: string) => k.trim())).length > 0 && (() => {
                  const keywordsArr = Array.isArray(article.keywords) ? article.keywords : article.keywords.split(',').map((k: string) => k.trim()).filter(Boolean);
                  return (
                    <div className="mb-4 md:mb-8">
                      <div className="flex items-center space-x-2 text-secondary-600 dark:text-secondary-400 mb-2 md:mb-3">
                        <Tag size={16} />
                        <span className="font-semibold text-sm">Tags</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 md:gap-2">
                        {keywordsArr.map((keyword: string) => (
                          <Link
                            key={keyword}
                            href={`/search?q=${encodeURIComponent(keyword)}`}
                            className="px-2.5 py-1 bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 text-xs md:text-sm rounded-full hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                          >
                            #{keyword}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })()}

              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-4 md:space-y-8">
              {/* Author Card */}
              <div className="card p-4 md:p-6 bg-white dark:bg-secondary-900 border border-secondary-100 dark:border-secondary-800 shadow-sm">
                <h3 className="text-base md:text-lg font-bold text-secondary-900 dark:text-white mb-3 font-serif">About the Author</h3>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-base md:text-lg">
                      {article.author.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary-900 dark:text-white text-sm md:text-base">{article.author}</h4>
                    <p className="text-secondary-500 dark:text-secondary-400 text-xs">News Reporter</p>
                  </div>
                </div>
              </div>

              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <div className="card p-4 md:p-6 bg-white dark:bg-secondary-900 shadow-sm">
                  <h3 className="text-base md:text-lg font-bold text-secondary-900 dark:text-white mb-3 flex items-center font-serif">
                    <TrendingUp size={18} className="mr-2 text-primary-600" />
                    Related Articles
                  </h3>
                  <div className="space-y-3 md:space-y-4">
                    {relatedArticles.slice(0, 3).map((relatedArticle) => (
                      <Link
                        key={relatedArticle.id}
                        href={getArticleUrl(relatedArticle)}
                        className="block group"
                      >
                        <div className="flex space-x-3">
                          <div className="relative w-14 h-14 md:w-16 md:h-16 flex-shrink-0 bg-secondary-100 rounded-md overflow-hidden">
                            <Image
                              src={getImageUrl(relatedArticle.imageUrl)}
                              alt={relatedArticle.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="64px"
                              loading="lazy"
                            />
                          </div>
                          <div className="flex-1 min-w-0 pt-0.5">
                            <h4 className="text-xs md:text-sm font-semibold text-secondary-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 line-clamp-2 leading-snug">
                              {relatedArticle.title}
                            </h4>
                            <p className="text-[10px] text-secondary-500 mt-1">
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
              <div className="card p-4 md:p-6 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/10 dark:to-accent-900/10 border border-primary-100 dark:border-primary-800/50">
                <h3 className="text-base md:text-lg font-bold text-secondary-900 dark:text-white mb-2 font-serif">
                  Stay Updated
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400 text-xs md:text-sm mb-3">
                  Latest news delivered to you.
                </p>
                <form className="space-y-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-3 py-2 rounded-md border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-950 text-secondary-900 dark:text-white placeholder-secondary-400 focus:outline-none focus:ring-1 focus:ring-primary-500 text-xs md:text-sm"
                  />
                  <button type="submit" className="w-full btn-primary py-2 text-xs md:text-sm font-medium">
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
