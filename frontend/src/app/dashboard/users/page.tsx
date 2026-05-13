"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Plus, Search, Shield, UserCheck, UserX, MoreVertical, Mail, Phone } from "lucide-react";
import { ROLE_LABELS, ROLE_COLORS } from "@/store/auth";
import type { Role } from "@/types";

interface DemoUser {
  id: string; name: string; email: string; role: Role; designation: string;
  department: string; status: "active" | "inactive"; score: number; lastLogin: string;
}

const DEMO_USER_LIST: DemoUser[] = [
  { id: "1", name: "Muhammad Aleem", email: "admin@dayplanner.com", role: "super_admin", designation: "Chief Executive", department: "Executive", status: "active", score: 98, lastLogin: "2 min ago" },
  { id: "2", name: "Ahmed Khan", email: "ahmed.khan@dayplanner.com", role: "director", designation: "Director of Operations", department: "Operations", status: "active", score: 92, lastLogin: "1 hour ago" },
  { id: "3", name: "Sara Ali", email: "sara.ali@dayplanner.com", role: "director", designation: "Director of Finance", department: "Finance & Billing", status: "active", score: 88, lastLogin: "3 hours ago" },
  { id: "4", name: "Usman Malik", email: "usman.malik@dayplanner.com", role: "director", designation: "Director of Support", department: "Support", status: "active", score: 85, lastLogin: "5 hours ago" },
  { id: "5", name: "Fatima Zahra", email: "fatima.zahra@dayplanner.com", role: "assistant_director", designation: "Asst. Director Ops", department: "Operations", status: "active", score: 87, lastLogin: "30 min ago" },
  { id: "6", name: "Hassan Raza", email: "hassan.raza@dayplanner.com", role: "assistant_director", designation: "Asst. Director Finance", department: "Finance & Billing", status: "active", score: 83, lastLogin: "2 hours ago" },
  { id: "7", name: "Ali Ahmed", email: "ali.ahmed@dayplanner.com", role: "lead", designation: "Team Lead - Alpha", department: "Operations", status: "active", score: 82, lastLogin: "15 min ago" },
  { id: "8", name: "Bilal Hussain", email: "bilal.h@dayplanner.com", role: "lead", designation: "Team Lead - Beta", department: "Operations", status: "active", score: 79, lastLogin: "45 min ago" },
  { id: "9", name: "Zainab Noor", email: "zainab.n@dayplanner.com", role: "lead", designation: "Team Lead - Support A", department: "Support", status: "active", score: 91, lastLogin: "10 min ago" },
  { id: "10", name: "Kashif Mehmood", email: "kashif.m@dayplanner.com", role: "accounts_manager", designation: "Accounts Manager", department: "Finance & Billing", status: "active", score: 86, lastLogin: "1 hour ago" },
  { id: "11", name: "Hamza Tariq", email: "hamza.t@dayplanner.com", role: "employee", designation: "Operations Executive", department: "Operations", status: "active", score: 75, lastLogin: "20 min ago" },
  { id: "12", name: "Maryam Khan", email: "maryam.k@dayplanner.com", role: "employee", designation: "Operations Executive", department: "Operations", status: "active", score: 82, lastLogin: "1 hour ago" },
  { id: "13", name: "Talha Sohail", email: "talha.s@dayplanner.com", role: "employee", designation: "Operations Analyst", department: "Operations", status: "inactive", score: 68, lastLogin: "2 days ago" },
  { id: "14", name: "Nadia Akram", email: "nadia.a@dayplanner.com", role: "employee", designation: "Billing Executive", department: "Finance & Billing", status: "active", score: 88, lastLogin: "30 min ago" },
  { id: "15", name: "Imran Haider", email: "imran.h@dayplanner.com", role: "employee", designation: "Support Executive", department: "Support", status: "active", score: 71, lastLogin: "3 hours ago" },
  { id: "16", name: "Sana Fatima", email: "sana.f@dayplanner.com", role: "employee", designation: "Support Specialist", department: "Support", status: "active", score: 89, lastLogin: "1 hour ago" },
];

