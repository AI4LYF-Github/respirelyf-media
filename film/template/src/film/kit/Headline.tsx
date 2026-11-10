import React from 'react';
import { C, FACE, TYPE } from '../tokens';
import { p } from '../time';

/** A word that rises out of a baseline mask (the website's own entrance). */
const Word: React.FC<{ t: number; at: number; children: string }> = ({ t, at, children }) => {
  const k = p(t, at, at + 0.9);
  return (
    <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: '0.36em', marginBottom: '-0.36em', paddingRight: '0.06em', marginRight: '-0.06em' }}>
      <span style={{ display: 'inline-block', transform: `translateY(${(1 - k) * 160}%) rotate(${(1 - k) * 5}deg)`, transformOrigin: '0 100%' }}>{children}</span>
    </span>
  );
};

/**
 * Big two-beat film type: line one in ink, line two in the accent blue, same weight. It lands word by word between
 * t0 and t1 and leaves by receding, never by a hard cut.
 */
export const Headline: React.FC<{
  t: number;
  t0: number;
  t1: number;
  line1: string;
  line2?: string;
  gap?: number;
  x?: number;
  y?: number;
  align?: 'left' | 'center';
  size?: number;
}> = ({ t, t0, t1, line1, line2, gap = 0.55, x = 120, y = 640, align = 'left', size = 104 }) => {
  if (t < t0 - 0.05 || t > t1 + 0.6) return null;
  const leave = p(t, t1, t1 + 0.6, 'in');
  const words = (s: string, start: number) =>
    s.split(' ').map((w, i, a) => (
      <React.Fragment key={i}>
        <Word t={t} at={start + i * 0.06}>{w}</Word>
        {i < a.length - 1 ? ' ' : ''}
      </React.Fragment>
    ));
  const line: React.CSSProperties = { fontFamily: FACE.type, fontWeight: TYPE.weight, fontSize: size, lineHeight: 0.98, letterSpacing: TYPE.track };
  return (
    <div style={{ position: 'absolute', left: align === 'center' ? 0 : x, right: align === 'center' ? 0 : undefined, top: y, textAlign: align, opacity: 1 - leave, filter: `blur(${leave * 10}px)`, transform: `translateY(${-leave * 30}px) scale(${1 - leave * 0.04})`, transformOrigin: align === 'center' ? '50% 50%' : '0 50%' }}>
      <div style={{ ...line, color: C.ink }}>{words(line1, t0)}</div>
      {line2 ? <div style={{ ...line, color: C.accent }}>{words(line2, t0 + gap)}</div> : null}
    </div>
  );
};
