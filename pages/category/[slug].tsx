import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { categories, getArticleUrl } from '../../utils/data';
import Layout from '../../components/Layout/Layout';
import { Clock, User, ArrowLeft, Filter, Grid, List } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  category: string;
  author: string;
  createdAt: any;
  slug: string;
  views: number;
  status: string;
}

const CategoryPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');
  const [categoryData, setCategoryData] = useState<any>(null);

  useEffect(() => {
    if (slug) {
      const category = categories.find(cat => cat.slug === slug);
      setCategoryData(category);
      fetchCategoryArticles(category?.name || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const fetchCategoryArticles = async (categoryName: string) => {
    setLoading(true);
    try {
      const articlesRef = collection(db, 'news');
      const q = query(
        articlesRef,
        where('category', '==', categoryName),
        where('status', '==', 'published')
      );
      const querySnapshot = await getDocs(q);
      
      let fetchedArticles = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as Article[];

      // Sort articles
      if (sortBy === 'latest') {
        fetchedArticles = fetchedArticles.sort((a, b) => {
          const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
          const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
          return dateB.getTime() - dateA.getTime();
        });
      } else {
        fetchedArticles = fetchedArticles.sort((a, b) => (b.views || 0) - (a.views || 0));
      }

      setArticles(fetchedArticles);
    } catch (error) {
      console.error('Error fetching category articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryData) {
      fetchCategoryArticles(categoryData.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, categoryData?.name]);

  const formatTimeAgo = (date: any) => {
    if (!date) return '';
    const dateObj = date?.toDate ? date.toDate() : new Date(date);
    const seconds = Math.floor((new Date().getTime() - dateObj.getTime()) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </Layout>
    );
  }

  if (!categoryData) {
    return (
      <Layout>
        <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">Category not found</h1>
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
      title={`${categoryData.name} News - NeevNews`}
      description={categoryData.description}
      keywords={`${categoryData.name}, news, articles, updates`}
    >
      <Head>
        <meta property="og:title" content={`${categoryData.name} News - NeevNews`} />
        <meta property="og:description" content={categoryData.description} />
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
                  onClick={() => setSortBy('latest')}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${
                    sortBy === 'latest'
                      ? 'bg-primary-600 text-white'
                      : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700'
                  }`}
                >
                  Latest
                </button>
                <button
                  onClick={() => setSortBy('popular')}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${
                    sortBy === 'popular'
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
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-primary-600 text-white'
                      : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700'
                  }`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    viewMode === 'list'
                      ? 'bg-primary-600 text-white'
                      : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700'
                  }`}
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
              <Link href="/admin" className="btn-primary">
                Create Article
              </Link>
            </div>
          ) : (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {articles.map((article) => (
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
                  {articles.map((article) => (
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
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
