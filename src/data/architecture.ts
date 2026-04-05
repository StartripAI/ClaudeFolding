export type ArchitectureNode = {
  id: string;
  group: "surface" | "control" | "runtime" | "ux";
  titleZh: string;
  titleEn: string;
  summary: string;
  whyItMatters: string;
  howToRead: string;
  evidence: string;
  metaphorLabel?: string;
  x: number;
  y: number;
  connections: string[];
};

export type ArchitectureFlow = {
  id: string;
  title: string;
  summary: string;
  nodes: string[];
};

export const architectureNodes: ArchitectureNode[] = [
  {
    id: "command-router",
    group: "surface",
    titleZh: "命令与入口路由",
    titleEn: "Command Router",
    summary: "把 slash commands、自然语言输入和模式切换导入统一工作流。",
    whyItMatters: "用户看到的是几条命令，系统看到的是一层显式的操作语法。",
    howToRead: "这是最靠近操作员的一层，负责决定‘你到底发出了什么动作’。",
    evidence: "Claude Code Folding /架构 /Tools & Commands",
    metaphorLabel: "诏令入口",
    x: 10,
    y: 22,
    connections: ["tool-registry", "conversation-state"],
  },
  {
    id: "tool-registry",
    group: "surface",
    titleZh: "工具注册与权限门",
    titleEn: "Tool Registry + Permission Gate",
    summary: "描述可用工具、参数形状、可见性和授权边界。",
    whyItMatters: "没有这层，模型就无法从“会建议”变成“会安全执行”。",
    howToRead: "把它视为 Claude Code 的 capability contract，而不是简单工具列表。",
    evidence: "Claude Code Folding /架构 /Tools & Commands",
    metaphorLabel: "虎符校验",
    x: 33,
    y: 12,
    connections: ["sampling-loop", "runtime-environment"],
  },
  {
    id: "conversation-state",
    group: "control",
    titleZh: "会话案卷与上下文",
    titleEn: "Conversation State",
    summary: "保存消息历史、任务状态和下一轮继续执行所需的上下文。",
    whyItMatters: "所谓长期任务连续性，本质上靠的是这层的持续归档和重建。",
    howToRead: "它是历史层，不只是聊天记录；计划、工具结果和状态切换都会累进到这里。",
    evidence: "Claude Code Folding /架构 /Core Processing",
    metaphorLabel: "入档归案",
    x: 34,
    y: 44,
    connections: ["prompt-assembler", "response-renderer"],
  },
  {
    id: "prompt-assembler",
    group: "control",
    titleZh: "系统指令拼装器",
    titleEn: "Prompt Assembler",
    summary: "把系统规则、工具清单、环境信息和用户消息拼成真正发往模型的上下文包。",
    whyItMatters: "Claude Code 的制度感和边界感，很多都是在这里被塑出来的。",
    howToRead: "重点看规则是如何被放进上下文，而不是只看用户输入本身。",
    evidence: "Claude Code Folding /架构 /Core Processing",
    metaphorLabel: "拼装上谕",
    x: 56,
    y: 28,
    connections: ["sampling-loop", "runtime-environment"],
  },
  {
    id: "sampling-loop",
    group: "control",
    titleZh: "采样与工具循环",
    titleEn: "Sampling Loop",
    summary: "负责流式采样、token 解析、tool detection 和 act-observe 闭环。",
    whyItMatters: "这是代理与聊天模型真正分家的核心节点。",
    howToRead: "若要理解 Agent Loop，就盯住这一层怎么在‘想、调、读、再想’之间转动。",
    evidence: "Claude Code Folding /架构 /Core Processing",
    metaphorLabel: "轮转执令",
    x: 58,
    y: 58,
    connections: ["response-renderer", "remote-bridge"],
  },
  {
    id: "runtime-environment",
    group: "runtime",
    titleZh: "运行环境与后勤",
    titleEn: "Runtime Environment",
    summary: "承接 cwd、shell、平台、认证、权限模式和远端上下文。",
    whyItMatters: "代理不是抽象思考器，它每一步都踩在真实系统环境上。",
    howToRead: "把它当作后勤层；平时不显眼，但任何一项出错都能让前面全部失灵。",
    evidence: "Claude Code Folding /架构 /Infrastructure",
    metaphorLabel: "工部后勤",
    x: 81,
    y: 28,
    connections: ["remote-bridge", "response-renderer"],
  },
  {
    id: "response-renderer",
    group: "ux",
    titleZh: "终端渲染与视图层",
    titleEn: "Response Renderer",
    summary: "把流式输出、工具状态和计划信息翻成操作员看得懂的界面。",
    whyItMatters: "体验感不来自“更会说”，而来自这层把复杂状态解释清楚。",
    howToRead: "它是解释层而不是装饰层，负责把系统内部状态变成人类可扫读的反馈。",
    evidence: "Claude Code Folding /架构 /UI Layer",
    metaphorLabel: "殿前陈设",
    x: 81,
    y: 62,
    connections: ["remote-bridge"],
  },
  {
    id: "remote-bridge",
    group: "runtime",
    titleZh: "桥接与多端能力",
    titleEn: "Remote Bridge",
    summary: "把会话从单一 CLI 拉向远端会话、桥接端和未来多端控制。",
    whyItMatters: "它暴露出产品路线不止是本地编码助手，而是更广义的工作代理。",
    howToRead: "把它当成 platform hint：未来能力线索往往先从这里露头。",
    evidence: "Claude Code Folding /架构 /Infrastructure",
    metaphorLabel: "跨端桥",
    x: 92,
    y: 48,
    connections: [],
  },
];

export const architectureFlows: ArchitectureFlow[] = [
  {
    id: "structure",
    title: "Structure Map",
    summary: "按职责看：入口、制度、状态、采样、后勤、渲染是如何分层的。",
    nodes: architectureNodes.map((node) => node.id),
  },
  {
    id: "execution",
    title: "Execution Path",
    summary: "按执行顺序看：从命令进入到 UI 渲染，中间经过哪些层。",
    nodes: [
      "command-router",
      "conversation-state",
      "prompt-assembler",
      "sampling-loop",
      "tool-registry",
      "runtime-environment",
      "response-renderer",
      "remote-bridge",
    ],
  },
];
