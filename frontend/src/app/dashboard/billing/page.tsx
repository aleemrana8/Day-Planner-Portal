"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";
import { Wallet, Receipt, CreditCard, TrendingUp, Clock, FileCheck, AlertTriangle, CheckCircle2 } from "lucide-react";
import { DEMO_TASKS } from "@/lib/demo-data";

const fadeUp = (d: number) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d } });

const billingData = [
  { month: "Jan", invoices: 120, processed: 115, revenue: 45000 },
  { month: "Feb", invoices: 145, processed: 138, revenue: 52000 },
  { month: "Mar", invoices: 132, processed: 128, revenue: 48000 },
  { month: "Apr", invoices: 156, processed: 150, revenue: 58000 },
  { month: "May", invoices: 148, processed: 142, revenue: 55000 },
];

const claimTypes = [
  { name: "Insurance", value: 35, color: "#6366f1" },
  { name: "Refunds", value: 18, color: "#f59e0b" },
  { name: "Adjustments", value: 12, color: "#10b981" },
  { name: "Write-offs", value: 5, color: "#ef4444" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="rounded-xl bg-[var(--chart-bg)] border border-[var(--border-10)] p-3 shadow-xl">
      <p className="text-xs text-[var(--text-secondary)] mb-2">{label}</p>
      {payload.map((e: any, i: number) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: e.color }} />
          <span className="text-xs text-[var(--text-subtle)]">{e.name}: <strong className="text-[var(--text-primary)]">{e.value}</strong></span>
        </div>
      ))}
    </div>
  );
};

export default function BillingPage() {
  const billingTasks = DEMO_TASKS.filter(t => t.category === "billing" || t.category === "finance");

  return (
    <div className="space-y-6">
      <motion.div {...fadeUp(0)}>
        <h1 className="text-2xl font-bold">Billing & Financial Workflows</h1>
        <p className="text-[var(--text-secondary)] text-sm mt-1">Track invoices, claims, refunds and revenue workflows</p>
      </motion.div>

      <motion.div {...fadeUp(0.05)} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Invoices", value: "701", icon: Receipt, color: "text-indigo-400", bg: "bg-indigo-500/10" },
          { label: "Processed", value: "673", icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10" },
          { label: "Pending", value: "28", icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10" },
          { label: "Revenue", value: "$258K", icon: TrendingUp, color: "text-blue-400", bg: "bg-blue-500/10" },
        ].map((s) => (
          <div key={s.label} className="glass-card !p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}><s.icon className={`w-5 h-5 ${s.color}`} /></div>
            <div><p className="text-lg font-bold">{s.value}</p><p className="text-xs text-[var(--text-tertiary)]">{s.label}</p></div>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div {...fadeUp(0.1)} className="glass-card">
          <h3 className="text-base font-semibold mb-1">Invoice Trends</h3>
          <p className="text-xs text-[var(--text-tertiary)] mb-5">Monthly invoice processing overview</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={billingData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="invoices" name="Invoices" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={25} fillOpacity={0.6} />
                <Bar dataKey="processed" name="Processed" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.15)} className="glass-card">
          <h3 className="text-base font-semibold mb-1">Claims Distribution</h3>
          <p className="text-xs text-[var(--text-tertiary)] mb-5">Breakdown of financial claim types</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={claimTypes} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value" stroke="none">
                  {claimTypes.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            {claimTypes.map(c => (
              <div key={c.name} className="flex items-center gap-2"><div className="w-2 h-2 rounded-full" style={{ background: c.color }} /><span className="text-xs text-[var(--text-secondary)]">{c.name}: {c.value}</span></div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div {...fadeUp(0.2)} className="glass-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold">Recent Financial Tasks</h3>
          <Link href="/dashboard/tasks" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">View All →</Link>
        </div>
        <div className="space-y-3">
          {billingTasks.map((task, i) => (
            <Link key={task._id} href={`/dashboard/tasks/${task._id}`}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 + i * 0.05 }}
              className="flex items-center gap-4 p-3 rounded-xl bg-[var(--overlay-02)] border border-[var(--border-5)] hover:border-indigo-500/30 transition-all cursor-pointer">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                task.status === "completed" ? "bg-emerald-500/10" : task.status === "in_progress" ? "bg-blue-500/10" : "bg-amber-500/10"
              }`}>
                {task.status === "completed" ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> :
                 task.status === "in_progress" ? <Clock className="w-4 h-4 text-blue-400" /> :
                 <AlertTriangle className="w-4 h-4 text-amber-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{task.title}</p>
                <p className="text-xs text-[var(--text-tertiary)]">{task.websoftTaskId} • {task.assignedTo?.firstName}</p>
              </div>
              <span className={`px-2 py-1 rounded-lg text-xs ${
                task.priority === "critical" ? "bg-red-500/10 text-red-400" : "bg-amber-500/10 text-amber-400"
              }`}>{task.priority}</span>
            </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
