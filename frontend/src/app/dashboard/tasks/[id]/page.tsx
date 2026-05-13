"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Clock, AlertTriangle, CheckCircle2, Loader2, PauseCircle,
  Calendar, User, Tag, MessageSquare, Paperclip, ArrowUpRight, BarChart3
} from "lucide-react";
import { DEMO_TASKS } from "@/lib/demo-data";

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: any }> = {
  pending: { label: "Pending", color: "text-amber-400", bg: "bg-amber-500/10", icon: PauseCircle },
  in_progress: { label: "In Progress", color: "text-blue-400", bg: "bg-blue-500/10", icon: Loader2 },
  under_review: { label: "Under Review", color: "text-purple-400", bg: "bg-purple-500/10", icon: Clock },
  completed: { label: "Completed", color: "text-emerald-400", bg: "bg-emerald-500/10", icon: CheckCircle2 },
  overdue: { label: "Overdue", color: "text-red-400", bg: "bg-red-500/10", icon: AlertTriangle },
  escalated: { label: "Escalated", color: "text-red-400", bg: "bg-red-500/10", icon: ArrowUpRight },
  cancelled: { label: "Cancelled", color: "text-[var(--text-secondary)]", bg: "bg-gray-500/10", icon: PauseCircle },
};

const priorityConfig: Record<string, { label: string; color: string; bg: string }> = {
  critical: { label: "Critical", color: "text-red-400", bg: "bg-red-500/10" },
  high: { label: "High", color: "text-amber-400", bg: "bg-amber-500/10" },
  medium: { label: "Medium", color: "text-blue-400", bg: "bg-blue-500/10" },
  low: { label: "Low", color: "text-[var(--text-secondary)]", bg: "bg-gray-500/10" },
};

const fadeUp = (d: number) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d } });

