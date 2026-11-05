import React, { useState } from 'react';
import type { ParallaxMode, LightingPreset, AudioSettings } from '../types/parallax';
import { LIGHTING_PRESETS } from '../constants/layers';
import {
  Play,
  Pause,
  Compass,
  MousePointer2,
  ScrollText,
  Gamepad2,
  Layers,
  Volume2,
  VolumeX,
  CloudRain,
  Maximize,
  Camera,
  Info,
  ChevronUp,
  ChevronDown,
  Sparkles
} from 'lucide-react';

interface ControlsDockProps {
  mode: ParallaxMode;
  onModeChange: (mode: ParallaxMode) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  direction: 1 | -1;
  onToggleDirection: () => void;
  lighting: LightingPreset;
  onLightingChange: (preset: LightingPreset) => void;
  mistOpacity: number;
  onMistOpacityChange: (val: number) => void;
  mistDrift: boolean;
  onToggleMistDrift: () => void;
  weatherRain: boolean;
  onToggleRain: () => void;
  audioSettings: AudioSettings;
  onToggleMute: () => void;
  onVolumeChange: (val: number) => void;
  onOpenLayers: () => void;
  onOpenSkillGuide: () => void;
  onTakeSnapshot: () => void;
  activeLayersCount: number;
  fps: number;
}

