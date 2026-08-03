/**
 * Audio configuration.
 *
 * Drop your files into public/media/audio/ and fill in the paths below.
 * Everything stays silent (with the sound toggle still present) until a
 * path is set — no broken requests, no console noise.
 */

export const audioTracks = {
  /** Looping cinematic orchestral score bed. */
  score: null as string | null, // e.g. "/media/audio/score.mp3"
  /** Looping wind / room ambience under the opening. */
  ambience: null as string | null,
};

export const audioCues = {
  whoosh: null as string | null,
  ignition: null as string | null,
  doorClose: null as string | null,
};

export type CueName = keyof typeof audioCues;

let enabled = false;
const loops: HTMLAudioElement[] = [];
const listeners = new Set<(on: boolean) => void>();

function createLoop(src: string, volume: number) {
  const el = new Audio(src);
  el.loop = true;
  el.volume = 0;
  el.preload = "auto";
  void el.play().catch(() => {});
  fadeTo(el, volume, 2400);
  return el;
}

function fadeTo(el: HTMLAudioElement, target: number, duration: number) {
  const start = el.volume;
  const t0 = performance.now();
  const step = (now: number) => {
    const p = Math.min(1, (now - t0) / duration);
    el.volume = start + (target - start) * p;
    if (p < 1) requestAnimationFrame(step);
    else if (target === 0) el.pause();
  };
  requestAnimationFrame(step);
}

export function isSoundEnabled() {
  return enabled;
}

export function subscribeSound(fn: (on: boolean) => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function setSoundEnabled(on: boolean) {
  enabled = on;
  if (on) {
    if (audioTracks.score) loops.push(createLoop(audioTracks.score, 0.55));
    if (audioTracks.ambience) loops.push(createLoop(audioTracks.ambience, 0.25));
  } else {
    loops.forEach((el) => fadeTo(el, 0, 900));
    loops.length = 0;
  }
  listeners.forEach((fn) => fn(on));
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
