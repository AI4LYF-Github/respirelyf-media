---
name: respirelyf-film
description: Start or extend a RespireLYF video (Remotion) the house way. Use when the user asks to create, start or scaffold a new RespireLYF film or video, a new version or cut of one, or says "create a video using respirelyf-media". Starts from the respirelyf-media film template, keeps the brand must-haves (light mode, SF Pro 800 at -0.038em, the LYF → Respire LYF™ reveal, grey lungs watermark bottom-right, end card with www.respirelyf.com and partnerships@ai4lyf.com), takes icons only from respirelyf-media, and makes every version a cut.
---

# A new RespireLYF film

1. **Read the guide first:** `film/GUIDE.md` in https://github.com/AI4LYF-Github/respirelyf-media (or a local clone at
   `~/Documents/Projects/respirelyf-media/film/GUIDE.md`). It is the source of truth for the must-haves.
2. **Start from the template, never from scratch:**
   `npx degit AI4LYF-Github/respirelyf-media/film/template <folder>` → `npm install` → `npm run studio`.
   Rename it in `package.json`. Ask the user for the folder name and the film's audience and goal if not given.
3. **Story before code:** agree the beats (`src/film/beats.ts`) and a timed voiceover script (`storyboard/voiceover.md`)
   with the user. Write every on-screen and spoken word with the `respire-lyf-copy` skill.
4. **Build scenes** in `src/film/scenes/`, one take: scene changes are camera moves, values are pure functions of time.
   Rebuild app screens in code from `screens/` in respirelyf-media; never put screenshots or recordings in a film.
5. **Keep the brand pieces** in `src/film/Film.tsx` (`BrandReveal`, `Watermark`, `EndCard`) and style only from
   `src/film/tokens.ts`. Icons and the logo only through `brand('…')`; never commit `public/brand/`.
6. **Versions are cuts:** each version (full, short, partner, social) is a `CutDef` in `src/film/cuts/`, registered
   under `Cuts` in `src/Root.tsx`. Never copy or branch the project per version. Name every segment (one per scene), so Studio's
   timeline shows each cut as its chapters.
7. **Check** with stills (`renderStill`, `chromiumOptions: { gl: 'angle' }`) and `npm run typecheck`; preview in Studio.
   Render an MP4 only when the user asks.
8. **Version control:** `git init`, a private repo under `AI4LYF-Github` (ask before creating it), topics `video`,
   `remotion`, `motion-graphics`, `respirelyf`. No tags while work is in progress.
