import { requireAuth } from "@/lib/api/auth";
import { success, error } from "@/lib/api/response";
import { checkRateLimit, getRateLimitKey } from "@/lib/api/rate-limit";
import { z } from "zod";

const CreateRequestSchema = z.object({
  title: z.string().min(5).max(200),
  description: z.string().min(20).max(5000),
  category: z.string().min(1),
  tags: z.array(z.string()).min(1).max(20),
  urgency: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
  aiSummary: z.string().optional(),
});

export async function GET() {
  try {
    await requireAuth();
    return success([], 200, { page: 1, limit: 10, total: 0, totalPages: 0 });
  } catch (err) {
    return error(err);
  }
}

export async function POST(req: Request) {
  try {
    const user = await requireAuth();
    checkRateLimit(getRateLimitKey(user.id, "requests"), { windowMs: 60_000, maxRequests: 10 });

    const body = await req.json();
    const parsed = CreateRequestSchema.safeParse(body);
    if (!parsed.success) return error(parsed.error);

    return success({
      id: `req-${Date.now()}`,
      ...parsed.data,
      status: "OPEN",
      userId: user.id,
      helpOffers: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }, 201);
  } catch (err) {
    return error(err);
  }
}
