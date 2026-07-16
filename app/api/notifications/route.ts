import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api/auth";
import { success, noContent, error } from "@/lib/api/response";
import { z } from "zod";

const CreateNotificationSchema = z.object({
  title: z.string().min(1).max(200),
  message: z.string().min(1).max(1000),
  type: z.enum(["OFFER", "MESSAGE", "RESOLVED", "SYSTEM", "BADGE"]),
});

export async function GET(req: Request) {
  try {
    const user = await requireAuth();
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20")));
    const filter = searchParams.get("filter");

    const where: Record<string, unknown> = { userId: user.id };
    if (filter === "unread") where.read = false;
    if (filter === "read") where.read = true;

    const [notifications, total, unreadCount] = await Promise.all([
      prisma.notification.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.notification.count({ where }),
      prisma.notification.count({ where: { userId: user.id, read: false } }),
    ]);

    return success(
      { notifications, unreadCount },
      200,
      { page, limit, total, totalPages: Math.ceil(total / limit) }
    );
  } catch (err) {
    return error(err);
  }
}

export async function POST(req: Request) {
  try {
    const user = await requireAuth();
    const body = await req.json();
    const parsed = CreateNotificationSchema.safeParse(body);
    if (!parsed.success) return error(parsed.error);

    const notification = await prisma.notification.create({
      data: { ...parsed.data, userId: user.id },
    });

    return success(notification, 201);
  } catch (err) {
    return error(err);
  }
}

export async function PATCH(req: Request) {
  try {
    const user = await requireAuth();
    const { ids, markAllRead } = await req.json();

    if (markAllRead) {
      await prisma.notification.updateMany({
        where: { userId: user.id, read: false },
        data: { read: true },
      });
      return success({ updated: true });
    }

    if (ids && Array.isArray(ids)) {
      const result = await prisma.notification.updateMany({
        where: { id: { in: ids }, userId: user.id },
        data: { read: true },
      });
      return success({ updated: result.count });
    }

    return error({ message: "No valid operation specified", statusCode: 400 });
  } catch (err) {
    return error(err);
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await requireAuth();
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action");

    if (action === "clear_read") {
      await prisma.notification.deleteMany({
        where: { userId: user.id, read: true },
      });
    } else if (action === "clear_all") {
      await prisma.notification.deleteMany({
        where: { userId: user.id },
      });
    } else {
      return error({ message: "Invalid action. Use 'clear_read' or 'clear_all'", statusCode: 400 });
    }

    return noContent();
  } catch (err) {
    return error(err);
  }
}
