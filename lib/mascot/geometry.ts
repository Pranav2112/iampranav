import type { HeroGeometry } from './types';

/**
 * Measure all hero elements needed for mascot positioning.
 * Must be called AFTER the hero entrance animation completes (≥1.8s after mount).
 */
export function measureHeroGeometry(
  heroEl: HTMLElement,
  letterEls: (HTMLSpanElement | null)[],
): HeroGeometry | null {
  const hero = heroEl.getBoundingClientRect();
  const letters: DOMRect[] = [];

  for (const el of letterEls) {
    if (!el) return null;
    letters.push(el.getBoundingClientRect());
  }

  const vLetter = letters[5]; // 'V' is index 5 in PRANAV
  if (!vLetter) return null;

  return { hero, vLetter, letters };
}

/** Convert a viewport-space rect to hero-local coordinates (top-left origin). */
export function toHeroLocal(rect: DOMRect, hero: DOMRect) {
  return {
    x: rect.left - hero.left,
    y: rect.top - hero.top,
    right: rect.right - hero.left,
    bottom: rect.bottom - hero.top,
    width: rect.width,
    height: rect.height,
  };
}
