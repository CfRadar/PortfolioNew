# 📝 Note: Temporary Parallax Controls HUD (`ControlsDock.tsx`)

> **Status:** TEMPORARY COMPONENT (Scheduled for future removal)  
> **Current Location:** Top-Left Corner (`fixed top-4 left-4 z-30`)  
> **Minimization:** Supported (collapses into an unobtrusive pill badge)

---

## 🎯 Purpose of This Component
The [`ControlsDock.tsx`](src/components/ControlsDock.tsx) component is currently mounted in the top-left corner as an interactive playground and tuning suite for:
- Testing the **4 camera modes** (`auto`, `mouse` 2.5D tilt, `story` scroll, `wanderer`).
- Tuning **speed**, **mist opacity**, **wind drift**, and **weather rain**.
- Auditioning the **5 dynamic lighting presets** (Midnight, Twilight, Emerald, Crimson, Frost).
- Testing **layer soloing** and **procedural Web Audio API soundscapes**.

Once the final portfolio design and fixed background aesthetics are locked in, this HUD component will be removed.

---

## 🧹 Step-by-Step Removal Guide

When you are ready to remove this temporary component, follow these 3 quick steps:

### Step 1: Remove `<ControlsDock />` from [`src/App.tsx`](src/App.tsx)
Delete or comment out the `<ControlsDock ... />` element and its import in [`src/App.tsx`](src/App.tsx):

```diff
- import { ControlsDock } from './components/ControlsDock';
...
- {/* Interactive Controls Floating Dock */}
- <ControlsDock
-   mode={mode}
-   onModeChange={setMode}
-   ...
- />
```

### Step 2: Set Your Preferred Permanent Defaults in [`src/App.tsx`](src/App.tsx)
Lock in your preferred permanent settings in the state definitions:

```tsx
// Example permanent production defaults:
const [mode] = useState<ParallaxMode>('mouse'); // or 'auto'
const [speed] = useState<number>(1.0);
const [lighting] = useState<LightingPreset>('night');
const [mistOpacity] = useState<number>(0.45);
const [mistDrift] = useState<boolean>(true);
const [weatherRain] = useState<boolean>(false);
```

### Step 3: Optional Cleanup of Supporting Modals
If you no longer need the side drawer and info modal:
- Remove `<LayerDrawer ... />` from [`src/App.tsx`](src/App.tsx).
- Remove `<SkillGuideModal ... />` from [`src/App.tsx`](src/App.tsx).
- Delete the temporary component file: [`src/components/ControlsDock.tsx`](src/components/ControlsDock.tsx).

---

## 🌲 Core Parallax Engine Remains Intact
Removing `ControlsDock.tsx` does **not** affect the core parallax engine:
- [`ParallaxCanvas.tsx`](src/components/ParallaxCanvas.tsx) continues to render all 10 layers with 60fps dual-buffer hardware acceleration and seamless modulo wrapping.
- All layer assets in `public/parallax-forest/layers/` remain untouched.
- The Antigravity skill [`.agents/skills/parallax-forest-engine/`](.agents/skills/parallax-forest-engine/SKILL.md) remains available for AI assistant workflows.

