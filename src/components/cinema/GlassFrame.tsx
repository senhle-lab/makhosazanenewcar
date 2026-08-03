import type { ReactNode } from "react";

export function GlassFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`glass-frame relative overflow-hidden rounded-3xl ${className}`}>
      {children}
    </div>
  );
}
