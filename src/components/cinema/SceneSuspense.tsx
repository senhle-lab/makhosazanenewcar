import { KenBurnsImage } from "@/components/cinema/KenBurnsImage";
import { ChapterLabel, Reveal, ScrollFadeText } from "@/components/cinema/ScrollFade";
import { interiorSlots, suspenseSlots } from "@/lib/media";
import { playCue } from "@/lib/audio";
import { motion } from "framer-motion";

export function SceneSuspense() {
  return (
    <motion.section
      className="relative py-24 sm:py-32"
      data-chapter="fragments"
      onViewportEnter={() => playCue("whoosh")}
      viewport={{ once: true, amount: 0.2 }}
    >
      <ChapterLabel>Chapter One — Fragments</ChapterLabel>

      <ScrollFadeText height="60vh">Something has arrived.</ScrollFadeText>

      {/* offset detail pairs — never the whole car */}
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-10">
          {suspenseSlots.map((slot, i) => (
            <KenBurnsImage
              key={slot.caption}
              src={slot.src}
              alt={slot.alt}
              caption={slot.caption}
              parallax={i % 2 === 0 ? 70 : 34}
              className={`aspect-[4/5] rounded-2xl sm:aspect-[3/4] ${
                i % 2 === 0 ? "sm:translate-y-0" : "sm:translate-y-16"
              }`}
            />
          ))}
        </div>
      </div>

      <ScrollFadeText height="70vh">
        Not everything worth waiting for reveals itself at once.
      </ScrollFadeText>

      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-6 sm:grid-cols-3">
          {interiorSlots.map((slot, i) => (
            <Reveal key={slot.caption} delay={i * 0.12}>
              <KenBurnsImage
                src={slot.src}
                alt={slot.alt}
                caption={slot.caption}
                zoom={1.14}
                parallax={30}
                className="aspect-square rounded-2xl"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
