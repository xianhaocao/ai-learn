const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const tutorials = [
  {
    title: 'Cursor AI 完全指南：AI 编程新时代',
    slug: 'cursor-ai-complete-guide',
    summary: '深入了解 Cursor AI 编辑器，掌握 AI 辅助编程的核心技能。',
    content: `# Cursor AI 完全指南

## 什么是 Cursor？

Cursor 是一款基于 AI 的代码编辑器，内置了强大的 AI 助手，能够理解你的代码并提供智能建议。

## 核心功能

### 1. AI 代码补全
- 智能代码补全
- 上下文感知建议
- 多文件理解

### 2. Chat 功能
- 与 AI 讨论代码
- 请求代码解释
- 寻求优化建议

### 3. 代码生成
- 从注释生成代码
- 重构现有代码
- 编写测试用例

## 使用技巧

### 快捷键
- \`Cmd + K\`: AI 编辑
- \`Cmd + L\`: 打开 Chat
- \`Cmd + I\`: 内联编辑

### 最佳实践

1. **提供清晰的上下文**
   让 AI 理解你的意图

2. **迭代优化**
   不满意就继续追问

3. **学习 AI 的思考方式**
   理解 AI 如何生成代码

## 与其他工具对比

| 功能 | Cursor | VS Code + Copilot |
|------|--------|-------------------|
| 原生 AI 支持 | ✅ | 需要插件 |
| Chat 功能 | ✅ | ✅ |
| 多文件理解 | ✅ | 部分 |
| 学习成本 | 低 | 中 |

## 开始使用

1. 下载 Cursor: https://cursor.sh
2. 导入你的项目
3. 开始与 AI 编程！

掌握 Cursor，让 AI 成为你最好的编程伙伴！`,
    sourceName: 'AI Learn 原创',
    category: 'practice',
    tags: ['Cursor', 'AI编程', '工具'],
    published: true
  },
  {
    title: 'RAG 技术详解：让 AI 拥有知识库',
    slug: 'rag-technology-guide',
    summary: '深入理解 RAG（检索增强生成）技术原理与实践应用。',
    content: `# RAG 技术详解

## 什么是 RAG？

RAG（Retrieval-Augmented Generation，检索增强生成）是一种让 AI 模型访问外部知识库的技术。

## 为什么需要 RAG？

### 大模型的局限性
- 知识截止日期限制
- 无法访问私有数据
- 可能产生幻觉

### RAG 的优势
- 实时访问最新信息
- 使用企业私有知识
- 减少幻觉，提高准确性

## RAG 架构

\`\`\`
用户提问 → 向量检索 → 获取相关文档 → 组合 Prompt → LLM 生成回答
\`\`\`

## 核心组件

### 1. 文档处理
- 文本分块
- 向量嵌入
- 存储到向量数据库

### 2. 检索系统
- 语义相似度搜索
- 混合检索策略
- 重排序优化

### 3. 生成系统
- Prompt 组合
- 上下文窗口管理
- 回答生成

## 常用工具

### 向量数据库
- Pinecone
- Weaviate
- Milvus
- Chroma

### 框架
- LangChain
- LlamaIndex
- Haystack

## 实践建议

1. **合理的文档分块大小**（200-500 tokens）
2. **优化检索策略**（混合检索效果更好）
3. **管理好上下文窗口**（不要塞太多内容）

RAG 是企业 AI 应用的核心技术，值得深入学习！`,
    sourceName: 'AI Learn 原创',
    category: 'llm',
    tags: ['RAG', '向量数据库', 'LangChain'],
    published: true
  },
  {
    title: 'AI Agent 入门：构建智能代理',
    slug: 'ai-agent-beginner-guide',
    summary: '从零开始学习 AI Agent，理解智能代理的核心概念和实现方法。',
    content: `# AI Agent 入门

## 什么是 AI Agent？

AI Agent（智能代理）是能够自主规划、执行任务的 AI 系统。与简单的问答不同，Agent 可以：
- 理解复杂目标
- 规划执行步骤
- 使用工具完成任务
- 从结果中学习和调整

## Agent 核心组件

### 1. 大语言模型（LLM）
作为 Agent 的"大脑"，负责理解和决策。

### 2. 记忆系统
- 短期记忆：当前对话上下文
- 长期记忆：历史经验和知识

### 3. 工具调用
- 搜索引擎
- 代码执行
- API 调用
- 文件操作

### 4. 规划能力
- 任务分解
- 步骤规划
- 反思调整

## Agent 架构模式

### ReAct 模式
\`\`\`
思考 → 行动 → 观察 → 思考...
\`\`\`

### Plan-and-Execute
\`\`\`
规划完整步骤 → 按步骤执行 → 检查结果
\`\`\`

## 主流 Agent 框架

### LangChain
- 丰富的工具生态
- 成熟的 Agent 抽象
- 活跃的社区

### AutoGPT
- 自主任务执行
- 长期目标追求

### CrewAI
- 多 Agent 协作
- 角色分工

## 实践案例

### 案例 1：研究助手 Agent
目标：研究一个主题并生成报告
1. 搜索相关信息
2. 阅读并总结
3. 生成结构化报告

### 案例 2：代码助手 Agent
目标：帮助用户完成编程任务
1. 理解需求
2. 编写代码
3. 测试验证
4. 优化改进

## 挑战与未来发展

### 当前挑战
- 长期规划能力有限
- 工具调用可能出错
- 成本控制

### 未来方向
- 多模态 Agent
- 更强的推理能力
- 人机协作优化

AI Agent 是 AI 应用的重要方向，现在正是学习的好时机！`,
    sourceName: 'AI Learn 原创',
    category: 'llm',
    tags: ['Agent', 'LangChain', 'AI应用'],
    published: true
  }
];

async function main() {
  for (const tutorial of tutorials) {
    await prisma.article.upsert({
      where: { slug: tutorial.slug },
      update: {},
      create: {
        ...tutorial,
        source: null,
        publishedAt: new Date()
      }
    });
    console.log('已添加: ' + tutorial.title);
  }
  
  const total = await prisma.article.count();
  console.log('\\n✅ 文章总数: ' + total);
}

main().catch(console.error).finally(() => prisma.$disconnect());