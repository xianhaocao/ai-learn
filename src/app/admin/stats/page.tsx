import { prisma } from "@/lib/prisma";
import { FileText, Users, MessageSquare, TrendingUp } from "lucide-react";

export default async function StatsAdminPage() {
  const [articleCount, userCount, conversationCount] = await Promise.all([
    prisma.article.count(),
    prisma.user.count(),
    prisma.conversation.count(),
  ]);

  const articlesByCategory = await prisma.article.groupBy({
    by: ["category"],
    _count: true,
  });

  const recentArticles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
    select: {
      title: true,
      sourceName: true,
      createdAt: true,
    },
  });

  const categoryLabels: Record<string, string> = {
    basics: "AI 基础",
    llm: "大模型应用",
    practice: "动手实践",
    news: "行业动态",
  };

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">数据统计</h1>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 text-blue-500">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">文章总数</p>
              <p className="text-2xl font-bold">{articleCount}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/20 text-green-500">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">注册用户</p>
              <p className="text-2xl font-bold">{userCount}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20 text-purple-500">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">对话总数</p>
              <p className="text-2xl font-bold">{conversationCount}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/20 text-orange-500">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">RSS 源</p>
              <p className="text-2xl font-bold">16</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h2 className="mb-4 text-lg font-semibold">文章分类分布</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {articlesByCategory.map((item) => (
            <div key={item.category} className="rounded-lg bg-zinc-800/50 p-4">
              <p className="text-sm text-zinc-400">
                {categoryLabels[item.category || ""] || item.category}
              </p>
              <p className="mt-1 text-2xl font-bold">{item._count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Articles */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50">
        <div className="border-b border-zinc-800 p-6">
          <h2 className="text-lg font-semibold">最新文章</h2>
        </div>
        <div className="divide-y divide-zinc-800">
          {recentArticles.map((article, i) => (
            <div key={i} className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium">{article.title}</p>
                <p className="text-sm text-zinc-400">{article.sourceName}</p>
              </div>
              <span className="text-sm text-zinc-500">
                {new Date(article.createdAt).toLocaleDateString("zh-CN")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}