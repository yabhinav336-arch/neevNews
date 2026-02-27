import React, { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { categories, getArticleUrl } from '../../utils/data';
import Layout from '../../components/Layout/Layout';
import { Clock, User, ArrowLeft, Grid, List } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  category: string;
  author: string;
  createdAt: string;
  slug: string;
  views: number;
  status: string;
}

interface CategoryPageProps {
  categoryData: {
    name: string;
    slug: string;
    description: string;
    icon: string;
    color: string;
  };
  articles: Article[];
}

const CategoryPage: React.FC<CategoryPageProps> = ({ categoryData, articles: initialArticles }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 12;

  // Sort articles client-side based on user selection
  const articles = [...initialArticles].sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return (b.views || 0) - (a.views || 0);
  });

  const formatTimeAgo = (date: string) => {
    if (!date) return '';
    const dateObj = new Date(date);
    const seconds = Math.floor((new Date().getTime() - dateObj.getTime()) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <Layout
      title={`${categoryData.name} News - NeevNews`}
      description={categoryData.description}
      keywords={`${categoryData.name}, news, articles, updates`}
    >
      <Head>
        <meta property="og:title" content={`${categoryData.name} News - NeevNews`} />
        <meta property="og:description" content={categoryData.description} />
        <link rel="canonical" href={`https://neevnews.com/category/${categoryData.slug}/`} />
      </Head>

      <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
        {/* Category Header */}
        <div className="bg-gradient-to-r from-secondary-900 to-secondary-800 text-white py-16">
          <div className="container-custom">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-6 transition-colors duration-200"
            >
              <ArrowLeft size={18} />
              <span>Back to Home</span>
            </Link>

            <div className="flex items-center space-x-4 mb-4">
              <div className={`w-16 h-16 ${categoryData.color} rounded-2xl flex items-center justify-center`}>
                <span className="text-white text-3xl">{categoryData.icon}</span>
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold font-serif mb-2">
                  {categoryData.name}
                </h1>
                <p className="text-xl text-white/90">
                  {categoryData.description}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-white/80">
              <span>{articles.length} articles</span>
              <span>•</span>
              <span>Updated continuously</span>
            </div>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="bg-white dark:bg-secondary-950 border-b border-secondary-200 dark:border-secondary-800 sticky top-16 lg:top-20 z-40">
          <div className="container-custom py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    setSortBy('latest');
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 min-h-[44px] ${sortBy === 'latest'
                      ? 'bg-primary-600 text-white'
                      : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700'
                    }`}
                >
                  Latest
                </button>
                <button
                  onClick={() => {
                    setSortBy('popular');
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 min-h-[44px] ${sortBy === 'popular'
                      ? 'bg-primary-600 text-white'
                      : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700'
                    }`}
                >
                  Popular
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center ${viewMode === 'grid'
                      ? 'bg-primary-600 text-white'
                      : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700'
                    }`}
                  aria-label="Grid view"
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center ${viewMode === 'list'
                      ? 'bg-primary-600 text-white'
                      : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700'
                    }`}
                  aria-label="List view"
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Articles Content */}
        <div className="container-custom py-12">
          {articles.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-secondary-200 dark:bg-secondary-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">{categoryData.icon}</span>
              </div>
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">
                No articles in {categoryData.name} yet
              </h2>
              <p className="text-secondary-600 dark:text-secondary-400 mb-6">
                Check back soon for the latest {categoryData.name.toLowerCase()} news and updates.
              </p>
              <Link href="/newsletter" className="btn-primary">
                Subscribe to Newsletter
              </Link>
            </div>
          ) : (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {articles.slice((currentPage - 1) * articlesPerPage, currentPage * articlesPerPage).map((article) => (
                    <article key={article.id} className="group">
                      <Link href={getArticleUrl(article)}>
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
              ) : (
                <div className="space-y-6">
                  {articles.slice((currentPage - 1) * articlesPerPage, currentPage * articlesPerPage).map((article) => (
                    <article key={article.id} className="group">
                      <Link href={getArticleUrl(article)}>
                        <div className="card-hover overflow-hidden">
                          <div className="flex flex-col md:flex-row gap-6">
                            <div className="relative w-full md:w-80 aspect-[16/10] md:aspect-[16/10] flex-shrink-0">
                              <Image
                                src={article.imageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'}
                                alt={article.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                            <div className="flex-1 p-6">
                              <h3 className="text-2xl font-semibold text-secondary-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 font-serif">
                                {article.title}
                              </h3>
                              <p className="text-secondary-600 dark:text-secondary-400 mb-4 line-clamp-3">
                                {article.summary}
                              </p>
                              <div className="flex items-center space-x-4 text-sm text-secondary-500">
                                <span className="flex items-center space-x-1">
                                  <User size={14} />
                                  <span>{article.author}</span>
                                </span>
                                <span>•</span>
                                <span className="flex items-center space-x-1">
                                  <Clock size={14} />
                                  <span>{formatTimeAgo(article.createdAt)}</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {articles.length > articlesPerPage && (
                <div className="mt-12 flex items-center justify-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 min-h-[44px] min-w-[44px]"
                    aria-label="Previous page"
                  >
                    ←
                  </button>
                  {Array.from({ length: Math.ceil(articles.length / articlesPerPage) }, (_, i) => i + 1)
                    .filter(page => {
                      return page === 1 ||
                        page === Math.ceil(articles.length / articlesPerPage) ||
                        (page >= currentPage - 1 && page <= currentPage + 1);
                    })
                    .map((page, index, array) => {
                      const showEllipsisBefore = index > 0 && page - array[index - 1] > 1;
                      return (
                        <React.Fragment key={page}>
                          {showEllipsisBefore && (
                            <span className="px-2 text-secondary-500">...</span>
                          )}
                          <button
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 rounded-lg min-h-[44px] min-w-[44px] transition-colors duration-200 ${currentPage === page
                                ? 'bg-primary-600 text-white'
                                : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700'
                              }`}
                            aria-label={`Page ${page}`}
                            aria-current={currentPage === page ? 'page' : undefined}
                          >
                            {page}
                          </button>
                        </React.Fragment>
                      );
                    })}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(Math.ceil(articles.length / articlesPerPage), prev + 1))}
                    disabled={currentPage === Math.ceil(articles.length / articlesPerPage)}
                    className="px-4 py-2 rounded-lg bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 min-h-[44px] min-w-[44px]"
                    aria-label="Next page"
                  >
                    →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

// ─── SSG: Generate category paths ─────────────────────────────────────────────
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = categories.map(cat => ({
    params: { slug: cat.slug },
  }));

  return { paths, fallback: false };
};

// ─── SSG: Fetch category articles at build time ───────────────────────────────
export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as { slug: string };

  const categoryData = categories.find(cat => cat.slug === slug);

  if (!categoryData) {
    return { notFound: true };
  }

  try {
    const q = query(
      collection(db, 'news'),
      where('category', '==', categoryData.name),
      where('status', '==', 'published')
    );
    const snapshot = await getDocs(q);

    const articles: Article[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      articles.push({
        id: doc.id,
        title: data.title || '',
        summary: data.summary || '',
        imageUrl: data.imageUrl || '',
        category: data.category || '',
        author: data.author || '',
        slug: data.slug || '',
        views: data.views || 0,
        status: data.status || '',
        createdAt: data.createdAt?.toDate
          ? data.createdAt.toDate().toISOString()
          : (data.createdAt || new Date().toISOString()),
      });
    });

    // Sort newest first
    articles.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return {
      props: { categoryData, articles },
      revalidate: 60, // ISR: refresh every 60 seconds
    };
  } catch (error) {
    console.error('getStaticProps error for category:', slug, error);
    return {
      props: { categoryData, articles: [] },
      revalidate: 60,
    };
  }
};

export default CategoryPage;
