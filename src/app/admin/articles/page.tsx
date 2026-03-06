import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { DeleteArticleButton } from "./DeleteButton";

export default async function ArticlesAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; published?: string }>;
}) {
  const params = await searchParams;
  const category = params.category;
  const published = params.published;

  const where: any = {};
  if (category) where.category = category;
  if (published !== undefined) where.published = published === "true";

  const articles = await prisma.article.findMany({
    where,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      sourceName: true,
      category: true,
      published: true,
      createdAt: true,
    },
  });

  const categories = ["basics", "llm", "practice", "news"];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">文章管理</h1>
        <Link
          href="/admin/articles/new"
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-500"
        >
          <Plus className="h-4 w-4" />
          添加文章
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <select
          className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm"
          defaultValue={category || ""}
        >
          <option value="">所有分类</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "basics" && "AI 基础"}
              {cat === "llm" && "大模型应用"}
              {cat === "practice" && "动手实践"}
              {cat === "news" && "行业动态"}
            </option>
          ))}
        </select>
      </div>

      {/* Articles Table */}
      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50">
        <table className="w-full">
          <thead className="border-b border-zinc-800 bg-zinc-800/50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-zinc-400">标题</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-zinc-400">来源</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-zinc-400">分类</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-zinc-400">状态</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-zinc-400">日期</th>
              <th className="px-6 py-4 text-right text-sm font-medium text-zinc-400">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {articles.map((article) => (
              <tr key={article.id} className="hover:bg-zinc-800/30">
                <td className="px-6 py-4">
                  <span className="font-medium">{article.title}</span>
                </td>
                <td className="px-6 py-4 text-zinc-400">{article.sourceName}</td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-zinc-800 px-2 py-1 text-xs text-zinc-400">
                    {article.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      article.published
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {article.published ? "已发布" : "草稿"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-zinc-500">
                  {new Date(article.createdAt).toLocaleDateString("zh-CN")}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/articles/${article.id}`}
                      className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <DeleteArticleButton id={article.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}