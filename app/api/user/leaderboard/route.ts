import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api/auth";
import { success, error } from "@/lib/api/response";

export async function GET(req: Request) {
  try {
    await requireAuth();
    const { searchParams } = new URL(req.url);
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20")));

    const users = await prisma.user.findMany({
      orderBy: { trustScore: "desc" },
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        trustScore: true,
        badges: true,
        role: true,
        skills: true,
        location: true,
        createdAt: true,
        _count: {
          select: {
            requests: { where: { status: "RESOLVED" } },
            helpOffers: true,
          },
        },
      },
    });

    return success(
      users.map((u: { id: string; name: string | null; email: string | null; avatarUrl: string | null; trustScore: number; badges: string[]; role: string; skills: string[]; location: string | null; _count: { requests: number; helpOffers: number }; createdAt: Date }, i: number) => ({
        rank: i + 1,
        id: u.id,
        name: u.name,
        email: u.email,
        avatarUrl: u.avatarUrl,
        trustScore: u.trustScore,
        badges: u.badges,
        role: u.role,
        skills: u.skills,
        location: u.location,
        resolvedRequests: u._count.requests,
        helpOffers: u._count.helpOffers,
        memberSince: u.createdAt,
      }))
    );
  } catch (err) {
    return error(err);
  }
}
