import { Article, Category, Author } from '@/types';

export const categories: Category[] = [
  { id: '1', name: 'World News', slug: 'world-news', color: 'bg-blue-500' },
  { id: '2', name: 'Politics', slug: 'politics', color: 'bg-red-500' },
  { id: '3', name: 'Technology', slug: 'technology', color: 'bg-purple-500' },
  { id: '4', name: 'Business', slug: 'business', color: 'bg-green-500' },
  { id: '5', name: 'Science', slug: 'science', color: 'bg-indigo-500' },
  { id: '6', name: 'Health', slug: 'health', color: 'bg-pink-500' },
  { id: '7', name: 'Sports', slug: 'sports', color: 'bg-orange-500' },
  { id: '8', name: 'Entertainment', slug: 'entertainment', color: 'bg-yellow-500' },
];

export const authors: Author[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    bio: 'International correspondent with 15 years of experience covering global affairs.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: '2',
    name: 'Michael Chen',
    bio: 'Technology journalist specializing in AI and emerging technologies.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    bio: 'Political analyst and investigative journalist based in Washington DC.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: '4',
    name: 'David Thompson',
    bio: 'Business correspondent covering markets, economics, and corporate affairs.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
  },
];

export const featuredArticles: Article[] = [
  {
    id: '1',
    title: 'global climate summit reaches historic agreement on carbon reduction targets',
    summary: 'world leaders unite in unprecedented climate action plan, setting ambitious goals for 2030. major economies commit to 50% emissions cuts as developing nations receive substantial green funding support.',
    author: 'Sarah Johnson',
    publishedAt: '2024-01-15T10:30:00Z',
    category: 'World News',
    imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=400&fit=crop',
    readTime: 8,
    tags: ['climate change', 'environment', 'politics', 'global summit'],
    featured: true,
  },
  {
    id: '2',
    title: 'breakthrough ai model demonstrates human-level reasoning capabilities',
    summary: 'new artificial intelligence system shows remarkable problem-solving skills across multiple domains. researchers report significant advances in logical reasoning and creative thinking abilities.',
    author: 'Michael Chen',
    publishedAt: '2024-01-14T15:45:00Z',
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    readTime: 6,
    tags: ['artificial intelligence', 'technology', 'research', 'innovation'],
    featured: true,
  },
  {
    id: '3',
    title: 'major electoral reforms proposed ahead of upcoming general elections',
    summary: 'comprehensive voting system overhaul aims to increase accessibility and security. new measures include expanded early voting, enhanced cybersecurity protocols, and improved ballot verification systems.',
    author: 'Emma Rodriguez',
    publishedAt: '2024-01-13T09:20:00Z',
    category: 'Politics',
    imageUrl: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&h=400&fit=crop',
    readTime: 5,
    tags: ['elections', 'democracy', 'voting', 'reform'],
    featured: true,
  },
];

export const latestArticles: Article[] = [
  {
    id: '4',
    title: 'renewable energy investments surge to record highs globally',
    summary: 'clean energy funding reaches $2.8 trillion as nations accelerate green transition efforts.',
    author: 'David Thompson',
    publishedAt: '2024-01-15T08:15:00Z',
    category: 'Business',
    imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=250&fit=crop',
    readTime: 4,
    tags: ['renewable energy', 'investment', 'business'],
  },
  {
    id: '5',
    title: 'new medical breakthrough offers hope for alzheimer\'s treatment',
    summary: 'clinical trials show promising results for innovative therapy targeting brain protein deposits.',
    author: 'Sarah Johnson',
    publishedAt: '2024-01-14T16:30:00Z',
    category: 'Health',
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
    readTime: 7,
    tags: ['healthcare', 'medical research', 'alzheimers'],
  },
  {
    id: '6',
    title: 'space exploration mission discovers potential signs of ancient life',
    summary: 'mars rover findings suggest possible microbial activity from billions of years ago.',
    author: 'Michael Chen',
    publishedAt: '2024-01-14T12:00:00Z',
    category: 'Science',
    imageUrl: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=250&fit=crop',
    readTime: 6,
    tags: ['space', 'mars', 'exploration', 'science'],
  },
  {
    id: '7',
    title: 'international trade agreements reshape global commerce landscape',
    summary: 'new partnerships between major economies promise to boost cross-border business activity.',
    author: 'David Thompson',
    publishedAt: '2024-01-13T14:45:00Z',
    category: 'Business',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
    readTime: 5,
    tags: ['trade', 'economy', 'international'],
  },
  {
    id: '8',
    title: 'championship finals draw record-breaking global viewership',
    summary: 'sporting event attracts over 1.2 billion viewers worldwide, setting new broadcast records.',
    author: 'Emma Rodriguez',
    publishedAt: '2024-01-13T11:20:00Z',
    category: 'Sports',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=250&fit=crop',
    readTime: 3,
    tags: ['sports', 'championship', 'viewership'],
  },
  {
    id: '9',
    title: 'cultural festival celebrates diversity with record attendance',
    summary: 'annual celebration brings together communities from around the world in spectacular showcase.',
    author: 'Sarah Johnson',
    publishedAt: '2024-01-12T17:10:00Z',
    category: 'Entertainment',
    imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=250&fit=crop',
    readTime: 4,
    tags: ['culture', 'festival', 'community'],
  },
];

export const trendingTopics = [
  'climate change',
  'artificial intelligence',
  'renewable energy',
  'space exploration',
  'healthcare innovation',
  'global economy',
  'digital transformation',
  'sustainable development',
];

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  
  return formatDate(dateString);
};
