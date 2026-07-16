import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api/auth";
import { success, error } from "@/lib/api/response";
import { NotFoundError, ConflictError } from "@/lib/api/errors";
import { checkRateLimit, getRateLimitKey } from "@/lib/api/rate-limit";
import { z } from "zod";

const OfferSchema = z.object({
  message: z.string().min(10).max(2000),
});

export async function POST(req: Request, ctx: RouteContext<"/api/requests/[id]/offer">) {
  try {
    const user = await requireAuth();
    const { id } = await ctx.params;
    checkRateLimit(getRateLimitKey(user.id, "offer"), { windowMs: 60_000, maxRequests: 10 });

    const request = await prisma.request.findUnique({ where: { id } });
    if (!request) throw new NotFoundError("Request not found");
    if (request.userId === user.id) {
      return error({ message: "Cannot offer help on your own request", statusCode: 400 });
    }

    const existingOffer = await prisma.helpOffer.findFirst({
      where: { requestId: id, userId: user.id },
    });
    if (existingOffer) throw new ConflictError("You already offered help on this request");

    const body = await req.json();
    const parsed = OfferSchema.safeParse(body);
    if (!parsed.success) return error(parsed.error);

    const offer = await prisma.helpOffer.create({
      data: {
        message: parsed.data.message,
        requestId: id,
        userId: user.id,
      },
      include: {
        user: { select: { id: true, name: true, avatarUrl: true, trustScore: true } },
      },
    });

    await prisma.notification.create({
      data: {
        userId: request.userId,
        title: "New Help Offer",
        message: `${user.name} offered to help with "${request.title}"`,
        type: "OFFER",
      },
    });

    return success(offer, 201);
  } catch (err) {
    return error(err);
  }
}
