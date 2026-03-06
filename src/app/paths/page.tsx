import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Header } from "@/components/layout";
import { ArrowRight, BookOpen, Code, Brain, Zap } from "lucide-react";

const paths = [
  {
    title: "AI 入门之路",
    description: "从零开始，系统学习 AI 基础知识",
    icon: Brain,
    color: "text-blue-500",
    lessons: 12,
    duration: "4周",
  },
  {
    title: "大模型应用开发",
    description: "学习如何使用 ChatGPT、Claude 等大模型",
    icon: Zap,
    color: "text-purple-500",
    lessons: 8,
    duration: "2周",
  },
  {
    title: "Prompt 工程师",
    description: "掌握提示词工程，成为 AI 协作专家",
    icon: Code,
    color: "text-green-500",
    lessons: 10,
    duration: "3周",
  },
  {
    title: "AI 实战项目",
    description: "动手完成真实 AI 项目，积累经验",
    icon: BookOpen,
    color: "text-orange-500",
    lessons: 6,
    duration: "4周",
  },
];

export default async function PathsPage() {
  const articles = await prisma.article.findMany({
    where: { published: true },
    select: { category: true },
  });

  const categoryCount = {
    basics: articles.filter((a) => a.category === "basics").length,
    llm: articles.filter((a) => a.category === "llm").length,
    practice: articles.filter((a) => a.category === "practice").length,
    news: articles.filter((a) => a.category === "news").length,
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold sm:text-5xl">学习路径</h1>
            <p className="mt-4 text-lg text-zinc-400">
              系统化的学习计划，从入门到精通
            </p>
          </div>

          {/* Stats */}
          <div className="mb-12 grid gap-4 sm:grid-cols-4">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-center">
              <p className="text-2xl font-bold text-blue-500">{categoryCount.basics}</p>
              <p className="text-sm text-zinc-400">AI 基础</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-center">
              <p className="text-2xl font-bold text-purple-500">{categoryCount.llm}</p>
              <p className="text-sm text-zinc-400">大模型应用</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-center">
              <p className="text-2xl font-bold text-green-500">{categoryCount.practice}</p>
              <p className="text-sm text-zinc-400">动手实践</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-center">
              <p className="text-2xl font-bold text-orange-500">{categoryCount.news}</p>
              <p className="text-sm text-zinc-400">行业动态</p>
            </div>
          </div>

          {/* Learning Paths */}
          <div className="grid gap-6 md:grid-cols-2">
            {paths.map((path) => (
              <Link
                key={path.title}
                href="/articles"
                className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition hover:border-zinc-700 hover:bg-zinc-800/50"
              >
                <div className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800 ${path.color}`}>
                    <path.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold group-hover:text-indigo-400">
                      {path.title}
                    </h2>
                    <p className="mt-1 text-zinc-400">{path.description}</p>
                    <div className="mt-4 flex items-center gap-4 text-sm text-zinc-500">
                      <span>{path.lessons} 课时</span>
                      <span>·</span>
                      <span>{path.duration}</span>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-zinc-600 transition group-hover:text-indigo-400 group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-indigo-600/20 to-purple-600/20 p-8 text-center">
            <h2 className="text-2xl font-bold">不知道从哪里开始？</h2>
            <p className="mt-2 text-zinc-400">
              试试 AI 对话，让我们帮你规划学习路线
            </p>
            <Link
              href="/chat"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-500"
            >
              开始 AI 对话
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}