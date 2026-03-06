import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 获取 Skills 列表
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const sort = searchParams.get("sort") || "downloads";
    const limit = parseInt(searchParams.get("limit") || "50");

    const where: any = { published: true };
    if (category) where.category = category;

    let orderBy: any = { downloads: "desc" };
    if (sort === "rating") orderBy = { rating: "desc" };
    if (sort === "recent") orderBy = { createdAt: "desc" };

    const skills = await prisma.agentSkill.findMany({
      where,
      orderBy,
      take: limit,
    });

    return NextResponse.json({ skills });
  } catch (error) {
    console.error("Get skills error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// 同步 Skills（批量更新）
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { skills } = body;

    if (!Array.isArray(skills)) {
      return NextResponse.json({ error: "Skills array required" }, { status: 400 });
    }

    const results = { created: 0, updated: 0, errors: [] as string[] };

    for (const skill of skills) {
      try {
        const existing = await prisma.agentSkill.findUnique({
          where: { slug: skill.slug },
        });

        if (existing) {
          await prisma.agentSkill.update({
            where: { slug: skill.slug },
            data: {
              name: skill.name,
              description: skill.description,
              author: skill.author,
              category: skill.category,
              tags: skill.tags || [],
              downloads: skill.downloads,
              rating: skill.rating,
              featured: skill.featured || false,
            },
          });
          results.updated++;
        } else {
          await prisma.agentSkill.create({
            data: {
              name: skill.name,
              slug: skill.slug,
              description: skill.description,
              author: skill.author,
              category: skill.category,
              tags: skill.tags || [],
              downloads: skill.downloads || 0,
              rating: skill.rating,
              featured: skill.featured || false,
              published: true,
            },
          });
          results.created++;
        }
      } catch (e) {
        results.errors.push(`Failed to sync: ${skill.name}`);
      }
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error("Sync skills error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}