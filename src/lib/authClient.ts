// lib/authClient.ts

import { LoginPayload, LoginResponse, RefreshResponse } from "@/types";

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Login failed");
  }

  const data: LoginResponse = await res.json();

  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);

  return data;
}

export async function refreshAccessToken(
  refreshToken: string,
): Promise<RefreshResponse> {
  const res = await fetch("/api/auth/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Could not refresh token");
  }

  const data: RefreshResponse = await res.json();
  localStorage.setItem("accessToken", data.accessToken);

  return data;
}
