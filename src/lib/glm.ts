// GLM (智谱 AI) 客户端配置
import OpenAI from "openai";

export const glmClient = new OpenAI({
  apiKey: process.env.GLM_API_KEY,
  baseURL: process.env.GLM_BASE_URL || "https://open.bigmodel.cn/api/paas/v4",
});

export const GLM_MODEL = "glm-4-flash"; // 使用 flash 模型，性价比高

export async function chatCompletion(messages: Array<{ role: string; content: string }>) {
  const response = await glmClient.chat.completions.create({
    model: GLM_MODEL,
    messages: messages as any,
    stream: false,
  });

  return response.choices[0]?.message?.content || "";
}

export async function* streamChatCompletion(
  messages: Array<{ role: string; content: string }>
) {
  const stream = await glmClient.chat.completions.create({
    model: GLM_MODEL,
    messages: messages as any,
    stream: true,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      yield content;
    }
  }
}