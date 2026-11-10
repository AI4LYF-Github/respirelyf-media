import React from 'react';
import { Internals, Sequence, useCurrentFrame } from 'remotion';
import { FilmAt } from '../Film';
import { FPS, sec } from '../time';
import { FULL } from './full';

/**
 * A cut is one version of the film, written as a list of segments played in order:
 * - a stretch of the master take, `{ from, to }` in master seconds, optionally faster or slower (`speed`);
 * - or a scene that exists only in this cut, `{ scene, seconds }`, given its own local time from 0.
 * Every segment can carry a `name`: Studio's timeline then shows it as a labelled track, so a cut reads as its chapters
 * (Intro, Reveal, Coughs …). Split a long stretch into contiguous named segments; that changes nothing on screen.
 * Every shared scene stays in film/scenes; a cut only says what plays when. For example, a short cut:
 *   [{ name: 'Reveal', from: 0, to: 7.5 }, { name: 'Story', from: 7.6, to: 12, speed: 1.2 },
 *    { name: 'Partner ask', scene: PartnerAsk, seconds: 5 }, { name: 'End card', from: 15.8, to: MASTER_SECONDS }]
 * To add one: write cuts/<name>.ts, list it in CUTS below, and register a <Composition> for it in Root.tsx.
 */
export type Segment = ({ from: number; to: number; speed?: number } | { scene: React.FC<{ t: number }>; seconds: number }) & { name?: string };
export type CutDef = Segment[];

const length = (s: Segment) => ('scene' in s ? s.seconds : (s.to - s.from) / (s.speed ?? 1));
export const cutSeconds = (cut: CutDef) => cut.reduce((a, s) => a + length(s), 0);
export const cutFrames = (cut: CutDef) => Math.round(cutSeconds(cut) * FPS);

/** Every cut, by the id Studio passes in. */
export const CUTS = { full: FULL } satisfies Record<string, CutDef>;
export type CutId = keyof typeof CUTS;

/** One segment, inside its named Sequence: time is taken from the global frame, so splitting a stretch into named
 * segments never shifts a frame. */
const SegmentAt: React.FC<{ s: Segment; start: number; startFrame: number }> = ({ s, start, startFrame }) => {
  const local = sec(startFrame + useCurrentFrame()) - start;
  if ('scene' in s) return <s.scene t={local} />;
  return <FilmAt t={s.from + local * (s.speed ?? 1)} />;
};

export const Cut: React.FC<{ cut: CutId }> = ({ cut }) => {
  let start = 0;
  return (
    <>
      {CUTS[cut].map((s, i) => {
        const end = start + length(s);
        const from = Math.round(start * FPS);
        // Studio groups Sequences made on the same source line into one "+N" track; a source tag of their own gives each
        // chapter its own labelled row (it only affects Studio's timeline, never a frame)
        const seg = (
          <Sequence key={i} name={s.name ?? `Segment ${i + 1}`} from={from} durationInFrames={Math.max(1, Math.round(end * FPS) - from)} layout="none" {...{ [Internals.REMOTION_INTERNAL_STACK_PROP]: Internals.makeOriginalSourceStack({ fileName: `./src/film/cuts/${cut}.ts`, lineNumber: i + 1, columnNumber: 1 }) }}>
            <SegmentAt s={s} start={start} startFrame={from} />
          </Sequence>
        );
        start = end;
        return seg;
      })}
    </>
  );
};
