"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard, CheckSquare, BarChart3, Users, Bell, Settings,
  LogOut, ChevronLeft, ChevronRight, Sparkles, Search, Moon, Sun,
  Activity, Wallet, RefreshCw, Shield, Menu, X
} from "lucide-react";
import { useAuthStore, ROLE_LABELS, ROLE_COLORS } from "@/store/auth";
import { useThemeStore } from "@/store/theme";
import type { Role } from "@/types";

interface NavItem {
  label: string;
  href: string;
  icon: any;
  roles: Role[];
  badge?: number;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["super_admin", "director", "assistant_director", "lead", "accounts_manager", "employee"] },
  { label: "Tasks", href: "/dashboard/tasks", icon: CheckSquare, roles: ["super_admin", "director", "assistant_director", "lead", "accounts_manager", "employee"] },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3, roles: ["super_admin", "director", "assistant_director", "lead"] },
  { label: "Users", href: "/dashboard/users", icon: Users, roles: ["super_admin", "director", "assistant_director"] },
  { label: "Billing", href: "/dashboard/billing", icon: Wallet, roles: ["super_admin", "accounts_manager"] },
  { label: "API Monitor", href: "/dashboard/api-monitor", icon: RefreshCw, roles: ["super_admin"] },
  { label: "Audit Logs", href: "/dashboard/audit", icon: Shield, roles: ["super_admin"] },
  { label: "Settings", href: "/dashboard/settings", icon: Settings, roles: ["super_admin", "director", "assistant_director", "lead", "accounts_manager"] },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) return null;

  const filteredNav = navItems.filter((item) => item.roles.includes(user.role));

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex h-screen bg-[var(--page-bg)] text-[var(--text-primary)] overflow-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[200px]" />
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-[var(--overlay-dark)] z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 280 }}
        className={`hidden md:flex flex-col relative z-20 border-r border-[var(--border-5)] bg-[var(--sidebar-bg)] backdrop-blur-xl`}
      >
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-3 p-5 border-b border-[var(--border-5)] hover:bg-[var(--overlay-02)] transition-colors">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <h1 className="font-bold text-lg">Day Planner</h1>
                <p className="text-[10px] text-indigo-300">Executive Portal</p>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>

        {/* Nav Items */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto scrollbar-hide">
          {filteredNav.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative
                  ${isActive
                    ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/20"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--overlay-hover)]"
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-indigo-500"
                  />
                )}
                <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-indigo-400" : "text-[var(--text-tertiary)] group-hover:text-[var(--text-subtle)]"}`} />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="truncate"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {item.badge && !collapsed && (
                  <span className="ml-auto px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="border-t border-[var(--border-5)] p-3">
          <Link href="/dashboard/settings" className={`flex items-center gap-3 p-3 rounded-xl bg-[var(--overlay-5)] hover:bg-[var(--overlay-10)] transition-colors ${collapsed ? "justify-center" : ""}`}>
            <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${ROLE_COLORS[user.role]} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
              {user.firstName[0]}{user.lastName[0]}
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.firstName} {user.lastName}</p>
                <p className="text-[10px] text-[var(--text-tertiary)]">{ROLE_LABELS[user.role]}</p>
              </div>
            )}
            {!collapsed && (
              <button onClick={(e) => { e.preventDefault(); handleLogout(); }} className="text-[var(--text-tertiary)] hover:text-red-400 transition-colors">
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </Link>
        </div>

        {/* Collapse button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-[var(--elevated-bg)] border border-[var(--border-10)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </motion.aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed left-0 top-0 bottom-0 w-72 z-50 md:hidden border-r border-[var(--border-5)] bg-[var(--sidebar-bg-solid)] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between p-5 border-b border-[var(--border-5)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-bold">Day Planner</h1>
                  <p className="text-[10px] text-indigo-300">Executive Portal</p>
                </div>
              </div>
              <button onClick={() => setMobileOpen(false)} className="text-[var(--text-secondary)]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="p-3 space-y-1">
              {filteredNav.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                      ${isActive ? "bg-indigo-500/15 text-indigo-300" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--overlay-hover)]"}`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Top Bar */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-5)] bg-[var(--header-bg)] backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileOpen(true)} className="md:hidden text-[var(--text-secondary)]">
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]" />
              <input
                type="text"
                placeholder="Search tasks, users, reports..."
                className="w-80 pl-10 pr-4 py-2 rounded-xl bg-[var(--overlay-5)] border border-[var(--border-10)] text-sm text-[var(--input-text)] placeholder-[var(--placeholder-color)] focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded text-[10px] text-[var(--text-tertiary)] bg-[var(--overlay-5)] border border-[var(--border-10)]">
                ⌘K
              </kbd>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 cursor-pointer" onClick={() => router.push("/dashboard/api-monitor")}>
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-400">Websoft Connected</span>
            </div>

            <Link href="/dashboard/audit" className="relative p-2 rounded-xl hover:bg-[var(--overlay-hover)] transition-colors">
              <Bell className="w-5 h-5 text-[var(--text-secondary)]" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
            </Link>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl hover:bg-[var(--overlay-hover)] transition-colors"
            >
              {theme === "dark" ? <Sun className="w-5 h-5 text-[var(--text-secondary)]" /> : <Moon className="w-5 h-5 text-[var(--text-secondary)]" />}
            </button>

            <Link href="/dashboard/settings" className="hidden sm:flex items-center gap-2 pl-3 border-l border-[var(--border-10)] hover:opacity-80 transition-opacity">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${ROLE_COLORS[user.role]} flex items-center justify-center text-white text-xs font-bold`}>
                {user.firstName[0]}{user.lastName[0]}
              </div>
              <div className="hidden lg:block">
                <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                <p className="text-[10px] text-[var(--text-tertiary)]">{ROLE_LABELS[user.role]}</p>
              </div>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
