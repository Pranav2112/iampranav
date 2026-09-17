export type AnimationName = 'idle' | 'walk' | 'run' | 'jump' | 'sit' | 'blink' | 'look';

export interface FrameData {
  src: string;
  width: number;
  height: number;
}

export interface AnimationData {
  frames: FrameData[];
  fps: number;
  loop: boolean;
  footOffset: number;
}

export type MascotManifest = Record<AnimationName, AnimationData>;

// Hero mascot state machine
export type MascotPhase =
  | 'hidden'
  | 'peek'
  | 'walk'
  | 'run'
  | 'jump'
  | 'land'
  | 'sit'
  | 'idle';

export interface HeroGeometry {
  /** hero section bounding rect */
  hero: DOMRect;
  /** V letter bounding rect */
  vLetter: DOMRect;
  /** index of each letter bounding rect (order: P R A N A V) */
  letters: DOMRect[];
}
