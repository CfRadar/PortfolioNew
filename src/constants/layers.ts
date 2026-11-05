import type { LayerConfig, LightingConfig, LightingPreset } from '../types/parallax';

export const DEFAULT_LAYERS: LayerConfig[] = [
  {
    id: 10,
    name: '10 Sky Gradient',
    filename: '10_Sky.png',
    src: '/parallax-forest/layers/10_Sky.png',
    speedFactor: 0.02,
    opacity: 1.0,
    blendMode: 'source-over',
    enabled: true,
    description: 'Celestial deep gradient background horizon.'
  },
  {
    id: 9,
    name: '09 Horizon Forest',
    filename: '09_Forest.png',
    src: '/parallax-forest/layers/09_Forest.png',
    speedFactor: 0.08,
    opacity: 1.0,
    blendMode: 'source-over',
    enabled: true,
    description: 'Farthest silhouette ridges fading into horizon haze.'
  },
  {
    id: 8,
    name: '08 Far Forest',
    filename: '08_Forest.png',
    src: '/parallax-forest/layers/08_Forest.png',
    speedFactor: 0.18,
    opacity: 1.0,
    blendMode: 'source-over',
    enabled: true,
    description: 'Distant rolling tree lines with atmospheric scatter.'
  },
  {
    id: 7,
    name: '07 Distant Ridge',
    filename: '07_Forest.png',
    src: '/parallax-forest/layers/07_Forest.png',
    speedFactor: 0.30,
    opacity: 1.0,
    blendMode: 'source-over',
    enabled: true,
    description: 'Mid-distant forest tier creating mountain depth.'
  },
  {
    id: 6,
    name: '06 Midground Forest',
    filename: '06_Forest.png',
    src: '/parallax-forest/layers/06_Forest.png',
    speedFactor: 0.45,
    opacity: 1.0,
    blendMode: 'source-over',
    enabled: true,
    description: 'Dense wilderness trees and deep woodland foliage.'
  },
  {
    id: 5,
    name: '05 Mid Particles',
    filename: '05_Particles.png',
    src: '/parallax-forest/layers/05_Particles.png',
    speedFactor: 0.55,
    opacity: 0.75,
    blendMode: 'screen',
    enabled: true,
    oscillationAmp: 6,
    oscillationFreq: 0.0015,
    description: 'Subtle glowing spores drifting in mid-depth.'
  },
  {
    id: 4,
    name: '04 Foreground Forest',
    filename: '04_Forest.png',
    src: '/parallax-forest/layers/04_Forest.png',
    speedFactor: 0.70,
    opacity: 1.0,
    blendMode: 'source-over',
    enabled: true,
    description: 'High-detail close tree trunks and overhead mossy branches.'
  },
  {
    id: 3,
    name: '03 Near Fireflies',
    filename: '03_Particles.png',
    src: '/parallax-forest/layers/03_Particles.png',
    speedFactor: 0.85,
    opacity: 0.90,
    blendMode: 'screen',
    enabled: true,
    oscillationAmp: 12,
    oscillationFreq: 0.002,
    description: 'Bright bioluminescent fireflies dancing near camera.'
  },
  {
    id: 2,
    name: '02 Foreground Bushes',
    filename: '02_Bushes.png',
    src: '/parallax-forest/layers/02_Bushes.png',
    speedFactor: 1.00,
    opacity: 1.0,
    blendMode: 'source-over',
    enabled: true,
    description: 'Crisp foreground shrubbery and roots providing frame occlusion.'
  },
  {
    id: 1,
    name: '01 Atmospheric Mist',
    filename: '01_Mist.png',
    src: '/parallax-forest/layers/01_Mist.png',
    speedFactor: 1.15,
    opacity: 0.45, // Recommended in ReadMe.txt to keep opacity low
    blendMode: 'screen',
    enabled: true,
    oscillationAmp: 18,
    oscillationFreq: 0.001,
    description: 'Low-hanging volumetric fog drifting over the forest floor.'
  }
];

export const LIGHTING_PRESETS: Record<LightingPreset, LightingConfig> = {
  night: {
    id: 'night',
    name: 'Midnight Azure',
    description: 'Original tranquil moonlit forest in azure indigo tones.',
    filter: 'none',
    ambientColor: '#0a1128',
    accentColor: '#38bdf8'
  },
  twilight: {
    id: 'twilight',
    name: 'Twilight Dusk',
    description: 'Warm sunset radiance casting golden rays across the canopy.',
    filter: 'hue-rotate(-42deg) saturate(1.4) brightness(0.96) contrast(1.05)',
    ambientColor: '#2b1020',
    accentColor: '#fb923c'
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Grove',
    description: 'Bioluminescent enchanted fae forest with glowing jade moss.',
    filter: 'hue-rotate(85deg) saturate(1.3) brightness(1.02)',
    ambientColor: '#062419',
    accentColor: '#34d399'
  },
  crimson: {
    id: 'crimson',
    name: 'Crimson Eclipse',
    description: 'Mystic blood moon casting intense crimson and violet shadows.',
    filter: 'hue-rotate(150deg) saturate(1.6) brightness(0.88) contrast(1.15)',
    ambientColor: '#290714',
    accentColor: '#f43f5e'
  },
  frost: {
    id: 'frost',
    name: 'Silver Frost',
    description: 'Crisp silver moonlight amidst quiet winter stillness.',
    filter: 'saturate(0.2) brightness(0.85) contrast(1.2)',
    ambientColor: '#0d1520',
    accentColor: '#cbd5e1'
  }
};
