import { KenBurnsImage } from "@/components/cinema/KenBurnsImage";
import { ChapterLabel, Reveal, ScrollFadeText } from "@/components/cinema/ScrollFade";
import { herSlots, HONOUREE } from "@/lib/media";

const VIRTUES = ["Strength.", "Faith.", "Determination.", "Achievement."];

export function SceneHer() {
  return (
    <section data-chapter="her" className="relative py-24 sm:py-32">
      <ChapterLabel>Chapter Four — Her</ChapterLabel>

      <ScrollFadeText height="60vh">Before the car, there was the woman.</ScrollFadeText>

      {/* details first — hands, the door, standing beside it */}
      <div className="mx-auto max-w-4xl px-5">
        <div className="grid gap-5 sm:grid-cols-2">
          {herSlots.map((slot, i) => (
            <Reveal key={`${slot.caption}-${i}`} delay={i * 0.16}>
              <KenBurnsImage
                src={slot.src}
                alt={slot.alt}
                caption={slot.caption}
                zoom={1.16}
                parallax={i === 1 ? 60 : 28}
                className={`aspect-[3/4] rounded-2xl ${i === 1 ? "sm:translate-y-12" : ""}`}
              />
            </Reveal>
          ))}
        </div>
      </div>


      <div className="mx-auto mt-28 max-w-4xl px-6 sm:mt-40">
        <div className="space-y-10 text-center">
          {VIRTUES.map((word, i) => (
            <Reveal key={word} delay={i * 0.1} y={36}>
              <p className="font-display text-[clamp(2rem,7vw,4.5rem)] font-light leading-none text-gold-sheen">
                {word}
              </p>
            </Reveal>
          ))}
        </div>
      </div>

      <ScrollFadeText height="80vh" className="italic">
        This moment belongs to her.
      </ScrollFadeText>

      <Reveal className="px-6 pb-6 text-center">
        <p className="font-body text-[0.62rem] uppercase tracking-[0.42em] text-champagne/80">
          {HONOUREE}
        </p>
      </Reveal>
    </section>
  );
}
