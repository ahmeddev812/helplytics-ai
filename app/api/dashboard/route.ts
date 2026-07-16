import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api/auth";
import { success, error } from "@/lib/api/response";
import { getUsageStats } from "@/lib/api/analytics";

export async function GET() {
  try {
    const authUser = await requireAuth();

    const [user, ...results] = await Promise.all([
      prisma.user.findUnique({
        where: { id: authUser.id },
        select: { trustScore: true },
      }),
      prisma.request.count({ where: { userId: authUser.id } }),
      prisma.request.count({ where: { userId: authUser.id, status: "RESOLVED" } }),
      prisma.request.count({ where: { userId: authUser.id, status: "IN_PROGRESS" } }),
      prisma.notification.count({ where: { userId: authUser.id, read: false } }),
      prisma.request.findMany({
        where: { userId: authUser.id },
        orderBy: { updatedAt: "desc" },
        take: 5,
        select: {
          id: true,
          title: true,
          status: true,
          urgency: true,
          createdAt: true,
        },
      }),
      prisma.conversation.count({ where: { userId: authUser.id } }),
      getUsageStats(authUser.id),
      prisma.favorite.count({ where: { userId: authUser.id } }),
    ]);

    const [totalRequests, resolvedRequests, inProgressRequests, notifications, recentActivity, conversations, usage, favorites] = results;

    return success({
      stats: {
        totalRequests,
        resolvedRequests,
        inProgressRequests,
        conversations,
        unreadNotifications: notifications,
        favorites,
        trustScore: user?.trustScore || 0,
      },
      recentActivity,
      usage,
    });
  } catch (err) {
    return error(err);
  }
}
