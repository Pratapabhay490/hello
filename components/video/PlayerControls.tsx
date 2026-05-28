'use client';

import React, { useState, useRef, useEffect } from 'react';
import { PlayerState, PlaybackSpeed, VideoQuality } from '@/types';
import { PLAYBACK_SPEEDS, QUALITY_OPTIONS } from '@/lib/constants';
import { formatDuration } from '@/utils/helpers';
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaCompress,
  FaCog,
  FaClosedCaptioning,
} from 'react-icons/fa';
import { MdPictureInPicture } from 'react-icons/md';

interface PlayerControlsProps {
  playerState: PlayerState;
  onPlayPause: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onPlaybackSpeedChange: (speed: PlaybackSpeed) => void;
  onQualityChange: (quality: VideoQuality) => void;
  onToggleMute: () => void;
  onToggleFullscreen: () => void;
  onTogglePiP: () => void;
  videoTitle: string;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  playerState,
  onPlayPause,
  onSeek,
  onVolumeChange,
  onPlaybackSpeedChange,
  onQualityChange,
  onToggleMute,
  onToggleFullscreen,
  onTogglePiP,
  videoTitle,
}) => {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settingsTab, setSettingsTab] = useState<'speed' | 'quality'>('speed');
  const [isDraggingProgress, setIsDraggingProgress] = useState(false);
  const [isDraggingVolume, setIsDraggingVolume] = useState(false);
  const [tempProgress, setTempProgress] = useState(0);

  const progressBarRef = useRef<HTMLDivElement>(null);
  const volumeSliderRef = useRef<HTMLDivElement>(null);

  const progressPercentage = playerState.duration
    ? ((isDraggingProgress ? tempProgress : playerState.currentTime) / playerState.duration) * 100
    : 0;

  // Handle progress bar dragging
  const handleProgressMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDraggingProgress(true);
    handleProgressUpdate(e);
  };

  const handleProgressUpdate = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const newTime = (percentage / 100) * playerState.duration;
    setTempProgress(newTime);
  };

  useEffect(() => {
    if (!isDraggingProgress) return;

    const handleMouseMove = (e: MouseEvent) => {
      handleProgressUpdate(e);
    };

    const handleMouseUp = () => {
      setIsDraggingProgress(false);
      onSeek(tempProgress);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingProgress, tempProgress]);

  // Handle volume slider dragging
  const handleVolumeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDraggingVolume(true);
    handleVolumeUpdate(e);
  };

  const handleVolumeUpdate = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    if (!volumeSliderRef.current) return;
    const rect = volumeSliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    onVolumeChange(percentage / 100);
  };

  useEffect(() => {
    if (!isDraggingVolume) return;

    const handleMouseMove = (e: MouseEvent) => {
      handleVolumeUpdate(e);
    };

    const handleMouseUp = () => {
      setIsDraggingVolume(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingVolume]);

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent pt-20 pb-4 px-4">
      {/* Video Title */}
      <div className="mb-4">
        <h2 className="text-white text-lg font-semibold truncate">{videoTitle}</h2>
      </div>

      {/* Progress Bar */}
      <div
        ref={progressBarRef}
        className="w-full h-1.5 bg-gray-600 rounded-full mb-4 cursor-pointer group/progress relative"
        onMouseDown={handleProgressMouseDown}
      >
        <div
          className="h-full bg-primary rounded-full transition-all relative"
          style={{ width: `${progressPercentage}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity" />
        </div>

        {/* Hover Time Tooltip */}
        <div className="absolute -top-8 left-0 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover/progress:opacity-100 pointer-events-none transition-opacity">
          {formatDuration(isDraggingProgress ? tempProgress : playerState.currentTime)}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        {/* Left Controls */}
        <div className="flex items-center space-x-4">
          {/* Play/Pause */}
          <button
            onClick={onPlayPause}
            className="text-white hover:text-primary transition-colors"
            aria-label={playerState.isPlaying ? 'Pause' : 'Play'}
          >
            {playerState.isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
          </button>

          {/* Volume */}
          <div
            className="relative flex items-center space-x-2 group/volume"
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => !isDraggingVolume && setShowVolumeSlider(false)}
          >
            <button
              onClick={onToggleMute}
              className="text-white hover:text-primary transition-colors"
              aria-label={playerState.muted ? 'Unmute' : 'Mute'}
            >
              {playerState.muted || playerState.volume === 0 ? (
                <FaVolumeMute size={20} />
              ) : (
                <FaVolumeUp size={20} />
              )}
            </button>

            {/* Volume Slider */}
            <div
              className={`w-0 group-hover/volume:w-20 overflow-hidden transition-all duration-300 ${
                showVolumeSlider ? 'w-20' : ''
              }`}
            >
              <div
                ref={volumeSliderRef}
                className="h-1.5 bg-gray-600 rounded-full cursor-pointer"
                onMouseDown={handleVolumeMouseDown}
              >
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${playerState.volume * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Time */}
          <div className="text-white text-sm">
            <span>{formatDuration(playerState.currentTime)}</span>
            <span className="text-gray-400"> / </span>
            <span>{formatDuration(playerState.duration)}</span>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-4">
          {/* Settings */}
          <div className="relative">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="text-white hover:text-primary transition-colors"
              aria-label="Settings"
            >
              <FaCog size={20} />
            </button>

            {/* Settings Menu */}
            {showSettings && (
              <div className="absolute bottom-full right-0 mb-2 w-64 bg-surface-light border border-gray-700 rounded-lg shadow-xl overflow-hidden z-50">
                {/* Tabs */}
                <div className="flex border-b border-gray-700">
                  <button
                    onClick={() => setSettingsTab('speed')}
                    className={`flex-1 py-2 text-sm font-medium transition-colors ${
                      settingsTab === 'speed'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Speed
                  </button>
                  <button
                    onClick={() => setSettingsTab('quality')}
                    className={`flex-1 py-2 text-sm font-medium transition-colors ${
                      settingsTab === 'quality'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Quality
                  </button>
                </div>

                {/* Settings Content */}
                <div className="max-h-64 overflow-y-auto">
                  {settingsTab === 'speed' && (
                    <div className="py-2">
                      {PLAYBACK_SPEEDS.map(speed => (
                        <button
                          key={speed.value}
                          onClick={() => {
                            onPlaybackSpeedChange(speed.value);
                            setShowSettings(false);
                          }}
                          className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                            playerState.playbackSpeed === speed.value
                              ? 'bg-primary text-white'
                              : 'text-gray-300 hover:bg-surface-lighter'
                          }`}
                        >
                          {speed.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {settingsTab === 'quality' && (
                    <div className="py-2">
                      {QUALITY_OPTIONS.map(quality => (
                        <button
                          key={quality.value}
                          onClick={() => {
                            onQualityChange(quality.value);
                            setShowSettings(false);
                          }}
                          className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                            playerState.quality === quality.value
                              ? 'bg-primary text-white'
                              : 'text-gray-300 hover:bg-surface-lighter'
                          }`}
                        >
                          {quality.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Picture-in-Picture */}
          <button
            onClick={onTogglePiP}
            className="text-white hover:text-primary transition-colors"
            aria-label="Picture-in-Picture"
          >
            <MdPictureInPicture size={22} />
          </button>

          {/* Fullscreen */}
          <button
            onClick={onToggleFullscreen}
            className="text-white hover:text-primary transition-colors"
            aria-label="Fullscreen"
          >
            {playerState.isFullscreen ? <FaCompress size={20} /> : <FaExpand size={20} />}
          </button>
        </div>
      </div>

      {/* Click outside to close settings */}
      {showSettings && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowSettings(false)}
        />
      )}
    </div>
  );
};

export default PlayerControls;
