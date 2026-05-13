"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, AlertTriangle, Info, XCircle, Clock } from "lucide-react";

interface ActivityItem {
  id: number;
  action: string;
  detail: string;
  user: string;
  time: string;
  type: "success" | "warning" | "error" | "info";
}

const typeConfig = {
  success: { icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  warning: { icon: AlertTriangle, color: "text-amber-400", bg: "bg-amber-500/10" },
  error: { icon: XCircle, color: "text-red-400", bg: "bg-red-500/10" },
  info: { icon: Info, color: "text-blue-400", bg: "bg-blue-500/10" },
};

export default function RecentActivityFeed({ activities }: { activities: ActivityItem[] }) {
  return (
    <div className="glass-card h-full">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold">Recent Activity</h3>
        <Link href="/dashboard/audit" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
          View All →
        </Link>
      </div>
      <div className="space-y-4">
        {activities.map((activity, i) => {
          const config = typeConfig[activity.type];
          const Icon = config.icon;
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex gap-3 cursor-pointer hover:bg-[var(--overlay-02)] p-1.5 -mx-1.5 rounded-lg transition-colors"
            >
              <div className="flex flex-col items-center">
                <div className={`w-7 h-7 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-3.5 h-3.5 ${config.color}`} />
                </div>
                {i < activities.length - 1 && (
                  <div className="w-px h-full bg-[var(--overlay-5)] mt-1" />
                )}
              </div>
              <div className="flex-1 pb-4">
                <p className="text-sm font-medium">{activity.action}</p>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5 truncate">{activity.detail}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-[var(--text-tertiary)]">{activity.user}</span>
                  <span className="text-[10px] text-gray-600">•</span>
                  <span className="text-[10px] text-gray-600">{activity.time}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
