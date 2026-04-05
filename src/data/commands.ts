export type CommandGroup = {
  id: string;
  labelZh: string;
  labelEn: string;
  summary: string;
  evidence: string;
};

export type CommandItem = {
  id: string;
  name: string;
  groupId: string;
  summary: string;
  whyItMatters: string;
  howToRead: string;
  evidence: string;
  visibility: "public" | "gated";
  risk: "low" | "medium" | "high";
  related: string[];
};

type RawCommandGroup = CommandGroup & {
  commands: Array<{
    name: string;
    summary: string;
    gated?: boolean;
    risk?: "low" | "medium" | "high";
    related?: string[];
  }>;
};

const rawCommandGroups: RawCommandGroup[] = [
  {
    id: "setup",
    labelZh: "建制与配置",
    labelEn: "Setup & Config",
    summary: "账号、权限、主题、MCP 和基础制度都从这里进场。",
    evidence: "Claude Code Folding /命令 /Setup & Config",
    commands: [
      { name: "/init", summary: "初始化当前项目的 Claude Code 工作方式。", related: ["/config", "/permissions"] },
      { name: "/login", summary: "登录账号，拿到正式会话能力。", related: ["/logout"] },
      { name: "/logout", summary: "退出当前登录状态。", related: ["/login"] },
      { name: "/config", summary: "查看或调整全局与项目配置。", related: ["/permissions", "/theme"] },
      { name: "/permissions", summary: "设置命令执行与文件修改的授权模式。", risk: "high", related: ["/config"] },
      { name: "/model", summary: "切换模型或性能档位。" },
      { name: "/theme", summary: "切换界面主题。", related: ["/color"] },
      { name: "/terminal-setup", summary: "检查并设置终端环境。", risk: "medium" },
      { name: "/doctor", summary: "诊断环境与安装问题。", related: ["/terminal-setup"] },
      { name: "/onboarding", summary: "重新查看新手引导。" },
      { name: "/mcp", summary: "管理或检查 MCP 连接。", related: ["/hooks"] },
      { name: "/hooks", summary: "查看或配置生命周期 hooks。", risk: "medium" },
    ],
  },
  {
    id: "daily",
    labelZh: "日常作业",
    labelEn: "Daily Workflow",
    summary: "上下文、计划、会话、任务和工作区操作集中在这一组。",
    evidence: "Claude Code Folding /命令 /Daily Workflow",
    commands: [
      { name: "/compact", summary: "压缩上下文，把长会话收束成更紧凑的摘要。", related: ["/summary", "/context"] },
      { name: "/memory", summary: "查看或调整记忆机制。", related: ["/context"] },
      { name: "/context", summary: "检查当前上下文载荷。", related: ["/compact", "/memory"] },
      { name: "/plan", summary: "进入先规划再执行的工作姿态。", related: ["/tasks", "/agents"] },
      { name: "/resume", summary: "恢复先前工作链。", related: ["/session"] },
      { name: "/session", summary: "查看或切换当前会话信息。", related: ["/resume", "/rename"] },
      { name: "/files", summary: "查看已纳入上下文的文件。", related: ["/add-dir"] },
      { name: "/add-dir", summary: "把新的目录加入工作范围。", risk: "medium", related: ["/files"] },
      { name: "/copy", summary: "复制输出或结果片段。" },
      { name: "/export", summary: "导出会话或结果。", related: ["/summary"] },
      { name: "/summary", summary: "生成当前工作的摘要。", related: ["/export", "/compact"] },
      { name: "/clear", summary: "清理当前显示或上下文状态。", risk: "medium" },
      { name: "/brief", summary: "切到更精简的输出风格。", related: ["/output-style"] },
      { name: "/output-style", summary: "配置输出呈现方式。", gated: true, related: ["/brief"] },
      { name: "/color", summary: "调整终端配色细节。", related: ["/theme"] },
      { name: "/vim", summary: "切换 Vim 风格输入体验。" },
      { name: "/keybindings", summary: "管理快捷键方案。", related: ["/vim"] },
      { name: "/skills", summary: "查看或启用技能。", related: ["/agents"] },
      { name: "/tasks", summary: "查看当前任务队列。", related: ["/plan", "/agents"] },
      { name: "/agents", summary: "查看子代理或并行代理状态。", related: ["/tasks", "/plan"] },
      { name: "/fast", summary: "切到更快的执行偏好。", related: ["/effort"] },
      { name: "/effort", summary: "调整推理用力程度。", related: ["/fast"] },
      { name: "/extra-usage", summary: "查看附加用量信息。", related: ["/usage", "/cost"] },
      { name: "/rate-limit-options", summary: "查看速率限制相关选项。", related: ["/extra-usage"] },
    ],
  },
  {
    id: "review",
    labelZh: "审阅与 Git",
    labelEn: "Code Review & Git",
    summary: "围绕 review、diff、提交和 PR 协作的入口集合。",
    evidence: "Claude Code Folding /命令 /Code Review & Git",
    commands: [
      { name: "/review", summary: "进入代码审阅视角，重点找风险和回归。", risk: "medium", related: ["/diff", "/security-review"] },
      { name: "/commit", summary: "整理并提交本地改动。", risk: "high", related: ["/diff", "/branch"] },
      { name: "/commit-push-pr", summary: "一条链完成提交、推送和 PR。", risk: "high", related: ["/commit", "/pr_comments"] },
      { name: "/diff", summary: "查看当前差异。", related: ["/review", "/commit"] },
      { name: "/pr_comments", summary: "读取或处理 PR 评论。", related: ["/review"] },
      { name: "/branch", summary: "查看或切换分支。", risk: "medium", related: ["/diff"] },
      { name: "/issue", summary: "读取 issue 上下文。", related: ["/review"] },
      { name: "/security-review", summary: "重点从安全角度审代码。", risk: "medium", related: ["/review"] },
      { name: "/autofix-pr", summary: "尝试自动修 PR 问题。", gated: true, risk: "high", related: ["/pr_comments"] },
      { name: "/share", summary: "生成可分享的上下文或链接。" },
      { name: "/install-github-app", summary: "安装 GitHub 集成。", gated: true },
      { name: "/install-slack-app", summary: "安装 Slack 集成。", gated: true },
      { name: "/tag", summary: "为工作或结果打标签。" },
    ],
  },
  {
    id: "debug",
    labelZh: "诊断与追踪",
    labelEn: "Debugging & Diagnostics",
    summary: "状态、成本、上下文可视化和内部诊断都聚在这一组。",
    evidence: "Claude Code Folding /命令 /Debugging & Diagnostics",
    commands: [
      { name: "/status", summary: "查看当前工作状态。", related: ["/stats", "/usage"] },
      { name: "/stats", summary: "看运行统计。", related: ["/cost", "/usage"] },
      { name: "/cost", summary: "看 token 或成本消耗。", related: ["/stats", "/extra-usage"] },
      { name: "/usage", summary: "查看总体用量。", related: ["/cost", "/extra-usage"] },
      { name: "/version", summary: "查看当前版本信息。" },
      { name: "/feedback", summary: "提交反馈。" },
      { name: "/think-back", summary: "回看上一轮思路或轨迹。", related: ["/thinkback-play"] },
      { name: "/thinkback-play", summary: "播放式回顾一段执行过程。", related: ["/think-back"] },
      { name: "/rewind", summary: "把会话回退到更早状态。", risk: "high", related: ["/session"] },
      { name: "/ctx_viz", summary: "可视化当前上下文构成。", related: ["/context"] },
      { name: "/debug-tool-call", summary: "检查工具调用细节。", related: ["/review", "/ctx_viz"] },
      { name: "/perf-issue", summary: "排查性能问题。", related: ["/status"] },
      { name: "/heapdump", summary: "获取内存堆信息。", gated: true, risk: "high" },
      { name: "/ant-trace", summary: "追踪更细粒度内部链路。", gated: true },
      { name: "/backfill-sessions", summary: "补录旧会话数据。", gated: true },
      { name: "/break-cache", summary: "强制打破缓存。", gated: true, risk: "high" },
      { name: "/bridge-kick", summary: "唤醒桥接端。", gated: true },
      { name: "/mock-limits", summary: "模拟限额条件。", gated: true },
      { name: "/oauth-refresh", summary: "刷新 OAuth 状态。", gated: true },
      { name: "/reset-limits", summary: "重置限制状态。", gated: true, risk: "high" },
      { name: "/env", summary: "查看环境变量与运行环境。", risk: "medium" },
      { name: "/bughunter", summary: "进入更激进的找 bug 模式。", gated: true, risk: "medium" },
      { name: "/passes", summary: "查看多轮 pass 或评审结果。", gated: true },
    ],
  },
  {
    id: "advanced",
    labelZh: "高阶与试验",
    labelEn: "Advanced & Experimental",
    summary: "多端、远控、插件、沙盒和人格化能力大量从这里露头。",
    evidence: "Claude Code Folding /命令 /Advanced & Experimental",
    commands: [
      { name: "/advisor", summary: "进入顾问式工作姿态。", related: ["/plan"] },
      { name: "/ultraplan", summary: "触发超长规划模式。", gated: true, related: ["/plan"] },
      { name: "/remote-control", summary: "远程控制当前会话。", gated: true, risk: "high", related: ["/mobile", "/desktop"] },
      { name: "/teleport", summary: "跨环境转移工作上下文。", gated: true },
      { name: "/voice", summary: "语音交互入口。", gated: true },
      { name: "/desktop", summary: "桌面端相关控制。", gated: true, related: ["/mobile"] },
      { name: "/chrome", summary: "浏览器端或 Chrome 相关能力。", gated: true },
      { name: "/mobile", summary: "移动端控制入口。", gated: true, related: ["/desktop", "/remote-control"] },
      { name: "/sandbox", summary: "进入更隔离的执行环境。", risk: "medium" },
      { name: "/plugin", summary: "查看或管理插件。", related: ["/reload-plugins"] },
      { name: "/reload-plugins", summary: "重新加载插件。", risk: "medium", related: ["/plugin"] },
      { name: "/web-setup", summary: "设置 Web 相关桥接能力。", gated: true },
      { name: "/remote-env", summary: "查看远端环境信息。", gated: true },
      { name: "/ide", summary: "IDE 集成入口。", gated: true },
      { name: "/stickers", summary: "贴纸或轻量彩蛋功能。", gated: true },
      { name: "/good-claude", summary: "人格化小功能入口。", gated: true },
      { name: "/btw", summary: "轻量提醒或插话功能。", gated: true },
      { name: "/upgrade", summary: "查看升级路径。" },
      { name: "/release-notes", summary: "查看版本更新说明。" },
      { name: "/privacy-settings", summary: "调整隐私相关设置。", risk: "medium" },
      { name: "/help", summary: "查看帮助总入口。" },
      { name: "/exit", summary: "退出当前会话。", risk: "high" },
      { name: "/rename", summary: "重命名会话或工作单元。", related: ["/session"] },
    ],
  },
];