export const ControlsDock: React.FC<ControlsDockProps> = ({
  mode,
  onModeChange,
  isPlaying,
  onTogglePlay,
  speed,
  onSpeedChange,
  direction,
  onToggleDirection,
  lighting,
  onLightingChange,
  mistOpacity,
  onMistOpacityChange,
  mistDrift,
  onToggleMistDrift,
  weatherRain,
  onToggleRain,
  audioSettings,
  onToggleMute,
  onVolumeChange,
  onOpenLayers,
  onOpenSkillGuide,
  onTakeSnapshot,
  activeLayersCount,
  fps
}) => {
  // Can be minimized to top-left corner
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Minimized Compact Pill in Top-Left Corner
  if (!isExpanded) {
    return (
      <aside aria-label="Parallax Controls Minimal" className="fixed top-4 left-4 z-30 pointer-events-auto animate-fade-in">
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-slate-950/85 backdrop-blur-xl border border-sky-500/30 text-white shadow-xl shadow-sky-950/50 hover:border-sky-400 hover:bg-slate-900/90 transition-all cursor-pointer group"
          title="Click to expand Parallax Controls HUD"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
          <span className="text-xs font-semibold tracking-wide text-sky-100">
            Parallax Forest
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-slate-800 text-sky-300 border border-slate-700">
            {fps} FPS
          </span>
          <span className="text-[10px] font-mono text-slate-300 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
            {mode === 'auto' ? 'Auto' : mode === 'mouse' ? '2.5D' : mode === 'story' ? 'Story' : 'Wanderer'}
          </span>
          <ChevronDown className="w-4 h-4 text-sky-400 group-hover:translate-y-0.5 transition-transform" />
        </button>
      </aside>
    );
  }

  // Expanded HUD in Top-Left Corner
  return (
    <aside aria-label="Parallax Controls" className="fixed top-4 left-4 z-30 w-[420px] max-w-[calc(100vw-2rem)] pointer-events-auto animate-fade-in">
      <div className="backdrop-blur-xl bg-slate-950/90 border border-sky-500/25 rounded-3xl shadow-2xl shadow-sky-950/60 overflow-hidden">
        {/* Top Minimal Bar */}
        <div className="px-4 py-2.5 flex items-center justify-between border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
            <span className="font-semibold text-white text-xs tracking-wide">
              Parallax Forest
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-slate-800/80 text-sky-300 border border-slate-700">
              {fps} FPS
            </span>
          </div>

          <div className="flex items-center gap-1">
            {/* Audio Toggle & Volume Slider */}
            <div className="flex items-center gap-1 bg-slate-900/60 p-0.5 rounded-xl border border-slate-800">
              <button
                onClick={onToggleMute}
                title={audioSettings.muted ? 'Unmute procedural soundscape' : 'Mute soundscape'}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  audioSettings.muted
                    ? 'text-slate-400 hover:text-white'
                    : 'bg-teal-500/20 text-teal-300'
                }`}
              >
                {audioSettings.muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
              {!audioSettings.muted && (
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={audioSettings.masterVolume}
                  onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                  className="w-12 h-1 accent-teal-400 bg-slate-800 rounded mr-1 cursor-pointer"
                  title="Master Volume"
                />
              )}
            </div>

            {/* Layer Deck */}
            <button
              onClick={onOpenLayers}
              title="Open Layer Depth Deck"
              className="px-2 py-1 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-sky-300 border border-sky-500/20 text-[11px] font-mono flex items-center gap-1 transition-all cursor-pointer"
            >
              <Layers className="w-3 h-3" />
              <span>{activeLayersCount}/10</span>
            </button>

            {/* Snapshot */}
            <button
              onClick={onTakeSnapshot}
              title="Capture high-res wallpaper snapshot"
              className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>

            {/* Skill Guide Info */}
            <button
              onClick={onOpenSkillGuide}
              title="Antigravity Skill Guide"
              className="p-1.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/20 transition-all cursor-pointer"
            >
              <Info className="w-3.5 h-3.5" />
            </button>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              title="Toggle Fullscreen"
              className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <Maximize className="w-3.5 h-3.5" />
            </button>

            {/* Minimize Toggle (Collapses to top-left corner pill) */}
            <button
              onClick={() => setIsExpanded(false)}
              title="Minimize to top-left corner"
              className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-sky-400 hover:text-white transition-all cursor-pointer ml-0.5"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Collapsible Panel Content */}
        <div className="p-3.5 space-y-3 text-xs">
          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-900/80 rounded-2xl border border-slate-800">
            <button
              onClick={() => onModeChange('auto')}
              className={`py-1.5 px-2 rounded-xl font-medium flex items-center justify-center gap-1 transition-all cursor-pointer ${
                mode === 'auto'
                  ? 'bg-sky-500 text-slate-950 font-semibold shadow-md shadow-sky-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Compass className="w-3 h-3" />
              <span>Auto</span>
            </button>

            <button
              onClick={() => onModeChange('mouse')}
              className={`py-1.5 px-2 rounded-xl font-medium flex items-center justify-center gap-1 transition-all cursor-pointer ${
                mode === 'mouse'
                  ? 'bg-sky-500 text-slate-950 font-semibold shadow-md shadow-sky-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MousePointer2 className="w-3 h-3" />
              <span>2.5D</span>
            </button>

            <button
              onClick={() => onModeChange('story')}
              className={`py-1.5 px-2 rounded-xl font-medium flex items-center justify-center gap-1 transition-all cursor-pointer ${
                mode === 'story'
                  ? 'bg-sky-500 text-slate-950 font-semibold shadow-md shadow-sky-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ScrollText className="w-3 h-3" />
              <span>Story</span>
            </button>

            <button
              onClick={() => onModeChange('wanderer')}
              className={`py-1.5 px-2 rounded-xl font-medium flex items-center justify-center gap-1 transition-all cursor-pointer ${
                mode === 'wanderer'
                  ? 'bg-sky-500 text-slate-950 font-semibold shadow-md shadow-sky-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Gamepad2 className="w-3 h-3" />
              <span>Wander</span>
            </button>
          </div>

          {/* Atmosphere Palette */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-sky-400" />
                Atmosphere Palette
              </span>
            </div>
            <div className="flex gap-1 overflow-x-auto pb-0.5 custom-scrollbar">
              {(Object.keys(LIGHTING_PRESETS) as LightingPreset[]).map((key) => {
                const preset = LIGHTING_PRESETS[key];
                const isSelected = lighting === key;
                return (
                  <button
                    key={key}
                    onClick={() => onLightingChange(key)}
                    className={`px-2 py-1 rounded-lg border text-[10px] whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-sky-500/20 border-sky-400 text-sky-200 shadow-sm'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {preset.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Speed & Direction Controls */}
          <div className="space-y-1 bg-slate-900/50 p-2 rounded-xl border border-slate-800/80">
            <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
              <span>Speed: {speed.toFixed(1)}x</span>
              {mode === 'auto' && (
                <button
                  onClick={onToggleDirection}
                  className="text-sky-400 hover:underline cursor-pointer"
                >
                  {direction === 1 ? 'Forward →' : '← Reverse'}
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              {mode === 'auto' && (
                <button
                  onClick={onTogglePlay}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-all cursor-pointer"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </button>
              )}
              <input
                type="range"
                min="0.1"
                max="4.0"
                step="0.1"
                value={speed}
                onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
                className="w-full accent-sky-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Mist & Environmental Toggles */}
          <div className="space-y-1 bg-slate-900/50 p-2 rounded-xl border border-slate-800/80">
            <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
              <span>Mist Opacity: {Math.round(mistOpacity * 100)}%</span>
              <button
                onClick={onToggleMistDrift}
                className={`cursor-pointer ${mistDrift ? 'text-teal-400' : 'text-slate-500'}`}
              >
                Drift: {mistDrift ? 'ON' : 'OFF'}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.05"
                value={mistOpacity}
                onChange={(e) => onMistOpacityChange(parseFloat(e.target.value))}
                className="w-full accent-teal-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
              <button
                onClick={onToggleRain}
                title="Toggle forest drizzle rain"
                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                  weatherRain
                    ? 'bg-sky-500/20 border-sky-400 text-sky-300'
                    : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                }`}
              >
                <CloudRain className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Wanderer Instructions in Wanderer Mode */}
          {mode === 'wanderer' && (
            <div className="p-2 rounded-xl bg-sky-950/40 border border-sky-500/20 text-[11px] text-sky-200">
              🎮 <strong>Controls:</strong> <kbd className="px-1 py-0.5 rounded bg-slate-800 border border-slate-700 text-white font-mono">A</kbd> / <kbd className="px-1 py-0.5 rounded bg-slate-800 border border-slate-700 text-white font-mono">D</kbd> or Arrows to move. <kbd className="px-1 py-0.5 rounded bg-slate-800 border border-slate-700 text-white font-mono">Space</kbd> to Jump!
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
