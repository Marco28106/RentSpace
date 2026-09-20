"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { apiRequest } from "../lib/api";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isAuthPage = pathname === "/login" || pathname === "/register";
    const allowGuest = isAuthPage || pathname === "/become-owner";

    async function checkAuth() {
      if (isAuthPage) {
        setLoading(false);
        return;
      }

      try {
        const data = await apiRequest<User>("/auth/me");
        setUser(data);
      } catch (err) {
        setUser(null);
        if (!allowGuest) router.push("/login");
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [pathname, router]);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await apiRequest("/auth/logout", { method: "POST" });
      setUser(null);
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
