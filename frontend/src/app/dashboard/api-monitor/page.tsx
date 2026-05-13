"use client";

import { motion } from "framer-motion";
import { RefreshCw, CheckCircle2, XCircle, Clock, Activity, Database, Wifi, Server, Zap } from "lucide-react";

const fadeUp = (d: number) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d } });

const syncLogs = [
  { id: 1, endpoint: "/day-planner/tasks", status: "success", records: 35, duration: "1.24s", time: "2 min ago", source: "Websoft" },
  { id: 2, endpoint: "/day-planner/tasks", status: "success", records: 28, duration: "0.98s", time: "1 hour ago", source: "Websoft" },
  { id: 3, endpoint: "/billing/accounts", status: "success", records: 15, duration: "0.72s", time: "3 hours ago", source: "Websoft" },
  { id: 4, endpoint: "/users/sync", status: "partial", records: 18, duration: "2.10s", time: "6 hours ago", source: "Securesoft" },
  { id: 5, endpoint: "/day-planner/tasks", status: "success", records: 42, duration: "1.56s", time: "12 hours ago", source: "Websoft" },
  { id: 6, endpoint: "/billing/invoices", status: "failed", records: 0, duration: "5.00s", time: "1 day ago", source: "Websoft" },
  { id: 7, endpoint: "/day-planner/tasks", status: "success", records: 31, duration: "1.12s", time: "1 day ago", source: "Websoft" },
];

export default function ApiMonitorPage() {
  return (
    <div className="space-y-6">
      <motion.div {...fadeUp(0)} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">API Monitor</h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">Websoft & Securesoft API health and sync status</p>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-sm font-medium">
          <RefreshCw className="w-4 h-4" /> Sync Now
        </motion.button>
      </motion.div>

      <motion.div {...fadeUp(0.05)} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "API Status", value: "Healthy", icon: Activity, color: "text-emerald-400", bg: "bg-emerald-500/10", dot: "bg-emerald-400" },
          { label: "Total Syncs", value: "156", icon: RefreshCw, color: "text-indigo-400", bg: "bg-indigo-500/10", dot: "" },
          { label: "Success Rate", value: "97.4%", icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10", dot: "" },
          { label: "Avg Duration", value: "1.3s", icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10", dot: "" },
        ].map(s => (
          <div key={s.label} className="glass-card !p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}><s.icon className={`w-5 h-5 ${s.color}`} /></div>
            <div>
              <div className="flex items-center gap-2"><p className="text-lg font-bold">{s.value}</p>{s.dot && <div className={`w-2 h-2 rounded-full ${s.dot} animate-pulse`} />}</div>
              <p className="text-xs text-[var(--text-tertiary)]">{s.label}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* API Endpoints */}
      <motion.div {...fadeUp(0.1)} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { name: "Websoft Day Planner API", url: "api.websoftbilling.com/v1", status: "connected", icon: Wifi, latency: "120ms" },
          { name: "Securesoft User API", url: "api.securesoft.com/v2", status: "connected", icon: Server, latency: "85ms" },
          { name: "Database (MongoDB)", url: "cluster0.mongodb.net", status: "connected", icon: Database, latency: "15ms" },
        ].map(ep => (
          <div key={ep.name} className="glass-card !p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center"><ep.icon className="w-4 h-4 text-emerald-400" /></div>
              <div className="flex-1">
                <p className="text-sm font-medium">{ep.name}</p>
                <p className="text-[10px] text-gray-600 font-mono">{ep.url}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /><span className="text-xs text-emerald-400">Connected</span></div>
              <div className="flex items-center gap-1"><Zap className="w-3 h-3 text-[var(--text-tertiary)]" /><span className="text-xs text-[var(--text-tertiary)]">{ep.latency}</span></div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Sync Logs */}
      <motion.div {...fadeUp(0.15)} className="glass-card !p-0 overflow-hidden">
        <div className="p-5 border-b border-[var(--border-5)]">
          <h3 className="text-base font-semibold">Sync History</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border-5)]">
              <th className="text-left py-3 px-5 text-xs font-medium text-[var(--text-tertiary)] uppercase">Source</th>
              <th className="text-left py-3 px-5 text-xs font-medium text-[var(--text-tertiary)] uppercase">Endpoint</th>
              <th className="text-center py-3 px-5 text-xs font-medium text-[var(--text-tertiary)] uppercase">Status</th>
              <th className="text-center py-3 px-5 text-xs font-medium text-[var(--text-tertiary)] uppercase hidden md:table-cell">Records</th>
              <th className="text-center py-3 px-5 text-xs font-medium text-[var(--text-tertiary)] uppercase hidden md:table-cell">Duration</th>
              <th className="text-right py-3 px-5 text-xs font-medium text-[var(--text-tertiary)] uppercase">Time</th>
            </tr>
          </thead>
          <tbody>
            {syncLogs.map((log, i) => (
              <motion.tr key={log.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 + i * 0.03 }}
                className="border-b border-[var(--border-03)] hover:bg-[var(--overlay-02)] transition-colors">
                <td className="py-3 px-5"><span className="text-xs px-2 py-1 rounded-md bg-indigo-500/10 text-indigo-300">{log.source}</span></td>
                <td className="py-3 px-5 font-mono text-xs text-[var(--text-secondary)]">{log.endpoint}</td>
                <td className="py-3 px-5 text-center">
                  <span className={`px-2 py-1 rounded-lg text-xs ${
                    log.status === "success" ? "bg-emerald-500/10 text-emerald-400" :
                    log.status === "partial" ? "bg-amber-500/10 text-amber-400" :
                    "bg-red-500/10 text-red-400"
                  }`}>{log.status}</span>
                </td>
                <td className="py-3 px-5 text-center text-xs text-[var(--text-secondary)] hidden md:table-cell">{log.records}</td>
                <td className="py-3 px-5 text-center text-xs text-[var(--text-secondary)] hidden md:table-cell">{log.duration}</td>
                <td className="py-3 px-5 text-right text-xs text-[var(--text-tertiary)]">{log.time}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
