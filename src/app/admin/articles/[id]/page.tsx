import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EditArticleForm } from "./EditForm";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const article = await prisma.article.findUnique({
    where: { id },
  });

  if (!article) {
    notFound();
  }

  return (
    <div>
      <Link
        href="/admin/articles"
        className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        返回文章列表
      </Link>

      <h1 className="mb-8 text-3xl font-bold">编辑文章</h1>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <EditArticleForm article={article} />
      </div>
    </div>
  );
}