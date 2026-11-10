import React from 'react';
import { C, FACE } from '../tokens';
import { p, tw } from '../time';

/** Seconds after t0 for each beat of the reveal (taken from the product demo film). */
export const REVEAL = { lyf: 0.4, words0: 1.9, words1: 3.1, fold: 3.5, respire: 4.1, tm: 4.8, tagline: 4.9, leave: 6.0, end: 7.2 };

const RINGS = 16;

/** Breath rings drawing outward from the centre, as in the website's opening. `converge` 0 → 1 pulls them in. */
export const BreathRings: React.FC<{ t: number; t0: number; converge: number; opacity?: number }> = ({ t, t0, converge, opacity = 1 }) => {
  const scale = (1 + 0.035 * Math.sin((t - t0) * 1.6)) * (1 - converge * 0.82);
  return (
    <svg width={1920} height={1080} viewBox="-960 -540 1920 1080" style={{ position: 'absolute', inset: 0, opacity }}>
      <defs>
        <radialGradient id="aura" r="0.5">
          <stop offset="0" stopColor="#cfe6fb" stopOpacity={0.9} />
          <stop offset="1" stopColor="#cfe6fb" stopOpacity={0} />
        </radialGradient>
      </defs>
      <circle r={720 * scale} fill="url(#aura)" opacity={p(t, t0, t0 + 1.8, 'soft')} />
      {Array.from({ length: RINGS }, (_, i) => {
        const r = (110 + i * 34 + Math.pow(i, 1.6) * 6) * scale;
        const draw = p(t, t0 + 0.1 + i * 0.035, t0 + 1.5 + i * 0.035, 'out');
        return <ellipse key={i} rx={r * 1.18} ry={r} cx={Math.sin(i * 0.7) * 3} fill="none" stroke={C.brand} strokeWidth={1.6} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} opacity={(0.55 - i * 0.026) * (1 - converge * 0.4)} />;
      })}
    </svg>
  );
};

// "LYF" in deep blue with a light that sweeps across it
const gradientText: React.CSSProperties = {
  backgroundImage: 'linear-gradient(100deg, #1F5C99 0%, #1F5C99 38%, #7CC7F5 50%, #1F5C99 62%, #1F5C99 100%)',
  backgroundSize: '300% 100%',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
};

/** A run of characters that grows open from zero width, so neighbours slide apart instead of jumping. */
const Grow: React.FC<{ k: number; em: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ k, em, children, style }) => (
  <span style={{ display: 'inline-block', maxWidth: `${k * em}em`, overflow: 'hidden', verticalAlign: 'bottom', whiteSpace: 'nowrap', opacity: Math.min(1, k * 1.6), ...style }}>{children}</span>
);

/**
 * The brand reveal every film opens its product moment with: breath rings draw, "LYF" rises letter by letter, opens
 * into "Live Your Fullest", folds back, "Respire" arrives beside it with a gap, the ™ lands, and the tagline
 * "Live Your Fullest" writes in with its L·Y·F initials in deep blue. Then it lifts away (at t0 + REVEAL.leave).
 */
export const BrandReveal: React.FC<{ t: number; t0: number }> = ({ t, t0 }) => {
  if (t < t0 - 0.1 || t > t0 + REVEAL.end) return null;
  const at = (k: keyof typeof REVEAL) => t0 + REVEAL[k];
  const grow = p(t, at('words0'), at('words1'), 'inOut') * (1 - p(t, at('fold'), at('fold') + 0.55, 'inOut'));
  const respire = p(t, at('respire'), at('respire') + 0.8, 'inOut');
  const leave = p(t, at('leave'), at('leave') + 1.1, 'inOut');
  const size = tw(respire, 0, 1, 330, 200, 'inOut') * (1 - grow * 0.5) * (1 - leave * 0.55);
  // background-clip text does not reach transformed children, so every piece carries the gradient itself
  const g: React.CSSProperties = { ...gradientText, backgroundPosition: `${tw(t, at('lyf') + 0.6, at('words0') + 0.3, 100, 0, 'inOut')}% 0` };
  const letter = (ch: string, i: number) => {
    const k = p(t, at('lyf') + i * 0.13, at('lyf') + 1.2 + i * 0.13);
    return <span style={{ ...g, display: 'inline-block', transform: `translateY(${(1 - k) * 70}%)`, opacity: k }}>{ch}</span>;
  };
  let n = 0;
  const tagline = 'Live Your Fullest'.split('').map((ch) => {
    const a = at('tagline') + n++ * 0.035;
    const k = p(t, a, a + 0.45);
    return (
      <span key={n} style={{ display: 'inline-block', whiteSpace: 'pre', opacity: k, transform: `translateY(${(1 - k) * 0.3}em)`, filter: `blur(${(1 - k) * 8}px)`, color: 'LYF'.includes(ch) ? C.brandDeep : C.brand }}>
        {ch}
      </span>
    );
  });
  return (
    <>
      <BreathRings t={t} t0={t0} converge={leave} opacity={1 - leave * 0.9} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 540, transform: `translateY(-58%) translateY(${-leave * 220}px)`, textAlign: 'center', opacity: 1 - leave }}>
        <div style={{ fontFamily: FACE.type, fontSize: size, lineHeight: 1, letterSpacing: '-0.05em', whiteSpace: 'nowrap' }}>
          <Grow k={respire} em={4.0} style={{ color: C.brand, fontWeight: 600 }}>
            {'Respire'.split('').map((ch, i) => (
              <span key={i} style={{ opacity: p(t, at('respire') + 0.1 + i * 0.06, at('respire') + 0.45 + i * 0.06, 'soft') }}>{ch}</span>
            ))}
          </Grow>
          {/* the gap between Respire and LYF opens as Respire arrives */}
          <span style={{ display: 'inline-block', width: `${respire * 0.16}em` }} />
          <span style={{ display: 'inline-block', paddingRight: '0.04em', fontWeight: 800, position: 'relative' }}>
            <span style={{ position: 'absolute', left: '100%', top: '0.02em', marginLeft: '0.06em', fontSize: '0.3em', fontWeight: 500, letterSpacing: 0, color: C.brand, opacity: p(t, at('tm'), at('tm') + 0.5, 'soft') }}>TM</span>
            {letter('L', 0)}
            <Grow k={grow} em={1.6} style={g}>ive</Grow>
            <Grow k={grow} em={0.28}>&nbsp;</Grow>
            {letter('Y', 1)}
            <Grow k={grow} em={1.9} style={g}>our</Grow>
            <Grow k={grow} em={0.28}>&nbsp;</Grow>
            {letter('F', 2)}
            <Grow k={grow} em={3.2} style={g}>ullest</Grow>
          </span>
        </div>
        <div style={{ marginTop: 34, fontFamily: FACE.type, fontWeight: 500, fontSize: 70, letterSpacing: '-0.02em', height: 80 }}>{tagline}</div>
      </div>
    </>
  );
};
