import OpenAI from "openai";
import { requireAuth } from "@/lib/api/auth";
import { error, success } from "@/lib/api/response";
import { checkRateLimit, getRateLimitKey } from "@/lib/api/rate-limit";
import { logger } from "@/lib/api/logger";

const openai = new OpenAI({
  baseURL: process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "",
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "",
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

    const { message, model } = await req.json();

    if (!message || typeof message !== "string") {
      return error({ message: "Message is required", statusCode: 400 });
    }

    const messages: { role: "user" | "assistant" | "system"; content: string }[] = [
      { role: "system", content: SYSTEM_PROMPT },
    ];

    messages.push({ role: "user", content: message });

    const completion = await openai.chat.completions.create({
      model: model || "openai/gpt-4o-mini",
      messages,
      stream: false,
      max_tokens: 2048,
    });

    const responseText = completion.choices?.[0]?.message?.content || "No response generated";

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
