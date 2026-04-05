"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { hiddenFeatures, type HiddenFeature } from "@/data/hidden-features";
import { fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ */
/*  Status mapping                                                     */
/* ------------------------------------------------------------------ */

const statusTone: Record<string, "accent" | "low" | "medium" | "high"> = {
  "feature-flagged": "medium",
  "env-gated": "low",
  "commented-out": "high",
  prototype: "accent",
};

const statusLabel: Record<string, string> = {
  "feature-flagged": "功能开关",
  "env-gated": "环境门控",
  "commented-out": "已注释",
  prototype: "原型",
};

/* ------------------------------------------------------------------ */
/*  Feature card                                                       */
/* ------------------------------------------------------------------ */

function FeatureCard({ feature }: { feature: HiddenFeature }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      className={cn(
        "rounded-2xl border border-white/8 bg-surface-2/60 overflow-hidden cursor-pointer",
      )}
      onClick={() => setExpanded((prev) => !prev)}
    >
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          {feature.metaphorLabel && (
            <span className="font-display text-accent italic">
              {feature.metaphorLabel}
            </span>
          )}
          <StatusBadge tone={statusTone[feature.status] ?? "accent"}>
            {statusLabel[feature.status] ?? feature.status}
          </StatusBadge>
        </div>

        <h3 className="font-display text-lg font-bold text-foreground mt-2">
          {feature.titleZh}
        </h3>
        <p className="font-mono text-xs text-muted/50">{feature.titleEn}</p>

        <p className="text-xs text-muted/40 mt-3">
          {expanded ? "点击收起 ←" : "点击展开 →"}
        </p>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">
              <p className="text-sm text-muted mt-3">{feature.summary}</p>

              <div className="mt-2">
                <span className="text-xs text-accent/60">为什么重要</span>
                <p className="text-sm text-muted">{feature.whyItMatters}</p>
              </div>

              <div className="mt-2">
                <span className="text-xs text-accent/60">怎么看</span>
                <p className="text-sm text-muted">{feature.howToRead}</p>
              </div>

              <div className="mt-2 font-mono text-xs bg-black/30 p-3 rounded-lg text-muted/70">
                {feature.clue}
              </div>

              <p className="text-sm text-accent/70 mt-2 italic">
                {feature.impact}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main section (fold-compatible)                                     */
/* ------------------------------------------------------------------ */

export function HiddenFeaturesSection() {
  return (
    <div className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {hiddenFeatures.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
