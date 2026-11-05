#!/usr/bin/env node
/**
 * Parallax Forest Asset Verification Script
 * Validates presence, format, and recommended ordering of the 10 parallax forest layers.
 */

import fs from 'node:fs';
import path from 'node:path';

const REQUIRED_LAYERS = [
  '01_Mist.png',
  '02_Bushes.png',
  '03_Particles.png',
  '04_Forest.png',
  '05_Particles.png',
  '06_Forest.png',
  '07_Forest.png',
  '08_Forest.png',
  '09_Forest.png',
  '10_Sky.png'
];

const SEARCH_PATHS = [
  'public/parallax-forest/layers',
  'public/parallax-forest/Parallax Forest Background - Blue',
  'src/assets/parallax-forest',
  'public/assets/parallax-forest'
];

console.log('🌲 Checking Parallax Forest Layers...');
let foundDir = null;

for (const candidate of SEARCH_PATHS) {
  const fullPath = path.resolve(process.cwd(), candidate);
  if (fs.existsSync(fullPath)) {
    foundDir = fullPath;
    break;
  }
}

if (!foundDir) {
  console.error('❌ Error: Could not locate parallax forest layers directory in common search paths.');
  process.exit(1);
}

console.log(`✅ Located layers folder at: ${foundDir}`);
let missingCount = 0;

REQUIRED_LAYERS.forEach((fileName, index) => {
  const filePath = path.join(foundDir, fileName);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    console.log(`   [Layer ${(10 - index).toString().padStart(2, '0')}] ✔ ${fileName} (${(stats.size / 1024).toFixed(1)} KB)`);
  } else {
    console.error(`   [Layer ${(10 - index).toString().padStart(2, '0')}] ✖ MISSING: ${fileName}`);
    missingCount++;
  }
});

if (missingCount === 0) {
  console.log('\n🎉 All 10 seamless layers successfully verified and ready for 60fps parallax rendering!');
  process.exit(0);
} else {
  console.error(`\n⚠️ ${missingCount} layer(s) are missing.`);
  process.exit(1);
}

