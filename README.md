# respirelyf-media

The Respire LYF app's brand assets and reference screens, in one place for every video, deck and page we make.

## What's here

```
film/           the film guide, a starter template and a Claude Code skill (see "Making a film")
brand/          installed by the films (versioned by tag)
  icons/determinants/   what shapes breathing: inhaler, medications, supplements, food, hydration, sleep,
                        activity, stress, weather, environment, flare-up
  icons/indicators/     how breathing is: cough, breathing score, peak flow, surveys (ACT / CAT), vitals
  logo/                 the lungs mark, the app icon
screens/        reference captures of the live app, by tab (browse only, never rendered)
  today/                Today: morning, evening, full, the LYF and MEEP banners
    panels/             each tile's panel: cough, vitals, weather & air, inhaler, symptom score, stress,
                        food, hydration, peak flow
    meep/               the MEEP sheet
  progress/trends/  progress/insights/  progress/report/
  fingerprint/  my-plan/  lyf-hub/  quick-log/  notifications/
recordings/     short screen recordings, by tab
```

Captures: iOS app 2.0.1, demo profile ("Maya"), 9 November 2026. The icons are the app's own artwork
(`respirelyf-react-native/assets/appWideIcons`). Since v1.1.0 they are the 512 px masters the films were made with:
the same drawings as the app's 360 px exports, sharper (the app keeps its own copies). `environmental_factor` is
97 px in both.

## Making a film

**`film/GUIDE.md`** is the RespireLYF film guide: the must-haves (type, colours, the LYF → Respire LYF™ reveal, the
grey watermark, the end card), how to start a film, and how versions work as cuts. **`film/template/`** is a ready
Remotion starter with all of it built in:

```bash
npx degit AI4LYF-Github/respirelyf-media/film/template my-film && cd my-film && npm install && npm run studio
```

**`film/story-shape.md`** is the starting point for every video's story (the loop, then the bigger-picture outro),
**`film/motion.md`** is how a film moves (transitions, camera, motion inside the shot, screens rebuilt in code),
**`film/line-bank.md`** is how we write every voiceover line, heading and subtitle (a quality bar, not a menu), and
**`film/video-checklist.md`** is what every video must have (12 Nov 2026).

`film/skill/SKILL.md` is the same as a Claude Code skill (copy it to `~/.claude/skills/respirelyf-film/`), so
"create a video using respirelyf-media" starts from the template.

## Using it in a film

This repo is the one library: films never commit icons or the logo. Install a tagged version, and have the
film copy `brand/` into a gitignored `public/brand/` on `npm install` (Remotion only serves `public/`; see
`scripts/sync-brand.mjs` in the films). The tag pins the film, so an old film always re-renders exactly:

```json
"dependencies": { "@ai4lyf/respirelyf-media": "github:AI4LYF-Github/respirelyf-media#v1.1.0" }
```

Only `brand/` is installed; screens and recordings stay here. Tags are never moved: a change is a new tag.

| Tag | What changed |
|---|---|
| v1.0.0 | The app's icons (360 px), the lungs mark and the app icon |
| v1.1.0 | 14 icons replaced by their 512 px masters (same artwork, sharper); file names unchanged. The film kit: `film/GUIDE.md`, the starter template `film/template/`, the `respirelyf-film` skill |

## Rules

- **Live app only.** Nothing that hasn't shipped: unreleased screens stay private until launch.
- **Demo data only.** No real users, emails, health values or device names; no developer or staging screens.
- **No fonts.** SF Pro can't be redistributed; the films use the system font.
- **Tag every change to `brand/`** (`v1.1.0` …) so films update on purpose.
