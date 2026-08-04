/**
 * Media manifest — every visual and audio slot in the film.
 *
 * Swap a placeholder by replacing the imported file in src/assets/
 * (keep the same filename) or by pointing the entry at a new import.
 * See MEDIA.md for the full slot list.
 */

import detailLogo from "@/assets/detail-logo.jpg";
import detailBadge from "@/assets/detail-badge.jpg";
import detailHeadlight from "@/assets/detail-headlight.jpg";
import detailWheel from "@/assets/detail-wheel.jpg";
import detailSteering from "@/assets/detail-steering.jpg";
import detailDashboard from "@/assets/detail-dashboard.jpg";
import detailRear from "@/assets/detail-rear.jpg";
import detailProfile from "@/assets/detail-profile.jpg";
import detailDoor from "@/assets/detail-door.jpg";
import detailKeys from "@/assets/detail-keys.jpg";
import heroReveal from "@/assets/hero-reveal.jpg";
import roadAhead from "@/assets/road-ahead.jpg";

// Real photographs (CDN-hosted)
import herSigningAsset from "@/assets/her-signing.jpg.asset.json";
import herDrivingAsset from "@/assets/her-driving.jpg.asset.json";
import familyAsset from "@/assets/family-celebration.jpg.asset.json";
import tcrossFrontAsset from "@/assets/tcross-front.jpg.asset.json";
import tcrossInteriorAsset from "@/assets/tcross-interior.jpg.asset.json";

const herSigning = herSigningAsset.url;
const herDriving = herDrivingAsset.url;
const familyCelebration = familyAsset.url;
const tcrossFront = tcrossFrontAsset.url;
const tcrossInterior = tcrossInteriorAsset.url;


export type MediaSlot = {
  src: string;
  alt: string;
  caption?: string | undefined;
};

export const HONOUREE = "Mrs. Makhosazana Hadebe";
export const VEHICLE = "Volkswagen T-Cross R-Line";

export const suspenseSlots: MediaSlot[] = [
  { src: tcrossFront, alt: "Volkswagen emblem and R badge on the red T-Cross grille", caption: "The mark" },
  { src: detailBadge, alt: "R-Line badge on glossy bodywork", caption: "R-Line" },
  { src: detailHeadlight, alt: "LED headlight signature glowing in the dark", caption: "First light" },
  { src: detailWheel, alt: "Alloy wheel lit from the side", caption: "Grounded" },
];

export const interiorSlots: MediaSlot[] = [
  { src: tcrossInterior, alt: "R-Line seats and steering wheel inside the T-Cross", caption: "In her hands" },
  { src: detailDashboard, alt: "Illuminated digital cockpit at night", caption: "Every detail" },
  { src: detailRear, alt: "Rear light signature glowing red", caption: "The road behind" },
];

export const gallerySlots: MediaSlot[] = [
  { src: tcrossFront, alt: `The red ${VEHICLE}, front three-quarter`, caption: "Presence" },
  { src: tcrossInterior, alt: "R-Line interior, seats and cockpit", caption: "Craft" },
  { src: herDriving, alt: "Behind the wheel of her new T-Cross", caption: "Her seat" },
  { src: detailHeadlight, alt: "Headlight detail", caption: "First light" },
  { src: detailWheel, alt: "Wheel detail", caption: "Stance" },
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
  src: tcrossFront,
  alt: `The ${VEHICLE} in Kings Red`,
};

export const roadSlot: MediaSlot = {
  src: roadAhead,
  alt: "An open road stretching into a golden horizon",
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
