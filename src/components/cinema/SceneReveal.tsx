import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ChapterLabel, Reveal } from "@/components/cinema/ScrollFade";
import { HONOUREE, revealHeroSlot, revealSlot, VEHICLE } from "@/lib/media";
import { playCue } from "@/lib/audio";

export function SceneReveal() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1.32, 1.02]);
  const sweepX = useTransform(scrollYProgress, [0.15, 0.7], ["-120%", "160%"]);
  const veil = useTransform(scrollYProgress, [0, 0.35, 0.75, 1], [1, 0.35, 0.35, 0.85]);

  return (
    <motion.section
      ref={ref}
      className="relative"
      data-chapter="reveal"
      onViewportEnter={() => playCue("ignition")}
      viewport={{ once: true, amount: 0.3 }}
    >
      <ChapterLabel>Chapter Five — The Reveal</ChapterLabel>

      <div className="film-grain relative mt-12 h-[110vh] overflow-hidden">
        <motion.img
          src={revealSlot.src}
          alt={revealSlot.alt}
          width={1920}
          height={1088}
          loading="lazy"
          style={{ scale }}
          className="gpu absolute inset-0 h-full w-full object-cover"
        />
        {/* cinematic light sweep across the bodywork */}
        <motion.div
          aria-hidden="true"
          style={{ x: sweepX }}
          className="gpu pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-champagne/20 to-transparent blur-2xl"
        />
        <motion.div
          aria-hidden="true"
          style={{ opacity: veil }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-obsidian/70"
        />

        <div className="relative flex h-full flex-col items-center justify-center gap-8 px-6 text-center">
          <Reveal>
            <p className="font-display text-[clamp(1.4rem,4vw,2.4rem)] font-light italic text-champagne">
              Introducing…
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <h2 className="max-w-3xl font-display text-[clamp(2rem,7vw,5rem)] font-light leading-[1.05] text-ivory">
              {HONOUREE}
            </h2>
          </Reveal>
          <Reveal delay={0.6}>
            <p className="max-w-xl font-body text-sm leading-relaxed text-ash sm:text-base">
              A journey built on faith, perseverance and success.
            </p>
          </Reveal>
          <Reveal delay={0.85} className="mt-4">
            <span className="gold-rule mx-auto mb-6 block h-px w-24" />
            <p className="font-display text-[clamp(1.4rem,4.5vw,3rem)] font-light text-gold-sheen">
              The {VEHICLE}
            </p>
          </Reveal>
        </div>
      </div>

      <div className="film-grain relative h-[90vh] overflow-hidden">
        <img
          src={revealHeroSlot.src}
          alt={revealHeroSlot.alt}
          width={1920}
          height={1088}
          loading="lazy"
          className="gpu absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-obsidian/60" />
        <div className="relative flex h-full items-end justify-center pb-16 px-6">
          <Reveal>
            <p className="text-center font-body text-[0.6rem] uppercase tracking-[0.4em] text-champagne/80">
              Hers
            </p>
          </Reveal>
        </div>
      </div>
    </motion.section>

  );
}
