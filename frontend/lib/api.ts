const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  const payload = (await response.json()) as { success?: boolean; message?: string; data?: T };
  if (!response.ok || payload.success === false) throw new Error(payload.message || "Request failed");
  return payload.data as T;
}

export type AuthResponse = { token: string; user: { id: string; name: string; email: string; role: string } };
export function login(email: string, password: string) {
  return apiRequest<AuthResponse>("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
}
export function register(name: string, email: string, password: string, role = "CUSTOMER", phone?: string) {
  return apiRequest<AuthResponse>("/auth/register", { method: "POST", body: JSON.stringify({ name, email, password, role, phone }) });
}
export function getPlaces(query = "") {
  return apiRequest<{ items: unknown[]; pagination: unknown }>(`/places${query}`);
}
