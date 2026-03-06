import { prisma } from "@/lib/prisma";

export default async function SourcesAdminPage() {
  // 从 blogwatcher 获取 RSS 源列表
  const sources = [
    { name: "OpenAI Blog", url: "https://openai.com/blog/rss.xml", status: "active" },
    { name: "Anthropic Blog", url: "https://www.anthropic.com/news/rss", status: "active" },
    { name: "Google AI Blog", url: "https://blog.google/technology/ai/rss", status: "active" },
    { name: "Meta AI Blog", url: "https://ai.meta.com/blog/rss.xml", status: "active" },
    { name: "LangChain Blog", url: "https://blog.langchain.dev/rss/", status: "active" },
    { name: "Hugging Face Blog", url: "https://huggingface.co/blog/feed.xml", status: "active" },
    { name: "量子位", url: "https://www.qbitai.com/feed", status: "active" },
    { name: "机器之心", url: "https://www.jiqizhixin.com/rss", status: "active" },
    { name: "r/MachineLearning", url: "https://www.reddit.com/r/MachineLearning/.rss", status: "active" },
    { name: "AI News", url: "https://artificialintelligence-news.com/feed", status: "active" },
    { name: "VentureBeat AI", url: "https://venturebeat.com/category/ai/feed/", status: "active" },
    { name: "Mistral AI", url: "https://mistral.ai/news/rss.xml", status: "pending" },
    { name: "DeepLearning.AI", url: "https://blog.deeplearning.ai/rss", status: "pending" },
  ];

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">RSS 源管理</h1>

      {/* Stats */}
      <div className="mb-8 grid gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <p className="text-sm text-zinc-400">总源数</p>
          <p className="mt-2 text-3xl font-bold">{sources.length}</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <p className="text-sm text-zinc-400">活跃</p>
          <p className="mt-2 text-3xl font-bold text-green-500">
            {sources.filter((s) => s.status === "active").length}
          </p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <p className="text-sm text-zinc-400">待验证</p>
          <p className="mt-2 text-3xl font-bold text-yellow-500">
            {sources.filter((s) => s.status === "pending").length}
          </p>
        </div>
      </div>

      {/* Sources Table */}
      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50">
        <table className="w-full">
          <thead className="border-b border-zinc-800 bg-zinc-800/50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-zinc-400">名称</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-zinc-400">URL</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-zinc-400">状态</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {sources.map((source, i) => (
              <tr key={i} className="hover:bg-zinc-800/30">
                <td className="px-6 py-4 font-medium">{source.name}</td>
                <td className="px-6 py-4 text-sm text-zinc-400">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white hover:underline"
                  >
                    {source.url}
                  </a>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      source.status === "active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {source.status === "active" ? "活跃" : "待验证"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}