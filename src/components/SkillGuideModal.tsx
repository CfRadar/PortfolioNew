import React from 'react';
import { Sparkles, Terminal, BookOpen, Layers, Check } from 'lucide-react';

interface SkillGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SkillGuideModal: React.FC<SkillGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-slate-900 border border-sky-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>Parallax Forest Engine Skill</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                  ACTIVE
                </span>
              </h2>
              <p className="text-xs text-sky-300/70 font-mono">
                Location: .agents/skills/parallax-forest-engine/
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-slate-300 custom-scrollbar">
          {/* Summary Box */}
          <div className="p-4 rounded-2xl bg-sky-950/30 border border-sky-500/20">
            <h3 className="font-semibold text-sky-200 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-400" />
              What this Skill Accomplishes
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              This skill equips the Antigravity AI coding assistant and developers with the complete domain knowledge, mathematical modulo wrapping formulas, recommended layer order (01 front to 10 sky), dynamic atmospheric shaders, and procedural sound algorithms to utilize seamless parallax asset packs at their peak fidelity.
            </p>
          </div>

          {/* Directory Hierarchy */}
          <div>
            <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-teal-400" />
              Skill File Structure
            </h3>
            <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-slate-300 border border-slate-800 space-y-1">
              <div className="text-sky-400">.agents/skills/parallax-forest-engine/</div>
              <div className="pl-4">├── <span className="text-teal-300">SKILL.md</span> <span className="text-slate-500">(Main guide, triggers & workflow)</span></div>
              <div className="pl-4">├── references/</div>
              <div className="pl-8">├── <span className="text-indigo-300">LAYER_SPECIFICATION.md</span> <span className="text-slate-500">(10-layer depth ratios & blend modes)</span></div>
              <div className="pl-8">└── <span className="text-indigo-300">MATHEMATICAL_MODEL.md</span> <span className="text-slate-500">(Modulo wrap & spring equations)</span></div>
              <div className="pl-4">└── scripts/</div>
              <div className="pl-8">└── <span className="text-amber-300">verify-assets.js</span> <span className="text-slate-500">(Asset integrity & dimension tester)</span></div>
            </div>
          </div>

          {/* Asset Verification Command */}
          <div>
            <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-amber-400" />
              Asset Verification Script
            </h3>
            <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-amber-300 border border-slate-800">
              node .agents/skills/parallax-forest-engine/scripts/verify-assets.js
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Infinite Seamless Modulo</p>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Sub-pixel wrapping eliminates seams and border artifacts on any monitor width.
                </p>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Atmospheric Wave Physics</p>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Sinusoidal floating waves and independent mist drift create a living forest.
                </p>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Zero-Asset Audio Synthesis</p>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Web Audio API pink noise & cricket chirps generate natural acoustics without file bloat.
                </p>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">4 Interaction Paradigms</p>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Cinema auto-pan, cursor 2.5D depth tilt, story scroll triggers, and free wanderer.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950/60 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs tracking-wide cursor-pointer transition-all"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
