"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { Tooltip } from "@/components/ui/Tooltip";
import { GlowCard } from "@/components/ui/GlowCard";
import { agentLoopSteps, type AgentLoopStep } from "@/data/agent-loop";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ */
/*  Timeline dot with pulse animation                                  */
/* ------------------------------------------------------------------ */
function TimelineDot() {
  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        className="absolute h-5 w-5 rounded-full bg-accent/20"
        animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="h-2.5 w-2.5 rounded-full border-2 border-accent bg-background" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Individual step card                                               */
/* ------------------------------------------------------------------ */
function StepCard({ step }: { step: AgentLoopStep }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
    >
      <GlowCard className="relative">
        {/* Step number */}
        <p className="font-mono text-xs text-accent/60">
          {`第 ${step.id.toString().padStart(2, "0")} 步`}
        </p>

        {/* Title */}
        <h3 className="mt-2 font-display text-xl font-bold text-foreground">
          {step.titleZh}
        </h3>

        {/* English name */}
        <p className="mt-1 font-mono text-xs text-muted/60">{step.titleEn}</p>

        {/* Summary */}
        <p className="mt-2 text-sm text-muted">{step.summary}</p>

        {/* Ancient annotation with tooltip */}
        {step.metaphorLabel && (
          <div className="mt-3 flex items-center gap-2">
            <Tooltip content={step.whyItMatters} label={step.metaphorLabel}>
              <span className="cursor-help font-display text-sm italic text-accent/70 underline decoration-accent/20 decoration-dotted underline-offset-4">
                {step.metaphorLabel}
              </span>
            </Tooltip>
          </div>
        )}

        {/* Code block */}
        <div className="mt-3 rounded-lg bg-black/40 p-3">
          {step.code.map((line, i) => (
            <p key={i} className="font-mono text-xs text-green-400/80">
              {line}
            </p>
          ))}
        </div>

        {/* Output */}
        <p className="mt-2 font-mono text-[11px] text-muted/50">
          {`→ ${step.output}`}
        </p>
      </GlowCard>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main section (fold-compatible — no SectionWrapper/SectionTitle)     */
/* ------------------------------------------------------------------ */
export function AgentLoopSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const strokeOffset = useTransform(pathLength, (v) => 1 - v);

  return (
    <div className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1400px]">
        {/* Subtitle for context inside fold */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-muted mb-10"
        >
          从输入到待命，逐步拆解代理执行的完整路径。
        </motion.p>

        {/* Timeline container */}
        <div ref={containerRef} className="relative">
          {/* ---- SVG vertical line ---- */}
          <svg
            className="pointer-events-none absolute inset-y-0 left-4 z-0 h-full w-px lg:left-1/2 lg:-translate-x-1/2"
            preserveAspectRatio="none"
          >
            <line
              x1="0.5" y1="0" x2="0.5" y2="100%"
              stroke="currentColor" strokeWidth="2"
              className="text-accent/10"
            />
            <motion.line
              x1="0.5" y1="0" x2="0.5" y2="100%"
              stroke="currentColor" strokeWidth="2"
              className="text-accent/40"
              style={{
                pathLength,
                strokeDasharray: 1,
                strokeDashoffset: strokeOffset,
              }}
            />
          </svg>

          {/* ---- Step cards ---- */}
          <div className="relative z-10 space-y-12 lg:space-y-16">
            {agentLoopSteps.map((step) => {
              const isOdd = step.id % 2 !== 0;
              return (
                <div
                  key={step.id}
                  className={cn(
                    "grid grid-cols-[40px_1fr] lg:grid-cols-[1fr_40px_1fr]",
                    "items-start gap-0 lg:gap-0",
                  )}
                >
                  <div className={cn("hidden lg:block", isOdd ? "pr-8" : "")}>
                    {isOdd && <StepCard step={step} />}
                  </div>

                  <div className="flex justify-center pt-6 lg:pt-8">
                    <TimelineDot />
                  </div>

                  <div className={cn("pl-4 lg:pl-0", !isOdd ? "lg:pl-8" : "")}>
                    <div className="lg:hidden">
                      <StepCard step={step} />
                    </div>
                    <div className="hidden lg:block">
                      {!isOdd && <StepCard step={step} />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
