import { StorageKeys } from '@/types';

/**
 * Utility functions for localStorage operations
 */

export const storage = {
  /**
   * Get item from localStorage
   */
  get<T>(key: StorageKeys): T | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading from localStorage: ${error}`);
      return null;
    }
  },

  /**
   * Set item in localStorage
   */
  set<T>(key: StorageKeys, value: T): void {
    if (typeof window === 'undefined') return;
    
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage: ${error}`);
    }
  },

  /**
   * Remove item from localStorage
   */
  remove(key: StorageKeys): void {
    if (typeof window === 'undefined') return;
    
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage: ${error}`);
    }
  },

  /**
   * Clear all items from localStorage
   */
  clear(): void {
    if (typeof window === 'undefined') return;
    
    try {
      window.localStorage.clear();
    } catch (error) {
      console.error(`Error clearing localStorage: ${error}`);
    }
  },

  /**
   * Check if key exists in localStorage
   */
  has(key: StorageKeys): boolean {
    if (typeof window === 'undefined') return false;
    
    try {
      return window.localStorage.getItem(key) !== null;
    } catch (error) {
      console.error(`Error checking localStorage: ${error}`);
      return false;
    }
  },
};

/**
 * Watch progress utilities
 */
export const watchProgressStorage = {
  /**
   * Get watch progress for a specific video
   */
  get(videoId: string): { currentTime: number; duration: number } | null {
    const allProgress = storage.get<Record<string, { currentTime: number; duration: number }>>(
      StorageKeys.WATCH_PROGRESS
    );
    
    return allProgress?.[videoId] || null;
  },

  /**
   * Save watch progress for a video
   */
  set(videoId: string, currentTime: number, duration: number): void {
    const allProgress = storage.get<Record<string, { currentTime: number; duration: number }>>(
      StorageKeys.WATCH_PROGRESS
    ) || {};
    
    allProgress[videoId] = { currentTime, duration };
    storage.set(StorageKeys.WATCH_PROGRESS, allProgress);
  },

  /**
   * Remove watch progress for a video
   */
  remove(videoId: string): void {
    const allProgress = storage.get<Record<string, { currentTime: number; duration: number }>>(
      StorageKeys.WATCH_PROGRESS
    );
    
    if (allProgress && allProgress[videoId]) {
      delete allProgress[videoId];
      storage.set(StorageKeys.WATCH_PROGRESS, allProgress);
    }
  },

  /**
   * Get all watch progress
   */
  getAll(): Record<string, { currentTime: number; duration: number }> {
    return storage.get<Record<string, { currentTime: number; duration: number }>>(
      StorageKeys.WATCH_PROGRESS
    ) || {};
  },

  /**
   * Calculate progress percentage
   */
  getPercentage(videoId: string): number {
    const progress = this.get(videoId);
    if (!progress || progress.duration === 0) return 0;
    
    return Math.min((progress.currentTime / progress.duration) * 100, 100);
  },
};
