import React from 'react';
import { Img } from 'remotion';
import { brand } from '../brand';
import { C, FACE, TYPE } from '../tokens';
import { p } from '../time';
import { BreathRings } from './BrandReveal';

/** Apple's logo, as the website's store badge draws it (and the partner film's end card). */
const APPLE = 'M16.37 12.62c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.47.83-.72 0-1.82-.81-3-.79-1.54.02-2.96.9-3.75 2.28-1.6 2.78-.41 6.88 1.15 9.13.76 1.1 1.67 2.33 2.85 2.29 1.15-.05 1.58-.74 2.96-.74 1.38 0 1.77.74 2.98.72 1.23-.02 2.01-1.12 2.76-2.22.87-1.27 1.23-2.5 1.25-2.57-.03-.01-2.4-.92-2.42-3.67zM14.1 5.86c.63-.77 1.06-1.83.94-2.89-.91.04-2.01.61-2.66 1.37-.58.67-1.09 1.75-.95 2.79 1.01.08 2.04-.51 2.67-1.27z';

const gradientText: React.CSSProperties = {
  backgroundImage: 'linear-gradient(100deg, #1F5C99 0%, #1F5C99 38%, #7CC7F5 50%, #1F5C99 62%, #1F5C99 100%)',
  backgroundSize: '300% 100%',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
};

/**
 * The end card, after the partner film's (explainer-film-partner, scene 12): breath rings close in round the logo, the
 * lockup (Respire LYF™, Live Your Fullest) rises, then the line, the store badges, the partnership address, the
 * website, the disclaimer (the website footer's words) and the copyright, each in turn.
 */
/** Seconds the end card needs to land everything and hold a moment. */
export const END_CARD_SECONDS = 9;

