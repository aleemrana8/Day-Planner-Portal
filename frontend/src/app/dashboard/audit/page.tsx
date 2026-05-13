"use client";

import { motion } from "framer-motion";
import { Shield, LogIn, LogOut, UserPlus, Edit, Trash2, RefreshCw, AlertTriangle, Settings, Key } from "lucide-react";

const fadeUp = (d: number) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d } });

const actionIcons: Record<string, any> = {
  login: LogIn, logout: LogOut, create_user: UserPlus, update_user: Edit,
  delete_user: Trash2, sync: RefreshCw, escalation: AlertTriangle, settings: Settings, password: Key,
};

const auditLogs = [
  { id: 1, action: "login", user: "Muhammad Aleem", role: "Super Admin", detail: "Logged in from 192.168.1.100", time: "2 min ago", type: "info" },
  { id: 2, action: "create_user", user: "Ahmed Khan", role: "Director", detail: "Created user: Sana Fatima (Support Specialist)", time: "30 min ago", type: "info" },
  { id: 3, action: "sync", user: "System", role: "Automated", detail: "Websoft sync completed - 35 records", time: "1 hour ago", type: "success" },
  { id: 4, action: "escalation", user: "Ali Ahmed", role: "Lead", detail: "Escalated task: Review Customer Complaint #4521", time: "2 hours ago", type: "warning" },
  { id: 5, action: "update_user", user: "Fatima Zahra", role: "Asst. Director", detail: "Updated role for Talha Sohail", time: "3 hours ago", type: "info" },
  { id: 6, action: "login", user: "Kashif Mehmood", role: "Accounts Manager", detail: "Logged in from 10.0.0.42", time: "4 hours ago", type: "info" },
  { id: 7, action: "password", user: "Hamza Tariq", role: "Employee", detail: "Password changed successfully", time: "5 hours ago", type: "info" },
  { id: 8, action: "settings", user: "Muhammad Aleem", role: "Super Admin", detail: "Updated system notification settings", time: "6 hours ago", type: "info" },
  { id: 9, action: "delete_user", user: "Ahmed Khan", role: "Director", detail: "Deactivated user: Legacy Account", time: "1 day ago", type: "warning" },
  { id: 10, action: "sync", user: "System", role: "Automated", detail: "Securesoft sync partial - 2 records failed", time: "1 day ago", type: "warning" },
  { id: 11, action: "logout", user: "Sara Ali", role: "Director", detail: "Session ended", time: "1 day ago", type: "info" },
  { id: 12, action: "login", user: "Zainab Noor", role: "Lead", detail: "Logged in from mobile device", time: "2 days ago", type: "info" },
];

export default function AuditPage() {
  return (
    <div className="space-y-6">
      <motion.div {...fadeUp(0)}>
        <h1 className="text-2xl font-bold">Audit Logs</h1>
        <p className="text-[var(--text-secondary)] text-sm mt-1">Complete activity trail for security and compliance</p>
      </motion.div>

      <motion.div {...fadeUp(0.05)} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Events", value: "1,284", icon: Shield, color: "text-indigo-400", bg: "bg-indigo-500/10" },
          { label: "Today", value: "47", icon: LogIn, color: "text-blue-400", bg: "bg-blue-500/10" },
          { label: "Warnings", value: "8", icon: AlertTriangle, color: "text-amber-400", bg: "bg-amber-500/10" },
          { label: "User Changes", value: "23", icon: UserPlus, color: "text-purple-400", bg: "bg-purple-500/10" },
        ].map(s => (
          <div key={s.label} className="glass-card !p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}><s.icon className={`w-5 h-5 ${s.color}`} /></div>
            <div><p className="text-lg font-bold">{s.value}</p><p className="text-xs text-[var(--text-tertiary)]">{s.label}</p></div>
          </div>
        ))}
      </motion.div>

      <motion.div {...fadeUp(0.1)} className="glass-card">
        <h3 className="text-base font-semibold mb-5">Activity Timeline</h3>
        <div className="space-y-0">
          {auditLogs.map((log, i) => {
            const Icon = actionIcons[log.action] || Shield;
            return (
              <motion.div key={log.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.03 }}
                className="flex gap-4 py-3 border-b border-[var(--border-03)] last:border-0 hover:bg-[var(--overlay-02)] transition-colors px-2 -mx-2 rounded-lg">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    log.type === "success" ? "bg-emerald-500/10" :
                    log.type === "warning" ? "bg-amber-500/10" : "bg-indigo-500/10"
                  }`}>
                    <Icon className={`w-4 h-4 ${
                      log.type === "success" ? "text-emerald-400" :
                      log.type === "warning" ? "text-amber-400" : "text-indigo-400"
                    }`} />
                  </div>
                  {i < auditLogs.length - 1 && <div className="w-px flex-1 bg-[var(--overlay-5)] mt-1" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-medium">{log.user}</p>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--overlay-5)] text-[var(--text-tertiary)]">{log.role}</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)]">{log.detail}</p>
                </div>
                <span className="text-xs text-gray-600 flex-shrink-0">{log.time}</span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
