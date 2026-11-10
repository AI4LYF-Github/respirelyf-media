import { B, MASTER_SECONDS } from '../beats';
import type { CutDef } from './Cut';

/**
 * The full film: the master take end to end, split into named chapters so Studio's timeline shows each scene. Name
 * every chapter; keep them contiguous (each starts where the last ended) so splitting changes nothing on screen.
 */
export const FULL: CutDef = [
  { name: 'Reveal: Respire LYF', from: 0, to: B.story0 },
  { name: 'Story', from: B.story0, to: B.end },
  { name: 'End card', from: B.end, to: MASTER_SECONDS },
];