export const EndCard: React.FC<{ t: number; t0: number }> = ({ t, t0 }) => {
  if (t < t0 - 0.2) return null;
  const k = (d: number, len = 0.6) => p(t, t0 + d, t0 + d + len, 'out');
  const rise = (v: number, dy = 22): React.CSSProperties => ({ opacity: v, transform: `translateY(${(1 - v) * dy}px)`, filter: v < 1 ? `blur(${(1 - v) * 6}px)` : undefined });
  const veil = p(t, t0, t0 + 0.9, 'inOut');
  const sweep = 100 - 100 * p(t, t0 + 1.0, t0 + 2.2, 'inOut');
  const logo = k(0.3, 0.8);
  const txt = (size: number, weight = 600, color: string = C.ink): React.CSSProperties => ({ fontFamily: FACE.type, fontSize: size, fontWeight: weight, color, whiteSpace: 'nowrap' });
  const badge: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: 14, height: 76, padding: '0 28px', borderRadius: 18, background: '#0b1b34', color: '#fff' };
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 90% at 50% 40%, #ffffff 0%, #f1f6fd 70%, #e9f1fb 100%)', opacity: veil }} />
      <div style={{ opacity: veil }}>
        <BreathRings t={t} t0={t0 - 0.4} converge={0.55 * p(t, t0 + 0.3, t0 + 2.0, 'inOut')} opacity={0.55} />
      </div>
      {/* the logo and the lockup */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 150, textAlign: 'center' }}>
        <Img src={brand('logo/lungs-mark.png')} style={{ width: 150, height: 150, objectFit: 'contain', opacity: logo, transform: `scale(${0.7 + 0.3 * logo})` }} />
        <div style={{ ...txt(150, 600), lineHeight: 1, letterSpacing: '-0.05em', marginTop: 18, ...rise(k(0.7, 0.8), 30) }}>
          <span style={{ color: C.brand, fontWeight: 600 }}>Respire</span>
          <span style={{ display: 'inline-block', width: '0.16em' }} />
          <span style={{ position: 'relative', fontWeight: 800, ...gradientText, backgroundPosition: `${sweep}% 0` }}>LYF</span>
          <span style={{ fontSize: '0.3em', fontWeight: 500, letterSpacing: 0, color: C.brand, verticalAlign: '1.9em', marginLeft: '0.06em' }}>TM</span>
        </div>
        <div style={{ ...txt(54, 500), letterSpacing: '-0.02em', marginTop: 14, ...rise(k(1.2)) }}>
          <span style={{ color: '#1F5C99', fontWeight: 800 }}>L</span>ive <span style={{ color: '#1F5C99', fontWeight: 800 }}>Y</span>our <span style={{ color: '#1F5C99', fontWeight: 800 }}>F</span>ullest
        </div>
        <div style={{ ...txt(40, TYPE.weight), letterSpacing: TYPE.track, marginTop: 34, ...rise(k(1.8)) }}>
          Your breathing has a fingerprint. <span style={{ color: C.accent }}>We help you find it.</span>
        </div>
      </div>
      {/* for patients: where to get it */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 690, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 22, ...rise(k(2.4)) }}>
        <span style={{ ...txt(26, 700, C.slate), letterSpacing: '0.04em', marginRight: 10 }}>Asthma · COPD · chronic cough</span>
        <span style={badge}>
          <svg width={38} height={38} viewBox="0 0 24 24"><path fill="#fff" d={APPLE} /></svg>
          <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}><small style={txt(16, 500, '#fff')}>Download on the</small><b style={txt(30, 700, '#fff')}>App Store</b></span>
        </span>
        <span style={badge}>
          <svg width={36} height={36} viewBox="0 0 24 24"><path fill="#4285F4" d="M4 2.6v18.8L13.4 12z" /><path fill="#34A853" d="M4 2.6 13.4 12l3.3-3.3L5.3 2.2c-.5-.3-1-.2-1.3.4z" /><path fill="#EA4335" d="M4 21.4c.3.6.8.7 1.3.4l11.4-6.5-3.3-3.3z" /><path fill="#FBBC04" d="m16.7 8.7-3.3 3.3 3.3 3.3 3.5-2c.9-.5.9-2.1 0-2.6z" /></svg>
          <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}><small style={txt(16, 500, '#fff')}>Get it on</small><b style={txt(30, 700, '#fff')}>Google Play</b></span>
        </span>
      </div>
      {/* for partners, and the website */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 808, textAlign: 'center', ...txt(30, 600, C.slate), ...rise(k(3.0)) }}>
        Partner with us to close the loop for millions <span style={{ color: C.brand }}>→</span> <b style={{ color: C.ink, fontWeight: 800 }}>partnerships@ai4lyf.com</b>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 860, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, ...txt(34, 800, C.ink), ...rise(k(3.5)) }}>
        <svg width={34} height={34} viewBox="0 0 24 24" fill="none" stroke={C.brand} strokeWidth={1.8}><circle cx={12} cy={12} r={9.2} /><path d="M2.8 12h18.4M12 2.8c2.6 2.6 3.9 5.7 3.9 9.2s-1.3 6.6-3.9 9.2c-2.6-2.6-3.9-5.7-3.9-9.2s1.3-6.6 3.9-9.2z" /></svg>
        <span><span style={{ color: C.slate, fontWeight: 600 }}>www.</span><span style={{ color: C.brand }}>respirelyf</span>.com</span>
      </div>
      {/* the website footer's words, then the copyright */}
      <div style={{ position: 'absolute', left: 260, right: 260, top: 940, textAlign: 'center', fontFamily: FACE.type, fontSize: 19, fontWeight: 500, lineHeight: 1.4, color: '#8f9bb3', opacity: k(4.0) }}>
        Respire LYF supports everyday self-management alongside your usual care. It does not diagnose, does not predict attacks, and does not change your medicines.
        Example records and stories illustrate the experience; they are not results from an individual patient.
        <div style={{ marginTop: 6 }}>© 2026 AI4LYF LLC. All rights reserved.</div>
      </div>
    </div>
  );
};
