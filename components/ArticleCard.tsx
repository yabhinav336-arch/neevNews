import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, User, TrendingUp, Pin, Zap } from 'lucide-react';
import { getArticleUrl, getCategorySlug } from '@/utils/data';
import { getImageUrl } from '@/utils/images';

interface Article {
  id: string;
  title: string;
  summary: string;
  imageUrl?: string;
  category: string;
  author: string;
  createdAt: any;
  slug: string;
  views?: number;
  isPinned?: boolean;
  isBreaking?: boolean;
  isTrending?: boolean;
}

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'compact' | 'featured';
  showCategory?: boolean;
  className?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  variant = 'default',
  showCategory = true,
  className = '',
}) => {
  const formatTimeAgo = (date: any) => {
    if (!date) return '';
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    const seconds = Math.floor((new Date().getTime() - dateObj.getTime()) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Politics': 'bg-blue-500',
      'Technology': 'bg-purple-500',
      'Business': 'bg-green-500',
      'Science': 'bg-orange-500',
      'Health': 'bg-red-500',
      'Sports': 'bg-yellow-500',
      'Entertainment': 'bg-pink-500',
      'World': 'bg-indigo-500',
    };
    return colors[category] || 'bg-blue-500';
  };

  const imageUrl = getImageUrl(article.imageUrl);

  if (variant === 'compact') {
    return (
      <Link href={getArticleUrl(article)} className={`group block ${className}`}>
        <div className="flex space-x-3">
          <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="80px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-secondary-900 dark:text-white mb-1 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
              {article.title}
            </h3>
            <div className="flex items-center text-xs text-secondary-500">
              <Clock size={12} />
              <span className="ml-1">{formatTimeAgo(article.createdAt)}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <Link href={getArticleUrl(article)} className={`group block ${className}`}>
        <div className="card-hover overflow-hidden">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={imageUrl}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute top-3 left-3 flex items-center space-x-2 flex-wrap gap-2">
              {article.isBreaking && (
                <span className="px-2 py-1 bg-red-600 text-white text-xs font-medium rounded flex items-center space-x-1">
                  <Zap size={10} className="fill-current" />
                  <span>Breaking</span>
                </span>
              )}
              {article.isPinned && (
                <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded flex items-center space-x-1">
                  <Pin size={10} />
                  <span>Pinned</span>
                </span>
              )}
              {showCategory && (
                <span className={`px-2 py-1 text-white text-xs font-medium rounded ${getCategoryColor(article.category)}`}>
                  {article.category}
                </span>
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary-300 transition-colors duration-200">
                {article.title}
              </h3>
              <div className="flex items-center text-xs text-white/80">
                <Clock size={12} />
                <span className="ml-1">{formatTimeAgo(article.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <article className={`group ${className}`}>
      <Link href={getArticleUrl(article)}>
        <div className="card-hover overflow-hidden h-full">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={imageUrl}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              loading="lazy"
            />
            <div className="absolute top-3 left-3 flex items-center space-x-2 flex-wrap gap-2">
              {article.isPinned && (
                <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded flex items-center space-x-1">
                  <Pin size={10} />
                  <span>Pinned</span>
                </span>
              )}
              {article.isBreaking && (
                <span className="px-2 py-1 bg-red-600 text-white text-xs font-medium rounded flex items-center space-x-1">
                  <Zap size={10} className="fill-current" />
                  <span>Breaking</span>
                </span>
              )}
              {showCategory && (
                <span className={`px-2 py-1 text-white text-xs font-medium rounded ${getCategoryColor(article.category)}`}>
                  {article.category}
                </span>
              )}
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
              {article.isTrending && (
                <>
                  <span className="mx-2">•</span>
                  <span className="flex items-center space-x-1 text-orange-600">
                    <TrendingUp size={12} />
                    <span>Trending</span>
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ArticleCard;

