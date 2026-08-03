import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { isSoundEnabled, setSoundEnabled, subscribeSound } from "@/lib/audio";

export function SoundToggle() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    setOn(isSoundEnabled());
    const unsubscribe = subscribeSound(setOn);
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <motion.button
      type="button"
      onClick={() => setSoundEnabled(!on)}
      aria-pressed={on}
      aria-label={on ? "Turn the score off" : "Turn the score on"}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.4, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
      className="glass-frame fixed right-4 top-4 z-50 flex items-center gap-3 rounded-full px-4 py-2.5 font-body text-[0.6rem] uppercase tracking-[0.3em] text-champagne transition-colors hover:text-ivory sm:right-6 sm:top-6"
    >
      <span className="flex h-3 items-end gap-[3px]" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-[2px] rounded-full bg-gold"
            animate={on ? { height: [4, 12, 6, 11, 5] } : { height: 3 }}
            transition={
              on
                ? { duration: 1.4 + i * 0.3, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.4 }
            }
          />
        ))}
      </span>
      {on ? "Sound on" : "Sound off"}
    </motion.button>
  );
}
