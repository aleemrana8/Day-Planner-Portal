"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import type { WeeklyTrend } from "@/types";

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

export default function ProductivityChart({ data }: { data: WeeklyTrend[] }) {
  return (
    <div className="glass-card">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold">Productivity Trend</h3>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">Tasks created vs completed this week</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-indigo-500" />
            <span className="text-xs text-[var(--text-secondary)]">Created</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs text-[var(--text-secondary)]">Completed</span>
          </div>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="gradientCreated" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradientCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
            <XAxis dataKey="day" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone" dataKey="created" name="Created"
              stroke="#6366f1" strokeWidth={2} fill="url(#gradientCreated)"
              dot={{ fill: '#6366f1', r: 4 }} activeDot={{ r: 6 }}
            />
            <Area
              type="monotone" dataKey="completed" name="Completed"
              stroke="#10b981" strokeWidth={2} fill="url(#gradientCompleted)"
              dot={{ fill: '#10b981', r: 4 }} activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
