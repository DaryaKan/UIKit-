export type RequestStatus = "pending" | "approved" | "rejected";

export interface ChangeRequest {
  id: string;
  componentName: string;
  properties: Record<string, unknown>;
  description: string;
  authorName: string;
  status: RequestStatus;
  createdAt: string;
  reviewedAt?: string;
  reviewComment?: string;
}

const STORAGE_KEY = "uikit_change_requests";

function load(): ChangeRequest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function save(requests: ChangeRequest[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
}

export function getAllRequests(): ChangeRequest[] {
  return load().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getRequestsByStatus(status: RequestStatus): ChangeRequest[] {
  return getAllRequests().filter((r) => r.status === status);
}

export function getApprovedByComponent(
  componentName: string
): ChangeRequest | undefined {
  return load()
    .filter((r) => r.status === "approved" && r.componentName === componentName)
    .sort(
      (a, b) =>
        new Date(b.reviewedAt || b.createdAt).getTime() -
        new Date(a.reviewedAt || a.createdAt).getTime()
    )[0];
}

export function createRequest(
  data: Omit<ChangeRequest, "id" | "status" | "createdAt">
): ChangeRequest {
  const requests = load();
  const request: ChangeRequest = {
    ...data,
    id: crypto.randomUUID(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  requests.push(request);
  save(requests);
  return request;
}

export function approveRequest(id: string, comment?: string) {
  const requests = load();
  const idx = requests.findIndex((r) => r.id === id);
  if (idx === -1) return;
  requests[idx].status = "approved";
  requests[idx].reviewedAt = new Date().toISOString();
  requests[idx].reviewComment = comment;
  save(requests);
}

export function rejectRequest(id: string, comment?: string) {
  const requests = load();
  const idx = requests.findIndex((r) => r.id === id);
  if (idx === -1) return;
  requests[idx].status = "rejected";
  requests[idx].reviewedAt = new Date().toISOString();
  requests[idx].reviewComment = comment;
  save(requests);
}

export function deleteRequest(id: string) {
  const requests = load().filter((r) => r.id !== id);
  save(requests);
}
