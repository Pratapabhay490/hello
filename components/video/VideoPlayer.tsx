'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { Video, PlaybackSpeed, VideoQuality, PlayerState } from '@/types';
import { PLAYBACK_SPEEDS, QUALITY_OPTIONS, SEEK_INTERVAL, PROGRESS_SAVE_INTERVAL } from '@/lib/constants';
import { watchProgressStorage } from '@/utils/storage';
import PlayerControls from './PlayerControls';

interface VideoPlayerProps {
  video: Video;
  autoplay?: boolean;
  startTime?: number;
  onProgress?: (progress: number) => void;
  onEnded?: () => void;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  video,
  autoplay = false,
  startTime = 0,
  onProgress,
  onEnded,
  className = '',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    currentTime: startTime,
    duration: 0,
    volume: 0.7,
    muted: false,
    quality: 'auto',
    playbackSpeed: 1,
    isFullscreen: false,
    isPiP: false,
    buffering: false,
  });

  const [showControls, setShowControls] = useState(true);
  const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout | null>(null);

  // Initialize Video.js player
  useEffect(() => {
    if (!videoRef.current) return;

    const savedProgress = watchProgressStorage.get(video.id);
    const initialStartTime = startTime || savedProgress?.currentTime || 0;

    // Initialize player
    const player = videojs(videoRef.current, {
      controls: false, // We'll use custom controls
      autoplay: autoplay,
      preload: 'auto',
      fluid: true,
      responsive: true,
      aspectRatio: '16:9',
      playbackRates: PLAYBACK_SPEEDS.map(s => s.value),
      sources: [
        {
          src: video.videoUrl,
          type: 'video/mp4',
        },
      ],
      html5: {
        vhs: {
          overrideNative: true,
        },
        nativeAudioTracks: false,
        nativeVideoTracks: false,
      },
    });

    playerRef.current = player;

    // Set initial time if provided
    if (initialStartTime > 0) {
      player.currentTime(initialStartTime);
    }

    // Event listeners
    player.on('play', () => {
      setPlayerState(prev => ({ ...prev, isPlaying: true }));
    });

    player.on('pause', () => {
      setPlayerState(prev => ({ ...prev, isPlaying: false }));
    });

    player.on('timeupdate', () => {
      setPlayerState(prev => ({
        ...prev,
        currentTime: player.currentTime() || 0,
      }));
    });

    player.on('durationchange', () => {
      setPlayerState(prev => ({ ...prev, duration: player.duration() || 0 }));
    });

    player.on('volumechange', () => {
      setPlayerState(prev => ({
        ...prev,
        volume: player.volume() || 0,
        muted: player.muted() || false,
      }));
    });

    player.on('ended', () => {
      setPlayerState(prev => ({ ...prev, isPlaying: false }));
      if (onEnded) onEnded();
      // Mark as completed
      const duration = player.duration() || 0;
      watchProgressStorage.set(video.id, duration, duration);
    });

    player.on('waiting', () => {
      setPlayerState(prev => ({ ...prev, buffering: true }));
    });

    player.on('canplay', () => {
      setPlayerState(prev => ({ ...prev, buffering: false }));
    });

    player.on('error', (error: any) => {
      console.error('Video.js error:', error);
    });

    // Save progress periodically
    progressIntervalRef.current = setInterval(() => {
      if (player && !player.paused()) {
        const currentTime = player.currentTime() || 0;
        const duration = player.duration() || 0;
        watchProgressStorage.set(video.id, currentTime, duration);
        if (onProgress) {
          onProgress((currentTime / duration) * 100);
        }
      }
    }, PROGRESS_SAVE_INTERVAL);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if (player) {
        // Save final progress
        const currentTime = player.currentTime() || 0;
        const duration = player.duration() || 0;
        watchProgressStorage.set(video.id, currentTime, duration);
        player.dispose();
      }
    };
  }, [video.id, video.videoUrl]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (!playerRef.current) return;

      const player = playerRef.current;
      const target = e.target as HTMLElement;

      // Don't trigger if typing in input
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }

      switch (e.key) {
        case ' ':
        case 'k':
          e.preventDefault();
          togglePlayPause();
          break;
        case 'ArrowRight':
          e.preventDefault();
          seekForward();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          seekBackward();
          break;
        case 'ArrowUp':
          e.preventDefault();
          volumeUp();
          break;
        case 'ArrowDown':
          e.preventDefault();
          volumeDown();
          break;
        case 'm':
          e.preventDefault();
          toggleMute();
          break;
        case 'f':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'p':
          e.preventDefault();
          togglePiP();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyboard);
    return () => document.removeEventListener('keydown', handleKeyboard);
  }, [playerState]);

  // Auto-hide controls
  const resetControlsTimeout = useCallback(() => {
    setShowControls(true);
    if (controlsTimeout) {
      clearTimeout(controlsTimeout);
    }
    const timeout = setTimeout(() => {
      if (playerState.isPlaying) {
        setShowControls(false);
      }
    }, 3000);
    setControlsTimeout(timeout);
  }, [playerState.isPlaying, controlsTimeout]);

  const handleMouseMove = () => {
    resetControlsTimeout();
  };

  // Player control functions
  const togglePlayPause = () => {
    if (!playerRef.current) return;
    if (playerRef.current.paused()) {
      playerRef.current.play();
    } else {
      playerRef.current.pause();
    }
  };

  const seekForward = () => {
    if (!playerRef.current) return;
    playerRef.current.currentTime(
      Math.min(playerRef.current.currentTime() + SEEK_INTERVAL, playerRef.current.duration())
    );
  };

  const seekBackward = () => {
    if (!playerRef.current) return;
    playerRef.current.currentTime(Math.max(playerRef.current.currentTime() - SEEK_INTERVAL, 0));
  };

  const volumeUp = () => {
    if (!playerRef.current) return;
    playerRef.current.volume(Math.min(playerRef.current.volume() + 0.1, 1));
  };

  const volumeDown = () => {
    if (!playerRef.current) return;
    playerRef.current.volume(Math.max(playerRef.current.volume() - 0.1, 0));
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    playerRef.current.muted(!playerRef.current.muted());
  };

  const toggleFullscreen = async () => {
    if (!playerRef.current) return;
    if (playerRef.current.isFullscreen()) {
      playerRef.current.exitFullscreen();
      setPlayerState(prev => ({ ...prev, isFullscreen: false }));
    } else {
      playerRef.current.requestFullscreen();
      setPlayerState(prev => ({ ...prev, isFullscreen: true }));
    }
  };

  const togglePiP = async () => {
    if (!videoRef.current) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        setPlayerState(prev => ({ ...prev, isPiP: false }));
      } else {
        await videoRef.current.requestPictureInPicture();
        setPlayerState(prev => ({ ...prev, isPiP: true }));
      }
    } catch (error) {
      console.error('PiP error:', error);
    }
  };

  const handleSeek = (time: number) => {
    if (!playerRef.current) return;
    playerRef.current.currentTime(time);
  };

  const handleVolumeChange = (volume: number) => {
    if (!playerRef.current) return;
    playerRef.current.volume(volume);
  };

  const handlePlaybackSpeedChange = (speed: PlaybackSpeed) => {
    if (!playerRef.current) return;
    playerRef.current.playbackRate(speed);
    setPlayerState(prev => ({ ...prev, playbackSpeed: speed }));
  };

  const handleQualityChange = (quality: VideoQuality) => {
    // In a real implementation, you would switch video sources here
    setPlayerState(prev => ({ ...prev, quality }));
    console.log('Quality changed to:', quality);
  };

  return (
    <div
      className={`relative w-full bg-black rounded-lg overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => playerState.isPlaying && setShowControls(false)}
    >
      {/* Video Element */}
      <div data-vjs-player>
        <video
          ref={videoRef}
          className="video-js vjs-big-play-centered w-full h-full"
          playsInline
        />
      </div>

      {/* Custom Controls Overlay */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          showControls || !playerState.isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <PlayerControls
          playerState={playerState}
          onPlayPause={togglePlayPause}
          onSeek={handleSeek}
          onVolumeChange={handleVolumeChange}
          onPlaybackSpeedChange={handlePlaybackSpeedChange}
          onQualityChange={handleQualityChange}
          onToggleMute={toggleMute}
          onToggleFullscreen={toggleFullscreen}
          onTogglePiP={togglePiP}
          videoTitle={video.title}
        />
      </div>

      {/* Buffering Indicator */}
      {playerState.buffering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="spinner w-16 h-16 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      )}

      {/* Center Play/Pause on Click */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-40"
        style={{ display: showControls ? 'flex' : 'none' }}
      >
        <button
          onClick={togglePlayPause}
          className="pointer-events-auto w-20 h-20 bg-primary bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          aria-label={playerState.isPlaying ? 'Pause' : 'Play'}
        >
          {playerState.isPlaying ? (
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
