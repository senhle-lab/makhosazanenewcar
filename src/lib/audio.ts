/**
 * Audio configuration.
 *
 * Main music file:
 * public/media/audio/makhosazana-song.mp3
 */

export const audioTracks = {
  /** Main music played when the visitor turns sound on. */
  score: "/media/audio/makhosazana-song.mp3",

  /** Optional ambience. */
  ambience: null as string | null,
};

export const audioCues = {
  whoosh: null as string | null,
  ignition: null as string | null,
  doorClose: null as string | null,
};

export type CueName = keyof typeof audioCues;

let enabled = false;
let scoreAudio: HTMLAudioElement | null = null;
let ambienceAudio: HTMLAudioElement | null = null;

const listeners = new Set<(on: boolean) => void>();

function createLoop(src: string, volume: number) {
  const el = new Audio(src);
  el.loop = true;
  el.volume = volume;
  el.preload = "auto";
  return el;
}

export function isSoundEnabled() {
  return enabled;
}

export function subscribeSound(fn: (on: boolean) => void) {
  listeners.add(fn);

  return () => {
    listeners.delete(fn);
  };
}

/**
 * Toggle the score. Must be called from a user gesture (the sound button) —
 * browsers block programmatic playback otherwise. If playback is refused we
 * fall back to "off" so the button never lies about the current state.
 */
export function setSoundEnabled(on: boolean) {
  // Guard: no audio element exists during SSR.
  if (typeof window === "undefined") return;

  enabled = on;
  listeners.forEach((fn) => fn(on));

  if (!on) {
    scoreAudio?.pause();
    ambienceAudio?.pause();
    return;
  }

  if (!scoreAudio && audioTracks.score) {
    scoreAudio = createLoop(audioTracks.score, 0.55);
  }

  if (!ambienceAudio && audioTracks.ambience) {
    ambienceAudio = createLoop(audioTracks.ambience, 0.25);
  }

  if (ambienceAudio) {
    void ambienceAudio.play().catch(() => {});
  }

  if (!scoreAudio) return;

  // Rewind if the element ended, then play; surface refusal back to the UI.
  void scoreAudio
    .play()
    .then(() => {
      enabled = true;
      listeners.forEach((fn) => fn(true));
    })
    .catch((error: unknown) => {
      console.error("Score playback was blocked:", error);
      enabled = false;
      ambienceAudio?.pause();
      listeners.forEach((fn) => fn(false));
    });
}


const cuePlayed = new Set<CueName>();

/** Fire a one-shot sound cue when a scene comes into view. */
export function playCue(name: CueName, once = true) {
  if (!enabled) return;

  const src = audioCues[name];

  if (!src) return;

  if (once) {
    if (cuePlayed.has(name)) return;
    cuePlayed.add(name);
  }

  const el = new Audio(src);
  el.volume = 0.5;

  void el.play().catch(() => {});
}
