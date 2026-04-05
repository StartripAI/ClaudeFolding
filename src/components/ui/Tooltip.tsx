"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface TooltipProps {
  content: ReactNode;
  source?: string;
  label?: string;
  children?: ReactNode;
}

export function Tooltip({ content, source, label, children }: TooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <span
      className="relative inline-flex items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children || (
        <button
          type="button"
          aria-label={label || "典故"}
          className="inline-flex h-6 w-6 cursor-help items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-[11px] font-medium text-accent transition-colors hover:bg-accent/20"
        >
          ?
        </button>
      )}
      <AnimatePresence>
        {open && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 z-50 mb-3 w-64 -translate-x-1/2 rounded-xl border border-accent/20 bg-surface px-4 py-3 shadow-2xl"
          >
            <span className="block text-sm leading-6 text-foreground/80">{content}</span>
            {source && (
              <span className="mt-1.5 block font-display text-xs text-accent/60">—— {source}</span>
            )}
            <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-accent/20 bg-surface" />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
