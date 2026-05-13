"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, RadialBarChart, RadialBar, Legend, Cell,
  LineChart, Line
} from "recharts";
import {
  TrendingUp, Users, Target, Zap, Clock, BarChart3, Activity
} from "lucide-react";
import {
  DEMO_DEPARTMENT_STATS, DEMO_TEAM_PERFORMANCE,
  DEMO_PRODUCTIVITY_MONTHLY, DEMO_WEEKLY_TREND,
} from "@/lib/demo-data";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="rounded-xl bg-[var(--chart-bg)] border border-[var(--border-10)] p-3 shadow-xl backdrop-blur-xl">
      <p className="text-xs text-[var(--text-secondary)] mb-2">{label}</p>
      {payload.map((entry: any, i: number) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
          <span className="text-xs text-[var(--text-subtle)]">{entry.name}: <strong className="text-[var(--text-primary)]">{entry.value}</strong></span>
        </div>
      ))}
    </div>
  );
};

const radialData = [
  { name: "Operations", value: 82, fill: "#6366f1" },
  { name: "Finance", value: 71, fill: "#f59e0b" },
  { name: "Support", value: 89, fill: "#10b981" },
  { name: "Development", value: 65, fill: "#3b82f6" },
];

const hourlyData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  tasks: Math.max(0, Math.round(Math.sin((i - 6) / 3) * 5 + (i >= 9 && i <= 18 ? 8 : 2) + Math.random() * 3)),
}));

export default function AnalyticsPage() {
  const [range, setRange] = useState("week");

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div {...fadeUp(0)} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics & Intelligence</h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">
            Deep insights into operational performance and team productivity
          </p>
        </div>
        <div className="flex items-center gap-1 bg-[var(--overlay-5)] rounded-xl border border-[var(--border-10)] p-1">
          {["week", "month", "quarter"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                range === r ? "bg-indigo-500/20 text-indigo-300" : "text-[var(--text-tertiary)] hover:text-[var(--text-subtle)]"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Top KPIs */}
      <motion.div {...fadeUp(0.05)} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Avg Efficiency", value: "81.5%", icon: Target, color: "indigo", change: "+3.2%" },
          { label: "Tasks/Day", value: "12.4", icon: Zap, color: "emerald", change: "+1.8" },
          { label: "Avg Resolution", value: "3.6h", icon: Clock, color: "amber", change: "-0.4h" },
          { label: "Team Score", value: "78/100", icon: Users, color: "blue", change: "+5" },
        ].map((kpi, i) => (
          <div key={kpi.label} className="glass-card !p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl bg-${kpi.color}-500/10 flex items-center justify-center`}>
                <kpi.icon className={`w-4 h-4 text-${kpi.color}-400`} />
              </div>
              <span className="text-xs text-emerald-400">{kpi.change}</span>
            </div>
            <p className="text-xl font-bold">{kpi.value}</p>
            <p className="text-xs text-[var(--text-tertiary)] mt-1">{kpi.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Productivity Trend */}
      <motion.div {...fadeUp(0.1)} className="glass-card">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base font-semibold">Productivity Trend</h3>
            <p className="text-xs text-[var(--text-tertiary)] mt-1">Task creation vs completion over time</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-indigo-500" /><span className="text-xs text-[var(--text-secondary)]">Created</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500" /><span className="text-xs text-[var(--text-secondary)]">Completed</span></div>
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={DEMO_WEEKLY_TREND} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="aGrad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="aGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="day" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="created" name="Created" stroke="#6366f1" strokeWidth={2} fill="url(#aGrad1)" dot={{ fill: '#6366f1', r: 4 }} />
              <Area type="monotone" dataKey="completed" name="Completed" stroke="#10b981" strokeWidth={2} fill="url(#aGrad2)" dot={{ fill: '#10b981', r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Row 2: Department Efficiency + Hourly Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div {...fadeUp(0.15)} className="glass-card">
          <h3 className="text-base font-semibold mb-1">Department Efficiency</h3>
          <p className="text-xs text-[var(--text-tertiary)] mb-5">Completion rates by department</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="25%" outerRadius="90%" data={radialData} startAngle={180} endAngle={0}>
                <RadialBar
                  background={{ fill: "rgba(255,255,255,0.03)" }}
                  dataKey="value"
                  cornerRadius={10}
                />
                <Tooltip content={<CustomTooltip />} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            {radialData.map((d) => (
              <div key={d.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: d.fill }} />
                <span className="text-xs text-[var(--text-secondary)]">{d.name}: {d.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.2)} className="glass-card">
          <h3 className="text-base font-semibold mb-1">Hourly Activity</h3>
          <p className="text-xs text-[var(--text-tertiary)] mb-5">Task activity distribution throughout the day</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData.filter((_, i) => i % 2 === 0)} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="hour" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="tasks" name="Tasks" radius={[4, 4, 0, 0]} maxBarSize={20}>
                  {hourlyData.filter((_, i) => i % 2 === 0).map((_, i) => (
                    <Cell key={i} fill={`hsl(${240 - i * 8}, 70%, ${50 + i}%)`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Monthly Productivity */}
      <motion.div {...fadeUp(0.25)} className="glass-card">
        <h3 className="text-base font-semibold mb-1">Monthly Productivity</h3>
        <p className="text-xs text-[var(--text-tertiary)] mb-5">Weekly breakdown of tasks and efficiency</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DEMO_PRODUCTIVITY_MONTHLY} margin={{ top: 5, right: 30, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="week" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="tasks" name="Total Tasks" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={30} fillOpacity={0.6} />
              <Bar dataKey="completed" name="Completed" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Team Performance */}
      <motion.div {...fadeUp(0.3)} className="glass-card">
        <h3 className="text-base font-semibold mb-5">Employee Performance Ranking</h3>
        <div className="space-y-3">
          {DEMO_TEAM_PERFORMANCE.sort((a, b) => b.score - a.score).map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="flex items-center gap-4 p-3 rounded-xl bg-[var(--overlay-02)] border border-[var(--border-5)]"
            >
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                i === 0 ? "bg-amber-500/20 text-amber-400" :
                i === 1 ? "bg-gray-400/20 text-[var(--text-subtle)]" :
                i === 2 ? "bg-orange-500/20 text-orange-400" :
                "bg-[var(--overlay-5)] text-[var(--text-tertiary)]"
              }`}>
                #{i + 1}
              </span>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                {member.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{member.name}</p>
                <p className="text-xs text-[var(--text-tertiary)]">{member.role}</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center hidden sm:block">
                  <p className="text-sm font-medium">{member.totalTasks}</p>
                  <p className="text-[10px] text-gray-600">Tasks</p>
                </div>
                <div className="text-center hidden sm:block">
                  <p className="text-sm font-medium text-emerald-400">{member.completed}</p>
                  <p className="text-[10px] text-gray-600">Done</p>
                </div>
                <div className="w-24">
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className="text-[var(--text-tertiary)]">Score</span>
                    <span className="font-medium">{member.score}/100</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[var(--overlay-10)]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${member.score}%` }}
                      transition={{ duration: 0.5, delay: 0.4 + i * 0.05 }}
                      className={`h-full rounded-full ${
                        member.score >= 85 ? "bg-emerald-500" :
                        member.score >= 70 ? "bg-blue-500" :
                        member.score >= 50 ? "bg-amber-500" : "bg-red-500"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
