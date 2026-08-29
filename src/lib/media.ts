/**
 * Media manifest for the celebration film.
 *
 * All images are stored locally in:
 * public/media/images/
 */

export type MediaSlot = {
  src: string;
  alt: string;
  caption?: string;
};

export const HONOUREE = "Mrs. Makhosazana Hadebe";
export const VEHICLE = "Volkswagen T-Cross R-Line";

/* Local website images */
const herSigning = "/media/images/her-signing.jpg";
const herDriving = "/media/images/her-driving.jpg";
const familyCelebration = "/media/images/family-celebration.jpg";
const tcrossFront = "/media/images/tcross-front.jpg";
const tcrossInterior = "/media/images/tcross-interior.jpg";

const overtureFront = "/media/images/overture-front.png";
const revealRear = "/media/images/reveal-rear.jpg";
const markPortrait = "/media/images/mark-portrait.png";
const firstLightPortrait = "/media/images/first-light-portrait.png";
const firstLightWide = "/media/images/first-light-wide.png";
const stancePortrait = "/media/images/stance-portrait.png";
const stanceWide = "/media/images/stance-wide.png";
const everyDetail = "/media/images/every-detail.png";
const roadBehind = "/media/images/road-behind.png";
const roadAhead = "/media/images/road-ahead.jpg";

export const overtureSlot: MediaSlot = {
  src: overtureFront,
  alt: `The ${VEHICLE} emerging from darkness, headlight signature lit`,
};

export const suspenseSlots: MediaSlot[] = [
  {
    src: tcrossFront,
    alt: "Volkswagen emblem and R badge on the red T-Cross grille",
    caption: "The mark",
  },
  {
    src: markPortrait,
    alt: "Front end lit only by its LED signature",
    caption: "R-Line",
  },
  {
    src: firstLightPortrait,
    alt: "LED headlight signature glowing in the dark",
    caption: "First light",
  },
  {
    src: stancePortrait,
    alt: "Rear quarter and light cluster, low and tight",
    caption: "Grounded",
  },
];

export const interiorSlots: MediaSlot[] = [
  {
    src: tcrossInterior,
    alt: "R-Line seats and steering wheel inside the T-Cross",
    caption: "In her hands",
  },
  {
    src: everyDetail,
    alt: "Illuminated rear light detail, close",
    caption: "Every detail",
  },
  {
    src: roadBehind,
    alt: "Rear light signature glowing red",
    caption: "The road behind",
  },
];

export const gallerySlots: MediaSlot[] = [
  {
    src: tcrossFront,
    alt: `The red ${VEHICLE}, front three-quarter`,
    caption: "Presence",
  },
  {
    src: tcrossInterior,
    alt: "R-Line interior, seats and cockpit",
    caption: "Craft",
  },
  {
    src: herDriving,
    alt: "Behind the wheel of her new T-Cross",
    caption: "Her seat",
  },
  {
    src: firstLightWide,
    alt: "Headlight detail",
    caption: "First light",
  },
  {
    src: stanceWide,
    alt: "Rear quarter and wheel detail",
    caption: "Stance",
  },
  {
    src: familyCelebration,
    alt: "Family laughing together in the showroom",
    caption: "Shared",
  },
];

export const herSlots: MediaSlot[] = [
  {
    src: herSigning,
    alt: "Signing the paperwork for her new vehicle",
    caption: "The signature",
  },
  {
    src: herDriving,
    alt: "Sitting behind the wheel of her new T-Cross",
    caption: "Her moment",
  },
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
 *
 * Leave this null until a celebration video is added.
 */
export const celebrationVideo: {
  src: string | null;
  poster: string | null;
} = {
  src: null,
  poster: null,
};

