"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface TeamMember {
  name: string;
  role: string;
  totalTasks: number;
  completed: number;
  overdue: number;
  completionRate: number;
  score: number;
}

export default function TeamPerformanceTable({ data }: { data: TeamMember[] }) {
  return (
    <div className="glass-card">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold">Team Performance</h3>
        <Link href="/dashboard/users" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
          View All →
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border-5)]">
              <th className="text-left py-3 px-2 text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Member</th>
              <th className="text-center py-3 px-2 text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Tasks</th>
              <th className="text-center py-3 px-2 text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Done</th>
              <th className="text-center py-3 px-2 text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Overdue</th>
              <th className="text-center py-3 px-2 text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Rate</th>
              <th className="text-center py-3 px-2 text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Score</th>
            </tr>
          </thead>
          <tbody>
            {data.map((member, i) => (
              <motion.tr
                key={member.name}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-[var(--border-03)] hover:bg-[var(--overlay-02)] transition-colors cursor-pointer"
              >
                <td className="py-3 px-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{member.name}</p>
                      <p className="text-xs text-[var(--text-tertiary)]">{member.role}</p>
                    </div>
                  </div>
                </td>
                <td className="text-center py-3 px-2 font-medium">{member.totalTasks}</td>
                <td className="text-center py-3 px-2">
                  <span className="text-emerald-400 font-medium">{member.completed}</span>
                </td>
                <td className="text-center py-3 px-2">
                  <span className={member.overdue > 0 ? "text-red-400 font-medium" : "text-[var(--text-tertiary)]"}>
                    {member.overdue}
                  </span>
                </td>
                <td className="text-center py-3 px-2">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-12 h-1.5 rounded-full bg-[var(--overlay-10)]">
                      <div
                        className={`h-full rounded-full ${
                          member.completionRate >= 70 ? "bg-emerald-500" :
                          member.completionRate >= 40 ? "bg-amber-500" : "bg-red-500"
                        }`}
                        style={{ width: `${member.completionRate}%` }}
                      />
                    </div>
                    <span className="text-xs text-[var(--text-secondary)]">{member.completionRate}%</span>
                  </div>
                </td>
                <td className="text-center py-3 px-2">
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    member.score >= 85 ? "bg-emerald-500/10 text-emerald-400" :
                    member.score >= 70 ? "bg-blue-500/10 text-blue-400" :
                    member.score >= 50 ? "bg-amber-500/10 text-amber-400" :
                    "bg-red-500/10 text-red-400"
                  }`}>
                    {member.score}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
