// src/api/api.ts

// Env variable from Vite
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const api = async (endpoint: string, options: RequestInit = {}) => {
  const token = sessionStorage.getItem("authToken");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>) || {},
  };

  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const contentType = res.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");
  const body = isJson ? await res.json() : await res.text();

  if (!res.ok) {
    const msg = (body && (body.message || body.error)) || res.statusText || "API Error";
    const error: any = new Error(msg);
    error.status = res.status;
    error.body = body;
    throw error;
  }

  return body;
};
