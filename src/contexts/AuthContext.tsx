"use client";

import {
  createContext,
  useContext,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

export interface AuthUser {
  user_id: string;
  user_type: "farmer" | "buyer" | "hauler";
  phone: string;
  name: string;
  district?: string;
  language_pref: string;
}

interface AuthContextType {
  user: AuthUser | null;
  role: AuthUser["user_type"] | null;
  isAuthenticated: boolean;
  isLoaded: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const logout = () => {
    try {
      localStorage.removeItem("auth_user");
      localStorage.removeItem("auth_token");
    } catch {
      // Browser storage is never accepted as an authenticated identity.
    }
    router.replace("/");
  };

  return (
    <AuthContext.Provider value={{ user: null, role: null, isAuthenticated: false, isLoaded: true, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
