import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 同步新闻到文章
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { articles } = body as {
      articles: Array<{
        title: string;
        link: string;
        source: string;
        publishedAt?: string;
      }>;
    };

    if (!articles || !Array.isArray(articles)) {
      return NextResponse.json({ error: "Articles array required" }, { status: 400 });
    }

    const results = {
      created: 0,
      skipped: 0,
      errors: [] as string[],
    };

    for (const article of articles) {
      try {
        // 生成 slug
        const slug = article.link
          .split("/")
          .filter(Boolean)
          .pop()
          ?.replace(/[^a-zA-Z0-9-]/g, "-")
          .slice(0, 100) || `article-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

        // 检查是否已存在
        const existing = await prisma.article.findFirst({
          where: {
            OR: [
              { slug },
              { source: article.link },
            ],
          },
        });

        if (existing) {
          results.skipped++;
          continue;
        }

        // 创建文章
        await prisma.article.create({
          data: {
            title: article.title,
            slug,
            summary: null,
            content: `点击下方链接查看原文：\n\n${article.link}`,
            source: article.link,
            sourceName: article.source,
            category: "news",
            tags: [],
            published: true,
            publishedAt: article.publishedAt ? new Date(article.publishedAt) : new Date(),
          },
        });

        results.created++;
      } catch (error) {
        results.errors.push(`Failed to sync: ${article.title}`);
      }
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error("Sync error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}