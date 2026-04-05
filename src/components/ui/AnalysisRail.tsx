"use client";

import { useEffect, useMemo, useState } from "react";

import type { SectionLink } from "@/data/stats";
import { cn } from "@/lib/cn";

type AnalysisRailProps = {
  sections: SectionLink[];
};

export function AnalysisRail({ sections }: AnalysisRailProps) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const [progress, setProgress] = useState(0);

  const sectionIds = useMemo(() => sections.map((section) => section.id), [sections]);

  useEffect(() => {
    const nodes = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const onScroll = () => {
      const viewportMiddle = window.innerHeight * 0.32;
      const best = nodes
        .map((node) => ({
          id: node.id,
          distance: Math.abs(node.getBoundingClientRect().top - viewportMiddle),
        }))
        .sort((a, b) => a.distance - b.distance)[0];

      if (best?.id) {
        setActive(best.id);
      }

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? window.scrollY / docHeight : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionIds]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-background/82 backdrop-blur-xl">
      <div className="mx-auto flex h-[var(--rail-height)] max-w-[1600px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#hero" className="shrink-0 font-display text-base font-semibold tracking-[0.08em] text-foreground">
          Claude Folding
        </a>

        <div className="hidden h-7 w-px bg-white/8 md:block" />

        <nav aria-label="Page sections" className="min-w-0 flex-1 overflow-x-auto">
          <ul className="flex min-w-max items-center gap-2">
            {sections.map((section) => {
              const isActive = section.id === active;

              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={cn(
                      "flex items-center gap-2 rounded-full border px-3 py-2 text-xs text-foreground/58",
                      isActive
                        ? "border-accent/30 bg-accent/12 text-accent"
                        : "border-transparent hover:border-white/8 hover:bg-white/[0.03] hover:text-foreground/78",
                    )}
                  >
                    <span className="tabular-nums tracking-wide">{section.short}</span>
                    <span className="hidden sm:inline">{section.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="h-px w-full bg-white/6">
        <div
          className="h-px origin-left bg-accent"
          style={{ transform: `scaleX(${Math.max(progress, 0.03)})` }}
        />
      </div>
    </header>
  );
}
