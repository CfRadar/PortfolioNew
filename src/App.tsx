import React, { useState, useCallback } from 'react';
import { ParallaxCanvas } from './components/ParallaxCanvas';
import { ControlsDock } from './components/ControlsDock';
import { LayerDrawer } from './components/LayerDrawer';
import { StoryOverlay } from './components/StoryOverlay';
import { SkillGuideModal } from './components/SkillGuideModal';
import { DEFAULT_LAYERS } from './constants/layers';
import { forestAudio } from './engine/audioSynthesizer';
import type { LayerConfig, ParallaxMode, LightingPreset, AudioSettings } from './types/parallax';
import confetti from 'canvas-confetti';

export const App: React.FC = () => {
  const [layers, setLayers] = useState<LayerConfig[]>(DEFAULT_LAYERS);
  const [mode, setMode] = useState<ParallaxMode>('auto');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(1.0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [lighting, setLighting] = useState<LightingPreset>('night');
  const [mistOpacity, setMistOpacity] = useState<number>(0.45);
  const [mistDrift, setMistDrift] = useState<boolean>(true);
  const [weatherRain, setWeatherRain] = useState<boolean>(false);
  const [useCombined, setUseCombined] = useState<boolean>(false);
  const [storyScrollProgress, setStoryScrollProgress] = useState<number>(0);
  const [fps, setFps] = useState<number>(60);

  const [audioSettings, setAudioSettings] = useState<AudioSettings>({
    masterVolume: 0.6,
    muted: true, // browsers require gesture to start audio
    windVolume: 0.5,
    cricketsVolume: 0.35,
    chimesVolume: 0.4
  });

  const [isLayerDrawerOpen, setIsLayerDrawerOpen] = useState<boolean>(false);
  const [isSkillGuideOpen, setIsSkillGuideOpen] = useState<boolean>(false);

  // Audio Toggles
  const handleToggleMute = useCallback(() => {
    setAudioSettings((prev) => {
      const nextMuted = !prev.muted;
      if (!nextMuted) {
        forestAudio.start();
      }
      forestAudio.toggleMute(nextMuted);
      return { ...prev, muted: nextMuted };
    });
  }, []);

  const handleVolumeChange = useCallback((val: number) => {
    setAudioSettings((prev) => ({ ...prev, masterVolume: val }));
    forestAudio.setMasterVolume(val);
  }, []);

  // Layer Management
  const handleToggleLayer = useCallback((id: number) => {
    setLayers((prev) =>
      prev.map((layer) => (layer.id === id ? { ...layer, enabled: !layer.enabled } : layer))
    );
  }, []);

  const handleSoloLayer = useCallback((id: number) => {
    setLayers((prev) =>
      prev.map((layer) => ({
        ...layer,
        enabled: layer.id === id
      }))
    );
  }, []);

  const handleResetLayers = useCallback(() => {
    setLayers((prev) => prev.map((layer) => ({ ...layer, enabled: true })));
    setUseCombined(false);
  }, []);

  const handleToggleCombined = useCallback(() => {
    setUseCombined((prev) => !prev);
  }, []);

  // Snapshot Wallpaper Export
  const handleTakeSnapshot = useCallback(() => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    try {
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `parallax-forest-${lighting}-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#38bdf8', '#34d399', '#a78bfa']
      });
    } catch (e) {
      console.error('Snapshot failed', e);
    }
  }, [lighting]);

  const activeLayersCount = layers.filter((l) => l.enabled).length;

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-slate-950 font-sans">
      {/* 60fps Multi-Plane Parallax Canvas */}
      <ParallaxCanvas
        layers={layers}
        mode={mode}
        speed={isPlaying ? speed : 0}
        direction={direction}
        lighting={lighting}
        mistOpacity={mistOpacity}
        mistDrift={mistDrift}
        weatherRain={weatherRain}
        useCombined={useCombined}
        storyScrollProgress={storyScrollProgress}
        onFpsUpdate={setFps}
      />

      {/* Story Overlay for Chapter Scroll Mode */}
      {mode === 'story' && (
        <StoryOverlay
          onScrollProgress={setStoryScrollProgress}
          onExploreMore={() => setMode('auto')}
        />
      )}

      {/* 
        [TEMPORARY COMPONENT - TOP LEFT CORNER]
        Interactive Controls Floating Dock.
        Scheduled for future removal. See TEMPORARY_CONTROLS_NOTE.md for removal instructions.
      */}
      <ControlsDock
        mode={mode}
        onModeChange={setMode}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        speed={speed}
        onSpeedChange={setSpeed}
        direction={direction}
        onToggleDirection={() => setDirection((d) => (d === 1 ? -1 : 1))}
        lighting={lighting}
        onLightingChange={setLighting}
        mistOpacity={mistOpacity}
        onMistOpacityChange={setMistOpacity}
        mistDrift={mistDrift}
        onToggleMistDrift={() => setMistDrift(!mistDrift)}
        weatherRain={weatherRain}
        onToggleRain={() => setWeatherRain(!weatherRain)}
        audioSettings={audioSettings}
        onToggleMute={handleToggleMute}
        onVolumeChange={handleVolumeChange}
        onOpenLayers={() => setIsLayerDrawerOpen(true)}
        onOpenSkillGuide={() => setIsSkillGuideOpen(true)}
        onTakeSnapshot={handleTakeSnapshot}
        activeLayersCount={useCombined ? 1 : activeLayersCount}
        fps={fps}
      />

      {/* Layer Depth Deck Side Drawer */}
      <LayerDrawer
        layers={layers}
        isOpen={isLayerDrawerOpen}
        onClose={() => setIsLayerDrawerOpen(false)}
        onToggleLayer={handleToggleLayer}
        onSoloLayer={handleSoloLayer}
        onResetLayers={handleResetLayers}
        useCombined={useCombined}
        onToggleCombined={handleToggleCombined}
      />

      {/* Skill & System Documentation Modal */}
      <SkillGuideModal
        isOpen={isSkillGuideOpen}
        onClose={() => setIsSkillGuideOpen(false)}
      />
    </main>
  );
};

export default App;