export default function UsersPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredUsers = DEMO_USER_LIST.filter((u) => {
    if (searchQuery && !u.name.toLowerCase().includes(searchQuery.toLowerCase()) && !u.email.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filterRole !== "all" && u.role !== filterRole) return false;
    if (filterStatus !== "all" && u.status !== filterStatus) return false;
    return true;
  });

  const roleStats = {
    total: DEMO_USER_LIST.length,
    active: DEMO_USER_LIST.filter(u => u.status === "active").length,
    directors: DEMO_USER_LIST.filter(u => u.role === "director").length,
    leads: DEMO_USER_LIST.filter(u => u.role === "lead").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">Manage accounts, roles, and permissions</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add User
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: roleStats.total, icon: Shield, color: "indigo" },
          { label: "Active", value: roleStats.active, icon: UserCheck, color: "emerald" },
          { label: "Directors", value: roleStats.directors, icon: Shield, color: "blue" },
          { label: "Team Leads", value: roleStats.leads, icon: Shield, color: "purple" },
        ].map((s) => (
          <div key={s.label} className="glass-card !p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-${s.color}-500/10 flex items-center justify-center`}>
              <s.icon className={`w-5 h-5 text-${s.color}-400`} />
            </div>
            <div>
              <p className="text-lg font-bold">{s.value}</p>
              <p className="text-xs text-[var(--text-tertiary)]">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="glass-card !p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-[var(--overlay-5)] border border-[var(--border-10)] text-sm text-[var(--input-text)] placeholder-[var(--placeholder-color)] focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            />
          </div>
          <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}
            className="px-3 py-2 rounded-lg bg-[var(--overlay-5)] border border-[var(--border-10)] text-sm text-[var(--text-subtle)] focus:outline-none focus:ring-2 focus:ring-indigo-500/30 appearance-none">
            <option value="all">All Roles</option>
            <option value="super_admin">Super Admin</option>
            <option value="director">Director</option>
            <option value="assistant_director">Asst. Director</option>
            <option value="lead">Lead</option>
            <option value="accounts_manager">Accounts Manager</option>
            <option value="employee">Employee</option>
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-lg bg-[var(--overlay-5)] border border-[var(--border-10)] text-sm text-[var(--text-subtle)] focus:outline-none focus:ring-2 focus:ring-indigo-500/30 appearance-none">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <span className="text-xs text-[var(--text-tertiary)]">{filteredUsers.length} users</span>
        </div>
      </div>

      {/* User Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((user, i) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="glass-card-hover !p-5 cursor-pointer"
            onClick={() => router.push(`/dashboard/users/${user.id}`)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${ROLE_COLORS[user.role]} flex items-center justify-center text-white font-bold text-sm`}>
                  {user.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="font-medium text-sm">{user.name}</p>
                  <p className="text-xs text-[var(--text-tertiary)]">{user.designation}</p>
                </div>
              </div>
              <button className="text-[var(--text-tertiary)] hover:text-[var(--text-subtle)] transition-colors p-1">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                <Mail className="w-3.5 h-3.5" />
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                <Shield className="w-3.5 h-3.5" />
                <span>{user.department}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[var(--border-5)]">
              <span className={`px-2 py-1 rounded-lg text-xs font-medium bg-gradient-to-r ${ROLE_COLORS[user.role]} bg-clip-text text-transparent`}>
                {ROLE_LABELS[user.role]}
              </span>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${user.status === "active" ? "bg-emerald-400" : "bg-gray-500"}`} />
                <span className="text-xs text-[var(--text-tertiary)]">{user.lastLogin}</span>
              </div>
            </div>

            <div className="mt-3">
              <div className="flex items-center justify-between text-[10px] text-[var(--text-tertiary)] mb-1">
                <span>Performance</span>
                <span>{user.score}/100</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[var(--overlay-10)]">
                <div
                  className={`h-full rounded-full ${
                    user.score >= 85 ? "bg-emerald-500" :
                    user.score >= 70 ? "bg-blue-500" :
                    user.score >= 50 ? "bg-amber-500" : "bg-red-500"
                  }`}
                  style={{ width: `${user.score}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
