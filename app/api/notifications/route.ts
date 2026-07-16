import { requireAuth } from "@/lib/api/auth";
import { success, error } from "@/lib/api/response";
import { z } from "zod";

const CreateNotificationSchema = z.object({
  title: z.string().min(1).max(200),
  message: z.string().min(1).max(1000),
  type: z.enum(["OFFER", "MESSAGE", "RESOLVED", "SYSTEM", "BADGE"]),
});

export async function GET() {
  try {
    await requireAuth();
    return success({ notifications: [], unreadCount: 0 });
  } catch (err) {
    return error(err);
  }
}

export async function POST(req: Request) {
  try {
    await requireAuth();
    const body = await req.json();
    const parsed = CreateNotificationSchema.safeParse(body);
    if (!parsed.success) return error(parsed.error);

    return success({ id: Date.now().toString(), ...parsed.data, read: false, createdAt: new Date() }, 201);
  } catch (err) {
    return error(err);
  }
}

export async function PATCH() {
  try {
    await requireAuth();
    return success({ updated: true });
  } catch (err) {
    return error(err);
  }
}

export async function DELETE() {
  try {
    await requireAuth();
    return success({ received: true });
  } catch (err) {
    return error(err);
  }
}
