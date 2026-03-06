"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  content: string;
  source: string | null;
  sourceName: string | null;
  category: string | null;
  tags: string[];
  published: boolean;
}

interface EditArticleFormProps {
  article: Article;
}

export function EditArticleForm({ article }: EditArticleFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: article.title,
    slug: article.slug,
    summary: article.summary || "",
    content: article.content,
    source: article.source || "",
    sourceName: article.sourceName || "",
    category: article.category || "news",
    tags: article.tags.join(", "),
    published: article.published,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await fetch(`/api/admin/articles/${article.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        }),
      });

      if (res.ok) {
        router.push("/admin/articles");
        router.refresh();
      } else {
        alert("保存失败");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("保存失败");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium">标题</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Slug</label>
        <input
          type="text"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">摘要</label>
        <textarea
          value={formData.summary}
          onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white"
          rows={3}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">内容</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 font-mono text-white"
          rows={10}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">来源名称</label>
          <input
            type="text"
            value={formData.sourceName}
            onChange={(e) => setFormData({ ...formData, sourceName: e.target.value })}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">来源链接</label>
          <input
            type="url"
            value={formData.source}
            onChange={(e) => setFormData({ ...formData, source: e.target.value })}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">分类</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white"
          >
            <option value="basics">AI 基础</option>
            <option value="llm">大模型应用</option>
            <option value="practice">动手实践</option>
            <option value="news">行业动态</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">标签 (逗号分隔)</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white"
            placeholder="AI, GPT, 机器学习"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.published}
            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
            className="h-4 w-4 rounded border-zinc-600 bg-zinc-800"
          />
          <span>发布文章</span>
        </label>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSaving}
          className="rounded-lg bg-indigo-600 px-6 py-2 font-medium text-white transition hover:bg-indigo-500 disabled:opacity-50"
        >
          {isSaving ? "保存中..." : "保存"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/articles")}
          className="rounded-lg border border-zinc-700 bg-zinc-800 px-6 py-2 font-medium text-white transition hover:bg-zinc-700"
        >
          取消
        </button>
      </div>
    </form>
  );
}