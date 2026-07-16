import OpenAI from "openai";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api/auth";
import { error, success } from "@/lib/api/response";
import { checkRateLimit, getRateLimitKey } from "@/lib/api/rate-limit";
import { trackDailyUsage } from "@/lib/api/analytics";
import { logger } from "@/lib/api/logger";

const openai = new OpenAI({
  baseURL: process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "",
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    "X-Title": "Helplytics AI",
  },
});

const SYSTEM_PROMPT = `You are Helplytics AI, an intelligent assistant for a community help platform.

Your capabilities:
- Help users optimize and improve their help requests
- Summarize conversations and extract key action points
- Suggest tags, categories, and urgency levels for requests
- Rewrite text professionally
- Break down problems into manageable tasks
- Generate professional responses to help offers

You provide clear, structured, and actionable responses. Keep responses concise and well-formatted.`;

export async function POST(req: Request) {
  try {
    const user = await requireAuth();
    checkRateLimit(getRateLimitKey(user.id, "chat"), { windowMs: 60_000, maxRequests: 30 });

    const { message, conversationId, model } = await req.json();

    if (!message || typeof message !== "string") {
      return error({ message: "Message is required", statusCode: 400 });
    }

    let messages: { role: "user" | "assistant" | "system"; content: string }[] = [
      { role: "system", content: SYSTEM_PROMPT },
    ];

    if (conversationId) {
      const history = await prisma.chatMessage.findMany({
        where: { conversationId, conversation: { userId: user.id } },
        orderBy: { createdAt: "asc" },
        take: 20,
      });
      messages.push(
        ...history.map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        }))
      );
    }

    messages.push({ role: "user", content: message });

    const completion = await openai.chat.completions.create({
      model: model || "openai/gpt-4o-mini",
      messages,
      stream: false,
      max_tokens: 2048,
    });

    const responseText = completion.choices?.[0]?.message?.content || "No response generated";

    if (conversationId) {
      await prisma.$transaction([
        prisma.chatMessage.create({
          data: { role: "user", content: message, conversationId },
        }),
        prisma.chatMessage.create({
          data: { role: "assistant", content: responseText, conversationId },
        }),
        prisma.conversation.update({
          where: { id: conversationId },
          data: { updatedAt: new Date() },
        }),
      ]);
    }

    await trackDailyUsage(user.id, "ai_request");

    return success({
      content: responseText,
      model: completion.model,
      usage: completion.usage,
    });
  } catch (err) {
    logger.error("Chat API error", { error: String(err) });
    return error(err);
  }
}
