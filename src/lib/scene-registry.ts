import { familySlot, gallerySlots, herSlots, HONOUREE, revealSlot, roadSlot, suspenseSlots, VEHICLE } from "@/lib/media";

export type ChapterId =
  | "overture"
  | "fragments"
  | "together"
  | "gallery"
  | "her"
  | "reveal"
  | "finale";

export type Chapter = {
  id: ChapterId;
  eyebrow: string;
  title: string;
  quote: string;
  image: string;
};

const first = <T,>(list: T[], fallback: T): T => list[0] ?? fallback;

export const CHAPTERS: Chapter[] = [
  {
    id: "overture",
    eyebrow: "Overture",
    title: "The Road to Her Dream",
    quote: "Every journey deserves to be celebrated.",
    image: revealSlot.src,
  },
  {
    id: "fragments",
    eyebrow: "Chapter One",
    title: "Fragments",
    quote: "Not everything worth waiting for reveals itself at once.",
    image: first(suspenseSlots, revealSlot).src,
  },
  {
    id: "together",
    eyebrow: "Chapter Two",
    title: "Together",
    quote: "Success is even more beautiful when shared.",
    image: familySlot.src,
  },
  {
    id: "gallery",
    eyebrow: "Chapter Three",
    title: "The Gallery",
    quote: "A dream, photographed from every angle it deserved.",
    image: first(gallerySlots, revealSlot).src,
  },
  {
    id: "her",
    eyebrow: "Chapter Four",
    title: "Her",
    quote: "Strength. Faith. Determination. Achievement.",
    image: first(herSlots, revealSlot).src,
  },
  {
    id: "reveal",
    eyebrow: "Chapter Five",
    title: "The Reveal",
    quote: "A journey built on faith, perseverance and success.",
    image: revealSlot.src,
  },
  {
    id: "finale",
    eyebrow: "Finale",
    title: "The Journey Continues",
    quote: "Some journeys change your destination. Others change your life.",
    image: roadSlot.src,
  },
];

export const CHAPTER_BY_ID = Object.fromEntries(
  CHAPTERS.map((chapter) => [chapter.id, chapter]),
) as Record<ChapterId, Chapter>;

export const SHARE_FOOTER = `${HONOUREE} · ${VEHICLE}`;
