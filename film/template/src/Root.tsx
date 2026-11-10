import React from 'react';
import { Composition, Folder } from 'remotion';
import { Cut, CUTS, cutFrames } from './film/cuts/Cut';
import { FPS } from './film/time';

/** Every version of the film is a cut: stretches of the master take and scenes of its own. 1920 × 1080, 60 fps. */
export const Root: React.FC = () => (
  <Folder name="Cuts">
    <Composition id="Full" component={Cut} defaultProps={{ cut: 'full' as const }} durationInFrames={cutFrames(CUTS.full)} fps={FPS} width={1920} height={1080} />
  </Folder>
);
