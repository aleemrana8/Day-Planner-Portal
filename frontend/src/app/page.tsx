"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  BarChart3,
  Shield,
  Zap,
  Users,
  LineChart,
  ArrowRight,
  Sparkles,
  Activity,
  TrendingUp,
  Clock,
  Target,
  Layers,
  Sun,
  Moon,
} from "lucide-react";
import { useThemeStore } from "@/store/theme";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const features = [
  { icon: BarChart3, title: "Executive Dashboards", desc: "Real-time KPIs, heatmaps & cinematic analytics for every leadership level", color: "from-indigo-500 to-purple-500" },
  { icon: Shield, title: "Enterprise RBAC", desc: "Hierarchical role-based access — Super Admin, Director, Lead & more", color: "from-emerald-500 to-teal-500" },
  { icon: Zap, title: "Websoft Integration", desc: "Seamless sync with Websoft/Securesoft APIs for real-time day planner data", color: "from-amber-500 to-orange-500" },
  { icon: Users, title: "Team Analytics", desc: "Employee productivity scoring, workload balancing & performance tracking", color: "from-blue-500 to-cyan-500" },
  { icon: LineChart, title: "AI Insights", desc: "Intelligent delay prediction, smart summaries & operational recommendations", color: "from-pink-500 to-rose-500" },
  { icon: Layers, title: "Task Workflows", desc: "Kanban boards, SLA timers, escalation tracking & priority management", color: "from-violet-500 to-purple-500" },
];

const stats = [
  { value: "99.9%", label: "Uptime SLA", icon: Activity },
  { value: "35+", label: "Daily Tasks Synced", icon: TrendingUp },
  { value: "<2s", label: "Dashboard Load", icon: Clock },
  { value: "5", label: "Role Hierarchies", icon: Target },
];

