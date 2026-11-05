import React, { useRef, useEffect } from 'react';
import { Compass, Sparkles, Cpu, BookOpen, ChevronDown } from 'lucide-react';

interface StoryOverlayProps {
  onScrollProgress: (progress: number) => void;
  onExploreMore: () => void;
}

export const StoryOverlay: React.FC<StoryOverlayProps> = ({ onScrollProgress, onExploreMore }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const maxScroll = scrollHeight - clientHeight;
    const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
    onScrollProgress(progress);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-20 overflow-y-auto scroll-smooth pointer-events-auto custom-scrollbar"
      style={{ scrollbarWidth: 'thin' }}
    >
      <div className="min-h-[400vh] relative">
        {/* Section 1: Hero */}
        <section className="h-screen flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-3xl backdrop-blur-md bg-slate-950/50 p-8 md:p-12 rounded-3xl border border-sky-500/20 shadow-2xl shadow-sky-950/50 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-mono uppercase tracking-widest mb-6">
              <Compass className="w-3.5 h-3.5 text-sky-400" />
              10-Layer Seamless 2.5D Experience
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-4 drop-shadow-md">
              The Whispering Canopy
            </h1>
            <p className="text-lg md:text-xl text-sky-100/80 mb-8 leading-relaxed max-w-2xl mx-auto">
              Step into an enchanted woodland powered by deep parallax physics, hardware-accelerated dual-buffer canvas rendering, and procedural Web Audio ambience.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => {
                  containerRef.current?.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-teal-400 hover:from-sky-400 hover:to-teal-300 text-slate-950 font-semibold shadow-lg shadow-sky-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 cursor-pointer"
              >
                <span>Begin Journey</span>
                <ChevronDown className="w-4 h-4 animate-bounce" />
              </button>
              <button
                onClick={onExploreMore}
                className="px-6 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 text-sky-200 border border-sky-500/30 hover:border-sky-400 transition-all font-medium cursor-pointer"
              >
                Switch Control Mode
              </button>
            </div>
          </div>
        </section>

        {/* Section 2: Bioluminescent Grove */}
        <section className="h-screen flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-2xl backdrop-blur-md bg-slate-950/60 p-8 md:p-10 rounded-3xl border border-teal-500/30 shadow-2xl shadow-teal-950/50">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-400/30 text-teal-300 text-xs font-mono uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              Chapter II: Depth Attenuation
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              The Bioluminescent Grove
            </h2>
            <p className="text-base md:text-lg text-teal-100/80 leading-relaxed mb-6">
              Ten individual planes of depth shift at differential velocities — from the swift foreground bushes and glowing spore particles down to the eternal celestial indigo sky.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-xs text-sky-400 font-mono">Layer 01</span>
                <p className="text-sm font-semibold text-white">Mist Drift</p>
                <span className="text-xs text-slate-400">1.15x Speed</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-xs text-teal-400 font-mono">Layer 02</span>
                <p className="text-sm font-semibold text-white">Bushes</p>
                <span className="text-xs text-slate-400">1.00x Speed</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-xs text-purple-400 font-mono">Layer 06</span>
                <p className="text-sm font-semibold text-white">Mid Trees</p>
                <span className="text-xs text-slate-400">0.45x Speed</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-xs text-indigo-400 font-mono">Layer 10</span>
                <p className="text-sm font-semibold text-white">Deep Sky</p>
                <span className="text-xs text-slate-400">0.02x Speed</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Engineering Architecture */}
        <section className="h-screen flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-2xl backdrop-blur-md bg-slate-950/60 p-8 md:p-10 rounded-3xl border border-indigo-500/30 shadow-2xl shadow-indigo-950/50">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-mono uppercase tracking-widest mb-4">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              Chapter III: Engine Architecture
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              High-Precision Canvas Pipeline
            </h2>
            <p className="text-base md:text-lg text-indigo-100/80 leading-relaxed mb-6">
              Zero layout shifts. Seamless wrapping with sub-pixel modulo mathematics eliminates texture tearing across 4K displays and ultra-wide aspect ratios.
            </p>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-indigo-500/20 text-left font-mono text-xs text-indigo-300 space-y-1">
              <div>// Seamless wrap modulo algorithm</div>
              <div className="text-sky-300">const x = -(cameraX * layer.speedFactor % layerWidth);</div>
              <div className="text-teal-300">ctx.drawImage(img, x, layerY, layerW, layerH);</div>
              <div className="text-indigo-300">ctx.drawImage(img, x + layerW, layerY, layerW, layerH);</div>
            </div>
          </div>
        </section>

        {/* Section 4: Forest Lore & Skill System */}
        <section className="h-screen flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-2xl backdrop-blur-md bg-slate-950/70 p-8 md:p-10 rounded-3xl border border-sky-400/30 shadow-2xl shadow-sky-950/50">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-mono uppercase tracking-widest mb-4">
              <BookOpen className="w-3.5 h-3.5 text-sky-400" />
              Chapter IV: Antigravity Skill
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Parallax Forest Skill Enabled
            </h2>
            <p className="text-base md:text-lg text-sky-100/80 leading-relaxed mb-6">
              This project is powered by an Antigravity Agent Skill created directly from the asset package specification, complete with layer registries, physics formulas, and verification suites.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => {
                  containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-2.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border border-sky-400/40 text-sm font-semibold cursor-pointer transition-all"
              >
                Back to Top ↑
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

