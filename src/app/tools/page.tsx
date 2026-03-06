import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Header } from "@/components/layout";
import { Footer } from "@/components/layout";
import { ExternalLink, Star, Sparkles, Code, MessageSquare, Image, Video, Music, Briefcase, Search } from "lucide-react";

const categories = [
  { key: "all", label: "全部", icon: Sparkles },
  { key: "chat", label: "AI 对话", icon: MessageSquare },
  { key: "coding", label: "AI 编程", icon: Code },
  { key: "image", label: "AI 图像", icon: Image },
  { key: "video", label: "AI 视频", icon: Video },
  { key: "audio", label: "AI 音频", icon: Music },
  { key: "productivity", label: "效率工具", icon: Briefcase },
];

const pricingLabels: Record<string, string> = {
  free: "免费",
  freemium: "免费增值",
  paid: "付费",
};

export default async function ToolsPage({
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

  const tools = await prisma.aITool.findMany({
    where,
    orderBy: [{ featured: "desc" }, { rating: "desc" }, { name: "asc" }],
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold sm:text-5xl">AI 工具库</h1>
            <p className="mt-4 text-lg text-zinc-400">
              精选 AI 工具，助你提升效率
            </p>
          </div>

          {/* Category Tabs */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <Link
                key={cat.key}
                href={cat.key === "all" ? "/tools" : `/tools?category=${cat.key}`}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                  category === cat.key
                    ? "bg-indigo-600 text-white"
                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                }`}
              >
                <cat.icon className="h-4 w-4" />
                {cat.label}
              </Link>
            ))}
          </div>

          {/* Tools Grid */}
          {tools.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/50 py-20">
              <Search className="h-16 w-16 text-zinc-600" />
              <p className="mt-4 text-zinc-400">暂无工具</p>
              <p className="mt-1 text-sm text-zinc-500">工具每两天自动更新</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => (
                <div
                  key={tool.id}
                  className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition hover:border-zinc-700 hover:bg-zinc-800/50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-400">
                        {tool.icon ? (
                          <span className="text-2xl">{tool.icon}</span>
                        ) : (
                          <Sparkles className="h-6 w-6" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold">{tool.name}</h3>
                        {tool.pricing && (
                          <span className="text-xs text-zinc-500">
                            {pricingLabels[tool.pricing] || tool.pricing}
                          </span>
                        )}
                      </div>
                    </div>
                    {tool.featured && (
                      <span className="rounded-full bg-yellow-500/20 px-2 py-1 text-xs text-yellow-400">
                        推荐
                      </span>
                    )}
                  </div>

                  <p className="mt-4 text-sm text-zinc-400 line-clamp-2">
                    {tool.description}
                  </p>

                  {tool.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {tool.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-zinc-800 px-2 py-0.5 text-xs text-zinc-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 flex items-center justify-between">
                    {tool.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm text-zinc-400">{tool.rating}</span>
                      </div>
                    )}
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300"
                    >
                      访问
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}