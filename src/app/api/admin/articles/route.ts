import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 检查管理员权限
async function checkAdmin() {
  const { userId } = await auth();
  if (!userId) return false;
  
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  return user.publicMetadata?.role === "admin" || true; // 临时允许所有登录用户
}

// 获取文章列表
export async function GET(req: NextRequest) {
  try {
    if (!(await checkAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const published = searchParams.get("published");

    const where: any = {};
    if (category) where.category = category;
    if (published !== null) where.published = published === "true";

    const articles = await prisma.article.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    return NextResponse.json({ articles });
  } catch (error) {
    console.error("Get articles error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// 创建新文章
export async function POST(req: NextRequest) {
  try {
    if (!(await checkAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, slug, summary, content, source, sourceName, category, tags, published } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
    }

    const article = await prisma.article.create({
      data: {
        title,
        slug,
        summary,
        content: content || "",
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