# AI footage: inhaler shots and phone screens

When a film uses AI-generated live-action shots (about 15–20% of a film, for the human moments: see section 11), follow
this. Everything else stays in code (`motion.md`).

# Part 1: Inhaler shots in AI footage: how to get them right

A checklist and recipe for any AI-generated shot of Maya (or anyone) using an asthma inhaler, written after testing it on Nano Banana Pro, Kling 3.0 and Kling 4.0 Omni (Nov 2026).

---

## 1. What correct looks like (the non-negotiables)

| # | Rule | Why |
|---|---|---|
| 1 | **Inhaler and watch on the same arm.** | RespireLYF's technique detection reads the motion through the watch on the arm that holds the inhaler. A watch on the other wrist is simply wrong for our product. |
| 2 | **Cap off** and visible (on the desk or table). | A capped inhaler can't be used; viewers notice. |
| 3 | **Upright:** silver canister on top, mouthpiece at the bottom pointing to the mouth. | Models often show it sideways or upside down. |
| 4 | **Grip:** thumb under the mouthpiece base, index finger on top of the canister. | That's the real metered-dose (puffer) grip. |
| 5 | **Breathe out first**, away from the inhaler. | Step 1 of correct technique. |
| 6 | **Mouthpiece between the teeth, lips sealed around it.** | Models often hover it in front of the mouth. |
| 7 | **Press once while starting a slow, deep breath in.** The canister moves **down into the holder** a few millimetres. | The press must be on the canister, at the mouth, during the breath. |
| 8 | **No visible spray, mist, cloud or puff.** | With lips sealed you see nothing. Models over-learned "inhaler = cloud" from nebulisers and vapes. |
| 9 | **No puff sound** from the model. Generate silent; the film adds its own sound. | Generated audio adds a fake hiss. |
| 10 | **Take it out, close the lips, hold the breath** (about 10 s in real life; 3–4 s reads fine on film), then breathe out slowly. | Models often keep the inhaler in the mouth during the hold. |

Copy rules still apply: "her watch" (never a watch brand), association words only, no outcome claims.

---

## 2. Why the models get it wrong (so you don't fight it with words)

- **The press is tiny** (3–4 mm). At normal framing that's a few pixels, which the model treats as noise. It will bend the finger, or move the whole inhaler, but not slide the canister.
- **They don't know the mechanism.** To the model the inhaler is one blue-and-silver object, not a canister sliding inside a holder.
- **Training footage rarely shows it:** hands cover the canister, the press is a fraction of a second, or there's a spray cloud.
- **Words like "3–4 mm" are ignored.** Models have no sense of scale. Prompts steer the gist (holds it to her mouth, breathes in), not precise mechanics.
- **Hand swaps:** image models keep putting the inhaler in the right hand whatever you write. Don't re-roll for this; edit the frame (section 3, step B).

---

## 3. The recipe that works

### A. Make the start frame first (image model, e.g. Nano Banana Pro)

Never let the video model invent the grip. Generate the opening still, describe the object exactly, and check it before animating.

> "…She holds her blue asthma inhaler (a standard metered-dose puffer: a blue plastic L-shaped holder with a short mouthpiece at the bottom and a silver metal canister standing upright in the top) correctly in her LEFT hand, upright: canister straight up, mouthpiece at the bottom facing her mouth, her THUMB under the mouthpiece, her INDEX FINGER on top of the canister. The black smartwatch is on that SAME LEFT wrist. Her right hand rests on the desk with nothing on its wrist. The blue cap lies on the desk in front of her. Nothing is coming out of the inhaler: no mist, no spray."

**Check the frame:** same arm? cap off? upright? grip right? If the hands are wrong, go to B. Don't keep re-rolling.

### B. If the hands or watch are wrong: fix the frame, don't re-roll

1. **Mirror** the frame so the inhaler is in the left hand:
   `ffmpeg -i frame.png -vf hflip frame-flip.png`
2. **Make two masks** (white = change), the same size as the image: one over the watch on the resting wrist, one around the wrist holding the inhaler. Check them on a grid overlay.
3. **Retouch** (Magnific "retouch", precise mode, about 150 credits each):
   - Mask 1, prompt: "her bare wrist and hand resting on the desk, no watch".
   - Mask 2, prompt: "a minimal black smartwatch on this wrist, dark face to camera, matte black strap, same 3D style and lighting".
4. **Check the result** before animating.

