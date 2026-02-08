import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc, writeBatch } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { categories } from '../utils/data';
import { 
  Plus, 
  Upload, 
  Eye, 
  Save, 
  AlertCircle, 
  CheckCircle, 
  List, 
  Edit, 
  Trash2, 
  ArrowLeft,
  LayoutDashboard,
  Newspaper,
  Star,
  TrendingUp,
  Clock,
  Settings,
  GripVertical,
  ArrowUp,
  ArrowDown,
  Home,
  Zap,
  Filter,
  Search,
  RefreshCw,
  ExternalLink,
  BarChart3,
  Users,
  FileText,
  Calendar,
  ChevronDown,
  ChevronUp,
  Move,
  Pin,
  PinOff,
  Rss
} from 'lucide-react';

interface Story {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  category: string;
  author: string;
  metaDescription: string;
  keywords: string;
  tags: string[];
  featured: boolean;
  status: string;
  slug: string;
  createdAt: any;
  updatedAt: any;
  views: number;
  likes: number;
  // New fields for homepage management
  homepagePosition?: number;
  isBreaking?: boolean;
  isTrending?: boolean;
  isPinned?: boolean;
  publishedAt?: any;
}

type ViewType = 'dashboard' | 'create' | 'list' | 'edit' | 'homepage' | 'featured';

