import React from 'react';
import { Img } from 'remotion';
import { B } from '../beats';
import { brand } from '../brand';
import { Headline } from '../kit/Headline';
import { p } from '../time';

/** An example scene: a two-beat headline, and an app icon from respirelyf-media. Replace it with your film. */
export const Example: React.FC<{ t: number }> = ({ t }) => {
  if (t < B.story0 - 0.2 || t > B.story1 + 0.8) return null;
  const k = p(t, B.story0 + 1.2, B.story0 + 1.9, 'back') * (1 - p(t, B.story1, B.story1 + 0.6));
  return (
    <>
      <Headline t={t} t0={B.story0} t1={B.story1} line1="Most of it is automatic." line2="The rest takes a minute." y={420} />
      <Img src={brand('icons/cough.png')} style={{ position: 'absolute', right: 220, top: 380, width: 260, height: 260, objectFit: 'contain', opacity: Math.min(1, k * 1.5), transform: `scale(${0.6 + 0.4 * k})` }} />
    </>
  );
};
