import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore/lite';
import { db } from '../../utils/firebase';
import { 
  Trash2, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle, 
  ArrowLeft,
  ImageOff,
  Loader2,
  X
} from 'lucide-react';

interface Article {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  status: string;
  imageStatus: 'loading' | 'valid' | 'broken' | 'empty';
}

// Common placeholder/stock image patterns that should be removed
const COMMON_PLACEHOLDER_PATTERNS = [
  'placeholder',
  'dummy',
  'example.com',
  'via.placeholder',
  'placekitten',
  'placehold.it',
  'dummyimage',
  'fakeimg',
  'lorempixel',
  'picsum.photos/200', // very small images
  'picsum.photos/100',
];

const CleanupPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [selectedArticles, setSelectedArticles] = useState<Set<string>>(new Set());
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const [stats, setStats] = useState({ total: 0, broken: 0, valid: 0, empty: 0 });

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'news'));
      const articlesData: Article[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        articlesData.push({
          id: doc.id,
          title: data.title || 'Untitled',
          imageUrl: data.imageUrl || '',
          category: data.category || 'Unknown',
          status: data.status || 'draft',
          imageStatus: 'loading'
        });
      });
      setArticles(articlesData);
      setStats({ total: articlesData.length, broken: 0, valid: 0, empty: 0 });
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkImages = async () => {
    setChecking(true);
    const updatedArticles = [...articles];
    let broken = 0;
    let valid = 0;
    let empty = 0;

    for (let i = 0; i < updatedArticles.length; i++) {
      const article = updatedArticles[i];
      
      // Check if image URL is empty
      if (!article.imageUrl || article.imageUrl.trim() === '') {
        updatedArticles[i].imageStatus = 'empty';
        empty++;
        continue;
      }

      // Check for common placeholder patterns
      const isPlaceholder = COMMON_PLACEHOLDER_PATTERNS.some(pattern => 
        article.imageUrl.toLowerCase().includes(pattern)
      );
      
      if (isPlaceholder) {
        updatedArticles[i].imageStatus = 'broken';
        broken++;
        continue;
      }

      // Check if image actually loads
      try {
        const isValid = await checkImageUrl(article.imageUrl);
        if (isValid) {
          updatedArticles[i].imageStatus = 'valid';
          valid++;
        } else {
          updatedArticles[i].imageStatus = 'broken';
          broken++;
        }
      } catch {
        updatedArticles[i].imageStatus = 'broken';
        broken++;
      }

      // Update state periodically to show progress
      if (i % 5 === 0) {
        setArticles([...updatedArticles]);
        setStats({ total: updatedArticles.length, broken, valid, empty });
      }
    }

    setArticles(updatedArticles);
    setStats({ total: updatedArticles.length, broken, valid, empty });
    setChecking(false);
  };

  const checkImageUrl = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      
      // Timeout after 5 seconds
      setTimeout(() => resolve(false), 5000);
      
      img.src = url;
    });
  };

  const deleteArticle = async (articleId: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    
    setDeleting(articleId);
    try {
      await deleteDoc(doc(db, 'news', articleId));
      setArticles(articles.filter(a => a.id !== articleId));
      setSelectedArticles(prev => {
        const newSet = new Set(prev);
        newSet.delete(articleId);
        return newSet;
      });
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('Failed to delete article');
    } finally {
      setDeleting(null);
    }
  };

  const toggleSelectArticle = (articleId: string) => {
    setSelectedArticles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(articleId)) {
        newSet.delete(articleId);
      } else {
        newSet.add(articleId);
      }
      return newSet;
    });
  };

  const selectAllBroken = () => {
    const brokenIds = articles
      .filter(a => a.imageStatus === 'broken' || a.imageStatus === 'empty')
      .map(a => a.id);
    setSelectedArticles(new Set(brokenIds));
  };

  const clearSelection = () => {
    setSelectedArticles(new Set());
  };

  const bulkDelete = async () => {
    if (selectedArticles.size === 0) return;
    
    if (!confirm(`Are you sure you want to delete ${selectedArticles.size} articles? This cannot be undone.`)) {
      return;
    }

    setBulkDeleting(true);
    try {
      const deletePromises = Array.from(selectedArticles).map(id => 
        deleteDoc(doc(db, 'news', id))
      );
      await Promise.all(deletePromises);
      
      setArticles(articles.filter(a => !selectedArticles.has(a.id)));
      setSelectedArticles(new Set());
      alert(`Successfully deleted ${selectedArticles.size} articles`);
    } catch (error) {
      console.error('Error bulk deleting:', error);
      alert('Failed to delete some articles');
    } finally {
      setBulkDeleting(false);
    }
  };

  const brokenArticles = articles.filter(a => a.imageStatus === 'broken' || a.imageStatus === 'empty');

  return (
    <>
      <Head>
        <title>Cleanup - Remove Broken Images | NeevNews Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-secondary-100 dark:bg-secondary-900 py-8">
        <div className="container-custom">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/admin"
              className="inline-flex items-center space-x-2 text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 mb-4"
            >
              <ArrowLeft size={20} />
              <span>Back to Admin</span>
            </Link>
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif">
                  Image Cleanup Tool
                </h1>
                <p className="text-secondary-600 dark:text-secondary-400 mt-1">
                  Find and remove articles with broken or missing images
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={fetchArticles}
                  disabled={loading || checking}
                  className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-secondary-800 rounded-lg text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors duration-200 disabled:opacity-50"
                >
                  <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                  <span>Refresh</span>
                </button>
                
                <button
                  onClick={checkImages}
                  disabled={loading || checking || articles.length === 0}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
                >
                  {checking ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Checking...</span>
                    </>
                  ) : (
                    <>
                      <ImageOff size={18} />
                      <span>Check All Images</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="card p-4">
              <div className="text-3xl font-bold text-secondary-900 dark:text-white">{stats.total}</div>
              <div className="text-secondary-600 dark:text-secondary-400">Total Articles</div>
            </div>
            <div className="card p-4">
              <div className="text-3xl font-bold text-green-600">{stats.valid}</div>
              <div className="text-secondary-600 dark:text-secondary-400">Valid Images</div>
            </div>
            <div className="card p-4">
              <div className="text-3xl font-bold text-red-600">{stats.broken}</div>
              <div className="text-secondary-600 dark:text-secondary-400">Broken Images</div>
            </div>
            <div className="card p-4">
              <div className="text-3xl font-bold text-yellow-600">{stats.empty}</div>
              <div className="text-secondary-600 dark:text-secondary-400">No Image</div>
            </div>
          </div>

          {/* Bulk Actions */}
          {brokenArticles.length > 0 && (
            <div className="card p-4 mb-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="text-red-600" size={24} />
                  <div>
                    <p className="font-semibold text-secondary-900 dark:text-white">
                      Found {brokenArticles.length} articles with broken/missing images
                    </p>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">
                      {selectedArticles.size} selected for deletion
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={selectAllBroken}
                    className="px-4 py-2 bg-white dark:bg-secondary-800 rounded-lg text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors duration-200"
                  >
                    Select All Broken
                  </button>
                  
                  {selectedArticles.size > 0 && (
                    <>
                      <button
                        onClick={clearSelection}
                        className="px-4 py-2 bg-secondary-200 dark:bg-secondary-700 rounded-lg text-secondary-700 dark:text-secondary-300 hover:bg-secondary-300 dark:hover:bg-secondary-600 transition-colors duration-200"
                      >
                        Clear Selection
                      </button>
                      
                      <button
                        onClick={bulkDelete}
                        disabled={bulkDeleting}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
                      >
                        {bulkDeleting ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          <Trash2 size={18} />
                        )}
                        <span>Delete Selected ({selectedArticles.size})</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Articles List */}
          <div className="card overflow-hidden">
            <div className="px-6 py-4 border-b border-secondary-200 dark:border-secondary-700">
              <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">
                Articles with Image Issues
              </h2>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 size={32} className="animate-spin text-primary-600" />
              </div>
            ) : brokenArticles.length === 0 ? (
              <div className="py-12 text-center">
                <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
                <p className="text-secondary-600 dark:text-secondary-400">
                  {checking ? 'Checking images...' : 'No broken images found! Click "Check All Images" to scan.'}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-secondary-200 dark:divide-secondary-700">
                {brokenArticles.map((article) => (
                  <div
                    key={article.id}
                    className={`flex items-center p-4 hover:bg-secondary-50 dark:hover:bg-secondary-800/50 ${
                      selectedArticles.has(article.id) ? 'bg-red-50 dark:bg-red-900/20' : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedArticles.has(article.id)}
                      onChange={() => toggleSelectArticle(article.id)}
                      className="w-5 h-5 rounded border-secondary-300 text-primary-600 focus:ring-primary-500 mr-4"
                    />
                    
                    <div className="w-20 h-14 bg-secondary-200 dark:bg-secondary-700 rounded-lg overflow-hidden flex-shrink-0 mr-4 flex items-center justify-center">
                      {article.imageUrl ? (
                        <img
                          src={article.imageUrl}
                          alt=""
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      <div className={`flex items-center justify-center ${article.imageUrl ? 'hidden' : ''}`}>
                        <ImageOff size={24} className="text-secondary-400" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-secondary-900 dark:text-white truncate">
                        {article.title}
                      </p>
                      <div className="flex items-center space-x-3 text-sm">
                        <span className="text-secondary-500">{article.category}</span>
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          article.imageStatus === 'broken' 
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                            : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                        }`}>
                          {article.imageStatus === 'broken' ? 'Broken Image' : 'No Image'}
                        </span>
                      </div>
                      {article.imageUrl && (
                        <p className="text-xs text-secondary-400 truncate mt-1">
                          {article.imageUrl}
                        </p>
                      )}
                    </div>
                    
                    <button
                      onClick={() => deleteArticle(article.id)}
                      disabled={deleting === article.id}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors duration-200 disabled:opacity-50"
                    >
                      {deleting === article.id ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <Trash2 size={18} />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* All Articles Preview */}
          {articles.length > 0 && (
            <div className="card mt-8 overflow-hidden">
              <div className="px-6 py-4 border-b border-secondary-200 dark:border-secondary-700">
                <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">
                  All Articles ({articles.length})
                </h2>
              </div>
              
              <div className="max-h-[400px] overflow-y-auto divide-y divide-secondary-200 dark:divide-secondary-700">
                {articles.map((article) => (
                  <div
                    key={article.id}
                    className="flex items-center p-3 hover:bg-secondary-50 dark:hover:bg-secondary-800/50"
                  >
                    <div className={`w-3 h-3 rounded-full mr-3 flex-shrink-0 ${
                      article.imageStatus === 'valid' ? 'bg-green-500' :
                      article.imageStatus === 'broken' ? 'bg-red-500' :
                      article.imageStatus === 'empty' ? 'bg-yellow-500' :
                      'bg-secondary-300'
                    }`}></div>
                    
                    <div className="w-12 h-8 bg-secondary-200 dark:bg-secondary-700 rounded overflow-hidden flex-shrink-0 mr-3">
                      {article.imageUrl && (
                        <img
                          src={article.imageUrl}
                          alt=""
                          className="w-full h-full object-cover"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      )}
                    </div>
                    
                    <p className="flex-1 text-sm text-secondary-900 dark:text-white truncate">
                      {article.title}
                    </p>
                    
                    <span className="text-xs text-secondary-500 ml-2">
                      {article.imageStatus === 'loading' ? '...' : article.imageStatus}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CleanupPage;

