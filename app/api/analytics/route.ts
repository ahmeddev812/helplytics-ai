import { requireAuth } from "@/lib/api/auth";
import { success, error } from "@/lib/api/response";
import { getUserAnalytics, getUsageStats } from "@/lib/api/analytics";

export async function GET(req: Request) {
  try {
    const user = await requireAuth();
    const { searchParams } = new URL(req.url);
    const days = Math.min(365, Math.max(1, parseInt(searchParams.get("days") || "30")));
    const scope = searchParams.get("scope") || "usage";

    if (scope === "usage") {
      const usage = await getUsageStats(user.id);
      return success(usage);
    }

    const analytics = await getUserAnalytics(user.id, days);
    return success(analytics);
  } catch (err) {
    return error(err);
  }
}
