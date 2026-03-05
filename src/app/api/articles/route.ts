import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = parseInt(searchParams.get("offset") || "0");

    const where: any = { published: true };

    if (category) {
      where.category = category;
    }

    if (tag) {
      where.tags = { has: tag };
    }

    const articles = await prisma.article.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      take: limit,
      skip: offset,
      select: {
        id: true,
        title: true,
        slug: true,
        summary: true,
        category: true,
        tags: true,
        source: true,
        sourceName: true,
        publishedAt: true,
      },
    });

    const total = await prisma.article.count({ where });

    return NextResponse.json({ articles, total });
  } catch (error) {
    console.error("Get articles error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, slug, summary, content, source, sourceName, category, tags, published } = body;

    const article = await prisma.article.create({
      data: {
        title,
        slug,
        summary,
        content,
        source,
        sourceName,
        category,
        tags: tags || [],
        published: published ?? false,
        publishedAt: published ? new Date() : null,
      },
    });

    return NextResponse.json({ article });
  } catch (error) {
    console.error("Create article error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}