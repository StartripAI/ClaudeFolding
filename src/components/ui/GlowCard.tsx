"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  breathe?: boolean;
  onClick?: () => void;
}

export function GlowCard({
  children,
  className,
  glowColor = "rgba(212,168,83,0.12)",
  breathe = false,
  onClick,
}: GlowCardProps) {
  const dim = glowColor.replace(/[\d.]+\)$/, "0.08)");
  const bright = glowColor;

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate={breathe ? "breathe" : "rest"}
      variants={{
        rest: { y: 0, boxShadow: `0 0 0 ${dim}` },
        hover: {
          y: -4,
          boxShadow: `0 8px 28px ${bright}`,
          transition: { duration: 0.2, ease: "easeOut" },
        },
        breathe: {
          boxShadow: [`0 0 8px ${dim}`, `0 0 24px ${bright}`, `0 0 8px ${dim}`],
          transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        },
      }}
      onClick={onClick}
      className={cn(
        "overflow-hidden rounded-2xl border border-white/8 bg-surface-2/80 p-5 backdrop-blur-sm transition-colors hover:border-white/14",
        onClick && "cursor-pointer",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
