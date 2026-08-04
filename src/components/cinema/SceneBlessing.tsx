import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChapterLabel, Reveal, ScrollFadeText } from "@/components/cinema/ScrollFade";
import { HONOUREE, roadSlot, VEHICLE } from "@/lib/media";
import { playCue } from "@/lib/audio";

const BLESSINGS = [
  "This isn’t simply a new car.",
  "It is the reward for years of perseverance.",
  "May every journey bring joy.",
  "May every destination bring new opportunities.",
  "May God protect every road ahead.",
];

export function SceneBlessing() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const blackout = useTransform(scrollYProgress, [0.6, 1], [0, 1]);

  return (
    <motion.section
      ref={ref}
      className="relative"
      onViewportEnter={() => playCue("doorClose")}
      viewport={{ once: true, amount: 0.2 }}
    >
      <ChapterLabel>Finale</ChapterLabel>

      <div className="relative mt-16 px-6">
        <Reveal>
          <h2 className="mx-auto max-w-4xl text-center font-display text-[clamp(2.6rem,10vw,7rem)] font-light leading-none text-gold-sheen">
            Congratulations
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mt-8 text-center font-body text-[0.62rem] uppercase tracking-[0.42em] text-champagne/80">
            {HONOUREE} · {VEHICLE}
          </p>
        </Reveal>
      </div>

      {BLESSINGS.map((line) => (
        <ScrollFadeText key={line} height="70vh">
          {line}
        </ScrollFadeText>
      ))}

      <div className="film-grain relative h-[80vh] overflow-hidden">
        <img
          src={roadSlot.src}
          alt={roadSlot.alt}
          width={1920}
          height={1088}
          loading="lazy"
          className="gpu absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-obsidian/40" />
        <div className="relative flex h-full items-center justify-center px-6">
          <Reveal>
            <p className="text-center font-display text-[clamp(1.8rem,6vw,4rem)] font-light italic text-ivory">
              The journey continues…
            </p>
          </Reveal>
        </div>
        <motion.div
          aria-hidden="true"
          style={{ opacity: blackout }}
          className="pointer-events-none absolute inset-0 bg-obsidian"
        />
      </div>

      <footer className="relative py-20 text-center">
        <Reveal>
          <p className="mx-auto max-w-3xl px-6 font-display text-[clamp(1.4rem,4.6vw,2.8rem)] font-light italic leading-[1.35] text-ivory">
            Some journeys change your destination. Others change your life.
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mx-auto mt-8 max-w-xl px-6 font-body text-[0.68rem] uppercase tracking-[0.32em] text-gold-sheen">
            — Congratulations on your new {VEHICLE}
          </p>
        </Reveal>
        <span className="gold-rule mx-auto my-12 block h-px w-16" />
        <p className="font-body text-[0.55rem] uppercase tracking-[0.4em] text-ash">
          Made with love, for family
        </p>
      </footer>

    </motion.section>
  );
}
