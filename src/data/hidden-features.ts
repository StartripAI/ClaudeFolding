export type HiddenFeature = {
  id: string;
  titleZh: string;
  titleEn: string;
  status: "feature-flagged" | "env-gated" | "commented-out" | "prototype";
  summary: string;
  whyItMatters: string;
  howToRead: string;
  evidence: string;
  metaphorLabel?: string;
  clue: string;
  impact: string;
};

export const hiddenFeatures: HiddenFeature[] = [
  {
    id: "buddy",
    titleZh: "Buddy",
    titleEn: "Terminal Companion",
    status: "feature-flagged",
    summary: "终端灵宠型人格彩蛋，品类和稀有度与账号特征相关。",
    whyItMatters: "它说明代码库在试探陪伴感和人格层，而不只是效率工具。",
    howToRead: "不要把它看成主生产力能力，而要看作产品人格试验。",
    evidence: "Claude Code Folding /天机 /Buddy",
    metaphorLabel: "终端灵宠",
    clue: "代码里已有命名与设定，但并未作为正式主功能公开。",
    impact: "暴露了 Claude Code 试图从工具长成工作伙伴的迹象。",
  },
  {
    id: "kairos",
    titleZh: "Kairos",
    titleEn: "Long-running Memory Mode",
    status: "env-gated",
    summary: "强调跨会话记忆整合与后台动作的长时态代理模式。",
    whyItMatters: "它把边界从单次会话助手推向持续运行的工作代理。",
    howToRead: "把它放在 memory + background execution 的交叉点来看。",
    evidence: "Claude Code Folding /天机 /Kairos",
    metaphorLabel: "时序长忆",
    clue: "公开描述里直接出现 memory consolidation 与 background actions。",
    impact: "一旦成形，Claude Code 的使用模式会从“我盯着它”变成“它持续替我值班”。",
  },
  {
    id: "ultraplan",
    titleZh: "UltraPlan",
    titleEn: "Extended Planning Window",
    status: "feature-flagged",
    summary: "拉长 planning window，让模型在更长时间尺度上先做结构化思考。",
    whyItMatters: "它说明产品不只追求更快答复，也在追求更长跨度的任务推演。",
    howToRead: "这是 planning 深度升级，不是普通的 mode toggle。",
    evidence: "Claude Code Folding /天机 /UltraPlan",
    metaphorLabel: "长策议局",
    clue: "原站直接把它和更长 planning horizon 绑定。",
    impact: "长链路任务、重构和策略型工作会首先受益。",
  },
  {
    id: "coordinator",
    titleZh: "Coordinator Mode",
    titleEn: "Multi-agent Orchestration",
    status: "prototype",
    summary: "主代理拆任务、拉并行 worker、在隔离 worktree 中收敛结果。",
    whyItMatters: "它几乎直接宣告了 Claude Code 正在向总调度代理演化。",
    howToRead: "重点不在一个 worker，而在 orchestrator + isolated worktree 这一整套机制。",
    evidence: "Claude Code Folding /天机 /Coordinator Mode",
    metaphorLabel: "总调度模式",
    clue: "公开线索明确提到 parallel workers 和 isolated git worktrees。",
    impact: "复杂软件任务会从“单代理硬扛”转向“多代理分工”。",
  },
  {
    id: "bridge",
    titleZh: "Bridge",
    titleEn: "Remote Session Bridge",
    status: "prototype",
    summary: "允许手机或浏览器远程控制 Claude Code，同时保留审批链。",
    whyItMatters: "它表明 Claude Code 的边界不是终端，而是未来可能跨端接入的工作代理。",
    howToRead: "把它当成 session transport layer，而不是单纯移动端壳子。",
    evidence: "Claude Code Folding /天机 /Bridge",
    metaphorLabel: "跨端桥",
    clue: "公开线索明确写到 phone/browser remote session 与 approvals。",
    impact: "真正的‘随处接管工作代理’会由这条线开启。",
  },
  {
    id: "daemon",
    titleZh: "Daemon Mode",
    titleEn: "Background Session Runtime",
    status: "commented-out",
    summary: "通过 `--bg` 把会话挂到后台运行，底层线索指向 `tmux`。",
    whyItMatters: "它把代理从前台对话者推进到后台工人。",
    howToRead: "重点不是后台命令本身，而是会话脱离前台后的运行姿态。",
    evidence: "Claude Code Folding /天机 /Daemon Mode",
    metaphorLabel: "守夜后台",
    clue: "原站直接点出 `--bg` 形态和 `tmux` 方向。",
    impact: "长任务、批处理和监控型工作会彻底改变使用习惯。",
  },
  {
    id: "uds",
    titleZh: "UDS Inbox",
    titleEn: "Session-to-Session Channel",
    status: "prototype",
    summary: "不同 session 通过 Unix domain sockets 互相通信，是多会话协作的底层通道。",
    whyItMatters: "它说明多代理和跨窗口通信不是拼出来的，而是有基础设施支撑。",
    howToRead: "这是 transport primitive，不是前台 feature。",
    evidence: "Claude Code Folding /天机 /UDS Inbox",
    metaphorLabel: "会话暗匣",
    clue: "公开描述直接指出 sessions talk over Unix domain sockets。",
    impact: "后台 worker、桥接端和协作代理都会依赖这类底层通道。",
  },
  {
    id: "autodream",
    titleZh: "Auto-Dream",
    titleEn: "Inter-session Reflection",
    status: "env-gated",
    summary: "在会话之间回看发生过什么，并自动整理学到的东西。",
    whyItMatters: "它非常接近长期工作记忆的雏形。",
    howToRead: "把它理解成 session-to-session reflection，而不是即时响应功能。",
    evidence: "Claude Code Folding /天机 /Auto-Dream",
    metaphorLabel: "夜梦归档",
    clue: "公开线索强调 between sessions 与 organize what it learned。",
    impact: "一旦成熟，Claude Code 会越来越像能持续积累经验的代理系统。",
  },
];
