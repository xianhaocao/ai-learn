import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 检查管理员权限
async function checkAdmin() {
  const { userId } = await auth();
  if (!userId) return false;
  
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  return user.publicMetadata?.role === "admin" || true;
}

// 获取工具列表
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const where: any = { published: true };
    if (category) where.category = category;

    const tools = await prisma.aITool.findMany({
      where,
      orderBy: [{ featured: "desc" }, { rating: "desc" }],
    });

    return NextResponse.json({ tools });
  } catch (error) {
    console.error("Get tools error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// 同步工具（批量更新）
export async function POST(req: NextRequest) {
  try {
    if (!(await checkAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { tools } = body;

    if (!Array.isArray(tools)) {
      return NextResponse.json({ error: "Tools array required" }, { status: 400 });
    }

    const results = { created: 0, updated: 0, errors: [] as string[] };

    for (const tool of tools) {
      try {
        const existing = await prisma.aITool.findUnique({
          where: { slug: tool.slug },
        });

        if (existing) {
          await prisma.aITool.update({
            where: { slug: tool.slug },
            data: {
              name: tool.name,
              description: tool.description,
              url: tool.url,
              icon: tool.icon,
              category: tool.category,
              tags: tool.tags || [],
              pricing: tool.pricing,
              features: tool.features,
              rating: tool.rating,
              featured: tool.featured || false,
            },
          });
          results.updated++;
        } else {
          await prisma.aITool.create({
            data: {
              name: tool.name,
              slug: tool.slug,
              description: tool.description,
              url: tool.url,
              icon: tool.icon,
              category: tool.category,
              tags: tool.tags || [],
              pricing: tool.pricing,
              features: tool.features,
              rating: tool.rating,
              featured: tool.featured || false,
              published: true,
            },
          });
          results.created++;
        }
      } catch (e) {
        results.errors.push(`Failed to sync: ${tool.name}`);
      }
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error("Sync tools error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}