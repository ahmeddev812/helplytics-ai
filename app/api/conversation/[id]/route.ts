import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api/auth";
import { success, noContent, error } from "@/lib/api/response";
import { NotFoundError, ForbiddenError } from "@/lib/api/errors";
import { z } from "zod";

const UpdateConversationSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  favorite: z.boolean().optional(),
});

export async function GET(_req: Request, ctx: RouteContext<"/api/conversation/[id]">) {
  try {
    const user = await requireAuth();
    const { id } = await ctx.params;

    const conversation = await prisma.conversation.findUnique({
      where: { id },
      include: {
        messages: { orderBy: { createdAt: "asc" } },
      },
    });

    if (!conversation) throw new NotFoundError("Conversation not found");
    if (conversation.userId !== user.id) throw new ForbiddenError();

    return success(conversation);
  } catch (err) {
    return error(err);
  }
}

export async function PATCH(req: Request, ctx: RouteContext<"/api/conversation/[id]">) {
  try {
    const user = await requireAuth();
    const { id } = await ctx.params;

    const conversation = await prisma.conversation.findUnique({ where: { id } });
    if (!conversation) throw new NotFoundError("Conversation not found");
    if (conversation.userId !== user.id) throw new ForbiddenError();

    const body = await req.json();
    const parsed = UpdateConversationSchema.safeParse(body);
    if (!parsed.success) return error(parsed.error);

    const updated = await prisma.conversation.update({
      where: { id },
      data: parsed.data,
    });

    return success(updated);
  } catch (err) {
    return error(err);
  }
}

export async function DELETE(_req: Request, ctx: RouteContext<"/api/conversation/[id]">) {
  try {
    const user = await requireAuth();
    const { id } = await ctx.params;

    const conversation = await prisma.conversation.findUnique({ where: { id } });
    if (!conversation) throw new NotFoundError("Conversation not found");
    if (conversation.userId !== user.id) throw new ForbiddenError();

    await prisma.conversation.delete({ where: { id } });
    return noContent();
  } catch (err) {
    return error(err);
  }
}
