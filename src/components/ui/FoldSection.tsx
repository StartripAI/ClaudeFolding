"use client";

import { motion, AnimatePresence } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface FoldSectionProps {
  id: string;
  number: string; // "一", "二", etc.
  index: number;
  metaphor: string;
  title: string;
  subtitle: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export function FoldSection({
  id,
  number,
  index,
  metaphor,
  title,
  subtitle,
  isOpen,
  onToggle,
  children,
}: FoldSectionProps) {
  return (
    <div id={id} className="group/fold">
      {/* ── Fold Header (always visible) ── */}
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "relative flex w-full items-center gap-5 px-5 py-5 sm:gap-6 sm:px-8 sm:py-7 lg:px-12",
          "border-b border-white/6 transition-all duration-300",
          isOpen
            ? "bg-surface/60 border-accent/15"
            : "hover:bg-white/[0.015]",
        )}
      >
        {/* Gold left accent bar when open */}
        <motion.div
          animate={{
            scaleY: isOpen ? 1 : 0,
            opacity: isOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute left-0 top-2 bottom-2 w-[3px] origin-center rounded-full bg-accent/70"
        />

        {/* Fold number badge */}
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 sm:h-12 sm:w-12",
            isOpen
              ? "border-accent/30 bg-accent/10 shadow-[0_0_16px_rgba(212,168,83,0.15)]"
              : "border-white/8 bg-white/[0.025] group-hover/fold:border-white/14",
          )}
        >
          <span
            className={cn(
              "font-display text-base font-bold transition-colors duration-300 sm:text-lg",
              isOpen ? "text-accent" : "text-muted/50",
            )}
          >
            {number}
          </span>
        </div>

        {/* Text block */}
        <div className="flex-1 text-left">
          <div className="flex items-baseline gap-2.5">
            <span className="font-display text-sm italic text-accent/60 sm:text-base">
              {metaphor}
            </span>
            <span className="text-white/15 text-xs">·</span>
            <span className="font-heading text-base font-bold text-foreground sm:text-lg">
              {title}
            </span>
            <span className="ml-auto hidden font-mono text-[11px] tracking-widest text-muted/25 sm:inline">
              {`0${index}`}
            </span>
          </div>

          {/* Subtitle — visible when collapsed, slides away when open */}
          <motion.p
            animate={{
              opacity: isOpen ? 0 : 0.6,
              height: isOpen ? 0 : "auto",
              marginTop: isOpen ? 0 : 6,
            }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden text-sm text-muted/50"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className={cn(
            "shrink-0 transition-colors duration-300",
            isOpen ? "text-accent/60" : "text-muted/30",
          )}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.5 6.75L9 11.25L13.5 6.75"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </button>

      {/* ── Fold Content (expandable) ── */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: {
                duration: 0.55,
                ease: [0.25, 0.1, 0.25, 1],
              },
              opacity: {
                duration: 0.35,
                delay: 0.12,
              },
            }}
            className="overflow-hidden border-b border-white/6"
          >
            {/* Paper unfold effect wrapper */}
            <motion.div
              initial={{ y: 30, scale: 0.995 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 15, scale: 0.998 }}
              transition={{
                duration: 0.45,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.08,
              }}
              style={{ transformOrigin: "top center" }}
            >
              {/* Top gradient fade-in line */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
