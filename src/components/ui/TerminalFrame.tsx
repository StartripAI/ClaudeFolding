import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type TerminalFrameProps = {
  children: ReactNode;
  title?: string;
  className?: string;
};

export function TerminalFrame({
  children,
  title = "terminal://claude-fold",
  className,
}: TerminalFrameProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0a0a0a]/80 shadow-[0_24px_80px_rgba(0,0,0,0.45)]",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="font-mono text-[11px] text-foreground/45">
          {title}
        </span>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}
