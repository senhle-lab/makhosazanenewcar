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

export type MediaSlot = {
  src: string;
  alt: string;
  caption?: string | undefined;
};

export const HONOUREE = "Mrs. Makhosazana Hadebe";
export const VEHICLE = "Volkswagen T-Cross R-Line";

export const suspenseSlots: MediaSlot[] = [
  { src: detailLogo, alt: "Volkswagen emblem catching the light", caption: "The mark" },
  { src: detailBadge, alt: "R-Line badge on glossy black bodywork", caption: "R-Line" },
  { src: detailHeadlight, alt: "LED headlight signature glowing in the dark", caption: "First light" },
  { src: detailWheel, alt: "Alloy wheel lit from the side", caption: "Grounded" },
];

export const interiorSlots: MediaSlot[] = [
  { src: detailSteering, alt: "Steering wheel in warm ambient interior light", caption: "In her hands" },
  { src: detailDashboard, alt: "Illuminated digital cockpit at night", caption: "Every detail" },
  { src: detailRear, alt: "Rear light signature glowing red", caption: "The road behind" },
];

export const gallerySlots: MediaSlot[] = [
  { src: detailProfile, alt: "Side profile of the vehicle in shadow", caption: "Silhouette" },
  { src: detailDoor, alt: "Driver door opening with warm light spilling out", caption: "The invitation" },
  { src: detailKeys, alt: "Car key resting on an open palm", caption: "Earned" },
  { src: detailHeadlight, alt: "Headlight detail", caption: "Presence" },
  { src: detailWheel, alt: "Wheel detail", caption: "Stance" },
  { src: detailDashboard, alt: "Cockpit detail", caption: "Craft" },
];

export const herSlots: MediaSlot[] = [
  { src: detailKeys, alt: "Keys in hand", caption: "Her hands" },
  { src: detailDoor, alt: "Opening the driver door", caption: "Her moment" },
  { src: detailProfile, alt: "Standing beside the vehicle", caption: "Her pride" },
];

export const revealSlot: MediaSlot = {
  src: heroReveal,
  alt: `The ${VEHICLE} at golden hour`,
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
