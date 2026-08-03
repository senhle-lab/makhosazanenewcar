import { KenBurnsImage } from "@/components/cinema/KenBurnsImage";
import { GlassFrame } from "@/components/cinema/GlassFrame";
import { ChapterLabel, Reveal, ScrollFadeText } from "@/components/cinema/ScrollFade";
import { gallerySlots } from "@/lib/media";

export function SceneGallery() {
  const [hero, overlapA, overlapB, floatA, floatB, wide] = gallerySlots;

  return (
    <section className="relative py-24 sm:py-32">
      <ChapterLabel>Chapter Three — The Gallery</ChapterLabel>

      {/* full-bleed hero */}
      <div className="mt-12">
        <KenBurnsImage
          src={hero.src}
          alt={hero.alt}
          caption={hero.caption}
          zoom={1.24}
          parallax={90}
          className="h-[70vh] w-full sm:h-[88vh]"
        />
      </div>

      <ScrollFadeText height="60vh">Look closer. Every frame earned its place.</ScrollFadeText>

      {/* elegant overlapping magazine pair */}
      <div className="mx-auto max-w-6xl px-5">
        <div className="relative grid gap-5 sm:grid-cols-12">
          <Reveal className="sm:col-span-7">
            <KenBurnsImage
              src={overlapA.src}
              alt={overlapA.alt}
              caption={overlapA.caption}
              parallax={54}
              className="aspect-[4/3] rounded-2xl"
            />
          </Reveal>
          <Reveal delay={0.15} className="sm:col-span-5 sm:-ml-16 sm:mt-28">
            <KenBurnsImage
              src={overlapB.src}
              alt={overlapB.alt}
              caption={overlapB.caption}
              parallax={22}
              className="aspect-[3/4] rounded-2xl"
            />
          </Reveal>
        </div>
      </div>

      {/* floating glass cards */}
      <div className="mx-auto mt-24 max-w-6xl px-5 sm:mt-40">
        <div className="grid gap-8 sm:grid-cols-2">
          {[floatA, floatB].map((slot, i) => (
            <Reveal key={slot.caption} delay={i * 0.14} y={44}>
              <GlassFrame className={i === 1 ? "sm:translate-y-14" : ""}>
                <div className="p-3">
                  <KenBurnsImage
                    src={slot.src}
                    alt={slot.alt}
                    zoom={1.12}
                    parallax={26}
                    className="aspect-[16/10] rounded-2xl"
                  />
                </div>
                <p className="px-6 pb-6 font-body text-[0.6rem] uppercase tracking-[0.36em] text-champagne/80">
                  {slot.caption}
                </p>
              </GlassFrame>
            </Reveal>
          ))}
        </div>
      </div>

      {/* asymmetric wide spread */}
      <div className="mx-auto mt-24 max-w-6xl px-5 sm:mt-40">
        <div className="grid items-center gap-10 sm:grid-cols-12">
          <Reveal className="sm:col-span-8">
            <KenBurnsImage
              src={wide.src}
              alt={wide.alt}
              caption={wide.caption}
              parallax={40}
              className="aspect-[16/9] rounded-2xl"
            />
          </Reveal>
          <Reveal delay={0.2} className="sm:col-span-4">
            <p className="font-display text-[clamp(1.3rem,3vw,2rem)] font-light italic leading-[1.4] text-champagne">
              A dream, photographed from every angle it deserved.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
