"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth, SignInButton } from "@clerk/nextjs";
import { Send, Bot, User, Trash2, MessageSquare, Plus, Loader2 } from "lucide-react";
import { Header } from "@/components/layout";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
}

interface Conversation {
  id: string;
  title: string | null;
  updatedAt: string;
}

export default function ChatPage() {
  const { isSignedIn } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isSignedIn) {
      fetchConversations();
    }
  }, [isSignedIn]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchConversations = async () => {
    try {
      const res = await fetch("/api/chat");
      const data = await res.json();
      setConversations(data.conversations || []);
    } catch (error) {
      console.error("Failed to fetch conversations:", error);
    }
  };

  const loadConversation = async (id: string) => {
    try {
      const res = await fetch(`/api/chat/${id}`);
      const data = await res.json();
      if (data.conversation) {
        setMessages(
          data.conversation.messages.filter((m: Message) => m.role !== "system")
        );
        setCurrentConversationId(id);
      }
    } catch (error) {
      console.error("Failed to load conversation:", error);
    }
  };

  const deleteConversation = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await fetch(`/api/chat/${id}`, { method: "DELETE" });
      setConversations(conversations.filter((c) => c.id !== id));
      if (currentConversationId === id) {
        setMessages([]);
        setCurrentConversationId(null);
      }
    } catch (error) {
      console.error("Failed to delete conversation:", error);
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setCurrentConversationId(null);
    setInput("");
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { id: Date.now().toString(), role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          conversationId: currentConversationId,
        }),
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n\n").filter(Boolean);

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = JSON.parse(line.slice(6));
              if (data.content) {
                assistantMessage += data.content;
                setMessages((prev) => {
                  const newMessages = [...prev];
                  const lastMessage = newMessages[newMessages.length - 1];
                  if (lastMessage?.role === "assistant") {
                    lastMessage.content = assistantMessage;
                  } else {
                    newMessages.push({
                      id: Date.now().toString(),
                      role: "assistant",
                      content: assistantMessage,
                    });
                  }
                  return newMessages;
                });
              }
              if (data.conversationId) {
                setCurrentConversationId(data.conversationId);
                fetchConversations();
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: "抱歉，出现了错误。请稍后重试。",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isSignedIn) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center pt-16">
          <div className="text-center">
            <Bot className="mx-auto h-16 w-16 text-indigo-500" />
            <h1 className="mt-4 text-2xl font-bold">AI 学习助手</h1>
            <p className="mt-2 text-zinc-400">登录后即可与 AI 对话学习</p>
            <SignInButton mode="modal">
              <button className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-500">
                登录 / 注册
              </button>
            </SignInButton>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 pt-16">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-zinc-800 bg-zinc-900/50 lg:block">
          <div className="flex h-full flex-col">
            <div className="p-4">
              <button
                onClick={startNewChat}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800/50 px-4 py-2.5 font-medium transition hover:bg-zinc-800"
              >
                <Plus className="h-4 w-4" />
                新对话
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => loadConversation(conv.id)}
                  className={cn(
                    "group flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm transition",
                    currentConversationId === conv.id
                      ? "bg-indigo-600/20 text-indigo-400"
                      : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-2 truncate">
                    <MessageSquare className="h-4 w-4 shrink-0" />
                    <span className="truncate">{conv.title || "新对话"}</span>
                  </div>
                  <button
                    onClick={(e) => deleteConversation(conv.id, e)}
                    className="opacity-0 transition hover:text-red-400 group-hover:opacity-100"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Chat area */}
        <div className="flex flex-1 flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600/20 text-indigo-400">
                    <Bot className="h-8 w-8" />
                  </div>
                  <h2 className="mt-4 text-xl font-semibold">AI 学习助手</h2>
                  <p className="mt-2 text-zinc-400">
                    问我任何关于 AI 的问题，我会帮助你学习
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {[
                      "什么是机器学习？",
                      "解释一下 Transformer 架构",
                      "如何写好 Prompt？",
                      "RAG 是什么？",
                    ].map((q) => (
                      <button
                        key={q}
                        onClick={() => {
                          setInput(q);
                          inputRef.current?.focus();
                        }}
                        className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-1.5 text-sm text-zinc-400 transition hover:border-zinc-600 hover:text-white"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mx-auto max-w-3xl space-y-4 p-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex gap-3",
                      msg.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {msg.role === "assistant" && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white">
                        <Bot className="h-5 w-5" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-3",
                        msg.role === "user"
                          ? "bg-indigo-600 text-white"
                          : "bg-zinc-800 text-zinc-100"
                      )}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                    {msg.role === "user" && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-700 text-white">
                        <User className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div className="flex items-center rounded-2xl bg-zinc-800 px-4 py-3">
                      <Loader2 className="h-4 w-4 animate-spin text-indigo-400" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-zinc-800 bg-zinc-900/50 p-4">
            <div className="mx-auto max-w-3xl">
              <div className="flex items-end gap-3 rounded-2xl border border-zinc-700 bg-zinc-800/50 p-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="输入你的问题..."
                  rows={1}
                  className="flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-zinc-500"
                  style={{ minHeight: "44px", maxHeight: "200px" }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white transition hover:bg-indigo-500 disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </button>
              </div>
              <p className="mt-2 text-center text-xs text-zinc-500">
                AI Learn 可能会出错，请核实重要信息
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}