# Performance Guard + "Share this moment"

Two additions to the film, both designed to stay invisible unless needed.

## 1. Performance guard (auto-degrade on weak devices)

A small client-side monitor that watches the film while it plays and quietly simplifies motion when the device can't keep up.

What it measures:
- **FPS** — rolling average via `requestAnimationFrame` sampling over ~1s windows.
- **Load time** — first paint / hero image decode timing from the Performance API.
- **Media buffering** — how long images/video in view take to become ready.
- **Device signals** — `navigator.hardwareConcurrency`, `deviceMemory`, `prefers-reduced-motion`, and connection type where available.

Three quality tiers, chosen at start from device signals and then downgraded live if FPS stays below threshold (~40fps sustained, upgrade never happens mid-scroll to avoid flapping):

| Tier | Behaviour |
|---|---|
| Cinematic | Everything as today: Ken Burns zoom, parallax, blur transitions, film grain, glass blur |
| Balanced | Reduced parallax distance, no blur filters, lighter grain, glass blur softened |
| Essential | Static images with simple fade-in only, no parallax/zoom, no backdrop blur |

Implementation: a `PerformanceContext` provider at the film root exposes the tier. `KenBurnsImage`, `ScrollFade`, and `GlassFrame` read it and scale their motion parameters instead of each computing their own. `prefers-reduced-motion` continues to win outright.

No visible dashboard by default — the tier is applied silently. A tiny gold "Performance" readout (FPS + tier) is available via `?debug=perf` in the URL for your own checking.

## 2. "Share this moment" button

A fixed gold button beside the existing sound toggle, styled in the same glass/gold language.

Behaviour:
- Tracks which chapter is currently in view (Overture, Fragments, Together, Gallery, Her, The Reveal, Finale).
- On tap, renders a **1080x1350 social frame** on a canvas: the current scene's photo (cover-cropped, darkened), the chapter title, a short quote tied to that scene, and a footer line with her name and the vehicle plus a thin gold rule — matching the site's obsidian/gold/champagne palette and Cormorant/Karla type.
- Shows the result in a premium dialog with **Share** (native Web Share on mobile) and **Download** (PNG fallback on desktop).

Each scene gets its own paired quote, e.g. Fragments → "Not everything worth waiting for reveals itself at once." / The Reveal → "A journey built on faith, perseverance and success." / Finale → "Some journeys change your destination. Others change your life."

## Technical notes

- New files: `src/lib/performance-tier.ts` (monitor + tier logic), `src/components/cinema/PerformanceProvider.tsx`, `src/components/cinema/ShareMoment.tsx`, `src/lib/share-frame.ts` (canvas composition), `src/lib/scene-registry.ts` (chapter → image + quote map).
- Canvas draws the fonts already loaded in the document; images are drawn from the CDN asset URLs with `crossOrigin="anonymous"` so the canvas stays exportable.
- Everything is client-only, no backend, no new dependencies.
- Verified afterwards with a headless browser run at mobile and desktop widths: tier detection, generated frame screenshot, and zero console errors.
