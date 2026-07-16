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

const MOCK_USERS_DATA: User[] = [
  {
    id: "mock-user-1",
    clerkId: "mock_clerk_1",
    email: "alice@example.com",
    name: "Alice Johnson",
    role: UserRole.BOTH,
    skills: ["React", "TypeScript"],
    interests: ["Web Development"],
    location: "New York, USA",
    bio: "Full-stack developer.",
    trustScore: 850,
    badges: [],
    createdAt: new Date("2026-07-01"),
    updatedAt: new Date("2026-07-01"),
  },
  {
    id: "mock-user-2",
    clerkId: "mock_clerk_2",
    email: "bob@example.com",
    name: "Bob Martinez",
    role: UserRole.CAN_HELP,
    skills: ["Python", "Data Science"],
    interests: ["Education"],
    location: "London, UK",
    bio: "Data scientist.",
    trustScore: 920,
    badges: [],
    createdAt: new Date("2026-07-10"),
    updatedAt: new Date("2026-07-10"),
  },
];

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
  return MOCK_USERS_DATA.sort((a, b) => b.trustScore - a.trustScore)
    .slice(0, limit)
    .map((u, i) => ({ ...u, rank: i + 1 }));
}

export async function updateTrustScore(userId: string, increment: number) {
  const user = MOCK_USERS_DATA.find((u) => u.id === userId);
  if (!user) return { trustScore: increment };
  return { ...user, trustScore: user.trustScore + increment };
}
