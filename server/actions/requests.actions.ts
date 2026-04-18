import { MOCK_REQUESTS, MOCK_USERS } from "@/lib/mock-data";
import { RequestStatus } from "@/types/backend-mock";

export async function createRequest(clerkId: string, data: any) {
  return {
    id: `req-${Date.now()}`,
    ...data,
    userId: "user1",
    user: MOCK_USERS[0],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export async function getRequests(filters: any = {}) {
  return MOCK_REQUESTS;
}

export async function getRequestById(id: string) {
  return MOCK_REQUESTS.find(req => req.id === id) || MOCK_REQUESTS[0];
}

export async function updateRequestStatus(id: string, status: RequestStatus) {
  const request = MOCK_REQUESTS.find(req => req.id === id) || MOCK_REQUESTS[0];
  return { ...request, status };
}

export async function offerHelp(requestId: string, clerkId: string, message: string) {
  return {
    id: `offer-${Date.now()}`,
    requestId,
    userId: "user2",
    user: MOCK_USERS[1],
    message,
    status: "PENDING",
    createdAt: new Date(),
  };
}

export async function markAsSolved(requestId: string, helperId: string) {
  const request = MOCK_REQUESTS.find(req => req.id === requestId) || MOCK_REQUESTS[0];
  return {
    ...request,
    status: RequestStatus.RESOLVED,
    helperId,
    solvedAt: new Date(),
  };
}
