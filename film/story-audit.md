# Story and timing audit (run it on every video before picture lock)

A film can have every scene right and still feel wrong, because things arrive in the wrong order: a finding before
it's set up, an action that belongs to a different finding, a line that plays over the wrong picture. This audit
finds those. Run it with an agent once the first full cut plays end to end, and again after big changes.

Worked example, with the before, the findings and the after: `audits/2026-11-13-product-demo.md`.

## How to run it

1. **Give an agent the brief below**, filled in for the video. It reads the script, the timings and the cut, and
   renders stills (a dense pass, every 3 to 5 seconds and around every transition). It changes nothing.
2. **Watch the cut yourself** and write your own notes with timestamps, before you read the agent's report. Your eye
   catches feel ("something is off"); the agent catches order, dates and sync.
3. **Audit both lists against the film**: open every timestamp, check every claim in code or frames, and give each
   point a verdict: agree, agree with a change, or caution (a rule or a claim needs checking).
4. **Decide the order first, then write lines, then rebuild the picture.** New and changed lines go through the line
   bank's "Iterate every line" (`line-bank.md`) before any scene is rebuilt.
5. **Record it** in `audits/<date>-<video>.md`: the before, both lists of findings, the verdicts, the decisions, and
   the after. Add any new rule to "Rules this audit has taught us" below.

## The brief for the agent

> You are reviewing the story order and timing of a Remotion RespireLYF film. Read only; change no files.
> Read: the handoff or README, the timed voiceover script, the voice lines and their anchors (and generated lengths),
> the beat times, and the cut definition. Render stills of the cut densely and look at them.
> Check, with concrete times:
> 1. **Story logic:** is anything shown, named or relied on before it's introduced (a person, a term like MEEP or
>    fingerprint, a pattern, a count, a date)? Is anything set up but paid off late or never? Do dates and numbers
>    agree across scenes?
> 2. **The loop:** does the film walk Capture → Understand → Act → See progress → Improve forward, and does ONE
>    finding carry through Act, See progress and Improve? Does each stage marker sit right before the part it names?
> 3. **Voice against picture:** for every line, is its picture on screen while it plays? Flag lines that start
>    early, run into the next scene, overlap, or read the words on screen.
> 4. **Pacing:** dead holds (over 3 s with nothing new and no voice), rushed reveals (too much in under a second),
>    things said twice, moments that can't be read.
> Output a prioritized list: time, what's wrong, why it breaks the story, the smallest concrete fix (what moves
> where, which constant or file). Then a corrected sequence outline if the order should change. Verify every claim
> against code or frames, and mark what you couldn't verify.

## Rules this audit has taught us

From the 13 Nov 2026 product-demo audit (`audits/2026-11-13-product-demo.md`). Each was a real problem.

**Order and story**
- **Introduce the person before the first feature.** "This is Maya" over a feature icon (a man coughing) puts the
  wrong face on her. Show her, then the first feature.
- **Set up before you pay off.** The film's big idea (her Breathing Fingerprint) must be planted early, at the point
  where collecting turns into finding, not first named in the last minute.
- **Never reveal a finding early, or with a different number.** A teaser that says "three nights" before the card
  that says "4 nights" spends the reveal and contradicts it.
- **Don't show the same idea twice.** The 10 × 5 as a donut, then again as a web a minute later, reads as a repeat
  and interrupts the story it lands in. Show it once, where it does the most work.
- **One finding carries the loop.** Understand → Act → See progress → Improve must follow the same finding. Two
  findings told in alternation make every stage pay off the wrong one.
- **Progress comes after the action.** A "see what changed" view dated before the action, or contradicting the
  finding the viewer just saw, breaks trust.
- **Act includes the follow-up.** Showing the step to try isn't the end of Act: show that the product checks back on
  how it went, and that her response shapes what comes next.
- **Words like "again" need a first time on screen.**
- **One contrast, once.** Tracker vs co-pilot said three times in 20 seconds dilutes it. Say it once after the
  opening, at the moment that proves it (days with nothing logged).
- **Re-engage after a long run of features.** After every signal is explained (about 3:40 in a 6-minute film) the
  viewer needs a turn: why all of this exists.

**The loop on screen**
- **The loop runs through the film, not after it.** Each stage is marked as the film reaches it (a quick zoom into the
  loop that names the stage, then back out), never a separate loop scene at the end.
- **A stage marker comes right before its part, and in a silence.** It never cuts a voice line, and the camera never
  comes back to the previous page after it.
- **Use the app's own stage names**: Capture, Understand, Act, See progress, Improve (onboarding V8 and the website),
  with the website's subtitles where words are needed.

**Voice**
- **Budget the devices across the whole film.** Questions, "not X, Y" and any key image word each appear once or twice;
  count the lines that stay, not just the new ones.
- **Keep the user's own framing visible.** When the user gives raw lines, show each beside the polished options; a
  critic's "one spine" can quietly replace what the user meant.
- **Give the script one spine of words** that carries the loop forward, so the lines don't have to name the stages.
- **Association language, spoken naturally:** "high pollen and short sleep lined up with more coughing", not a list of
  nouns that reads the card on screen.
- **The voice never reads the screen.** If the words are on screen, the voice says something else.
- **A line starts with its picture and ends before the next scene.** Check every line's generated length.

**Look and motion**
- **Use the house visual language, not generic UI.** Yarn threads (the website's and the partner film's) instead of
  dashed lines and blue dots; real paint (shadow, colour, sheen), slack and frayed, at the reference's proportions.
- **No collage of cards.** A finale of five framed screens on a ring looks like a template. Transition through the
  idea itself (the fingerprint shrinking into the loop).
- **Motion is exact at 60 fps.** Anything travelling along a path is placed on the exact curve each frame (never
  snapped to sample points), with no per-dot filters.
- **A reference beats a description.** When the user points at a scene in another film or the website, open its code
  and match its numbers, not the impression of it.
