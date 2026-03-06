const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 从 ClawHub 爬取的真实 skills 数据
const skills = [
  // Highlighted Skills
  {
    name: "Trello",
    slug: "trello",
    description: "Manage Trello boards, lists, and cards via the Trello REST API.",
    sourceUrl: "https://clawhub.com/kn70pywhg0fyz996kpa8xj89s57yhv26/trello",
    author: "@steipete",
    category: "productivity",
    tags: ["trello", "project-management", "api"],
    downloads: 19500,
    rating: 4.6,
    featured: true,
    content: `Trello skill allows you to manage Trello boards, lists, and cards via the Trello REST API.

## 功能

- 创建、更新、删除看板
- 管理列表和卡片
- 移动卡片
- 添加成员和标签
- 查看项目和进度`,
  },
  {
    name: "Slack",
    slug: "slack",
    description: "Use when you need to control Slack from Clawdbot via the slack tool, including reacting to messages or pinning/unpinning items in Slack channels or DMs.",
    sourceUrl: "https://clawhub.com/kn70pywhg0fyz996kpa8xj89s57yhv26/slack",
    author: "@steipete",
    category: "productivity",
    tags: ["slack", "communication", "messaging"],
    downloads: 22000,
    rating: 4.7,
    featured: true,
    content: `Slack skill enables you to control Slack from your AI agent.

## 功能

- 发送消息到频道或私聊
- 回复和反应消息
- 置顶/取消置顶消息
- 管理频道
- 搜索消息和文件`,
  },
  {
    name: "Caldav Calendar",
    slug: "caldav-calendar",
    description: "Sync and query CalDAV calendars (iCloud, Google, Fastmail, Nextcloud, etc.) using vdirsyncer + khal. Works on Linux.",
    sourceUrl: "https://clawhub.com/kn7bxdhae07mn5rkhw363hyen17ymt5m/caldav-calendar",
    author: "@Asleep123",
    category: "productivity",
    tags: ["calendar", "caldav", "sync"],
    downloads: 16600,
    rating: 4.8,
    featured: true,
    content: `CalDAV Calendar skill syncs and queries calendars from various providers.

## 支持的平台

- iCloud Calendar
- Google Calendar
- Fastmail
- Nextcloud
- 其他 CalDAV 兼容服务

## 功能

- 同步日历事件
- 查询日程
- 创建和管理事件
- 多日历支持`,
  },
  {
    name: "Answer Overflow",
    slug: "answer-overflow",
    description: "Search indexed Discord community discussions via Answer Overflow. Find solutions to coding problems, library issues, and community Q&A that only exist in Discord conversations.",
    sourceUrl: "https://clawhub.com/kn7ehk5erw07et6p0vq4k451ws802vgd/answeroverflow",
    author: "@RhysSullivan",
    category: "research",
    tags: ["discord", "search", "community", "qna"],
    downloads: 9700,
    rating: 4.5,
    featured: true,
    content: `Answer Overflow skill searches indexed Discord community discussions.

## 用途

- 查找编程问题的解决方案
- 搜索库和框架的使用问题
- 发现社区讨论和最佳实践
- 获取 Discord 上的独特内容`,
  },

  // Popular Skills
  {
    name: "Self-Improving Agent",
    slug: "self-improving-agent",
    description: "Captures learnings, errors, and corrections to enable continuous improvement. Use when: (1) A command or operation fails unexpectedly, (2) User corrects Claude's output, (3) Claude realizes it made a mistake.",
    sourceUrl: "https://clawhub.com/kn70cjr952qdec1nx70zs6wefn7ynq2t/self-improving-agent",
    author: "@pskoett",
    category: "automation",
    tags: ["learning", "improvement", "self-correction"],
    downloads: 120000,
    rating: 4.9,
    featured: true,
    content: `Self-Improving Agent enables AI agents to learn from mistakes and continuously improve.

## 核心功能

- 捕获错误和纠正
- 学习用户反馈
- 建立知识库
- 避免重复错误
- 持续优化行为

## 使用场景

1. 命令执行失败时
2. 用户纠正 AI 输出时
3. AI 意识到错误时`,
  },
  {
    name: "Tavily Web Search",
    slug: "tavily-web-search",
    description: "AI-optimized web search via Tavily API. Returns concise, relevant results for AI agents.",
    sourceUrl: "https://clawhub.com/kn7azq5e6sw0fbwwzdpcwvvjzd7z0x4z/tavily-search",
    author: "@arun-8687",
    category: "research",
    tags: ["search", "web", "api"],
    downloads: 101000,
    rating: 4.7,
    featured: true,
    content: `Tavily Web Search provides AI-optimized web search results.

## 特点

- 专为 AI 优化的搜索结果
- 返回简洁相关的内容
- 支持多种搜索类型
- API 密钥需要配置

## 使用

调用 Tavily API 进行网络搜索，获取针对 AI 优化的结果。`,
  },
  {
    name: "Find Skills",
    slug: "find-skills",
    description: "Helps users discover and install agent skills when they ask questions like \"how do I do X\", \"find a skill for X\", \"is there a skill that can...\", or express interest in extending capabilities.",
    sourceUrl: "https://clawhub.com/kn77ajmmqw3cgnc3ay1x3e0ccd805hsw/find-skills",
    author: "@JimLiuxinghai",
    category: "automation",
    tags: ["skills", "discovery", "installation"],
    downloads: 98100,
    rating: 4.6,
    featured: true,
    content: `Find Skills 帮助用户发现和安装 agent skills。

## 触发场景

- "how do I do X"
- "find a skill for X"
- "is there a skill that can..."
- 用户想要扩展 AI 能力时

## 功能

- 搜索可用 skills
- 推荐 skills
- 安装 skills`,
  },
  {
    name: "Gog",
    slug: "gog",
    description: "Google Workspace CLI for Gmail, Calendar, Drive, Contacts, Sheets, and Docs.",
    sourceUrl: "https://clawhub.com/kn70pywhg0fyz996kpa8xj89s57yhv26/gog",
    author: "@steipete",
    category: "productivity",
    tags: ["google", "gmail", "drive", "calendar"],
    downloads: 86100,
    rating: 4.8,
    featured: true,
    content: `Gog 是 Google Workspace 的命令行工具。

## 支持的服务

- **Gmail**: 发送、搜索、管理邮件
- **Calendar**: 创建事件、查看日程
- **Drive**: 上传、下载、管理文件
- **Contacts**: 管理联系人
- **Sheets**: 读写电子表格
- **Docs**: 创建和管理文档`,
  },
  {
    name: "Summarize",
    slug: "summarize",
    description: "Summarize URLs or files with the summarize CLI (web, PDFs, images, audio, YouTube).",
    sourceUrl: "https://clawhub.com/kn70pywhg0fyz996kpa8xj89s57yhv26/summarize",
    author: "@steipete",
    category: "productivity",
    tags: ["summarize", "pdf", "web", "audio"],
    downloads: 81900,
    rating: 4.5,
    content: `Summarize skill 提供内容摘要功能。

## 支持的类型

- 网页 URL
- PDF 文件
- 图片
- 音频文件
- YouTube 视频

## 使用

提供 URL 或文件路径，自动生成内容摘要。`,
  },
  {
    name: "Github",
    slug: "github",
    description: "Interact with GitHub using the `gh` CLI. Use `gh issue`, `gh pr`, `gh run`, and `gh api` for issues, PRs, CI runs, and advanced queries.",
    sourceUrl: "https://clawhub.com/kn70pywhg0fyz996kpa8xj89s57yhv26/github",
    author: "@steipete",
    category: "coding",
    tags: ["github", "git", "ci-cd", "api"],
    downloads: 72000,
    rating: 4.7,
    content: `Github skill 通过 gh CLI 与 GitHub 交互。

## 功能

- **Issues**: 创建、查看、管理 issues
- **Pull Requests**: 创建、审查、合并 PRs
- **CI Runs**: 查看 CI 状态和日志
- **API**: 高级 API 查询

## 命令示例

\`\`\`bash
gh issue list
gh pr create
gh run watch
gh api repos/:owner/:repo
\`\`\``,
  },
  {
    name: "Weather",
    slug: "weather",
    description: "Get current weather and forecasts (no API key required).",
    sourceUrl: "https://clawhub.com/kn70pywhg0fyz996kpa8xj89s57yhv26/weather",
    author: "@steipete",
    category: "productivity",
    tags: ["weather", "forecast"],
    downloads: 61500,
    rating: 4.4,
    content: `Weather skill 获取天气信息，无需 API 密钥。

## 功能

- 当前天气
- 天气预报
- 多城市支持
- 温度、湿度、风速等详细信息`,
  },
  {
    name: "Proactive Agent",
    slug: "proactive-agent",
    description: "Transform AI agents from task-followers into proactive partners that anticipate needs and continuously improve. Now with WAL Protocol, Working Buffer, Autonomous Crons, and battle-tested patterns.",
    sourceUrl: "https://clawhub.com/kn7agvhxan0vcwfmhrjhwg4n9s802d7k/proactive-agent",
    author: "@halthelobster",
    category: "automation",
    tags: ["proactive", "autonomous", "cron"],
    downloads: 59700,
    rating: 4.8,
    featured: true,
    content: `Proactive Agent 将 AI 代理从任务执行者转变为主动合作伙伴。

## 核心功能

- **WAL Protocol**: 写入前日志协议
- **Working Buffer**: 工作缓冲区
- **Autonomous Crons**: 自主定时任务
- **持续改进模式**

## 特点

- 预测用户需求
- 主动提供建议
- 自动化工作流
- 经实战测试的模式`,
  },
  {
    name: "Sonoscli",
    slug: "sonoscli",
    description: "Control Sonos speakers (discover/status/play/volume/group).",
    sourceUrl: "https://clawhub.com/kn70pywhg0fyz996kpa8xj89s57yhv26/sonoscli",
    author: "@steipete",
    category: "automation",
    tags: ["sonos", "audio", "smart-home"],
    downloads: 48100,
    rating: 4.3,
    content: `Sonoscli 控制 Sonos 音箱系统。

## 功能

- 发现音箱设备
- 查看播放状态
- 控制播放/暂停
- 调节音量
- 音箱分组管理`,
  },
  {
    name: "Notion",
    slug: "notion",
    description: "Notion API for creating and managing pages, databases, and blocks.",
    sourceUrl: "https://clawhub.com/kn70pywhg0fyz996kpa8xj89s57yhv26/notion",
    author: "@steipete",
    category: "productivity",
    tags: ["notion", "notes", "database", "api"],
    downloads: 41400,
    rating: 4.6,
    content: `Notion skill 通过 API 管理 Notion 内容。

## 功能

- 创建和编辑页面
- 管理数据库
- 操作内容块
- 搜索内容
- 添加评论`,
  },
  {
    name: "Nano PDF",
    slug: "nano-pdf",
    description: "Edit PDFs with natural-language instructions using the nano-pdf CLI.",
    sourceUrl: "https://clawhub.com/kn70pywhg0fyz996kpa8xj89s57yhv26/nano-pdf",
    author: "@steipete",
    category: "productivity",
    tags: ["pdf", "edit", "natural-language"],
    downloads: 38800,
    rating: 4.5,
    content: `Nano PDF 使用自然语言指令编辑 PDF 文件。

## 功能

- 自然语言编辑指令
- 合并 PDF
- 提取页面
- 添加注释
- 格式转换`,
  },
  {
    name: "BluOS CLI",
    slug: "bluos-cli",
    description: "BluOS CLI for discovery, playback, grouping, and volume control of BluOS devices.",
    sourceUrl: "https://clawhub.com/kn70pywhg0fyz996kpa8xj89s57yhv26/bluos",
    author: "@steipete",
    category: "automation",
    tags: ["bluos", "audio", "streaming"],
    downloads: 25000,
    rating: 4.2,
    content: `BluOS CLI 控制 BluOS 音频设备。

## 功能

- 发现 BluOS 设备
- 播放控制
- 音量调节
- 设备分组
- 播放列表管理`,
  },
  {
    name: "Himalaya",
    slug: "himalaya",
    description: "CLI to manage emails via IMAP/SMTP. List, read, write, reply, forward, search, and organize emails.",
    sourceUrl: "https://clawhub.com/kn70pywhg0fyz996kpa8xj89s57yhv26/himalaya",
    author: "@steipete",
    category: "productivity",
    tags: ["email", "imap", "smtp"],
    downloads: 32000,
    rating: 4.4,
    content: `Himalaya 是命令行邮件管理工具。

## 功能

- 列出邮件
- 读取邮件
- 撰写和发送
- 回复和转发
- 搜索邮件
- 组织文件夹`,
  },
  {
    name: "1Password",
    slug: "1password",
    description: "Set up and use 1Password CLI (op). Use for installing the CLI, enabling desktop app integration, signing in, or reading/injecting/running secrets.",
    sourceUrl: "https://clawhub.com/kn70pywhg0fyz996kpa8xj89s57yhv26/1password",
    author: "@steipete",
    category: "productivity",
    tags: ["security", "passwords", "secrets", "cli"],
    downloads: 28000,
    rating: 4.7,
    content: `1Password skill 设置和使用 1Password CLI。

## 功能

- 安装 op CLI
- 桌面应用集成
- 登录管理
- 读取密钥
- 注入密钥到环境

## 安全

- 安全存储密码
- 双因素认证
- 团队共享`,
  },
  {
    name: "Things Mac",
    slug: "things-mac",
    description: "Manage Things 3 via the things CLI on macOS. Add/update projects and todos via URL scheme; read/search/list from the local Things database.",
    sourceUrl: "https://clawhub.com/kn70pywhg0fyz996kpa8xj89s57yhv26/things-mac",
    author: "@steipete",
    category: "productivity",
    tags: ["things", "todos", "macos", "productivity"],
    downloads: 22000,
    rating: 4.5,
    content: `Things Mac skill 管理 Things 3 任务管理应用。

## 功能

- 添加任务和项目
- 更新任务状态
- 搜索任务
- 列出今日/收件箱
- 查看项目

## 平台

仅支持 macOS`,
  },
];

async function main() {
  console.log('开始同步真实的 Agent Skills (来自 ClawHub)...');
  
  // 先清除旧数据
  await prisma.agentSkill.deleteMany({});
  console.log('已清除旧数据');
  
  for (const skill of skills) {
    await prisma.agentSkill.create({
      data: {
        ...skill,
        tags: skill.tags,
        published: true,
      },
    });
    console.log(`已添加: ${skill.name} (${skill.downloads.toLocaleString()} 下载)`);
  }
  
  const total = await prisma.agentSkill.count();
  const totalDownloads = await prisma.agentSkill.aggregate({
    _sum: { downloads: true },
  });
  
  console.log(`\n✅ Skills 总数: ${total}`);
  console.log(`✅ 总下载量: ${totalDownloads._sum.downloads?.toLocaleString()}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());