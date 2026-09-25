"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { apiRequest, getMe } from "../lib/api";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  avatar_url?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
  loadingLogout: boolean;
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
        const data = await getMe();
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

  const [loadingLogout, setLoadingLogout] = useState(false);

  const logout = async () => {
    try {
      setLoadingLogout(true);
      // Clear local auth state
      setUser(null);
      // Clear any stored tokens (if using localStorage/sessionStorage)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
      }
      router.push('/login');
    } catch (err) {
      console.error('Logout failed', err);
      setUser(null);
      router.push('/login');
    } finally {
      setLoadingLogout(false);
    }
  };

  const refreshUser = async () => {
    try {
      const data = await getMe();
      setUser(data);
    } catch (err) {
      console.error('Failed to refresh user', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser, loadingLogout }}>
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
