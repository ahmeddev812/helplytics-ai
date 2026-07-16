import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api/auth";
import { success, noContent, error } from "@/lib/api/response";
import { NotFoundError, ForbiddenError } from "@/lib/api/errors";
import { z } from "zod";

const UpdateSchema = z.object({
  read: z.boolean().optional(),
});

export async function PATCH(req: Request, ctx: RouteContext<"/api/notifications/[id]">) {
  try {
    const user = await requireAuth();
    const { id } = await ctx.params;

    const notification = await prisma.notification.findUnique({ where: { id } });
    if (!notification) throw new NotFoundError("Notification not found");
    if (notification.userId !== user.id) throw new ForbiddenError();

    const body = await req.json();
    const parsed = UpdateSchema.safeParse(body);
    if (!parsed.success) return error(parsed.error);

    const updated = await prisma.notification.update({
      where: { id },
      data: parsed.data,
    });

    return success(updated);
  } catch (err) {
    return error(err);
  }
}

export async function DELETE(_req: Request, ctx: RouteContext<"/api/notifications/[id]">) {
  try {
    const user = await requireAuth();
    const { id } = await ctx.params;

    const notification = await prisma.notification.findUnique({ where: { id } });
    if (!notification) throw new NotFoundError("Notification not found");
    if (notification.userId !== user.id) throw new ForbiddenError();

    await prisma.notification.delete({ where: { id } });
    return noContent();
  } catch (err) {
    return error(err);
  }
}
