"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface DeptData {
  name: string;
  totalTasks: number;
  completed: number;
  inProgress: number;
  overdue: number;
  color: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="rounded-xl bg-[var(--chart-bg)] border border-[var(--border-10)] p-3 shadow-xl backdrop-blur-xl">
      <p className="text-xs text-[var(--text-secondary)] mb-2 font-medium">{label}</p>
      {payload.map((entry: any, i: number) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
          <span className="text-xs text-[var(--text-subtle)]">{entry.name}: <strong className="text-[var(--text-primary)]">{entry.value}</strong></span>
        </div>
      ))}
    </div>
  );
};

export default function DepartmentBarChart({ data }: { data: DeptData[] }) {
  return (
    <div className="glass-card">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold">Department Overview</h3>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">Task distribution across departments</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-indigo-500" />
            <span className="text-xs text-[var(--text-secondary)]">Total</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs text-[var(--text-secondary)]">Done</span>
          </div>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
            <XAxis
              dataKey="name"
              tick={{ fill: '#6b7280', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              interval={0}
              angle={-15}
              textAnchor="end"
            />
            <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="totalTasks" name="Total" radius={[4, 4, 0, 0]} maxBarSize={30}>
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} fillOpacity={0.6} />
              ))}
            </Bar>
            <Bar dataKey="completed" name="Completed" radius={[4, 4, 0, 0]} fill="#10b981" maxBarSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
