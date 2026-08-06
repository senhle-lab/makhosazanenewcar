# Media slots

Every frame in the film is a real photograph, colour-graded to the black-and-gold
look and pre-cropped to the aspect ratio of the slot it fills. All of them are
CDN-hosted via `.asset.json` pointers in `src/assets/`, imported by `src/lib/media.ts`.

## Your photographs

| Pointer | Where it appears |
| --- | --- |
| `her-signing.jpg.asset.json` | Chapter Four — Her ("The signature") |
| `her-driving.jpg.asset.json` | Chapter Four — Her ("Her moment") + Gallery |
| `family-celebration.jpg.asset.json` | Chapter Two — Together + Gallery |
| `tcross-front.jpg.asset.json` | Chapter One ("The mark"), Gallery hero, Chapter Five closing hero |
| `tcross-interior.jpg.asset.json` | Chapter One ("In her hands"), Gallery |

## Graded detail frames

| Pointer | Where it appears |
| --- | --- |
| `overture-front.jpg.asset.json` | Overture — "The Road to Her Dream" backdrop |
| `mark-portrait.jpg.asset.json` | Chapter One — "R-Line" |
| `first-light-portrait.jpg.asset.json` | Chapter One — "First light" |
| `first-light-wide.jpg.asset.json` | Gallery — "First light" glass card |
| `stance-portrait.jpg.asset.json` | Chapter One — "Grounded" |
| `stance-wide.jpg.asset.json` | Gallery — "Stance" glass card |
| `every-detail.jpg.asset.json` | Chapter One — "Every detail" |
| `road-behind.jpg.asset.json` | Chapter One — "The road behind" |
| `reveal-rear.jpg.asset.json` | Chapter Five — The Reveal, opening frame |
| `road-ahead.jpg.asset.json` | Finale — the road ahead |

To swap one, upload a new file and replace the pointer:

```bash
lovable-assets create --file /path/to/new.jpg --filename her-driving.jpg > src/assets/her-driving.jpg.asset.json
```

## Video — the celebration clip

1. Save the clip as `public/media/celebration.mp4`.
2. In `src/lib/media.ts`, set:

```ts
export const celebrationVideo = {
  src: "/media/celebration.mp4",
  poster: null,
};
```

Until then, Chapter Two shows the real family photograph in a glass frame. Once the video
is set, it replaces that frame automatically.

## Audio — `public/media/audio/`

Fill in the paths in `src/lib/audio.ts`:

| Key | Suggested file | Role |
| --- | --- | --- |
| `score` | `score.mp3` | Looping orchestral bed — piano, strings, deep bass |
| `ambience` | `wind.mp3` | Soft wind / room ambience under the opening |
| `whoosh` | `whoosh.mp3` | Transition into Chapter One |
| `ignition` | `ignition.mp3` | Fires at the Grand Reveal |
| `doorClose` | `door-close.mp3` | Fires at the Finale |

Audio only starts after the visitor presses **Sound on** — browsers block autoplay. Everything
stays silent, with no failed requests, until you set a path.
