#!/usr/bin/env node
/**
 * Mascot Asset Processor
 *
 * Reads sprite sheets from public/mascot/source/
 * Outputs individual cropped frame PNGs to public/mascot/frames/<animation>/
 * Generates public/mascot/manifest.json (loaded at runtime by the React components)
 *
 * Usage:
 *   node scripts/process-mascot-assets.mjs
 *
 * Re-run whenever source sheets change. Processed frames are git-ignored (large).
 * The manifest.json IS checked in so TypeScript can import it statically.
 *
 * SHEET CONFIG — adjust if the artwork changes:
 *   cols × frameW must equal total image width exactly.
 *   rows × frameH must equal total image height exactly.
 *   frameCount <= cols × rows (skip trailing empty cells if needed).
 *   contentY / contentH crop the sprite within the frame (remove empty padding rows).
 */

import sharp from 'sharp';
import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT      = join(__dirname, '..');
const SRC       = join(ROOT, 'public/mascot/source');
const OUT       = join(ROOT, 'public/mascot/frames');
const MANIFEST  = join(ROOT, 'public/mascot/manifest.json');

// ─── Sheet definitions ────────────────────────────────────────────────────────
// Two extraction modes:
//   A) cols/frameW mode (uniform grid): cols × frameW must equal sheet width exactly.
//   B) frameBoundaries mode: array of x-positions where each frame starts.
//      The end of frame[i] = frameBoundaries[i+1] (last frame ends at sheet width).
//      frameH is the full sheet height (used as contentH if contentH not set).
//
// contentY / contentH: optional row crop within each frame (removes transparent padding rows).
// footOffset: rows from the BOTTOM of the OUTPUT frame to the character's feet.
const SHEETS = {
  idle: {
    file: 'idle-sheet.png',
    // 1774×887, 6 characters at ~297px each (measured from content regions)
    frameBoundaries: [0, 301, 598, 896, 1189, 1486, 1774],
    frameH: 887,
    frameCount: 6,
    fps: 4, loop: true,
    footOffset: 0,
    removeBg: true,
  },
  walk: {
    file: 'walk-sheet.png',
    cols: 6, rows: 1, frameW: 256, frameH: 1024,
    frameCount: 6,
    contentY: 130, contentH: 760,
    fps: 10, loop: true,
    footOffset: 0,
  },
  run: {
    file: 'run-sheet.png',
    // 1804×872, 8 characters measured from content regions
    frameBoundaries: [0, 245, 457, 687, 870, 1119, 1337, 1545, 1804],
    frameH: 872,
    frameCount: 8,
    fps: 14, loop: true,
    footOffset: 0,
    removeBg: true,
  },
  jump: {
    file: 'jump-sheet.png',
    // 1774×887, 6 frames: prep → crouch → takeoff → peak → fall → land
    frameBoundaries: [0, 275, 582, 895, 1171, 1477, 1774],
    frameH: 887,
    frameCount: 6,
    fps: 10, loop: false,
    footOffset: 0,
    removeBg: true,
  },
  sit: {
    file: 'sit-sheet.png',
    cols: 6, rows: 1, frameW: 256, frameH: 1024,
    frameCount: 6,
    contentY: 125, contentH: 805,
    fps: 5, loop: true,
    footOffset: 0,
  },
  blink: {
    file: 'blink-sheet.png',
    // 1774×887, 5 frames: open → squinting → closed → squinting → open
    frameBoundaries: [0, 364, 710, 1056, 1404, 1774],
    frameH: 887,
    frameCount: 5,
    fps: 12, loop: false,
    footOffset: 0,
    removeBg: true,
  },
  look: {
    file: 'head-direction-sheet.png',
    // 1774×887, 4 chars: look-left, slightly-left, look-right, slightly-right
    frameBoundaries: [0, 463, 886, 1305, 1774],
    frameH: 887,
    frameCount: 4,
    fps: 8, loop: false,
    footOffset: 0,
    removeBg: true,
  },
};

// Maximum output height in px (scales proportionally). Retina quality at ~150px display height.
const MAX_OUT_HEIGHT = 320;

