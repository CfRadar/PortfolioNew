---
name: parallax-forest-engine
description: Implements, optimizes, and configures multi-layer 2.5D seamless parallax forest backgrounds with dynamic lighting, interactive depth physics, audio-visual atmosphere, and 60fps canvas/CSS rendering. Use when building parallax scenes, game backgrounds, interactive hero sections, or utilizing seamless multi-layered sprite assets.
---

# Parallax Forest Engine Skill

Guides the integration and maximum utilization of multi-layered seamless forest backgrounds (such as 10-layer parallax forest packs) in web applications, games, and interactive portfolios.

## When to Use This Skill
- Implementing 2D/2.5D multi-plane parallax scrolling in React, Vue, or Vanilla Canvas/WebGL.
- Integrating seamless layered landscape assets (e.g., 10-layer forest background with sky, trees, particles, bushes, and mist).
- Adding interactive camera physics (mouse tracking, gyroscope tilt, scroll-driven storytelling, or WASD character movement).
- Enhancing 2D environments with atmospheric effects (day/dusk/night color grading, volumetric mist flow, animated firefly glow, dynamic weather, and synthesized forest audio).

---

## Layer Architecture & Depth Mapping

The 10-layer seamless forest background is structured from foreground (01) to furthest background (10). Each layer operates with a calibrated depth coefficient $z \in [0, 1]$ and speed multiplier:

| Layer Index | File Name | Visual Content | Depth Ratio ($k_x$) | Recommended Opacity | Blend Mode | Dynamics / Motion |
|:---:|:---|:---|:---:|:---:|:---:|:---|
| **01** | `01_Mist.png` | Atmospheric Mist & Fog | 1.15x | 0.35 - 0.65 | `screen` / `lighten` | Independent horizontal drift + oscillating wave |
| **02** | `02_Bushes.png` | Foreground Foliage & Branches | 1.00x (Ref) | 1.00 | `normal` | Full camera tracking, subtle wind sway |
| **03** | `03_Particles.png` | Foreground Fireflies & Spores | 0.85x | 0.90 | `screen` | Sinusoidal floating ($\sin \omega t$), luminescence pulsing |
| **04** | `04_Forest.png` | Front Forest & Trunks | 0.70x | 1.00 | `normal` | Camera parallax |
| **05** | `05_Particles.png` | Midground Spores | 0.55x | 0.75 | `screen` | Ambient micro-drift, soft flicker |
| **06** | `06_Forest.png` | Mid Forest Canopy | 0.45x | 1.00 | `normal` | Camera parallax |
| **07** | `07_Forest.png` | Distant Ridge | 0.30x | 1.00 | `normal` | Camera parallax |
| **08** | `08_Forest.png` | Far Silhouette Trees | 0.18x | 1.00 | `normal` | Camera parallax |
| **09** | `09_Forest.png` | Horizon Tree Line & Fog | 0.08x | 1.00 | `normal` | Camera parallax |
| **10** | `10_Sky.png` | Celestial Sky Gradient | 0.02x | 1.00 | `normal` | Anchor layer, static or celestial drift |

*For mathematical formulas and wrap logic, see [MATHEMATICAL_MODEL.md](references/MATHEMATICAL_MODEL.md).*

---

## Seamless Tiling Best Practices

All layers are 1920x1080 px full-bleed images designed to tile infinitely on the X-axis:
1. **Modulo Wrapping**:
   Calculate layer offset with wrapped modulo to prevent floating point overflow:
   ```ts
   const x = (rawOffset * speedFactor) % layerWidth;
   const renderX = x > 0 ? x - layerWidth : x;
   ```
2. **Double-Blit / Dual-Image Rendering**:
   Always draw each layer twice per frame: at `renderX` and `renderX + layerWidth` (and optionally `renderX - layerWidth`) to ensure seamless continuity across screen widths larger than 1920px.
3. **Hardware Acceleration**:
   - For DOM layers, apply `transform: translate3d(${x}px, ${y}px, 0)` with `will-change: transform`.
   - For Canvas rendering, use a single `<canvas>` with `ctx.drawImage` in a `requestAnimationFrame` loop to eliminate DOM layer thrashing.

---

## Interaction Modes

A maximized parallax implementation supports 4 distinct camera control modes:
- **Infinite Auto-Scroll**: Constant cinematic scroll with variable speed and direction slider.
- **Interactive Mouse / Gyro 2.5D**: Camera tilts and shifts based on cursor distance from center or device tilt, giving pseudo-3D window depth.
- **Scroll-Driven Storytelling**: Page scroll position drives the camera progression with narrative portfolio checkpoints (Introduction, About, Projects, Contact).
- **Free-Roam Wanderer Mode**: Keyboard (A/D or Arrow keys) and on-screen joystick drive a wanderer camera with acceleration and friction physics.

---

## Atmosphere & Lighting Presets

Apply CSS `filter` or Canvas global composite operations to instantly morph the scene:
- **Mystic Night (Default)**: `hue-rotate(0deg) brightness(0.9) contrast(1.1)`
- **Golden Twilight / Dusk**: `hue-rotate(-45deg) saturate(1.4) sepia(0.3) brightness(0.95)`
- **Emerald Dawn**: `hue-rotate(75deg) saturate(1.2) brightness(1.05)`
- **Crimson Eclipse**: `hue-rotate(150deg) saturate(1.5) contrast(1.2) brightness(0.85)`
- **Silver Moonlight**: `saturate(0.2) brightness(0.8) contrast(1.25)`

---

## Forest Audio Synthesis (Web Audio API)

Utilize zero-asset synthesized procedural audio to maximize immersion without audio asset loading:
- **Night Breeze**: Filtered pink noise with modulated lowpass biquad filter ($180\text{Hz} - 450\text{Hz}$).
- **Crickets / Tree Frogs**: High-frequency modulated sine oscillators ($4.5\text{kHz} - 5.5\text{kHz}$) pulsing at $4\text{Hz}$.
- **Firefly Chimes**: Random pentatonic gentle bell pings using decaying sine waves.

---

## Validation & Quality Checklist

- [ ] All 10 layer PNG files exist and are loaded without 404s.
- [ ] Layer `01_Mist.png` has opacity $\le 0.7$ and screen/lighten blend mode.
- [ ] No visual seam or tear during wrapping at any aspect ratio (16:9, 21:9 ultrawide, mobile portrait).
- [ ] Frame rate locked at smooth 60fps with zero layout thrashing.
- [ ] Fallback support: `Combined background - Blue.png` loads when WebGL/multi-layer rendering is degraded.
- [ ] UI allows toggling individual layers for debugging and depth inspection.

