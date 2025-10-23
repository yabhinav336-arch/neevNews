import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { categories } from '../utils/data';
import Layout from '../components/Layout/Layout';
import { Clock, User, Filter, Grid, List, Search } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  category: string;
  author: string;
  createdAt: any;
  slug: string;
  views: number;
  status: string;
}

const AllNewsPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchAllArticles();
  }, []);

  useEffect(() => {
    filterAndSortArticles();
  }, [articles, selectedCategory, sortBy, searchQuery]);

  const fetchAllArticles = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'news'));
      const allArticles = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as Article[];

      // Filter only published articles
      const publishedArticles = allArticles.filter(article => article.status === 'published');
      setArticles(publishedArticles);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortArticles = () => {
    let filtered = [...articles];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort articles
    if (sortBy === 'latest') {
      filtered = filtered.sort((a, b) => {
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });
    } else {
      filtered = filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
    }

    setFilteredArticles(filtered);
  };

  const formatTimeAgo = (date: any) => {
    if (!date) return '';
    const dateObj = date?.toDate ? date.toDate() : new Date(date);
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

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-secondary-600 dark:text-secondary-400">Loading articles...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="All News - NeevNews" description="Browse all news articles from NeevNews">
      <Head>
        <meta property="og:title" content="All News - NeevNews" />
      </Head>

      <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-secondary-900 to-secondary-800 text-white py-12">
          <div className="container-custom">
            <h1 className="text-4xl lg:text-5xl font-bold font-serif mb-4">
              All News
            </h1>
            <p className="text-xl text-white/90">
              Browse all articles from NeevNews
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-secondary-950 border-b border-secondary-200 dark:border-secondary-800 sticky top-16 lg:top-20 z-40">
          <div className="container-custom py-6">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-2xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-secondary-300 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 mb-4">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${
                  selectedCategory === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700'
                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${
                    selectedCategory === category.name
                      ? 'bg-primary-600 text-white'
                      : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700'
                  }`}
                >
                  {category.icon} {category.name}
                </button>
              ))}
            </div>

            {/* Sort and View Options */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-sm text-secondary-600 dark:text-secondary-400">
                  {filteredArticles.length} articles
                </span>
                <span className="text-secondary-400">•</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSortBy('latest')}
                    className={`px-3 py-1.5 rounded-lg font-medium text-sm transition-colors duration-200 ${
                      sortBy === 'latest'
                        ? 'bg-primary-600 text-white'
                        : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700'
                    }`}
                  >
                    Latest
                  </button>
                  <button
                    onClick={() => setSortBy('popular')}
                    className={`px-3 py-1.5 rounded-lg font-medium text-sm transition-colors duration-200 ${
                      sortBy === 'popular'
                        ? 'bg-primary-600 text-white'
                        : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700'
                    }`}
                  >
                    Popular
                  </button>
                </div>
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

        {/* Articles */}
        <div className="container-custom py-12">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-secondary-200 dark:bg-secondary-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">📰</span>
              </div>
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">
                No articles found
              </h2>
              <p className="text-secondary-600 dark:text-secondary-400 mb-6">
                {searchQuery ? 'Try adjusting your search or filters' : 'Create your first article to get started'}
              </p>
              {!searchQuery && (
                <Link href="/admin" className="btn-primary">
                  Create Article
                </Link>
              )}
            </div>
          ) : (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredArticles.map((article) => (
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
              ) : (
                <div className="space-y-6">
                  {filteredArticles.map((article) => (
                    <article key={article.id} className="group">
                      <Link href={`/article/${article.slug || article.id}`}>
                        <div className="card-hover overflow-hidden">
                          <div className="flex flex-col md:flex-row gap-6">
                            <div className="relative w-full md:w-80 aspect-[16/10] flex-shrink-0">
                              <Image
                                src={article.imageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'}
                                alt={article.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute top-3 left-3">
                                <span className={`px-3 py-1 text-white text-xs font-medium rounded ${getCategoryColor(article.category)}`}>
                                  {article.category}
                                </span>
                              </div>
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

export default AllNewsPage;
