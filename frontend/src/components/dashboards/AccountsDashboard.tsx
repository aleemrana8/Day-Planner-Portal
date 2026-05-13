"use client";

import { motion } from "framer-motion";
import { Wallet, FileCheck, Clock, TrendingUp, AlertTriangle, DollarSign, Receipt, CreditCard } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { DEMO_TASKS, DEMO_WEEKLY_TREND, DEMO_RECENT_ACTIVITY } from "@/lib/demo-data";
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

const BILLING_STATUS = [
  { name: "Processed", value: 12, color: "#10b981" },
  { name: "Pending", value: 5, color: "#f59e0b" },
  { name: "Under Review", value: 3, color: "#8b5cf6" },
  { name: "Rejected", value: 1, color: "#ef4444" },
];

export default function AccountsDashboard() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <motion.div {...fadeUp(0)}>
        <h1 className="text-2xl font-bold">
          Accounts Dashboard — <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-400">{user?.firstName}</span>
        </h1>
        <p className="text-[var(--text-secondary)] text-sm mt-1">
          Financial operations, billing workflows & revenue analytics
        </p>
      </motion.div>

      <motion.div {...fadeUp(0.1)} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Billing Tasks" value={10} change={+4} icon={Wallet} color="amber" subtitle="This month" href="/dashboard/billing" />
        <KPICard title="Pending Approvals" value={3} change={-10} icon={FileCheck} color="purple" subtitle="Awaiting review" isNegativeGood href="/dashboard/tasks" />
        <KPICard title="Processing Rate" value="89%" change={+7} icon={TrendingUp} color="emerald" subtitle="Improvement" href="/dashboard/analytics" />
        <KPICard title="Revenue Tasks" value={5} change={+2} icon={DollarSign} color="blue" subtitle="Active claims" href="/dashboard/billing" />
      </motion.div>

      <motion.div {...fadeUp(0.15)} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Invoices Processed", value: "156", icon: Receipt, color: "text-emerald-400", bg: "bg-emerald-500/10" },
          { label: "Avg Processing", value: "1.8h", icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10" },
          { label: "Pending Refunds", value: "4", icon: CreditCard, color: "text-purple-400", bg: "bg-purple-500/10" },
          { label: "Discrepancies", value: "2", icon: AlertTriangle, color: "text-red-400", bg: "bg-red-500/10" },
        ].map((item, i) => (
          <motion.div key={item.label} {...fadeUp(0.18 + i * 0.03)} className="glass-card !p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`}>
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <div>
              <p className="text-lg font-bold">{item.value}</p>
              <p className="text-xs text-[var(--text-tertiary)]">{item.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div {...fadeUp(0.2)} className="lg:col-span-2">
          <ProductivityChart data={DEMO_WEEKLY_TREND} />
        </motion.div>
        <motion.div {...fadeUp(0.25)}>
          <StatusPieChart data={BILLING_STATUS} title="Billing Status" />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div {...fadeUp(0.3)} className="lg:col-span-2">
          <TaskStatusCards tasks={DEMO_TASKS.filter(t => t.category === "billing" || t.category === "finance").slice(0, 4)} />
        </motion.div>
        <motion.div {...fadeUp(0.35)}>
          <RecentActivityFeed activities={DEMO_RECENT_ACTIVITY.slice(0, 5)} />
        </motion.div>
      </div>
    </div>
  );
}
