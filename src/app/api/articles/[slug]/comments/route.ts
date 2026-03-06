import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 获取文章评论
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const article = await prisma.article.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    const comments = await prisma.comment.findMany({
      where: { articleId: article.id, parentId: null },
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { name: true, imageUrl: true },
        },
        replies: {
          orderBy: { createdAt: "asc" },
          include: {
            user: {
              select: { name: true, imageUrl: true },
            },
          },
        },
      },
    });

    return NextResponse.json({ comments });
  } catch (error) {
    console.error("Get comments error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// 发表评论
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await params;
    const body = await req.json();
    const { content, parentId } = body;

    if (!content || content.trim().length === 0) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    // 获取用户
    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { clerkId: userId },
      });
    }

    // 获取文章
    const article = await prisma.article.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    const comment = await prisma.comment.create({
      data: {
        articleId: article.id,
        userId: user.id,
        content: content.trim(),
        parentId: parentId || null,
      },
      include: {
        user: {
          select: { name: true, imageUrl: true },
        },
      },
    });

    return NextResponse.json({ comment });
  } catch (error) {
    console.error("Create comment error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}