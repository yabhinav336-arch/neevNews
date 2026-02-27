import React, { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export const config = { runtime: 'experimental-edge' };

import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import { db } from '../../utils/firebase';
import { categories } from '../../utils/data';
import { getImageUrl } from '../../utils/images';
import Layout from '../../components/Layout/Layout';
import {
  Clock,
  User,
  Heart,
  Share2,
  ArrowLeft,
  Tag,
  TrendingUp,
  MessageCircle,
  Twitter,
  Facebook,
  Linkedin,
  Mail,
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
  createdAt: string;
  updatedAt?: string;
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

interface RelatedArticle {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  createdAt: string;
  category: string;
}

interface ArticlePageProps {
  article: Article;
  relatedArticles: RelatedArticle[];
}

// Helper: get category slug from name
const getCategorySlug = (categoryName: string): string => {
  const category = categories.find(cat => cat.name === categoryName);
  return category?.slug || categoryName.toLowerCase().replace(/\s+/g, '-');
};

// Helper: get article URL
const getArticleUrl = (article: { category: string; slug: string }): string => {
  const categorySlug = getCategorySlug(article.category);
  return `/${categorySlug}/${article.slug}/`;
};

const getCategoryColor = (category: string) => {
  const categoryData = categories.find(cat => cat.name === category);
  return categoryData?.color || 'bg-blue-500';
};

const formatDateIST = (date: string | undefined | null): string => {
  if (!date) return '';
  const dateObj = new Date(date);
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

const shouldShowUpdated = (created: string, updated?: string): boolean => {
  if (!updated) return false;
  const createdDate = new Date(created);
  const updatedDate = new Date(updated);
  if (isNaN(createdDate.getTime()) || isNaN(updatedDate.getTime())) return false;
  return updatedDate.getTime() - createdDate.getTime() > 900000;
};

// Strip source attribution lines from article content
const cleanArticleContent = (content: string): string => {
  if (!content) return '';
  return content
    .split('\n')
    .filter(line => {
      const trimmed = line.trim();
      // Remove separator lines
      if (trimmed === '---') return false;
      // Remove "Source: X — Original report: URL" lines
      if (/^Source:\s*.+/i.test(trimmed)) return false;
      // Remove "*This article was automatically sourced from RSS feeds*" lines
      if (/\*.*automatically sourced.*\*/i.test(trimmed)) return false;
      // Remove "[Read original article](URL)" lines
      if (/\[Read original article\]/i.test(trimmed)) return false;
      // Remove standalone URLs on their own line that look like source links
      if (/^https?:\/\/.+\.(com|org|net|co|io)\/.+/i.test(trimmed) && trimmed.length < 200) return false;
      return true;
    })
    .join('\n')
    .replace(/\n{3,}/g, '\n\n') // collapse multiple blank lines
    .trim();
};

const ArticlePage: React.FC<ArticlePageProps> = ({ article, relatedArticles }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const wordCount = article.content?.split(' ').length || 0;
  const readingTime = Math.ceil(wordCount / 200);

  const articleUrl = getArticleUrl(article);
  const canonicalUrl = `https://neevnews.com${articleUrl}`;

  const handleLike = () => setIsLiked(!isLiked);

  const handleShare = (platform: string) => {
    const url = canonicalUrl;
    const title = article.title;
    const text = article.summary;
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

  // Structured Data for the article (NewsArticle schema for Google)
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.metaDescription || article.summary,
    image: {
      '@type': 'ImageObject',
      url: article.imageUrl,
      width: 1200,
      height: 630,
    },
    datePublished: article.createdAt,
    dateModified: article.updatedAt || article.createdAt,
    author: {
      '@type': 'Person',
      name: article.author || 'Neev News',
      url: `https://neevnews.com/author/${(article.author || 'neev-news').toLowerCase().replace(/\s+/g, '-')}`,
    },
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: 'Neev News',
      url: 'https://neevnews.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://neevnews.com/logo.png',
        width: 200,
        height: 200,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    articleSection: article.category,
    keywords: article.keywords || article.tags?.join(', ') || '',
    articleBody: article.content,
    wordCount: wordCount,
    inLanguage: 'en-US',
    isAccessibleForFree: true,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://neevnews.com' },
      { '@type': 'ListItem', position: 2, name: article.category, item: `https://neevnews.com/category/${getCategorySlug(article.category)}/` },
      { '@type': 'ListItem', position: 3, name: article.title, item: canonicalUrl },
    ],
  };

  const keywordsArr = Array.isArray(article.keywords)
    ? article.keywords
    : (article.keywords || '').split(',').map((k: string) => k.trim()).filter(Boolean);

  return (
    <Layout
      title={article.title}
      description={article.metaDescription || article.summary}
      keywords={article.keywords}
      canonicalUrl={canonicalUrl}
    >
      <Head>
        {/* Canonical */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.metaDescription || article.summary} />
        <meta property="og:image" content={article.imageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Neev News" />
        <meta property="article:author" content={article.author} />
        <meta property="article:published_time" content={article.createdAt} />
        {article.updatedAt && <meta property="article:modified_time" content={article.updatedAt} />}
        <meta property="article:section" content={article.category} />
        {article.tags?.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@neevnews" />
        <meta name="twitter:creator" content="@neevnews" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.metaDescription || article.summary} />
        <meta name="twitter:image" content={article.imageUrl} />
        <meta name="twitter:image:alt" content={article.title} />

        {/* Google News */}
        <meta name="news_keywords" content={article.keywords || article.category} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

        {/* Google News SWG */}
        <script async type="application/javascript" src="https://news.google.com/swg/js/v1/swg-basic.js"></script>

        {/* Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>

      <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
        {/* Google News SWG Init */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(self.SWG_BASIC = self.SWG_BASIC || []).push( basicSubscriptions => {
              basicSubscriptions.init({
                type: "NewsArticle",
                isPartOfType: ["Product"],
                isPartOfProductId: "CAow-YPCDA:openaccess",
                clientOptions: { theme: "light", lang: "en" },
              });
            });`,
          }}
        />

        {/* Header Section */}
        <div className="bg-white dark:bg-secondary-950 border-b border-secondary-200 dark:border-secondary-800">
          <div className="container-custom py-1.5 md:py-2">
            <Link
              href="/"
              className="inline-flex items-center space-x-1 text-xs text-secondary-500 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
            >
              <ArrowLeft size={14} />
              <span>Back to News</span>
            </Link>
          </div>
        </div>

        <div className="container-custom py-3 md:py-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
            {/* Main Content */}
            <article className="lg:col-span-3">
              <div className="max-w-4xl">
                {/* Category Badge */}
                <div className="mb-1">
                  <Link href={`/category/${getCategorySlug(article.category)}/`}>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold ${getCategoryColor(article.category)} text-white`}>
                      {article.category}
                    </span>
                  </Link>
                </div>

                {/* Article Title */}
                <h1 className="text-xl md:text-3xl lg:text-4xl font-black text-secondary-900 dark:text-white mb-1.5 md:mb-2 font-serif leading-tight tracking-tight">
                  {article.title}
                </h1>

                {/* Article Meta */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] md:text-xs text-secondary-500 dark:text-secondary-400 mb-2 md:mb-3 border-b border-secondary-100 dark:border-secondary-800 pb-2 md:pb-2.5">
                  <span className="font-bold text-secondary-900 dark:text-white uppercase tracking-wide">
                    By {article.author}
                  </span>
                  <span className="text-secondary-300 dark:text-secondary-700">|</span>
                  <span className="flex items-center space-x-1">
                    <Clock size={11} />
                    <span>{formatDateIST(article.createdAt)}</span>
                  </span>
                  {shouldShowUpdated(article.createdAt, article.updatedAt) && (
                    <>
                      <span className="hidden sm:inline text-secondary-300 dark:text-secondary-700">|</span>
                      <span className="flex items-center space-x-1">
                        <Clock size={11} />
                        <span>Updated: {formatDateIST(article.updatedAt)}</span>
                      </span>
                    </>
                  )}
                  <span className="flex items-center space-x-1">
                    <Clock size={11} />
                    <span>{readingTime} min read</span>
                  </span>
                </div>

                {/* Featured Image */}
                <div className="relative w-full aspect-video mb-3 md:mb-4 rounded-lg overflow-hidden shadow-sm">
                  <Image
                    src={getImageUrl(article.imageUrl)}
                    alt={article.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 900px"
                  />
                </div>

                {/* Article Summary (Lead) */}
                <div className="mb-3 md:mb-4">
                  <p className="text-base md:text-lg text-secondary-700 dark:text-secondary-300 font-serif leading-relaxed italic">
                    {article.summary}
                  </p>
                </div>

                {/* Article Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  {article.content.split('\n').map((line, lineIdx) => {
                    const h2Match = line.match(/^## (.+)$/);
                    if (h2Match) {
                      return (
                        <h2 key={lineIdx} className="text-xl font-bold text-secondary-900 dark:text-white mt-5 mb-2 font-serif">
                          {h2Match[1]}
                        </h2>
                      );
                    }
                    if (line.trim() === '') return null;
                    return (
                      <p
                        key={lineIdx}
                        className="text-secondary-800 dark:text-secondary-200 leading-[1.7] text-base md:text-lg font-normal mb-2.5"
                        style={{ fontFamily: 'Inter, system-ui, sans-serif', lineHeight: '1.7', letterSpacing: '0.01em' }}
                      >
                        {line.split(/(https?:\/\/[^\s]+)/g).map((part, partIdx) => {
                          if (part.match(/https?:\/\/[^\s]+/)) {
                            return (
                              <a key={partIdx} href={part} target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline break-all">
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

                {/* Source link removed for cleaner presentation */}

                {/* Tags */}
                {keywordsArr.length > 0 && (
                  <div className="mb-3 md:mb-4 mt-4">
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
                )}

                {/* Social Actions */}
                <div className="mt-4 pt-3 border-t border-secondary-200 dark:border-secondary-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
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
                          {[
                            { key: 'twitter', label: 'Twitter', icon: <Twitter size={18} className="text-blue-400" /> },
                            { key: 'facebook', label: 'Facebook', icon: <Facebook size={18} className="text-blue-600" /> },
                            { key: 'linkedin', label: 'LinkedIn', icon: <Linkedin size={18} className="text-blue-700" /> },
                            { key: 'whatsapp', label: 'WhatsApp', icon: <Send size={18} className="text-green-500" /> },
                            { key: 'email', label: 'Email', icon: <Mail size={18} className="text-secondary-600" /> },
                          ].map(({ key, label, icon }) => (
                            <button
                              key={key}
                              onClick={() => handleShare(key)}
                              className="w-full px-4 py-2 text-left hover:bg-secondary-100 dark:hover:bg-secondary-700 flex items-center space-x-3 text-secondary-700 dark:text-secondary-300"
                            >
                              {icon}
                              <span>{label}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-3 md:space-y-4">
              {/* Author Card */}
              <div className="card p-3 md:p-4 bg-white dark:bg-secondary-900 border border-secondary-100 dark:border-secondary-800 shadow-sm">
                <h3 className="text-sm md:text-base font-bold text-secondary-900 dark:text-white mb-2 font-serif">About the Author</h3>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-base md:text-lg">
                      {article.author?.charAt(0)?.toUpperCase() || 'N'}
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
                <div className="card p-3 md:p-4 bg-white dark:bg-secondary-900 shadow-sm">
                  <h3 className="text-sm md:text-base font-bold text-secondary-900 dark:text-white mb-2 flex items-center font-serif">
                    <TrendingUp size={16} className="mr-1.5 text-primary-600" />
                    Related Articles
                  </h3>
                  <div className="space-y-2.5">
                    {relatedArticles.slice(0, 3).map((relatedArticle) => (
                      <Link key={relatedArticle.id} href={getArticleUrl(relatedArticle)} className="block group">
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
                            <p className="text-[10px] text-secondary-500 mt-1">{formatDateIST(relatedArticle.createdAt)}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Newsletter Signup */}
              <div className="card p-3 md:p-4 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/10 dark:to-accent-900/10 border border-primary-100 dark:border-primary-800/50">
                <h3 className="text-sm md:text-base font-bold text-secondary-900 dark:text-white mb-1 font-serif">Stay Updated</h3>
                <p className="text-secondary-600 dark:text-secondary-400 text-xs mb-2">Latest news delivered to you.</p>
                <form className="space-y-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-3 py-2 rounded-md border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-950 text-secondary-900 dark:text-white placeholder-secondary-400 focus:outline-none focus:ring-1 focus:ring-primary-500 text-xs md:text-sm"
                  />
                  <button type="submit" className="w-full btn-primary py-2 text-xs md:text-sm font-medium">Subscribe</button>
                </form>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// ─── SSG: Generate paths at build time ────────────────────────────────────────
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const snapshot = await getDocs(
      query(collection(db, 'news'), where('status', '==', 'published'))
    );

    const paths: { params: { category: string; slug: string } }[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.slug && data.category) {
        const categorySlug = categories.find(c => c.name === data.category)?.slug
          || data.category.toLowerCase().replace(/\s+/g, '-');
        paths.push({ params: { category: categorySlug, slug: data.slug } });
      }
    });

    return {
      paths,
      // 'blocking' = new articles get SSR on first request, then cached as static
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('getStaticPaths error:', error);
    return { paths: [], fallback: 'blocking' };
  }
};

// ─── SSG: Fetch article data at build time (or on first request for new articles) ─
export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as { category: string; slug: string };

  try {
    // Query Firestore by slug
    const q = query(
      collection(db, 'news'),
      where('slug', '==', slug),
      where('status', '==', 'published')
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return { notFound: true };
    }

    const doc = snapshot.docs[0];
    const data = doc.data();

    // Serialize all Firestore Timestamps to ISO strings
    const article: Article = {
      id: doc.id,
      title: data.title || '',
      summary: data.summary || '',
      content: cleanArticleContent(data.content || ''),
      imageUrl: data.imageUrl || '',
      category: data.category || '',
      author: data.author || '',
      slug: data.slug || '',
      status: data.status || '',
      featured: data.featured || false,
      views: data.views || 0,
      likes: data.likes || 0,
      tags: data.tags || [],
      keywords: data.keywords || '',
      metaDescription: data.metaDescription || '',
      sourceUrl: data.sourceUrl || '',
      sourceName: data.sourceName || '',
      createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : (data.createdAt || new Date().toISOString()),
      updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : (data.updatedAt || null),
    };

    // Fetch related articles (same category, exclude current)
    const relatedQuery = query(
      collection(db, 'news'),
      where('category', '==', article.category),
      where('status', '==', 'published')
    );
    const relatedSnapshot = await getDocs(relatedQuery);
    const relatedArticles: RelatedArticle[] = [];

    relatedSnapshot.forEach((relDoc) => {
      const relData = relDoc.data();
      if (relData.slug !== slug && relatedArticles.length < 3) {
        relatedArticles.push({
          id: relDoc.id,
          title: relData.title || '',
          slug: relData.slug || '',
          imageUrl: relData.imageUrl || '',
          category: relData.category || '',
          createdAt: relData.createdAt?.toDate ? relData.createdAt.toDate().toISOString() : (relData.createdAt || ''),
        });
      }
    });

    return {
      props: { article, relatedArticles },
      // ISR: re-generate this page in the background every 60 seconds
      // This ensures new/updated articles are reflected quickly
      revalidate: 60,
    };
  } catch (error) {
    console.error('getStaticProps error for slug:', slug, error);
    return { notFound: true };
  }
};

export default ArticlePage;