const Admin = () => {
  const [view, setView] = useState<ViewType>('dashboard');
  const [stories, setStories] = useState<Story[]>([]);
  const [editingStoryId, setEditingStoryId] = useState<string | null>(null);
  const [loadingStories, setLoadingStories] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    imageUrl: '',
    category: '',
    author: '',
    metaDescription: '',
    keywords: '',
    tags: '',
    featured: false,
    status: 'draft',
    isBreaking: false,
    isTrending: false,
    isPinned: false,
    homepagePosition: 0
  });
  
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [rssAgentStatus, setRssAgentStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [rssAgentResult, setRssAgentResult] = useState<any>(null);

  // Fetch stories on mount and when needed
  useEffect(() => {
    fetchStories();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, imageUrl: value }));
    setImagePreview(value);
  };

  // Fetch all stories
  const fetchStories = async () => {
    setLoadingStories(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'news'));
      const storiesData: Story[] = [];
      querySnapshot.forEach((doc) => {
        storiesData.push({ id: doc.id, ...doc.data() } as Story);
      });
      // Sort by creation date (newest first)
      storiesData.sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() || new Date(0);
        const dateB = b.createdAt?.toDate?.() || new Date(0);
        return dateB.getTime() - dateA.getTime();
      });
      setStories(storiesData);
    } catch (error) {
      console.error('Error fetching stories:', error);
      setErrorMessage('Failed to fetch stories');
    } finally {
      setLoadingStories(false);
    }
  };

  // Load a story for editing
  const loadStoryForEdit = async (storyId: string) => {
    try {
      const docRef = doc(db, 'news', storyId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const story = docSnap.data();
        setFormData({
          title: story.title || '',
          summary: story.summary || '',
          content: story.content || '',
          imageUrl: story.imageUrl || '',
          category: story.category || '',
          author: story.author || '',
          metaDescription: story.metaDescription || '',
          keywords: story.keywords || '',
          tags: Array.isArray(story.tags) ? story.tags.join(', ') : '',
          featured: story.featured || false,
          status: story.status || 'draft',
          isBreaking: story.isBreaking || false,
          isTrending: story.isTrending || false,
          isPinned: story.isPinned || false,
          homepagePosition: story.homepagePosition || 0
        });
        setImagePreview(story.imageUrl || '');
        setEditingStoryId(storyId);
        setView('edit');
      }
    } catch (error) {
      console.error('Error loading story:', error);
      setErrorMessage('Failed to load story for editing');
    }
  };

  // Delete a story
  const handleDelete = async (storyId: string) => {
    if (!confirm('Are you sure you want to delete this story? This action cannot be undone.')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'news', storyId));
      setStories(stories.filter(story => story.id !== storyId));
    } catch (error) {
      console.error('Error deleting story:', error);
      alert('Failed to delete story');
    }
  };

  // Toggle featured status
  const toggleFeatured = async (storyId: string, currentStatus: boolean) => {
    try {
      const docRef = doc(db, 'news', storyId);
      await updateDoc(docRef, { featured: !currentStatus, updatedAt: new Date() });
      setStories(stories.map(s => s.id === storyId ? { ...s, featured: !currentStatus } : s));
    } catch (error) {
      console.error('Error toggling featured:', error);
    }
  };

  // Toggle breaking news
  const toggleBreaking = async (storyId: string, currentStatus: boolean) => {
    try {
      const docRef = doc(db, 'news', storyId);
      await updateDoc(docRef, { isBreaking: !currentStatus, updatedAt: new Date() });
      setStories(stories.map(s => s.id === storyId ? { ...s, isBreaking: !currentStatus } : s));
    } catch (error) {
      console.error('Error toggling breaking:', error);
    }
  };

  // Toggle trending
  const toggleTrending = async (storyId: string, currentStatus: boolean) => {
    try {
      const docRef = doc(db, 'news', storyId);
      await updateDoc(docRef, { isTrending: !currentStatus, updatedAt: new Date() });
      setStories(stories.map(s => s.id === storyId ? { ...s, isTrending: !currentStatus } : s));
    } catch (error) {
      console.error('Error toggling trending:', error);
    }
  };

  // Toggle pinned
  const togglePinned = async (storyId: string, currentStatus: boolean) => {
    try {
      const docRef = doc(db, 'news', storyId);
      await updateDoc(docRef, { isPinned: !currentStatus, updatedAt: new Date() });
      setStories(stories.map(s => s.id === storyId ? { ...s, isPinned: !currentStatus } : s));
    } catch (error) {
      console.error('Error toggling pinned:', error);
    }
  };

  // Update homepage position
  const updatePosition = async (storyId: string, newPosition: number) => {
    try {
      const docRef = doc(db, 'news', storyId);
      await updateDoc(docRef, { homepagePosition: newPosition, updatedAt: new Date() });
      setStories(stories.map(s => s.id === storyId ? { ...s, homepagePosition: newPosition } : s));
    } catch (error) {
      console.error('Error updating position:', error);
    }
  };

  // Quick publish/unpublish
  const togglePublish = async (storyId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    try {
      const docRef = doc(db, 'news', storyId);
      const updateData: any = { status: newStatus, updatedAt: new Date() };
      if (newStatus === 'published') {
        updateData.publishedAt = new Date();
      }
      await updateDoc(docRef, updateData);
      setStories(stories.map(s => s.id === storyId ? { ...s, status: newStatus } : s));
    } catch (error) {
      console.error('Error toggling publish:', error);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      summary: '',
      content: '',
      imageUrl: '',
      category: '',
      author: '',
      metaDescription: '',
      keywords: '',
      tags: '',
      featured: false,
      status: 'draft',
      isBreaking: false,
      isTrending: false,
      isPinned: false,
      homepagePosition: 0
    });
    setImagePreview('');
    setEditingStoryId(null);
    setSubmitStatus('idle');
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    // Validation
    if (!formData.title.trim()) {
      setErrorMessage('Title is required');
      setIsSubmitting(false);
      return;
    }
    if (!formData.summary.trim()) {
      setErrorMessage('Summary is required');
      setIsSubmitting(false);
      return;
    }
    if (!formData.content.trim()) {
      setErrorMessage('Content is required');
      setIsSubmitting(false);
      return;
    }
    if (!formData.category) {
      setErrorMessage('Category is required');
      setIsSubmitting(false);
      return;
    }
    if (!formData.author.trim()) {
      setErrorMessage('Author is required');
      setIsSubmitting(false);
      return;
    }

    try {
      const articleData = {
        title: formData.title.trim(),
        summary: formData.summary.trim(),
        content: formData.content.trim(),
        imageUrl: formData.imageUrl.trim(),
        category: formData.category,
        author: formData.author.trim(),
        metaDescription: formData.metaDescription.trim() || formData.summary.trim(),
        keywords: formData.keywords.trim(),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        featured: formData.featured,
        status: formData.status,
        isBreaking: formData.isBreaking,
        isTrending: formData.isTrending,
        isPinned: formData.isPinned,
        homepagePosition: formData.homepagePosition,
        updatedAt: new Date(),
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      };

      if (editingStoryId) {
        // Update existing story
        const docRef = doc(db, 'news', editingStoryId);
        await updateDoc(docRef, articleData);
        setSubmitStatus('success');
        
        setTimeout(() => {
          setView('list');
          fetchStories();
          resetForm();
        }, 1000);
      } else {
        // Create new story
        const newArticleData = {
          ...articleData,
          createdAt: new Date(),
          publishedAt: formData.status === 'published' ? new Date() : null,
          views: 0,
          likes: 0
        };
        
        await addDoc(collection(db, 'news'), newArticleData);
        setSubmitStatus('success');
        resetForm();
        fetchStories();
      }
    } catch (error) {
      console.error('Error saving article: ', error);
      setSubmitStatus('error');
      setErrorMessage(`Failed to ${editingStoryId ? 'update' : 'create'} article. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter stories
  const filteredStories = stories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         story.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || story.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || story.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Get stats
  const stats = {
    total: stories.length,
    published: stories.filter(s => s.status === 'published').length,
    draft: stories.filter(s => s.status === 'draft').length,
    featured: stories.filter(s => s.featured).length,
    breaking: stories.filter(s => s.isBreaking).length,
    trending: stories.filter(s => s.isTrending).length
  };

  // Format date
  const formatDate = (date: any) => {
    if (!date) return 'N/A';
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Trigger RSS Agent
  const triggerRssAgent = async () => {
    setRssAgentStatus('running');
    setRssAgentResult(null);
    
    try {
      const response = await fetch('/api/rss-agent');
      const result = await response.json();
      
      setRssAgentResult(result);
      
      if (result.success) {
        setRssAgentStatus('success');
        // Refresh articles after successful fetch
        setTimeout(() => {
          fetchStories();
        }, 2000);
      } else {
        setRssAgentStatus('error');
      }
    } catch (error: any) {
      console.error('RSS Agent error:', error);
      setRssAgentStatus('error');
      setRssAgentResult({
        success: false,
        message: error.message || 'Failed to trigger RSS agent'
      });
    }
  };

  // Sidebar navigation
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'create', label: 'Create Article', icon: <Plus size={20} /> },
    { id: 'list', label: 'All Articles', icon: <List size={20} /> },
    { id: 'homepage', label: 'Homepage Manager', icon: <Home size={20} /> },
    { id: 'featured', label: 'Featured & Trending', icon: <Star size={20} /> },
  ];

  return (
    <>
      <Head>
        <title>CMS Admin Panel | Neev News</title>
        <meta name="description" content="Content Management System for Neev News" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <div className="min-h-screen bg-secondary-100 dark:bg-secondary-900 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-secondary-900 dark:bg-secondary-950 text-white flex-shrink-0 fixed h-full">
          <div className="p-6 border-b border-secondary-700">
            <div className="flex items-center space-x-3">
              <img src="/logo.png" alt="Neev News" className="w-10 h-10 object-contain" />
              <div>
                <h1 className="font-bold text-lg">NeevNews</h1>
                <p className="text-xs text-secondary-400">CMS Panel</p>
              </div>
            </div>
          </div>
          
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setView(item.id as ViewType);
                  if (item.id === 'create') resetForm();
                  if (item.id === 'list' || item.id === 'homepage' || item.id === 'featured') fetchStories();
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  view === item.id
                    ? 'bg-primary-600 text-white'
                    : 'text-secondary-300 hover:bg-secondary-800 hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-secondary-700">
            <Link
              href="/"
              className="flex items-center space-x-2 text-secondary-400 hover:text-white transition-colors duration-200"
            >
              <ExternalLink size={18} />
              <span>View Site</span>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8">
          {/* Dashboard View */}
          {view === 'dashboard' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-secondary-900 dark:text-white">Dashboard</h2>
                  <p className="text-secondary-600 dark:text-secondary-400">Overview of your content</p>
                </div>
                <button
                  onClick={fetchStories}
                  className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-secondary-800 rounded-lg text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors duration-200"
                >
                  <RefreshCw size={18} />
                  <span>Refresh</span>
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                <div className="card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-3xl font-bold text-secondary-900 dark:text-white">{stats.total}</span>
                  </div>
                  <p className="text-secondary-600 dark:text-secondary-400">Total Articles</p>
                </div>

                <div className="card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-3xl font-bold text-secondary-900 dark:text-white">{stats.published}</span>
                  </div>
                  <p className="text-secondary-600 dark:text-secondary-400">Published</p>
                </div>

                <div className="card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <span className="text-3xl font-bold text-secondary-900 dark:text-white">{stats.draft}</span>
                  </div>
                  <p className="text-secondary-600 dark:text-secondary-400">Drafts</p>
                </div>

                <div className="card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                      <Star className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <span className="text-3xl font-bold text-secondary-900 dark:text-white">{stats.featured}</span>
                  </div>
                  <p className="text-secondary-600 dark:text-secondary-400">Featured</p>
                </div>

                <div className="card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                    <span className="text-3xl font-bold text-secondary-900 dark:text-white">{stats.breaking}</span>
                  </div>
                  <p className="text-secondary-600 dark:text-secondary-400">Breaking</p>
                </div>

                <div className="card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <span className="text-3xl font-bold text-secondary-900 dark:text-white">{stats.trending}</span>
                  </div>
                  <p className="text-secondary-600 dark:text-secondary-400">Trending</p>
                </div>
              </div>

              {/* Recent Articles */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-secondary-900 dark:text-white">Recent Articles</h3>
                  <button
                    onClick={() => { setView('list'); fetchStories(); }}
                    className="text-primary-600 dark:text-primary-400 hover:underline text-sm"
                  >
                    View All
                  </button>
                </div>

                {loadingStories ? (
                  <div className="flex justify-center py-8">
                    <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {stories.slice(0, 5).map((story) => (
                      <div
                        key={story.id}
                        className="flex items-center justify-between p-4 bg-secondary-50 dark:bg-secondary-800 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          {story.imageUrl && (
                            <img
                              src={story.imageUrl}
                              alt=""
                              className="w-16 h-12 object-cover rounded"
                            />
                          )}
                          <div>
                            <h4 className="font-medium text-secondary-900 dark:text-white line-clamp-1">
                              {story.title}
                            </h4>
                            <div className="flex items-center space-x-2 text-sm text-secondary-500">
                              <span>{story.category}</span>
                              <span>•</span>
                              <span>{formatDate(story.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs rounded ${
                            story.status === 'published'
                              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                              : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                          }`}>
                            {story.status}
                          </span>
                          <button
                            onClick={() => loadStoryForEdit(story.id)}
                            className="p-2 text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400"
                          >
                            <Edit size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <button
                  onClick={() => { setView('create'); resetForm(); }}
                  className="card p-6 hover:shadow-lg transition-shadow duration-200 text-left"
                >
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mb-4">
                    <Plus className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="font-semibold text-secondary-900 dark:text-white mb-1">Create New Article</h3>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">Write and publish a new story</p>
                </button>

                <button
                  onClick={triggerRssAgent}
                  disabled={rssAgentStatus === 'running'}
                  className="card p-6 hover:shadow-lg transition-shadow duration-200 text-left disabled:opacity-50 disabled:cursor-not-allowed relative"
                >
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4">
                    {rssAgentStatus === 'running' ? (
                      <RefreshCw className="w-6 h-6 text-green-600 dark:text-green-400 animate-spin" />
                    ) : (
                      <Rss className="w-6 h-6 text-green-600 dark:text-green-400" />
                    )}
                  </div>
                  <h3 className="font-semibold text-secondary-900 dark:text-white mb-1">
                    {rssAgentStatus === 'running' ? 'Fetching News...' : 'Fetch RSS News'}
                  </h3>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    {rssAgentStatus === 'running' ? 'Please wait...' : 'Auto-fetch and publish news from RSS feeds'}
                  </p>
                  {rssAgentResult && (
                    <div className={`mt-3 text-xs p-2 rounded ${
                      rssAgentResult.success 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                    }`}>
                      {rssAgentResult.saved > 0 && (
                        <div>✅ Saved: {rssAgentResult.saved} articles</div>
                      )}
                      {rssAgentResult.fetched > 0 && (
                        <div>📡 Fetched: {rssAgentResult.fetched} articles</div>
                      )}
                      {rssAgentResult.message && (
                        <div className="mt-1">{rssAgentResult.message}</div>
                      )}
                    </div>
                  )}
                </button>

                <button
                  onClick={() => { setView('homepage'); fetchStories(); }}
                  className="card p-6 hover:shadow-lg transition-shadow duration-200 text-left"
                >
                  <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900/30 rounded-xl flex items-center justify-center mb-4">
                    <Home className="w-6 h-6 text-accent-600 dark:text-accent-400" />
                  </div>
                  <h3 className="font-semibold text-secondary-900 dark:text-white mb-1">Manage Homepage</h3>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">Control what shows on the front page</p>
                </button>

                <button
                  onClick={() => { setView('featured'); fetchStories(); }}
                  className="card p-6 hover:shadow-lg transition-shadow duration-200 text-left"
                >
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4">
                    <Star className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-secondary-900 dark:text-white mb-1">Featured & Trending</h3>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">Manage featured and trending stories</p>
                </button>

                <Link
                  href="/admin/cleanup"
                  className="card p-6 hover:shadow-lg transition-shadow duration-200 text-left"
                >
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mb-4">
                    <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="font-semibold text-secondary-900 dark:text-white mb-1">Cleanup Tool</h3>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">Remove articles with broken images</p>
                </Link>
              </div>
            </div>
          )}

          {/* All Articles List View */}
          {view === 'list' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-secondary-900 dark:text-white">All Articles</h2>
                  <p className="text-secondary-600 dark:text-secondary-400">{filteredStories.length} articles found</p>
                </div>
                <button
                  onClick={() => { setView('create'); resetForm(); }}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200"
                >
                  <Plus size={18} />
                  <span>New Article</span>
                </button>
              </div>

              {/* Filters */}
              <div className="card p-4">
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400" size={18} />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search articles..."
                        className="w-full pl-10 pr-4 py-2 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-2 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white"
                  >
                    <option value="all">All Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              {/* Articles Table */}
              <div className="card overflow-hidden">
                {loadingStories ? (
                  <div className="flex justify-center py-12">
                    <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : filteredStories.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-secondary-600 dark:text-secondary-400">No articles found</p>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead className="bg-secondary-50 dark:bg-secondary-800">
                      <tr>
                        <th className="text-left p-4 font-semibold text-secondary-900 dark:text-white">Article</th>
                        <th className="text-left p-4 font-semibold text-secondary-900 dark:text-white">Category</th>
                        <th className="text-left p-4 font-semibold text-secondary-900 dark:text-white">Status</th>
                        <th className="text-left p-4 font-semibold text-secondary-900 dark:text-white">Badges</th>
                        <th className="text-left p-4 font-semibold text-secondary-900 dark:text-white">Date</th>
                        <th className="text-right p-4 font-semibold text-secondary-900 dark:text-white">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-secondary-200 dark:divide-secondary-700">
                      {filteredStories.map((story) => (
                        <tr key={story.id} className="hover:bg-secondary-50 dark:hover:bg-secondary-800/50">
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              {story.imageUrl && (
                                <img src={story.imageUrl} alt="" className="w-12 h-8 object-cover rounded" />
                              )}
                              <div>
                                <p className="font-medium text-secondary-900 dark:text-white line-clamp-1">{story.title}</p>
                                <p className="text-sm text-secondary-500">By {story.author}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="text-secondary-700 dark:text-secondary-300">{story.category}</span>
                          </td>
                          <td className="p-4">
                            <button
                              onClick={() => togglePublish(story.id, story.status)}
                              className={`px-2 py-1 text-xs rounded font-medium ${
                                story.status === 'published'
                                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                                  : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                              }`}
                            >
                              {story.status}
                            </button>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-1">
                              {story.featured && (
                                <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded">
                                  Featured
                                </span>
                              )}
                              {story.isBreaking && (
                                <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs rounded">
                                  Breaking
                                </span>
                              )}
                              {story.isTrending && (
                                <span className="px-2 py-0.5 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs rounded">
                                  Trending
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-4 text-sm text-secondary-500">
                            {formatDate(story.createdAt)}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                onClick={() => loadStoryForEdit(story.id)}
                                className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30 rounded-lg"
                                title="Edit"
                              >
                                <Edit size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(story.id)}
                                className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 rounded-lg"
                                title="Delete"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* Homepage Manager View */}
          {view === 'homepage' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-white">Homepage Manager</h2>
                <p className="text-secondary-600 dark:text-secondary-400">Control which articles appear on the homepage and in what order</p>
              </div>

              {/* Breaking News Section */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-secondary-900 dark:text-white">Breaking News</h3>
                      <p className="text-sm text-secondary-500">Shows as breaking news banner on homepage</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {stories.filter(s => s.status === 'published').map((story) => (
                    <div
                      key={story.id}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        story.isBreaking
                          ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20'
                          : 'border-secondary-200 dark:border-secondary-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => toggleBreaking(story.id, story.isBreaking || false)}
                          className={`p-2 rounded-lg transition-colors duration-200 ${
                            story.isBreaking
                              ? 'bg-red-600 text-white'
                              : 'bg-secondary-200 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-400'
                          }`}
                        >
                          <Zap size={18} />
                        </button>
                        <div>
                          <p className="font-medium text-secondary-900 dark:text-white">{story.title}</p>
                          <p className="text-sm text-secondary-500">{story.category} • {story.author}</p>
                        </div>
                      </div>
                      {story.isBreaking && (
                        <span className="px-3 py-1 bg-red-600 text-white text-sm rounded-full">
                          Active
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Hero Section */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <Star className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-secondary-900 dark:text-white">Featured Hero</h3>
                      <p className="text-sm text-secondary-500">Main featured article on homepage hero section</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {stories.filter(s => s.status === 'published').map((story) => (
                    <div
                      key={story.id}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        story.featured
                          ? 'border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/20'
                          : 'border-secondary-200 dark:border-secondary-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => toggleFeatured(story.id, story.featured)}
                          className={`p-2 rounded-lg transition-colors duration-200 ${
                            story.featured
                              ? 'bg-purple-600 text-white'
                              : 'bg-secondary-200 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-400'
                          }`}
                        >
                          <Star size={18} />
                        </button>
                        <div>
                          <p className="font-medium text-secondary-900 dark:text-white">{story.title}</p>
                          <p className="text-sm text-secondary-500">{story.category} • {story.author}</p>
                        </div>
                      </div>
                      {story.featured && (
                        <span className="px-3 py-1 bg-purple-600 text-white text-sm rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Pinned Articles */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <Pin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-secondary-900 dark:text-white">Pinned Articles</h3>
                      <p className="text-sm text-secondary-500">These stay at the top of the latest news section</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {stories.filter(s => s.status === 'published').map((story) => (
                    <div
                      key={story.id}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        story.isPinned
                          ? 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-secondary-200 dark:border-secondary-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => togglePinned(story.id, story.isPinned || false)}
                          className={`p-2 rounded-lg transition-colors duration-200 ${
                            story.isPinned
                              ? 'bg-blue-600 text-white'
                              : 'bg-secondary-200 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-400'
                          }`}
                        >
                          {story.isPinned ? <Pin size={18} /> : <PinOff size={18} />}
                        </button>
                        <div>
                          <p className="font-medium text-secondary-900 dark:text-white">{story.title}</p>
                          <p className="text-sm text-secondary-500">{story.category} • {story.author}</p>
                        </div>
                      </div>
                      {story.isPinned && (
                        <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                          Pinned
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Featured & Trending Manager */}
          {view === 'featured' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-white">Featured & Trending</h2>
                <p className="text-secondary-600 dark:text-secondary-400">Manage which articles appear in trending and featured sections</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Trending Section */}
                <div className="card p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-secondary-900 dark:text-white">Trending Now</h3>
                      <p className="text-sm text-secondary-500">Shows in sidebar trending section</p>
                    </div>
                  </div>

                  <div className="space-y-3 max-h-[500px] overflow-y-auto">
                    {stories.filter(s => s.status === 'published').map((story) => (
                      <div
                        key={story.id}
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          story.isTrending
                            ? 'border-orange-300 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/20'
                            : 'border-secondary-200 dark:border-secondary-700'
                        }`}
                      >
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          <button
                            onClick={() => toggleTrending(story.id, story.isTrending || false)}
                            className={`p-2 rounded-lg transition-colors duration-200 flex-shrink-0 ${
                              story.isTrending
                                ? 'bg-orange-600 text-white'
                                : 'bg-secondary-200 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-400'
                            }`}
                          >
                            <TrendingUp size={16} />
                          </button>
                          <p className="font-medium text-secondary-900 dark:text-white text-sm truncate">
                            {story.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Featured Section */}
                <div className="card p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <Star className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-secondary-900 dark:text-white">Featured Articles</h3>
                      <p className="text-sm text-secondary-500">Shows in featured sections</p>
                    </div>
                  </div>

                  <div className="space-y-3 max-h-[500px] overflow-y-auto">
                    {stories.filter(s => s.status === 'published').map((story) => (
                      <div
                        key={story.id}
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          story.featured
                            ? 'border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/20'
                            : 'border-secondary-200 dark:border-secondary-700'
                        }`}
                      >
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          <button
                            onClick={() => toggleFeatured(story.id, story.featured)}
                            className={`p-2 rounded-lg transition-colors duration-200 flex-shrink-0 ${
                              story.featured
                                ? 'bg-purple-600 text-white'
                                : 'bg-secondary-200 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-400'
                            }`}
                          >
                            <Star size={16} />
                          </button>
                          <p className="font-medium text-secondary-900 dark:text-white text-sm truncate">
                            {story.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Current Active Items Summary */}
              <div className="card p-6">
                <h3 className="text-lg font-bold text-secondary-900 dark:text-white mb-4">Currently Active</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Zap className="w-5 h-5 text-red-600 dark:text-red-400" />
                      <span className="font-semibold text-secondary-900 dark:text-white">Breaking News</span>
                    </div>
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {stories.filter(s => s.isBreaking).length}
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      <span className="font-semibold text-secondary-900 dark:text-white">Trending</span>
                    </div>
                    <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {stories.filter(s => s.isTrending).length}
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <span className="font-semibold text-secondary-900 dark:text-white">Featured</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {stories.filter(s => s.featured).length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Create/Edit Form View */}
          {(view === 'create' || view === 'edit') && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-secondary-900 dark:text-white">
                    {view === 'edit' ? 'Edit Article' : 'Create New Article'}
                  </h2>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    {view === 'edit' ? 'Update your article' : 'Write and publish a new story'}
                  </p>
                </div>
                {view === 'edit' && (
                  <button
                    onClick={() => { setView('list'); resetForm(); }}
                    className="flex items-center space-x-2 text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-white"
                  >
                    <ArrowLeft size={20} />
                    <span>Back to List</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div className="card p-6">
                      <label htmlFor="title" className="block text-sm font-semibold text-secondary-900 dark:text-white mb-2">
                        Article Title *
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Enter compelling article title..."
                        className="w-full px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white placeholder-secondary-500 text-lg"
                        required
                      />
                    </div>

                    {/* Summary */}
                    <div className="card p-6">
                      <label htmlFor="summary" className="block text-sm font-semibold text-secondary-900 dark:text-white mb-2">
                        Article Summary *
                      </label>
                      <textarea
                        id="summary"
                        name="summary"
                        value={formData.summary}
                        onChange={handleInputChange}
                        placeholder="Brief summary of the article (used for SEO and previews)..."
                        rows={3}
                        className="w-full px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white placeholder-secondary-500"
                        required
                      />
                    </div>

                    {/* Content */}
                    <div className="card p-6">
                      <label htmlFor="content" className="block text-sm font-semibold text-secondary-900 dark:text-white mb-2">
                        Article Content *
                      </label>
                      <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        placeholder="Write your article content here..."
                        rows={15}
                        className="w-full px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white placeholder-secondary-500 font-mono"
                        required
                      />
                    </div>

                    {/* Image URL */}
                    <div className="card p-6">
                      <label htmlFor="imageUrl" className="block text-sm font-semibold text-secondary-900 dark:text-white mb-2">
                        Featured Image URL
                      </label>
                      <div className="flex space-x-3">
                        <input
                          type="url"
                          id="imageUrl"
                          name="imageUrl"
                          value={formData.imageUrl}
                          onChange={handleImageChange}
                          placeholder="https://example.com/image.jpg"
                          className="flex-1 px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white placeholder-secondary-500"
                        />
                      </div>
                      {imagePreview && (
                        <div className="mt-4">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full max-h-48 object-cover rounded-lg"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                        </div>
                      )}
                    </div>

                    {/* SEO Fields */}
                    <div className="card p-6">
                      <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">SEO Settings</h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="metaDescription" className="block text-sm font-semibold text-secondary-900 dark:text-white mb-2">
                            Meta Description
                          </label>
                          <textarea
                            id="metaDescription"
                            name="metaDescription"
                            value={formData.metaDescription}
                            onChange={handleInputChange}
                            placeholder="SEO meta description..."
                            rows={2}
                            className="w-full px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white placeholder-secondary-500"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="keywords" className="block text-sm font-semibold text-secondary-900 dark:text-white mb-2">
                              Keywords
                            </label>
                            <input
                              type="text"
                              id="keywords"
                              name="keywords"
                              value={formData.keywords}
                              onChange={handleInputChange}
                              placeholder="keyword1, keyword2, keyword3"
                              className="w-full px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white placeholder-secondary-500"
                            />
                          </div>
                          <div>
                            <label htmlFor="tags" className="block text-sm font-semibold text-secondary-900 dark:text-white mb-2">
                              Tags
                            </label>
                            <input
                              type="text"
                              id="tags"
                              name="tags"
                              value={formData.tags}
                              onChange={handleInputChange}
                              placeholder="tag1, tag2, tag3"
                              className="w-full px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white placeholder-secondary-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Submit */}
                    <div className="flex items-center space-x-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center space-x-2 px-8 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>{editingStoryId ? 'Updating...' : 'Creating...'}</span>
                          </>
                        ) : (
                          <>
                            <Save size={20} />
                            <span>{editingStoryId ? 'Update Article' : 'Create Article'}</span>
                          </>
                        )}
                      </button>

                      {submitStatus === 'success' && (
                        <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                          <CheckCircle size={20} />
                          <span>Saved successfully!</span>
                        </div>
                      )}

                      {submitStatus === 'error' && (
                        <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                          <AlertCircle size={20} />
                          <span>{errorMessage}</span>
                        </div>
                      )}
                    </div>
                  </form>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Publish Settings */}
                  <div className="card p-6">
                    <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">Publish Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="status" className="block text-sm font-semibold text-secondary-900 dark:text-white mb-2">
                          Status
                        </label>
                        <select
                          id="status"
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white"
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="category" className="block text-sm font-semibold text-secondary-900 dark:text-white mb-2">
                          Category *
                        </label>
                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white"
                          required
                        >
                          <option value="">Select category</option>
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.name}>{cat.icon} {cat.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="author" className="block text-sm font-semibold text-secondary-900 dark:text-white mb-2">
                          Author *
                        </label>
                        <input
                          type="text"
                          id="author"
                          name="author"
                          value={formData.author}
                          onChange={handleInputChange}
                          placeholder="Author name"
                          className="w-full px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white placeholder-secondary-500"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Homepage Placement */}
                  <div className="card p-6">
                    <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">Homepage Placement</h3>
                    <div className="space-y-4">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="featured"
                          checked={formData.featured}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                        />
                        <div className="flex items-center space-x-2">
                          <Star size={18} className="text-purple-600" />
                          <span className="text-secondary-900 dark:text-white">Featured Article</span>
                        </div>
                      </label>

                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="isBreaking"
                          checked={formData.isBreaking}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                        />
                        <div className="flex items-center space-x-2">
                          <Zap size={18} className="text-red-600" />
                          <span className="text-secondary-900 dark:text-white">Breaking News</span>
                        </div>
                      </label>

                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="isTrending"
                          checked={formData.isTrending}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
                        />
                        <div className="flex items-center space-x-2">
                          <TrendingUp size={18} className="text-orange-600" />
                          <span className="text-secondary-900 dark:text-white">Trending</span>
                        </div>
                      </label>

                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="isPinned"
                          checked={formData.isPinned}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <div className="flex items-center space-x-2">
                          <Pin size={18} className="text-blue-600" />
                          <span className="text-secondary-900 dark:text-white">Pin to Top</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="card p-6">
                    <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4 flex items-center space-x-2">
                      <Eye size={20} />
                      <span>Preview</span>
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-secondary-500">Title:</span>
                        <p className="text-secondary-900 dark:text-white font-medium">{formData.title || '—'}</p>
                      </div>
                      <div>
                        <span className="text-secondary-500">Category:</span>
                        <p className="text-secondary-900 dark:text-white">{formData.category || '—'}</p>
                      </div>
                      <div>
                        <span className="text-secondary-500">Author:</span>
                        <p className="text-secondary-900 dark:text-white">{formData.author || '—'}</p>
                      </div>
                      <div>
                        <span className="text-secondary-500">Status:</span>
                        <span className={`ml-2 px-2 py-0.5 text-xs rounded ${
                          formData.status === 'published'
                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                            : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                        }`}>
                          {formData.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Admin;
