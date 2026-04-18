import { MOCK_USERS } from "@/lib/mock-data";
import { UserRole } from "@/types/backend-mock";

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

export async function getUserByClerkId(clerkId: string) {
  return MOCK_USERS.find(user => user.clerkId === clerkId) || MOCK_USERS[0];
}

export async function updateUserProfile(clerkId: string, data: any) {
  const user = MOCK_USERS.find(u => u.clerkId === clerkId) || MOCK_USERS[0];
  return { ...user, ...data };
}

export async function getLeaderboard(limit = 10) {
  return MOCK_USERS.sort((a, b) => b.trustScore - a.trustScore).slice(0, limit);
}

export async function updateTrustScore(userId: string, increment: number) {
  const user = MOCK_USERS.find(u => u.id === userId) || MOCK_USERS[0];
  return { ...user, trustScore: user.trustScore + increment };
}
