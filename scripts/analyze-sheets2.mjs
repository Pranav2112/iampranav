#!/usr/bin/env node
/**
 * Deeper frame analysis: scan both columns AND rows.
 * For sheets without transparent gutters, try common frame widths.
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

  // Per-column max alpha
  const colAlpha = new Uint8Array(W);
  // Per-row max alpha
  const rowAlpha = new Uint8Array(H);

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const a = data[(y * W + x) * CH + (CH - 1)];
      if (a > colAlpha[x]) colAlpha[x] = a;
      if (a > rowAlpha[y]) rowAlpha[y] = a;
    }
  }

  // Low-alpha row groups (< 15)
  const rowGroups = [];
  let inRun = false, runStart = 0;
  for (let y = 0; y < H; y++) {
    if (rowAlpha[y] < 15 && !inRun) { inRun = true; runStart = y; }
    if (rowAlpha[y] >= 15 && inRun) { inRun = false; rowGroups.push([runStart, y - 1]); }
  }
  if (inRun) rowGroups.push([runStart, H - 1]);

  const rowDividers = rowGroups.filter(([s, e]) => e - s > 2).map(([s, e]) => Math.round((s + e) / 2));

  // For no-gap sheets: check if standard frame widths evenly divide the image
  // (assuming frames are same width, no gutters)
  const factors = [];
  for (let f = 1; f <= 20; f++) {
    if (W % f === 0) factors.push(`${f}×${H}: ${W/f}×${H}px/frame`);
  }

  // Count opaque "runs" horizontally (segments where at least 1 row has alpha > 0)
  // Group consecutive non-transparent columns into blobs
  const colThresh = 5;
  const blobs = [];
  let bStart = -1;
  for (let x = 0; x < W; x++) {
    if (colAlpha[x] > colThresh && bStart === -1) bStart = x;
    if (colAlpha[x] <= colThresh && bStart !== -1) { blobs.push([bStart, x-1]); bStart = -1; }
  }
  if (bStart !== -1) blobs.push([bStart, W - 1]);

  console.log(`\n${file} (${W}×${H}):`);
  console.log(`  Row dividers: [${rowDividers.join(', ')}]`);
  if (rowDividers.length > 0) {
    const rowEdges = [0, ...rowDividers, H];
    const rowHeights = rowEdges.slice(1).map((e, i) => e - rowEdges[i]);
    console.log(`  Row heights:  [${rowHeights.join(', ')}]`);
  }
  console.log(`  Opaque column blobs: ${blobs.length} — widths: [${blobs.map(([s,e])=>e-s+1).join(', ')}]`);
  console.log(`  Possible col counts (W=${W}): [${factors.join(' | ')}]`);
}