export default function TaskDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const task = DEMO_TASKS.find((t) => t._id === id);

  if (!task) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <AlertTriangle className="w-12 h-12 text-amber-400 mb-4" />
        <h2 className="text-xl font-bold mb-2">Task Not Found</h2>
        <p className="text-[var(--text-secondary)] text-sm mb-6">The task you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <Link href="/dashboard/tasks" className="px-4 py-2 rounded-xl bg-indigo-500/15 text-indigo-300 text-sm hover:bg-indigo-500/25 transition-colors">
          ← Back to Tasks
        </Link>
      </div>
    );
  }

  const status = statusConfig[task.status] || statusConfig.pending;
  const priority = priorityConfig[task.priority] || priorityConfig.medium;
  const StatusIcon = status.icon;
  const dueDate = new Date(task.dueDate);
  const startDate = new Date(task.startDate);
  const now = new Date();
  const daysRemaining = Math.ceil((dueDate.getTime() - now.getTime()) / 86400000);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Back + Header */}
      <motion.div {...fadeUp(0)}>
        <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Tasks
        </button>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-mono text-[var(--text-tertiary)] px-2 py-0.5 rounded bg-[var(--overlay-5)]">{task.websoftTaskId}</span>
              <span className={`px-2 py-1 rounded-lg text-xs ${status.bg} ${status.color}`}>
                <StatusIcon className="w-3 h-3 inline mr-1" />{status.label}
              </span>
              <span className={`px-2 py-1 rounded-lg text-xs ${priority.bg} ${priority.color}`}>{priority.label}</span>
            </div>
            <h1 className="text-2xl font-bold">{task.title}</h1>
            <p className="text-[var(--text-secondary)] text-sm mt-2">{task.description}</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-xl bg-[var(--overlay-5)] border border-[var(--border-10)] text-sm hover:bg-[var(--overlay-10)] transition-colors">
              Edit Task
            </button>
            <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-sm font-medium">
              Update Status
            </button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <motion.div {...fadeUp(0.1)} className="lg:col-span-2 space-y-6">
          {/* Progress */}
          <div className="glass-card">
            <h3 className="text-sm font-semibold mb-3">Progress</h3>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="w-full h-3 rounded-full bg-[var(--overlay-10)]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${task.progressPercentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${
                      task.progressPercentage >= 80 ? "bg-emerald-500" :
                      task.progressPercentage >= 50 ? "bg-blue-500" :
                      task.progressPercentage >= 25 ? "bg-amber-500" : "bg-red-500"
                    }`}
                  />
                </div>
              </div>
              <span className="text-lg font-bold">{task.progressPercentage}%</span>
            </div>
          </div>

          {/* Time Tracking */}
          <div className="glass-card">
            <h3 className="text-sm font-semibold mb-4">Time Tracking</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 rounded-xl bg-[var(--overlay-03)] border border-[var(--border-5)]">
                <p className="text-xs text-[var(--text-tertiary)] mb-1">Estimated</p>
                <p className="text-lg font-bold">{task.estimatedHours}h</p>
              </div>
              <div className="p-3 rounded-xl bg-[var(--overlay-03)] border border-[var(--border-5)]">
                <p className="text-xs text-[var(--text-tertiary)] mb-1">Actual</p>
                <p className="text-lg font-bold">{task.actualHours}h</p>
              </div>
              <div className="p-3 rounded-xl bg-[var(--overlay-03)] border border-[var(--border-5)]">
                <p className="text-xs text-[var(--text-tertiary)] mb-1">Remaining</p>
                <p className="text-lg font-bold">{Math.max(0, task.estimatedHours - task.actualHours)}h</p>
              </div>
              <div className="p-3 rounded-xl bg-[var(--overlay-03)] border border-[var(--border-5)]">
                <p className="text-xs text-[var(--text-tertiary)] mb-1">Efficiency</p>
                <p className="text-lg font-bold">
                  {task.actualHours > 0 ? `${Math.round((task.progressPercentage / (task.actualHours / task.estimatedHours * 100)) * 100)}%` : "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Activity Log */}
          <div className="glass-card">
            <h3 className="text-sm font-semibold mb-4">Activity Log</h3>
            <div className="space-y-4">
              {[
                { action: "Task updated", detail: `Progress changed to ${task.progressPercentage}%`, time: "2 hours ago", type: "info" },
                { action: "Comment added", detail: "Status update provided by assignee", time: "5 hours ago", type: "info" },
                { action: "Task assigned", detail: `Assigned to ${task.assignedTo?.firstName} ${task.assignedTo?.lastName}`, time: "1 day ago", type: "success" },
                { action: "Task created", detail: `Created by ${task.assignedBy?.firstName} ${task.assignedBy?.lastName}`, time: "2 days ago", type: "success" },
              ].map((log, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${log.type === "success" ? "bg-emerald-400" : "bg-blue-400"}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{log.action}</p>
                    <p className="text-xs text-[var(--text-tertiary)]">{log.detail}</p>
                  </div>
                  <span className="text-xs text-gray-600">{log.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div className="glass-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold">Comments</h3>
              <MessageSquare className="w-4 h-4 text-[var(--text-tertiary)]" />
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Add a comment..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--overlay-5)] border border-[var(--border-10)] text-sm text-[var(--input-text)] placeholder-[var(--placeholder-color)] focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              />
              <button className="px-4 py-2.5 rounded-xl bg-indigo-500/15 text-indigo-300 text-sm hover:bg-indigo-500/25 transition-colors">
                Send
              </button>
            </div>
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div {...fadeUp(0.15)} className="space-y-4">
          {/* Details */}
          <div className="glass-card space-y-4">
            <h3 className="text-sm font-semibold">Details</h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--text-tertiary)] flex items-center gap-2"><User className="w-3.5 h-3.5" /> Assigned To</span>
                <Link href="/dashboard/users" className="text-sm text-indigo-300 hover:text-indigo-200 transition-colors">
                  {task.assignedTo?.firstName} {task.assignedTo?.lastName}
                </Link>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--text-tertiary)] flex items-center gap-2"><User className="w-3.5 h-3.5" /> Assigned By</span>
                <Link href="/dashboard/users" className="text-sm text-indigo-300 hover:text-indigo-200 transition-colors">
                  {task.assignedBy?.firstName} {task.assignedBy?.lastName}
                </Link>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--text-tertiary)] flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> Start Date</span>
                <span className="text-sm">{startDate.toLocaleDateString()}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--text-tertiary)] flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> Due Date</span>
                <span className={`text-sm ${daysRemaining < 0 ? "text-red-400" : daysRemaining <= 1 ? "text-amber-400" : ""}`}>
                  {dueDate.toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--text-tertiary)] flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> Time Left</span>
                <span className={`text-sm font-medium ${
                  daysRemaining < 0 ? "text-red-400" : daysRemaining <= 1 ? "text-amber-400" : "text-emerald-400"
                }`}>
                  {daysRemaining < 0 ? `${Math.abs(daysRemaining)}d overdue` : daysRemaining === 0 ? "Due today" : `${daysRemaining}d remaining`}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--text-tertiary)] flex items-center gap-2"><BarChart3 className="w-3.5 h-3.5" /> Category</span>
                <span className="text-sm capitalize">{task.category}</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="glass-card">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Tag className="w-3.5 h-3.5" /> Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {task.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Escalation */}
          {task.isEscalated && (
            <div className="glass-card !border-red-500/20">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <h3 className="text-sm font-semibold text-red-400">Escalated</h3>
              </div>
              <p className="text-xs text-[var(--text-secondary)]">This task has been escalated and requires immediate attention from management.</p>
            </div>
          )}

          {/* Quick Navigation */}
          <div className="glass-card">
            <h3 className="text-sm font-semibold mb-3">Quick Navigation</h3>
            <div className="space-y-2">
              <Link href="/dashboard/tasks" className="block text-xs text-[var(--text-secondary)] hover:text-indigo-300 transition-colors py-1">
                ← All Tasks
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
