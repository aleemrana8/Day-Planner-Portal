"use client";

import { motion } from "framer-motion";
import {
  Users, CheckSquare, AlertTriangle, TrendingUp, Activity,
  Clock, Zap, BarChart3, ArrowUpRight, ArrowDownRight, RefreshCw,
  Building2, UserCheck, Timer
} from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth";
import {
  DEMO_SUPER_ADMIN_KPIS, DEMO_WEEKLY_TREND, DEMO_DEPARTMENT_STATS,
  DEMO_TEAM_PERFORMANCE, DEMO_TASKS, DEMO_RECENT_ACTIVITY,
  DEMO_STATUS_DISTRIBUTION, DEMO_PRIORITY_DISTRIBUTION, DEMO_PRODUCTIVITY_MONTHLY,
} from "@/lib/demo-data";
import KPICard from "@/components/ui/KPICard";
import ProductivityChart from "@/components/charts/ProductivityChart";
import StatusPieChart from "@/components/charts/StatusPieChart";
import DepartmentBarChart from "@/components/charts/DepartmentBarChart";
import TeamPerformanceTable from "@/components/ui/TeamPerformanceTable";
import RecentActivityFeed from "@/components/ui/RecentActivityFeed";
import TaskStatusCards from "@/components/ui/TaskStatusCards";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

export default function SuperAdminDashboard() {
  const { user } = useAuthStore();
  const kpis = DEMO_SUPER_ADMIN_KPIS;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div {...fadeUp(0)}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              Welcome back, <span className="gradient-text">{user?.firstName}</span>
            </h1>
            <p className="text-[var(--text-secondary)] text-sm mt-1">
              Here&apos;s your organization&apos;s operational overview for today
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard/api-monitor" className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 transition-colors">
              <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-xs text-indigo-300">Last sync: 2 min ago</span>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div {...fadeUp(0.1)} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Team Members"
          value={kpis.totalUsers!}
          change={+8}
          icon={Users}
          color="indigo"
          subtitle="Active employees"
          href="/dashboard/users"
        />
        <KPICard
          title="Total Tasks"
          value={kpis.totalTasks}
          change={+12}
          icon={CheckSquare}
          color="blue"
          subtitle="Across all departments"
          href="/dashboard/tasks"
        />
        <KPICard
          title="Completion Rate"
          value={`${kpis.completionRate}%`}
          change={+5}
          icon={TrendingUp}
          color="emerald"
          subtitle="This week"
          href="/dashboard/analytics"
        />
        <KPICard
          title="Overdue Tasks"
          value={kpis.overdueCount!}
          change={-25}
          icon={AlertTriangle}
          color="rose"
          subtitle="Needs attention"
          isNegativeGood
          href="/dashboard/tasks"
        />
      </motion.div>

      {/* Secondary KPIs */}
      <motion.div {...fadeUp(0.15)} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link href="/dashboard/tasks" className="glass-card !p-4 flex items-center gap-3 hover:border-[var(--border-10)] transition-all">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <Zap className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-lg font-bold">{kpis.completedToday}</p>
            <p className="text-xs text-[var(--text-tertiary)]">Completed Today</p>
          </div>
        </Link>
        <Link href="/dashboard/tasks" className="glass-card !p-4 flex items-center gap-3 hover:border-[var(--border-10)] transition-all">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <p className="text-lg font-bold">{kpis.escalatedTasks}</p>
            <p className="text-xs text-[var(--text-tertiary)]">Escalated</p>
          </div>
        </Link>
        <Link href="/dashboard/users" className="glass-card !p-4 flex items-center gap-3 hover:border-[var(--border-10)] transition-all">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <p className="text-lg font-bold">{kpis.activeDepartments}</p>
            <p className="text-xs text-[var(--text-tertiary)]">Departments</p>
          </div>
        </Link>
        <Link href="/dashboard/analytics" className="glass-card !p-4 flex items-center gap-3 hover:border-[var(--border-10)] transition-all">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
            <Timer className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <p className="text-lg font-bold">4.2h</p>
            <p className="text-xs text-[var(--text-tertiary)]">Avg Resolution</p>
          </div>
        </Link>
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div {...fadeUp(0.2)} className="lg:col-span-2">
          <ProductivityChart data={DEMO_WEEKLY_TREND} />
        </motion.div>
        <motion.div {...fadeUp(0.25)}>
          <StatusPieChart data={DEMO_STATUS_DISTRIBUTION} title="Task Status Distribution" />
        </motion.div>
      </div>

      {/* Department & Priority */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div {...fadeUp(0.3)}>
          <DepartmentBarChart data={DEMO_DEPARTMENT_STATS} />
        </motion.div>
        <motion.div {...fadeUp(0.35)}>
          <StatusPieChart data={DEMO_PRIORITY_DISTRIBUTION} title="Priority Distribution" />
        </motion.div>
      </div>

      {/* Team Performance & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div {...fadeUp(0.4)} className="lg:col-span-2">
          <TeamPerformanceTable data={DEMO_TEAM_PERFORMANCE} />
        </motion.div>
        <motion.div {...fadeUp(0.45)}>
          <RecentActivityFeed activities={DEMO_RECENT_ACTIVITY} />
        </motion.div>
      </div>

      {/* Recent Tasks */}
      <motion.div {...fadeUp(0.5)}>
        <TaskStatusCards tasks={DEMO_TASKS.slice(0, 6)} />
      </motion.div>
    </div>
  );
}
