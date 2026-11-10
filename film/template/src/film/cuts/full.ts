import { MASTER_SECONDS } from '../beats';
import type { CutDef } from './Cut';

/** The full film: the master take end to end. */
export const FULL: CutDef = [{ from: 0, to: MASTER_SECONDS }];
