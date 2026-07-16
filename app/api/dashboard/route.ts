import { requireAuth } from "@/lib/api/auth";
import { success, error } from "@/lib/api/response";

export async function GET() {
  try {
    await requireAuth();

    return success({
      stats: {
        totalRequests: 0,
        resolvedRequests: 0,
        inProgressRequests: 0,
        conversations: 0,
        unreadNotifications: 0,
        favorites: 0,
        trustScore: 0,
      },
      recentActivity: [],
      usage: {
        daily: { aiRequests: 0, promptsUsed: 0, exports: 0 },
        monthly: { aiRequests: 0, promptsUsed: 0, exports: 0 },
        total: { aiRequests: 0, promptsUsed: 0, exports: 0 },
      },
    });
  } catch (err) {
    return error(err);
  }
}
