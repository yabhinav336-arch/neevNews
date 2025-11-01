import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { categories } from '../utils/data';
import { Plus, Upload, Eye, Save, AlertCircle, CheckCircle, List, Edit, Trash2, X, ArrowLeft } from 'lucide-react';

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
}

const Admin = () => {
  const [view, setView] = useState<'create' | 'list' | 'edit'>('create');
  const [stories, setStories] = useState<Story[]>([]);
  const [editingStoryId, setEditingStoryId] = useState<string | null>(null);
  const [loadingStories, setLoadingStories] = useState(false);
  
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
    status: 'draft'
  });
  
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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
          status: story.status || 'draft'
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
      alert('Story deleted successfully');
    } catch (error) {
      console.error('Error deleting story:', error);
      alert('Failed to delete story');
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
      status: 'draft'
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
        updatedAt: new Date(),
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      };

      if (editingStoryId) {
        // Update existing story
        const docRef = doc(db, 'news', editingStoryId);
        await updateDoc(docRef, articleData);
        setSubmitStatus('success');
        alert('Story updated successfully!');
        
        // Refresh the stories list if we're in list view
        if (view === 'edit') {
          setTimeout(() => {
            setView('list');
            fetchStories();
            resetForm();
          }, 1000);
        }
      } else {
        // Create new story
        const newArticleData = {
          ...articleData,
          createdAt: new Date(),
          views: 0,
          likes: 0
        };
        
        const docRef = await addDoc(collection(db, 'news'), newArticleData);
        setSubmitStatus('success');
        resetForm();
        console.log('Article created with ID: ', docRef.id);
      }
    } catch (error) {
      console.error('Error saving article: ', error);
      setSubmitStatus('error');
      setErrorMessage(`Failed to ${editingStoryId ? 'update' : 'create'} article. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Panel - Create News Article | Neev News</title>
        <meta name="description" content="Admin panel for creating and managing news articles on Neev News" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
        <div className="container-custom py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 flex-shrink-0">
                  <img
                    src="/logo.png"
                    alt="Neev News Logo"
                    className="w-full h-full object-contain drop-shadow-md"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-secondary-900 dark:text-white font-serif">
                    Admin Panel
                  </h1>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Create and manage news articles
                  </p>
                </div>
              </div>
              
              {/* View Toggle Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setView('create');
                    resetForm();
                  }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    view === 'create'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700'
                  }`}
                >
                  <Plus size={20} />
                  <span>Create New</span>
                </button>
                <button
                  onClick={() => {
                    setView('list');
                    fetchStories();
                  }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    view === 'list'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700'
                  }`}
                >
                  <List size={20} />
                  <span>View All Stories</span>
                </button>
              </div>
            </div>
          </div>

          {/* Stories List View */}
          {view === 'list' && (
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">
                All Stories
              </h2>
              
              {loadingStories ? (
                <div className="flex justify-center items-center py-12">
                  <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : stories.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-secondary-600 dark:text-secondary-400">No stories found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {stories.map((story) => (
                    <div
                      key={story.id}
                      className="flex items-center justify-between p-4 border border-secondary-200 dark:border-secondary-700 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors duration-200"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-secondary-900 dark:text-white mb-1">
                          {story.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-secondary-600 dark:text-secondary-400">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            story.status === 'published'
                              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                              : story.status === 'draft'
                              ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                              : 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200'
                          }`}>
                            {story.status}
                          </span>
                          <span>{story.category}</span>
                          <span>By {story.author}</span>
                          {story.featured && (
                            <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-xs rounded font-medium">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => loadStoryForEdit(story.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900 rounded-lg transition-colors duration-200"
                          title="Edit story"
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(story.id)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900 rounded-lg transition-colors duration-200"
                          title="Delete story"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Create/Edit Form View */}
          {(view === 'create' || view === 'edit') && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="card p-8">
                {view === 'edit' && (
                  <div className="mb-6 pb-6 border-b border-secondary-200 dark:border-secondary-700">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">
                        Edit Story
                      </h2>
                      <button
                        type="button"
                        onClick={() => {
                          setView('list');
                          resetForm();
                        }}
                        className="flex items-center space-x-2 px-4 py-2 text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-white transition-colors duration-200"
                      >
                        <ArrowLeft size={20} />
                        <span>Back to List</span>
                      </button>
                    </div>
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div>
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
                      className="w-full px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white placeholder-secondary-500"
                      required
                    />
                  </div>

                  {/* Summary */}
                  <div>
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
                  <div>
                    <label htmlFor="content" className="block text-sm font-semibold text-secondary-900 dark:text-white mb-2">
                      Article Content *
                    </label>
                    <textarea
                      id="content"
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      placeholder="Write your article content here..."
                      rows={12}
                      className="w-full px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white placeholder-secondary-500"
                      required
                    />
                  </div>

                  {/* Image URL */}
                  <div>
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
                      <button
                        type="button"
                        className="px-4 py-3 bg-secondary-200 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 rounded-lg hover:bg-secondary-300 dark:hover:bg-secondary-600 transition-colors duration-200"
                        title="Upload Image"
                      >
                        <Upload size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Category and Author */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.name}>
                            {cat.name}
                          </option>
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

                  {/* SEO Fields */}
                  <div className="border-t border-secondary-200 dark:border-secondary-700 pt-6">
                    <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
                      SEO Settings
                    </h3>
                    
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
                          placeholder="SEO meta description (auto-generated from summary if empty)"
                          rows={2}
                          className="w-full px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white placeholder-secondary-500"
                        />
                      </div>

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

                  {/* Options */}
                  <div className="border-t border-secondary-200 dark:border-secondary-700 pt-6">
                    <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
                      Article Options
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="featured"
                          name="featured"
                          checked={formData.featured}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-primary-600 bg-secondary-100 border-secondary-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-secondary-900 focus:ring-2 dark:bg-secondary-700 dark:border-secondary-600"
                        />
                        <label htmlFor="featured" className="text-sm font-medium text-secondary-900 dark:text-white">
                          Featured Article
                        </label>
                      </div>

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
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex items-center space-x-4 pt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>{editingStoryId ? 'Updating...' : 'Creating...'}</span>
                        </>
                      ) : (
                        <>
                          <Save size={20} />
                          <span>{editingStoryId ? 'Update Story' : 'Create Article'}</span>
                        </>
                      )}
                    </button>

                    {view === 'edit' && (
                      <button
                        type="button"
                        onClick={() => {
                          setView('list');
                          resetForm();
                        }}
                        className="px-6 py-3 bg-secondary-200 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 font-semibold rounded-lg hover:bg-secondary-300 dark:hover:bg-secondary-600 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    )}

                    {submitStatus === 'success' && (
                      <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                        <CheckCircle size={20} />
                        <span>{editingStoryId ? 'Story updated successfully!' : 'Article created successfully!'}</span>
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
            </div>

            {/* Preview Sidebar */}
            <div className="lg:col-span-1">
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4 flex items-center space-x-2">
                  <Eye size={20} />
                  <span>Preview</span>
                </h3>

                {/* Image Preview */}
                {imagePreview && (
                  <div className="mb-4">
                    <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNDAgODBIMTYwVjEwMEgxNDBWODBaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0xNDAgMTAwSDE2MFYxMjBIMTQwVjEwMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHN2ZyB4PSIxNDAiIHk9IjgwIiB3aWR0aD0iMjAiIGhlaWdodD0iNDAiPgo8cGF0aCBkPSJNMTAgMjBMMTAgMCIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjIiLz4KPHN2ZyB4PSI4IiB5PSIxMCIgd2lkdGg9IjQiIGhlaWdodD0iMTAiPgo8Y2lyY2xlIGN4PSIyIiBjeT0iMiIgcj0iMiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4KPC9zdmc+Cjwvc3ZnPg==';
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Article Preview */}
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-secondary-900 dark:text-white text-sm mb-1">Title</h4>
                    <p className="text-secondary-700 dark:text-secondary-300 text-sm">
                      {formData.title || 'Article title will appear here...'}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-secondary-900 dark:text-white text-sm mb-1">Summary</h4>
                    <p className="text-secondary-700 dark:text-secondary-300 text-sm">
                      {formData.summary || 'Article summary will appear here...'}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-secondary-900 dark:text-white text-sm mb-1">Category</h4>
                    <span className="inline-block px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-xs rounded">
                      {formData.category || 'No category selected'}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-semibold text-secondary-900 dark:text-white text-sm mb-1">Author</h4>
                    <p className="text-secondary-700 dark:text-secondary-300 text-sm">
                      {formData.author || 'Author name will appear here...'}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-secondary-900 dark:text-white text-sm mb-1">Status</h4>
                    <span className={`inline-block px-2 py-1 text-xs rounded ${
                      formData.status === 'published' 
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : formData.status === 'draft'
                        ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                        : 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200'
                    }`}>
                      {formData.status.charAt(0).toUpperCase() + formData.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Admin;