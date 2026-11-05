# 🌲 Enchanted Parallax Forest (10-Layer Seamless 2.5D Engine)

A high-performance, immersive 2.5D multi-plane parallax forest web experience built with **React 19**, **Vite**, **TypeScript**, and **HTML5 Canvas**, fully utilizing every asset inside `Parallax Forest Background (Seamless).zip` at its absolute maximum capability.

This project also packages a dedicated **Antigravity Agent Skill** (`parallax-forest-engine`) to teach AI assistants and developers how to build, optimize, and customize multi-plane seamless parallax systems.

---

## 🌟 Highlights & Features

### 1. 10-Layer Seamless Modulo Engine
- **Sub-pixel Modulo Wrap**: Eliminates image seam artifacts on ultrawide and 4K displays.
- **Calibrated Depth Multipliers**: Each layer moves with physically calibrated relative velocity $k_x \in [0.02, 1.15]$.
- **Sinusoidal Wave Dynamics**:
  - `01_Mist.png` features independent horizontal wind drift + gentle floating sine wave oscillations ($A \sin \omega t$).
  - `03_Particles.png` and `05_Particles.png` feature organic bioluminescent pulsing.
- **Fallback Mode**: Instant toggle to switch between all 10 isolated layers and the pre-rendered `Combined background - Blue.png`.

### 2. Four Interactive Camera Modes
| Mode | Control Paradigm | Description |
|:---|:---|:---|
| **🎥 Cinema Auto-Scroll** | Hands-free loop | Continuous cinematic scrolling with variable speed slider ($0.1\times - 4.0\times$) and directional toggle ($\leftrightarrow$). |
| **🖱️ Cursor 2.5D Depth Tilt** | Mouse / Pointer | Dynamic pseudo-3D window depth tracking cursor displacement with exponential spring dampening. |
| **📜 Story Scroll Journey** | Page Scroll | Narrative portfolio checkpoints driven by smooth vertical scrolling mapped to camera trajectory. |
| **🧙 Free Roam Wanderer** | WASD / Keyboard | Control an animated bioluminescent wanderer with ground collision, jumping physics (`Space`), and camera tracking. |

### 3. Atmospheric Matrix & Lighting Presets
- 🌙 **Midnight Azure**: Original moonlit indigo palette.
- 🌅 **Twilight Dusk**: Warm golden hour canopy glow.
- 🌿 **Emerald Grove**: Bioluminescent fae woodland in rich jade.
- 🩸 **Crimson Eclipse**: Dark fantasy blood-moon aesthetic.
- ❄️ **Silver Frost**: Desaturated, serene winter moonlight.
- **Dynamic Weather**: Toggleable forest drizzle rain system.

### 4. Zero-Asset Procedural Audio (Web Audio API)
Generates natural soundscapes entirely in browser memory with zero external audio assets:
- **Night Breeze**: Bandpass-filtered pink noise modulated by a slow LFO ($0.18\text{ Hz}$).
- **Nocturnal Crickets**: Rhythmic micro-burst FM synthesized chirps ($4.8\text{ kHz}$).
- **Firefly Bell Chimes**: Random pentatonic celestial pings with exponential decay envelopes.

---

## 📂 Layer Breakdown & Asset Ordering

Per the original package specification, layers are rendered from back (10) to front (01):

```
[Layer 01] 01_Mist.png       — Atmospheric fog (Screen blend, 45% opacity, wave drift)
[Layer 02] 02_Bushes.png     — Foreground silhouette framing (1.00x reference speed)
[Layer 03] 03_Particles.png  — Near glowing fireflies & spores (Screen blend, 0.85x speed)
[Layer 04] 04_Forest.png     — Front detailed canopy & trunks (0.70x speed)
[Layer 05] 05_Particles.png  — Midground twilight dust (Screen blend, 0.55x speed)
[Layer 06] 06_Forest.png     — Mid dense tree line (0.45x speed)
[Layer 07] 07_Forest.png     — Distant mountain ridge (0.30x speed)
[Layer 08] 08_Forest.png     — Far tree silhouettes (0.18x speed)
[Layer 09] 09_Forest.png     — Distant horizon treeline (0.08x speed)
[Layer 10] 10_Sky.png        — Deep celestial gradient anchor (0.02x speed)
```

---

## 🤖 Antigravity Skill: `parallax-forest-engine`

This project includes a native workspace skill located at:
```
.agents/skills/parallax-forest-engine/
├── SKILL.md                          # Triggers, runbooks, and integration guides
├── references/
│   ├── LAYER_SPECIFICATION.md        # Deep breakdown of each layer's optical properties
│   └── MATHEMATICAL_MODEL.md         # Equations for modulo wrapping and spring damping
└── scripts/
    └── verify-assets.js              # Node.js asset integrity and dimension checker
```
*(Also synced to global skills at `~/.gemini/config/skills/parallax-forest-engine/`)*

### Run Asset Verification Script
```bash
node .agents/skills/parallax-forest-engine/scripts/verify-assets.js
```

---

## 🚀 Getting Started

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```
