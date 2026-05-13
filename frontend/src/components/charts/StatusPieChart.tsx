"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface DataItem {
  name: string;
  value: number;
  color: string;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const data = payload[0];
  return (
    <div className="rounded-xl bg-[var(--chart-bg)] border border-[var(--border-10)] p-3 shadow-xl backdrop-blur-xl">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full" style={{ background: data.payload.color }} />
        <span className="text-xs text-[var(--text-subtle)]">{data.name}: <strong className="text-[var(--text-primary)]">{data.value}</strong></span>
      </div>
    </div>
  );
};

export default function StatusPieChart({ data, title }: { data: DataItem[]; title: string }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="glass-card h-full">
      <h3 className="text-base font-semibold mb-4">{title}</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center -mt-2 mb-4">
        <p className="text-2xl font-bold">{total}</p>
        <p className="text-xs text-[var(--text-tertiary)]">Total</p>
      </div>
      <div className="space-y-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ background: item.color }} />
              <span className="text-[var(--text-secondary)] text-xs">{item.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium">{item.value}</span>
              <span className="text-[10px] text-gray-600">
                {total > 0 ? Math.round((item.value / total) * 100) : 0}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
