
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, User, ArrowRight, TrendingUp } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firebase';

const LatestNews: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const querySnapshot = await getDocs(collection(db, 'news'));
      const articlesData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setArticles(articlesData);
    };
    fetchArticles();
  }, []);

  return (
    <section className="section-padding bg-white dark:bg-secondary-950">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif">
                Latest News
              </h2>
              <Link
                href="/news"
                className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors duration-200"
              >
                View All News
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {articles.map((article, index) => (
                <article key={article.id} className="card-hover group">
                  <Link href={`/article/${article.slug || article.id}`}>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={article.imageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-white/90 dark:bg-secondary-900/90 text-secondary-700 dark:text-secondary-300">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 font-serif">
                        {article.title}
                      </h3>
                      <p className="text-secondary-600 dark:text-secondary-400 text-sm line-clamp-3 mb-4">
                        {article.summary}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 text-xs text-secondary-500 dark:text-secondary-500">
                          <div className="flex items-center space-x-1">
                            <User size={14} />
                            <span>{article.author}</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center space-x-1">
                            <Clock size={14} />
                            <span>{article.createdAt?.toDate ? article.createdAt.toDate().toLocaleDateString() : new Date(article.createdAt?.seconds * 1000).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <button className="btn-primary px-8 py-3">
                Load More Articles
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Trending Topics */}
            <div className="card p-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp size={20} className="text-primary-600 dark:text-primary-400" />
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
                  Trending Topics
                </h3>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="card p-6 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 border-primary-200 dark:border-primary-800">
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                Stay Updated
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400 text-sm mb-4">
                Get the latest news delivered straight to your inbox. No spam, just quality journalism.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-lg border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  aria-label="Email for newsletter"
                />
                <button type="submit" className="btn-primary w-full">
                  Subscribe Now
                </button>
              </form>
              <p className="text-xs text-secondary-500 dark:text-secondary-500 mt-3">
                By subscribing, you agree to our Privacy Policy and consent to receive updates.
              </p>
            </div>

            {/* Popular Articles */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
                Most Read
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
