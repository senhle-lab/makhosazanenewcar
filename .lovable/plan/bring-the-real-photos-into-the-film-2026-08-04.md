# Bring the real photos into the film

The film already exists at `/` with seven scrolling scenes built on AI placeholder imagery. You've now uploaded five real photographs, so this pass replaces the fabricated shots with the genuine ones and finishes the closing line.

## Your photos and where each one goes

| Photo | Placed in |
| --- | --- |
| Signing the papers (grey blazer, red top) | Chapter Four — Her: the opening beat, "The signature" |
| Sitting behind the wheel, hands together | Chapter Four — Her: the emotional centre, "Her moment" |
| Family laughing together in the showroom | Chapter Two — Together: becomes the real hero image of the celebration scene |
| Red T-Cross R-Line front three-quarter (grille, R badge, headlight, wheel) | Grand Reveal hero, plus the Gallery hero |
| R-Line interior (seats, steering wheel, cockpit) | Chapter One — Fragments and the Gallery |

The AI-generated close-ups stay only where no real equivalent exists (rear lights, night cockpit, open road finale), so the film never shows a car that isn't hers.

## Changes

1. Upload the five photos to CDN storage and point the media manifest at them — the binaries stay out of the codebase.
2. Rework the media manifest so her portraits drive the "Her" chapter, the family shot drives "Together", and the real red T-Cross drives the Reveal and Gallery.
3. Chapter Two currently shows a reserved glass frame because there's no video yet. It will instead show the real family photograph, full-bleed with the three captions over it, and keep the video slot ready for when you upload the celebration clip.
4. Crop framing per slot so faces are never cut awkwardly — the portraits are tall, so they get portrait aspect frames; the car shots are wide and get cinematic frames.
5. Add the final line at the very end of the Finale, after "The journey continues…": *"Some journeys change your destination. Others change your life."* followed by *"— Congratulations on your new Volkswagen T-Cross R-Line."*
6. Update `MEDIA.md` so the remaining empty slots (celebration video, audio tracks) are still clearly documented.

## Technical notes

- Photos are uploaded with `lovable-assets` and referenced via `.asset.json` pointers imported in `src/lib/media.ts`; no component logic changes beyond framing classes.
- Existing scroll motion (Ken Burns zoom, parallax, light sweep) is reused as-is — transform/opacity only, `prefers-reduced-motion` respected.
- Verified in the browser at mobile and desktop widths after the swap.

## Still needed from you

- The **celebration video** (`public/media/celebration.mp4`) for the family scene's motion moment.
- The **audio files** — score, ambience, whoosh, ignition, door close — which stay silent until you drop them in.
