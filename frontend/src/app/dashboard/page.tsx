"use client";

import { useAuthStore } from "@/store/auth";
import SuperAdminDashboard from "@/components/dashboards/SuperAdminDashboard";
import DirectorDashboard from "@/components/dashboards/DirectorDashboard";
import LeadDashboard from "@/components/dashboards/LeadDashboard";
import AccountsDashboard from "@/components/dashboards/AccountsDashboard";

export default function DashboardPage() {
  const { user } = useAuthStore();

  if (!user) return null;

  switch (user.role) {
    case "super_admin":
      return <SuperAdminDashboard />;
    case "director":
      return <DirectorDashboard />;
    case "assistant_director":
      return <DirectorDashboard />;
    case "lead":
      return <LeadDashboard />;
    case "accounts_manager":
      return <AccountsDashboard />;
    default:
      return <LeadDashboard />;
  }
}
