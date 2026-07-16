import { requireAuth } from "@/lib/api/auth";
import { success, error } from "@/lib/api/response";

export async function GET() {
  try {
    await requireAuth();
    return success({
      daily: { aiRequests: 0, promptsUsed: 0, exports: 0 },
      monthly: { aiRequests: 0, promptsUsed: 0, exports: 0 },
      total: { aiRequests: 0, promptsUsed: 0, exports: 0 },
    });
  } catch (err) {
    return error(err);
  }
}
