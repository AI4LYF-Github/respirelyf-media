# A RespireLYF film (Remotion)

Follow the RespireLYF film guide: https://github.com/AI4LYF-Github/respirelyf-media/blob/main/film/GUIDE.md (the
must-haves: light mode, SF Pro 800 at −0.038em, the LYF → Respire LYF™ reveal, the grey watermark, the end card with
the website, one take, claims).

- Every version of this film is a cut (`src/film/cuts/`), registered under `Cuts` in `src/Root.tsx`. Never copy the
  project or branch it per version.
- Icons and the logo come only from `brand('…')` (`src/film/brand.ts`), filled into `public/brand/` by `npm install`.
  Never edit or commit `public/brand/`.
- Keep `BrandReveal`, `Watermark` and `EndCard` in `src/film/Film.tsx`; style comes from `src/film/tokens.ts` only.
- Times live in `src/film/beats.ts`; every value is a pure function of time (`p`, `tw`, `life` in `src/film/time.ts`).
- Preview in Studio (`npm run studio`); check changes with stills and `npm run typecheck`. Render an MP4 only when asked.
- Words on screen and in the voiceover: use the `respire-lyf-copy` skill.
