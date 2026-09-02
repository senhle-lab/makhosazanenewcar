# Deploying to Cloudflare Workers

`vite build` produces **two** directories that must both be deployed:

```
dist/server/index.mjs   -> the Worker (SSR)
dist/client/            -> static assets: /assets/* (JS + CSS bundles), /media/*, favicon
```

`dist/client/assets/` holds the client JavaScript bundle **and the compiled
stylesheet**. If that directory is not uploaded (a common mistake is pointing the
assets binding at `public/` instead of `dist/client/`), the site still returns
HTTP 200 and `/media/...` files still resolve, but:

- the stylesheet 404s, so text falls back to left-aligned unstyled HTML
- the client bundle 404s, so nothing hydrates: no scroll reveals, no parallax,
  no sound button, and elements keep their server-rendered `opacity: 0`

## Correct deploy

The build already writes a ready Wrangler config — use it as-is:

```bash
npm run build
npx wrangler deploy -c dist/server/wrangler.json
```

`dist/server/wrangler.json` contains:

```json
{
  "main": "index.mjs",
  "assets": { "binding": "ASSETS", "directory": "../client" }
}
```

If you maintain your own `wrangler.toml`, mirror exactly that:

```toml
name = "your-worker"
main = "dist/server/index.mjs"
compatibility_date = "2026-09-02"

[assets]
binding = "ASSETS"
directory = "dist/client"
```

Do not set `run_worker_first = true` for `/assets/*` or `/media/*`.

## Verifying a deployment

```bash
curl -sI https://<your-worker-url>/ | head -1
curl -s https://<your-worker-url>/ | grep -o '/assets/[^"]*'   # note the hashed names
curl -sI https://<your-worker-url>/assets/<hashed>.js | head -1   # must be 200
curl -sI https://<your-worker-url>/assets/<hashed>.css | head -1  # must be 200
```

Both asset requests must return `200`. Anything else means the client bundle is
not being served and the cinematic behaviour cannot run.

## Safety nets in the code

- Critical CSS (dark canvas, serif display type, centered title cards) is inlined
  in the document head, so the layout stays centered and premium even without the
  external stylesheet.
- A hydration watchdog in the head adds `html.motion-fallback` if React has not
  mounted ~4s after load; CSS in `src/styles.css` then forces every animated
  element visible, so content is never permanently hidden.
- The sound button starts the local MP3 on click (user gesture) and reverts to
  "Sound off" if the browser refuses playback.
