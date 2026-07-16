import { MOCK_USERS } from "@/lib/mock-data";
import { UserRole, type User } from "@/types/backend-mock";

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
};

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

export async function getUserByClerkId(_clerkId: string): Promise<ApiUser | null> {
  return null;
}

export async function updateUserProfile(_clerkId: string, data: UserProfile) {
  return data;
}

export async function getLeaderboard(limit = 10) {
  return MOCK_USERS.sort((a, b) => b.trustScore - a.trustScore)
    .slice(0, limit)
    .map((u, i) => ({ ...u, rank: i + 1 }));
}

export async function updateTrustScore(userId: string, increment: number) {
  const user = MOCK_USERS.find((u) => u.id === userId);
  if (!user) return { trustScore: increment };
  return { ...user, trustScore: user.trustScore + increment };
}
