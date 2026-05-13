export type Role = 'super_admin' | 'director' | 'assistant_director' | 'lead' | 'accounts_manager' | 'employee';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  role: Role;
  department?: Department;
  team?: Team;
  managedBy?: User;
  avatar: string;
  phone: string;
  designation: string;
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
  loginCount: number;
  performanceScore: number;
  preferences: {
    theme: 'light' | 'dark' | 'system';
    notifications: boolean;
    emailAlerts: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Department {
  _id: string;
  name: string;
  code: string;
  description: string;
  head?: User;
  status: string;
  color: string;
  icon: string;
  memberCount: number;
}

export interface Team {
  _id: string;
  name: string;
  department: Department;
  lead?: User;
  members: User[];
  status: string;
  color: string;
}

export type TaskStatus = 'pending' | 'in_progress' | 'under_review' | 'completed' | 'overdue' | 'escalated' | 'cancelled';
export type TaskPriority = 'critical' | 'high' | 'medium' | 'low';

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: string;
  assignedTo: User;
  assignedBy: User;
  department?: Department;
  team?: Team;
  dueDate: string;
  startDate: string;
  completedAt?: string;
  estimatedHours: number;
  actualHours: number;
  progressPercentage: number;
  isEscalated: boolean;
  websoftTaskId: string;
  tags: string[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  user: User;
  text: string;
  createdAt: string;
}

export interface Notification {
  _id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  link?: string;
  createdAt: string;
}

export interface DashboardKPIs {
  totalUsers?: number;
  totalTasks: number;
  overdueCount?: number;
  completedToday?: number;
  completionRate: number;
  activeDepartments?: number;
  escalatedTasks?: number;
  teamMembers?: number;
  pendingApprovals?: number;
}

export interface WeeklyTrend {
  date: string;
  day: string;
  completed: number;
  created: number;
}
