import { Easing, interpolate } from 'remotion';

export const FPS = 60;

/** Seconds since the start of the take. Every value in a film is a pure function of this: no state, no CSS animation. */
export const sec = (frame: number) => frame / FPS;

const E = {
  out: Easing.bezier(0.16, 1, 0.3, 1), // arrive fast, settle long
  inOut: Easing.bezier(0.65, 0, 0.35, 1),
  in: Easing.bezier(0.5, 0, 0.75, 0),
  soft: Easing.bezier(0.37, 0, 0.63, 1),
  back: Easing.bezier(0.34, 1.56, 0.64, 1),
};
export type Ease = keyof typeof E;

/** Tween a value between two times (seconds), clamped. */
export const tw = (t: number, t0: number, t1: number, a: number, b: number, ease: Ease = 'out') =>
  interpolate(t, [t0, t1], [a, b], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: E[ease] });

/** 0 → 1 progress between two times. */
export const p = (t: number, t0: number, t1: number, ease: Ease = 'out') => tw(t, t0, t1, 0, 1, ease);

/** Fade in over t0..t0+d and out over t1-d..t1. */
export const life = (t: number, t0: number, t1: number, d = 0.4) => Math.min(p(t, t0, t0 + d, 'soft'), 1 - p(t, t1 - d, t1, 'soft'));
