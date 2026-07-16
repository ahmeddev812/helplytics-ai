import { requireAuth } from "@/lib/api/auth";
import { success, error } from "@/lib/api/response";
import { checkRateLimit, getRateLimitKey } from "@/lib/api/rate-limit";
import { MOCK_REQUESTS } from "@/lib/mock-data";
import { z } from "zod";

const CreateRequestSchema = z.object({
  title: z.string().min(5).max(200),
  description: z.string().min(20).max(5000),
  category: z.string().min(1),
  tags: z.array(z.string()).min(1).max(20),
  urgency: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
  aiSummary: z.string().optional(),
});

export async function GET(req: Request) {
  try {
    await requireAuth();
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10")));

    let filtered = [...MOCK_REQUESTS];
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const urgency = searchParams.get("urgency");
    const search = searchParams.get("search");

    if (status) filtered = filtered.filter((r) => r.status === status);
    if (category) filtered = filtered.filter((r) => r.category === category);
    if (urgency) filtered = filtered.filter((r) => r.urgency === urgency);
    if (search) filtered = filtered.filter((r) => r.title.toLowerCase().includes(search.toLowerCase()));

    const total = filtered.length;
    const paginated = filtered.slice((page - 1) * limit, page * limit);

    return success(paginated, 200, { page, limit, total, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    return error(err);
  }
}

export async function POST(req: Request) {
  try {
    const user = await requireAuth();
    checkRateLimit(getRateLimitKey(user.id, "requests"), { windowMs: 60_000, maxRequests: 10 });

    const body = await req.json();
    const parsed = CreateRequestSchema.safeParse(body);
    if (!parsed.success) return error(parsed.error);

    return success({
      id: `req-${Date.now()}`,
      ...parsed.data,
      status: "OPEN",
      userId: user.id,
      helpOffers: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }, 201);
  } catch (err) {
    return error(err);
  }
}
