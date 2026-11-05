import React from 'react';
import type { LayerConfig } from '../types/parallax';
import { Layers, Eye, EyeOff, Sliders, CheckCircle2 } from 'lucide-react';

interface LayerDrawerProps {
  layers: LayerConfig[];
  isOpen: boolean;
  onClose: () => void;
  onToggleLayer: (id: number) => void;
  onSoloLayer: (id: number) => void;
  onResetLayers: () => void;
  useCombined: boolean;
  onToggleCombined: () => void;
}

export const LayerDrawer: React.FC<LayerDrawerProps> = ({
  layers,
  isOpen,
  onClose,
  onToggleLayer,
  onSoloLayer,
  onResetLayers,
  useCombined,
  onToggleCombined
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-40 w-full sm:w-96 bg-slate-950/95 backdrop-blur-xl border-l border-sky-500/20 shadow-2xl flex flex-col animate-slide-in">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-sky-400" />
          <h3 className="font-semibold text-white tracking-wide text-base">Layer Depth Deck</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          ✕
        </button>
      </div>

      {/* Quick Actions */}
      <div className="p-3 bg-slate-900/50 border-b border-slate-800/80 flex items-center justify-between text-xs">
        <button
          onClick={onResetLayers}
          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-sky-300 font-mono transition-all cursor-pointer"
        >
          Enable All 10 Layers
        </button>

        <button
          onClick={onToggleCombined}
          className={`px-2.5 py-1 rounded font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
            useCombined
              ? 'bg-amber-500/20 border border-amber-400/40 text-amber-300'
              : 'bg-slate-800 text-slate-300 hover:text-white'
          }`}
        >
          <Sliders className="w-3 h-3" />
          <span>{useCombined ? 'Combined: ACTIVE' : 'Use 1-Piece Fallback'}</span>
        </button>
      </div>

      {/* Layer List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5 custom-scrollbar">
        {layers.map((layer) => {
          return (
            <div
              key={layer.id}
              className={`p-3 rounded-xl border transition-all ${
                layer.enabled && !useCombined
                  ? 'bg-slate-900/80 border-sky-500/30 shadow-sm'
                  : 'bg-slate-950/40 border-slate-800/60 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center font-mono text-xs font-bold text-sky-400">
                    {layer.id.toString().padStart(2, '0')}
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-white leading-tight">
                      {layer.name}
                    </h4>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {layer.filename}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onSoloLayer(layer.id)}
                    title="Solo this layer"
                    className="px-2 py-1 rounded bg-slate-800 hover:bg-sky-500/20 text-[10px] font-mono text-slate-300 hover:text-sky-300 transition-all cursor-pointer"
                  >
                    SOLO
                  </button>
                  <button
                    onClick={() => onToggleLayer(layer.id)}
                    className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                      layer.enabled
                        ? 'bg-sky-500/20 text-sky-400 hover:bg-sky-500/30'
                        : 'bg-slate-800 text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {layer.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60 font-mono">
                <span>Speed: {layer.speedFactor.toFixed(2)}x</span>
                <span>Blend: {layer.blendMode}</span>
                <span>Opacity: {Math.round(layer.opacity * 100)}%</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="p-3 bg-slate-900/60 border-t border-slate-800 text-xs text-slate-400 flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>1920×1080 seamless horizontally repeating textures.</span>
      </div>
    </div>
  );
};

