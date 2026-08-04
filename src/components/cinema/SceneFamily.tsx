import { GlassFrame } from "@/components/cinema/GlassFrame";
import { KenBurnsImage } from "@/components/cinema/KenBurnsImage";
import { ChapterLabel, Reveal, ScrollFadeText } from "@/components/cinema/ScrollFade";
import { celebrationVideo, familySlot } from "@/lib/media";

const CAPTIONS = [
  "Because success is even more beautiful when shared.",
  "A family celebrating a dream fulfilled.",
  "Behind every milestone is love, support and unforgettable memories.",
];

export function SceneFamily() {
  return (
    <section className="relative py-24 sm:py-32">
      <ChapterLabel>Chapter Two — Together</ChapterLabel>

      <ScrollFadeText height="60vh">And then the laughter began.</ScrollFadeText>

      <div className="mx-auto max-w-5xl px-5">
        <Reveal>
          {celebrationVideo.src ? (
            <GlassFrame className="aspect-video">
              <video
                className="h-full w-full object-cover"
                src={celebrationVideo.src}
                poster={celebrationVideo.poster ?? undefined}
                controls
                playsInline
                preload="metadata"
              />
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-gold/15" />
            </GlassFrame>
          ) : (
            <GlassFrame>
              <KenBurnsImage
                src={familySlot.src}
                alt={familySlot.alt}
                zoom={1.16}
                parallax={40}
                className="aspect-[4/5] rounded-3xl sm:aspect-[16/10]"
              />
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-gold/15" />
            </GlassFrame>
          )}
        </Reveal>


        <div className="mt-16 space-y-14 sm:mt-24">
          {CAPTIONS.map((caption, i) => (
            <Reveal key={caption} delay={i * 0.08}>
              <p className="mx-auto max-w-3xl text-center font-display text-[clamp(1.3rem,3.6vw,2.4rem)] font-light leading-[1.35] text-ivory">
                {caption}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
