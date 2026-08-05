/**
 * Composes a social-ready 1080x1350 frame on a canvas: the current scene's
 * photograph, its chapter title, a short quote, and a gold-ruled footer.
 * Client-only.
 */

import { SHARE_FOOTER, type Chapter } from "@/lib/scene-registry";

const W = 1080;
const H = 1350;
const MARGIN = 88;

const OBSIDIAN = "#0c0d0f";
const GOLD = "#d9b56a";
const CHAMPAGNE = "#f0e0be";
const IVORY = "#f7f5f0";

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

/** Cover-crop draw, like CSS object-fit: cover. */
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
) {
  const scale = Math.max(w / img.width, h / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
}

function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (ctx.measureText(candidate).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function tracked(
  ctx: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  y: number,
  spacing: number,
) {
  const chars = [...text];
  const width =
    chars.reduce((total, char) => total + ctx.measureText(char).width, 0) +
    spacing * (chars.length - 1);
  let x = centerX - width / 2;
  ctx.textAlign = "left";
  for (const char of chars) {
    ctx.fillText(char, x, y);
    x += ctx.measureText(char).width + spacing;
  }
  ctx.textAlign = "center";
}

export async function renderShareFrame(chapter: Chapter): Promise<Blob | null> {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  try {
    await document.fonts?.ready;
  } catch {
    /* fonts are optional — system fallbacks still render */
  }

  ctx.fillStyle = OBSIDIAN;
  ctx.fillRect(0, 0, W, H);

  // Photograph occupies the upper two-thirds.
  const photoH = 880;
  const img = await loadImage(chapter.image);
  if (img) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, W, photoH);
    ctx.clip();
    drawCover(ctx, img, 0, 0, W, photoH);
    ctx.restore();
  }

  // Cinematic veil so the type always reads.
  const veil = ctx.createLinearGradient(0, photoH * 0.3, 0, photoH);
  veil.addColorStop(0, "rgba(12,13,15,0.12)");
  veil.addColorStop(0.65, "rgba(12,13,15,0.72)");
  veil.addColorStop(1, OBSIDIAN);
  ctx.fillStyle = veil;
  ctx.fillRect(0, 0, W, photoH);

  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  // Eyebrow
  ctx.fillStyle = GOLD;
  ctx.font = "500 24px Karla, system-ui, sans-serif";
  tracked(ctx, chapter.eyebrow.toUpperCase(), W / 2, photoH - 60, 9);

  // Title
  ctx.fillStyle = IVORY;
  ctx.font = "300 96px 'Cormorant Garamond', Georgia, serif";
  ctx.fillText(chapter.title, W / 2, photoH + 60);

  // Gold rule
  const ruleY = photoH + 122;
  const rule = ctx.createLinearGradient(MARGIN, ruleY, W - MARGIN, ruleY);
  rule.addColorStop(0, "rgba(217,181,106,0)");
  rule.addColorStop(0.5, GOLD);
  rule.addColorStop(1, "rgba(217,181,106,0)");
  ctx.fillStyle = rule;
  ctx.fillRect(MARGIN, ruleY, W - MARGIN * 2, 1.5);

  // Quote
  ctx.fillStyle = CHAMPAGNE;
  ctx.font = "italic 300 54px 'Cormorant Garamond', Georgia, serif";
  const lines = wrap(ctx, chapter.quote, W - MARGIN * 2.4);
  let y = ruleY + 108;
  for (const line of lines) {
    ctx.fillText(line, W / 2, y);
    y += 72;
  }

  // Footer
  ctx.fillStyle = "rgba(240,224,190,0.75)";
  ctx.font = "400 22px Karla, system-ui, sans-serif";
  tracked(ctx, SHARE_FOOTER.toUpperCase(), W / 2, H - MARGIN, 7);

  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), "image/png", 0.95));
}