(Mirroring flips the ponytail side; that's minor. Otherwise use retouch alone and accept the watch on the right wrist only if the persona's watch side doesn't matter.)

### C. The wide shot (video model, e.g. Kling 3.0: start frame + character reference)

Start from the checked frame. Time each step:

> "Continuing exactly from the start frame: she holds the inhaler upright in her LEFT hand, the watch on that same wrist the whole time; the cap lies still on the desk. One continuous take, no cuts.
> 1. (0–1.5 s) Turns her head slightly away and breathes out fully.
> 2. (1.5–2.5 s) Brings the inhaler to her mouth, mouthpiece between her teeth, lips sealed.
> 3. (2.5–4.5 s) Slow deep breath in, eyes closing; her index finger presses the canister down once. Nothing visible comes out.
> 4. (4.5–5.3 s) Takes the inhaler away and closes her lips.
> 5. (5.3–7.3 s) Holds her breath, lips closed, inhaler lowered.
> 6. (7.3–8 s) Breathes out slowly through her nose, small relieved smile.
> The inhaler stays the same solid shape and in the same hand."

**Negative prompt (always):**

> mist, spray, smoke, vapour, cloud, puff of gas, particles coming out of the inhaler, cap on the mouthpiece, cap moving, watch moving to the other wrist, switching hands, inhaler upside down, inhaler held sideways, pressing the inhaler away from the mouth, keeping the inhaler in the mouth while holding breath, talking, extra fingers, deformed hands, the inhaler changing shape, cuts

**Settings:** sound/audio **off**.

### D. The press: never trust the wide shot for it. Make a close-up with start and end frames

1. **"Up" frame** (image model, from the corrected frame): a side close-up of her lips sealed on the mouthpiece, the same hand and watch, the canister standing up with a clear length of silver showing, her finger resting on top.
2. **"Down" frame:** the *same image*, edited in place (Ideogram 4.5 "precise edit", about 80 credits): "keep everything identical; the index finger presses down and the canister is pushed into the holder so only a short sliver of silver shows."
3. **Animate between them** (Kling 3.0 with start + end frame, 4 s, about 280 credits): "lips stay sealed, slow breath in; the index finger presses the canister down into the holder; camera still; nothing comes out."
4. **Cut it into the wide shot** at the press moment (zoom in, then back out), e.g.:
   `xfade=transition=zoomin` into the close-up, then a fade back to the wide shot after the press.

Because the model is given both states, it has to move the canister. This is the reliable fix.

### E. Other options for the press (if D isn't enough)

- **Motion reference:** film a real hand pressing a real inhaler (5 s, close, on a phone) and use Kling's **Motion Control** to transfer that exact motion onto Maya. Most natural.
- **Make it big:** an extreme close-up and/or slow motion, so the press is dozens of pixels, not a few.
- **Do it in code:** use the film's own coded or 3D close-up (technique panel, watch animation) for the press and cut it in. Exact every time.

### F. Using Seedance 2.5 (photoreal) instead of Kling

The same recipe works, with these differences:

| | Kling 3.0 | Seedance 2.5 |
|---|---|---|
| Start frame + end frame | yes | **yes**, so the press close-up (D) works the same way |
| Start frame **and** character photos together | yes | **no: one or the other.** For inhaler shots use the **start frame** (it carries the face and grip); skip the reference photos. |
| Negative prompt | yes | **no.** Say it positively in the prompt: "nothing is visible coming out of the inhaler, no mist, no spray; the watch stays on her left wrist the whole time" |
| Sound | turn sound off | turn sound effects **and** music off (generated audio is on by default) |
| Cheap retries | none | **480p "Draft"** mode: iterate cheaply, then upgrade the good take to 1080p *as the same shot* |

Photoreal extras:
- **Start frames:** make them photoreal (Nano Banana Pro or Seedream 5 Pro) with the real-camera cues (hard light, grain, lived-in desk). The mirror and retouch fix in B works the same on photos.
- **Hands are harder in photoreal.** Keep the inhaler hand in frame and fairly large, check fingers carefully, and expect 2–3 takes.
- **Real inhaler references help.** A clean photo of a real blue puffer (cap off, upright) as an extra image reference makes the object more accurate. (In Seedance, references can't be combined with a start frame, so put the inhaler accurately into the start frame itself.)
- **The press close-up** (D) matters even more in photoreal, because a fake press looks more wrong on a real-looking hand.

---

## 4. Quality check before using a shot (frame by frame)

Pull frames (e.g. `ffmpeg -i clip.mp4 -vf "fps=4,scale=320:-1,tile=8x2" -frames:v 1 sheet.jpg`) and crop to the hand and mouth. Check every item:

- [ ] Watch on the **same arm** as the inhaler in **every** frame (no swapping mid-shot)
- [ ] Cap off, and it doesn't move or reappear
- [ ] Inhaler upright the whole time; its shape doesn't morph
- [ ] Breath out happens before the mouthpiece goes in
- [ ] Lips **sealed** around the mouthpiece during the press
- [ ] The canister **visibly moves down** (check the close-up: less silver showing)
- [ ] **No** mist, spray, haze or cloud (look closely near the window light, which can fake a haze)
- [ ] Inhaler **out of the mouth** during the breath-hold
- [ ] Hands: five fingers, no melting or merging
- [ ] No generated audio track (strip it: `ffmpeg -i in.mp4 -an -c:v copy out.mp4`)

---

## 5. Costs seen in testing (Magnific, Nov 2026)

| Step | Credits |
|---|---|
| Start frame (Nano Banana Pro, 2K) | 75 per image |
| Retouch one area (precise) | 150 |
| Precise edit for the "down" frame (Ideogram 4.5) | 80 |
| Kling 3.0, 4 s close-up (start + end frame) | 280 |
| Kling 3.0, 8 s wide shot | 560 |
| Kling 3.0, 10 s | 700 |

One full corrected inhaler shot (frames, two retouches, close-up and wide) comes to about **1,300 credits**.

---

## 6. Reference clips (the demo film's eval clips, not in this repo)

- `14a`: first attempt (cap on; inhaler kept in the mouth during the hold)
- `14b`: cap off; correct seal; but the watch is on the other arm and there's no real press
- `14c`: **the fixed version:** same arm, real press (close-up cut in), cap off, no spray
- `14d`: the press close-up on its own

---
---

# Part 2: Phone screens in AI footage (putting the real app on Maya's phone)

How to show the real RespireLYF app on a phone in an AI-generated shot so it looks real and stays locked to the phone. Written after the POV food-rating tests (H3 Turbo + coded screen, Nov 2026).

---

## 7. The rule: the model makes the phone, code makes the screen

- **Video and image models can't draw our UI.** They garble text, invent buttons and redraw the screen every frame, so it "boils". Giving them a screenshot as reference doesn't fix this: the layout drifts within a second.
- **So never let the model draw the app.** Generate the shot with a **plain white screen**, rebuild the screen in code (Remotion, from `screens/` in this repo), and composite it onto the phone frame by frame.
- **Never put screenshots in the film.** The screen is always the coded version, so the text is sharp and the animation is ours.

---

## 8. The recipe

### A. Generate the footage with a white screen

Start frame (Nano Banana Pro) and video prompt both say:

> "…the phone screen is plain, solid, evenly lit white: no app, no text, no icons, no reflections on it. All four corners of the screen stay visible. Her thumb may touch the lower part of the screen."

Real-camera cues as usual (handheld, hard light, lived-in room, grain). A cheap model is fine here (H3 Turbo, ~240 credits for 6 s), because the hard part is our screen, not the footage.

**Check:** the screen is white and clean in every frame, all four corners are visible, and nothing white (a bowl, sleeve, paper) touches the screen's edge.

### B. Render the coded screen as an image sequence

Build the screen as its own composition at the phone's native size times 3 (e.g. `Eval-Rating-Screen`, 402 × 874 points → 1206 × 2622 px), timed to the footage (her tap at the right second). Then:

```
npx remotion render Eval-Rating-Screen out/rating-seq --sequence --image-format=jpeg
```

### C. Fit it onto the phone (`film/tools/fit-screen.py` in this repo)

```
python fit-screen.py footage.mp4 out/rating-seq out/shot.mp4 [--debug 10,40,90]
```

(Needs Python with `opencv-python-headless`, `numpy` and ffmpeg. It writes a 1920 × 1080 film; for 9:16 set
`W, H = 1080, 1920` at the top.) What it does each frame:

1. **Finds the white screen** (bright, low-saturation pixels), keeps the portrait-shaped blob nearest last frame's.
2. **Measures each edge separately** with outlier rejection. The top edge is measured on the "ears" beside the notch, so the app fills to the top and around the notch, not just under it.
3. **Smooths over time** (position, angle, size) so the screen is rock-steady but still follows the hand. Without this it jitters 2–25 px and looks fake.
4. **Warps the coded screen** onto that shape, ~1% larger so it tucks under the bezel (no white rim).
5. **Keeps the thumb in front:** only white pixels of the footage are replaced, so fingers over the screen stay on top.
6. **Makes it look photographed:** rounded corners, slight blur to match the footage's sharpness, a little contrast loss, a glass sheen that shifts with the phone's angle, and sensor grain over everything.
7. Optional **push-in** towards the phone so the screen reads.

`--debug` writes frames with the fitted outline drawn on, to check the fit.

### D. Add the sound and voice in the film

Generate silent footage; tap, chime and narration are added in Remotion or ffmpeg.

---

## 9. Which phone angles work

**Works now (current script):**

- Phone roughly facing the camera: her eye level (POV) or straight-on.
- Rotated in the frame (tilted left or right), normal hand shake, slow drift.
- Thumb or fingers on the screen, as long as most of each edge stays visible.
- Notch or Dynamic Island.
- Dark scenes (a bright screen in a dark room is even easier to find).

**Doesn't work yet:**

1. **Leaning back or forward towards the camera** (perspective, the far end narrower). The script fits a rectangle, not a trapezoid, so the app slides off the corners. Main limit.
2. **Strong angles** (past ~40°) or **edge-on**: too thin to measure.
3. **Landscape** phones (it only looks for portrait shapes).
4. **A corner out of frame** or a whole hand covering it.
5. **White things touching the screen** (they merge with it).

**The upgrade for 1–4** (not built yet): fit each edge as its own line so the screen can be any four-sided shape (true perspective), order the corners by angle instead of assuming portrait, smooth the corners over time, track the phone body/bezel to bridge frames, and fade the screen out where it can't be found. Test on one deliberately tilted shot (e.g. Maya on the sofa looking down at her phone; H3 Turbo, ~240 credits).

Edge-on or fully covered screens won't work with any tool. Standard trick: don't show the screen at those moments.

---

## 10. Directing shots so the screen always works

- Keep the phone **mostly facing the camera** (within ~30–40°).
- Keep **all four corners in frame**.
- **Thumbs on the screen are fine; whole hands over it aren't.**
- **Nothing white touching the phone** (white bowl, sleeve, paper).
- For other angles, have the **screen face away** from the camera (like the desk shot) and **push into our coded 3D phone** for the app moment.

---

## 11. Where photoreal fits in the film (the norm)

- **Code is the backbone** (the app, data, the watch, the story beats). About **15–20% realistic live shots** for the human moments: the hook, the cough night, the quiet days, pollen outside, the ending.
- **Phone screens are always code**, either composited as above or by handing off to the coded phone with a push-in.
- **Why our first AI shots looked fake** (avoid these): the soft stock-ad look, a 3D-avatar origin for the face, smooth gimbal moves, no grain, upscaling and over-clean single takes. Use real-camera direction: handheld, hard light, a lived-in room, grain.

---

## 12. Quality check for screen shots

- [ ] Screen is **locked** to the phone (scrub frame by frame: no sliding or shaking)
- [ ] App **fills to the top** and around the notch; no white rim at any edge
- [ ] **Thumb stays in front** of the screen when it touches
- [ ] Screen sharpness and grain **match the footage** (not crisper than the room)
- [ ] Sheen/brightness looks like glass, not a sticker
- [ ] Text readable at the final size (push in if not)
- [ ] App copy follows the rules: association words only, "her watch", no outcome numbers

---

## 13. Costs seen (Magnific, Nov 2026)

| Step | Credits |
|---|---|
| Start frame (Nano Banana Pro, 2K) | 75 |
| H3 Turbo, 6 s 768p | 240 |
| Kling 2.5, 5 s | 140 |
| Seedance 2.5, 15 s 720p (for comparison) | 6,600 |
| Coded screen + fitting | free (runs locally) |

One POV screen shot came to about **390 credits** in total.

## 14. Reference clips (the demo film's eval clips, not in this repo)

- `7`: first POV food-rating composite (screen shaking: corner tracking, no smoothing)
- `7b`: steady screen (edge fitting + smoothing)
- `7c`: **the fixed version:** fills to the top with the notch, no white rim, sheen and grain
