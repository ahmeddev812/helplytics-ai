import { requireAuth } from "@/lib/api/auth";
import { success, error } from "@/lib/api/response";

const MOCK_LEADERBOARD = [
  { id: "u1", name: "Alice Johnson", email: "alice@example.com", avatarUrl: null, trustScore: 920, badges: ["TOP_CONTRIBUTOR", "COMMUNITY_LEADER", "HELPER"], role: "BOTH", skills: ["React", "TypeScript", "Next.js"], location: "New York, USA", createdAt: new Date("2026-01-01") },
  { id: "u2", name: "Bob Martinez", email: "bob@example.com", avatarUrl: null, trustScore: 850, badges: ["HELPER", "TRUSTED"], role: "CAN_HELP", skills: ["Python", "Data Science"], location: "London, UK", createdAt: new Date("2026-02-01") },
  { id: "u3", name: "Carol Chen", email: "carol@example.com", avatarUrl: null, trustScore: 720, badges: ["HELPER"], role: "BOTH", skills: ["UI/UX", "Design"], location: "San Francisco, USA", createdAt: new Date("2026-03-01") },
];

export async function GET(req: Request) {
  try {
    await requireAuth();
    const { searchParams } = new URL(req.url);
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20")));

    const sorted = [...MOCK_LEADERBOARD]
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
