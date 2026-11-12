# Motion: how a Respire LYF film moves

Motion is half of the film, with the words as the other half. A viewer forgives a plain frame; they don't forgive a
dead one. Every transition is designed on purpose, never left to a default, and gets the same care as a voiceover line:
draft several, keep the one that makes someone ask "how did they do that?"

## 1. One take: the camera carries the story

- **Never a cut, a fade, a crossfade or a wipe.** Every scene change is a camera move through one continuous world.
- **The transition is part of the story.** It shows how two things connect: the cough count flows into the day ring,
  an icon opens into its story, a banner lands on the phone. When a move doesn't say anything, find a better one.
- **Hand one thing across.** Something from the outgoing scene becomes the incoming scene: icon → tile → card,
  dot → line → chart, phone screen → the room around it. The eye follows it, so the change never feels like a jump.

### The moves we use

| Move | What it does | In the demo film |
|---|---|---|
| **Fly-in / dive** | Pushes through an object into the world inside it | the camera flies into each icon and lands in its story |
| **Pull-back** | Reveals that what we saw is part of something bigger | the ring pulls back into the donut of every icon |
| **Match move** | One shape becomes the next | the MEEP banner lands on the phone; titles dock top-left |
| **Track** | Glides along a line of time or objects | Maya's whole day on one line |
| **Orbit / turn** | Swings round to the next item while the centre holds | the ring turns to the next signal |
| **Pan over a scene** | The camera moves over the objects while the phone and watch stay put | each signal's story |
| **Rack focus** | Moves the eye in depth by blurring what's near or far | depth between the room, the devices and the cards |

## 2. Camera craft

- **One camera per scene, as keyframes** of time, focus x, focus y and zoom (the film's `StoryCam`). Let the camera
  move between keyframes, and author nothing per frame.
- **Ease every move.** In-out between holds, out (arrive fast, settle long) for things that land. Never use linear
  easing, never shake the camera, and keep overshoot for the one moment that earns it.
- **Motivated moves only.** The camera goes where the story and the eye are going next, and gets there a little before
  the voice does.
- **Holds still breathe.** A held shot keeps a slow push or drift of a percent or two, so the frame is never frozen.
- **Depth.** Layers at different depths move at different speeds (parallax). Use soft shadows and blur for depth,
  never dark vignettes (light mode only).
- **Readable first.** A move never runs while the viewer is reading. Hold anything readable long enough to read it
  twice at normal speed, and longer when the voice is on it.

## 3. Motion everywhere, inside the shot too

When the camera holds, something inside the frame lives:
- Numbers count up to their value, rings and bars fill, and chart lines draw on.
- Chips and rows arrive one after another, staggered by a few frames rather than all at once.
- Taps show a press: a slight scale-down, a ripple, then the result.
- Sheets slide up on a spring, and cards lift off with a shadow.
- Calm idle motion: a slow breath on rings and icons, and a light sweep across the lockup.
- Exits recede (scale down, soften, fade) and never just vanish. Nothing pops in without motion.

Every value is a pure function of time (`time.ts`: `p`, `tw`, `life`), with no state and no CSS animation, so any
frame renders the same every time and any scene can be scrubbed.

## 4. App screens: rebuilt in code, never pasted

- **Never use an app screenshot or screen recording in a film,** not as a background, a placeholder, behind a blur or
  "just for now". `screens/` and `recordings/` in this repo are references to rebuild from, never footage.
- **Rebuild it exactly.** Match the layout, spacing, radii, colours, icons and copy of the live app. Take the copy from
  the app source (`respirelyf-react-native/src/features/*`) rather than guessing at it from a capture.
- **Build every screen from pieces** (header, tiles, rows, chips, charts, sheet), each one its own component, so each
  can move on its own. A screen that can only appear as one block was built wrong.
- **Then make it move:** tiles build in, values count, charts draw, a tap presses, a sheet slides up. Use `recordings/`
  to match how the real app moves.
- **Screens can leave the phone.** A card can lift off the screen and become the next scene, and a value can fly from
  the watch to the phone. That's the hand-off from section 1.
- Values that aren't real captures (demo numbers, illustrative trends) are listed as illustrative in the film's notes.

## 5. Checking motion

- **Watch every transition in motion** in Remotion Studio at full speed. Stills prove a frame, not a move.
- Scrub each transition frame by frame. Look for:
  - pops
  - jumps in scale or position
  - text that overlaps or crosses during a move
  - anything that arrives with no motion
- Check the whole film once muted: does the motion alone tell the story?
- Review it with the voice on: does every move land on its line?
- Render at 60 fps (1920×1080).
