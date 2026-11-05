# Layer Specification: 10-Layer Seamless Forest Background

## Source Archive Breakdown
- **Source Zip**: `Parallax Forest Background (Seamless).zip`
- **Native Dimensions**: 1920 × 1080 pixels
- **Aspect Ratio**: 16:9
- **Color Profile**: sRGB
- **Seamless Axis**: Horizontal (X-axis seamless wrapping)
- **Palette**: Deep Twilight Indigo, Midnight Azure, Bioluminescent Cyan particles, Ethereal Moonlit Mist.

---

## Individual Layer Details

### Layer 01: `01_Mist.png`
- **Depth Tier**: Foreground Atmosphere ($z = 1.15$)
- **Purpose**: Low-hanging volumetric forest mist.
- **Visual Weight**: Soft translucent fog banks.
- **Implementation Note**: Recommended opacity is 40%–60%. Use CSS `mix-blend-mode: screen` or Canvas `globalCompositeOperation = 'screen'`. Adding a secondary undulating offset $y = A \sin(\omega t)$ provides realistic breathing fog.

### Layer 02: `02_Bushes.png`
- **Depth Tier**: Immediate Foreground ($z = 1.00$, Reference Plane)
- **Purpose**: Sharp silhouette bushes, low vegetation, and front foliage.
- **Visual Weight**: Highest contrast, deep obsidian-blue foreground framing.
- **Implementation Note**: Serves as the camera focal anchor. Moves at 1:1 speed with camera panning.

### Layer 03: `03_Particles.png`
- **Depth Tier**: Near Midground Atmosphere ($z = 0.85$)
- **Purpose**: Floating luminous forest spores / fireflies near the foreground.
- **Visual Weight**: Crisp bioluminescent dots and motes.
- **Implementation Note**: Screen blend mode. Can be animated with independent slow upward draft and pulse-glow.

### Layer 04: `04_Forest.png`
- **Depth Tier**: Close Canopy & Trunks ($z = 0.70$)
- **Purpose**: Primary detailed tree trunks, mossy branches, and close forest canopy.
- **Visual Weight**: High detail, structural framing.

### Layer 05: `05_Particles.png`
- **Depth Tier**: Mid-depth Atmosphere ($z = 0.55$)
- **Purpose**: Deep-forest floating particles and ambient twilight dust.
- **Visual Weight**: Softer, smaller light motes.
- **Implementation Note**: Lower opacity (~70%) to create realistic depth attenuation.

### Layer 06: `06_Forest.png`
- **Depth Tier**: Midground Forest ($z = 0.45$)
- **Purpose**: Dense middle tree lines, creating the feeling of deep wilderness.
- **Visual Weight**: Silhouette density with soft ambient scattering.

### Layer 07: `07_Forest.png`
- **Depth Tier**: Mid-Distant Forest Ridge ($z = 0.30$)
- **Purpose**: Receding ridge of trees.
- **Visual Weight**: Lower contrast, desaturated blue tones.

### Layer 08: `08_Forest.png`
- **Depth Tier**: Distant Forest ($z = 0.18$)
- **Purpose**: Distant rolling tree ridge.
- **Visual Weight**: Faint atmospheric haze fading into the sky.

### Layer 09: `09_Forest.png`
- **Depth Tier**: Far Mountain / Tree Horizon ($z = 0.08$)
- **Purpose**: Distant horizon silhouettes barely distinguishable from sky fog.
- **Visual Weight**: Atmospheric depth cushion.

### Layer 10: `10_Sky.png`
- **Depth Tier**: Celestial Backdrop ($z = 0.02$)
- **Purpose**: Night sky gradient with celestial glow.
- **Visual Weight**: Deep indigo-to-cyan gradient anchor.

---

## Standalone Combined Asset
- **Asset**: `Combined Background Images/Combined background - Blue.png`
- **Purpose**: Pre-rendered flattened composition of all 10 layers.
- **Usage**:
  - Low-power device fallback (reduces 10 draw calls to 1).
  - OpenGraph / social sharing preview cards.
  - Quick static hero banner when parallax engine is disabled.

