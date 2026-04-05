"use client";

import { SealStamp } from "@/components/ui/icons/SealStamp";

function GitHubIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer id="footer" className="border-t border-white/8 bg-background">
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 lg:px-12">
        {/* Main row */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          {/* Left: branding + disclaimer */}
          <div className="flex-1">
            <p className="font-display text-lg text-foreground">
              Claude Code Folding
            </p>
            <p className="mt-1 text-sm text-muted">
              源码级 Claude Code 架构解剖
            </p>
          </div>

          {/* Right: author + GitHub */}
          <div className="flex items-center gap-4 sm:items-end sm:flex-col sm:text-right">
            <SealStamp size={48} />
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-muted/50">
                StartripAI
              </span>
              <a
                href="https://github.com/StartripAI/ClaudeFolding"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted/40 transition-colors hover:text-accent"
                aria-label="GitHub"
              >
                <GitHubIcon />
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 border-t border-white/6 pt-6">
          <p className="text-xs leading-6 text-muted/40">
            非官方项目，与 Anthropic 无关。基于公开源码分析，内容可能存在偏差或滞后。部分整理由 AI 辅助完成。
          </p>
          <p className="mt-2 text-xs text-muted/30">
            分析日期：2026 年 3 月 31 日
          </p>
        </div>
      </div>
    </footer>
  );
}
