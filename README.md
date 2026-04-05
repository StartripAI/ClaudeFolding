# Claude Code Folding

> 52 万行源码，五层折叠。  
> 把 Claude Code 从“会聊天的黑箱”拆回一台可以读、可以查、可以验证的源码系统。

<p align="center">
  <a href="https://copilotinvoice.com"><strong>Live Site</strong></a>
  ·
  <a href="https://github.com/StartripAI/ClaudeFolding"><strong>GitHub</strong></a>
</p>

<p align="center">
  <img src="./docs/repo-cover.png" alt="Claude Code Folding cover" width="100%" />
</p>

## 中文介绍

**Claude Code Folding** 是一个把 Claude Code 公开可见源码线索重新整理成可视化解剖站的项目。  
它不是“泄露文件镜像站”，也不是“神秘功能八卦帖”，而是一个尽量把结构、执行链、工具权限、命令系统和未发布能力讲清楚的 **clean-room explainer**。

这个项目想解决的事情很简单：

- Claude Code 到底不是一个普通聊天框，而是一条怎样的执行闭环
- 工具系统、权限门、命令面和架构层是怎么互相咬合的
- 哪些能力已经公开，哪些能力还只停留在线索、门控或灰度状态
- 复杂源码信息，能不能被重组成人类一眼能扫懂的网页体验

你会在站里看到：

- **11 步执行链**：一条指令从进入 CLI 到完成回显，中间到底经过了什么
- **架构折叠图**：核心模块如何分层、分工、互相调用
- **工具权限层**：25+ 工具不是名单，而是一个带门控和边界的系统
- **命令簿**：95 条命令如何构成显式操作面
- **未发布能力线索**：从公开线索中提炼的 hidden / gated / experimental 能力图谱

## English

**Claude Code Folding** is an unofficial clean-room explainer that turns publicly available Claude Code source signals into a visual, bilingual architecture walkthrough.

This repo is not a mirror of leaked files, and it is not trying to impersonate official documentation.  
It is a curated reading interface for understanding:

- how the execution loop works end to end
- how tools, permission gates, commands, and architecture layers fit together
- which capabilities look public, gated, experimental, or inferred
- how a large and messy codebase can be folded into something readable

The site focuses on:

- **Execution flow** instead of vague product copy
- **Architecture mapping** instead of random screenshots
- **Tooling and permissions** as a system, not a list
- **Commands as interface surface**, not hidden shortcuts
- **Hidden capability signals** with clear caveats

## Why This Exists

There are already plenty of threads, clips, and “look what leaked” posts.

What was missing was a version that feels:

- readable
- navigable
- visually memorable
- explicit about what is known vs inferred

So this project rebuilds that material as a web-native explainer with stronger narrative, stronger information design, and cleaner public-facing caveats.

## Project Links

- Site: [copilotinvoice.com](https://copilotinvoice.com)
- Repository: [StartripAI/ClaudeFolding](https://github.com/StartripAI/ClaudeFolding)

## Stack

- Next.js 16
- React 19
- TypeScript
- Framer Motion
- Recharts

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Disclaimer

**Unofficial. Not affiliated with Anthropic.**

Based on publicly available source code, so some things might be wrong or outdated.  
Curation assisted by AI in a clean-room workflow.

This repo may include inference, compression, interpretation, and editorial restructuring.  
Treat it as a public-facing explainer, not as official documentation and not as a verbatim source mirror.

## References

- [ccunpacked.dev](https://ccunpacked.dev)
- [DeepWiki / anthropics/claude-code](https://deepwiki.com/anthropics/claude-code)
