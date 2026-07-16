import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api/auth";
import { success, error } from "@/lib/api/response";
import { trackDailyUsage } from "@/lib/api/analytics";

export async function GET(req: Request) {
  try {
    const user = await requireAuth();
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20")));
    const search = searchParams.get("search");
    const category = searchParams.get("category");

    const where: Record<string, unknown> = { userId: user.id };
    if (search) where.prompt = { contains: search, mode: "insensitive" };
    if (category) where.category = category;

    const [history, total] = await Promise.all([
      prisma.promptHistory.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.promptHistory.count({ where }),
    ]);

    return success(history, 200, {
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
    const { prompt, response, category } = await req.json();

    if (!prompt || !response) {
      return error({ message: "Prompt and response are required", statusCode: 400 });
    }

    const history = await prisma.promptHistory.create({
      data: {
        prompt,
        response,
        category: category || null,
        userId: user.id,
      },
    });

    await trackDailyUsage(user.id, "prompt");

    return success(history, 201);
  } catch (err) {
    return error(err);
  }
}
