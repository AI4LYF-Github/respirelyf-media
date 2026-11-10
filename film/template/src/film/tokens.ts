// The RespireLYF film look (film/GUIDE.md). Change these here only, never per scene.

/** One face for every film: SF Pro, the system face on macOS (never bundled: Apple's licence forbids it). */
const SF = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif';
export const FACE = { type: SF };

/** Film type: weight 800, tracking -0.038em. Big: headlines 96–150 px at 1080p, nothing under 22 px. */
export const TYPE = { weight: 800, track: '-0.038em' };

/** Brand colours (respirelyf.com, the app theme). Light mode only. */
export const C = {
  ice: '#f4f8fe', // the page
  ink: '#0b1b34', // type
  slate: '#52647f', // secondary type
  brand: '#2893d7', // "Respire", accents
  brandDeep: '#1f5c99', // "LYF", the L·Y·F initials
  accent: '#1a6bb5', // the second line of every headline pair
};

/** The page every film sits on. */
export const PAGE = `radial-gradient(120% 90% at 50% 40%, #ffffff 0%, ${C.ice} 70%, #e9f1fb 100%)`;
