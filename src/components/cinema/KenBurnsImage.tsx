import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useMotionBudget } from "@/components/cinema/PerformanceProvider";

/**
 * Slow Ken Burns zoom with differential parallax, driven by scroll position.
 * Transform + opacity only, so it stays GPU-composited. Motion amplitude is
 * scaled by the live performance tier so weak devices stay smooth.
 */
export function KenBurnsImage({
  src,
  alt,
  caption,
  className = "",
  zoom = 1.18,
  parallax = 60,
  priority = false,
}: {
  src: string;
  alt: string;
  caption?: string | undefined;
  className?: string;
  zoom?: number;
  parallax?: number;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const budget = useMotionBudget(parallax, zoom);
  const still = reduced || (budget.parallax === 0 && budget.zoom <= 1.001);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], still ? [1, 1] : [budget.zoom, 1.02]);
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    still ? [0, 0] : [-budget.parallax, budget.parallax],
  );
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.85, 1], [0.2, 1, 1, 0.6]);

  return (
    <motion.figure
      ref={ref}
      style={{ opacity }}
      className={`relative m-0 overflow-hidden bg-obsidian ${budget.glass ? "film-grain" : ""} ${className}`}
    >
      <motion.img
        src={src}
        alt={alt}
        width={1920}
        height={1088}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        style={{ scale, y }}
        className="gpu h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-obsidian/40" />
      {caption ? (
        <figcaption className="absolute bottom-5 left-6 right-6 font-body text-[0.6rem] uppercase tracking-[0.36em] text-champagne/80">
          {caption}
        </figcaption>
      ) : null}
    </motion.figure>
  );
}
