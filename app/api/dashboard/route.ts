import { requireAuth } from "@/lib/api/auth";
import { success, error } from "@/lib/api/response";
import { MOCK_REQUESTS } from "@/lib/mock-data";

export async function GET() {
  try {
    const authUser = await requireAuth();

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
      recentActivity: MOCK_REQUESTS.slice(0, 5),
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
