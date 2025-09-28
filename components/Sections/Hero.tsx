import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, User } from 'lucide-react';
import { featuredArticles, formatTimeAgo } from '@/utils/data';

const Hero: React.FC = () => {
  const mainArticle = featuredArticles[0];
  const sideArticles = featuredArticles.slice(1, 3);

  return (
    <section className="section-padding bg-gradient-to-br from-secondary-50 via-white to-primary-50 dark:from-secondary-900 dark:via-secondary-950 dark:to-secondary-900">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Featured Article */}
          <div className="lg:col-span-2">
            <article className="group cursor-pointer">
              <Link href={`/article/${mainArticle.id}`}>
                <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[16/10]">
                  <Image
                    src={mainArticle.imageUrl}
                    alt={mainArticle.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-600 text-white">
                      {mainArticle.category}
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight font-serif group-hover:text-primary-200 transition-colors duration-300">
                      {mainArticle.title}
                    </h1>
                    <p className="text-secondary-200 text-base md:text-lg mb-4 line-clamp-2">
                      {mainArticle.summary}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-secondary-300">
                      <div className="flex items-center space-x-2">
                        <User size={16} />
                        <span>{mainArticle.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock size={16} />
                        <span>{formatTimeAgo(mainArticle.publishedAt)}</span>
                      </div>
                      <span>{mainArticle.readTime} min read</span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          </div>

          {/* Side Articles */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-white font-serif">
                Featured Stories
              </h2>
              <Link
                href="/featured"
                className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm transition-colors duration-200"
              >
                View All
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

            <div className="space-y-6">
              {sideArticles.map((article, index) => (
                <article key={article.id} className="group">
                  <Link href={`/article/${article.id}`}>
                    <div className="flex space-x-4">
                      <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 overflow-hidden rounded-xl">
                        <Image
                          src={article.imageUrl}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 96px, 128px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="mb-2">
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300">
                            {article.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 font-serif">
                          {article.title}
                        </h3>
                        <p className="text-secondary-600 dark:text-secondary-400 text-sm line-clamp-2 mb-2">
                          {article.summary}
                        </p>
                        <div className="flex items-center space-x-3 text-xs text-secondary-500 dark:text-secondary-500">
                          <span>{article.author}</span>
                          <span>•</span>
                          <span>{formatTimeAgo(article.publishedAt)}</span>
                          <span>•</span>
                          <span>{article.readTime} min</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            {/* Breaking News Ticker */}
            <div className="bg-accent-50 dark:bg-accent-900/20 border border-accent-200 dark:border-accent-800 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse"></div>
                <span className="text-accent-700 dark:text-accent-300 font-semibold text-sm uppercase tracking-wide">
                  Breaking News
                </span>
              </div>
              <p className="text-secondary-800 dark:text-secondary-200 text-sm leading-relaxed">
                Global climate summit reaches historic agreement on carbon reduction targets with unprecedented international cooperation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
