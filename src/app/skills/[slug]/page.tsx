import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout";
import { Footer } from "@/components/layout";
import { MarkdownContent } from "@/components/MarkdownContent";
import { Download, Star, ArrowLeft, ExternalLink, Clock, Tag, User, Zap } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const skills = await prisma.agentSkill.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return skills.map((skill) => ({ slug: skill.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const skill = await prisma.agentSkill.findUnique({
    where: { slug },
  });
  
  if (!skill) return { title: "Skill Not Found" };
  
  return {
    title: `${skill.name} - Agent Skill | AI Learn`,
    description: skill.description,
  };
}

export default async function SkillDetailPage({ params }: Props) {
  const { slug } = await params;
  const skill = await prisma.agentSkill.findUnique({
    where: { slug },
  });

  if (!skill || !skill.published) {
    notFound();
  }

  // 获取相关 skills
  const relatedSkills = await prisma.agentSkill.findMany({
    where: {
      published: true,
      category: skill.category,
      NOT: { id: skill.id },
    },
    take: 4,
    orderBy: { downloads: "desc" },
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            href="/skills"
            className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition"
          >
            <ArrowLeft className="h-4 w-4" />
            返回 Skills 列表
          </Link>

          {/* Header */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-400">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">{skill.name}</h1>
                    {skill.version && (
                      <span className="text-sm text-zinc-500">v{skill.version}</span>
                    )}
                  </div>
                </div>
                {skill.featured && (
                  <span className="mt-2 inline-block rounded-full bg-yellow-500/20 px-3 py-1 text-sm text-yellow-400">
                    ⭐ 精选推荐
                  </span>
                )}
              </div>
              <div className="flex flex-col items-end gap-2">
                {skill.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <span className="text-xl font-bold">{skill.rating}</span>
                  </div>
                )}
                <div className="flex items-center gap-1 text-zinc-400">
                  <Download className="h-4 w-4" />
                  <span>{skill.downloads.toLocaleString()} 下载</span>
                </div>
              </div>
            </div>

            <p className="mt-6 text-lg text-zinc-300">{skill.description}</p>

            {/* Meta Info */}
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-zinc-400">
              {skill.author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>
                    {skill.authorUrl ? (
                      <a
                        href={skill.authorUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white"
                      >
                        {skill.author}
                      </a>
                    ) : (
                      skill.author
                    )}
                  </span>
                </div>
              )}
              {skill.category && (
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  <span className="rounded-full bg-zinc-800 px-2 py-0.5">{skill.category}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>更新于 {skill.updatedAt.toLocaleDateString()}</span>
              </div>
            </div>

            {/* Tags */}
            {skill.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {skill.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          {skill.content && (
            <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8">
              <h2 className="text-xl font-bold mb-4">详细介绍</h2>
              <MarkdownContent content={skill.content} />
            </div>
          )}

          {/* Features */}
          {skill.features && (
            <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8">
              <h2 className="text-xl font-bold mb-4">核心功能</h2>
              <div className="prose prose-invert prose-zinc max-w-none">
                <MarkdownContent content={skill.features} />
              </div>
            </div>
          )}

          {/* Usage */}
          {skill.usage && (
            <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8">
              <h2 className="text-xl font-bold mb-4">使用方法</h2>
              <div className="prose prose-invert prose-zinc max-w-none">
                <MarkdownContent content={skill.usage} />
              </div>
            </div>
          )}

          {/* Requirements */}
          {skill.requirements && (
            <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8">
              <h2 className="text-xl font-bold mb-4">使用要求</h2>
              <div className="prose prose-invert prose-zinc max-w-none">
                <MarkdownContent content={skill.requirements} />
              </div>
            </div>
          )}

          {/* Related Skills */}
          {relatedSkills.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold mb-6">相关 Skills</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {relatedSkills.map((related) => (
                  <Link
                    key={related.id}
                    href={`/skills/${related.slug}`}
                    className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition hover:border-zinc-700 hover:bg-zinc-800/50"
                  >
                    <h3 className="font-medium group-hover:text-indigo-400 transition">{related.name}</h3>
                    <p className="mt-1 text-sm text-zinc-500 line-clamp-2">{related.description}</p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        {related.downloads.toLocaleString()}
                      </span>
                      {related.rating && (
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                          {related.rating}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}