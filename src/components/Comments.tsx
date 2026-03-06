"use client";

import { useState, useEffect } from "react";
import { useAuth, SignInButton } from "@clerk/nextjs";
import { MessageSquare, Send, Loader2 } from "lucide-react";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    name: string | null;
    imageUrl: string | null;
  };
  replies?: Comment[];
}

interface CommentsProps {
  slug: string;
}

export function Comments({ slug }: CommentsProps) {
  const { isSignedIn } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  useEffect(() => {
    fetchComments();
  }, [slug]);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/articles/${slug}/comments`);
      const data = await res.json();
      setComments(data.comments || []);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch(`/api/articles/${slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment }),
      });

      if (res.ok) {
        setNewComment("");
        fetchComments();
      }
    } catch (error) {
      console.error("Failed to submit comment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReply = async (parentId: string) => {
    if (!replyContent.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch(`/api/articles/${slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: replyContent, parentId }),
      });

      if (res.ok) {
        setReplyContent("");
        setReplyTo(null);
        fetchComments();
      }
    } catch (error) {
      console.error("Failed to submit reply:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-zinc-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-zinc-400" />
        <h2 className="text-lg font-semibold">评论 ({comments.length})</h2>
      </div>

      {/* Comment Form */}
      {isSignedIn ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="分享你的想法..."
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-indigo-500 focus:outline-none"
            rows={3}
          />
          <button
            type="submit"
            disabled={submitting || !newComment.trim()}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:opacity-50"
          >
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            发表评论
          </button>
        </form>
      ) : (
        <div className="rounded-xl border border-zinc-800 bg-zinc-800/30 p-6 text-center">
          <p className="text-zinc-400">登录后参与讨论</p>
          <SignInButton mode="modal">
            <button className="mt-3 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500">
              登录
            </button>
          </SignInButton>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="rounded-xl border border-zinc-800 bg-zinc-800/30 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white">
                {comment.user.name?.[0] || "?"}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{comment.user.name || "匿名用户"}</span>
                  <span className="text-sm text-zinc-500">{formatDate(comment.createdAt)}</span>
                </div>
                <p className="mt-2 text-zinc-300">{comment.content}</p>

                {/* Reply Button */}
                {isSignedIn && (
                  <button
                    onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                    className="mt-2 text-sm text-indigo-400 hover:text-indigo-300"
                  >
                    回复
                  </button>
                )}

                {/* Reply Form */}
                {replyTo === comment.id && (
                  <div className="mt-3 space-y-2">
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="写下你的回复..."
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm"
                      rows={2}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleReply(comment.id)}
                        disabled={submitting}
                        className="rounded bg-indigo-600 px-3 py-1 text-sm text-white hover:bg-indigo-500 disabled:opacity-50"
                      >
                        发送
                      </button>
                      <button
                        onClick={() => setReplyTo(null)}
                        className="rounded bg-zinc-700 px-3 py-1 text-sm text-zinc-300 hover:bg-zinc-600"
                      >
                        取消
                      </button>
                    </div>
                  </div>
                )}

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 space-y-3 border-l-2 border-zinc-700 pl-4">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex items-start gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-700 text-sm text-white">
                          {reply.user.name?.[0] || "?"}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{reply.user.name || "匿名用户"}</span>
                            <span className="text-xs text-zinc-500">{formatDate(reply.createdAt)}</span>
                          </div>
                          <p className="text-sm text-zinc-400">{reply.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {comments.length === 0 && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-800/30 p-8 text-center">
            <MessageSquare className="mx-auto h-12 w-12 text-zinc-600" />
            <p className="mt-3 text-zinc-500">暂无评论，快来发表第一条评论吧！</p>
          </div>
        )}
      </div>
    </div>
  );
}