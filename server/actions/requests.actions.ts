import { MOCK_REQUESTS } from "@/lib/mock-data";
import { RequestStatus, type Request } from "@/types/backend-mock";

interface CreateRequestData {
  title: string;
  description: string;
  category: string;
  tags: string[];
  urgency: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  aiSummary?: string;
}

export async function createRequest(clerkId: string, data: CreateRequestData): Promise<Request | null> {
  return {
    id: `req-${Date.now()}`,
    ...data,
    status: RequestStatus.OPEN,
    userId: clerkId,
    helpOffers: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Request;
}

export async function getRequests(filters: Record<string, string> = {}): Promise<Request[]> {
  let filtered = [...MOCK_REQUESTS];
  if (filters.status) filtered = filtered.filter((r) => r.status === filters.status);
  if (filters.category) filtered = filtered.filter((r) => r.category === filters.category);
  return filtered;
}

export async function getRequestById(id: string): Promise<Request | null> {
  return MOCK_REQUESTS.find((req) => req.id === id) || MOCK_REQUESTS[0] || null;
}

export async function updateRequestStatus(id: string, status: RequestStatus): Promise<Request | null> {
  const request = MOCK_REQUESTS.find((req) => req.id === id);
  if (!request) return null;
  return { ...request, status };
}

export async function offerHelp(requestId: string, _clerkId: string, message: string) {
  return {
    id: `offer-${Date.now()}`,
    requestId,
    userId: _clerkId,
    message,
    status: "PENDING",
    createdAt: new Date(),
  };
}

export async function markAsSolved(requestId: string, helperId: string): Promise<Request | null> {
  const request = MOCK_REQUESTS.find((req) => req.id === requestId);
  if (!request) return null;
  return {
    ...request,
    status: RequestStatus.RESOLVED,
    helperId,
    solvedAt: new Date(),
  };
}
