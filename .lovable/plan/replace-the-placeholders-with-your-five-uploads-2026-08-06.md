# Replace the placeholders with your five uploads

All six remaining AI-generated shots get replaced by graded versions of your five uploads. Structure, text, animation, spacing and typography stay byte-for-byte the same — only the image sources change.

## Where each upload goes

| Upload | Slot it fills |
| --- | --- |
| Dark front silhouette, headlights lit (IMG_8776) | Overture — "The Road to Her Dream" opening backdrop |
| Dark rear silhouette, red tail bar (IMG_8772) | Chapter Five — The Reveal: opens the chapter, then the real red T-Cross lands as the closing hero of that same chapter |
| Red-car taillight macro (IMG_8774) | "The road behind" (Chapter One) |
| Yellow-car IQ.Light headlight macro (IMG_8775) | "First light" (Chapter One + Gallery) |
| White-car taillight macro (IMG_8773) | "Grounded" / "Stance" — tight low crop, and "Every detail" — tight glow crop |

No stock/AI image is left anywhere: hero, gallery, detail grids and the finale road frame all come from your photos.

## Grading and cropping

Each upload is processed once per slot into a dedicated, pre-cropped file so nothing is stretched or shifted at runtime:

- Strong cinematic black-and-gold grade — deep smooth blacks, warm champagne highlights, rich contrast, consistent exposure across all frames so the film reads as one shoot.
- Intelligent recrop to the exact frame each slot uses (4/5 and 3/4 portrait details, square cockpit tiles, 16/9 cinematic hero, tall Overture backdrop) with the subject kept centred and nothing important clipped.
- Files are exported at the resolution each frame actually needs, CDN-hosted, and keep the existing `loading`/`decoding` and fixed width/height attributes so there is no layout shift, flicker or pixelation.

## What does not change

Rounded corners, aspect ratios, Ken Burns zoom, parallax offsets, light sweep, reveal/fade animations, chapter labels, all copy, colours, fonts, sound cues and the performance-tier fallbacks are untouched. The only edits are the image entries in the media manifest, plus one added frame at the end of Chapter Five for the real-car hero.

## Technical notes

- Uploads are graded/cropped with the image edit tool, pushed through `lovable-assets`, and referenced as `.asset.json` pointers imported in `src/lib/media.ts`.
- The six obsolete AI files in `src/assets/` are deleted, and `MEDIA.md` is updated to list the new real-photo slots.
- `SceneReveal.tsx` gains the closing real-car frame using the existing scroll transforms — no new motion primitives.
- Verified in-browser at 414px and 1280px after the swap.
