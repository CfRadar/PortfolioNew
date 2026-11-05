import React, { useEffect, useRef, useState, useCallback } from 'react';
import type { LayerConfig, ParallaxMode, LightingPreset, WandererState } from '../types/parallax';
import { LIGHTING_PRESETS } from '../constants/layers';

interface ParallaxCanvasProps {
  layers: LayerConfig[];
  mode: ParallaxMode;
  speed: number;
  direction: 1 | -1;
  lighting: LightingPreset;
  mistOpacity: number;
  mistDrift: boolean;
  weatherRain: boolean;
  useCombined: boolean;
  storyScrollProgress?: number;
  onFpsUpdate?: (fps: number) => void;
  onSnapshotReady?: (dataUrl: string) => void;
  onWandererMove?: (x: number, isMoving: boolean) => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxAlpha: number;
  pulseSpeed: number;
  color: string;
}

interface RainDrop {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
}

export const ParallaxCanvas: React.FC<ParallaxCanvasProps> = ({
  layers,
  mode,
  speed,
  direction,
  lighting,
  mistOpacity,
  mistDrift,
  weatherRain,
  useCombined,
  storyScrollProgress = 0,
  onFpsUpdate,
  onWandererMove
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Loaded image cache
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const combinedImageRef = useRef<HTMLImageElement | null>(null);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Camera coordinates & physics
  const cameraX = useRef<number>(0);
  const targetCameraX = useRef<number>(0);
  const mousePos = useRef<{ x: number; y: number; normalizedX: number }>({ x: 0, y: 0, normalizedX: 0 });

  // Wanderer state
  const wanderer = useRef<WandererState>({
    x: 300,
    y: 0,
    vx: 0,
    vy: 0,
    isGrounded: true,
    direction: 'right',
    isMoving: false
  });
  const keysPressed = useRef<{ [key: string]: boolean }>({});

  // Dynamic particle & rain systems
  const ambientParticles = useRef<Particle[]>([]);
  const rainDrops = useRef<RainDrop[]>([]);

  // Performance tracking
  const frameCount = useRef<number>(0);
  const lastFpsTime = useRef<number>(performance.now());

  // Preload all assets
  useEffect(() => {
    let loadedCount = 0;
    const totalAssets = layers.length + 1; // 10 layers + 1 combined

    const checkAllLoaded = () => {
      loadedCount++;
      setLoadProgress(Math.floor((loadedCount / totalAssets) * 100));
      if (loadedCount >= totalAssets) {
        setIsLoaded(true);
      }
    };

    // Load individual layers
    layers.forEach((layer) => {
      const img = new Image();
      img.src = layer.src;
      img.onload = () => {
        imagesRef.current.set(layer.id, img);
        checkAllLoaded();
      };
      img.onerror = () => {
        console.error(`Failed to load layer: ${layer.filename} from ${layer.src}`);
        checkAllLoaded();
      };
    });

    // Load combined fallback
    const combinedImg = new Image();
    combinedImg.src = '/parallax-forest/combined.png';
    combinedImg.onload = () => {
      combinedImageRef.current = combinedImg;
      checkAllLoaded();
    };
    combinedImg.onerror = () => {
      console.warn('Combined image fallback not loaded.');
      checkAllLoaded();
    };

    // Initialize ambient fireflies/spores
    const particles: Particle[] = [];
    const colors = ['#38bdf8', '#34d399', '#a78bfa', '#fef08a'];
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * 2000,
        y: Math.random() * 1080,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.2 - Math.random() * 0.5,
        size: 1 + Math.random() * 3,
        alpha: Math.random() * 0.8,
        maxAlpha: 0.4 + Math.random() * 0.6,
        pulseSpeed: 0.02 + Math.random() * 0.04,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    ambientParticles.current = particles;

    // Initialize rain drops
    const drops: RainDrop[] = [];
    for (let i = 0; i < 150; i++) {
      drops.push({
        x: Math.random() * 2500,
        y: Math.random() * 1200,
        length: 12 + Math.random() * 20,
        speed: 14 + Math.random() * 10,
        opacity: 0.2 + Math.random() * 0.3
      });
    }
    rainDrops.current = drops;
  }, [layers]);

  // Handle Mouse movement for Mode B
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const width = window.innerWidth;
    mousePos.current.x = e.clientX;
    mousePos.current.y = e.clientY;
    // Normalized between -1.0 (left) and +1.0 (right)
    mousePos.current.normalizedX = (e.clientX / width - 0.5) * 2;
  }, []);

  // Handle Keyboard for Wanderer Mode D
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = true;
      keysPressed.current[e.code] = true;
      if (['Space', 'ArrowUp', 'KeyW'].includes(e.code) && wanderer.current.isGrounded) {
        wanderer.current.vy = -16;
        wanderer.current.isGrounded = false;
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false;
      keysPressed.current[e.code] = false;
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  // Main 60fps RequestAnimationFrame Animation Loop
  useEffect(() => {
    if (!isLoaded) return;

    let animId: number;
    let lastTime = performance.now();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const render = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1); // clamp delta
      lastTime = currentTime;

      // Calculate FPS
      frameCount.current++;
      if (currentTime - lastFpsTime.current >= 500) {
        const fps = Math.round((frameCount.current * 1000) / (currentTime - lastFpsTime.current));
        onFpsUpdate?.(fps);
        frameCount.current = 0;
        lastFpsTime.current = currentTime;
      }

      // Handle Resize / Screen Dimensions
      const width = (canvas.width = window.innerWidth);
      const height = (canvas.height = window.innerHeight);

      // Native asset dimensions: 1920x1080
      const NATIVE_WIDTH = 1920;
      const NATIVE_HEIGHT = 1080;

      // Scale to cover screen height while preserving aspect ratio
      const scale = Math.max(height / NATIVE_HEIGHT, width / NATIVE_WIDTH);
      const layerW = NATIVE_WIDTH * scale;
      const layerH = NATIVE_HEIGHT * scale;
      // Align bottom ground to bottom of viewport
      const layerY = height - layerH;

      // Update Camera based on Mode
      if (mode === 'auto') {
        const autoVel = speed * 120 * direction;
        cameraX.current += autoVel * dt;
      } else if (mode === 'mouse') {
        // Critical damping spring interpolation toward cursor
        const target = mousePos.current.normalizedX * 600 * speed;
        targetCameraX.current = target;
        cameraX.current += (targetCameraX.current - cameraX.current) * (1 - Math.exp(-6 * dt));
      } else if (mode === 'story') {
        // Driven by story chapter scroll progression
        const target = storyScrollProgress * 3200;
        cameraX.current += (target - cameraX.current) * (1 - Math.exp(-7 * dt));
      } else if (mode === 'wanderer') {
        // Update Wanderer Physics
        const w = wanderer.current;
        const groundLevel = height - 90 * scale;

        const moveLeft = keysPressed.current['a'] || keysPressed.current['arrowleft'];
        const moveRight = keysPressed.current['d'] || keysPressed.current['arrowright'];

        const accel = 1800;
        const friction = 0.82;

        if (moveLeft) {
          w.vx -= accel * dt;
          w.direction = 'left';
          w.isMoving = true;
        } else if (moveRight) {
          w.vx += accel * dt;
          w.direction = 'right';
          w.isMoving = true;
        } else {
          w.vx *= friction;
          w.isMoving = Math.abs(w.vx) > 10;
        }

        // Clamp max horizontal wanderer speed
        const maxSpeed = 380;
        w.vx = Math.max(-maxSpeed, Math.min(maxSpeed, w.vx));
        w.x += w.vx * dt;

        // Gravity & Jump
        if (!w.isGrounded) {
          w.vy += 45 * 9.8 * dt; // gravity
          w.y += w.vy;
          if (w.y >= groundLevel) {
            w.y = groundLevel;
            w.vy = 0;
            w.isGrounded = true;
          }
        } else {
          w.y = groundLevel;
        }

        // Camera smoothly tracks wanderer
        const cameraDeadzoneX = width * 0.5;
        const wandererCameraTarget = w.x - cameraDeadzoneX;
        cameraX.current += (wandererCameraTarget - cameraX.current) * (1 - Math.exp(-8 * dt));

        onWandererMove?.(w.x, w.isMoving);
      }

      // Clear Canvas
      ctx.fillStyle = '#050b14';
      ctx.fillRect(0, 0, width, height);

      // If "useCombined" is active, render single composite image
      if (useCombined && combinedImageRef.current) {
        ctx.save();
        const rawX = cameraX.current * 0.5;
        let x = -(rawX % layerW);
        if (x > 0) x -= layerW;
        while (x < width) {
          ctx.drawImage(combinedImageRef.current, x, layerY, layerW, layerH);
          x += layerW;
        }
        ctx.restore();
      } else {
        // Render 10 Layers in exact depth order: 10 (back) down to 01 (front)
        // DEFAULT_LAYERS is ordered 10 -> 01
        for (let i = 0; i < layers.length; i++) {
          const layer = layers[i];
          if (!layer.enabled) continue;

          const img = imagesRef.current.get(layer.id);
          if (!img) continue;

          ctx.save();

          // Apply opacity (with special mist override)
          let currentOpacity = layer.opacity;
          if (layer.id === 1) {
            currentOpacity = mistOpacity;
          }

          // Luminescent particle pulsing for layers 3 and 5
          if (layer.id === 3 || layer.id === 5) {
            const pulse = 0.8 + 0.2 * Math.sin(currentTime * (layer.oscillationFreq || 0.002));
            currentOpacity *= pulse;
          }

          ctx.globalAlpha = Math.max(0, Math.min(1, currentOpacity));
          ctx.globalCompositeOperation = (layer.blendMode as GlobalCompositeOperation) || 'source-over';

          // Horizontal Parallax Wrap
          const rawX = cameraX.current * layer.speedFactor;
          let x = -(rawX % layerW);
          if (x > 0) x -= layerW;

          // Vertical Oscillation / Mist Floating Wave
          let yOffset = 0;
          if (layer.id === 1 && mistDrift) {
            // Mist sinusoidal floating wave + wind drift
            const wave = Math.sin(currentTime * 0.0008) * (layer.oscillationAmp || 18);
            yOffset = wave;
            // Additional subtle mist horizontal drift
            const driftX = (currentTime * 0.035) % layerW;
            x -= driftX;
            if (x > 0) x -= layerW;
          } else if (layer.oscillationAmp && layer.oscillationFreq) {
            yOffset = Math.sin(currentTime * layer.oscillationFreq) * layer.oscillationAmp;
          }

          // Draw seamless repeating tiles across entire screen width
          while (x < width) {
            ctx.drawImage(img, Math.floor(x), Math.floor(layerY + yOffset), Math.ceil(layerW), Math.ceil(layerH));
            x += layerW;
          }

          ctx.restore();
        }
      }

      // Render Wanderer Sprite in Mode D
      if (mode === 'wanderer') {
        ctx.save();
        const w = wanderer.current;
        const screenX = w.x - cameraX.current;
        const screenY = w.y;

        // Shadow on forest floor
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.beginPath();
        ctx.ellipse(screenX, screenY + 4, 18, 5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Draw Stylized Bioluminescent Wanderer Silhouette
        ctx.save();
        ctx.translate(screenX, screenY);
        if (w.direction === 'left') {
          ctx.scale(-1, 1);
        }

        // Bobbing animation when walking
        const walkBob = w.isMoving && w.isGrounded ? Math.sin(currentTime * 0.018) * 3 : 0;

        // Flowing Cloak / Body
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.moveTo(-10, -4 - walkBob);
        ctx.lineTo(8, -4 - walkBob);
        ctx.lineTo(14, -38 - walkBob);
        ctx.lineTo(-12, -36 - walkBob);
        ctx.closePath();
        ctx.fill();

        // Glowing Hood / Scarf
        ctx.fillStyle = '#0284c7';
        ctx.beginPath();
        ctx.arc(2, -44 - walkBob, 9, 0, Math.PI * 2);
        ctx.fill();

        // Bioluminescent Lantern / Staff
        const lanternGlow = 14 + Math.sin(currentTime * 0.005) * 4;
        const radGrad = ctx.createRadialGradient(16, -24 - walkBob, 2, 16, -24 - walkBob, lanternGlow);
        radGrad.addColorStop(0, 'rgba(56, 189, 248, 0.95)');
        radGrad.addColorStop(0.4, 'rgba(56, 189, 248, 0.4)');
        radGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');

        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(16, -24 - walkBob, lanternGlow, 0, Math.PI * 2);
        ctx.fill();

        // Staff stick
        ctx.strokeStyle = '#78350f';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(16, -walkBob);
        ctx.lineTo(16, -34 - walkBob);
        ctx.stroke();

        ctx.restore();
        ctx.restore();
      }

      // Render Ambient Fireflies / Floating Spores
      if (ambientParticles.current.length > 0) {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        for (const p of ambientParticles.current) {
          p.x += p.vx - (cameraX.current * 0.0005);
          p.y += p.vy;
          p.alpha += p.pulseSpeed;
          if (p.alpha > p.maxAlpha || p.alpha < 0.1) {
            p.pulseSpeed = -p.pulseSpeed;
          }

          // Wrap boundaries
          if (p.y < 0) p.y = height;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;

          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // Render Weather Rain Streaks
      if (weatherRain && rainDrops.current.length > 0) {
        ctx.save();
        ctx.strokeStyle = 'rgba(186, 230, 253, 0.45)';
        ctx.lineWidth = 1.2;
        for (const drop of rainDrops.current) {
          drop.y += drop.speed;
          drop.x -= 4; // slight wind slant
          if (drop.y > height) {
            drop.y = -drop.length;
            drop.x = Math.random() * (width + 400);
          }
          ctx.beginPath();
          ctx.moveTo(drop.x, drop.y);
          ctx.lineTo(drop.x - 3, drop.y + drop.length);
          ctx.stroke();
        }
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [
    isLoaded,
    layers,
    mode,
    speed,
    direction,
    mistOpacity,
    mistDrift,
    weatherRain,
    useCombined,
    storyScrollProgress,
    onFpsUpdate,
    onWandererMove
  ]);

  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-slate-950">
      {/* Loading Screen */}
      {!isLoaded && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-sky-200">
          <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-sky-500/20 border-t-sky-400 animate-spin" />
            <span className="text-2xl">🌲</span>
          </div>
          <h2 className="text-xl font-medium tracking-wide text-white mb-2">
            Loading Parallax Forest Ecosystem
          </h2>
          <p className="text-sm text-sky-300/70 mb-4">
            Preloading 10 high-resolution seamless depth layers...
          </p>
          <div className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-teal-400 transition-all duration-200 rounded-full"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <span className="text-xs font-mono text-sky-400 mt-2">{loadProgress}%</span>
        </div>
      )}

      {/* Main Parallax Canvas with Dynamic Lighting CSS Filter */}
      <canvas
        ref={canvasRef}
        className="block w-full h-full cursor-grab active:cursor-grabbing transition-[filter] duration-700"
        style={{
          filter: LIGHTING_PRESETS[lighting].filter
        }}
      />
    </div>
  );
};
