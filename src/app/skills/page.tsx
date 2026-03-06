import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Header } from "@/components/layout";
import { Footer } from "@/components/layout";
import { Download, Star, TrendingUp, Clock, Zap, Code, Briefcase, Search, Settings } from "lucide-react";

const categories = [
  { key: "all", label: "全部", icon: Zap },
  { key: "coding", label: "编程开发", icon: Code },
  { key: "productivity", label: "效率提升", icon: Briefcase },
  { key: "automation", label: "自动化", icon: Settings },
  { key: "research", label: "研究分析", icon: Search },
];

export default async function SkillsPage({
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

  // 获取所有 skills 并按下载量排序
  const allSkills = await prisma.agentSkill.findMany({
    where,
    orderBy: { downloads: "desc" },
    take: 50,
  });

  // Top 20 下载量最高
  const topDownloads = allSkills.slice(0, 20);

  // 每日热门（模拟，实际应该根据下载数据计算）
  const dailyHot = allSkills
    .filter((s) => s.featured)
    .slice(0, 10);

  // 每周热门
  const weeklyHot = allSkills
    .filter((s) => s.rating && s.rating >= 4.5)
    .slice(0, 10);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold sm:text-5xl">Agent Skills</h1>
            <p className="mt-4 text-lg text-zinc-400">
              精选 AI Agent 技能，让 AI 更强大
            </p>
          </div>

          {/* Stats */}
          <div className="mb-12 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-center">
              <p className="text-3xl font-bold text-indigo-400">{allSkills.length}</p>
              <p className="mt-1 text-sm text-zinc-400">总技能数</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-center">
              <p className="text-3xl font-bold text-green-400">
                {allSkills.reduce((sum, s) => sum + s.downloads, 0).toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-zinc-400">总下载量</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-center">
              <p className="text-3xl font-bold text-yellow-400">{dailyHot.length}</p>
              <p className="mt-1 text-sm text-zinc-400">今日热门</p>
            </div>
          </div>

          {/* Daily Hot */}
          {dailyHot.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                <h2 className="text-xl font-bold">每日热门</h2>
                <span className="text-sm text-zinc-500">实时更新</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {dailyHot.map((skill, i) => (
                  <Link
                    key={skill.id}
                    href={`/skills/${skill.slug}`}
                    className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition hover:border-orange-500/50 hover:bg-zinc-800/50"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded bg-orange-500/20 text-xs font-bold text-orange-400">
                        {i + 1}
                      </span>
                      <h3 className="font-medium truncate group-hover:text-orange-400 transition">{skill.name}</h3>
                    </div>
                    <p className="text-xs text-zinc-500 line-clamp-2">{skill.description}</p>
                    <div className="mt-2 flex items-center gap-2 text-xs text-zinc-400">
                      <Download className="h-3 w-3" />
                      {skill.downloads.toLocaleString()}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Top Downloads */}
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Download className="h-5 w-5 text-indigo-500" />
              <h2 className="text-xl font-bold">下载量 Top 20</h2>
            </div>
            <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50">
              <table className="w-full">
                <thead className="border-b border-zinc-800 bg-zinc-800/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">#</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">名称</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">分类</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">作者</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-zinc-400">下载量</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-zinc-400">评分</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {topDownloads.map((skill, i) => (
                    <tr key={skill.id} className="hover:bg-zinc-800/30 cursor-pointer">
                      <td className="px-4 py-3">
                        <span className={`flex h-6 w-6 items-center justify-center rounded text-xs font-bold ${
                          i < 3 ? "bg-yellow-500/20 text-yellow-400" : "bg-zinc-800 text-zinc-400"
                        }`}>
                          {i + 1}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Link href={`/skills/${skill.slug}`} className="block hover:text-indigo-400 transition">
                          <p className="font-medium">{skill.name}</p>
                          <p className="text-xs text-zinc-500 line-clamp-1">{skill.description}</p>
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-zinc-800 px-2 py-1 text-xs text-zinc-400">
                          {skill.category || "-"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-zinc-400">{skill.author || "-"}</td>
                      <td className="px-4 py-3 text-right font-medium">{skill.downloads.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right">
                        {skill.rating && (
                          <span className="flex items-center justify-end gap-1 text-sm">
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                            {skill.rating}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Weekly Hot */}
          {weeklyHot.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-6">
                <Clock className="h-5 w-5 text-green-500" />
                <h2 className="text-xl font-bold">每周热门</h2>
                <span className="text-sm text-zinc-500">高评分推荐</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {weeklyHot.map((skill) => (
                  <Link
                    key={skill.id}
                    href={`/skills/${skill.slug}`}
                    className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition hover:border-green-500/50 hover:bg-zinc-800/50"
                  >
                    <h3 className="font-medium truncate mb-2 group-hover:text-green-400 transition">{skill.name}</h3>
                    <p className="text-xs text-zinc-500 line-clamp-2 mb-3">{skill.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400">
                        <Download className="h-3 w-3 inline mr-1" />
                        {skill.downloads.toLocaleString()}
                      </span>
                      {skill.rating && (
                        <span className="flex items-center gap-1 text-yellow-400">
                          <Star className="h-3 w-3 fill-yellow-500" />
                          {skill.rating}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {allSkills.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/50 py-20">
              <Zap className="h-16 w-16 text-zinc-600" />
              <p className="mt-4 text-zinc-400">暂无技能数据</p>
              <p className="mt-1 text-sm text-zinc-500">数据每日自动更新</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}