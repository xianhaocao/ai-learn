import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, ExternalLink, Tag } from "lucide-react";
import { Header } from "@/components/layout";
import { Footer } from "@/components/layout";
import { Comments } from "@/components/Comments";
import { MarkdownContent } from "@/components/MarkdownContent";
import { ShareButtons } from "@/components/ShareButtons";
import { prisma } from "@/lib/prisma";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = await prisma.article.findUnique({
    where: { slug },
  });

  if (!article) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 pt-16">
        <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/articles"
            className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            返回文章列表
          </Link>

          {/* Header */}
          <header className="mb-8">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              {article.category && (
                <span className="rounded-full bg-indigo-600/20 px-3 py-1 text-sm font-medium text-indigo-400">
                  {article.category}
                </span>
              )}
              <span className="flex items-center gap-1 text-sm text-zinc-500">
                <Calendar className="h-4 w-4" />
                {article.publishedAt
                  ? new Date(article.publishedAt).toLocaleDateString("zh-CN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "未发布"}
              </span>
            </div>
            <h1 className="text-3xl font-bold sm:text-4xl">{article.title}</h1>
            {article.summary && (
              <p className="mt-4 text-lg text-zinc-400">{article.summary}</p>
            )}
          </header>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="mb-8 flex flex-wrap items-center gap-2">
              <Tag className="h-4 w-4 text-zinc-500" />
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/articles?tag=${encodeURIComponent(tag)}`}
                  className="rounded-lg bg-zinc-800 px-3 py-1 text-sm text-zinc-400 transition hover:bg-zinc-700 hover:text-white"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="max-w-none">
            <MarkdownContent content={article.content} />
          </div>

          {/* Share */}
          <div className="mt-8 flex items-center justify-between border-t border-zinc-800 pt-6">
            <ShareButtons
              title={article.title}
              url={`https://ai-learn-git-master-caoxianhao170s-projects.vercel.app/articles/${article.slug}`}
            />
          </div>

          {/* Source */}
          {article.source && (
            <footer className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <p className="text-sm text-zinc-400">
                来源：{article.sourceName || "外部链接"}
              </p>
              <a
                href={article.source}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-indigo-400 hover:underline"
              >
                查看原文
                <ExternalLink className="h-4 w-4" />
              </a>
            </footer>
          )}

          {/* Comments */}
          <div className="mt-12 border-t border-zinc-800 pt-8">
            <Comments slug={article.slug} />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}