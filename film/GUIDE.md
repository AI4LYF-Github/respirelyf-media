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
| **Motion** | Motion is half the film. Every transition is designed and carries meaning, the camera moves with craft, and something lives in every held shot. Read `motion.md` before building a scene. | `motion.md` |
| **One take** | Every scene change is a camera move (pan, push, dive), never a cut. Every value is a pure function of time (`time.ts`: `p`, `tw`, `life`): no state, no CSS animation. | `time.ts`, `beats.ts` |
| **App screens** | Never an app screenshot or screen recording in a film, not even as a placeholder. Rebuilt exactly in code from the reference captures (`screens/` in this repo) and the app source, piece by piece, so every element can move on its own. | `motion.md` §4 |
| **Icons and logo** | Only from this repo, through `brand('icons/<name>.png')` / `brand('logo/lungs-mark.png')`. Never copy them into a film's git. | `brand.ts`, `scripts/sync-brand.mjs` |
| **Claims** | Every word on screen and in the voiceover goes through the `respire-lyf-copy` skill: association words only (never triggers / causes / predicts), a "compatible watch" (never "Apple Watch") named for automatic detection, the pMDI and "Always follow your doctor's guidance" line wherever inhaler technique is shown, no numbers about users or outcomes. | — |
| **AI footage** | Live-action AI shots only for the human moments (about 15–20%); everything else is code. Inhaler shots and phone screens follow `ai-footage.md`: same arm, cap off, real press, no spray; the app is never drawn by the model. | `ai-footage.md` |
| **Words** | The voiceover is the backbone of every video. Before writing any line, heading or subtitle, read `line-bank.md` and its "How to write a line": think it through, draft several versions, keep the best. The bank is a starting point and a quality bar, never lines to copy. | `line-bank.md` |
| **Story shape** | Every video starts from `story-shape.md`: hook, the five-step loop, then the bigger-picture outro (one signal → every signal → day by day → her Breathing Fingerprint) before the call to action. A single-signal video is never just a tracker. | `story-shape.md` |
| **Every video** | Meets `video-checklist.md` (Ali, 12 Nov 2026): the full loop (Capture → Understand → Act → See progress → Improve), the bigger picture for one signal, an ending on long-term value, the outro (Download Respire LYF, www.respirelyf.com, "Patent-protected technology.", the L8 disclaimer, partnerships@ai4lyf.com last), and "Patent-protected technology." on every inhaler and cough scene. | `video-checklist.md` |
| **Voiceover** | A timed script beside the film (`storyboard/voiceover.md`: in, out, picture, line). The film must still read with the sound off. | — |
| **Preview** | Review in Remotion Studio. Render MP4s only when asked: `npm run render` (1920×1080, 60 fps). | `package.json` |

## Shared assets (this package)

- A film depends on a **tag** of this repo: `"@ai4lyf/respirelyf-media": "github:AI4LYF-Github/respirelyf-media#v1.1.0"`.
- `npm install` runs `scripts/sync-brand.mjs`, which copies `brand/` into the film's `public/brand/` (Remotion only
  serves files from `public/`). That folder is gitignored and generated: never edit it, never commit it.
- To change an icon: change it here, tag a new version (`v1.2.0`), then bump the tag in each film and `npm install`.
  Tags are never moved or deleted, so an old film always re-renders exactly.
- A film's own one-off assets (a meal photo, a voice clip) live in its own `public/`, outside `brand/`.

## Formats: 1080p at 60 fps, every time

- **Every composition is 60 fps.** Never 30, 25 or 24, not for a test, an eval, a draft or a social cut. `FPS` in
  `time.ts` is 60, and every `<Composition>` takes `fps={FPS}`; never type the number.
- **16:9 is 1920 × 1080. 9:16 is 1080 × 1920.** Add 1:1 (1080 × 1080) or 4:5 (1080 × 1350) only when a platform asks
  for it. Never below 1080 on the short side.
- Render with `npx remotion render <Id> out/<id>.mp4`, which keeps the composition's size and 60 fps. Never pass a
  lower `--fps` or a `--scale` under 1.

## Versions are cuts, from the first day

