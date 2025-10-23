import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { categories } from '../../utils/data';
import Layout from '../../components/Layout/Layout';
import { 
  Clock, 
  User, 
  Eye, 
  Heart, 
  Share2, 
  BookOpen, 
  Calendar,
  ArrowLeft,
  Tag,
  TrendingUp,
  MessageCircle,
  Twitter,
  Facebook,
  Linkedin,
  Mail,
  ChevronLeft,
  ChevronRight
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
}

const ArticlePage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    if (slug) {
      fetchArticle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    if (article?.content) {
      // Calculate reading time (average 200 words per minute)
      const wordCount = article.content.split(' ').length;
      setReadingTime(Math.ceil(wordCount / 200));
    }
  }, [article]);

  const fetchArticle = async () => {
    try {
      const articlesRef = collection(db, 'news');
      const q = query(articlesRef, where('slug', '==', slug), where('status', '==', 'published'));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const articleData = querySnapshot.docs[0].data() as Article;
        articleData.id = querySnapshot.docs[0].id;
        setArticle(articleData);
        fetchRelatedArticles(articleData.category);
      } else {
        router.push('/404');
      }
    } catch (error) {
      console.error('Error fetching article:', error);
      router.push('/404');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedArticles = async (category: string) => {
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
      setRelatedArticles(articles.filter(article => article.slug !== slug));
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
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`);
        break;
    }
    setShowShareMenu(false);
  };

  const formatDate = (date: any) => {
    if (!date) return '';
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
          <div className="text-center">
            <h1 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">Article not found</h1>
            <Link href="/" className="btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title={article.title}
      description={article.metaDescription || article.summary}
      keywords={article.keywords}
      canonicalUrl={`https://neevnews.com/article/${article.slug}`}
    >
      <Head>
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.metaDescription || article.summary} />
        <meta property="og:image" content={article.imageUrl} />
        <meta property="og:type" content="article" />
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
                name: 'NeevNews',
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
                '@id': `https://neevnews.com/article/${article.slug}`,
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
                  item: `https://neevnews.com/category/${article.category.toLowerCase()}`,
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: article.title,
                  item: `https://neevnews.com/article/${article.slug}`,
                },
              ],
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
        {/* Hero Section */}
        <div className="relative">
          {/* Back Button */}
          <div className="absolute top-8 left-8 z-10">
            <Link
              href="/"
              className="flex items-center space-x-2 px-4 py-2 bg-white/90 dark:bg-secondary-900/90 backdrop-blur-sm rounded-lg hover:bg-white dark:hover:bg-secondary-800 transition-colors duration-200 text-secondary-700 dark:text-secondary-300"
            >
              <ArrowLeft size={18} />
              <span>Back to News</span>
            </Link>
          </div>

          {/* Featured Image */}
          <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
            <Image
              src={article.imageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* Article Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="container-custom">
                <div className="max-w-4xl">
                  {/* Category Badge */}
                  <div className="mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${getCategoryColor(article.category)}`}>
                      <span className="mr-2">{getCategoryIcon(article.category)}</span>
                      {article.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-serif leading-tight">
                    {article.title}
                  </h1>

                  {/* Article Meta */}
                  <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm">
                    <div className="flex items-center space-x-2">
                      <User size={16} />
                      <span>By {article.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} />
                      <span>{formatDate(article.createdAt)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={16} />
                      <span>{readingTime} min read</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-custom py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-3">
              <div className="max-w-4xl">
                {/* Article Summary */}
                <div className="mb-8 p-6 bg-primary-50 dark:bg-primary-900/20 rounded-xl border-l-4 border-primary-500">
                  <p className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                {/* Article Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-secondary-800 dark:text-secondary-200 leading-relaxed text-lg">
                    {article.content}
                  </div>
                </div>

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
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={handleLike}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                          isLiked
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

                    <div className="relative">
                      <button
                        onClick={() => setShowShareMenu(!showShareMenu)}
                        className="flex items-center space-x-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-900/30 transition-colors duration-200"
                      >
                        <Share2 size={18} />
                        <span>Share</span>
                      </button>

                      {showShareMenu && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-secondary-800 rounded-lg shadow-lg border border-secondary-200 dark:border-secondary-700 py-2 z-50">
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
                        href={`/article/${relatedArticle.slug}`}
                        className="block group"
                      >
                        <div className="flex space-x-3">
                          <div className="relative w-16 h-16 flex-shrink-0">
                            <Image
                              src={relatedArticle.imageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'}
                              alt={relatedArticle.title}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-secondary-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 line-clamp-2">
                              {relatedArticle.title}
                            </h4>
                            <p className="text-xs text-secondary-500 dark:text-secondary-500 mt-1">
                              {formatDate(relatedArticle.createdAt)}
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
