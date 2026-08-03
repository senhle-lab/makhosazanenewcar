import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Slow Ken Burns zoom with differential parallax, driven by scroll position.
 * Transform + opacity only, so it stays GPU-composited.
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
  caption?: string;
  className?: string;
  zoom?: number;
  parallax?: number;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [zoom, 1.02]);
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [-parallax, parallax],
  );
  const opacity = useTransform(scrollYProgress, [0, 0.22, 0.8, 1], [0, 1, 1, 0.35]);

  return (
    <motion.figure
      ref={ref}
      style={{ opacity }}
      className={`film-grain relative m-0 overflow-hidden bg-obsidian ${className}`}
    >
      <motion.img
        src={src}
        alt={alt}
        width={1920}
        height={1088}
        loading={priority ? "eager" : "lazy"}
        style={{ scale, y }}
        className="gpu h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/10 to-obsidian/40" />
      {caption ? (
        <figcaption className="absolute bottom-5 left-6 right-6 font-body text-[0.6rem] uppercase tracking-[0.36em] text-champagne/80">
          {caption}
        </figcaption>
      ) : null}
    </motion.figure>
  );
}
