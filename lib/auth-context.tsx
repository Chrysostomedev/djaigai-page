"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

/* ═══════════════════════════════════════════════════════
   AuthContext — Gestion de session admin
   ═══════════════════════════════════════════════════════ */

interface AdminUser {
  email: string;
  name: string;
  role: "admin" | "super_admin";
}

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  login: (email?: string, password?: string) => boolean;
  logout: () => void;
}

const DEFAULT_ADMIN: AdminUser = {
  email: "admin@djaigai.ci",
  name: "Admin Djaigai",
  role: "super_admin",
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(DEFAULT_ADMIN);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  // Initialisation côté client avec persistance locale
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem("djaigai_admin_logged");
      if (savedAuth === "false") {
        setUser(null);
        setIsAuthenticated(false);
      } else {
        setUser(DEFAULT_ADMIN);
        setIsAuthenticated(true);
        localStorage.setItem("djaigai_admin_logged", "true");
      }
    } catch {
      setUser(DEFAULT_ADMIN);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email?: string, password?: string): boolean => {
    const adminUser = email && email.includes("@")
      ? { email, name: email.split("@")[0].toUpperCase(), role: "admin" as const }
      : DEFAULT_ADMIN;
    setUser(adminUser);
    setIsAuthenticated(true);
    try {
      localStorage.setItem("djaigai_admin_logged", "true");
    } catch {}
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    try {
      localStorage.setItem("djaigai_admin_logged", "false");
    } catch {}
    if (typeof window !== "undefined") {
      window.location.href = "/admin";
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
