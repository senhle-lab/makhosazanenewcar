/**
 * Media manifest — every visual and audio slot in the film.
 *
 * Every frame is a real photograph, colour-graded and pre-cropped to the
 * exact aspect ratio of the slot it fills, and served from CDN storage.
 * See MEDIA.md for the full slot list.
 */

// Real photographs (CDN-hosted)
import herSigningAsset from "@/assets/her-signing.jpg.asset.json";
import herDrivingAsset from "@/assets/her-driving.jpg.asset.json";
import familyAsset from "@/assets/family-celebration.jpg.asset.json";
import tcrossFrontAsset from "@/assets/tcross-front.jpg.asset.json";
import tcrossInteriorAsset from "@/assets/tcross-interior.jpg.asset.json";

// Graded detail frames (CDN-hosted)
import overtureFrontAsset from "@/assets/overture-front.jpg.asset.json";
import revealRearAsset from "@/assets/reveal-rear.jpg.asset.json";
import markPortraitAsset from "@/assets/mark-portrait.jpg.asset.json";
import firstLightPortraitAsset from "@/assets/first-light-portrait.jpg.asset.json";
import firstLightWideAsset from "@/assets/first-light-wide.jpg.asset.json";
import stancePortraitAsset from "@/assets/stance-portrait.jpg.asset.json";
import stanceWideAsset from "@/assets/stance-wide.jpg.asset.json";
import everyDetailAsset from "@/assets/every-detail.jpg.asset.json";
import roadBehindAsset from "@/assets/road-behind.jpg.asset.json";
import roadAheadAsset from "@/assets/road-ahead.jpg.asset.json";

const herSigning = herSigningAsset.url;
const herDriving = herDrivingAsset.url;
const familyCelebration = familyAsset.url;
const tcrossFront = tcrossFrontAsset.url;
const tcrossInterior = tcrossInteriorAsset.url;

const overtureFront = overtureFrontAsset.url;
const revealRear = revealRearAsset.url;
const markPortrait = markPortraitAsset.url;
const firstLightPortrait = firstLightPortraitAsset.url;
const firstLightWide = firstLightWideAsset.url;
const stancePortrait = stancePortraitAsset.url;
const stanceWide = stanceWideAsset.url;
const everyDetail = everyDetailAsset.url;
const roadBehind = roadBehindAsset.url;
const roadAhead = roadAheadAsset.url;

export type MediaSlot = {
  src: string;
  alt: string;
  caption?: string | undefined;
};

export const HONOUREE = "Mrs. Makhosazana Hadebe";
export const VEHICLE = "Volkswagen T-Cross R-Line";

export const overtureSlot: MediaSlot = {
  src: overtureFront,
  alt: `The ${VEHICLE} emerging from darkness, headlight signature lit`,
};

export const suspenseSlots: MediaSlot[] = [
  { src: tcrossFront, alt: "Volkswagen emblem and R badge on the red T-Cross grille", caption: "The mark" },
  { src: markPortrait, alt: "Front end lit only by its LED signature", caption: "R-Line" },
  { src: firstLightPortrait, alt: "LED headlight signature glowing in the dark", caption: "First light" },
  { src: stancePortrait, alt: "Rear quarter and light cluster, low and tight", caption: "Grounded" },
];

export const interiorSlots: MediaSlot[] = [
  { src: tcrossInterior, alt: "R-Line seats and steering wheel inside the T-Cross", caption: "In her hands" },
  { src: everyDetail, alt: "Illuminated rear light detail, close", caption: "Every detail" },
  { src: roadBehind, alt: "Rear light signature glowing red", caption: "The road behind" },
];

export const gallerySlots: MediaSlot[] = [
  { src: tcrossFront, alt: `The red ${VEHICLE}, front three-quarter`, caption: "Presence" },
  { src: tcrossInterior, alt: "R-Line interior, seats and cockpit", caption: "Craft" },
  { src: herDriving, alt: "Behind the wheel of her new T-Cross", caption: "Her seat" },
  { src: firstLightWide, alt: "Headlight detail", caption: "First light" },
  { src: stanceWide, alt: "Rear quarter and wheel detail", caption: "Stance" },
  { src: familyCelebration, alt: "Family laughing together in the showroom", caption: "Shared" },
];

export const herSlots: MediaSlot[] = [
  { src: herSigning, alt: "Signing the paperwork for her new vehicle", caption: "The signature" },
  { src: herDriving, alt: "Sitting behind the wheel of her new T-Cross", caption: "Her moment" },
];

export const familySlot: MediaSlot = {
  src: familyCelebration,
  alt: "Her family laughing together beside the new vehicle in the showroom",
  caption: "Together",
};

export const revealSlot: MediaSlot = {
  src: revealRear,
  alt: `The ${VEHICLE} in silhouette, tail light signature glowing`,
};

export const revealHeroSlot: MediaSlot = {
  src: tcrossFront,
  alt: `The ${VEHICLE} in Kings Red`,
};

export const roadSlot: MediaSlot = {
  src: roadAhead,
  alt: "Tail lights fading into the night, the road ahead",
};

/**
 * Family celebration video slot.
 * Drop the file into public/media/ and set `src` to "/media/celebration.mp4".
 * Leave it null to show the elegant reserved frame.
 */
export const celebrationVideo: { src: string | null; poster: string | null } = {
  src: null,
  poster: null,
};
