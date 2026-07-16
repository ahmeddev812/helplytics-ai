import { MOCK_USERS } from "@/lib/mock-data";
import { UserRole, type User } from "@/types/backend-mock";

const API_BASE = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

interface UserProfile {
  name?: string;
  role?: string;
  skills?: string[];
  interests?: string[];
  location?: string | null;
  bio?: string | null;
}

type ApiUser = User & {
  stats?: { totalRequests: number; totalHelpOffers: number; totalConversations: number };
  _count?: { requests: number; helpOffers: number; conversations: number };
};

async function apiCall<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}/api${endpoint}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
    if (!res.ok) return null;
    const json = await res.json();
    return (json.data ?? json) as T;
  } catch {
    return null;
  }
}

export async function createUser(clerkId: string, email: string, name: string) {
  return {
    id: `new-user-${Date.now()}`,
    clerkId,
    email,
    name,
    role: UserRole.BOTH,
    skills: [],
    interests: [],
    trustScore: 0,
    badges: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export async function getUserByClerkId(clerkId: string): Promise<ApiUser | null> {
  try {
    const result = await apiCall<ApiUser>("/user");
    if (result) return result;
  } catch {}

  return MOCK_USERS.find((user) => user.clerkId === clerkId) || MOCK_USERS[0] || null;
}

export async function updateUserProfile(clerkId: string, data: UserProfile) {
  try {
    const result = await apiCall<Record<string, unknown>>("/user", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    if (result) return result;
  } catch {}

  const user = MOCK_USERS.find((u) => u.clerkId === clerkId) || MOCK_USERS[0];
  return { ...user, ...data };
}

export async function getLeaderboard(limit = 10) {
  try {
    const result = await apiCall<ApiUser[]>(`/user/leaderboard?limit=${limit}`);
    if (result && Array.isArray(result)) return result;
  } catch {}

  return MOCK_USERS.sort((a, b) => b.trustScore - a.trustScore)
    .slice(0, limit)
    .map((u, i) => ({ ...u, rank: i + 1 }));
}

export async function updateTrustScore(userId: string, increment: number) {
  const user = MOCK_USERS.find((u) => u.id === userId) || MOCK_USERS[0];
  return { ...user, trustScore: user.trustScore + increment };
}
