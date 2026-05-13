"use client";

import { motion } from "framer-motion";
import {
  Users, CheckSquare, AlertTriangle, TrendingUp, BarChart3, Clock, UserCheck
} from "lucide-react";
import { useAuthStore } from "@/store/auth";
import {
  DEMO_WEEKLY_TREND, DEMO_TASKS, DEMO_TEAM_PERFORMANCE,
  DEMO_STATUS_DISTRIBUTION, DEMO_RECENT_ACTIVITY,
} from "@/lib/demo-data";
import KPICard from "@/components/ui/KPICard";
import ProductivityChart from "@/components/charts/ProductivityChart";
import StatusPieChart from "@/components/charts/StatusPieChart";
import TeamPerformanceTable from "@/components/ui/TeamPerformanceTable";
import RecentActivityFeed from "@/components/ui/RecentActivityFeed";
import TaskStatusCards from "@/components/ui/TaskStatusCards";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

export default function DirectorDashboard() {
  const { user } = useAuthStore();
  const roleName = user?.role === "assistant_director" ? "Assistant Director" : "Director";

  return (
    <div className="space-y-6">
      <motion.div {...fadeUp(0)}>
        <h1 className="text-2xl font-bold">
          {roleName} Dashboard — <span className="gradient-text-blue">{user?.firstName}</span>
        </h1>
        <p className="text-[var(--text-secondary)] text-sm mt-1">
          Department performance overview and team analytics
        </p>
      </motion.div>

      <motion.div {...fadeUp(0.1)} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Department Tasks" value={22} change={+6} icon={CheckSquare} color="blue" subtitle="Operations dept." href="/dashboard/tasks" />
        <KPICard title="Team Members" value={8} change={+2} icon={Users} color="indigo" subtitle="Active staff" href="/dashboard/users" />
        <KPICard title="Completion Rate" value="78%" change={+4} icon={TrendingUp} color="emerald" subtitle="This month" href="/dashboard/analytics" />
        <KPICard title="Overdue" value={2} change={-15} icon={AlertTriangle} color="rose" subtitle="Need escalation" isNegativeGood href="/dashboard/tasks" />
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Avg. Task Duration", value: "3.8h", icon: Clock, color: "amber" },
          { label: "SLA Compliance", value: "94%", icon: BarChart3, color: "emerald" },
          { label: "Asst. Directors", value: "2", icon: UserCheck, color: "purple" },
          { label: "Active Leads", value: "3", icon: Users, color: "blue" },
        ].map((item, i) => (
          <motion.div key={item.label} {...fadeUp(0.15 + i * 0.03)} className="glass-card !p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-${item.color}-500/10 flex items-center justify-center`}>
              <item.icon className={`w-5 h-5 text-${item.color}-400`} />
            </div>
            <div>
              <p className="text-lg font-bold">{item.value}</p>
              <p className="text-xs text-[var(--text-tertiary)]">{item.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

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
          <TeamPerformanceTable data={DEMO_TEAM_PERFORMANCE} />
        </motion.div>
        <motion.div {...fadeUp(0.35)}>
          <RecentActivityFeed activities={DEMO_RECENT_ACTIVITY.slice(0, 5)} />
        </motion.div>
      </div>

      <motion.div {...fadeUp(0.4)}>
        <TaskStatusCards tasks={DEMO_TASKS.filter(t => t.category === "operations" || t.category === "admin").slice(0, 4)} />
      </motion.div>
    </div>
  );
}
