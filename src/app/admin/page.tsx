import { prisma } from "@/lib/prisma";
import { FileText, Users, Rss, TrendingUp } from "lucide-react";

const statCards = [
  { label: "文章总数", icon: FileText, color: "text-blue-500" },
  { label: "注册用户", icon: Users, color: "text-green-500" },
  { label: "RSS 源", icon: Rss, color: "text-purple-500" },
  { label: "今日访问", icon: TrendingUp, color: "text-orange-500" },
];

export default async function AdminDashboard() {
  const [articleCount, userCount] = await Promise.all([
    prisma.article.count(),
    prisma.user.count(),
  ]);

  const stats = [
    { value: articleCount, label: "文章总数" },
    { value: userCount, label: "注册用户" },
    { value: 16, label: "RSS 源" },
    { value: "-", label: "今日访问" },
  ];

  const recentArticles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    select: {
      id: true,
      title: true,
      sourceName: true,
      published: true,
      createdAt: true,
    },
  });

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">管理后台</h1>

      {/* Stats */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
          >
            <p className="text-sm text-zinc-400">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Articles */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50">
        <div className="border-b border-zinc-800 p-6">
          <h2 className="text-lg font-semibold">最新文章</h2>
        </div>
        <div className="divide-y divide-zinc-800">
          {recentArticles.map((article) => (
            <div key={article.id} className="flex items-center justify-between p-6">
              <div>
                <h3 className="font-medium">{article.title}</h3>
                <p className="text-sm text-zinc-400">{article.sourceName}</p>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`rounded-full px-2 py-1 text-xs ${
                    article.published
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {article.published ? "已发布" : "草稿"}
                </span>
                <span className="text-sm text-zinc-500">
                  {new Date(article.createdAt).toLocaleDateString("zh-CN")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}