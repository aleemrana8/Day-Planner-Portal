"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Mail, Shield, Clock, CheckSquare, AlertTriangle,
  TrendingUp, BarChart3, Calendar, Phone, MapPin
} from "lucide-react";
import { ROLE_LABELS, ROLE_COLORS } from "@/store/auth";
import { DEMO_TASKS } from "@/lib/demo-data";
import type { Role } from "@/types";

interface DemoUser {
  id: string; name: string; email: string; role: Role; designation: string;
  department: string; status: "active" | "inactive"; score: number; lastLogin: string;
  phone: string; joinDate: string;
}

const DEMO_USER_LIST: DemoUser[] = [
  { id: "1", name: "Muhammad Aleem", email: "admin@dayplanner.com", role: "super_admin", designation: "Chief Executive", department: "Executive", status: "active", score: 98, lastLogin: "2 min ago", phone: "+92 300 1234567", joinDate: "2024-01-01" },
  { id: "2", name: "Ahmed Khan", email: "ahmed.khan@dayplanner.com", role: "director", designation: "Director of Operations", department: "Operations", status: "active", score: 92, lastLogin: "1 hour ago", phone: "+92 301 2345678", joinDate: "2024-01-15" },
  { id: "3", name: "Sara Ali", email: "sara.ali@dayplanner.com", role: "director", designation: "Director of Finance", department: "Finance & Billing", status: "active", score: 88, lastLogin: "3 hours ago", phone: "+92 302 3456789", joinDate: "2024-01-20" },
  { id: "4", name: "Usman Malik", email: "usman.malik@dayplanner.com", role: "director", designation: "Director of Support", department: "Support", status: "active", score: 85, lastLogin: "5 hours ago", phone: "+92 303 4567890", joinDate: "2024-02-01" },
  { id: "5", name: "Fatima Zahra", email: "fatima.zahra@dayplanner.com", role: "assistant_director", designation: "Asst. Director Ops", department: "Operations", status: "active", score: 87, lastLogin: "30 min ago", phone: "+92 304 5678901", joinDate: "2024-02-01" },
  { id: "6", name: "Hassan Raza", email: "hassan.raza@dayplanner.com", role: "assistant_director", designation: "Asst. Director Finance", department: "Finance & Billing", status: "active", score: 83, lastLogin: "2 hours ago", phone: "+92 305 6789012", joinDate: "2024-02-15" },
  { id: "7", name: "Ali Ahmed", email: "ali.ahmed@dayplanner.com", role: "lead", designation: "Team Lead - Alpha", department: "Operations", status: "active", score: 82, lastLogin: "15 min ago", phone: "+92 306 7890123", joinDate: "2024-02-15" },
  { id: "8", name: "Bilal Hussain", email: "bilal.h@dayplanner.com", role: "lead", designation: "Team Lead - Beta", department: "Operations", status: "active", score: 79, lastLogin: "45 min ago", phone: "+92 307 8901234", joinDate: "2024-03-01" },
  { id: "9", name: "Zainab Noor", email: "zainab.n@dayplanner.com", role: "lead", designation: "Team Lead - Support A", department: "Support", status: "active", score: 91, lastLogin: "10 min ago", phone: "+92 308 9012345", joinDate: "2024-03-01" },
  { id: "10", name: "Kashif Mehmood", email: "kashif.m@dayplanner.com", role: "accounts_manager", designation: "Accounts Manager", department: "Finance & Billing", status: "active", score: 86, lastLogin: "1 hour ago", phone: "+92 309 0123456", joinDate: "2024-03-01" },
  { id: "e1", name: "Hamza Tariq", email: "hamza.t@dayplanner.com", role: "employee", designation: "Operations Executive", department: "Operations", status: "active", score: 75, lastLogin: "20 min ago", phone: "+92 310 1234567", joinDate: "2024-04-01" },
  { id: "e2", name: "Maryam Khan", email: "maryam.k@dayplanner.com", role: "employee", designation: "Operations Executive", department: "Operations", status: "active", score: 82, lastLogin: "1 hour ago", phone: "+92 311 2345678", joinDate: "2024-04-01" },
  { id: "e3", name: "Talha Sohail", email: "talha.s@dayplanner.com", role: "employee", designation: "Operations Analyst", department: "Operations", status: "inactive", score: 68, lastLogin: "2 days ago", phone: "+92 312 3456789", joinDate: "2024-04-15" },
  { id: "e4", name: "Nadia Akram", email: "nadia.a@dayplanner.com", role: "employee", designation: "Billing Executive", department: "Finance & Billing", status: "active", score: 88, lastLogin: "30 min ago", phone: "+92 313 4567890", joinDate: "2024-04-15" },
  { id: "e5", name: "Imran Haider", email: "imran.h@dayplanner.com", role: "employee", designation: "Support Executive", department: "Support", status: "active", score: 71, lastLogin: "3 hours ago", phone: "+92 314 5678901", joinDate: "2024-05-01" },
  { id: "e6", name: "Sana Fatima", email: "sana.f@dayplanner.com", role: "employee", designation: "Support Specialist", department: "Support", status: "active", score: 89, lastLogin: "1 hour ago", phone: "+92 315 6789012", joinDate: "2024-05-01" },
];

