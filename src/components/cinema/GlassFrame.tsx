import type { ReactNode } from "react";
import { useQuality } from "@/components/cinema/PerformanceProvider";

export function GlassFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { motion } = useQuality();
  // Backdrop blur is the single most expensive effect here — drop to a flat
  // gold-edged panel when the device is struggling.
  const surface = motion.glass
    ? "glass-frame"
    : "border border-gold/25 bg-ivory/[0.06] shadow-[0_30px_90px_-50px_rgba(217,181,106,0.28)]";
  return (
    <div className={`relative overflow-hidden rounded-3xl ${surface} ${className}`}>{children}</div>
  );
}
