/**
 * Utility functions for image handling
 */

const DEFAULT_PLACEHOLDER = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';

/**
 * Get a default placeholder image if none is provided
 */
export const getImageUrl = (imageUrl?: string | null): string => {
  if (!imageUrl || imageUrl.trim() === '' || imageUrl.includes('placeholder')) {
    return DEFAULT_PLACEHOLDER;
  }
  return imageUrl;
};

/**
 * Check if an image URL is valid
 */
export const isValidImageUrl = (url?: string | null): boolean => {
  if (!url || url.trim() === '') return false;
  if (url.includes('placeholder') || url.includes('via.placeholder')) return false;
  return true;
};

/**
 * Get optimized image dimensions for different use cases
 */
export const getImageDimensions = (type: 'hero' | 'card' | 'thumbnail' | 'related') => {
  const dimensions = {
    hero: { width: 1200, height: 675 },
    card: { width: 600, height: 400 },
    thumbnail: { width: 200, height: 150 },
    related: { width: 300, height: 200 },
  };
  return dimensions[type];
};

