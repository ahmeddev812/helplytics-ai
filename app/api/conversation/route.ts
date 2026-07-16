import { requireAuth } from "@/lib/api/auth";
import { success, error } from "@/lib/api/response";
import { checkRateLimit, getRateLimitKey } from "@/lib/api/rate-limit";
import { z } from "zod";

const CreateConversationSchema = z.object({
  title: z.string().min(1).max(200),
});

export async function GET() {
  try {
    await requireAuth();
    return success([]);
  } catch (err) {
    return error(err);
  }
}

export async function POST(req: Request) {
  try {
    const user = await requireAuth();
    checkRateLimit(getRateLimitKey(user.id, "conversation"), { windowMs: 60_000, maxRequests: 20 });

    const body = await req.json();
    const parsed = CreateConversationSchema.safeParse(body);
    if (!parsed.success) return error(parsed.error);

    return success({ id: Date.now().toString(), title: parsed.data.title, userId: user.id, favorite: false, createdAt: new Date(), updatedAt: new Date() }, 201);
  } catch (err) {
    return error(err);
  }
}
