import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useQuality } from "@/components/cinema/PerformanceProvider";

/**
 * A line of cinematic text that fades in as it enters the frame and fades
 * back out as it leaves — one sentence at a time, like a title card.
 */
export function ScrollFadeText({
  children,
  className = "",
  height = "80vh",
}: {
  children: ReactNode;
  className?: string;
  height?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { motion: budget } = useQuality();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.32, 0.6, 0.9], [0, 1, 1, 0]);
  const shift = reduced || budget.parallax === 0 ? 0 : 40 * budget.parallax;
  const y = useTransform(scrollYProgress, [0, 0.4, 1], [shift, 0, -shift]);
  const blur = useTransform(scrollYProgress, [0, 0.32, 0.6, 0.9], [8, 0, 0, 8]);
  const filter = useTransform(blur, (v) => (reduced || !budget.blur ? "none" : `blur(${v}px)`));

  return (
    <div ref={ref} className="flex items-center justify-center px-6" style={{ minHeight: height }}>
      <motion.p
        style={{ opacity, y, filter }}
        className={`gpu max-w-4xl text-center font-display text-[clamp(1.6rem,5vw,3.6rem)] font-light leading-[1.25] tracking-[0.01em] text-ivory ${className}`}
      >
        {children}
      </motion.p>
    </div>
  );
}

/** A simple, intentional reveal for anything that enters the frame once. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={`gpu ${className}`}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Small gold eyebrow label used to mark chapters. */
export function ChapterLabel({ children }: { children: ReactNode }) {
  return (
    <Reveal className="flex items-center justify-center gap-4">
      <span className="gold-rule h-px w-10 sm:w-16" />
      <span className="font-body text-[0.65rem] uppercase tracking-[0.42em] text-gold">
        {children}
      </span>
      <span className="gold-rule h-px w-10 sm:w-16" />
    </Reveal>
  );
}
