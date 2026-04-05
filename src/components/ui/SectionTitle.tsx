"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface SectionTitleProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionTitle({ eyebrow, title, subtitle, className }: SectionTitleProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
        }}
        className="flex items-center gap-4"
      >
        <span className="micro-label text-accent/80">{eyebrow}</span>
        <div className="h-px flex-1 bg-white/8" />
      </motion.div>

      <motion.h2
        variants={{
          hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
          visible: {
            opacity: 1,
            clipPath: "inset(0 0% 0 0)",
            transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 },
          },
        }}
        className="mt-5 font-display text-3xl font-bold leading-[1.12] tracking-tight text-foreground sm:text-4xl lg:text-5xl"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } },
          }}
          className="mt-5 text-lg leading-8 text-muted"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
