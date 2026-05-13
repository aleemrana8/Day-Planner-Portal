"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Task } from "@/types";
import { Clock, AlertTriangle, ArrowUpRight, CheckCircle2, Loader2, PauseCircle } from "lucide-react";

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: any }> = {
  pending: { label: "Pending", color: "text-amber-400", bg: "bg-amber-500/10", icon: PauseCircle },
  in_progress: { label: "In Progress", color: "text-blue-400", bg: "bg-blue-500/10", icon: Loader2 },
  under_review: { label: "Under Review", color: "text-purple-400", bg: "bg-purple-500/10", icon: Clock },
  completed: { label: "Completed", color: "text-emerald-400", bg: "bg-emerald-500/10", icon: CheckCircle2 },
  overdue: { label: "Overdue", color: "text-red-400", bg: "bg-red-500/10", icon: AlertTriangle },
  escalated: { label: "Escalated", color: "text-red-400", bg: "bg-red-500/10", icon: ArrowUpRight },
  cancelled: { label: "Cancelled", color: "text-[var(--text-secondary)]", bg: "bg-gray-500/10", icon: PauseCircle },
};

const priorityConfig: Record<string, { color: string; dot: string }> = {
  critical: { color: "text-red-400", dot: "bg-red-500" },
  high: { color: "text-amber-400", dot: "bg-amber-500" },
  medium: { color: "text-blue-400", dot: "bg-blue-500" },
  low: { color: "text-[var(--text-secondary)]", dot: "bg-gray-500" },
};

export default function TaskStatusCards({ tasks }: { tasks: Task[] }) {
  const router = useRouter();
  return (
    <div className="glass-card">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold">Recent Tasks</h3>
        <Link href="/dashboard/tasks" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
          View All →
        </Link>
      </div>
      <div className="space-y-3">
        {tasks.map((task, i) => {
          const status = statusConfig[task.status] || statusConfig.pending;
          const priority = priorityConfig[task.priority] || priorityConfig.medium;
          const StatusIcon = status.icon;

          return (
            <motion.div
              key={task._id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 p-3 rounded-xl bg-[var(--overlay-02)] border border-[var(--border-5)] hover:border-indigo-500/30 hover:bg-[var(--overlay-03)] transition-all cursor-pointer group"
              onClick={() => router.push(`/dashboard/tasks/${task._id}`)}
            >
              <div className={`w-9 h-9 rounded-lg ${status.bg} flex items-center justify-center flex-shrink-0`}>
                <StatusIcon className={`w-4 h-4 ${status.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate group-hover:text-[var(--text-primary)] transition-colors">
                  {task.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`w-1.5 h-1.5 rounded-full ${priority.dot}`} />
                  <span className={`text-xs ${priority.color} capitalize`}>{task.priority}</span>
                  <span className="text-xs text-gray-600">•</span>
                  <span className="text-xs text-[var(--text-tertiary)]">{task.assignedTo?.firstName} {task.assignedTo?.lastName}</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <span className={`text-xs px-2 py-1 rounded-lg ${status.bg} ${status.color}`}>
                  {status.label}
                </span>
                {task.progressPercentage > 0 && task.progressPercentage < 100 && (
                  <div className="mt-2 w-16 h-1 rounded-full bg-[var(--overlay-10)]">
                    <div
                      className="h-full rounded-full bg-indigo-500"
                      style={{ width: `${task.progressPercentage}%` }}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
