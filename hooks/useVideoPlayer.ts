'use client';

import { useState, useEffect, useCallback } from 'react';
import { watchProgressStorage } from '@/utils/storage';
import { Video, PlayerState } from '@/types';

/**
 * Custom hook for managing video player state and watch progress
 */
export const useVideoPlayer = (videoId: string) => {
  const [progress, setProgress] = useState(0);
  const [hasWatched, setHasWatched] = useState(false);

  useEffect(() => {
    // Load saved progress
    const savedProgress = watchProgressStorage.get(videoId);
    if (savedProgress) {
      const percentage = (savedProgress.currentTime / savedProgress.duration) * 100;
      setProgress(percentage);
      setHasWatched(percentage > 10); // Consider watched if more than 10%
    }
  }, [videoId]);

  const saveProgress = useCallback(
    (currentTime: number, duration: number) => {
      watchProgressStorage.set(videoId, currentTime, duration);
      const percentage = (currentTime / duration) * 100;
      setProgress(percentage);
      setHasWatched(percentage > 10);
    },
    [videoId]
  );

  const clearProgress = useCallback(() => {
    watchProgressStorage.remove(videoId);
    setProgress(0);
    setHasWatched(false);
  }, [videoId]);

  const getSavedProgress = useCallback(() => {
    return watchProgressStorage.get(videoId);
  }, [videoId]);

  return {
    progress,
    hasWatched,
    saveProgress,
    clearProgress,
    getSavedProgress,
  };
};

/**
 * Hook to manage continue watching list
 */
export const useContinueWatching = () => {
  const [videos, setVideos] = useState<Array<{ videoId: string; progress: number }>>([]);

  useEffect(() => {
    const allProgress = watchProgressStorage.getAll();
    const continueWatching = Object.entries(allProgress)
      .filter(([_, data]) => {
        const percentage = (data.currentTime / data.duration) * 100;
        return percentage > 10 && percentage < 90; // Show videos between 10% and 90%
      })
      .map(([videoId, data]) => ({
        videoId,
        progress: (data.currentTime / data.duration) * 100,
      }))
      .sort((a, b) => b.progress - a.progress)
      .slice(0, 10); // Limit to 10 videos

    setVideos(continueWatching);
  }, []);

  const refresh = useCallback(() => {
    const allProgress = watchProgressStorage.getAll();
    const continueWatching = Object.entries(allProgress)
      .filter(([_, data]) => {
        const percentage = (data.currentTime / data.duration) * 100;
        return percentage > 10 && percentage < 90;
      })
      .map(([videoId, data]) => ({
        videoId,
        progress: (data.currentTime / data.duration) * 100,
      }))
      .sort((a, b) => b.progress - a.progress)
      .slice(0, 10);

    setVideos(continueWatching);
  }, []);

  return {
    videos,
    refresh,
  };
};

/**
 * Hook for keyboard shortcuts
 */
export const useKeyboardShortcuts = (
  callbacks: {
    onPlayPause?: () => void;
    onSeekForward?: () => void;
    onSeekBackward?: () => void;
    onVolumeUp?: () => void;
    onVolumeDown?: () => void;
    onMute?: () => void;
    onFullscreen?: () => void;
    onPiP?: () => void;
  }
) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;

      // Don't trigger if typing in input
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }

      switch (e.key) {
        case ' ':
        case 'k':
          e.preventDefault();
          callbacks.onPlayPause?.();
          break;
        case 'ArrowRight':
          e.preventDefault();
          callbacks.onSeekForward?.();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          callbacks.onSeekBackward?.();
          break;
        case 'ArrowUp':
          e.preventDefault();
          callbacks.onVolumeUp?.();
          break;
        case 'ArrowDown':
          e.preventDefault();
          callbacks.onVolumeDown?.();
          break;
        case 'm':
          e.preventDefault();
          callbacks.onMute?.();
          break;
        case 'f':
          e.preventDefault();
          callbacks.onFullscreen?.();
          break;
        case 'p':
          e.preventDefault();
          callbacks.onPiP?.();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [callbacks]);
};

/**
 * Hook for tracking video views
 */
export const useVideoViews = (videoId: string) => {
  const [hasTracked, setHasTracked] = useState(false);

  const trackView = useCallback(async () => {
    if (hasTracked) return;

    try {
      await fetch('/api/videos/track-view', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId }),
      });
      setHasTracked(true);
    } catch (error) {
      console.error('Failed to track view:', error);
    }
  }, [videoId, hasTracked]);

  return { trackView };
};
