# RespireLYF film guide

What every RespireLYF video must have, and how to start one. The starter project in `film/template/` already does
all of this: start from it, don't rebuild it.

## Start a new film

```bash
npx degit AI4LYF-Github/respirelyf-media/film/template my-film   # copy the starter (no git history)
cd my-film
npm install                    # also copies the shared icons and logo into public/brand/
npm run studio                 # Remotion Studio: pick Cuts → Full
```

Then:
1. Name it in `package.json` and put it under git (`git init`; `.gitignore` is ready).
2. Write the story in `src/film/beats.ts` (times) and `src/film/scenes/` (one file per scene). Replace `Example.tsx`.
3. Keep the brand pieces in `src/film/Film.tsx`: `BrandReveal`, `Watermark`, `EndCard`.
4. For each version of the film (full, short, partner, social), add a cut: see "Versions are cuts" below.
5. Private repo under `AI4LYF-Github`, topics `video`, `remotion`, `motion-graphics`, `respirelyf`.

## The must-haves

| | Rule | Where it lives in the template |
|---|---|---|
| **Look** | Light mode only. No dark frames, ever (night is a soft blue hour, not black). Page: `PAGE` in `tokens.ts`. | `tokens.ts` |
| **Type** | One face: SF Pro (system font, never bundled). Film type weight **800**, tracking **−0.038em**. Big: headlines 96–150 px at 1080p, nothing under 22 px. | `tokens.ts` → `FACE`, `TYPE` |
| **Headline pairs** | Two beats, same weight: line one in ink `#0b1b34`, line two in accent blue `#1a6bb5`. Words rise out of a mask; headlines leave by receding, never a hard cut. No serif, no italics. | `kit/Headline.tsx` |
| **Colours** | Ink `#0b1b34`, slate `#52647f`, brand `#2893d7`, deep `#1f5c99`, accent `#1a6bb5`, ice `#f4f8fe`. Nothing else for type. | `tokens.ts` → `C` |
| **Brand reveal** | "LYF" rises letter by letter (deep blue with a light sweep) → opens into "Live Your Fullest" → folds → "Respire" (brand blue, weight 600) arrives with a gap → **™** lands → tagline "Live Your Fullest" with **L·Y·F initials in deep blue**. Over breath rings. | `kit/BrandReveal.tsx` |
| **Lockup** | Always "Respire LYF™": two words, a gap, the ™. Never "RespireLYF" or "Respire Lyf" on screen. | `BrandReveal`, `EndCard` |
| **Watermark** | The lungs mark in grey, bottom-right (54 px, 28% opacity) for the whole film; it steps aside for the end card. | `kit/Watermark.tsx` |
| **End card** | Logo + Respire LYF™ + Live Your Fullest, "Your breathing has a fingerprint. We help you find it.", Asthma · COPD · chronic cough, App Store + Google Play badges, **partnerships@ai4lyf.com**, **www.respirelyf.com**, the website's disclaimer, © AI4LYF LLC. | `kit/EndCard.tsx` |
| **One take** | Every scene change is a camera move (pan, push, dive), never a cut. Every value is a pure function of time (`time.ts`: `p`, `tw`, `life`): no state, no CSS animation. | `time.ts`, `beats.ts` |
| **App screens** | Rebuilt in code from the reference captures (`screens/` in this repo), so each element can animate. Never a screenshot or screen recording in a film. | — |
| **Icons and logo** | Only from this repo, through `brand('icons/<name>.png')` / `brand('logo/lungs-mark.png')`. Never copy them into a film's git. | `brand.ts`, `scripts/sync-brand.mjs` |
| **Claims** | Every word on screen and in the voiceover goes through the `respire-lyf-copy` skill: association words only (never triggers / causes / predicts), Apple Watch named for automatic detection, the pMDI and "Always follow your doctor's guidance" line wherever inhaler technique is shown, no numbers about users or outcomes. | — |
| **Voiceover** | A timed script beside the film (`storyboard/voiceover.md`: in, out, picture, line). The film must still read with the sound off. | — |
| **Preview** | Review in Remotion Studio. Render MP4s only when asked: `npm run render` (1920×1080, 60 fps). | `package.json` |

## Shared assets (this package)

- A film depends on a **tag** of this repo: `"@ai4lyf/respirelyf-media": "github:AI4LYF-Github/respirelyf-media#v1.1.0"`.
- `npm install` runs `scripts/sync-brand.mjs`, which copies `brand/` into the film's `public/brand/` (Remotion only
  serves files from `public/`). That folder is gitignored and generated: never edit it, never commit it.
- To change an icon: change it here, tag a new version (`v1.2.0`), then bump the tag in each film and `npm install`.
  Tags are never moved or deleted, so an old film always re-renders exactly.
- A film's own one-off assets (a meal photo, a voice clip) live in its own `public/`, outside `brand/`.

## Versions are cuts

One codebase per film, many versions. Each version is a **cut**: a Remotion composition that plays stretches of the
master take, optionally faster, plus scenes that exist only in that cut.

```ts
// src/film/cuts/short.ts
export const SHORT: CutDef = [
  { from: 0, to: 7.5 },                  // the reveal
  { from: 7.6, to: 12, speed: 1.2 },     // the story, a little quicker
  { scene: PartnerAsk, seconds: 5 },     // a scene only this cut has
  { from: 15.8, to: MASTER_SECONDS },    // the end card
];
```

Add it to `CUTS` in `src/film/cuts/Cut.tsx` and register it in `src/Root.tsx`:

```tsx
<Composition id="Short" component={Cut} defaultProps={{ cut: 'short' as const }} durationInFrames={cutFrames(CUTS.short)} fps={FPS} width={1920} height={1080} />
```

Every cut shows up under **Cuts** in the same Studio and renders with `npx remotion render Short out/short.mp4`.
A shared scene is fixed once, in every cut. Don't branch or copy the project per version.

If a cut needs the same scenes in a **different order**, or a scene told differently, make the scene take the cut as
a prop (a small switch inside the scene) rather than copying the file.
