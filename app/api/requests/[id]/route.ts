import { requireAuth } from "@/lib/api/auth";
import { success, noContent, error } from "@/lib/api/response";
import { NotFoundError } from "@/lib/api/errors";
import { MOCK_REQUESTS } from "@/lib/mock-data";
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

    const request = MOCK_REQUESTS.find((r) => r.id === id);
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

    const existing = MOCK_REQUESTS.find((r) => r.id === id);
    if (!existing) throw new NotFoundError("Request not found");

    const body = await req.json();
    const parsed = UpdateRequestSchema.safeParse(body);
    if (!parsed.success) return error(parsed.error);

    return success({ ...existing, ...parsed.data, userId: user.id });
  } catch (err) {
    return error(err);
  }
}

export async function DELETE(_req: Request, ctx: RouteContext<"/api/requests/[id]">) {
  try {
    await requireAuth();
    const { id } = await ctx.params;

    const existing = MOCK_REQUESTS.find((r) => r.id === id);
    if (!existing) throw new NotFoundError("Request not found");
    return noContent();
  } catch (err) {
    return error(err);
  }
}
