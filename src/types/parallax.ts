export interface LayerConfig {
  id: number;
  name: string;
  filename: string;
  src: string;
  speedFactor: number; // Parallax depth coefficient (0 = static background, 1.0+ = rapid foreground)
  opacity: number;
  blendMode: GlobalCompositeOperation | 'normal' | 'screen' | 'lighten' | 'color-dodge';
  enabled: boolean;
  oscillationAmp?: number; // Sine wave vertical drift for mist & particles
  oscillationFreq?: number;
  description: string;
}

export type ParallaxMode = 'auto' | 'mouse' | 'story' | 'wanderer';

export type LightingPreset = 'night' | 'twilight' | 'emerald' | 'crimson' | 'frost';

export interface LightingConfig {
  id: LightingPreset;
  name: string;
  description: string;
  filter: string;
  ambientColor: string;
  accentColor: string;
}

export interface AudioSettings {
  masterVolume: number;
  muted: boolean;
  windVolume: number;
  cricketsVolume: number;
  chimesVolume: number;
}

export interface WandererState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  isGrounded: boolean;
  direction: 'left' | 'right';
  isMoving: boolean;
}

