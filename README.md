# AI Learn - AI 学习平台

一个基于 Next.js 的 AI 学习网站，支持 AI 对话问答和文章阅读。

## 功能

- 🤖 **AI 对话学习** - 与 AI 助手实时对话，解答 AI 相关问题
- 📚 **系统化文章** - 涵盖机器学习、大模型应用等核心知识
- 🔐 **用户认证** - 基于 Clerk 的安全认证系统
- 📱 **响应式设计** - 支持桌面和移动设备

## 技术栈

- **框架**: Next.js 16 (App Router)
- **样式**: Tailwind CSS
- **数据库**: PostgreSQL (Vercel Postgres)
- **ORM**: Prisma
- **认证**: Clerk
- **AI**: GLM (智谱 AI)

## 快速开始

### 1. 克隆项目

```bash
cd ai-learn
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

复制 `.env.example` 到 `.env` 并填入配置：

```bash
cp .env.example .env
```

需要配置的环境变量：

| 变量 | 说明 |
|------|------|
| `DATABASE_URL` | Vercel Postgres 连接字符串 |
| `DIRECT_URL` | Vercel Postgres 直连 URL |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk 公钥 |
| `CLERK_SECRET_KEY` | Clerk 密钥 |
| `GLM_API_KEY` | 智谱 AI API Key |
| `GLM_BASE_URL` | GLM API 地址 (默认: https://open.bigmodel.cn/api/paas/v4) |

### 4. 初始化数据库

```bash
npx prisma db push
```

### 5. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

## 部署到 Vercel

1. 将项目推送到 GitHub
2. 在 Vercel 导入项目
3. 配置环境变量
4. 部署

## 项目结构

```
ai-learn/
├── prisma/
│   └── schema.prisma      # 数据库模型
├── src/
│   ├── app/
│   │   ├── api/           # API 路由
│   │   ├── articles/      # 文章页面
│   │   ├── chat/          # 聊天页面
│   │   └── page.tsx       # 首页
│   ├── components/        # React 组件
│   └── lib/               # 工具函数
└── scripts/               # 脚本
```

## 文章同步

通过 `/api/sync` API 可以从新闻推送系统同步文章：

```bash
curl -X POST http://localhost:3000/api/sync \
  -H "Content-Type: application/json" \
  -d '{"articles": [{"title": "文章标题", "link": "https://...", "source": "来源"}]}'
```