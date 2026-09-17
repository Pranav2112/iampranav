'use client';

import { useEffect, useRef, useCallback } from 'react';
import type { AnimationData } from '@/lib/mascot/types';

interface MascotSpriteProps {
  animation: AnimationData;
  /** Display height in px. Width scales proportionally. */
  displayHeight: number;
  /** Flip horizontally (facing left) */
  flipX?: boolean;
  /** If set, freeze on this frame index (disables RAF loop). */
  frameOverride?: number;
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
}

export default function MascotSprite({
  animation,
  displayHeight,
  flipX = false,
  frameOverride,
  className,
  style,
  onComplete,
}: MascotSpriteProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const frameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const completedRef = useRef(false);

  const { frames, fps, loop } = animation;
  const interval = 1000 / fps;

  const firstFrame = frames[0];
  const aspectRatio = firstFrame ? firstFrame.width / firstFrame.height : 1;
  const displayWidth = Math.round(displayHeight * aspectRatio);

  const tick = useCallback(
    (now: number) => {
      const elapsed = now - lastTimeRef.current;
      if (elapsed >= interval) {
        lastTimeRef.current = now - (elapsed % interval);
        const nextFrame = frameRef.current + 1;

        if (nextFrame >= frames.length) {
          if (loop) {
            frameRef.current = 0;
          } else {
            frameRef.current = frames.length - 1;
            if (!completedRef.current) {
              completedRef.current = true;
              onComplete?.();
            }
            return; // stop ticking
          }
        } else {
          frameRef.current = nextFrame;
        }

        if (imgRef.current && frames[frameRef.current]) {
          imgRef.current.src = frames[frameRef.current].src;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    },
    [frames, loop, interval, onComplete],
  );

  useEffect(() => {
    if (frameOverride !== undefined) {
      // Frozen frame — no animation loop
      if (imgRef.current && frames[frameOverride]) {
        imgRef.current.src = frames[frameOverride].src;
      }
      return;
    }

    frameRef.current = 0;
    completedRef.current = false;
    lastTimeRef.current = performance.now();

    if (imgRef.current && frames[0]) {
      imgRef.current.src = frames[0].src;
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animation, tick, frames, frameOverride]);

  if (!firstFrame) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={firstFrame.src}
      alt=""
      aria-hidden="true"
      draggable={false}
      width={displayWidth}
      height={displayHeight}
      className={className}
      style={{
        width: displayWidth,
        height: displayHeight,
        imageRendering: 'auto',
        transform: flipX ? 'scaleX(-1)' : undefined,
        pointerEvents: 'none',
        userSelect: 'none',
        ...style,
      }}
    />
  );
}
