# A RespireLYF film

Made from the RespireLYF film template ([guide](https://github.com/AI4LYF-Github/respirelyf-media/blob/main/film/GUIDE.md)).

| Command | What it does |
|---|---|
| `npm install` | Installs, and copies the shared icons and logo into `public/brand/` |
| `npm run studio` | Remotion Studio: every version under **Cuts** |
| `npm run render` | The full cut as MP4 (1920 × 1080, 60 fps); `npx remotion render <Cut> out/<file>.mp4` for another |
| `npm run typecheck` | Type-check |

Where things are: `src/film/beats.ts` (the timing), `src/film/scenes/` (the story), `src/film/kit/` (brand pieces:
reveal, headline, watermark, end card), `src/film/cuts/` (the versions), `src/film/tokens.ts` (type and colours).
