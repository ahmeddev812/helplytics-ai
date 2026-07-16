import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api/auth";
import { success, created, error } from "@/lib/api/response";
import { checkRateLimit, getRateLimitKey } from "@/lib/api/rate-limit";
import { z } from "zod";

const CreateConversationSchema = z.object({
  title: z.string().min(1).max(200),
});

export async function GET(req: Request) {
  try {
    const user = await requireAuth();
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20")));
    const search = searchParams.get("search");
    const favorite = searchParams.get("favorite") === "true";

    const where: Record<string, unknown> = { userId: user.id };
    if (search) where.title = { contains: search, mode: "insensitive" };
    if (favorite) where.favorite = true;

    const [conversations, total] = await Promise.all([
      prisma.conversation.findMany({
        where,
        include: { _count: { select: { messages: true } } },
        orderBy: { updatedAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.conversation.count({ where }),
    ]);

    return success(
      conversations.map((c) => ({
        id: c.id,
        title: c.title,
        favorite: c.favorite,
        messageCount: c._count.messages,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
      })),
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
    checkRateLimit(getRateLimitKey(user.id, "conversation"), { windowMs: 60_000, maxRequests: 20 });

    const body = await req.json();
    const parsed = CreateConversationSchema.safeParse(body);
    if (!parsed.success) return error(parsed.error);

    const conversation = await prisma.conversation.create({
      data: { title: parsed.data.title, userId: user.id },
    });

    return created(conversation);
  } catch (err) {
    return error(err);
  }
}
