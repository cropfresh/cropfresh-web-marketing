"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tractor, Store, Truck, Lock, Loader2, CheckCircle2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Demo credential hints shown on the login page
const DEMO_HINTS = [
  { role: "Farmer", phone: "9876543210", name: "Ramesh Kumar", icon: Tractor, color: "text-emerald-600 dark:text-emerald-400" },
  { role: "Buyer",  phone: "8765432109", name: "Priya Sharma",  icon: Store,   color: "text-blue-600 dark:text-blue-400" },
  { role: "Hauler", phone: "7890123456", name: "Ravi Transport", icon: Truck,   color: "text-amber-600 dark:text-amber-400" },
];

export default function LoginPage() {
  const { login } = useAuth();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!phone || !password) {
      setError("Please enter both phone number and password.");
      return;
    }
    setLoading(true);
    // Small artificial delay so loading state is visible
    setTimeout(() => {
      const result = login(phone.replace(/\D/g, ""), password);
      if (!result.success) {
        setError(result.error || "Login failed.");
        setLoading(false);
      } else {
        setSuccess(true);
      }
    }, 600);
  };

  const fillDemo = (phone: string) => {
    setPhone(phone);
    setPassword("cropfresh123");
    setError("");
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden font-body">
      {/* Subtle bg glow */}
      <div className="absolute top-0 w-full h-full pointer-events-none overflow-hidden flex items-start justify-center">
        <div className="w-[800px] h-[600px] bg-gradient-to-b from-black/[0.03] dark:from-white/[0.03] to-transparent rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="w-full max-w-[420px] relative z-10 flex flex-col items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center mb-10 w-full">
          <img src="/logo/logo_horizontal_web.png" alt="CropFresh" className="h-10 w-auto object-contain" />
        </Link>

        {/* Card */}
        <div className="w-full bg-white dark:bg-[#111111] rounded-[24px] p-8 sm:p-10 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_40px_-12px_rgba(255,255,255,0.03)] border border-neutral-200/60 dark:border-neutral-800/60">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-8"
              >
                <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-900 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 strokeWidth={2} className="w-8 h-8 text-neutral-900 dark:text-white" />
                </div>
                <h2 className="text-xl font-display font-semibold text-neutral-900 dark:text-white mb-2 tracking-tight">
                  Signed in successfully
                </h2>
                <p className="text-sm text-neutral-500 font-medium">Redirecting to your workspace...</p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-[26px] font-display font-bold text-neutral-900 dark:text-white tracking-tight leading-tight mb-2">
                    Sign in to CropFresh
                  </h2>
                  <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    Enter your registered credentials
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Phone Number */}
                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                      Mobile Number
                    </Label>
                    <div className="flex items-center h-12 px-4 bg-neutral-50/50 dark:bg-neutral-900/50 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm gap-2">
                      <span className="text-sm font-medium text-neutral-500">+91</span>
                      <div className="w-px h-5 bg-neutral-200 dark:bg-neutral-700" />
                      <Input
                        id="phone"
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        placeholder="98765 43210"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        className="flex-1 border-0 shadow-none p-0 bg-transparent text-sm text-neutral-900 dark:text-white focus-visible:ring-0 outline-none placeholder:text-neutral-400"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password" className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                        Password
                      </Label>
                      <span className="text-xs text-neutral-400 font-medium">Demo: cropfresh123</span>
                    </div>
                    <div className="flex items-center h-12 px-4 bg-neutral-50/50 dark:bg-neutral-900/50 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm gap-2">
                      <Lock className="w-4 h-4 text-neutral-400 shrink-0" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••"
                        className="flex-1 border-0 shadow-none p-0 bg-transparent text-sm text-neutral-900 dark:text-white focus-visible:ring-0 outline-none placeholder:text-neutral-400 tracking-widest"
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <p className="text-xs text-red-500 font-medium px-1 -mt-1">{error}</p>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 mt-2 bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-black text-sm font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin opacity-70" />
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>

                {/* Demo Quick-Login Buttons */}
                <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-800">
                  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3 text-center">
                    Quick Demo Login
                  </p>
                  <div className="flex flex-col gap-2">
                    {DEMO_HINTS.map((hint) => (
                      <button
                        key={hint.phone}
                        type="button"
                        onClick={() => fillDemo(hint.phone)}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-100 dark:border-neutral-800 transition-colors text-left"
                      >
                        <hint.icon className={`w-4 h-4 ${hint.color} shrink-0`} />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-neutral-900 dark:text-white">{hint.name}</p>
                          <p className="text-xs text-neutral-500">+91 {hint.phone} · {hint.role}</p>
                        </div>
                        <span className="ml-auto text-xs font-medium text-neutral-400">Fill</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
