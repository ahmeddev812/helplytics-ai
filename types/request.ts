import { UrgencyLevel, RequestStatus, UserRole } from "./backend-mock";
import { IUser } from "./user";

export interface IRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  urgency: UrgencyLevel;
  status: RequestStatus;
  aiSummary?: string | null;
  userId: string;
  user: IUser;
  helperId?: string | null;
  solvedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IHelpOffer {
  id: string;
  message: string;
  status: string;
  requestId: string;
  userId: string;
  user: IUser;
  createdAt: Date;
}

export interface IMessage {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  requestId?: string | null;
  read: boolean;
  createdAt: Date;
}

export interface INotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: Date;
}
