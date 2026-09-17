'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import MascotSprite from './MascotSprite';
import { MANIFEST } from '@/lib/mascot/manifest';
import { measureHeroGeometry, toHeroLocal } from '@/lib/mascot/geometry';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { MascotPhase, AnimationName } from '@/lib/mascot/types';

gsap.registerPlugin(useGSAP);

interface HeroMascotProps {
  heroRef: React.RefObject<HTMLElement | null>;
  letterRefs: React.RefObject<(HTMLSpanElement | null)[]>;
}

const DISPLAY_HEIGHT = 130;
const STATUS_BAR_H = 56;

// Barlow Condensed 900: the line-box top sits above the visual cap-top by roughly
// 28–30% of the span height. We add this offset so the mascot's feet land on (or
// just inside) the visual top of the 'V' glyph rather than floating above it.
const GLYPH_LEADING_RATIO = 0.28; // fraction of span height above cap-top
const SEAT_OVERLAP_PX = 18;       // extra px the mascot overlaps INTO the letter top

function seatYFor(v: { y: number; height: number }, displayH: number) {
  const glyphTopOffset = v.height * GLYPH_LEADING_RATIO;
  return v.y + glyphTopOffset - displayH + SEAT_OVERLAP_PX;
}

export default function HeroMascot({ heroRef, letterRefs }: HeroMascotProps) {
  const reducedMotion = useReducedMotion();
  const mascotRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<MascotPhase>('hidden');
  const [currentAnim, setCurrentAnim] = useState<AnimationName>('idle');
  const [flipX, setFlipX] = useState(false);
  const [visible, setVisible] = useState(false);
  // null = animate normally; number = freeze on that frame index
  const [lookFrame, setLookFrame] = useState<number | null>(null);

  const cursorXRef = useRef(0.5); // 0–1 across hero width
  const lookTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const seatedRef = useRef(false);

  // ── Cursor tracking ──────────────────────────────────────────────────────────
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      cursorXRef.current = (e.clientX - r.left) / r.width;
    };
    hero.addEventListener('mousemove', onMove, { passive: true });
    return () => hero.removeEventListener('mousemove', onMove);
  }, [heroRef]);

  // ── Reduced-motion: jump straight to seated state ────────────────────────────
  useEffect(() => {
    if (!reducedMotion) return;
    setVisible(true);
    setCurrentAnim('sit');
    setPhase('sit');

    const t = setTimeout(() => {
      const hero = heroRef.current;
      const letters = letterRefs.current;
      if (!hero || !letters || !mascotRef.current) return;
      const geo = measureHeroGeometry(hero, letters);
      if (!geo) return;
      const v = toHeroLocal(geo.vLetter, geo.hero);
      const sx = v.x + v.width / 2 - DISPLAY_HEIGHT * 0.3;
      const sy = seatYFor(v, DISPLAY_HEIGHT);
      gsap.set(mascotRef.current, { x: sx, y: sy, opacity: 1 });
    }, 200);

    return () => clearTimeout(t);
  }, [reducedMotion, heroRef, letterRefs]);

  // ── Idle loop: random blink + subtle cursor-look ────────────────────────────
  const lookIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startIdleLoop = useCallback(() => {
    seatedRef.current = true;

    // Cursor look — check every 800ms; only switch look frame, stay on 'sit' anim
    lookIntervalRef.current = setInterval(() => {
      if (!seatedRef.current) return;
      const cx = cursorXRef.current;
      // Only react to cursor at the edges; center = neutral
      if (cx < 0.35) {
        setCurrentAnim('look');
        setLookFrame(0);  // frame 0 = looking left
      } else if (cx > 0.65) {
        setCurrentAnim('look');
        setLookFrame(2);  // frame 2 = looking right
      } else {
        setCurrentAnim('sit');
        setLookFrame(null);
      }
    }, 800);

    // Random blink
    const scheduleBlink = () => {
      const delay = 3500 + Math.random() * 5000;
      lookTimerRef.current = setTimeout(() => {
        if (!seatedRef.current) return;
        setCurrentAnim('blink');
        setLookFrame(null);
        setTimeout(() => {
          if (seatedRef.current) {
            setCurrentAnim('sit');
            scheduleBlink();
          }
        }, 380);
      }, delay);
    };
    scheduleBlink();
  }, []);

  useEffect(() => {
    return () => {
      seatedRef.current = false;
      if (lookTimerRef.current) clearTimeout(lookTimerRef.current);
      if (lookIntervalRef.current) clearInterval(lookIntervalRef.current);
    };
  }, []);

  const activeTlRef = useRef<gsap.core.Timeline | null>(null);
  // One-shot lock: set to true once the PEEK tween STARTS playing.
  // Any later invocations of runSequence (from Strict Mode / dep changes) are ignored.
  const seqFiredRef = useRef(false);

  // ── Main entrance sequence ───────────────────────────────────────────────────
  const runSequence = useCallback(() => {
    // Guard: only one sequence at a time.
    if (seqFiredRef.current) return;
    seqFiredRef.current = true;

    const hero = heroRef.current;
    const letters = letterRefs.current;
    const el = mascotRef.current;
    if (!hero || !letters || !el) { seqFiredRef.current = false; return; }

    // Kill any stale tween that may have been left by a previous (killed) attempt.
    activeTlRef.current?.kill();
    gsap.killTweensOf(el);
    letters.forEach(s => s && gsap.killTweensOf(s));

    const geo = measureHeroGeometry(hero, letters);
    if (!geo) return;

    const heroH = geo.hero.height;
    const v = toHeroLocal(geo.vLetter, geo.hero);
    const allLetters = geo.letters.map(r => toHeroLocal(r, geo.hero));


    // Walk floor: feet at PRANAV text baseline (v.bottom)
    const floorY = v.bottom - DISPLAY_HEIGHT;

    // Seat: feet touching the visual top of the 'V' glyph
    const sx = v.x + v.width / 2 - DISPLAY_HEIGHT * 0.28;
    const sy = seatYFor(v, DISPLAY_HEIGHT);

    // Start just past portrait's right edge
    const startX = geo.hero.width * 0.43;

    // Clamp so walk and run always move rightward toward V.
    // At narrow viewports the gap from startX to V may be small, so we adapt.
    const rawRunEnd = v.x - 65;
    const runEndX = Math.max(startX + 15, rawRunEnd);
    // Walk covers everything except the last 90px sprint; never go left of startX.
    const walkEndX = Math.max(startX, runEndX - 90);
    const walkDist = walkEndX - startX;
    // Scale walk duration to actual distance (80px/s); minimum 0.15s to play at least one cycle.
    const walkDuration = walkDist > 10 ? Math.max(0.5, walkDist / 80) : 0.15;

    const tl = gsap.timeline();
    activeTlRef.current = tl;

    // 1. PEEK — appear at portrait edge, walking height
    tl.set(el, { x: startX - 30, y: floorY, opacity: 0, scaleX: 1, scaleY: 1 });
    tl.to(el, {
      opacity: 1, x: startX, duration: 0.4, ease: 'power2.out',
      onStart: () => {
        setVisible(true);
        setPhase('peek');
        setCurrentAnim('idle');
        setFlipX(false);
      },
    });

    // 2. WALK
    tl.to(el, {
      x: walkEndX, duration: walkDuration, ease: 'none',
      onStart: () => { setPhase('walk'); setCurrentAnim('walk'); },
    });

    // 3. RUN — accelerate
    tl.to(el, {
      x: runEndX, duration: 0.45, ease: 'power2.in',
      onStart: () => { setPhase('run'); setCurrentAnim('run'); },
    });

    // 4. JUMP — parabolic arc (x linear, y arc)
    const arcHeight = Math.abs(floorY - sy) + 80; // jump higher than seat
    tl.to(el, {
      x: sx, duration: 0.5, ease: 'none',
      onStart: () => { setPhase('jump'); setCurrentAnim('jump'); },
    });
    tl.to(el, { y: sy - arcHeight, duration: 0.22, ease: 'power2.out' }, '<');
    tl.to(el, { y: sy, duration: 0.28, ease: 'power2.in' });

    // 5. LAND — squash/stretch impact
    tl.to(el, {
      scaleY: 0.72, scaleX: 1.3, duration: 0.06, ease: 'power2.out',
      onStart: () => setPhase('land'),
    });
    tl.to(el, { scaleY: 1.12, scaleX: 0.9, duration: 0.1, ease: 'power2.out' });
    tl.to(el, { scaleY: 1, scaleX: 1, duration: 0.18, ease: 'elastic.out(1, 0.5)' });

    // 6. LETTER BOUNCE — V bends hardest, ripples outward
    const bounceOrder = [5, 4, 3, 2, 1, 0]; // V first
    const strengths =   [1, 0.6, 0.35, 0.2, 0.1, 0.05];
    const landTime = tl.duration();

    bounceOrder.forEach((li, i) => {
      const span = allLetters[li] ? letterRefs.current?.[li] : null;
      if (!span) return;
      const d = landTime + i * 0.055;
      const amp = 30 * strengths[i];
      gsap.to(span, { y: -amp, duration: 0.15, ease: 'power2.out', delay: d });
      gsap.to(span, { y: 0,    duration: 0.55, ease: 'elastic.out(1.2, 0.4)', delay: d + 0.15 });
    });

    // 7. SIT
    tl.call(() => {
      setCurrentAnim('sit');
      setPhase('sit');
    }, [], '+=0.25');

    // 8. Start idle + cursor loop
    tl.call(() => startIdleLoop(), [], '+=0.4');

    // Clamp mascot within hero vertically (safety — hero has overflow:hidden)
    void heroH;
  }, [heroRef, letterRefs, startIdleLoop]);

  // ── Trigger after hero entrance animation settles ────────────────────────────
  // Plain useEffect (not useGSAP) so the GSAP context is NOT wrapped in a revertible
  // scope — if useGSAP with scope re-fires, it reverts all transforms to (0,0).
  useEffect(() => {
    if (reducedMotion) return;
    seqFiredRef.current = false;
    const id = window.setTimeout(() => {
      document.fonts.ready.then(() =>
        requestAnimationFrame(() => runSequence())
      );
    }, 2000);
    return () => {
      window.clearTimeout(id);
      seqFiredRef.current = false;
      activeTlRef.current?.kill();
    };
  }, [reducedMotion, runSequence]);

  // Single render path — mascotRef div is always mounted so GSAP can target it
  const animData = MANIFEST[currentAnim];

  return (
    <div
      ref={mascotRef}
      aria-hidden="true"
      role="presentation"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: visible ? undefined : 0,
        zIndex: 5,
        willChange: 'transform, opacity',
        pointerEvents: 'none',
      }}
    >
      <MascotSprite
        animation={animData}
        displayHeight={DISPLAY_HEIGHT}
        flipX={flipX}
        frameOverride={lookFrame ?? undefined}
      />
    </div>
  );
}