const fadeUp = (d: number) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d } });

export default function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const user = DEMO_USER_LIST.find((u) => u.id === id);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Shield className="w-12 h-12 text-amber-400 mb-4" />
        <h2 className="text-xl font-bold mb-2">User Not Found</h2>
        <p className="text-[var(--text-secondary)] text-sm mb-6">This user profile doesn&apos;t exist.</p>
        <Link href="/dashboard/users" className="px-4 py-2 rounded-xl bg-indigo-500/15 text-indigo-300 text-sm hover:bg-indigo-500/25 transition-colors">
          ← Back to Users
        </Link>
      </div>
    );
  }

  // Get tasks assigned to this user
  const userTasks = DEMO_TASKS.filter(
    (t) => t.assignedTo?._id === user.id || t.assignedTo?.firstName === user.name.split(" ")[0]
  );
  const completedTasks = userTasks.filter((t) => t.status === "completed").length;
  const inProgressTasks = userTasks.filter((t) => t.status === "in_progress").length;
  const overdueTasks = userTasks.filter((t) => t.status === "escalated" || t.status === "overdue").length;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <motion.div {...fadeUp(0)}>
        <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Users
        </button>
      </motion.div>

      {/* Profile Header */}
      <motion.div {...fadeUp(0.05)} className="glass-card !p-6">
        <div className="flex items-start gap-6">
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${ROLE_COLORS[user.role]} flex items-center justify-center text-white text-3xl font-bold`}>
            {user.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <div className={`w-2.5 h-2.5 rounded-full ${user.status === "active" ? "bg-emerald-400" : "bg-gray-500"}`} />
              <span className="text-xs text-[var(--text-secondary)] capitalize">{user.status}</span>
            </div>
            <p className="text-[var(--text-secondary)]">{user.designation}</p>
            <div className="flex items-center gap-4 mt-3">
              <span className={`px-3 py-1 rounded-lg text-xs font-medium bg-gradient-to-r ${ROLE_COLORS[user.role]} text-white`}>
                {ROLE_LABELS[user.role]}
              </span>
              <span className="text-xs text-[var(--text-tertiary)] flex items-center gap-1"><Shield className="w-3 h-3" />{user.department}</span>
              <span className="text-xs text-[var(--text-tertiary)] flex items-center gap-1"><Clock className="w-3 h-3" />Last seen {user.lastLogin}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-xl bg-[var(--overlay-5)] border border-[var(--border-10)] text-sm hover:bg-[var(--overlay-10)] transition-colors">
              Edit Profile
            </button>
            <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-sm font-medium">
              Assign Task
            </button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats */}
          <motion.div {...fadeUp(0.1)} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Tasks", value: userTasks.length, icon: CheckSquare, color: "text-blue-400", bg: "bg-blue-500/10" },
              { label: "Completed", value: completedTasks, icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/10" },
              { label: "In Progress", value: inProgressTasks, icon: Clock, color: "text-indigo-400", bg: "bg-indigo-500/10" },
              { label: "Overdue", value: overdueTasks, icon: AlertTriangle, color: "text-red-400", bg: "bg-red-500/10" },
            ].map(s => (
              <div key={s.label} className="glass-card !p-4 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center`}>
                  <s.icon className={`w-4 h-4 ${s.color}`} />
                </div>
                <div>
                  <p className="text-lg font-bold">{s.value}</p>
                  <p className="text-xs text-[var(--text-tertiary)]">{s.label}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Performance */}
          <motion.div {...fadeUp(0.15)} className="glass-card">
            <h3 className="text-sm font-semibold mb-4">Performance Score</h3>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="w-full h-4 rounded-full bg-[var(--overlay-10)]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${user.score}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${
                      user.score >= 85 ? "bg-emerald-500" :
                      user.score >= 70 ? "bg-blue-500" :
                      user.score >= 50 ? "bg-amber-500" : "bg-red-500"
                    }`}
                  />
                </div>
              </div>
              <span className="text-2xl font-bold">{user.score}<span className="text-sm text-[var(--text-tertiary)]">/100</span></span>
            </div>
          </motion.div>

          {/* Assigned Tasks */}
          <motion.div {...fadeUp(0.2)} className="glass-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold">Assigned Tasks</h3>
              <Link href="/dashboard/tasks" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                View All →
              </Link>
            </div>
            <div className="space-y-3">
              {userTasks.length > 0 ? userTasks.slice(0, 5).map((task, i) => (
                <Link
                  key={task._id}
                  href={`/dashboard/tasks/${task._id}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[var(--overlay-02)] border border-[var(--border-5)] hover:border-indigo-500/30 transition-all cursor-pointer"
                >
                  <div className={`w-2 h-2 rounded-full ${
                    task.status === "completed" ? "bg-emerald-400" :
                    task.status === "in_progress" ? "bg-blue-400" :
                    task.status === "escalated" ? "bg-red-400" : "bg-amber-400"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{task.title}</p>
                    <p className="text-xs text-[var(--text-tertiary)]">{task.websoftTaskId} • {task.priority}</p>
                  </div>
                  <span className="text-xs text-[var(--text-tertiary)] capitalize">{task.status.replace("_", " ")}</span>
                </Link>
              )) : (
                <p className="text-sm text-[var(--text-tertiary)] py-4 text-center">No tasks assigned</p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <motion.div {...fadeUp(0.15)} className="space-y-4">
          {/* Contact Info */}
          <div className="glass-card space-y-3">
            <h3 className="text-sm font-semibold">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[var(--text-tertiary)]" />
                <span className="text-sm text-[var(--text-subtle)]">{user.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[var(--text-tertiary)]" />
                <span className="text-sm text-[var(--text-subtle)]">{user.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-[var(--text-tertiary)]" />
                <span className="text-sm text-[var(--text-subtle)]">{user.department}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-[var(--text-tertiary)]" />
                <span className="text-sm text-[var(--text-subtle)]">Joined {new Date(user.joinDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="glass-card">
            <h3 className="text-sm font-semibold mb-3">Quick Navigation</h3>
            <div className="space-y-2">
              <Link href="/dashboard/users" className="block text-xs text-[var(--text-secondary)] hover:text-indigo-300 transition-colors py-1">
                ← All Users
              </Link>
              <Link href="/dashboard/tasks" className="block text-xs text-[var(--text-secondary)] hover:text-indigo-300 transition-colors py-1">
                📋 Tasks
              </Link>
              <Link href="/dashboard/analytics" className="block text-xs text-[var(--text-secondary)] hover:text-indigo-300 transition-colors py-1">
                📊 Analytics
              </Link>
              <Link href="/dashboard" className="block text-xs text-[var(--text-secondary)] hover:text-indigo-300 transition-colors py-1">
                🏠 Dashboard
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
