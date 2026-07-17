import { requireAuth } from "@/lib/api/auth";
import { success, error } from "@/lib/api/response";
import { NotFoundError } from "@/lib/api/errors";
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

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth();
    const { id } = await ctx.params;
    throw new NotFoundError("Request not found");
  } catch (err) {
    return error(err);
  }
}

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth();
    const { id } = await ctx.params;
    throw new NotFoundError("Request not found");
  } catch (err) {
    return error(err);
  }
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth();
    const { id } = await ctx.params;
    throw new NotFoundError("Request not found");
  } catch (err) {
    return error(err);
  }
}
