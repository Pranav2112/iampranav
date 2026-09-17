#!/usr/bin/env node
/**
 * Quick analysis: scan each sheet for fully-transparent vertical columns
 * to estimate frame boundaries.
 */
import sharp from 'sharp';
import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, '../public/mascot/source');

const files = readdirSync(SRC).filter(f => f.endsWith('.png'));

for (const file of files) {
  const src = join(SRC, file);
  const meta = await sharp(src).metadata();
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  const W = info.width, H = info.height, CH = info.channels;

  // For each column, find the max alpha value
  // A fully-transparent column (all alpha=0) likely marks a frame boundary or padding
  const colAlpha = new Float32Array(W);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const a = data[(y * W + x) * CH + (CH - 1)];
      if (a > colAlpha[x]) colAlpha[x] = a;
    }
  }

  // Find runs of low-alpha columns (< 10)
  const transparent = [];
  let inRun = false, runStart = 0;
  for (let x = 0; x < W; x++) {
    if (colAlpha[x] < 10 && !inRun) { inRun = true; runStart = x; }
    if (colAlpha[x] >= 10 && inRun) { inRun = false; transparent.push([runStart, x - 1]); }
  }
  if (inRun) transparent.push([runStart, W - 1]);

  // Find dividers (wide transparent runs, likely between frames)
  const dividers = transparent.filter(([s, e]) => e - s > 2).map(([s, e]) => Math.round((s + e) / 2));

  // Estimate frames from dividers
  const frameEdges = [0, ...dividers, W];
  const frameWidths = frameEdges.slice(1).map((e, i) => e - frameEdges[i]);

  console.log(`\n${file} (${W}×${H}):`);
  console.log(`  Dividers at x: [${dividers.join(', ')}]`);
  console.log(`  Frame widths:  [${frameWidths.join(', ')}]`);
  console.log(`  Estimated cols: ${dividers.length + 1}`);
}
