import { requireAuth } from "@/lib/api/auth";
import { success, error } from "@/lib/api/response";
import { uploadFile, getUploadsByUser } from "@/lib/api/upload";
import { checkRateLimit, getRateLimitKey } from "@/lib/api/rate-limit";

export async function GET(req: Request) {
  try {
    const user = await requireAuth();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || undefined;

    const uploads = await getUploadsByUser(user.id, category);
    return success(uploads);
  } catch (err) {
    return error(err);
  }
}

export async function POST(req: Request) {
  try {
    const user = await requireAuth();
    checkRateLimit(getRateLimitKey(user.id, "upload"), { windowMs: 60_000, maxRequests: 20 });

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const category = (formData.get("category") as string) || "image";

    if (!file) {
      return error({ message: "No file provided", statusCode: 400 });
    }

    const result = await uploadFile({ userId: user.id, file, category });
    return success(result, 201);
  } catch (err) {
    return error(err);
  }
}
