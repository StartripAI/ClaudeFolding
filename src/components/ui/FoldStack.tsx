"use client";

import { useState, useCallback, useEffect } from "react";
import { FoldSection } from "@/components/ui/FoldSection";
import { AgentLoopSection } from "@/components/sections/AgentLoopSection";
import { ArchitectureSection } from "@/components/sections/ArchitectureSection";
import { ToolSystemSection } from "@/components/sections/ToolSystemSection";
import { CommandCatalogSection } from "@/components/sections/CommandCatalogSection";
import { HiddenFeaturesSection } from "@/components/sections/HiddenFeaturesSection";
import type { ComponentType } from "react";

/* ── Fold definitions ── */

interface FoldDef {
  id: string;
  number: string;
  index: number;
  metaphor: string;
  title: string;
  subtitle: string;
}

const folds: FoldDef[] = [
  {
    id: "agent-loop",
    number: "一",
    index: 1,
    metaphor: "韩信点兵",
    title: "执行链",
    subtitle: "一条指令，11 步闭环。",
  },
  {
    id: "architecture",
    number: "二",
    index: 2,
    metaphor: "三省五部",
    title: "架构",
    subtitle: "8 个核心模块，各司其职。",
  },
  {
    id: "tools",
    number: "三",
    index: 3,
    metaphor: "虎符令",
    title: "工具",
    subtitle: "25+ 工具，三级权限管控。",
  },
  {
    id: "commands",
    number: "四",
    index: 4,
    metaphor: "诏令簿",
    title: "命令",
    subtitle: "95 条命令，全量收录。",
  },
  {
    id: "hidden",
    number: "五",
    index: 5,
    metaphor: "天机",
    title: "未发布",
    subtitle: "8 个未公开能力，提前拆解。",
  },
];

const foldComponents: Record<string, ComponentType> = {
  "agent-loop": AgentLoopSection,
  architecture: ArchitectureSection,
  tools: ToolSystemSection,
  commands: CommandCatalogSection,
  hidden: HiddenFeaturesSection,
};

/* ── Component ── */

export function FoldStack() {
  const [openFolds, setOpenFolds] = useState<Set<string>>(new Set());

  const toggle = useCallback((id: string) => {
    setOpenFolds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  /* Auto-open fold when navigating via hash (e.g. clicking nav) */
  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash.slice(1);
      const matchedFold = folds.find((f) => f.id === hash);
      if (matchedFold) {
        setOpenFolds((prev) => {
          if (prev.has(hash)) return prev;
          const next = new Set(prev);
          next.add(hash);
          return next;
        });
      }
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return (
    <div className="relative mx-auto max-w-[1400px] mt-6 mb-12 rounded-2xl border border-white/6 bg-surface/30 overflow-hidden">
      {/* Fold label */}
      <div className="flex items-center gap-3 px-5 py-3 sm:px-8 lg:px-12 border-b border-white/6 bg-white/[0.01]">
        <span className="micro-label text-accent/50">五层折叠</span>
        <div className="h-px flex-1 bg-white/5" />
        <span className="font-mono text-[11px] text-muted/30">
          {openFolds.size} / {folds.length} 已展开
        </span>
      </div>

      {/* Fold items */}
      {folds.map((fold) => {
        const Component = foldComponents[fold.id];
        return (
          <FoldSection
            key={fold.id}
            {...fold}
            isOpen={openFolds.has(fold.id)}
            onToggle={() => toggle(fold.id)}
          >
            <Component />
          </FoldSection>
        );
      })}
    </div>
  );
}