One codebase per film, many versions. Each version is a **cut**: a Remotion composition that plays stretches of the
master take, optionally faster, plus scenes that exist only in that cut.

```ts
// src/film/cuts/short.ts
export const SHORT: CutDef = [
  { name: 'Reveal: Respire LYF', from: 0, to: 7.5 },
  { name: 'Story', from: 7.6, to: 12, speed: 1.2 },          // a little quicker
  { name: 'Partner ask', scene: PartnerAsk, seconds: 5 },    // a scene only this cut has
  { name: 'End card', from: 15.8, to: MASTER_SECONDS },
];
```

Add it to `CUTS` in `src/film/cuts/Cut.tsx` and register it in `src/Root.tsx`:

```tsx
<Composition id="Short" component={Cut} defaultProps={{ cut: 'short' as const }} durationInFrames={cutFrames(CUTS.short)} fps={FPS} width={1920} height={1080} />
```

Every cut shows up under **Cuts** in the same Studio and renders with `npx remotion render Short out/short.mp4`.
A shared scene is fixed once, in every cut. Don't branch or copy the project per version.

The rules, for every new film:
- **Cuts from the start.** `Root.tsx` registers only cuts, inside `<Folder name="Cuts">`: no stray composition per idea,
  no copied project, no branch per version. Even a film with one version is a `Full` cut.
- **Ideas are cuts too.** A different opening, or a scene told another way, is a cut with that scene as its own
  segment, so the ideas sit side by side in Studio and nothing is thrown away. The demo film tells its day three ways
  this way: Day-A-Halo, Day-B-Ring and Day-C-Quiet-Line.
- **Names:** composition ids in plain words with hyphens: `Full`, `Short`, `Partner`, `Social`, `Full-Vertical`,
  `Day-B-Ring`. Every segment inside has a name too (below).

### 16:9 and 9:16 from the same cut

A vertical version is another composition of the same cut at 1080 × 1920, in its own folder:

```tsx
<Folder name="Cuts">
  <Composition id="Full" component={Cut} defaultProps={{ cut: 'full' as const }} durationInFrames={cutFrames(CUTS.full)} fps={FPS} width={1920} height={1080} />
  <Folder name="Vertical">
    <Composition id="Full-Vertical" component={Cut} defaultProps={{ cut: 'full' as const }} durationInFrames={cutFrames(CUTS.full)} fps={FPS} width={1080} height={1920} />
  </Folder>
</Folder>
```

- **Scenes never assume 1920 × 1080.** Read `const { width, height } = useVideoConfig()` and lay out for both
  (`const vertical = height > width`). Things that sit side by side in 16:9 stack in 9:16. The phone stays big and
  central, and type stays big.
- **Never crop, pillarbox or letterbox** a 16:9 render into 9:16. Lay it out again; the camera moves can change too.
- If the vertical story should be shorter or in a different order, make it its own cut (`cuts/vertical.ts`) built from
  the same scenes, registered as `Vertical` or `Short-Vertical`.
- Check every format with stills at the same seconds, and watch each one in motion.
- The template's kit (`BrandReveal`, `EndCard`, `Example`) is laid out for 16:9 today. Make each piece read the format
  before you ship a vertical.

### Name every chapter

Every segment of a cut has a `name`, and each one shows as its own labelled track on Studio's timeline, so opening a
cut shows its chapters (Intro, Reveal, Coughs, … End card) and you can jump straight to one. Rules:

- **Name every segment** in plain words, the way you'd describe the scene to someone: "Three quiet days", not "seg4".
- **Split the full cut into one segment per scene.** Contiguous segments of the master at normal speed (each `from`
  equals the previous `to`) render exactly like one long segment, so naming chapters never changes a frame. Take the
  times from `beats.ts`, never type numbers twice.
- **Don't wrap scenes in your own `<Sequence>` for naming.** `Cut.tsx` already does it; it reads time from the global
  frame (so nothing shifts) and gives each chapter its own source tag (Studio otherwise folds Sequences made in a loop
  into one "+N" track).
- Check a renamed or re-split cut with stills at chapter boundaries: they must be pixel-identical to before.

If a cut needs the same scenes in a **different order**, or a scene told differently, make the scene take the cut as
a prop (a small switch inside the scene) rather than copying the file.
