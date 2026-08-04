# Media slots

## Real photographs (already in the film)

Uploaded and served from CDN via `.asset.json` pointers in `src/assets/`:

| Pointer | Where it appears |
| --- | --- |
| `her-signing.jpg.asset.json` | Chapter Four — Her ("The signature") |
| `her-driving.jpg.asset.json` | Chapter Four — Her ("Her moment") + Gallery |
| `family-celebration.jpg.asset.json` | Chapter Two — Together + Gallery |
| `tcross-front.jpg.asset.json` | Chapter One, Gallery hero, Grand Reveal |
| `tcross-interior.jpg.asset.json` | Chapter One, Gallery |

To swap one, upload a new file and replace the pointer:

```bash
lovable-assets create --file /path/to/new.jpg --filename her-driving.jpg > src/assets/her-driving.jpg.asset.json
```

## Remaining AI placeholders — `src/assets/`

| File | Where it appears |
| --- | --- |
| `detail-badge.jpg` | Chapter One — R-Line badge |
| `detail-headlight.jpg` | Chapter One / Gallery |
| `detail-wheel.jpg` | Chapter One / Gallery |
| `detail-dashboard.jpg` | Chapter One — cockpit at night |
| `detail-rear.jpg` | Chapter One — tail lights |
| `road-ahead.jpg` | Finale — open road |

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