export const commandGroups: CommandGroup[] = rawCommandGroups.map((group) => ({
  id: group.id,
  labelZh: group.labelZh,
  labelEn: group.labelEn,
  summary: group.summary,
  evidence: group.evidence,
}));

export const allCommands: CommandItem[] = rawCommandGroups.flatMap((group) =>
  group.commands.map((command) => ({
    id: `${group.id}-${command.name.replace("/", "")}`,
    name: command.name,
    groupId: group.id,
    summary: command.summary,
    whyItMatters:
      group.id === "review"
        ? "这类命令说明 Claude Code 把 Git 与审阅协作当成一等入口，而不是附属功能。"
        : group.id === "debug"
          ? "这类命令暴露了产品内部状态与可观测性，不只是回答文本。"
          : group.id === "advanced"
            ? "这类命令更接近产品路线图，说明边界正在向远控、多端和插件系统扩张。"
            : `这类命令暴露了 ${group.labelZh} 这条显式操作面，不需要靠隐藏按钮触发。`,
    howToRead: command.gated
      ? "把它当成产品已露出但未完全公开的控制接口：通常代表高阶、试验或高风险能力。"
      : "把它当成显式工作流开关，而不是自然语言的可选别名。",
    evidence: group.evidence,
    visibility: command.gated ? "gated" : "public",
    risk: command.risk ?? (command.gated ? "medium" : "low"),
    related: command.related ?? [],
  })),
);
