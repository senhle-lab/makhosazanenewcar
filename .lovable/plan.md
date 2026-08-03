## The Experience

A single-page, scroll-driven cinematic film for **Mrs. Makhosazana Hadebe** and her new Volkswagen T-Cross R-Line. Black canvas, gold accents, white serif typography, glass panels, generous luxury spacing. Every section is a "scene" that reveals as you scroll.

Built at `/` (the home route), so it opens immediately.

## Scene Structure

```
1. OVERTURE      black → faint gold light bloom
                 one line at a time, fading in/out:
                 "Every dream begins with a single step."
                 "Every sacrifice becomes a story."
                 "Every journey deserves to be celebrated."
                 "The road to success isn't measured in kilometres…"
                 "…it's measured in determination."
                 sound toggle appears here

2. SUSPENSE      cinematic close-ups, never the whole car:
                 VW logo · R-Line badge · LED headlight · alloy wheel ·
                 steering wheel · dashboard · rear light signature
                 slow Ken Burns zoom + parallax on each

3. FAMILY        celebration scene — video slot (16:9 glass frame)
                 overlaid captions rising one by one:
                 "Because success is even more beautiful when shared."
                 "A family celebrating a dream fulfilled."
                 "Behind every milestone is love, support and
                  unforgettable memories."

4. GALLERY       alternating luxury layouts — full-bleed hero,
                 overlapping magazine pair, floating glass cards,
                 offset asymmetric spread. Each fades in with slow
                 zoom + differential parallax.

5. HER           details first (hands, walk, door opening, standing
                 beside the car), then the full reveal.
                 Word cards: Strength. Faith. Determination. Achievement.
                 → "This moment belongs to her."

6. GRAND REVEAL  full car, golden-hour grade, light sweep across frame
                 "Introducing…"  →  "Mrs. Makhosazana Hadebe"
                 →  "A journey built on faith, perseverance and success."
                 →  "The Volkswagen T-Cross R-Line."

7. BLESSING      "Congratulations."
                 "This isn't simply a new car."
                 "It is the reward for years of perseverance."
                 "May every journey bring joy."
                 "May every destination bring new opportunities."
                 "May God protect every road ahead."
                 → "The journey continues…"  → fade to black
```

## Visuals

I'll generate a full set of cinematic AI images as stand-ins — black-background automotive detail shots (badge, headlight, wheel, interior, side profile, rear lights, golden-hour hero) sized 4K-ratio for crisp display. Each image lives in a named slot so you can drop your real photos and video in later by replacing one file per slot, with a single manifest file listing every slot and its purpose.

The family celebration video and the "her" portrait shots get elegant placeholder frames rather than AI-generated people — those moments should only ever be the real thing.

## Audio

A sound toggle (gold, unobtrusive, fixed corner) that starts muted — browsers block autoplay audio, and unmuted-by-default would break the opening. Once enabled, a looping score bed plays and fades in/out across scene boundaries, plus slots for wind ambience, whoosh, ignition, and door-close cues triggered at their matching scene. All audio paths sit in one config file so your uploaded music drops straight in. Until then the site plays silent with the toggle in place.

## Motion & Performance

- Scroll animation via Framer Motion `useScroll` / `useTransform`, transform + opacity only (GPU-composited) — no layout-triggering properties
- `IntersectionObserver`-gated reveals so offscreen scenes cost nothing
- Responsive from 390px up: type scales with `clamp()`, gallery layouts collapse to single column, parallax intensity reduces on mobile
- `prefers-reduced-motion` respected — reveals become simple fades

## Technical

- Route: rewrite `src/routes/index.tsx` with proper cinematic head metadata (title, description, og/twitter tags)
- Design tokens added to `src/styles.css`: obsidian blacks, champagne/gold accents, glass surfaces, cinematic easing curves — no hardcoded colours in components
- Typography: Cormorant Garamond (display serif) + Karla (body), loaded via `<link>` in `__root.tsx`
- One component per scene under `src/components/scenes/`, plus shared `CinematicText`, `KenBurnsImage`, `GlassFrame`, `SoundToggle`
- Framer Motion added as the only new dependency
- No backend needed — fully static, so it loads instantly

## Handoff for your real media

A short `MEDIA.md` listing each image slot, video slot, and audio slot with its filename and intended shot, so replacing placeholders is drag-and-drop.
