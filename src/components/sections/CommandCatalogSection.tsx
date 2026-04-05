"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { TerminalFrame } from "@/components/ui/TerminalFrame";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { commandGroups, allCommands, type CommandItem } from "@/data/commands";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ */
/*  Risk badge tone mapping                                            */
/* ------------------------------------------------------------------ */
const riskTone: Record<CommandItem["risk"], "low" | "medium" | "high"> = {
  low: "low",
  medium: "medium",
  high: "high",
};

const riskLabel: Record<CommandItem["risk"], string> = {
  low: "LOW",
  medium: "MED",
  high: "HIGH",
};

/* ------------------------------------------------------------------ */
/*  Single command row                                                 */
/* ------------------------------------------------------------------ */
function CommandRow({ command }: { command: CommandItem }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] as const }}
      className="flex items-center gap-3 border-b border-white/5 py-2.5"
    >
      <span className="shrink-0 font-mono text-sm text-signal-green">
        {command.name}
      </span>
      <span className="flex-1 truncate text-sm text-muted">
        {command.summary}
      </span>
      <StatusBadge tone={riskTone[command.risk]}>
        {riskLabel[command.risk]}
      </StatusBadge>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main section (fold-compatible)                                     */
/* ------------------------------------------------------------------ */
export function CommandCatalogSection() {
  const [search, setSearch] = useState("");
  const [activeGroups, setActiveGroups] = useState<Set<string>>(new Set());

  const toggleGroup = (groupId: string) => {
    setActiveGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupId)) next.delete(groupId);
      else next.add(groupId);
      return next;
    });
  };

  const showAll = activeGroups.size === 0;
  const resetGroups = () => setActiveGroups(new Set());

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return allCommands.filter((cmd) => {
      const matchGroup = showAll || activeGroups.has(cmd.groupId);
      if (!matchGroup) return false;
      if (!q) return true;
      return (
        cmd.name.toLowerCase().includes(q) ||
        cmd.summary.toLowerCase().includes(q)
      );
    });
  }, [search, activeGroups, showAll]);

  return (
    <div className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          <TerminalFrame title="terminal://command-catalog">
            {/* Search input */}
            <div className="relative border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm text-signal-green">$</span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="搜索命令... (输入名称或描述)"
                  className={cn(
                    "flex-1 bg-transparent font-mono text-sm text-foreground placeholder:text-muted/40",
                    "outline-none caret-transparent",
                  )}
                />
                <span className="inline-block h-4 w-2 animate-blink bg-signal-green/80" />
              </div>
            </div>

            {/* Filter tags row */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={resetGroups}
                className={cn(
                  "rounded-full border px-3 py-1 font-mono text-xs transition-colors",
                  showAll
                    ? "border-accent/40 bg-accent/10 text-accent"
                    : "border-white/8 text-muted hover:text-foreground",
                )}
              >
                全部
              </button>

              {commandGroups.map((group) => (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => toggleGroup(group.id)}
                  className={cn(
                    "rounded-full border px-3 py-1 font-mono text-xs transition-colors",
                    activeGroups.has(group.id)
                      ? "border-accent/40 bg-accent/10 text-accent"
                      : "border-white/8 text-muted hover:text-foreground",
                  )}
                >
                  {group.labelZh}
                </button>
              ))}
            </div>

            {/* Count indicator */}
            <div className="mt-3 font-mono text-xs text-muted/50">
              {filtered.length} / {allCommands.length} 条命令
            </div>

            {/* Command list */}
            <div className="mt-2 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
              <AnimatePresence mode="popLayout">
                {filtered.map((cmd) => (
                  <CommandRow key={cmd.id} command={cmd} />
                ))}
              </AnimatePresence>

              {filtered.length === 0 && (
                <div className="py-12 text-center font-mono text-sm text-muted/40">
                  未找到匹配的命令
                </div>
              )}
            </div>
          </TerminalFrame>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </div>
  );
}
