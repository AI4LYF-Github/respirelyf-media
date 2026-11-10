import React from 'react';
import { AbsoluteFill } from 'remotion';
import { B } from './beats';
import { BrandReveal } from './kit/BrandReveal';
import { EndCard } from './kit/EndCard';
import { Watermark } from './kit/Watermark';
import { Example } from './scenes/Example';
import { p } from './time';
import { PAGE } from './tokens';

/**
 * The master take at time `t` (seconds): one tree driven by one clock, every scene reading the same time, so nothing
 * ever cuts. Cuts (film/cuts/) play stretches of it. Keep the brand pieces: the reveal, the watermark, the end card.
 */
export const FilmAt: React.FC<{ t: number }> = ({ t }) => (
  <AbsoluteFill style={{ background: PAGE, overflow: 'hidden' }}>
    <BrandReveal t={t} t0={B.reveal} />
    <Example t={t} />
    <EndCard t={t} t0={B.end} />
    <Watermark hide={p(t, B.end, B.end + 0.6)} />
  </AbsoluteFill>
);
