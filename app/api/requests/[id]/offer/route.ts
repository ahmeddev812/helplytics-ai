import { requireAuth } from "@/lib/api/auth";
import { success, error } from "@/lib/api/response";
import { NotFoundError } from "@/lib/api/errors";
import { checkRateLimit, getRateLimitKey } from "@/lib/api/rate-limit";
import { MOCK_REQUESTS } from "@/lib/mock-data";
import { z } from "zod";

const OfferSchema = z.object({
  message: z.string().min(10).max(2000),
});

export async function POST(req: Request, ctx: RouteContext<"/api/requests/[id]/offer">) {
  try {
    const user = await requireAuth();
    const { id } = await ctx.params;
    checkRateLimit(getRateLimitKey(user.id, "offer"), { windowMs: 60_000, maxRequests: 10 });

    const request = MOCK_REQUESTS.find((r) => r.id === id);
    if (!request) throw new NotFoundError("Request not found");

    const body = await req.json();
    const parsed = OfferSchema.safeParse(body);
    if (!parsed.success) return error(parsed.error);

    return success({
      id: `offer-${Date.now()}`,
      message: parsed.data.message,
      requestId: id,
      userId: user.id,
      status: "PENDING",
      createdAt: new Date(),
    }, 201);
  } catch (err) {
    return error(err);
  }
}
