export const categories = [
  {
    id: 1,
    name: 'Politics',
    slug: 'politics',
    description: 'Political news and analysis from around the world',
    icon: '🏛️',
    color: 'bg-blue-500'
  },
  {
    id: 2,
    name: 'Technology',
    slug: 'technology',
    description: 'Latest tech news, innovations, and digital trends',
    icon: '💻',
    color: 'bg-purple-500'
  },
  {
    id: 3,
    name: 'Business',
    slug: 'business',
    description: 'Business news, market updates, and economic analysis',
    icon: '📈',
    color: 'bg-green-500'
  },
  {
    id: 4,
    name: 'Science',
    slug: 'science',
    description: 'Scientific discoveries and research breakthroughs',
    icon: '🔬',
    color: 'bg-orange-500'
  },
  {
    id: 5,
    name: 'Health',
    slug: 'health',
    description: 'Health news, medical research, and wellness tips',
    icon: '🏥',
    color: 'bg-red-500'
  },
  {
    id: 6,
    name: 'Sports',
    slug: 'sports',
    description: 'Sports news, scores, and athletic achievements',
    icon: '⚽',
    color: 'bg-yellow-500'
  },
  {
    id: 7,
    name: 'Entertainment',
    slug: 'entertainment',
    description: 'Entertainment news, celebrity updates, and culture',
    icon: '🎬',
    color: 'bg-pink-500'
  },
  {
    id: 8,
    name: 'World',
    slug: 'world',
    description: 'Global news and international affairs',
    icon: '🌍',
    color: 'bg-indigo-500'
  }
];

export const featuredArticles = [
  {
    id: 1,
    title: 'Global Climate Summit Reaches Historic Agreement',
    summary: 'World leaders have reached a groundbreaking agreement on climate action, setting ambitious new targets for carbon reduction.',
    author: 'Sarah Johnson',
    category: 'Politics',
    imageUrl: 'https://images.unsplash.com/photo-1569163139394-de44cb8e4e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    publishedAt: '2024-01-15',
    readTime: '5 min read',
    featured: true
  },
  {
    id: 2,
    title: 'Revolutionary AI Technology Transforms Healthcare',
    summary: 'New artificial intelligence system shows remarkable accuracy in diagnosing diseases, potentially revolutionizing medical care.',
    author: 'Dr. Michael Chen',
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    publishedAt: '2024-01-14',
    readTime: '7 min read',
    featured: true
  },
  {
    id: 3,
    title: 'Stock Market Reaches All-Time High',
    summary: 'Global markets surge to record levels as investors show renewed confidence in economic recovery.',
    author: 'Emma Rodriguez',
    category: 'Business',
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    publishedAt: '2024-01-13',
    readTime: '4 min read',
    featured: true
  }
];

export const trendingTopics = [
  { name: 'Climate Change', count: 1250 },
  { name: 'AI Revolution', count: 980 },
  { name: 'Economic Recovery', count: 875 },
  { name: 'Space Exploration', count: 720 },
  { name: 'Renewable Energy', count: 650 },
  { name: 'Digital Currency', count: 580 },
  { name: 'Healthcare Innovation', count: 520 },
  { name: 'Sustainable Living', count: 480 }
];

export const popularArticles = [
  {
    id: 11,
    title: 'The Future of Remote Work',
    summary: 'How remote work is reshaping the global economy and workplace culture.',
    author: 'Alex Thompson',
    category: 'Business',
    imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    publishedAt: '2024-01-12',
    readTime: '6 min read',
    views: 12500
  },
  {
    id: 12,
    title: 'Breakthrough in Quantum Computing',
    summary: 'Scientists achieve quantum supremacy milestone that could revolutionize computing.',
    author: 'Dr. Lisa Wang',
    category: 'Science',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    publishedAt: '2024-01-11',
    readTime: '8 min read',
    views: 9800
  },
  {
    id: 13,
    title: 'Olympic Games Return to Traditional Format',
    summary: 'The world\'s biggest sporting event returns with full crowds and international participation.',
    author: 'James Wilson',
    category: 'Sports',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    publishedAt: '2024-01-10',
    readTime: '5 min read',
    views: 8700
  }
];

// Helper function to get category slug from category name
export const getCategorySlug = (categoryName: string): string => {
  const category = categories.find(cat => cat.name === categoryName);
  return category?.slug || categoryName.toLowerCase().replace(/\s+/g, '-');
};

// Helper function to get article URL path
export const getArticleUrl = (article: { category: string; slug: string }): string => {
  const categorySlug = getCategorySlug(article.category);
  return `/${categorySlug}/${article.slug}`;
};
