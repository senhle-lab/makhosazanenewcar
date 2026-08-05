import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import {
  detectInitialTier,
  startPerformanceMonitor,
  TIER_MOTION,
  type PerfSnapshot,
  type QualityTier,
} from "@/lib/performance-tier";

type QualityValue = {
  tier: QualityTier;
  motion: (typeof TIER_MOTION)[QualityTier];
  snapshot: PerfSnapshot | null;
};

const FALLBACK: QualityValue = {
  tier: "cinematic",
  motion: TIER_MOTION.cinematic,
  snapshot: null,
};

const QualityContext = createContext<QualityValue>(FALLBACK);

export function useQuality() {
  return useContext(QualityContext);
}

/**
 * Motion budget for a component: parallax distance and zoom are scaled down
 * (or removed) as the device shows it can't sustain the full film.
 */
export function useMotionBudget(parallax: number, zoom: number) {
  const { motion } = useQuality();
  const reduced = useReducedMotion();
  if (reduced) return { parallax: 0, zoom: 1, blur: false, glass: motion.glass };
  return {
    parallax: parallax * motion.parallax,
    zoom: 1 + (zoom - 1) * motion.zoom,
    blur: motion.blur,
    glass: motion.glass,
  };
}

export function PerformanceProvider({ children }: { children: ReactNode }) {
  const [snapshot, setSnapshot] = useState<PerfSnapshot | null>(null);
  const [debug, setDebug] = useState(false);

  useEffect(() => {
    setDebug(new URLSearchParams(window.location.search).get("debug") === "perf");
    const stop = startPerformanceMonitor(setSnapshot);
    return stop;
  }, []);

  const value = useMemo<QualityValue>(() => {
    const tier = snapshot?.tier ?? detectInitialTier().tier;
    return { tier, motion: TIER_MOTION[tier], snapshot };
  }, [snapshot]);

  return (
    <QualityContext.Provider value={value}>
      {children}
      {debug ? <PerfReadout snapshot={snapshot} /> : null}
    </QualityContext.Provider>
  );
}

function PerfReadout({ snapshot }: { snapshot: PerfSnapshot | null }) {
  if (!snapshot) return null;
  return (
    <div className="fixed bottom-4 left-4 z-[60] rounded-xl border border-gold/30 bg-obsidian/85 px-3 py-2 font-body text-[0.55rem] uppercase leading-relaxed tracking-[0.22em] text-champagne/90">
      <div>{snapshot.fps} fps</div>
      <div className="text-gold">{snapshot.tier}</div>
      <div>load {snapshot.loadMs} ms</div>
      <div>media {snapshot.bufferMs} ms</div>
      <div className="max-w-[9rem] normal-case tracking-normal text-ash">{snapshot.reason}</div>
    </div>
  );
}
