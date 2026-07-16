import { requireAuth } from "@/lib/api/auth";
import { success, noContent, error } from "@/lib/api/response";
import { NotFoundError } from "@/lib/api/errors";
import { z } from "zod";

const UpdateConversationSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  favorite: z.boolean().optional(),
});

export async function GET(_req: Request, ctx: RouteContext<"/api/conversation/[id]">) {
  try {
    await requireAuth();
    const { id } = await ctx.params;
    return success({ id, title: "Conversation", messages: [], favorite: false, createdAt: new Date(), updatedAt: new Date() });
  } catch (err) {
    return error(err);
  }
}

export async function PATCH(req: Request, ctx: RouteContext<"/api/conversation/[id]">) {
  try {
    await requireAuth();
    const { id } = await ctx.params;

    const body = await req.json();
    const parsed = UpdateConversationSchema.safeParse(body);
    if (!parsed.success) return error(parsed.error);

    return success({ id, ...parsed.data });
  } catch (err) {
    return error(err);
  }
}

export async function DELETE(_req: Request, ctx: RouteContext<"/api/conversation/[id]">) {
  try {
    await requireAuth();
    const { id } = await ctx.params;
    if (!id) throw new NotFoundError("Conversation not found");
    return noContent();
  } catch (err) {
    return error(err);
  }
}
