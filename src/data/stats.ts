export type SectionLink = {
  id: string;
  label: string;
  short: string;
};

export type AnalysisPanelLink = {
  id: "architecture" | "tools" | "commands" | "hidden";
  labelZh: string;
  labelEn: string;
  short: string;
  summary: string;
};

export const sectionLinks: SectionLink[] = [
  { id: "hero", label: "开场", short: "00" },
  { id: "agent-loop", label: "执行链", short: "01" },
  { id: "architecture", label: "架构", short: "02" },
  { id: "tools", label: "工具", short: "03" },
  { id: "commands", label: "命令", short: "04" },
  { id: "hidden", label: "未发布", short: "05" },
  { id: "footer", label: "附注", short: "06" },
];

export const analysisPanels: AnalysisPanelLink[] = [
  {
    id: "architecture",
    labelZh: "架构层级",
    labelEn: "structure",
    short: "架",
    summary: "把代码库拆成职责层、连接关系和执行路径。",
  },
  {
    id: "tools",
    labelZh: "工具权限",
    labelEn: "tools",
    short: "工",
    summary: "按能力和权限查看 50+ 工具如何被编进代理。",
  },
  {
    id: "commands",
    labelZh: "命令入口",
    labelEn: "commands",
    short: "命",
    summary: "把斜杠命令当作真正的用户操作面来检索。",
  },
  {
    id: "hidden",
    labelZh: "隐藏线索",
    labelEn: "hidden",
    short: "隐",
    summary: "查看未公开能力的线索、状态和影响面。",
  },
];

export const heroSignals = [
  "51万行源码",
  "50+ 工具",
  "95 条命令",
  "8 个未发布能力",
];
