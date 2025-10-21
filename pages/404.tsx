import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';
import Layout from '../components/Layout/Layout';

const Custom404 = () => {
  return (
    <Layout title="Page Not Found - 404 | NeevNews">
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 flex items-center justify-center">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            {/* 404 Illustration */}
            <div className="mb-8">
              <div className="text-9xl font-bold text-primary-600 dark:text-primary-400 mb-4">
                404
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full"></div>
            </div>

            {/* Error Message */}
            <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-white mb-4 font-serif">
              Oops! Page Not Found
            </h1>
            
            <p className="text-lg text-secondary-600 dark:text-secondary-400 mb-8 leading-relaxed">
              The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/"
                className="flex items-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                <Home size={20} />
                <span>Back to Home</span>
              </Link>
              
              <button
                onClick={() => window.history.back()}
                className="flex items-center space-x-2 px-6 py-3 bg-secondary-200 dark:bg-secondary-700 hover:bg-secondary-300 dark:hover:bg-secondary-600 text-secondary-700 dark:text-secondary-300 font-semibold rounded-lg transition-colors duration-200"
              >
                <ArrowLeft size={20} />
                <span>Go Back</span>
              </button>
            </div>

            {/* Search Suggestion */}
            <div className="mt-12 p-6 bg-white dark:bg-secondary-800 rounded-xl border border-secondary-200 dark:border-secondary-700">
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-3">
                Looking for something specific?
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                Try searching for news articles, categories, or browse our latest content.
              </p>
              <div className="flex space-x-4 justify-center">
                <Link
                  href="/"
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-900/30 transition-colors duration-200"
                >
                  <Search size={16} />
                  <span>Browse News</span>
                </Link>
                <Link
                  href="/categories"
                  className="flex items-center space-x-2 px-4 py-2 bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-400 rounded-lg hover:bg-secondary-200 dark:hover:bg-secondary-600 transition-colors duration-200"
                >
                  <span>Categories</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Custom404;
