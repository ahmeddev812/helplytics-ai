import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api/auth";
import { success, noContent, error } from "@/lib/api/response";
import { NotFoundError, ForbiddenError } from "@/lib/api/errors";
import { z } from "zod";

const UpdateRequestSchema = z.object({
  title: z.string().min(5).max(200).optional(),
  description: z.string().min(20).max(5000).optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).min(1).optional(),
  urgency: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
  status: z.enum(["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"]).optional(),
  aiSummary: z.string().optional(),
  helperId: z.string().optional(),
});

export async function GET(_req: Request, ctx: RouteContext<"/api/requests/[id]">) {
  try {
    await requireAuth();
    const { id } = await ctx.params;

    const request = await prisma.request.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, avatarUrl: true, trustScore: true, badges: true } },
        helpOffers: {
          include: {
            user: { select: { id: true, name: true, avatarUrl: true, trustScore: true, badges: true } },
          },
          orderBy: { createdAt: "desc" },
        },
        _count: { select: { helpOffers: true } },
      },
    });

    if (!request) throw new NotFoundError("Request not found");
    return success(request);
  } catch (err) {
    return error(err);
  }
}

export async function PATCH(req: Request, ctx: RouteContext<"/api/requests/[id]">) {
  try {
    const user = await requireAuth();
    const { id } = await ctx.params;

    const existing = await prisma.request.findUnique({ where: { id } });
    if (!existing) throw new NotFoundError("Request not found");
    if (existing.userId !== user.id) throw new ForbiddenError();

    const body = await req.json();
    const parsed = UpdateRequestSchema.safeParse(body);
    if (!parsed.success) return error(parsed.error);

    const data: Record<string, unknown> = { ...parsed.data };
    if (data.status === "RESOLVED" && existing.status !== "RESOLVED") {
      data.solvedAt = new Date();
    }

    const updated = await prisma.request.update({
      where: { id },
      data,
      include: {
        user: { select: { id: true, name: true, avatarUrl: true, trustScore: true } },
      },
    });

    return success(updated);
  } catch (err) {
    return error(err);
  }
}

export async function DELETE(_req: Request, ctx: RouteContext<"/api/requests/[id]">) {
  try {
    const user = await requireAuth();
    const { id } = await ctx.params;

    const existing = await prisma.request.findUnique({ where: { id } });
    if (!existing) throw new NotFoundError("Request not found");
    if (existing.userId !== user.id) throw new ForbiddenError();

    await prisma.request.delete({ where: { id } });
    return noContent();
  } catch (err) {
    return error(err);
  }
}
