# respirelyf-media

The Respire LYF app's brand assets and reference screens, in one place for every video, deck and page we make.

## What's here

```
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

Captures: iOS app 2.0.1, demo profile ("Maya"), 9 November 2026. The icons are the app's own
(`respirelyf-react-native/assets/appWideIcons`).

## Using it in a film

Install a tagged version, then copy the icons into the film's `public/` (the films keep their own copy, so an old
film always re-renders exactly):

```json
"dependencies": { "@ai4lyf/respirelyf-media": "github:<owner>/respirelyf-media#v1.0.0" }
```

Only `brand/` is installed; screens and recordings stay here.

## Rules

- **Live app only.** Nothing that hasn't shipped: unreleased screens stay private until launch.
- **Demo data only.** No real users, emails, health values or device names; no developer or staging screens.
- **No fonts.** SF Pro can't be redistributed; the films use the system font.
- **Tag every change to `brand/`** (`v1.1.0` …) so films update on purpose.
