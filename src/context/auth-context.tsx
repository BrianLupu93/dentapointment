"use client";

import { login, refreshAccessToken } from "@/lib/authClient";
import { createContext, useContext, ReactNode, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isLoggedIn: boolean;
  loginUser: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!localStorage.getItem("accessToken"),
  );

  const loginUser = async (email: string, password: string) => {
    await login({ email, password });
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Remove tokens
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    setIsLoggedIn(false);

    router.push("/");
  };

  const refresh = async () => {
    const token = localStorage.getItem("refreshToken");
    if (!token) throw new Error("No refresh token");
    await refreshAccessToken(token);
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, loginUser, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
