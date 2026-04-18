import { UserRole, Badge, UrgencyLevel, RequestStatus } from "@prisma/client";

export interface IUser {
  id: string;
  clerkId: string;
  email: string;
  name: string;
  role: UserRole;
  skills: string[];
  interests: string[];
  location?: string | null;
  bio?: string | null;
  trustScore: number;
  badges: Badge[];
  createdAt: Date;
  updatedAt: Date;
}
