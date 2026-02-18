import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X, Search, Bell, User, Sun, Moon, Settings, ChevronRight, Clock, Newspaper } from 'lucide-react';
import { useDarkMode } from '@/hooks/useDarkMode';
import { categories } from '@/utils/data';
import { getCachedArticles } from '@/utils/articlesCache';

interface Article {
  id: string;
  title: string;
  summary: string;
  category: string;
  slug: string;
  imageUrl?: string;
  createdAt?: any;
}

const Header: React.FC = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const { isDark, toggleDarkMode, isLoaded } = useDarkMode();

  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch articles for search and notifications (uses shared cache)
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const allDocs = await getCachedArticles();
        const articles: Article[] = allDocs
          .filter((d: any) => d.status === 'published')
          .map((d: any) => ({
            id: d.id,
            title: d.title,
            summary: d.summary,
            category: d.category,
            slug: d.slug,
            imageUrl: d.imageUrl,
            createdAt: d.createdAt,
          }));

        // Sort by date for latest articles
        const sorted = [...articles].sort((a, b) => {
          const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
          const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
          return dateB.getTime() - dateA.getTime();
        });

        setAllArticles(articles);
        setLatestArticles(sorted.slice(0, 5));
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    fetchArticles();
  }, []);

  // Handle search
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const query = searchQuery.toLowerCase();
    const results = allArticles.filter(article =>
      article.title.toLowerCase().includes(query) ||
      article.summary.toLowerCase().includes(query) ||
      article.category.toLowerCase().includes(query)
    ).slice(0, 6);

    setSearchResults(results);
    setIsSearching(false);
  }, [searchQuery, allArticles]);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      // Escape to close
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsProfileOpen(false);
        setIsNotificationsOpen(false);
        setSearchQuery('');
        setSearchResults([]);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleArticleClick = (article: Article) => {
    const categorySlug = categories.find(c => c.name === article.category)?.slug || article.category.toLowerCase();
    router.push(`/${categorySlug}/${article.slug}`);
    setIsSearchOpen(false);
    setIsNotificationsOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/news?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const formatTimeAgo = (date: any) => {
    if (!date) return '';
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    const seconds = Math.floor((new Date().getTime() - dateObj.getTime()) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMenuOpen
          ? 'bg-white/95 dark:bg-secondary-950/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
          }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 lg:w-12 lg:h-12 group-hover:scale-105 transition-transform duration-200 flex-shrink-0">
                <img
                  src="/logo.png"
                  alt="Neev News Logo"
                  className="w-full h-full object-contain drop-shadow-sm"
                />
              </div>
              <div className="flex flex-col overflow-hidden">
                <h1 className="text-xl lg:text-2xl font-bold text-secondary-900 dark:text-white font-serif leading-none whitespace-nowrap">
                  Neev News
                </h1>
                <span className="text-[10px] lg:text-xs text-secondary-500 dark:text-secondary-400 hidden sm:block leading-tight whitespace-nowrap">
                  Global News & Articles
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                href="/"
                className="text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200"
              >
                Home
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200"
                >
                  {category.name}
                </Link>
              ))}
              <Link
                href="/about"
                className="text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200"
              >
                About
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 flex items-center space-x-2"
                aria-label="Search"
              >
                <Search size={20} />
                <span className="hidden md:inline text-sm text-secondary-500">⌘K</span>
              </button>

              {/* Notifications Dropdown */}
              <div className="relative hidden sm:block" ref={notificationsRef}>
                <button
                  onClick={() => {
                    setIsNotificationsOpen(!isNotificationsOpen);
                    setIsProfileOpen(false);
                  }}
                  className="p-2 text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 relative"
                  aria-label="Notifications"
                >
                  <Bell size={20} />
                  {latestArticles.length > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {isNotificationsOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-secondary-900 rounded-xl shadow-xl border border-secondary-200 dark:border-secondary-700 overflow-hidden z-50">
                    {/* Header */}
                    <div className="px-4 py-3 border-b border-secondary-200 dark:border-secondary-700 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Newspaper size={18} className="text-primary-600 dark:text-primary-400" />
                        <h3 className="font-semibold text-secondary-900 dark:text-white">Latest Stories</h3>
                      </div>
                      <Link
                        href="/news"
                        onClick={() => setIsNotificationsOpen(false)}
                        className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
                      >
                        View All
                      </Link>
                    </div>

                    {/* Articles List */}
                    <div className="max-h-[350px] overflow-y-auto">
                      {latestArticles.length === 0 ? (
                        <div className="py-8 text-center text-secondary-500">
                          <Bell size={32} className="mx-auto mb-2 opacity-50" />
                          <p>No stories yet</p>
                        </div>
                      ) : (
                        latestArticles.map((article) => (
                          <button
                            key={article.id}
                            onClick={() => handleArticleClick(article)}
                            className="w-full flex items-start space-x-3 px-4 py-3 hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors duration-200 text-left border-b border-secondary-100 dark:border-secondary-800 last:border-0"
                          >
                            {article.imageUrl && (
                              <img
                                src={article.imageUrl}
                                alt=""
                                className="w-14 h-10 object-cover rounded flex-shrink-0"
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-secondary-900 dark:text-white line-clamp-2">
                                {article.title}
                              </p>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-xs text-primary-600 dark:text-primary-400">{article.category}</span>
                                <span className="text-xs text-secondary-400">•</span>
                                <span className="text-xs text-secondary-400 flex items-center space-x-1">
                                  <Clock size={10} />
                                  <span>{formatTimeAgo(article.createdAt)}</span>
                                </span>
                              </div>
                            </div>
                          </button>
                        ))
                      )}
                    </div>

                    {/* Footer */}
                    <div className="px-4 py-2 bg-secondary-50 dark:bg-secondary-800/50 border-t border-secondary-200 dark:border-secondary-700">
                      <p className="text-xs text-secondary-500 text-center">
                        Stay updated with the latest news
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Dark Mode Toggle */}
              {isLoaded && (
                <button
                  onClick={toggleDarkMode}
                  className="p-2 text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              )}

              {/* User Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => {
                    setIsProfileOpen(!isProfileOpen);
                    setIsNotificationsOpen(false);
                  }}
                  className="p-2 text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 hidden sm:flex items-center space-x-1"
                  aria-label="User profile"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-secondary-900 rounded-xl shadow-xl border border-secondary-200 dark:border-secondary-700 py-2 z-50">
                    {/* Guest User */}
                    <div className="px-4 py-3 border-b border-secondary-200 dark:border-secondary-700">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                          <User size={20} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-secondary-900 dark:text-white">Welcome!</p>
                          <p className="text-sm text-secondary-500">Explore NeevNews</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        href="/newsletter"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center justify-between px-4 py-2 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors duration-200"
                      >
                        <div className="flex items-center space-x-3">
                          <Bell size={18} className="text-primary-600 dark:text-primary-400" />
                          <span>Newsletter</span>
                        </div>
                        <ChevronRight size={16} className="text-secondary-400" />
                      </Link>

                      <Link
                        href="/news"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center justify-between px-4 py-2 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors duration-200"
                      >
                        <div className="flex items-center space-x-3">
                          <Newspaper size={18} className="text-primary-600 dark:text-primary-400" />
                          <span>All News</span>
                        </div>
                        <ChevronRight size={16} className="text-secondary-400" />
                      </Link>

                      <button
                        onClick={() => {
                          toggleDarkMode();
                          setIsProfileOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-4 py-2 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors duration-200"
                      >
                        <div className="flex items-center space-x-3">
                          {isDark ? <Sun size={18} className="text-primary-600 dark:text-primary-400" /> : <Moon size={18} className="text-primary-600 dark:text-primary-400" />}
                          <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                        </div>
                      </button>

                      <Link
                        href="/contact"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center justify-between px-4 py-2 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors duration-200"
                      >
                        <div className="flex items-center space-x-3">
                          <Settings size={18} className="text-primary-600 dark:text-primary-400" />
                          <span>Contact Us</span>
                        </div>
                        <ChevronRight size={16} className="text-secondary-400" />
                      </Link>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-secondary-200 dark:border-secondary-700 pt-2 px-4 pb-2">
                      <p className="text-xs text-secondary-500 text-center">
                        © 2025 NeevNews
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="lg:hidden p-2 text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-[calc(100vh-4rem)] opacity-100 overflow-y-auto' : 'max-h-0 opacity-0 overflow-hidden'
              }`}
          >
            <nav className="py-4 space-y-2 border-t border-secondary-200 dark:border-secondary-700">
              {/* Mobile Search */}
              <div className="px-4 pb-4">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400" size={18} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles..."
                    className="w-full pl-10 pr-4 py-2 bg-secondary-100 dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 rounded-lg text-secondary-900 dark:text-white placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </form>
              </div>

              <Link
                href="/"
                className="block px-4 py-2 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800 rounded-lg transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="block px-4 py-2 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
              <Link
                href="/about"
                className="block px-4 py-2 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800 rounded-lg transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>

              <div className="border-t border-secondary-200 dark:border-secondary-700 pt-4 mt-4">
                <Link
                  href="/news"
                  className="flex items-center space-x-3 px-4 py-2 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Newspaper size={18} className="text-primary-600" />
                  <span>All News</span>
                </Link>
                <Link
                  href="/newsletter"
                  className="flex items-center space-x-3 px-4 py-2 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Bell size={18} className="text-primary-600" />
                  <span>Newsletter</span>
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center space-x-3 px-4 py-2 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Settings size={18} className="text-primary-600" />
                  <span>Contact</span>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Search Modal Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div
            ref={searchContainerRef}
            className="w-full max-w-2xl bg-white dark:bg-secondary-900 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary-400" size={22} />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, topics, categories..."
                className="w-full pl-14 pr-24 py-5 bg-transparent text-lg text-secondary-900 dark:text-white placeholder-secondary-500 focus:outline-none border-b border-secondary-200 dark:border-secondary-700"
              />
              {/* Close Button */}
              <button
                type="button"
                onClick={closeSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-secondary-500 hover:text-secondary-700 dark:hover:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800 rounded-full transition-colors duration-200"
                aria-label="Close search"
              >
                <X size={20} />
              </button>
            </form>

            {/* Search Results */}
            <div className="max-h-[400px] overflow-y-auto">
              {isSearching && (
                <div className="flex items-center justify-center py-8">
                  <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              {!isSearching && searchQuery.length >= 2 && searchResults.length === 0 && (
                <div className="py-8 text-center text-secondary-500">
                  <p>No results found for "{searchQuery}"</p>
                  <p className="text-sm mt-2">Try different keywords or browse categories</p>
                </div>
              )}

              {!isSearching && searchResults.length > 0 && (
                <div className="py-2">
                  <p className="px-5 py-2 text-xs font-semibold text-secondary-500 uppercase tracking-wider">
                    Results
                  </p>
                  {searchResults.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleArticleClick(result)}
                      className="w-full flex items-center space-x-4 px-5 py-3 hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors duration-200 text-left"
                    >
                      {result.imageUrl && (
                        <img
                          src={result.imageUrl}
                          alt=""
                          className="w-16 h-12 object-cover rounded-lg flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-secondary-900 dark:text-white truncate">
                          {result.title}
                        </p>
                        <p className="text-sm text-secondary-500 truncate">
                          {result.category} • {result.summary.slice(0, 60)}...
                        </p>
                      </div>
                      <ChevronRight size={18} className="text-secondary-400 flex-shrink-0" />
                    </button>
                  ))}
                </div>
              )}

              {/* Quick Links */}
              {searchQuery.length < 2 && (
                <div className="py-4">
                  <p className="px-5 py-2 text-xs font-semibold text-secondary-500 uppercase tracking-wider">
                    Quick Links
                  </p>
                  <Link
                    href="/news"
                    onClick={closeSearch}
                    className="flex items-center justify-between px-5 py-3 hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors duration-200"
                  >
                    <span className="text-secondary-700 dark:text-secondary-300">All News</span>
                    <ChevronRight size={18} className="text-secondary-400" />
                  </Link>
                  {categories.slice(0, 4).map((category) => (
                    <Link
                      key={category.id}
                      href={`/category/${category.slug}`}
                      onClick={closeSearch}
                      className="flex items-center justify-between px-5 py-3 hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors duration-200"
                    >
                      <span className="text-secondary-700 dark:text-secondary-300">{category.name}</span>
                      <ChevronRight size={18} className="text-secondary-400" />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 bg-secondary-50 dark:bg-secondary-800/50 border-t border-secondary-200 dark:border-secondary-700 flex items-center justify-between text-xs text-secondary-500">
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <kbd className="px-1.5 py-0.5 bg-secondary-200 dark:bg-secondary-700 rounded text-[10px]">↵</kbd>
                  <span>to select</span>
                </span>
                <span className="flex items-center space-x-1">
                  <kbd className="px-1.5 py-0.5 bg-secondary-200 dark:bg-secondary-700 rounded text-[10px]">esc</kbd>
                  <span>to close</span>
                </span>
              </div>
              <span>Powered by NeevNews</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
