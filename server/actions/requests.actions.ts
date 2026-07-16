import { MOCK_REQUESTS } from "@/lib/mock-data";
import { RequestStatus, type Request } from "@/types/backend-mock";
import { auth } from "@clerk/nextjs/server";

const API_BASE = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

interface CreateRequestData {
  title: string;
  description: string;
  category: string;
  tags: string[];
  urgency: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  aiSummary?: string;
}

async function apiCall<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}/api${endpoint}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data ?? data;
  } catch {
    return null;
  }
}

export async function createRequest(clerkId: string, data: CreateRequestData): Promise<Request | null> {
  try {
    const result = await apiCall<Request>("/requests", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (result) return result;
  } catch {}

  return {
    id: `req-${Date.now()}`,
    ...data,
    status: RequestStatus.OPEN,
    userId: clerkId,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Request;
}

export async function getRequests(filters: Record<string, string> = {}): Promise<Request[]> {
  try {
    const params = new URLSearchParams(filters);
    const result = await apiCall<Request[]>(`/requests?${params}`);
    if (result) return result;
  } catch {}

  return MOCK_REQUESTS;
}

export async function getRequestById(id: string): Promise<Request | null> {
  try {
    const result = await apiCall<Request>(`/requests/${id}`);
    if (result) return result;
  } catch {}

  return MOCK_REQUESTS.find((req) => req.id === id) || MOCK_REQUESTS[0] || null;
}

export async function updateRequestStatus(id: string, status: RequestStatus): Promise<Request | null> {
  try {
    const result = await apiCall<Request>(`/requests/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    if (result) return result;
  } catch {}

  const request = MOCK_REQUESTS.find((req) => req.id === id);
  if (!request) return null;
  return { ...request, status };
}

export async function offerHelp(requestId: string, clerkId: string, message: string) {
  try {
    const result = await apiCall(`/requests/${requestId}/offer`, {
      method: "POST",
      body: JSON.stringify({ message }),
    });
    if (result) return result;
  } catch {}

  return {
    id: `offer-${Date.now()}`,
    requestId,
    userId: clerkId,
    message,
    status: "PENDING",
    createdAt: new Date(),
  };
}

export async function markAsSolved(requestId: string, helperId: string): Promise<Request | null> {
  try {
    const result = await apiCall<Request>(`/requests/${requestId}`, {
      method: "PATCH",
      body: JSON.stringify({ status: "RESOLVED", helperId }),
    });
    if (result) return result;
  } catch {}

  const request = MOCK_REQUESTS.find((req) => req.id === requestId);
  if (!request) return null;
  return {
    ...request,
    status: RequestStatus.RESOLVED,
    helperId,
    solvedAt: new Date(),
  };
}
