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
3. **Story before code:** start from `film/story-shape.md` in respirelyf-media:
   - the hook
   - the five-step loop
   - the bigger-picture outro: one signal → every signal → day by day → her Breathing Fingerprint
   - the call to action

   A single-signal video always ends on the bigger picture. Then agree the beats (`src/film/beats.ts`) and a timed voiceover script (`storyboard/voiceover.md`)
   with the user. Write every on-screen and spoken word with the `respire-lyf-copy` skill.
   **Words are the backbone of every video:**
   - Before writing any line, read the line bank and its "How to write a line": `film/line-bank.md` in
     respirelyf-media (next to the guide).
   - Think and reason it through, draft several versions per line, and keep the best. The bank is a starting point,
     never lines to copy.
   - **Iterate every line** as in the bank's "Iterate every line":
     1. Write the raw idea.
     2. Start three to five drafting agents in parallel, one angle each, with deep reasoning.
     3. Have a separate critic score the drafts.
     4. Show the user the best three to five.
     5. Make a hybrid of the strongest, then tighten it.
     6. Do a performance pass with audio tags.
     7. Lock the line.

     Never ship the first draft.
   - Meet the must-haves in `film/video-checklist.md` in respirelyf-media:
     - the full 5-step loop, even in a single-feature video
     - an ending on long-term value
     - the outro: Download Respire LYF, website, "Patent-protected technology.", the L8 disclaimer, then
       partnerships@ai4lyf.com at the very end
     - a "compatible watch", never "Apple Watch"
4. **Build scenes** in `src/film/scenes/`, one take. Read `film/motion.md` in respirelyf-media first:
   - **Motion is half the film.** Design every transition as a camera move that carries meaning, with one element
     handed across. Draft several ideas per transition and keep the best, the same as a line.
   - Something moves in every held shot.
   - Values are pure functions of time.
   - AI live-action shots only for the human moments; follow `film/ai-footage.md` (inhaler shots, phone screens).
   - **Never an app screenshot or screen recording**, not even as a placeholder. Rebuild every screen exactly in code
     from `screens/` and the app source, in pieces, so each element animates on its own.
5. **Keep the brand pieces** in `src/film/Film.tsx` (`BrandReveal`, `Watermark`, `EndCard`) and style only from
   `src/film/tokens.ts`. Icons and the logo only through `brand('…')`; never commit `public/brand/`.
6. **Cuts from the first day:** follow "Formats" and "Versions are cuts" in `film/GUIDE.md`.
   - Every version (full, short, partner, social) and every idea (another opening, a scene told another way) is a
     `CutDef` in `src/film/cuts/`, registered under `Cuts` in `src/Root.tsx`. Nothing else goes in `Root.tsx`.
   - Never copy or branch the project per version.
   - Name every segment, one per scene, so Studio's timeline shows each cut as its chapters.
   - **1080p at 60 fps, always** (`fps={FPS}`, never 30, 25 or 24): 16:9 is 1920 × 1080; 9:16 is 1080 × 1920.
   - A vertical version is a `<Name>-Vertical` composition of the same cut under `Cuts/Vertical`. Scenes lay out from
     `useVideoConfig()`, never by cropping 16:9.
7. **Check** with stills (`renderStill`, `chromiumOptions: { gl: 'angle' }`) and `npm run typecheck`; preview in Studio.
   Render an MP4 only when the user asks.
8. **Version control:** `git init`, a private repo under `AI4LYF-Github` (ask before creating it), topics `video`,
   `remotion`, `motion-graphics`, `respirelyf`. No tags while work is in progress.
