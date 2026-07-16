export enum UserRole {
  NEED_HELP = "NEED_HELP",
  CAN_HELP = "CAN_HELP",
  BOTH = "BOTH",
}

export enum UrgencyLevel {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export enum RequestStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  RESOLVED = "RESOLVED",
  CLOSED = "CLOSED",
}

export enum Badge {
  HELPER = "HELPER",
  PROBLEM_SOLVER = "PROBLEM_SOLVER",
  TRUSTED = "TRUSTED",
  COMMUNITY_LEADER = "COMMUNITY_LEADER",
  TOP_CONTRIBUTOR = "TOP_CONTRIBUTOR",
}

export interface User {
  id: string;
  clerkId: string;
  email: string;
  name: string;
  role: UserRole;
  skills: string[];
  interests: string[];
  avatarUrl?: string | null;
  location?: string | null;
  bio?: string | null;
  trustScore: number;
  badges: Badge[];
  createdAt: Date;
  updatedAt: Date;
  requests?: Request[];
  helpOffers?: HelpOffer[];
  notifications?: Notification[];
}

export interface Request {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  urgency: UrgencyLevel;
  status: RequestStatus;
  aiSummary?: string | null;
  userId: string;
  user?: User;
  helperId?: string | null;
  solvedAt?: Date | null;
  helpOffers?: HelpOffer[];
  createdAt: Date;
  updatedAt: Date;
}

export interface HelpOffer {
  id: string;
  message: string;
  status: string;
  requestId: string;
  request?: Request;
  userId: string;
  user?: User;
  createdAt: Date;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  sender?: User;
  receiverId: string;
  requestId?: string | null;
  read: boolean;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  user?: User;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: Date;
}
