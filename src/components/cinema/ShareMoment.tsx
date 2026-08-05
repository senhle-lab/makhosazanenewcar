import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, Loader2, Share2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CHAPTER_BY_ID, CHAPTERS, SHARE_FOOTER, type ChapterId } from "@/lib/scene-registry";
import { renderShareFrame } from "@/lib/share-frame";

export function ShareMoment() {
  const [current, setCurrent] = useState<ChapterId>("overture");
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const blobRef = useRef<Blob | null>(null);

  // Track which chapter owns the viewport.
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
    if (sections.length === 0) return;
    const ratios = new Map<ChapterId, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).dataset["chapter"] as ChapterId | undefined;
          if (id) ratios.set(id, entry.intersectionRatio);
        }
        let best: ChapterId | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        }
        if (best && bestRatio > 0) setCurrent(best);
      },
      { threshold: [0, 0.15, 0.35, 0.6, 0.9] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [url]);

  const chapter = CHAPTER_BY_ID[current] ?? CHAPTERS[0]!;

  const generate = useCallback(async () => {
    setBusy(true);
    setOpen(true);
    if (url) URL.revokeObjectURL(url);
    setUrl(null);
    const blob = await renderShareFrame(chapter);
    blobRef.current = blob;
    setUrl(blob ? URL.createObjectURL(blob) : null);
    setBusy(false);
  }, [chapter, url]);

  const fileName = `${chapter.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-moment.png`;

  const share = async () => {
    const blob = blobRef.current;
    if (!blob) return;
    const file = new File([blob], fileName, { type: "image/png" });
    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: chapter.title,
          text: `${chapter.quote} — ${SHARE_FOOTER}`,
        });
        return;
      } catch {
        /* cancelled — fall through to download */
      }
    }
    download();
  };

  const download = () => {
    if (!url) return;
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={generate}
        aria-label="Share this moment"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
        className="glass-frame fixed left-4 top-4 z-50 flex items-center gap-2.5 rounded-full px-4 py-2.5 font-body text-[0.6rem] uppercase tracking-[0.3em] text-champagne transition-colors hover:text-ivory sm:left-6 sm:top-6"
      >
        <Share2 className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
        <span className="hidden sm:inline">Share this moment</span>
        <span className="sm:hidden">Share</span>
      </motion.button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="cinema max-w-md border-gold/25 bg-obsidian/95 text-ivory">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-light tracking-wide text-champagne">
              {chapter.title}
            </DialogTitle>
          </DialogHeader>

          <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-2xl border border-gold/20 bg-onyx">
            {busy || !url ? (
              <span className="flex items-center gap-3 font-body text-[0.6rem] uppercase tracking-[0.3em] text-champagne/70">
                <Loader2 className="h-4 w-4 animate-spin text-gold" aria-hidden="true" />
                {busy ? "Composing" : "Unavailable"}
              </span>
            ) : (
              <img src={url} alt={`Shareable frame: ${chapter.title}`} className="h-full w-full object-contain" />
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={share}
              disabled={!url}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-gold/40 px-4 py-3 font-body text-[0.6rem] uppercase tracking-[0.3em] text-champagne transition-colors hover:bg-gold/10 disabled:opacity-40"
            >
              <Share2 className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
              Share
            </button>
            <button
              type="button"
              onClick={download}
              disabled={!url}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-gold/40 px-4 py-3 font-body text-[0.6rem] uppercase tracking-[0.3em] text-champagne transition-colors hover:bg-gold/10 disabled:opacity-40"
            >
              <Download className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
              Download
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
