"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Plus, Search, Filter, Grid3X3, List, Clock,
  CheckCircle2, Loader2, PauseCircle, AlertTriangle, ArrowUpRight,
  ChevronDown, Calendar, Tag, User
} from "lucide-react";
import { DEMO_TASKS } from "@/lib/demo-data";
import type { Task, TaskStatus, TaskPriority } from "@/types";

const STATUS_COLUMNS: { key: TaskStatus; label: string; color: string; icon: any }[] = [
  { key: "pending", label: "Pending", color: "amber", icon: PauseCircle },
  { key: "in_progress", label: "In Progress", color: "blue", icon: Loader2 },
  { key: "under_review", label: "Under Review", color: "purple", icon: Clock },
  { key: "completed", label: "Completed", color: "emerald", icon: CheckCircle2 },
  { key: "escalated", label: "Escalated", color: "red", icon: ArrowUpRight },
];

const PRIORITY_COLORS: Record<string, string> = {
  critical: "bg-red-500",
  high: "bg-amber-500",
  medium: "bg-blue-500",
  low: "bg-gray-500",
};

function TaskCard({ task, index }: { task: Task; index: number }) {
  const router = useRouter();
  const dueDate = task.dueDate ? new Date(task.dueDate) : null;
  const isOverdue = dueDate && dueDate < new Date() && task.status !== "completed";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.03 }}
      whileHover={{ y: -2 }}
      onClick={() => router.push(`/dashboard/tasks/${task._id}`)}
      className="p-4 rounded-xl bg-[var(--overlay-03)] border border-[var(--border-5)] hover:border-indigo-500/30 transition-all cursor-pointer group"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${PRIORITY_COLORS[task.priority]}`} />
          <span className="text-[10px] text-[var(--text-tertiary)] uppercase font-medium">{task.priority}</span>
        </div>
        <span className="text-[10px] text-gray-600 font-mono">{task.websoftTaskId}</span>
      </div>

      <h4 className="text-sm font-medium mb-2 leading-snug group-hover:text-[var(--text-primary)] transition-colors line-clamp-2">
        {task.title}
      </h4>

      {task.progressPercentage > 0 && task.progressPercentage < 100 && (
        <div className="mb-3">
          <div className="flex items-center justify-between text-[10px] text-[var(--text-tertiary)] mb-1">
            <span>Progress</span>
            <span>{task.progressPercentage}%</span>
          </div>
          <div className="w-full h-1 rounded-full bg-[var(--overlay-10)]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${task.progressPercentage}%` }}
              transition={{ duration: 0.5 }}
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] font-bold text-[var(--text-primary)]">
            {task.assignedTo?.firstName?.[0]}{task.assignedTo?.lastName?.[0]}
          </div>
          <span className="text-xs text-[var(--text-tertiary)]">{task.assignedTo?.firstName}</span>
        </div>
        {dueDate && (
          <div className={`flex items-center gap-1 text-[10px] ${isOverdue ? "text-red-400" : "text-[var(--text-tertiary)]"}`}>
            <Calendar className="w-3 h-3" />
            {dueDate.toLocaleDateString("en", { month: "short", day: "numeric" })}
          </div>
        )}
      </div>

      {task.tags && task.tags.length > 0 && (
        <div className="flex items-center gap-1 mt-2 flex-wrap">
          {task.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="px-1.5 py-0.5 rounded text-[9px] bg-[var(--overlay-5)] text-[var(--text-tertiary)]">
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function TasksPage() {
  const taskRouter = useRouter();
  const [view, setView] = useState<"kanban" | "list">("kanban");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const filteredTasks = DEMO_TASKS.filter((task) => {
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filterPriority !== "all" && task.priority !== filterPriority) return false;
    if (filterCategory !== "all" && task.category !== filterCategory) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Task Management</h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">
            Manage and track all day planner tasks synced from Websoft
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          New Task
        </motion.button>
      </div>

      {/* Filters Bar */}
      <div className="glass-card !p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-[var(--overlay-5)] border border-[var(--border-10)] text-sm text-[var(--input-text)] placeholder-[var(--placeholder-color)] focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            />
          </div>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-2 rounded-lg bg-[var(--overlay-5)] border border-[var(--border-10)] text-sm text-[var(--text-subtle)] focus:outline-none focus:ring-2 focus:ring-indigo-500/30 appearance-none cursor-pointer"
          >
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 rounded-lg bg-[var(--overlay-5)] border border-[var(--border-10)] text-sm text-[var(--text-subtle)] focus:outline-none focus:ring-2 focus:ring-indigo-500/30 appearance-none cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="billing">Billing</option>
            <option value="operations">Operations</option>
            <option value="support">Support</option>
            <option value="finance">Finance</option>
            <option value="development">Development</option>
            <option value="admin">Admin</option>
          </select>

          <div className="flex items-center bg-[var(--overlay-5)] rounded-lg border border-[var(--border-10)] p-0.5">
            <button
              onClick={() => setView("kanban")}
              className={`p-1.5 rounded-md transition-colors ${view === "kanban" ? "bg-indigo-500/20 text-indigo-400" : "text-[var(--text-tertiary)] hover:text-[var(--text-subtle)]"}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-1.5 rounded-md transition-colors ${view === "list" ? "bg-indigo-500/20 text-indigo-400" : "text-[var(--text-tertiary)] hover:text-[var(--text-subtle)]"}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs text-[var(--text-tertiary)]">{filteredTasks.length} tasks</div>
        </div>
      </div>

      {/* Kanban View */}
      {view === "kanban" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {STATUS_COLUMNS.map((column) => {
            const columnTasks = filteredTasks.filter((t) => t.status === column.key);
            const Icon = column.icon;

            return (
              <div key={column.key} className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 text-${column.color}-400`} />
                    <span className="text-sm font-medium">{column.label}</span>
                    <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-${column.color}-500/10 text-${column.color}-400`}>
                      {columnTasks.length}
                    </span>
                  </div>
                </div>
                <div className="space-y-3 min-h-[200px]">
                  <AnimatePresence>
                    {columnTasks.map((task, i) => (
                      <TaskCard key={task._id} task={task} index={i} />
                    ))}
                  </AnimatePresence>
                  {columnTasks.length === 0 && (
                    <div className="p-6 rounded-xl border border-dashed border-[var(--border-5)] text-center">
                      <p className="text-xs text-gray-600">No tasks</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="glass-card !p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border-5)]">
                <th className="text-left py-3 px-4 text-xs font-medium text-[var(--text-tertiary)] uppercase">Task</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[var(--text-tertiary)] uppercase hidden md:table-cell">Assigned</th>
                <th className="text-center py-3 px-4 text-xs font-medium text-[var(--text-tertiary)] uppercase">Priority</th>
                <th className="text-center py-3 px-4 text-xs font-medium text-[var(--text-tertiary)] uppercase">Status</th>
                <th className="text-center py-3 px-4 text-xs font-medium text-[var(--text-tertiary)] uppercase hidden lg:table-cell">Progress</th>
                <th className="text-center py-3 px-4 text-xs font-medium text-[var(--text-tertiary)] uppercase hidden lg:table-cell">Due</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task, i) => {
                const dueDate = task.dueDate ? new Date(task.dueDate) : null;
                const isOverdue = dueDate && dueDate < new Date() && task.status !== "completed";
                return (
                  <motion.tr
                    key={task._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.02 }}
                    className="border-b border-[var(--border-03)] hover:bg-[var(--overlay-02)] transition-colors cursor-pointer"
                    onClick={() => taskRouter.push(`/dashboard/tasks/${task._id}`)}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${PRIORITY_COLORS[task.priority]}`} />
                        <div>
                          <p className="font-medium text-sm truncate max-w-[300px]">{task.title}</p>
                          <p className="text-[10px] text-gray-600 font-mono">{task.websoftTaskId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      <span className="text-xs text-[var(--text-secondary)]">{task.assignedTo?.firstName} {task.assignedTo?.lastName}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-1 rounded-lg text-xs capitalize ${
                        task.priority === "critical" ? "bg-red-500/10 text-red-400" :
                        task.priority === "high" ? "bg-amber-500/10 text-amber-400" :
                        task.priority === "medium" ? "bg-blue-500/10 text-blue-400" :
                        "bg-gray-500/10 text-[var(--text-secondary)]"
                      }`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-1 rounded-lg text-xs capitalize ${
                        task.status === "completed" ? "bg-emerald-500/10 text-emerald-400" :
                        task.status === "in_progress" ? "bg-blue-500/10 text-blue-400" :
                        task.status === "escalated" ? "bg-red-500/10 text-red-400" :
                        task.status === "under_review" ? "bg-purple-500/10 text-purple-400" :
                        "bg-amber-500/10 text-amber-400"
                      }`}>
                        {task.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center hidden lg:table-cell">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-[var(--overlay-10)]">
                          <div
                            className="h-full rounded-full bg-indigo-500"
                            style={{ width: `${task.progressPercentage}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-[var(--text-tertiary)]">{task.progressPercentage}%</span>
                      </div>
                    </td>
                    <td className={`py-3 px-4 text-center text-xs hidden lg:table-cell ${isOverdue ? "text-red-400" : "text-[var(--text-tertiary)]"}`}>
                      {dueDate?.toLocaleDateString("en", { month: "short", day: "numeric" }) || "—"}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
