import { PlaybackSpeedOption, QualityOption } from '@/types';

// App Configuration
export const APP_NAME = 'TeraBooks Player';
export const APP_DESCRIPTION = 'Premium Video Streaming Platform';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

// API Configuration
export const API_BASE_URL = '/api';
export const API_TIMEOUT = 30000; // 30 seconds

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// Video Player Configuration
export const PLAYBACK_SPEEDS: PlaybackSpeedOption[] = [
  { label: '0.5x', value: 0.5 },
  { label: '0.75x', value: 0.75 },
  { label: 'Normal', value: 1 },
  { label: '1.25x', value: 1.25 },
  { label: '1.5x', value: 1.5 },
  { label: '1.75x', value: 1.75 },
  { label: '2x', value: 2 },
];

export const QUALITY_OPTIONS: QualityOption[] = [
  { label: 'Auto', value: 'auto' },
  { label: '360p', value: '360p' },
  { label: '720p', value: '720p' },
  { label: '1080p', value: '1080p' },
];

// Player Settings
export const DEFAULT_VOLUME = 0.7;
export const DEFAULT_PLAYBACK_SPEED = 1;
export const DEFAULT_QUALITY = 'auto';
export const PROGRESS_SAVE_INTERVAL = 5000; // 5 seconds
export const SEEK_INTERVAL = 10; // 10 seconds for arrow keys

// Keyboard Shortcuts
export const KEYBOARD_SHORTCUTS = {
  PLAY_PAUSE: ' ',
  SEEK_FORWARD: 'ArrowRight',
  SEEK_BACKWARD: 'ArrowLeft',
  VOLUME_UP: 'ArrowUp',
  VOLUME_DOWN: 'ArrowDown',
  MUTE: 'm',
  FULLSCREEN: 'f',
  PICTURE_IN_PICTURE: 'p',
};

// Video Duration Format
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

// Authentication
export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
export const JWT_EXPIRES_IN = '7d';
export const BCRYPT_ROUNDS = 10;

// Rate Limiting (requests per window)
export const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
export const RATE_LIMIT_MAX_REQUESTS = 100;

// Cache Configuration
export const CACHE_DURATION = {
  VIDEO_LIST: 300, // 5 minutes
  VIDEO_DETAIL: 600, // 10 minutes
  CATEGORIES: 3600, // 1 hour
  USER_PROGRESS: 60, // 1 minute
};

// Error Messages
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'You must be logged in to access this resource',
  FORBIDDEN: 'You do not have permission to access this resource',
  NOT_FOUND: 'Resource not found',
  BAD_REQUEST: 'Invalid request',
  SERVER_ERROR: 'Internal server error',
  NETWORK_ERROR: 'Network error. Please check your connection',
  INVALID_VIDEO_URL: 'Invalid video URL',
  UPLOAD_FAILED: 'Failed to upload file',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  VIDEO_ADDED: 'Video added successfully',
  VIDEO_UPDATED: 'Video updated successfully',
  VIDEO_DELETED: 'Video deleted successfully',
  CATEGORY_ADDED: 'Category added successfully',
  LOGIN_SUCCESS: 'Login successful',
  LOGOUT_SUCCESS: 'Logout successful',
  REGISTRATION_SUCCESS: 'Registration successful',
};

// Validation Rules
export const VALIDATION = {
  VIDEO_TITLE_MIN: 3,
  VIDEO_TITLE_MAX: 200,
  VIDEO_DESCRIPTION_MIN: 10,
  VIDEO_DESCRIPTION_MAX: 2000,
  PASSWORD_MIN: 8,
  PASSWORD_MAX: 100,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  URL_REGEX: /^https?:\/\/.+/,
};

// Theme Colors
export const THEME_COLORS = {
  primary: '#3B82F6', // Blue
  secondary: '#1E3A8A', // Dark Blue
  accent: '#60A5FA', // Light Blue
  background: '#000000', // Black
  surface: '#111827', // Dark Gray
  text: '#FFFFFF', // White
  textSecondary: '#9CA3AF', // Gray
  error: '#EF4444', // Red
  success: '#10B981', // Green
  warning: '#F59E0B', // Yellow
};

// Animation Durations
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
};

// Breakpoints (matches Tailwind)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
};

// Default Thumbnails (fallback)
export const DEFAULT_THUMBNAIL = '/images/default-thumbnail.jpg';
export const DEFAULT_AVATAR = '/images/default-avatar.jpg';
