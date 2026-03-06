const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const tutorials = [
  {
    title: 'AI 入门指南：从零开始学习人工智能',
    slug: 'ai-beginner-guide',
    summary: '一份完整的 AI 入门指南，帮助你快速了解人工智能的核心概念和学习路径。',
    content: `# AI 入门指南：从零开始学习人工智能

## 什么是人工智能？

人工智能（Artificial Intelligence，AI）是计算机科学的一个分支，旨在创建能够模拟人类智能的系统。从 Siri 到 ChatGPT，AI 已经深入我们的日常生活。

## AI 的主要分类

### 1. 弱人工智能 (Narrow AI)
专注于特定任务的 AI，如：图像识别、语音助手、推荐系统

### 2. 强人工智能 (General AI)
能够执行任何人类智能任务的 AI（目前仍在研究中）

## 核心技术领域

- **机器学习**：让计算机从数据中学习规律
- **深度学习**：使用神经网络模拟人脑的学习方式
- **自然语言处理**：让计算机理解和生成人类语言
- **计算机视觉**：让计算机"看懂"图像和视频

## 学习路径建议

1. **基础阶段**（1-2个月）：Python 编程、数学基础、机器学习概念
2. **进阶阶段**（2-3个月）：深度学习框架、专项学习、项目实践
3. **实战阶段**（持续）：开源项目、实际问题、前沿进展

AI 领域正在快速发展，现在正是学习的最佳时机！`,
    sourceName: 'AI Learn 原创',
    category: 'basics',
    tags: ['入门', 'AI', '学习路径'],
    published: true
  },
  {
    title: 'ChatGPT 完全指南：从入门到精通',
    slug: 'chatgpt-complete-guide',
    summary: '全面了解 ChatGPT 的使用技巧、应用场景和最佳实践。',
    content: `# ChatGPT 完全指南

## 什么是 ChatGPT？

ChatGPT 是 OpenAI 开发的大型语言模型，能够进行自然对话、回答问题、协助写作等任务。

## 基础使用技巧

### 1. 清晰的提问
- 提供足够的上下文
- 明确你的需求
- 一次问一个核心问题

### 2. 迭代对话
- 不满意？继续追问
- 提供反馈让模型改进
- 多轮对话获得更好结果

### 3. 角色设定
告诉 ChatGPT 扮演特定角色，获得更专业的回答。

## 高级技巧

### Prompt Engineering
- Few-shot learning：给几个示例
- Chain of thought：让模型展示思考过程
- 结构化输出：要求特定格式

## 应用场景

1. **学习助手**：概念解释、问题解答、学习计划
2. **写作助手**：文章大纲、内容润色、翻译校对
3. **编程助手**：代码生成、Bug 调试、代码审查

## 注意事项

- 验证重要信息
- 不要分享敏感数据
- 了解模型的局限性

掌握 ChatGPT 将极大提升你的效率！`,
    sourceName: 'AI Learn 原创',
    category: 'llm',
    tags: ['ChatGPT', 'Prompt', '教程'],
    published: true
  },
  {
    title: 'Prompt Engineering 实战技巧',
    slug: 'prompt-engineering-tips',
    summary: '掌握提示词工程的核心技巧，让 AI 输出更精准、更有价值的内容。',
    content: `# Prompt Engineering 实战技巧

## 什么是 Prompt Engineering？

Prompt Engineering（提示词工程）是与 AI 模型有效沟通的艺术和科学。

## 核心原则

### 1. 明确性
模糊的提示 → 模糊的结果
清晰的提示 → 精准的回答

### 2. 结构化
使用分隔符、编号、markdown 格式让 AI 更好理解你的需求。

### 3. 示例驱动
给 AI 展示你期望的输出格式。

## 实用技巧

### 角色扮演
让 AI 扮演特定角色，获得更专业的回答。

### 思维链
让 AI 展示推理过程，提高复杂问题的准确性。

### 分步拆解
把复杂任务分解成多个简单步骤。

## 进阶模式

- Zero-shot：不给示例，直接提问
- Few-shot：给几个示例，引导输出
- Chain-of-Thought：让 AI 展示思考过程

## 总结

好的提示词 = 清晰的指令 + 足够的上下文 + 期望的格式`,
    sourceName: 'AI Learn 原创',
    category: 'llm',
    tags: ['Prompt', '技巧', '教程'],
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