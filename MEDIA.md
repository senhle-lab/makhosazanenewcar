# Media slots

Everything below is a placeholder you can replace. Keep the filename identical and the
site picks it up automatically — no code changes needed.

## Images — `src/assets/`

| File | Where it appears | Intended shot |
| --- | --- | --- |
| `detail-logo.jpg` | Chapter One | Macro of the VW roundel on the grille |
| `detail-badge.jpg` | Chapter One | R-Line badge close-up |
| `detail-headlight.jpg` | Chapter One / Gallery | LED headlight signature |
| `detail-wheel.jpg` | Chapter One / Gallery | Alloy wheel, low angle |
| `detail-steering.jpg` | Chapter One | Steering wheel, ambient interior light |
| `detail-dashboard.jpg` | Chapter One / Gallery | Digital cockpit at night |
| `detail-rear.jpg` | Chapter One | Rear tail-light signature |
| `detail-profile.jpg` | Gallery / Her | Side profile silhouette |
| `detail-door.jpg` | Gallery / Her | Driver door opening |
| `detail-keys.jpg` | Gallery / Her | Keys in her hand |
| `hero-reveal.jpg` | Grand Reveal | Full car, golden hour, three-quarter front |
| `road-ahead.jpg` | Finale | Open road into a golden horizon |

Her portrait moments (hands, smile, walking, standing beside the car) currently reuse the
detail shots. Replace the three entries in `herSlots` inside `src/lib/media.ts` with her
real photographs — that's the emotional core of the film.

## Video — `public/media/`

1. Save the celebration clip as `public/media/celebration.mp4`.
2. In `src/lib/media.ts`, set:

```ts
export const celebrationVideo = {
  src: "/media/celebration.mp4",
  poster: null,
};
```

Until then, Chapter Two shows an elegant reserved glass frame.

## Audio — `public/media/audio/`

Fill in the paths in `src/lib/audio.ts`:

| Key | Suggested file | Role |
| --- | --- | --- |
| `score` | `score.mp3` | Looping orchestral bed — piano, strings, deep bass |
| `ambience` | `wind.mp3` | Soft wind / room ambience under the opening |
| `whoosh` | `whoosh.mp3` | Transition into Chapter One |
| `ignition` | `ignition.mp3` | Fires at the Grand Reveal |
| `doorClose` | `door-close.mp3` | Fires at the Finale |

Audio only starts after the visitor presses **Sound on** — browsers block autoplay, and an
unexpected blast of music would break the opening. Everything stays silent, with no failed
requests, until you set a path.
