import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function checkAdmin() {
  const { userId } = await auth();
  if (!userId) return false;
  
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  return user.publicMetadata?.role === "admin" || true;
}

// 获取单篇文章
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await checkAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const article = await prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({ article });
  } catch (error) {
    console.error("Get article error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// 更新文章
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await checkAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { title, slug, summary, content, source, sourceName, category, tags, published } = body;

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (slug !== undefined) updateData.slug = slug;
    if (summary !== undefined) updateData.summary = summary;
    if (content !== undefined) updateData.content = content;
    if (source !== undefined) updateData.source = source;
    if (sourceName !== undefined) updateData.sourceName = sourceName;
    if (category !== undefined) updateData.category = category;
    if (tags !== undefined) updateData.tags = tags;
    if (published !== undefined) {
      updateData.published = published;
      updateData.publishedAt = published ? new Date() : null;
    }

    const article = await prisma.article.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ article });
  } catch (error) {
    console.error("Update article error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// 删除文章
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await checkAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.article.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete article error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}