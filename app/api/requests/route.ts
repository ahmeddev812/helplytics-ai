import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api/auth";
import { success, created, error } from "@/lib/api/response";
import { checkRateLimit, getRateLimitKey } from "@/lib/api/rate-limit";
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
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const urgency = searchParams.get("urgency");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "newest";
    const userId = searchParams.get("userId");

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (category) where.category = category;
    if (urgency) where.urgency = urgency;
    if (userId) where.userId = userId;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { tags: { has: search } },
      ];
    }

    const orderBy: Record<string, string> =
      sort === "urgency" ? { urgency: "desc" } :
      sort === "title" ? { title: "asc" } :
      { createdAt: "desc" };

    const [requests, total] = await Promise.all([
      prisma.request.findMany({
        where,
        include: {
          user: { select: { id: true, name: true, avatarUrl: true, trustScore: true, badges: true } },
          _count: { select: { helpOffers: true } },
        },
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.request.count({ where }),
    ]);

    return success(requests, 200, {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
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

    const request = await prisma.request.create({
      data: {
        ...parsed.data,
        userId: user.id,
      },
      include: {
        user: { select: { id: true, name: true, avatarUrl: true, trustScore: true } },
      },
    });

    return created(request);
  } catch (err) {
    return error(err);
  }
}
