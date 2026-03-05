import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { streamChatCompletion } from "@/lib/glm";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { message, conversationId } = body;

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // 获取或创建用户
    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { clerkId: userId },
      });
    }

    let conversation;

    if (conversationId) {
      conversation = await prisma.conversation.findFirst({
        where: { id: conversationId, userId: user.id },
        include: { messages: { orderBy: { createdAt: "asc" } } },
      });
    }

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          userId: user.id,
          title: message.slice(0, 50),
          messages: {
            create: {
              role: "SYSTEM",
              content: `你是 AI Learn 的学习助手。你专门帮助用户学习人工智能相关知识，包括：
- 机器学习和深度学习基础
- 大语言模型（LLM）的原理和应用
- Prompt Engineering 技巧
- RAG、Agent 等应用架构
- AI 行业动态和前沿技术

请用中文回答，保持专业但易懂的风格。如果用户问的问题超出 AI 学习范围，礼貌地引导回到 AI 话题。`,
            },
          },
        },
        include: { messages: { orderBy: { createdAt: "asc" } } },
      });
    }

    // 保存用户消息
    await prisma.message.create({
      data: {
        conversationId: conversation.id,
        role: "USER",
        content: message,
      },
    });

    // 构建消息历史
    const messages = [
      ...conversation.messages.map((m) => ({
        role: m.role.toLowerCase() === "user" ? "user" : m.role.toLowerCase() === "assistant" ? "assistant" : "system",
        content: m.content,
      })),
      { role: "user", content: message },
    ];

    // 创建流式响应
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        let fullContent = "";

        try {
          for await (const chunk of streamChatCompletion(messages)) {
            fullContent += chunk;
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: chunk })}\n\n`));
          }

          // 保存助手回复
          await prisma.message.create({
            data: {
              conversationId: conversation.id,
              role: "ASSISTANT",
              content: fullContent,
            },
          });

          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true, conversationId: conversation.id })}\n\n`));
          controller.close();
        } catch (error) {
          console.error("Stream error:", error);
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: "Stream failed" })}\n\n`));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        conversations: {
          orderBy: { updatedAt: "desc" },
          take: 20,
        },
      },
    });

    if (!user) {
      return NextResponse.json({ conversations: [] });
    }

    return NextResponse.json({ conversations: user.conversations });
  } catch (error) {
    console.error("Get conversations error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}