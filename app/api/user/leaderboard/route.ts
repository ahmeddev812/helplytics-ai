import { requireAuth } from "@/lib/api/auth";
import { success, error } from "@/lib/api/response";
import { MOCK_USERS } from "@/lib/mock-data";

export async function GET(req: Request) {
  try {
    await requireAuth();
    const { searchParams } = new URL(req.url);
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20")));

    const sorted = [...MOCK_USERS]
      .sort((a, b) => b.trustScore - a.trustScore)
      .slice(0, limit)
      .map((u, i) => ({
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
        memberSince: u.createdAt,
      }));

    return success(sorted);
  } catch (err) {
    return error(err);
  }
}
