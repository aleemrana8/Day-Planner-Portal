"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Sparkles, Eye, EyeOff, Lock, Mail, ArrowRight, Sun, Moon } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { useThemeStore } from "@/store/theme";

const DEMO_ACCOUNTS = [
  { label: "Super Admin", email: "admin@dayplanner.com", password: "Admin@123456", color: "from-indigo-500 to-purple-600" },
  { label: "Director", email: "ahmed.khan@dayplanner.com", password: "Director@123", color: "from-blue-500 to-cyan-500" },
  { label: "Asst. Director", email: "fatima.zahra@dayplanner.com", password: "AD@123456", color: "from-violet-500 to-purple-500" },
  { label: "Team Lead", email: "ali.ahmed@dayplanner.com", password: "Lead@12345", color: "from-emerald-500 to-teal-500" },
  { label: "Accounts Mgr", email: "kashif.m@dayplanner.com", password: "Accounts@123", color: "from-amber-500 to-orange-500" },
];

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) router.push("/dashboard");
  };

  const quickLogin = async (account: typeof DEMO_ACCOUNTS[0]) => {
    setEmail(account.email);
    setPassword(account.password);
    const success = await login(account.email, account.password);
    if (success) router.push("/dashboard");
  };

  return (
    <div className="relative min-h-screen bg-[var(--page-bg)] flex items-center justify-center overflow-hidden">
      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 p-2.5 rounded-xl bg-[var(--overlay-5)] border border-[var(--border-10)] hover:bg-[var(--overlay-10)] transition-colors backdrop-blur-sm"
      >
        {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>

      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:block"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">Day Planner</h2>
              <span className="text-xs text-indigo-300">MTBC Executive Portal</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-[var(--text-primary)] leading-tight mb-4">
            Welcome to
            <br />
            <span className="gradient-text">Day Planner</span>
            <br />
            <span className="text-2xl font-semibold text-[var(--text-secondary)]">MTBC Executive Portal</span>
          </h1>
          <p className="text-[var(--text-secondary)] mb-8">
            Access real-time operational intelligence, workforce analytics, and executive dashboards
            powered by Websoft &amp; Securesoft integration.
          </p>

          {/* Quick login cards */}
          <div className="space-y-2">
            <p className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider mb-3">Quick Demo Access</p>
            {DEMO_ACCOUNTS.map((account) => (
              <motion.button
                key={account.email}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => quickLogin(account)}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-[var(--overlay-5)] border border-[var(--border-10)] hover:border-[var(--border-20)] transition-all text-left group"
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${account.color} flex items-center justify-center text-white text-xs font-bold`}>
                  {account.label[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--text-primary)]">{account.label}</p>
                  <p className="text-xs text-[var(--text-tertiary)] truncate">{account.email}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)] transition-colors" />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Right - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass-card !p-8">
            <div className="md:hidden flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[var(--text-primary)]">Day Planner</span>
            </div>

            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-1">Sign In</h3>
            <p className="text-[var(--text-secondary)] text-sm mb-8">Enter your credentials to access the portal</p>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[var(--text-subtle)] mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-tertiary)]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); clearError(); }}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-[var(--overlay-5)] border border-[var(--border-10)] text-[var(--input-text)] placeholder-[var(--placeholder-color)] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                    placeholder="admin@dayplanner.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-subtle)] mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-tertiary)]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); clearError(); }}
                    className="w-full pl-11 pr-12 py-3 rounded-xl bg-[var(--overlay-5)] border border-[var(--border-10)] text-[var(--input-text)] placeholder-[var(--placeholder-color)] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] hover:text-[var(--text-subtle)]"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold text-white hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-[var(--border-20)] border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Mobile quick access */}
            <div className="md:hidden mt-6 pt-6 border-t border-[var(--border-10)]">
              <p className="text-xs text-[var(--text-tertiary)] mb-3">Quick Demo Access</p>
              <div className="flex flex-wrap gap-2">
                {DEMO_ACCOUNTS.map((account) => (
                  <button
                    key={account.email}
                    onClick={() => quickLogin(account)}
                    className={`px-3 py-1.5 rounded-lg bg-gradient-to-r ${account.color} text-white text-xs font-medium`}
                  >
                    {account.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
