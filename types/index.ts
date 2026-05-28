// Core Video Types
export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number; // in seconds
  categoryId: string;
  views: number;
  releaseDate: string;
  featured: boolean;
  trending: boolean;
  createdAt: string;
  updatedAt: string;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  order: number;
}

// Watch Progress Types
export interface WatchProgress {
  id: string;
  videoId: string;
  userId: string;
  currentTime: number;
  duration: number;
  completed: boolean;
  lastWatched: string;
}

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
}

// Watchlist Types
export interface WatchlistItem {
  id: string;
  videoId: string;
  userId: string;
  addedAt: string;
}

// Video Quality Types
export type VideoQuality = 'auto' | '360p' | '720p' | '1080p' | '1440p' | '4k';

export interface QualityOption {
  label: string;
  value: VideoQuality;
  url?: string;
}

// Playback Speed Types
export type PlaybackSpeed = 0.5 | 0.75 | 1 | 1.25 | 1.5 | 1.75 | 2;

export interface PlaybackSpeedOption {
  label: string;
  value: PlaybackSpeed;
}

// Player State Types
export interface PlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  muted: boolean;
  quality: VideoQuality;
  playbackSpeed: PlaybackSpeed;
  isFullscreen: boolean;
  isPiP: boolean;
  buffering: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Search Types
export interface SearchFilters {
  query?: string;
  categoryId?: string;
  sortBy?: 'recent' | 'popular' | 'trending';
  page?: number;
  limit?: number;
}

// Admin Types
export interface VideoMetadata {
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  categoryId: string;
  duration: number;
  featured?: boolean;
  trending?: boolean;
}

export interface AdminStats {
  totalVideos: number;
  totalViews: number;
  totalUsers: number;
  totalCategories: number;
  recentVideos: Video[];
  popularVideos: Video[];
}

// Authentication Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthToken {
  token: string;
  expiresIn: number;
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: 'admin' | 'user';
  iat?: number;
  exp?: number;
}

// Local Storage Keys
export enum StorageKeys {
  AUTH_TOKEN = 'terabooks_auth_token',
  USER_DATA = 'terabooks_user_data',
  WATCH_PROGRESS = 'terabooks_watch_progress',
  THEME = 'terabooks_theme',
  VOLUME = 'terabooks_volume',
  PLAYBACK_SPEED = 'terabooks_playback_speed',
}

// Component Props Types
export interface VideoCardProps {
  video: Video;
  priority?: boolean;
  onPlay?: (videoId: string) => void;
  showProgress?: boolean;
}

export interface VideoPlayerProps {
  video: Video;
  autoplay?: boolean;
  startTime?: number;
  onProgress?: (progress: number) => void;
  onEnded?: () => void;
}

export interface CategorySectionProps {
  category: Category;
  videos: Video[];
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: unknown;
}

// Settings Types
export interface UserSettings {
  autoplay: boolean;
  defaultQuality: VideoQuality;
  defaultPlaybackSpeed: PlaybackSpeed;
  defaultVolume: number;
  skipIntro: boolean;
  notifications: boolean;
}
