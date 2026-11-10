import React from 'react';
import { Img } from 'remotion';
import { brand } from '../brand';

/** The lungs mark in grey, bottom-right, for the whole film; it steps aside while the end card plays (`hide` 0 → 1). */
export const Watermark: React.FC<{ hide?: number }> = ({ hide = 0 }) => (
  <Img src={brand('logo/lungs-mark.png')} style={{ position: 'absolute', right: 52, bottom: 44, width: 54, height: 'auto', filter: 'grayscale(1)', opacity: 0.28 * (1 - hide) }} />
);
