import { createFileRoute } from "@tanstack/react-router";
import { SoundToggle } from "@/components/cinema/SoundToggle";
import { SceneOverture } from "@/components/cinema/SceneOverture";
import { SceneSuspense } from "@/components/cinema/SceneSuspense";
import { SceneFamily } from "@/components/cinema/SceneFamily";
import { SceneGallery } from "@/components/cinema/SceneGallery";
import { SceneHer } from "@/components/cinema/SceneHer";
import { SceneReveal } from "@/components/cinema/SceneReveal";
import { SceneBlessing } from "@/components/cinema/SceneBlessing";
import { HONOUREE, VEHICLE } from "@/lib/media";

const title = `The Road to Her Dream — A Celebration Film`;
const description = `A cinematic celebration of ${HONOUREE} and her brand-new ${VEHICLE}: a story of faith, perseverance and a dream fulfilled.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <PerformanceProvider>
      <main className="cinema relative">
        <SoundToggle />
        <ShareMoment />
        <SceneOverture />
        <SceneSuspense />
        <SceneFamily />
        <SceneGallery />
        <SceneHer />
        <SceneReveal />
        <SceneBlessing />
      </main>
    </PerformanceProvider>
  );
}
