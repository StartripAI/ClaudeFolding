"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { GlowCard } from "@/components/ui/GlowCard";
import {
  architectureNodes,
  type ArchitectureNode,
} from "@/data/architecture";
import { cn } from "@/lib/cn";
import { fadeInUp, scaleIn } from "@/lib/motion";

/* ------------------------------------------------------------------ */
/*  Group colour config                                                */
/* ------------------------------------------------------------------ */

const groupColors: Record<
  string,
  { dot: string; label: string; bg: string }
> = {
  surface: { dot: "bg-accent", label: "表面层", bg: "bg-accent/10" },
  control: { dot: "bg-accent-blue", label: "控制层", bg: "bg-accent-blue/10" },
  runtime: { dot: "bg-accent-green", label: "运行层", bg: "bg-accent-green/10" },
  ux: { dot: "bg-accent-purple", label: "体验层", bg: "bg-accent-purple/10" },
};

const groupRing: Record<string, string> = {
  surface: "ring-accent/40",
  control: "ring-accent-blue/40",
  runtime: "ring-accent-green/40",
  ux: "ring-accent-purple/40",
};

const groupBorder: Record<string, string> = {
  surface: "border-accent/40",
  control: "border-accent-blue/40",
  runtime: "border-accent-green/40",
  ux: "border-accent-purple/40",
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function nodeById(id: string): ArchitectureNode | undefined {
  return architectureNodes.find((n) => n.id === id);
}

/* ------------------------------------------------------------------ */
/*  Component (fold-compatible)                                        */
/* ------------------------------------------------------------------ */

export function ArchitectureSection() {
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode>(
    architectureNodes[0],
  );

  const connectedIds = new Set(selectedNode.connections);

  return (
    <div className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1400px]">
        {/* Group legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center gap-5 mb-10"
        >
          {Object.entries(groupColors).map(([key, { dot, label }]) => (
            <span
              key={key}
              className="flex items-center gap-2 text-xs text-muted"
            >
              <span className={cn("inline-block h-2 w-2 rounded-full", dot)} />
              {label}
            </span>
          ))}
        </motion.div>

        {/* Two-column layout */}
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          {/* ---- LEFT: Node Grid ---- */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
            className="grid grid-cols-2 gap-3 self-start sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2"
          >
            {architectureNodes.map((node) => {
              const isSelected = node.id === selectedNode.id;
              const isConnected = connectedIds.has(node.id);
              const colors = groupColors[node.group];

              return (
                <motion.div
                  key={node.id}
                  variants={scaleIn}
                  onClick={() => setSelectedNode(node)}
                  className={cn(
                    "group relative cursor-pointer rounded-2xl border p-4 transition-colors",
                    "bg-surface-2/80 backdrop-blur-sm",
                    isSelected
                      ? cn(groupBorder[node.group], "bg-white/[0.04]")
                      : "border-white/8 hover:border-white/14",
                    isConnected &&
                      !isSelected &&
                      cn("ring-1", groupRing[selectedNode.group]),
                  )}
                >
                  {isConnected && !isSelected && (
                    <div className="absolute inset-0 rounded-2xl bg-white/[0.02]" />
                  )}

                  <div className="relative">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "inline-block h-2 w-2 shrink-0 rounded-full",
                          colors.dot,
                        )}
                      />
                      <h4 className="font-display text-base font-bold text-foreground">
                        {node.titleZh}
                      </h4>
                    </div>

                    <p className="mt-1 font-mono text-[11px] text-muted/50">
                      {node.titleEn}
                    </p>

                    {node.metaphorLabel && (
                      <p className="mt-2 font-display text-xs italic text-accent/60">
                        {node.metaphorLabel}
                      </p>
                    )}

                    <p className="mt-2 line-clamp-2 text-xs text-muted">
                      {node.summary}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* ---- RIGHT: Detail Panel ---- */}
          <div className="self-start lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] as const }}
              >
                <GlowCard className="space-y-5 p-6 sm:p-8">
                  {/* Header */}
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-2xl font-bold text-foreground">
                        {selectedNode.titleZh}
                      </h3>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
                          groupColors[selectedNode.group].bg,
                          "text-foreground/80",
                        )}
                      >
                        <span
                          className={cn(
                            "inline-block h-1.5 w-1.5 rounded-full",
                            groupColors[selectedNode.group].dot,
                          )}
                        />
                        {groupColors[selectedNode.group].label}
                      </span>
                    </div>

                    <p className="mt-1 font-mono text-[11px] tracking-[0.16em] text-muted/50">
                      {selectedNode.titleEn}
                    </p>

                    {selectedNode.metaphorLabel && (
                      <p className="mt-3 font-display text-sm italic text-accent">
                        {selectedNode.metaphorLabel}
                      </p>
                    )}
                  </div>

                  {/* Summary */}
                  <div className="rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3">
                    <p className="micro-label text-foreground/38">概述</p>
                    <p className="mt-2 text-sm leading-7 text-muted">
                      {selectedNode.summary}
                    </p>
                  </div>

                  {/* Why it matters */}
                  <div className="rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3">
                    <p className="micro-label text-foreground/38">为什么重要</p>
                    <p className="mt-2 text-sm leading-7 text-foreground/66">
                      {selectedNode.whyItMatters}
                    </p>
                  </div>

                  {/* How to read */}
                  <div className="rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3">
                    <p className="micro-label text-foreground/38">怎么看</p>
                    <p className="mt-2 text-sm leading-7 text-foreground/62">
                      {selectedNode.howToRead}
                    </p>
                  </div>

                  {/* Connections */}
                  {selectedNode.connections.length > 0 && (
                    <div>
                      <p className="micro-label text-foreground/38">连接模块</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {selectedNode.connections.map((connId) => {
                          const conn = nodeById(connId);
                          if (!conn) return null;
                          const connColors = groupColors[conn.group];
                          return (
                            <button
                              key={connId}
                              type="button"
                              onClick={() => setSelectedNode(conn)}
                              className={cn(
                                "inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 text-xs text-foreground/70 transition-colors",
                                "hover:border-white/20 hover:bg-white/[0.04]",
                              )}
                            >
                              <span
                                className={cn(
                                  "inline-block h-1.5 w-1.5 rounded-full",
                                  connColors.dot,
                                )}
                              />
                              {conn.titleZh}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </GlowCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
