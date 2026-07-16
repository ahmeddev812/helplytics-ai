import { requireAuth } from "@/lib/api/auth";
import { success, noContent, error } from "@/lib/api/response";
import { NotFoundError } from "@/lib/api/errors";
import { z } from "zod";

const UpdateSchema = z.object({
  read: z.boolean().optional(),
});

export async function PATCH(req: Request, ctx: RouteContext<"/api/notifications/[id]">) {
  try {
    await requireAuth();
    const { id } = await ctx.params;

    const body = await req.json();
    const parsed = UpdateSchema.safeParse(body);
    if (!parsed.success) return error(parsed.error);

    return success({ id, ...parsed.data });
  } catch (err) {
    return error(err);
  }
}

export async function DELETE(_req: Request, ctx: RouteContext<"/api/notifications/[id]">) {
  try {
    await requireAuth();
    const { id } = await ctx.params;
    if (!id) throw new NotFoundError("Notification not found");
    return noContent();
  } catch (err) {
    return error(err);
  }
}
