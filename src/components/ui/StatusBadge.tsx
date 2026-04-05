import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type StatusBadgeProps = {
  tone: "accent" | "low" | "medium" | "high" | "direct" | "confirm" | "gated";
  children: ReactNode;
};

const toneClassMap = {
  accent: "border-accent/24 bg-accent/12 text-accent",
  low: "border-signal-green/25 bg-signal-green/12 text-signal-green",
  medium: "border-signal-amber/25 bg-signal-amber/12 text-signal-amber",
  high: "border-signal-red/25 bg-signal-red/12 text-signal-red",
  direct: "border-signal-green/25 bg-signal-green/12 text-signal-green",
  confirm: "border-signal-amber/25 bg-signal-amber/12 text-signal-amber",
  gated: "border-white/12 bg-white/[0.05] text-foreground/65",
};

export function StatusBadge({ tone, children }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[11px] tracking-[0.12em]",
        toneClassMap[tone],
      )}
    >
      {children}
    </span>
  );
}
