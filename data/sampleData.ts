import { Video, Category } from '@/types';

/**
 * Sample categories for development and testing
 */
export const sampleCategories: Category[] = [
  {
    id: '1',
    name: 'Action',
    slug: 'action',
    description: 'High-octane action and adventure content',
    order: 1,
  },
  {
    id: '2',
    name: 'Documentary',
    slug: 'documentary',
    description: 'Educational and informative documentaries',
    order: 2,
  },
  {
    id: '3',
    name: 'Science & Tech',
    slug: 'science-tech',
    description: 'Technology, science, and innovation',
    order: 3,
  },
  {
    id: '4',
    name: 'Entertainment',
    slug: 'entertainment',
    description: 'Entertainment and lifestyle content',
    order: 4,
  },
  {
    id: '5',
    name: 'Education',
    slug: 'education',
    description: 'Learning and educational videos',
    order: 5,
  },
];

/**
 * Sample videos for development and testing
 * Note: These use publicly available test video URLs
 */
export const sampleVideos: Video[] = [
  {
    id: '1',
    title: 'Big Buck Bunny',
    description: 'Big Buck Bunny is a short computer-animated comedy film featuring a giant rabbit who defends smaller woodland creatures from harassment by a trio of rodents.',
    thumbnailUrl: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    duration: 596,
    categoryId: '4',
    views: 15420,
    releaseDate: '2024-01-15',
    featured: true,
    trending: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Elephant Dream',
    description: 'Elephants Dream is a CGI short film about two strange characters exploring a surreal world. It was the first project of the Blender Foundation.',
    thumbnailUrl: 'https://orange.blender.org/wp-content/themes/orange/images/media/dvd_case.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    duration: 654,
    categoryId: '4',
    views: 8932,
    releaseDate: '2024-01-20',
    featured: false,
    trending: true,
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z',
  },
  {
    id: '3',
    title: 'For Bigger Blazes',
    description: 'A stunning display of nature\'s power and beauty captured in high definition.',
    thumbnailUrl: 'https://i.ytimg.com/vi/Dr9C2oswZfA/maxresdefault.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: 15,
    categoryId: '2',
    views: 12456,
    releaseDate: '2024-02-01',
    featured: true,
    trending: false,
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-01T10:00:00Z',
  },
  {
    id: '4',
    title: 'For Bigger Escape',
    description: 'Experience breathtaking landscapes and serene environments in this visual journey.',
    thumbnailUrl: 'https://i.ytimg.com/vi/jTSGRDEddN8/maxresdefault.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    duration: 15,
    categoryId: '2',
    views: 9876,
    releaseDate: '2024-02-05',
    featured: false,
    trending: false,
    createdAt: '2024-02-05T10:00:00Z',
    updatedAt: '2024-02-05T10:00:00Z',
  },
  {
    id: '5',
    title: 'For Bigger Fun',
    description: 'A fun-filled adventure showcasing creativity and imagination at its finest.',
    thumbnailUrl: 'https://i.ytimg.com/vi/VfE0VCVY_lk/maxresdefault.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    duration: 60,
    categoryId: '4',
    views: 18234,
    releaseDate: '2024-02-10',
    featured: true,
    trending: true,
    createdAt: '2024-02-10T10:00:00Z',
    updatedAt: '2024-02-10T10:00:00Z',
  },
  {
    id: '6',
    title: 'For Bigger Joyrides',
    description: 'Take a thrilling ride through exciting landscapes and urban environments.',
    thumbnailUrl: 'https://i.ytimg.com/vi/A3PDXmYoF5U/maxresdefault.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    duration: 15,
    categoryId: '1',
    views: 14567,
    releaseDate: '2024-02-12',
    featured: false,
    trending: true,
    createdAt: '2024-02-12T10:00:00Z',
    updatedAt: '2024-02-12T10:00:00Z',
  },
  {
    id: '7',
    title: 'For Bigger Meltdowns',
    description: 'An explosive showcase of visual effects and stunning cinematography.',
    thumbnailUrl: 'https://i.ytimg.com/vi/WxfZkMm3wcg/maxresdefault.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    duration: 15,
    categoryId: '1',
    views: 11234,
    releaseDate: '2024-02-15',
    featured: false,
    trending: false,
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-02-15T10:00:00Z',
  },
  {
    id: '8',
    title: 'Sintel',
    description: 'Sintel is a CGI fantasy short film. The film follows a girl named Sintel who is searching for a baby dragon she calls Scales.',
    thumbnailUrl: 'https://durian.blender.org/wp-content/uploads/2010/06/05.8b_comp_000855.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    duration: 888,
    categoryId: '4',
    views: 22456,
    releaseDate: '2024-02-18',
    featured: true,
    trending: true,
    createdAt: '2024-02-18T10:00:00Z',
    updatedAt: '2024-02-18T10:00:00Z',
  },
  {
    id: '9',
    title: 'Tears of Steel',
    description: 'Tears of Steel is a sci-fi short film about a group of warriors and scientists who gather at a warehouse in Amsterdam.',
    thumbnailUrl: 'https://mango.blender.org/wp-content/uploads/2012/09/01_thom_celia_bridge.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    duration: 734,
    categoryId: '3',
    views: 19876,
    releaseDate: '2024-02-20',
    featured: true,
    trending: false,
    createdAt: '2024-02-20T10:00:00Z',
    updatedAt: '2024-02-20T10:00:00Z',
  },
  {
    id: '10',
    title: 'Subaru Outback - On a Beach',
    description: 'A showcase of adventure and exploration featuring the Subaru Outback.',
    thumbnailUrl: 'https://i.ytimg.com/vi/vzU9yGW6yIo/maxresdefault.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    duration: 30,
    categoryId: '1',
    views: 7654,
    releaseDate: '2024-02-22',
    featured: false,
    trending: false,
    createdAt: '2024-02-22T10:00:00Z',
    updatedAt: '2024-02-22T10:00:00Z',
  },
  {
    id: '11',
    title: 'We Are Going On a Bullrun',
    description: 'An exciting journey featuring high-performance vehicles and stunning roads.',
    thumbnailUrl: 'https://i.ytimg.com/vi/2NNXqwNxD-8/maxresdefault.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    duration: 30,
    categoryId: '1',
    views: 13245,
    releaseDate: '2024-02-25',
    featured: false,
    trending: true,
    createdAt: '2024-02-25T10:00:00Z',
    updatedAt: '2024-02-25T10:00:00Z',
  },
  {
    id: '12',
    title: 'What Car Can You Get For $1000?',
    description: 'A fun exploration of budget vehicles and surprising automotive finds.',
    thumbnailUrl: 'https://i.ytimg.com/vi/ZEt3VlqzQbA/maxresdefault.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
    duration: 30,
    categoryId: '5',
    views: 16789,
    releaseDate: '2024-02-28',
    featured: false,
    trending: false,
    createdAt: '2024-02-28T10:00:00Z',
    updatedAt: '2024-02-28T10:00:00Z',
  },
];

/**
 * Get videos by category
 */
export const getVideosByCategory = (categoryId: string): Video[] => {
  return sampleVideos.filter(video => video.categoryId === categoryId);
};

/**
 * Get featured videos
 */
export const getFeaturedVideos = (): Video[] => {
  return sampleVideos.filter(video => video.featured);
};

/**
 * Get trending videos
 */
export const getTrendingVideos = (): Video[] => {
  return sampleVideos.filter(video => video.trending);
};

/**
 * Get recently added videos
 */
export const getRecentVideos = (limit: number = 6): Video[] => {
  return [...sampleVideos]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
};

/**
 * Get video by ID
 */
export const getVideoById = (id: string): Video | undefined => {
  return sampleVideos.find(video => video.id === id);
};

/**
 * Search videos
 */
export const searchVideos = (query: string): Video[] => {
  const lowerQuery = query.toLowerCase();
  return sampleVideos.filter(
    video =>
      video.title.toLowerCase().includes(lowerQuery) ||
      video.description.toLowerCase().includes(lowerQuery)
  );
};
