"use client";

import { motion } from "framer-motion";
import { CheckSquare, AlertTriangle, TrendingUp, Clock, Target, Users } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { DEMO_WEEKLY_TREND, DEMO_TASKS, DEMO_STATUS_DISTRIBUTION, DEMO_RECENT_ACTIVITY } from "@/lib/demo-data";
import KPICard from "@/components/ui/KPICard";
import ProductivityChart from "@/components/charts/ProductivityChart";
import StatusPieChart from "@/components/charts/StatusPieChart";
import RecentActivityFeed from "@/components/ui/RecentActivityFeed";
import TaskStatusCards from "@/components/ui/TaskStatusCards";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

export default function LeadDashboard() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <motion.div {...fadeUp(0)}>
        <h1 className="text-2xl font-bold">
          Team Lead Dashboard — <span className="gradient-text">{user?.firstName}</span>
        </h1>
        <p className="text-[var(--text-secondary)] text-sm mt-1">
          Manage your team&apos;s tasks and track daily targets
        </p>
      </motion.div>

      <motion.div {...fadeUp(0.1)} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="My Team Tasks" value={12} change={+3} icon={CheckSquare} color="blue" subtitle="Active assignments" href="/dashboard/tasks" />
        <KPICard title="Completed Today" value={3} change={+50} icon={TrendingUp} color="emerald" subtitle="Great progress" href="/dashboard/analytics" />
        <KPICard title="Overdue" value={1} change={-50} icon={AlertTriangle} color="rose" subtitle="Follow up needed" isNegativeGood href="/dashboard/tasks" />
        <KPICard title="Team Members" value={4} change={0} icon={Users} color="indigo" subtitle="Alpha team" href="/dashboard/users" />
      </motion.div>

      {/* Quick Stats */}
      <motion.div {...fadeUp(0.15)} className="grid grid-cols-3 gap-4">
        <div className="glass-card !p-4 text-center">
          <Target className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
          <p className="text-2xl font-bold">82%</p>
          <p className="text-xs text-[var(--text-tertiary)]">Daily Target Met</p>
        </div>
        <div className="glass-card !p-4 text-center">
          <Clock className="w-6 h-6 text-amber-400 mx-auto mb-2" />
          <p className="text-2xl font-bold">2.5h</p>
          <p className="text-xs text-[var(--text-tertiary)]">Avg Completion Time</p>
        </div>
        <div className="glass-card !p-4 text-center">
          <TrendingUp className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
          <p className="text-2xl font-bold">92%</p>
          <p className="text-xs text-[var(--text-tertiary)]">SLA Compliance</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div {...fadeUp(0.2)} className="lg:col-span-2">
          <ProductivityChart data={DEMO_WEEKLY_TREND} />
        </motion.div>
        <motion.div {...fadeUp(0.25)}>
          <StatusPieChart data={DEMO_STATUS_DISTRIBUTION} title="Task Status" />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div {...fadeUp(0.3)} className="lg:col-span-2">
          <TaskStatusCards tasks={DEMO_TASKS.slice(0, 6)} />
        </motion.div>
        <motion.div {...fadeUp(0.35)}>
          <RecentActivityFeed activities={DEMO_RECENT_ACTIVITY.slice(0, 6)} />
        </motion.div>
      </div>
    </div>
  );
}
