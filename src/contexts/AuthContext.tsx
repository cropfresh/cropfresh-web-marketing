"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
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

// ── 10 Demo Users ─────────────────────────────────────────────────────────
// Password for ALL demo users: cropfresh123
const DEMO_USERS: (AuthUser & { password: string })[] = [
  { user_id: "farm-001", user_type: "farmer", phone: "9876543210", name: "Ramesh Kumar",   district: "Kolar",              language_pref: "kn", password: "cropfresh123" },
  { user_id: "farm-002", user_type: "farmer", phone: "9845012345", name: "Suresh Nayak",   district: "Chikkaballapur",     language_pref: "kn", password: "cropfresh123" },
  { user_id: "farm-003", user_type: "farmer", phone: "9741023456", name: "Anand Gowda",    district: "Hassan",             language_pref: "kn", password: "cropfresh123" },
  { user_id: "farm-004", user_type: "farmer", phone: "9632587410", name: "Prakash Reddy",  district: "Tumkur",             language_pref: "kn", password: "cropfresh123" },
  { user_id: "buyr-001", user_type: "buyer",  phone: "8765432109", name: "Priya Sharma",   district: "Bengaluru Urban",    language_pref: "en", password: "cropfresh123" },
  { user_id: "buyr-002", user_type: "buyer",  phone: "8654321098", name: "Arjun Mehta",    district: "Bengaluru Urban",    language_pref: "en", password: "cropfresh123" },
  { user_id: "buyr-003", user_type: "buyer",  phone: "8543210987", name: "Kavita Iyer",    district: "Mysuru",             language_pref: "en", password: "cropfresh123" },
  { user_id: "haul-001", user_type: "hauler", phone: "7890123456", name: "Ravi Transport", district: "Bengaluru Rural",    language_pref: "kn", password: "cropfresh123" },
  { user_id: "haul-002", user_type: "hauler", phone: "7654321890", name: "Manoj Logistics",district: "Kolar",              language_pref: "kn", password: "cropfresh123" },
  { user_id: "haul-003", user_type: "hauler", phone: "7412589630", name: "Syed Carriers",  district: "Hassan",             language_pref: "en", password: "cropfresh123" },
];

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (phone: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("auth_user");
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch { localStorage.removeItem("auth_user"); }
    }
    setIsLoaded(true);
  }, []);

  const login = (phone: string, password: string): { success: boolean; error?: string } => {
    const match = DEMO_USERS.find((u) => u.phone === phone && u.password === password);
    if (!match) {
      return { success: false, error: "Invalid phone number or password." };
    }
    const { password: _, ...authUser } = match;
    localStorage.setItem("auth_user", JSON.stringify(authUser));
    setUser(authUser);
    if (authUser.user_type === "farmer") router.push("/farmers");
    else if (authUser.user_type === "buyer") router.push("/buyers");
    else router.push("/haulers");
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
    router.push("/");
  };

  if (!isLoaded) return null;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
