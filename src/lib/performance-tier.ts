/**
 * Real-time performance monitoring for the film.
 *
 * Watches frame rate, initial load timing and media buffering, then picks a
 * quality tier so weak devices get a simpler — but still elegant — film
 * instead of a stuttering one. Client-only: every entry point guards for
 * `window`.
 */

export type QualityTier = "cinematic" | "balanced" | "essential";

export type PerfSnapshot = {
  tier: QualityTier;
  fps: number;
  loadMs: number;
  bufferMs: number;
  reason: string;
};

const TIER_ORDER: QualityTier[] = ["cinematic", "balanced", "essential"];

/** Motion budget per tier — components read these instead of hardcoding. */
export const TIER_MOTION: Record<
  QualityTier,
  { parallax: number; zoom: number; blur: boolean; grain: boolean; glass: boolean }
> = {
  cinematic: { parallax: 1, zoom: 1, blur: true, grain: true, glass: true },
  balanced: { parallax: 0.45, zoom: 0.5, blur: false, grain: true, glass: false },
  essential: { parallax: 0, zoom: 0, blur: false, grain: false, glass: false },
};

function lowerTier(tier: QualityTier): QualityTier {
  const next = TIER_ORDER[Math.min(TIER_ORDER.indexOf(tier) + 1, TIER_ORDER.length - 1)];
  return next ?? tier;
}

type NavigatorSignals = Navigator & {
  deviceMemory?: number;
  connection?: { effectiveType?: string; saveData?: boolean };
};

/** Pick a starting tier from static device signals, before any frame is drawn. */
export function detectInitialTier(): { tier: QualityTier; reason: string } {
  if (typeof window === "undefined") return { tier: "cinematic", reason: "server" };

  const nav = navigator as NavigatorSignals;
  const cores = nav.hardwareConcurrency ?? 8;
  const memory = nav.deviceMemory ?? 8;
  const effectiveType = nav.connection?.effectiveType ?? "4g";
  const saveData = nav.connection?.saveData === true;

  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    return { tier: "essential", reason: "reduced motion" };
  }
  if (saveData || effectiveType === "slow-2g" || effectiveType === "2g") {
    return { tier: "essential", reason: `network ${effectiveType}${saveData ? " + save-data" : ""}` };
  }
  if (cores <= 4 || memory <= 4 || effectiveType === "3g") {
    return { tier: "balanced", reason: `${cores} cores / ${memory}GB / ${effectiveType}` };
  }
  return { tier: "cinematic", reason: `${cores} cores / ${memory}GB / ${effectiveType}` };
}

/** Time to the first contentful paint, as a rough load-cost signal. */
function readLoadMs(): number {
  if (typeof performance === "undefined") return 0;
  const paint = performance.getEntriesByType("paint") as PerformanceEntry[];
  const fcp = paint.find((entry) => entry.name === "first-contentful-paint");
  if (fcp) return Math.round(fcp.startTime);
  const [nav] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
  return nav ? Math.round(nav.responseEnd) : 0;
}

const SAMPLE_MS = 1_000;
const LOW_FPS = 40;
const CRITICAL_FPS = 24;
const SLOW_WINDOWS_BEFORE_DOWNGRADE = 2;

/**
 * Starts frame-rate sampling and media-buffering observation.
 * Calls `onSnapshot` after every sample window. Returns a stop function.
 */
export function startPerformanceMonitor(onSnapshot: (snapshot: PerfSnapshot) => void): () => void {
  if (typeof window === "undefined") return () => {};

  const detected = detectInitialTier();
  let tier = detected.tier;
  let reason = detected.reason;
  let bufferMs = 0;
  let slowWindows = 0;
  let frames = 0;
  let windowStart = performance.now();
  let raf = 0;
  let stopped = false;

  // Media buffering: how long images/video actually take to arrive.
  let observer: PerformanceObserver | undefined;
  if (typeof PerformanceObserver !== "undefined") {
    try {
      observer = new PerformanceObserver((list) => {
        const media = list
          .getEntries()
          .filter((entry) => {
            const resource = entry as PerformanceResourceTiming;
            return resource.initiatorType === "img" || resource.initiatorType === "video";
          })
          .map((entry) => entry.duration);
        if (media.length === 0) return;
        const slowest = Math.round(Math.max(...media));
        bufferMs = Math.round(bufferMs * 0.6 + slowest * 0.4);
      });
      observer.observe({ type: "resource", buffered: true });
    } catch {
      observer = undefined;
    }
  }

  const emit = () => {
    onSnapshot({
      tier,
      fps: lastFps,
      loadMs: readLoadMs(),
      bufferMs,
      reason,
    });
  };

  let lastFps = 60;

  const tick = (now: number) => {
    if (stopped) return;
    frames += 1;
    const elapsed = now - windowStart;
    if (elapsed >= SAMPLE_MS) {
      lastFps = Math.round((frames * 1000) / elapsed);
      frames = 0;
      windowStart = now;

      // Only ever degrade — upgrading mid-scroll would visibly flap.
      if (lastFps < CRITICAL_FPS && tier !== "essential") {
        tier = "essential";
        reason = `${lastFps} fps sustained`;
        slowWindows = 0;
      } else if (lastFps < LOW_FPS) {
        slowWindows += 1;
        if (slowWindows >= SLOW_WINDOWS_BEFORE_DOWNGRADE && tier !== "essential") {
          tier = lowerTier(tier);
          reason = `${lastFps} fps sustained`;
          slowWindows = 0;
        }
      } else {
        slowWindows = 0;
      }

      emit();
    }
    raf = requestAnimationFrame(tick);
  };

  emit();
  raf = requestAnimationFrame(tick);

  const onVisibility = () => {
    // Background tabs throttle rAF — reset the window so we don't misread it.
    frames = 0;
    windowStart = performance.now();
    slowWindows = 0;
  };
  document.addEventListener("visibilitychange", onVisibility);

  return () => {
    stopped = true;
    cancelAnimationFrame(raf);
    observer?.disconnect();
    document.removeEventListener("visibilitychange", onVisibility);
  };
}
