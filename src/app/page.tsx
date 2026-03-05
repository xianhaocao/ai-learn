import Link from "next/link";
import { Bot, BookOpen, Sparkles, Zap, Target, TrendingUp } from "lucide-react";
import { Header } from "@/components/layout";
import { Footer } from "@/components/layout";

const features = [
  {
    icon: Bot,
    title: "AI 对话学习",
    description: "与 AI 助手实时对话，解答你的 AI 疑问，从入门到进阶",
    href: "/chat",
  },
  {
    icon: BookOpen,
    title: "系统化文章",
    description: "涵盖机器学习、深度学习、大模型应用等核心知识",
    href: "/articles",
  },
  {
    icon: Target,
    title: "学习路径",
    description: "规划清晰的学习路线，从零基础到实战应用",
    href: "/paths",
  },
  {
    icon: TrendingUp,
    title: "行业动态",
    description: "追踪 AI 领域最新进展，不落后于时代",
    href: "/articles?category=news",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-transparent to-purple-600/10" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />

          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
            <div className="text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-400">
                <Sparkles className="h-4 w-4" />
                探索 AI 的无限可能
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                学习 <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">人工智能</span>
                <br />
                从这里开始
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
                从机器学习基础到大模型应用，系统化的学习内容，互动式的学习体验，
                助你掌握 AI 核心技能。
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/chat"
                  className="group flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-500"
                >
                  <Bot className="h-5 w-5" />
                  开始 AI 对话
                  <Zap className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
                </Link>
                <Link
                  href="/articles"
                  className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800/50 px-6 py-3 font-medium transition hover:bg-zinc-800"
                >
                  <BookOpen className="h-5 w-5" />
                  浏览文章
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-zinc-800 bg-zinc-900/50">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold sm:text-3xl">为什么选择 AI Learn？</h2>
              <p className="mt-3 text-zinc-400">一站式 AI 学习平台，理论与实践结合</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Link
                  key={feature.title}
                  href={feature.href}
                  className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition hover:border-zinc-700 hover:bg-zinc-800/50"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-400 transition group-hover:bg-indigo-600 group-hover:text-white">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-zinc-400">{feature.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-zinc-800">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div className="rounded-3xl bg-gradient-to-r from-indigo-600/20 to-purple-600/20 p-8 text-center sm:p-12 lg:p-16">
              <h2 className="text-2xl font-bold sm:text-3xl">准备好开始学习了吗？</h2>
              <p className="mx-auto mt-4 max-w-xl text-zinc-400">
                无论你是完全的新手，还是想深入了解大模型应用，AI Learn 都能帮助你
              </p>
              <Link
                href="/chat"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-medium text-zinc-900 transition hover:bg-zinc-200"
              >
                立即开始
                <Zap className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}