// ─── Background removal (flood-fill from corners) ─────────────────────────────
// Removes solid backgrounds from raster sprites that lack transparency.
// Uses BFS from all four corners; stops at the first pixel whose color differs
// from the corner colour by more than `threshold` in Euclidean RGB distance.
function removeBgFromRaw(data, width, height, channels, threshold = 28) {
  // Sample the background colour from the top-left corner.
  const bgR = data[0], bgG = data[1], bgB = data[2];

  const visited = new Uint8Array(width * height);
  // Start BFS from all four corners so we catch any framing around the sprite.
  const queue = [0, width - 1, width * (height - 1), width * height - 1];
  queue.forEach(idx => (visited[idx] = 1));

  for (let qi = 0; qi < queue.length; qi++) {
    const idx = queue[qi];
    const x = idx % width;
    const y = Math.floor(idx / width);
    const pi = idx * channels;

    const r = data[pi], g = data[pi + 1], b = data[pi + 2];
    const dist = Math.sqrt((r - bgR) ** 2 + (g - bgG) ** 2 + (b - bgB) ** 2);
    if (dist > threshold) continue;   // hit character edge — don't erase

    data[pi + 3] = 0;                  // make transparent

    const neighbours = [];
    if (x > 0)          neighbours.push(idx - 1);
    if (x < width - 1)  neighbours.push(idx + 1);
    if (y > 0)          neighbours.push(idx - width);
    if (y < height - 1) neighbours.push(idx + width);

    for (const n of neighbours) {
      if (!visited[n]) { visited[n] = 1; queue.push(n); }
    }
  }
}

// ─── Process ──────────────────────────────────────────────────────────────────

const manifest = {};

for (const [name, cfg] of Object.entries(SHEETS)) {
  const srcPath = join(SRC, cfg.file);
  const outDir  = join(OUT, name);

  if (!existsSync(srcPath)) {
    console.warn(`  SKIP ${name}: source not found at ${srcPath}`);
    continue;
  }

  mkdirSync(outDir, { recursive: true });
  console.log(`Processing ${name} (${cfg.frameCount} frames)…`);

  const outH = cfg.contentH ?? cfg.frameH;
  const cropY = cfg.contentY ?? 0;

  const frames = [];

  for (let i = 0; i < cfg.frameCount; i++) {
    let srcX, srcFrameW;
    if (cfg.frameBoundaries) {
      srcX = cfg.frameBoundaries[i];
      srcFrameW = cfg.frameBoundaries[i + 1] - srcX;
    } else {
      const col = i % cfg.cols;
      const row = Math.floor(i / cfg.cols);
      srcX = col * cfg.frameW;
      srcFrameW = cfg.frameW;
    }
    const srcY = cropY;

    const outName = `${String(i).padStart(2, '0')}.png`;
    const outPath = join(outDir, outName);

    // Scale down if taller than MAX_OUT_HEIGHT
    const scale = Math.min(1, MAX_OUT_HEIGHT / outH);
    const scaledW = Math.round(srcFrameW * scale);
    const scaledH = Math.round(outH * scale);

    if (cfg.removeBg) {
      // Read raw pixels, flood-fill background, write back.
      const { data, info } = await sharp(srcPath)
        .extract({ left: srcX, top: srcY, width: srcFrameW, height: outH })
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

      removeBgFromRaw(data, info.width, info.height, info.channels);

      await sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } })
        .resize(scaledW, scaledH, { kernel: 'lanczos3' })
        .png({ compressionLevel: 7 })
        .toFile(outPath);
    } else {
      await sharp(srcPath)
        .extract({ left: srcX, top: srcY, width: srcFrameW, height: outH })
        .resize(scaledW, scaledH, { kernel: 'lanczos3' })
        .png({ compressionLevel: 7 })
        .toFile(outPath);
    }

    frames.push({
      src: `/mascot/frames/${name}/${outName}`,
      width: scaledW,
      height: scaledH,
    });

    process.stdout.write(`  frame ${i + 1}/${cfg.frameCount}\r`);
  }
  console.log(`  ✓ ${cfg.frameCount} frames → public/mascot/frames/${name}/`);

  manifest[name] = {
    frames,
    fps: cfg.fps,
    loop: cfg.loop,
    footOffset: cfg.footOffset,
  };
}

writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
console.log(`\n✓ manifest written → public/mascot/manifest.json`);
