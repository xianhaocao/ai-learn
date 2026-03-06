"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

interface DeleteArticleButtonProps {
  id: string;
}

export function DeleteArticleButton({ id }: DeleteArticleButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("确定要删除这篇文章吗？")) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/articles/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error("删除失败:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="rounded-lg p-2 text-zinc-400 transition hover:bg-red-500/20 hover:text-red-400 disabled:opacity-50"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}