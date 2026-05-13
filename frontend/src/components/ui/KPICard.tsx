"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowUpRight, ArrowDownRight, LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: number | string;
  change: number;
  icon: LucideIcon;
  color: "indigo" | "blue" | "emerald" | "rose" | "amber" | "purple";
  subtitle?: string;
  isNegativeGood?: boolean;
  href?: string;
}

const colorMap = {
  indigo: { bg: "bg-indigo-500/10", text: "text-indigo-400", glow: "shadow-indigo-500/20", border: "border-indigo-500/20", gradient: "from-indigo-500 to-indigo-600" },
  blue: { bg: "bg-blue-500/10", text: "text-blue-400", glow: "shadow-blue-500/20", border: "border-blue-500/20", gradient: "from-blue-500 to-blue-600" },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", glow: "shadow-emerald-500/20", border: "border-emerald-500/20", gradient: "from-emerald-500 to-emerald-600" },
  rose: { bg: "bg-rose-500/10", text: "text-rose-400", glow: "shadow-rose-500/20", border: "border-rose-500/20", gradient: "from-rose-500 to-rose-600" },
  amber: { bg: "bg-amber-500/10", text: "text-amber-400", glow: "shadow-amber-500/20", border: "border-amber-500/20", gradient: "from-amber-500 to-amber-600" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-400", glow: "shadow-purple-500/20", border: "border-purple-500/20", gradient: "from-purple-500 to-purple-600" },
};

export default function KPICard({ title, value, change, icon: Icon, color, subtitle, isNegativeGood, href }: KPICardProps) {
  const c = colorMap[color];
  const isPositive = isNegativeGood ? change <= 0 : change >= 0;
  const router = useRouter();

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      onClick={() => href && router.push(href)}
      className={`glass-card-hover !p-5 group ${href ? "cursor-pointer" : "cursor-default"}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-11 h-11 rounded-xl ${c.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-5 h-5 ${c.text}`} />
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${
          isPositive ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
        }`}>
          {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {Math.abs(change)}%
        </div>
      </div>
      <p className="text-2xl font-bold mb-1">{value}</p>
      <p className="text-sm text-[var(--text-secondary)]">{title}</p>
      {subtitle && <p className="text-xs text-gray-600 mt-1">{subtitle}</p>}
    </motion.div>
  );
}
