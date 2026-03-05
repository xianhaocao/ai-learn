import Link from "next/link";
import { BookOpen, Calendar, ExternalLink } from "lucide-react";
import { Header } from "@/components/layout";
import { Footer } from "@/components/layout";
import { prisma } from "@/lib/prisma";

const categories = [
  { key: "all", label: "全部" },
  { key: "basics", label: "AI 基础" },
  { key: "llm", label: "大模型应用" },
  { key: "practice", label: "动手实践" },
  { key: "news", label: "行业动态" },
];

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const category = params.category || "all";

  const where: any = { published: true };
  if (category !== "all") {
    where.category = category;
  }

  const articles = await prisma.article.findMany({
    where,
    orderBy: { publishedAt: "desc" },
    take: 50,
    select: {
      id: true,
      title: true,
      slug: true,
      summary: true,
      category: true,
      tags: true,
      source: true,
      sourceName: true,
      publishedAt: true,
    },
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 pt-16">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">文章</h1>
            <p className="mt-2 text-zinc-400">
              系统化的 AI 学习内容，从基础到前沿
            </p>
          </div>

          {/* Category tabs */}
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Link
                key={cat.key}
                href={cat.key === "all" ? "/articles" : `/articles?category=${cat.key}`}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  category === cat.key
                    ? "bg-indigo-600 text-white"
                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>

          {/* Articles grid */}
          {articles.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/50 py-20">
              <BookOpen className="h-16 w-16 text-zinc-600" />
              <p className="mt-4 text-zinc-400">暂无文章</p>
              <p className="mt-1 text-sm text-zinc-500">文章将通过新闻推送系统自动同步</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="group flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/50 transition hover:border-zinc-700 hover:bg-zinc-800/50"
                >
                  <Link href={`/articles/${article.slug}`} className="flex-1 p-6">
                    <div className="mb-3 flex items-center gap-2">
                      {article.category && (
                        <span className="rounded-full bg-indigo-600/20 px-2.5 py-0.5 text-xs font-medium text-indigo-400">
                          {categories.find((c) => c.key === article.category)?.label || article.category}
                        </span>
                      )}
                      {article.source && (
                        <span className="flex items-center gap-1 text-xs text-zinc-500">
                          <ExternalLink className="h-3 w-3" />
                          {article.sourceName || "外部链接"}
                        </span>
                      )}
                    </div>
                    <h2 className="line-clamp-2 text-lg font-semibold group-hover:text-indigo-400">
                      {article.title}
                    </h2>
                    {article.summary && (
                      <p className="mt-2 line-clamp-3 text-sm text-zinc-400">
                        {article.summary}
                      </p>
                    )}
                    {article.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {article.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded bg-zinc-800 px-2 py-0.5 text-xs text-zinc-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                  <div className="flex items-center justify-between border-t border-zinc-800 px-6 py-3 text-xs text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {article.publishedAt
                        ? new Date(article.publishedAt).toLocaleDateString("zh-CN")
                        : "未发布"}
                    </span>
                    {article.source && (
                      <a
                        href={article.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:underline"
                      >
                        查看原文
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}