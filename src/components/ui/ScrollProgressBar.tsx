"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";

export function ScrollProgressBar() {
  const progress = useScrollProgress();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-px bg-white/6"
    >
      <div
        className="h-full bg-gradient-to-r from-accent via-accent-blue to-accent-copper transition-[width] duration-150"
        style={{ width: `${Math.max(progress * 100, 2)}%` }}
      />
    </div>
  );
}
