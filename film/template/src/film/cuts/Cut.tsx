import React from 'react';
import { useCurrentFrame } from 'remotion';
import { FilmAt } from '../Film';
import { FPS, sec } from '../time';
import { FULL } from './full';

/**
 * A cut is one version of the film, written as a list of segments played in order:
 * - a stretch of the master take, `{ from, to }` in master seconds, optionally faster or slower (`speed`);
 * - or a scene that exists only in this cut, `{ scene, seconds }`, given its own local time from 0.
 * Shared scenes are written once (film/scenes); a cut only says what plays when. For example, a short cut:
 *   [{ from: 0, to: 7.5 }, { from: 7.6, to: 12, speed: 1.2 }, { scene: PartnerAsk, seconds: 5 }, { from: 15.8, to: MASTER_SECONDS }]
 * To add one: write cuts/<name>.ts, list it in CUTS below, and register a <Composition> for it in Root.tsx.
 */
export type Segment = { from: number; to: number; speed?: number } | { scene: React.FC<{ t: number }>; seconds: number };
export type CutDef = Segment[];

const length = (s: Segment) => ('scene' in s ? s.seconds : (s.to - s.from) / (s.speed ?? 1));
export const cutSeconds = (cut: CutDef) => cut.reduce((a, s) => a + length(s), 0);
export const cutFrames = (cut: CutDef) => Math.round(cutSeconds(cut) * FPS);

/** Every cut, by the id Studio passes in. */
export const CUTS = { full: FULL } satisfies Record<string, CutDef>;
export type CutId = keyof typeof CUTS;

export const Cut: React.FC<{ cut: CutId }> = ({ cut }) => {
  let t = sec(useCurrentFrame());
  const segments = CUTS[cut];
  for (const s of segments) {
    const len = length(s);
    if (t < len || s === segments[segments.length - 1]) {
      if ('scene' in s) return <s.scene t={t} />;
      return <FilmAt t={s.from + t * (s.speed ?? 1)} />;
    }
    t -= len;
  }
  return null;
};
