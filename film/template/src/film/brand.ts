import { staticFile } from 'remotion';

/**
 * A shared brand asset: icons and the logo from @ai4lyf/respirelyf-media, copied into public/brand/ on npm install
 * (scripts/sync-brand.mjs). Never edit public/brand/ by hand; change the brand repo and bump the tag.
 * Anything else in public/ is this film's own and goes through staticFile().
 */
export const brand = (path: string) => staticFile(`brand/${path}`);
