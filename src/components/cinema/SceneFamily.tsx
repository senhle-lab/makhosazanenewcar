import { GlassFrame } from "@/components/cinema/GlassFrame";
import { ChapterLabel, Reveal, ScrollFadeText } from "@/components/cinema/ScrollFade";
import { celebrationVideo } from "@/lib/media";

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
          <GlassFrame className="aspect-video">
            {celebrationVideo.src ? (
              <video
                className="h-full w-full object-cover"
                src={celebrationVideo.src}
                poster={celebrationVideo.poster ?? undefined}
                controls
                playsInline
                preload="metadata"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-onyx/40 px-8 text-center">
                <span className="gold-rule h-px w-20" />
                <p className="font-display text-[clamp(1.1rem,3vw,1.8rem)] font-light italic text-champagne">
                  Reserved for the celebration
                </p>
                <p className="max-w-sm font-body text-xs leading-relaxed text-ash">
                  Her sisters, the laughter, the moment it all became real.
                </p>
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-gold/15" />
          </GlassFrame>
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
