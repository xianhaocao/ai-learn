const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const skills = [
  // 编程开发
  {
    name: "Code Reviewer",
    slug: "code-reviewer",
    description: "智能代码审查助手，自动检测代码问题、安全漏洞和优化建议。",
    author: "OpenClaw",
    category: "coding",
    tags: ["代码审查", "安全", "优化"],
    downloads: 125000,
    rating: 4.9,
    featured: true,
    content: `Code Reviewer 是一个专业的代码审查 AI 助手，能够帮助你：

- **自动检测代码问题**：识别潜在的 bug、性能问题和代码异味
- **安全漏洞扫描**：检测常见的安全漏洞如 SQL 注入、XSS 等
- **代码优化建议**：提供代码重构和性能优化建议
- **最佳实践检查**：确保代码符合行业最佳实践

支持多种编程语言，包括 JavaScript、TypeScript、Python、Java、Go 等。`,
    features: `- 多语言支持：JavaScript, TypeScript, Python, Java, Go, Rust 等
- 实时分析：提交代码时自动触发审查
- 详细报告：生成清晰的审查报告，包含问题描述和修复建议
- 自定义规则：支持配置团队特定的代码规范
- CI/CD 集成：轻松集成到现有开发流程`,
    usage: `1. 在项目中安装 Code Reviewer skill
2. 配置审查规则和偏好设置
3. 提交代码或创建 PR 时自动触发
4. 查看审查报告并根据建议修改代码`,
    requirements: `- 需要 AI 模型支持（推荐 GPT-4 或 Claude）
- 代码仓库访问权限
- 建议配置 Git Hooks 实现自动触发`,
  },
  {
    name: "Git Expert",
    slug: "git-expert",
    description: "Git 命令和最佳实践专家，解决各种版本控制问题。",
    author: "DevTools",
    category: "coding",
    tags: ["Git", "版本控制"],
    downloads: 98000,
    rating: 4.7,
    featured: true,
    content: `Git Expert 是你的 Git 版本控制专家助手。无论是解决合并冲突、回滚代码，还是理解复杂的 Git 命令，Git Expert 都能提供清晰、准确的指导。`,
    features: `- Git 命令解释和示例
- 冲突解决策略指导
- 分支管理最佳实践
- 历史记录查询和分析
- Git 工作流建议`,
    usage: `直接向 Git Expert 描述你的问题，它会提供详细的解决方案和命令示例。`,
  },
  {
    name: "API Designer",
    slug: "api-designer",
    description: "设计和文档化 RESTful API，生成 OpenAPI 规范。",
    author: "APIHub",
    category: "coding",
    tags: ["API", "OpenAPI", "文档"],
    downloads: 76000,
    rating: 4.6,
    content: `API Designer 帮助你设计规范、文档完善的 RESTful API。只需描述你的需求，它会生成完整的 API 设计和 OpenAPI 文档。`,
    features: `- RESTful API 设计建议
- OpenAPI 3.0 规范生成
- 请求/响应示例生成
- API 命名规范检查
- 版本管理建议`,
    usage: `描述你的 API 需求，API Designer 会生成完整的 API 设计文档。`,
  },
  {
    name: "Test Generator",
    slug: "test-generator",
    description: "自动生成单元测试和集成测试代码。",
    author: "QA Labs",
    category: "coding",
    tags: ["测试", "自动化"],
    downloads: 65000,
    rating: 4.5,
    content: `Test Generator 能够根据你的代码自动生成高质量的测试用例，提高代码覆盖率和测试效率。`,
    features: `- 单元测试生成
- 集成测试生成
- 边界条件检测
- Mock 数据生成
- 多框架支持：Jest, PyTest, JUnit 等`,
  },
  {
    name: "Database Architect",
    slug: "database-architect",
    description: "数据库设计优化专家，SQL 查询优化建议。",
    author: "DataPro",
    category: "coding",
    tags: ["数据库", "SQL", "优化"],
    downloads: 54000,
    rating: 4.6,
    content: `Database Architect 是数据库设计和优化专家，帮助你设计高效的数据库结构，优化 SQL 查询性能。`,
    features: `- 数据库模式设计
- 索引优化建议
- SQL 查询分析和优化
- 数据迁移方案
- 多数据库支持：PostgreSQL, MySQL, MongoDB 等`,
  },

  // 效率提升
  {
    name: "Meeting Summarizer",
    slug: "meeting-summarizer",
    description: "会议记录摘要助手，自动提取关键信息和行动项。",
    author: "ProductivityAI",
    category: "productivity",
    tags: ["会议", "摘要", "笔记"],
    downloads: 156000,
    rating: 4.8,
    featured: true,
    content: `Meeting Summarizer 自动将会议录音或笔记转化为结构化摘要，提取关键决策、行动项和责任人。`,
    features: `- 会议录音转录和摘要
- 自动提取关键决策
- 行动项和责任人识别
- 多语言支持
- 与主流会议工具集成`,
    usage: `上传会议录音或粘贴会议笔记，Meeting Summarizer 会自动生成结构化摘要。`,
  },
  {
    name: "Email Writer",
    slug: "email-writer",
    description: "专业邮件撰写助手，支持多种场景和语言风格。",
    author: "CommTools",
    category: "productivity",
    tags: ["邮件", "写作", "沟通"],
    downloads: 142000,
    rating: 4.7,
    featured: true,
    content: `Email Writer 帮助你快速撰写专业、得体的邮件。无论是商务沟通、求职申请还是日常回复，都能生成符合场景的邮件内容。`,
    features: `- 多场景模板：商务、求职、投诉、感谢等
- 语言风格调整：正式、友好、简洁等
- 多语言支持
- 邮件回复建议
- 语气检查和优化`,
  },
  {
    name: "Task Manager",
    slug: "task-manager",
    description: "智能任务管理，自动分类、优先级排序和提醒。",
    author: "TaskAI",
    category: "productivity",
    tags: ["任务", "时间管理"],
    downloads: 89000,
    rating: 4.6,
    content: `Task Manager 是一个智能任务管理助手，帮助你高效管理待办事项，自动分类和排序任务优先级。`,
    features: `- 智能任务分类
- 优先级自动排序
- 截止日期提醒
- 任务依赖分析
- 日报/周报生成`,
  },
  {
    name: "Document Formatter",
    slug: "document-formatter",
    description: "文档格式化和美化，支持多种文档类型。",
    author: "DocTools",
    category: "productivity",
    tags: ["文档", "格式化"],
    downloads: 67000,
    rating: 4.4,
    content: `Document Formatter 帮助你快速格式化各类文档，使其更加专业和易读。`,
    features: `- Markdown 格式化
- 代码块美化
- 表格格式化
- 标题层级优化
- 列表格式统一`,
  },
  {
    name: "Translation Pro",
    slug: "translation-pro",
    description: "专业翻译助手，支持 50+ 语言，保持上下文一致性。",
    author: "LangAI",
    category: "productivity",
    tags: ["翻译", "多语言"],
    downloads: 178000,
    rating: 4.9,
    featured: true,
    content: `Translation Pro 是一款专业的 AI 翻译助手，支持 50+ 语言互译，能够理解上下文并保持专业术语的一致性。`,
    features: `- 支持 50+ 语言
- 上下文感知翻译
- 专业术语一致性
- 文档级翻译记忆
- 实时翻译模式`,
    usage: `粘贴需要翻译的文本，选择目标语言，Translation Pro 会生成高质量的翻译结果。`,
  },

  // 自动化
  {
    name: "Web Scraper",
    slug: "web-scraper",
    description: "智能网页数据抓取，支持复杂页面结构。",
    author: "DataMine",
    category: "automation",
    tags: ["爬虫", "数据提取"],
    downloads: 134000,
    rating: 4.7,
    featured: true,
    content: `Web Scraper 是一个智能网页数据抓取工具，能够自动识别网页结构并提取所需数据。`,
    features: `- 自动识别网页结构
- 支持动态加载内容
- 分页自动抓取
- 数据清洗和格式化
- 导出多种格式：JSON, CSV, Excel`,
    usage: `提供目标网页 URL 和需要提取的数据描述，Web Scraper 会自动完成数据抓取。`,
    requirements: `- 需要遵守目标网站的 robots.txt
- 建议添加请求间隔避免被封禁
- 部分网站可能需要代理支持`,
  },
  {
    name: "File Organizer",
    slug: "file-organizer",
    description: "自动文件分类和整理，保持工作区整洁。",
    author: "OrgTools",
    category: "automation",
    tags: ["文件管理", "自动化"],
    downloads: 45000,
    rating: 4.3,
    content: `File Organizer 自动根据文件类型、日期和内容对文件进行分类整理，让你的工作区始终保持整洁。`,
    features: `- 智能文件分类
- 自定义整理规则
- 重复文件检测
- 批量重命名
- 文件夹结构优化`,
  },
  {
    name: "Schedule Automator",
    slug: "schedule-automator",
    description: "日程自动化管理，智能安排会议和提醒。",
    author: "TimeWise",
    category: "automation",
    tags: ["日程", "自动化"],
    downloads: 56000,
    rating: 4.5,
    content: `Schedule Automator 帮助你智能管理日程，自动安排会议时间，发送提醒和准备通知。`,
    features: `- 智能会议时间安排
- 日历冲突检测
- 自动发送邀请和提醒
- 会议准备通知
- 与主流日历集成`,
  },
  {
    name: "Report Generator",
    slug: "report-generator",
    description: "自动生成各类报告，支持自定义模板。",
    author: "ReportAI",
    category: "automation",
    tags: ["报告", "自动化", "模板"],
    downloads: 78000,
    rating: 4.6,
    content: `Report Generator 根据数据自动生成各类报告，支持自定义模板和多种输出格式。`,
    features: `- 数据可视化
- 自定义模板
- 多种输出格式：PDF, Word, HTML
- 定时自动生成
- 数据源集成`,
  },
  {
    name: "Notification Hub",
    slug: "notification-hub",
    description: "智能通知聚合和管理，跨平台消息整合。",
    author: "NotifyPro",
    category: "automation",
    tags: ["通知", "消息"],
    downloads: 34000,
    rating: 4.2,
    content: `Notification Hub 聚合来自不同平台的通知，智能过滤和优先级排序，让你不错过重要消息。`,
    features: `- 多平台通知聚合
- 智能过滤和分类
- 优先级排序
- 免打扰模式
- 通知摘要`,
  },

  // 研究分析
  {
    name: "Research Assistant",
    slug: "research-assistant",
    description: "学术研究助手，文献搜索和摘要生成。",
    author: "ScholarAI",
    category: "research",
    tags: ["研究", "学术", "文献"],
    downloads: 92000,
    rating: 4.8,
    featured: true,
    content: `Research Assistant 是学术研究的得力助手，帮助你快速搜索文献、生成摘要和管理参考文献。`,
    features: `- 学术文献搜索
- 论文摘要生成
- 参考文献格式化
- 引用关系分析
- 研究趋势追踪`,
    usage: `输入研究主题或关键词，Research Assistant 会搜索相关文献并生成摘要和分析报告。`,
    requirements: `- 部分数据库需要机构访问权限
- 建议配合文献管理软件使用`,
  },
  {
    name: "Data Analyzer",
    slug: "data-analyzer",
    description: "数据分析助手，自动生成洞察和可视化建议。",
    author: "DataInsight",
    category: "research",
    tags: ["数据分析", "可视化"],
    downloads: 87000,
    rating: 4.7,
    content: `Data Analyzer 自动分析数据集，发现模式和异常，生成洞察报告和可视化建议。`,
    features: `- 自动数据探索
- 统计分析
- 异常检测
- 可视化建议
- 分析报告生成`,
  },
  {
    name: "Competitor Monitor",
    slug: "competitor-monitor",
    description: "竞品监控和分析，追踪市场动态。",
    author: "MarketAI",
    category: "research",
    tags: ["竞品", "市场分析"],
    downloads: 41000,
    rating: 4.4,
    content: `Competitor Monitor 持续监控竞争对手的动态，包括产品更新、定价变化和市场活动。`,
    features: `- 产品更新监控
- 定价变化追踪
- 市场活动分析
- 社交媒体监控
- 竞争报告生成`,
  },
  {
    name: "Trend Predictor",
    slug: "trend-predictor",
    description: "行业趋势预测，基于数据分析未来走向。",
    author: "TrendAI",
    category: "research",
    tags: ["趋势", "预测", "分析"],
    downloads: 38000,
    rating: 4.3,
    content: `Trend Predictor 分析行业数据，预测未来趋势，帮助你做出前瞻性决策。`,
    features: `- 历史数据分析
- 趋势预测模型
- 关键指标监控
- 行业报告生成
- 预警通知`,
  },
  {
    name: "Survey Analyzer",
    slug: "survey-analyzer",
    description: "问卷数据分析和报告生成。",
    author: "SurveyPro",
    category: "research",
    tags: ["问卷", "分析"],
    downloads: 29000,
    rating: 4.4,
    content: `Survey Analyzer 自动分析问卷数据，生成可视化图表和洞察报告。`,
    features: `- 自动数据清洗
- 统计分析
- 可视化图表
- 开放式问题分析
- 报告自动生成`,
  },
];

async function main() {
  console.log('开始同步 Agent Skills...');
  
  for (const skill of skills) {
    await prisma.agentSkill.upsert({
      where: { slug: skill.slug },
      update: {
        name: skill.name,
        description: skill.description,
        content: skill.content,
        features: skill.features,
        usage: skill.usage,
        requirements: skill.requirements,
      },
      create: {
        ...skill,
        tags: skill.tags,
        published: true,
      },
    });
    console.log(`已同步: ${skill.name}`);
  }
  
  const total = await prisma.agentSkill.count();
  console.log(`\n✅ Skills 总数: ${total}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());