export default function LandingPage() {
  const { theme, toggleTheme } = useThemeStore();
  return (
    <div className="relative min-h-screen bg-[var(--page-bg)] text-[var(--text-primary)] overflow-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[200px]" />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">Day Planner</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Executive
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-[var(--overlay-5)] border border-[var(--border-10)] hover:bg-[var(--overlay-10)] transition-colors"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Link
            href="/login"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 font-medium text-sm text-white hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300"
          >
            Launch Portal
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-32">
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="text-center"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--overlay-5)] border border-[var(--border-10)] backdrop-blur-sm mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-[var(--text-subtle)]">Powered by Websoft Billing Desk Integration</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl font-bold leading-tight mb-6"
          >
            Transform Operational
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Visibility Into Executive
            </span>
            <br />
            Intelligence
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-12"
          >
            Next-generation workforce analytics & operational management platform.
            Track day planner tasks, monitor team productivity, and drive decisions with
            real-time executive insights.
          </motion.p>

          <motion.div variants={fadeUp} className="flex items-center justify-center gap-4">
            <Link
              href="/login"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold text-lg hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-500 hover:scale-105"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-[var(--border-10)] bg-[var(--overlay-5)] backdrop-blur-sm font-semibold text-lg hover:bg-[var(--overlay-10)] transition-all duration-300"
            >
              View Demo
            </Link>
          </motion.div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 relative"
        >
          <div className="relative rounded-2xl border border-[var(--border-10)] bg-[var(--overlay-5)] backdrop-blur-xl p-1 shadow-2xl shadow-indigo-500/10">
            <div className="rounded-xl bg-[var(--elevated-bg)] p-6 overflow-hidden">
              {/* Mock dashboard header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 h-6 rounded-lg bg-[var(--overlay-5)] max-w-md mx-auto" />
              </div>
              {/* Mock KPI cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Total Tasks", value: "247", change: "+12%", color: "indigo" },
                  { label: "Completed", value: "186", change: "+8%", color: "emerald" },
                  { label: "In Progress", value: "43", change: "-3%", color: "blue" },
                  { label: "Overdue", value: "4", change: "-25%", color: "red" },
                ].map((kpi, i) => (
                  <motion.div
                    key={kpi.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="rounded-xl bg-[var(--overlay-5)] border border-[var(--border-10)] p-4"
                  >
                    <p className="text-xs text-[var(--text-tertiary)] mb-1">{kpi.label}</p>
                    <p className="text-2xl font-bold">{kpi.value}</p>
                    <p className={`text-xs mt-1 ${kpi.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                      {kpi.change} from last week
                    </p>
                  </motion.div>
                ))}
              </div>
              {/* Mock chart area */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 rounded-xl bg-[var(--overlay-5)] border border-[var(--border-10)] p-4 h-48">
                  <p className="text-xs text-[var(--text-tertiary)] mb-3">Productivity Trend</p>
                  <div className="flex items-end gap-2 h-32">
                    {[40, 65, 45, 80, 55, 70, 90, 60, 85, 75, 95, 70].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 0.8 + i * 0.05, duration: 0.5 }}
                        className="flex-1 rounded-t-sm bg-gradient-to-t from-indigo-500/40 to-indigo-500/80"
                      />
                    ))}
                  </div>
                </div>
                <div className="rounded-xl bg-[var(--overlay-5)] border border-[var(--border-10)] p-4 h-48">
                  <p className="text-xs text-[var(--text-tertiary)] mb-3">Task Distribution</p>
                  <div className="flex items-center justify-center h-32">
                    <div className="w-28 h-28 rounded-full border-[8px] border-indigo-500 border-t-emerald-500 border-r-purple-500 border-b-amber-500 animate-pulse-slow" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Glow effects */}
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl -z-10" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl bg-[var(--overlay-5)] border border-[var(--border-10)] backdrop-blur-sm"
            >
              <stat.icon className="w-6 h-6 text-indigo-400 mx-auto mb-3" />
              <p className="text-3xl font-bold gradient-text">{stat.value}</p>
              <p className="text-sm text-[var(--text-secondary)] mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Enterprise-Grade <span className="gradient-text">Features</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">
            Everything you need to transform operational data into executive intelligence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group glass-card-hover cursor-default"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Roles Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Role-Based <span className="gradient-text">Hierarchy</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">
            Secure hierarchical access control for every leadership level
          </p>
        </motion.div>

        <div className="flex flex-col items-center gap-4">
          {[
            { role: "Super Admin", desc: "Complete organizational visibility & control", color: "from-indigo-500 to-purple-600", width: "max-w-lg" },
            { role: "Director", desc: "Department-level analytics & management", color: "from-blue-500 to-cyan-500", width: "max-w-md" },
            { role: "Assistant Director", desc: "Team monitoring & lead coordination", color: "from-violet-500 to-purple-500", width: "max-w-sm" },
            { role: "Leads", desc: "Task management & employee coordination", color: "from-emerald-500 to-teal-500", width: "max-w-xs" },
            { role: "Accounts Manager", desc: "Financial workflows & billing analytics", color: "from-amber-500 to-orange-500", width: "max-w-[250px]" },
          ].map((item, i) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`w-full ${item.width} p-4 rounded-2xl bg-gradient-to-r ${item.color} bg-opacity-10 border border-[var(--border-10)] backdrop-blur-sm text-center`}
              style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))` }}
            >
              <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${item.color} text-white text-sm font-semibold mb-1`}>
                {item.role}
              </div>
              <p className="text-[var(--text-secondary)] text-xs">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20" />
          <div className="absolute inset-0 border border-[var(--border-10)] rounded-3xl" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to Transform Your Operations?
            </h2>
            <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto mb-8">
              Join the next generation of operational intelligence. Your executive dashboard awaits.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-10 py-5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold text-lg hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-500 hover:scale-105"
            >
              Launch Portal Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[var(--border-5)] py-8">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between text-sm text-[var(--text-tertiary)]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>Day Planner Executive Portal</span>
          </div>
          <span>Powered by Securesoft & Websoft Integration</span>
        </div>
      </footer>
    </div>
  );
}
