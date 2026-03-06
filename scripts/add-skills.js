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
  },
];

async function main() {
  console.log('开始同步 Agent Skills...');
  
  for (const skill of skills) {
    await prisma.agentSkill.upsert({
      where: { slug: skill.slug },
      update: {},
      create: {
        ...skill,
        tags: skill.tags,
        published: true,
      },
    });
    console.log(`已添加: ${skill.name}`);
  }
  
  const total = await prisma.agentSkill.count();
  console.log(`\n✅ Skills 总数: ${total}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());