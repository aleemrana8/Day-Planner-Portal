"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, User, Bell, Shield, Palette, Globe, Key, Save, Moon, Sun, Monitor } from "lucide-react";
import { useAuthStore, ROLE_LABELS } from "@/store/auth";
import { useThemeStore } from "@/store/theme";

const fadeUp = (d: number) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d } });

export default function SettingsPage() {
  const { user } = useAuthStore();
  const { theme, setTheme } = useThemeStore();
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  const tabs = [
    { key: "profile", label: "Profile", icon: User },
    { key: "notifications", label: "Notifications", icon: Bell },
    { key: "appearance", label: "Appearance", icon: Palette },
    { key: "security", label: "Security", icon: Shield },
    { key: "api", label: "API Config", icon: Globe },
  ];

  return (
    <div className="space-y-6">
      <motion.div {...fadeUp(0)}>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-[var(--text-secondary)] text-sm mt-1">Manage your account preferences and portal configuration</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar tabs */}
        <motion.div {...fadeUp(0.05)} className="lg:w-56 flex-shrink-0">
          <div className="glass-card !p-2 space-y-1">
            {tabs.map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                  activeTab === tab.key ? "bg-indigo-500/15 text-indigo-300" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--overlay-hover)]"
                }`}>
                <tab.icon className="w-4 h-4" />{tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div {...fadeUp(0.1)} className="flex-1">
          {activeTab === "profile" && (
            <div className="glass-card space-y-6">
              <h3 className="text-base font-semibold">Profile Information</h3>
              <div className="flex items-center gap-4 pb-4 border-b border-[var(--border-5)]">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </div>
                <div>
                  <p className="text-lg font-semibold">{user?.firstName} {user?.lastName}</p>
                  <p className="text-sm text-[var(--text-secondary)]">{user?.role ? ROLE_LABELS[user.role] : ""}</p>
                  <p className="text-xs text-[var(--text-tertiary)]">{user?.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "First Name", value: user?.firstName || "" },
                  { label: "Last Name", value: user?.lastName || "" },
                  { label: "Email", value: user?.email || "" },
                  { label: "Designation", value: user?.designation || "" },
                ].map(field => (
                  <div key={field.label}>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">{field.label}</label>
                    <input type="text" defaultValue={field.value}
                      className="w-full px-3 py-2.5 rounded-xl bg-[var(--overlay-5)] border border-[var(--border-10)] text-sm text-[var(--input-text)] focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
                  </div>
                ))}
              </div>
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-sm font-medium">
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="glass-card space-y-6">
              <h3 className="text-base font-semibold">Notification Preferences</h3>
              {[
                { label: "Push Notifications", desc: "Receive in-app notifications for task updates", enabled: notifications, toggle: () => setNotifications(!notifications) },
                { label: "Email Alerts", desc: "Get email notifications for important events", enabled: emailAlerts, toggle: () => setEmailAlerts(!emailAlerts) },
                { label: "Escalation Alerts", desc: "Immediate alerts for escalated tasks", enabled: true, toggle: () => {} },
                { label: "SLA Warnings", desc: "Notify when tasks approach SLA deadline", enabled: true, toggle: () => {} },
                { label: "Daily Digest", desc: "Daily summary of team activity", enabled: false, toggle: () => {} },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between py-3 border-b border-[var(--border-5)] last:border-0">
                  <div><p className="text-sm font-medium">{item.label}</p><p className="text-xs text-[var(--text-tertiary)]">{item.desc}</p></div>
                  <button onClick={item.toggle}
                    className={`w-11 h-6 rounded-full transition-colors relative ${item.enabled ? "bg-indigo-500" : "bg-[var(--overlay-10)]"}`}>
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${item.enabled ? "left-6" : "left-1"}`} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="glass-card space-y-6">
              <h3 className="text-base font-semibold">Appearance</h3>
              <div>
                <p className="text-sm font-medium mb-3">Theme</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: "dark" as const, label: "Dark", icon: Moon },
                    { key: "light" as const, label: "Light", icon: Sun },
                  ].map(t => (
                    <button key={t.key} onClick={() => setTheme(t.key)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                        theme === t.key ? "border-indigo-500 bg-indigo-500/10" : "border-[var(--border-10)] bg-[var(--overlay-5)] hover:bg-[var(--overlay-10)]"
                      }`}>
                      <t.icon className={`w-5 h-5 ${theme === t.key ? "text-indigo-400" : "text-[var(--text-secondary)]"}`} />
                      <span className="text-xs">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="glass-card space-y-6">
              <h3 className="text-base font-semibold">Security</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Current Password</label>
                  <input type="password" placeholder="Enter current password"
                    className="w-full px-3 py-2.5 rounded-xl bg-[var(--overlay-5)] border border-[var(--border-10)] text-sm text-[var(--input-text)] focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">New Password</label>
                  <input type="password" placeholder="Enter new password"
                    className="w-full px-3 py-2.5 rounded-xl bg-[var(--overlay-5)] border border-[var(--border-10)] text-sm text-[var(--input-text)] focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Confirm Password</label>
                  <input type="password" placeholder="Confirm new password"
                    className="w-full px-3 py-2.5 rounded-xl bg-[var(--overlay-5)] border border-[var(--border-10)] text-sm text-[var(--input-text)] focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-sm font-medium">
                  <Key className="w-4 h-4" /> Update Password
                </button>
              </div>
            </div>
          )}

          {activeTab === "api" && (
            <div className="glass-card space-y-6">
              <h3 className="text-base font-semibold">API Configuration</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Websoft API Base URL</label>
                  <input type="text" defaultValue="https://api.websoftbilling.com/v1"
                    className="w-full px-3 py-2.5 rounded-xl bg-[var(--overlay-5)] border border-[var(--border-10)] text-sm text-[var(--input-text)] font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">API Key</label>
                  <input type="password" defaultValue="****************************"
                    className="w-full px-3 py-2.5 rounded-xl bg-[var(--overlay-5)] border border-[var(--border-10)] text-sm text-[var(--input-text)] font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Sync Interval</label>
                  <select className="w-full px-3 py-2.5 rounded-xl bg-[var(--overlay-5)] border border-[var(--border-10)] text-sm text-[var(--input-text)] focus:outline-none focus:ring-2 focus:ring-indigo-500/30 appearance-none">
                    <option>Every 5 minutes</option><option>Every 15 minutes</option><option>Every 30 minutes</option><option>Every hour</option>
                  </select>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-sm font-medium">
                  <Save className="w-4 h-4" /> Save Configuration
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
