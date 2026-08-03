import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollFadeText } from "@/components/cinema/ScrollFade";
import { HONOUREE } from "@/lib/media";

const LINES = [
  "Every dream begins with a single step.",
  "Every sacrifice becomes a story.",
  "Every journey deserves to be celebrated.",
  "The road to success isn’t measured in kilometres…",
  "…it’s measured in determination.",
];

export function SceneOverture() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const bloomOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 0.55, 0.7, 0]);
  const bloomScale = useTransform(scrollYProgress, [0, 1], [0.6, 1.6]);

  return (
    <section ref={ref} className="relative">
      {/* faint light that slowly appears out of the black */}
      <motion.div
        aria-hidden="true"
        style={{ opacity: bloomOpacity, scale: bloomScale }}
        className="gpu pointer-events-none fixed left-1/2 top-1/2 -z-0 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--gold)_28%,transparent)_0%,transparent_62%)] blur-3xl" />
      </motion.div>

      <div className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.6em" }}
          animate={{ opacity: 1, letterSpacing: "0.42em" }}
          transition={{ duration: 3, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="font-body text-[0.6rem] uppercase text-gold sm:text-[0.7rem]"
        >
          A celebration film
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(14px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 2.6, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
          className="mt-8 max-w-4xl font-display text-[clamp(2.4rem,8vw,6rem)] font-light leading-[1.05] text-ivory"
        >
          The Road to <span className="text-gold-sheen italic">Her</span> Dream
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.4, delay: 2.4 }}
          className="mt-8 max-w-md font-body text-sm leading-relaxed text-ash"
        >
          In honour of {HONOUREE}
        </motion.p>
        <motion.span
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.2, 1] }}
          transition={{ duration: 4, delay: 3.2, repeat: Infinity, repeatDelay: 1 }}
          className="absolute bottom-10 font-body text-[0.55rem] uppercase tracking-[0.4em] text-champagne/60"
        >
          Scroll
        </motion.span>
      </div>

      <div className="relative">
        {LINES.map((line) => (
          <ScrollFadeText key={line}>{line}</ScrollFadeText>
        ))}
      </div>
    </section>
  );
}
