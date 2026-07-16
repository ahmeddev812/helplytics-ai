import { requireAuth } from "@/lib/api/auth";
import { success, error } from "@/lib/api/response";
import { NotFoundError } from "@/lib/api/errors";
import { checkRateLimit, getRateLimitKey } from "@/lib/api/rate-limit";
import { z } from "zod";

const OfferSchema = z.object({
  message: z.string().min(10).max(2000),
});

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireAuth();
    const { id } = await ctx.params;
    checkRateLimit(getRateLimitKey(user.id, "offer"), { windowMs: 60_000, maxRequests: 10 });

    throw new NotFoundError("Request not found");
  } catch (err) {
    return error(err);
  }
}
