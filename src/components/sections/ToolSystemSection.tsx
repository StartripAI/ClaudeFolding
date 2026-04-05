"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { GlowCard } from "@/components/ui/GlowCard";
import { TigerSeal } from "@/components/ui/icons/TigerSeal";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { toolCategories, type ToolCategory, type ToolItem } from "@/data/tools";
import { fadeInUp, scaleIn } from "@/lib/motion";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ */
/*  Permission pill styling                                            */
/* ------------------------------------------------------------------ */
const permissionStyle = {
  direct: "border-signal-green/30 bg-signal-green/8 text-signal-green",
  confirm: "border-signal-amber/30 bg-signal-amber/8 text-signal-amber",
  gated: "border-signal-red/30 bg-signal-red/8 text-signal-red",
};

const permissionLabel = {
  direct: "直通",
  confirm: "确认",
  gated: "封存",
};

/* ------------------------------------------------------------------ */
/*  Expanded tool detail                                               */
/* ------------------------------------------------------------------ */
function ToolDetail({ tool }: { tool: ToolItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }}
      className="overflow-hidden"
    >
      <div className="mt-4 rounded-xl border border-white/6 bg-black/30 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="font-display text-sm font-bold text-foreground">
              {tool.titleZh}
            </h4>
            <p className="mt-0.5 font-mono text-xs text-muted/50">
              {tool.titleEn}
            </p>
          </div>
          <TigerSeal permission={tool.permission} size={28} />
        </div>

        <p className="mt-3 text-sm leading-relaxed text-muted">
          {tool.summary}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="font-mono text-[11px] text-muted/60">
            scope: {tool.scope}
          </span>
          <span className="text-white/15">|</span>
          <span className="font-mono text-[11px] text-muted/60">
            callMode: {tool.callMode}
          </span>
          <span className="text-white/15">|</span>
          <StatusBadge tone={tool.permission}>
            {permissionLabel[tool.permission]}
          </StatusBadge>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Single category card                                               */
/* ------------------------------------------------------------------ */
function CategoryCard({ category }: { category: ToolCategory }) {
  const [expandedTool, setExpandedTool] = useState<string | null>(null);

  const handleToolClick = (toolId: string) => {
    setExpandedTool((prev) => (prev === toolId ? null : toolId));
  };

  return (
    <motion.div variants={fadeInUp}>
      <GlowCard className="h-full">
        <div>
          {category.metaphorLabel && (
            <span className="font-display text-lg text-accent">
              {category.metaphorLabel}
            </span>
          )}
          <h3 className="mt-1 font-display text-base font-bold text-foreground">
            {category.titleZh}
          </h3>
          <p className="font-mono text-xs text-muted/50">{category.titleEn}</p>
        </div>

        <p className="mt-3 text-sm text-muted">{category.summary}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {category.tools.map((tool) => (
            <button
              key={tool.id}
              type="button"
              onClick={() => handleToolClick(tool.id)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-mono transition-colors",
                expandedTool === tool.id
                  ? permissionStyle[tool.permission]
                  : "border-white/8 text-foreground/70 hover:border-white/16 hover:text-foreground",
              )}
            >
              <TigerSeal permission={tool.permission} size={18} />
              {tool.titleEn}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {expandedTool && (
            <ToolDetail
              key={expandedTool}
              tool={category.tools.find((t) => t.id === expandedTool)!}
            />
          )}
        </AnimatePresence>
      </GlowCard>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main section (fold-compatible)                                     */
/* ------------------------------------------------------------------ */
export function ToolSystemSection() {
  return (
    <div className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {toolCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
