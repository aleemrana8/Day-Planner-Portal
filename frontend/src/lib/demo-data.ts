import type { Task, WeeklyTrend, DashboardKPIs } from '@/types';

// Comprehensive demo data for frontend-only mode
export const DEMO_TASKS: Task[] = [
  { _id: 't1', title: 'Process Daily Billing Reports', description: 'Generate and verify all billing reports for the day', status: 'in_progress', priority: 'high', category: 'billing', assignedTo: { _id: 'e1', firstName: 'Hamza', lastName: 'Tariq', fullName: 'Hamza Tariq' } as any, assignedBy: { _id: '4', firstName: 'Ali', lastName: 'Ahmed', fullName: 'Ali Ahmed' } as any, dueDate: new Date(Date.now() + 86400000).toISOString(), startDate: new Date(Date.now() - 86400000).toISOString(), estimatedHours: 4, actualHours: 2, progressPercentage: 55, isEscalated: false, websoftTaskId: 'WS-2024-0001', tags: ['billing', 'daily'], comments: [], createdAt: new Date(Date.now() - 86400000).toISOString(), updatedAt: new Date().toISOString() },
  { _id: 't2', title: 'Review Customer Complaint #4521', description: 'Urgent review of escalated customer complaint regarding billing discrepancy', status: 'escalated', priority: 'critical', category: 'support', assignedTo: { _id: 'e5', firstName: 'Imran', lastName: 'Haider', fullName: 'Imran Haider' } as any, assignedBy: { _id: '4', firstName: 'Ali', lastName: 'Ahmed', fullName: 'Ali Ahmed' } as any, dueDate: new Date(Date.now() - 43200000).toISOString(), startDate: new Date(Date.now() - 172800000).toISOString(), estimatedHours: 3, actualHours: 4, progressPercentage: 30, isEscalated: true, websoftTaskId: 'WS-2024-0002', tags: ['support', 'critical'], comments: [], createdAt: new Date(Date.now() - 172800000).toISOString(), updatedAt: new Date().toISOString() },
  { _id: 't3', title: 'Update Client Account Records', description: 'Batch update of 50+ client records with new billing information', status: 'pending', priority: 'medium', category: 'billing', assignedTo: { _id: 'e4', firstName: 'Nadia', lastName: 'Akram', fullName: 'Nadia Akram' } as any, assignedBy: { _id: '5', firstName: 'Kashif', lastName: 'Mehmood', fullName: 'Kashif Mehmood' } as any, dueDate: new Date(Date.now() + 172800000).toISOString(), startDate: new Date().toISOString(), estimatedHours: 6, actualHours: 0, progressPercentage: 0, isEscalated: false, websoftTaskId: 'WS-2024-0003', tags: ['billing', 'batch'], comments: [], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { _id: 't4', title: 'Complete Monthly Operations Review', description: 'Prepare comprehensive operational review for board presentation', status: 'in_progress', priority: 'high', category: 'operations', assignedTo: { _id: 'e2', firstName: 'Maryam', lastName: 'Khan', fullName: 'Maryam Khan' } as any, assignedBy: { _id: '3', firstName: 'Fatima', lastName: 'Zahra', fullName: 'Fatima Zahra' } as any, dueDate: new Date(Date.now() + 259200000).toISOString(), startDate: new Date(Date.now() - 259200000).toISOString(), estimatedHours: 8, actualHours: 5, progressPercentage: 65, isEscalated: false, websoftTaskId: 'WS-2024-0004', tags: ['operations', 'monthly'], comments: [], createdAt: new Date(Date.now() - 259200000).toISOString(), updatedAt: new Date().toISOString() },
  { _id: 't5', title: 'Prepare Executive Summary Report', description: 'Create executive dashboard summary with KPIs and insights', status: 'under_review', priority: 'high', category: 'admin', assignedTo: { _id: 'e2', firstName: 'Maryam', lastName: 'Khan', fullName: 'Maryam Khan' } as any, assignedBy: { _id: '2', firstName: 'Ahmed', lastName: 'Khan', fullName: 'Ahmed Khan' } as any, dueDate: new Date(Date.now() + 86400000).toISOString(), startDate: new Date(Date.now() - 345600000).toISOString(), estimatedHours: 5, actualHours: 4, progressPercentage: 85, isEscalated: false, websoftTaskId: 'WS-2024-0005', tags: ['admin', 'executive'], comments: [], createdAt: new Date(Date.now() - 345600000).toISOString(), updatedAt: new Date().toISOString() },
  { _id: 't6', title: 'Resolve Billing Discrepancy - Invoice #7823', description: 'Critical billing error needs immediate resolution', status: 'in_progress', priority: 'critical', category: 'finance', assignedTo: { _id: 'e4', firstName: 'Nadia', lastName: 'Akram', fullName: 'Nadia Akram' } as any, assignedBy: { _id: '5', firstName: 'Kashif', lastName: 'Mehmood', fullName: 'Kashif Mehmood' } as any, dueDate: new Date(Date.now() + 43200000).toISOString(), startDate: new Date(Date.now() - 86400000).toISOString(), estimatedHours: 3, actualHours: 2, progressPercentage: 40, isEscalated: false, websoftTaskId: 'WS-2024-0006', tags: ['finance', 'urgent'], comments: [], createdAt: new Date(Date.now() - 86400000).toISOString(), updatedAt: new Date().toISOString() },
  { _id: 't7', title: 'Train New Team Members on Portal', description: 'Conduct training sessions for newly onboarded employees', status: 'completed', priority: 'medium', category: 'operations', assignedTo: { _id: 'e1', firstName: 'Hamza', lastName: 'Tariq', fullName: 'Hamza Tariq' } as any, assignedBy: { _id: '4', firstName: 'Ali', lastName: 'Ahmed', fullName: 'Ali Ahmed' } as any, dueDate: new Date(Date.now() - 86400000).toISOString(), startDate: new Date(Date.now() - 432000000).toISOString(), completedAt: new Date(Date.now() - 43200000).toISOString(), estimatedHours: 4, actualHours: 3, progressPercentage: 100, isEscalated: false, websoftTaskId: 'WS-2024-0007', tags: ['operations', 'training'], comments: [], createdAt: new Date(Date.now() - 432000000).toISOString(), updatedAt: new Date().toISOString() },
  { _id: 't8', title: 'Audit System Access Permissions', description: 'Quarterly security audit of all user access permissions', status: 'pending', priority: 'high', category: 'admin', assignedTo: { _id: 'e3', firstName: 'Talha', lastName: 'Sohail', fullName: 'Talha Sohail' } as any, assignedBy: { _id: '3', firstName: 'Fatima', lastName: 'Zahra', fullName: 'Fatima Zahra' } as any, dueDate: new Date(Date.now() + 432000000).toISOString(), startDate: new Date().toISOString(), estimatedHours: 6, actualHours: 0, progressPercentage: 0, isEscalated: false, websoftTaskId: 'WS-2024-0008', tags: ['admin', 'security'], comments: [], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { _id: 't9', title: 'Process Refund Request - Ticket #3344', description: 'Customer refund processing for billing error', status: 'completed', priority: 'medium', category: 'billing', assignedTo: { _id: 'e4', firstName: 'Nadia', lastName: 'Akram', fullName: 'Nadia Akram' } as any, assignedBy: { _id: '5', firstName: 'Kashif', lastName: 'Mehmood', fullName: 'Kashif Mehmood' } as any, dueDate: new Date(Date.now() - 172800000).toISOString(), startDate: new Date(Date.now() - 518400000).toISOString(), completedAt: new Date(Date.now() - 86400000).toISOString(), estimatedHours: 2, actualHours: 1, progressPercentage: 100, isEscalated: false, websoftTaskId: 'WS-2024-0009', tags: ['billing', 'refund'], comments: [], createdAt: new Date(Date.now() - 518400000).toISOString(), updatedAt: new Date().toISOString() },
  { _id: 't10', title: 'Setup Automated Daily Reports', description: 'Configure automated reporting system for daily operational metrics', status: 'in_progress', priority: 'medium', category: 'development', assignedTo: { _id: 'e3', firstName: 'Talha', lastName: 'Sohail', fullName: 'Talha Sohail' } as any, assignedBy: { _id: '4', firstName: 'Ali', lastName: 'Ahmed', fullName: 'Ali Ahmed' } as any, dueDate: new Date(Date.now() + 604800000).toISOString(), startDate: new Date(Date.now() - 259200000).toISOString(), estimatedHours: 10, actualHours: 4, progressPercentage: 35, isEscalated: false, websoftTaskId: 'WS-2024-0010', tags: ['development', 'automation'], comments: [], createdAt: new Date(Date.now() - 259200000).toISOString(), updatedAt: new Date().toISOString() },
  { _id: 't11', title: 'Review SLA Compliance Metrics', description: 'Analyze SLA compliance data for all departments', status: 'pending', priority: 'high', category: 'operations', assignedTo: { _id: 'e2', firstName: 'Maryam', lastName: 'Khan', fullName: 'Maryam Khan' } as any, assignedBy: { _id: '2', firstName: 'Ahmed', lastName: 'Khan', fullName: 'Ahmed Khan' } as any, dueDate: new Date(Date.now() + 172800000).toISOString(), startDate: new Date().toISOString(), estimatedHours: 5, actualHours: 0, progressPercentage: 0, isEscalated: false, websoftTaskId: 'WS-2024-0011', tags: ['operations', 'sla'], comments: [], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { _id: 't12', title: 'Investigate Payment Gateway Errors', description: 'Multiple payment failures detected in the gateway system', status: 'escalated', priority: 'critical', category: 'billing', assignedTo: { _id: 'e1', firstName: 'Hamza', lastName: 'Tariq', fullName: 'Hamza Tariq' } as any, assignedBy: { _id: '4', firstName: 'Ali', lastName: 'Ahmed', fullName: 'Ali Ahmed' } as any, dueDate: new Date(Date.now() - 21600000).toISOString(), startDate: new Date(Date.now() - 86400000).toISOString(), estimatedHours: 4, actualHours: 3, progressPercentage: 20, isEscalated: true, websoftTaskId: 'WS-2024-0013', tags: ['billing', 'critical'], comments: [], createdAt: new Date(Date.now() - 86400000).toISOString(), updatedAt: new Date().toISOString() },
  { _id: 't13', title: 'Customer Onboarding - Enterprise Client', description: 'Full onboarding process for new enterprise client account', status: 'in_progress', priority: 'high', category: 'operations', assignedTo: { _id: 'e6', firstName: 'Sana', lastName: 'Fatima', fullName: 'Sana Fatima' } as any, assignedBy: { _id: '3', firstName: 'Fatima', lastName: 'Zahra', fullName: 'Fatima Zahra' } as any, dueDate: new Date(Date.now() + 345600000).toISOString(), startDate: new Date(Date.now() - 172800000).toISOString(), estimatedHours: 12, actualHours: 5, progressPercentage: 45, isEscalated: false, websoftTaskId: 'WS-2024-0014', tags: ['operations', 'enterprise'], comments: [], createdAt: new Date(Date.now() - 172800000).toISOString(), updatedAt: new Date().toISOString() },
  { _id: 't14', title: 'Process Month-End Reconciliation', description: 'Complete financial reconciliation for month-end closing', status: 'in_progress', priority: 'critical', category: 'finance', assignedTo: { _id: 'e4', firstName: 'Nadia', lastName: 'Akram', fullName: 'Nadia Akram' } as any, assignedBy: { _id: '5', firstName: 'Kashif', lastName: 'Mehmood', fullName: 'Kashif Mehmood' } as any, dueDate: new Date(Date.now() + 86400000).toISOString(), startDate: new Date(Date.now() - 172800000).toISOString(), estimatedHours: 8, actualHours: 6, progressPercentage: 70, isEscalated: false, websoftTaskId: 'WS-2024-0026', tags: ['finance', 'month-end'], comments: [], createdAt: new Date(Date.now() - 172800000).toISOString(), updatedAt: new Date().toISOString() },
  { _id: 't15', title: 'Resolve Data Sync Issues with Websoft', description: 'Fix synchronization problems between portal and Websoft API', status: 'in_progress', priority: 'critical', category: 'development', assignedTo: { _id: 'e3', firstName: 'Talha', lastName: 'Sohail', fullName: 'Talha Sohail' } as any, assignedBy: { _id: '2', firstName: 'Ahmed', lastName: 'Khan', fullName: 'Ahmed Khan' } as any, dueDate: new Date(Date.now() + 43200000).toISOString(), startDate: new Date(Date.now() - 86400000).toISOString(), estimatedHours: 6, actualHours: 4, progressPercentage: 60, isEscalated: false, websoftTaskId: 'WS-2024-0033', tags: ['development', 'sync'], comments: [], createdAt: new Date(Date.now() - 86400000).toISOString(), updatedAt: new Date().toISOString() },
  { _id: 't16', title: 'Complete Tax Filing Documentation', description: 'Prepare and verify all tax-related documentation', status: 'pending', priority: 'critical', category: 'finance', assignedTo: { _id: 'e4', firstName: 'Nadia', lastName: 'Akram', fullName: 'Nadia Akram' } as any, assignedBy: { _id: '5', firstName: 'Kashif', lastName: 'Mehmood', fullName: 'Kashif Mehmood' } as any, dueDate: new Date(Date.now() + 604800000).toISOString(), startDate: new Date().toISOString(), estimatedHours: 10, actualHours: 0, progressPercentage: 0, isEscalated: false, websoftTaskId: 'WS-2024-0035', tags: ['finance', 'tax'], comments: [], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { _id: 't17', title: 'Handle VIP Client Account Setup', description: 'Priority setup for VIP client with custom requirements', status: 'completed', priority: 'critical', category: 'operations', assignedTo: { _id: 'e5', firstName: 'Imran', lastName: 'Haider', fullName: 'Imran Haider' } as any, assignedBy: { _id: '4', firstName: 'Ali', lastName: 'Ahmed', fullName: 'Ali Ahmed' } as any, dueDate: new Date(Date.now() - 86400000).toISOString(), startDate: new Date(Date.now() - 345600000).toISOString(), completedAt: new Date(Date.now() - 172800000).toISOString(), estimatedHours: 5, actualHours: 4, progressPercentage: 100, isEscalated: false, websoftTaskId: 'WS-2024-0029', tags: ['operations', 'vip'], comments: [], createdAt: new Date(Date.now() - 345600000).toISOString(), updatedAt: new Date().toISOString() },
  { _id: 't18', title: 'Generate Weekly Productivity Report', description: 'Compile weekly productivity metrics for all teams', status: 'completed', priority: 'medium', category: 'operations', assignedTo: { _id: 'e1', firstName: 'Hamza', lastName: 'Tariq', fullName: 'Hamza Tariq' } as any, assignedBy: { _id: '4', firstName: 'Ali', lastName: 'Ahmed', fullName: 'Ali Ahmed' } as any, dueDate: new Date(Date.now() - 43200000).toISOString(), startDate: new Date(Date.now() - 259200000).toISOString(), completedAt: new Date(Date.now() - 86400000).toISOString(), estimatedHours: 3, actualHours: 2, progressPercentage: 100, isEscalated: false, websoftTaskId: 'WS-2024-0021', tags: ['operations', 'weekly'], comments: [], createdAt: new Date(Date.now() - 259200000).toISOString(), updatedAt: new Date().toISOString() },
];

export const DEMO_WEEKLY_TREND: WeeklyTrend[] = [
  { date: '2024-05-07', day: 'Mon', completed: 8, created: 12 },
  { date: '2024-05-08', day: 'Tue', completed: 12, created: 9 },
  { date: '2024-05-09', day: 'Wed', completed: 6, created: 11 },
  { date: '2024-05-10', day: 'Thu', completed: 15, created: 8 },
  { date: '2024-05-11', day: 'Fri', completed: 10, created: 14 },
  { date: '2024-05-12', day: 'Sat', completed: 4, created: 3 },
  { date: '2024-05-13', day: 'Sun', completed: 2, created: 5 },
];

export const DEMO_SUPER_ADMIN_KPIS: DashboardKPIs = {
  totalUsers: 16,
  totalTasks: 35,
  overdueCount: 4,
  completedToday: 3,
  completionRate: 74,
  activeDepartments: 5,
  escalatedTasks: 2,
};

export const DEMO_DEPARTMENT_STATS = [
  { name: 'Operations', totalTasks: 12, completed: 8, inProgress: 3, overdue: 1, color: '#6366f1' },
  { name: 'Finance & Billing', totalTasks: 10, completed: 6, inProgress: 3, overdue: 1, color: '#f59e0b' },
  { name: 'Support', totalTasks: 7, completed: 4, inProgress: 2, overdue: 1, color: '#10b981' },
  { name: 'Development', totalTasks: 4, completed: 1, inProgress: 3, overdue: 0, color: '#3b82f6' },
  { name: 'Human Resources', totalTasks: 2, completed: 1, inProgress: 0, overdue: 1, color: '#ec4899' },
];

export const DEMO_TEAM_PERFORMANCE = [
  { name: 'Hamza Tariq', role: 'Operations Executive', totalTasks: 6, completed: 4, overdue: 1, completionRate: 67, score: 75 },
  { name: 'Maryam Khan', role: 'Operations Executive', totalTasks: 5, completed: 3, overdue: 0, completionRate: 60, score: 82 },
  { name: 'Nadia Akram', role: 'Billing Executive', totalTasks: 7, completed: 5, overdue: 1, completionRate: 71, score: 88 },
  { name: 'Talha Sohail', role: 'Operations Analyst', totalTasks: 4, completed: 1, overdue: 1, completionRate: 25, score: 68 },
  { name: 'Imran Haider', role: 'Support Executive', totalTasks: 5, completed: 3, overdue: 0, completionRate: 60, score: 71 },
  { name: 'Sana Fatima', role: 'Support Specialist', totalTasks: 4, completed: 3, overdue: 0, completionRate: 75, score: 89 },
];

export const DEMO_PRODUCTIVITY_MONTHLY = [
  { week: 'Week 1', tasks: 28, completed: 22, efficiency: 79 },
  { week: 'Week 2', tasks: 32, completed: 26, efficiency: 81 },
  { week: 'Week 3', tasks: 25, completed: 20, efficiency: 80 },
  { week: 'Week 4', tasks: 35, completed: 30, efficiency: 86 },
];

export const DEMO_STATUS_DISTRIBUTION = [
  { name: 'Completed', value: 5, color: '#10b981' },
  { name: 'In Progress', value: 6, color: '#3b82f6' },
  { name: 'Pending', value: 4, color: '#f59e0b' },
  { name: 'Under Review', value: 1, color: '#8b5cf6' },
  { name: 'Escalated', value: 2, color: '#ef4444' },
];

export const DEMO_PRIORITY_DISTRIBUTION = [
  { name: 'Critical', value: 6, color: '#ef4444' },
  { name: 'High', value: 7, color: '#f59e0b' },
  { name: 'Medium', value: 4, color: '#3b82f6' },
  { name: 'Low', value: 1, color: '#6b7280' },
];

export const DEMO_RECENT_ACTIVITY: { id: number; action: string; detail: string; user: string; time: string; type: "success" | "warning" | "error" | "info" }[] = [
  { id: 1, action: 'Task completed', detail: 'Handle VIP Client Account Setup', user: 'Imran Haider', time: '2 hours ago', type: 'success' },
  { id: 2, action: 'Task escalated', detail: 'Review Customer Complaint #4521', user: 'Ali Ahmed', time: '3 hours ago', type: 'warning' },
  { id: 3, action: 'New task created', detail: 'Complete Tax Filing Documentation', user: 'Kashif Mehmood', time: '4 hours ago', type: 'info' },
  { id: 4, action: 'Task assigned', detail: 'Audit System Access Permissions', user: 'Fatima Zahra', time: '5 hours ago', type: 'info' },
  { id: 5, action: 'Payment gateway error', detail: 'Investigate Payment Gateway Errors - Critical', user: 'System', time: '6 hours ago', type: 'error' },
  { id: 6, action: 'Task completed', detail: 'Process Refund Request - Ticket #3344', user: 'Nadia Akram', time: '8 hours ago', type: 'success' },
  { id: 7, action: 'Websoft sync completed', detail: '35 records synced successfully', user: 'System', time: '12 hours ago', type: 'success' },
  { id: 8, action: 'New user onboarded', detail: 'Sana Fatima - Support Specialist', user: 'HR System', time: '1 day ago', type: 'info' },
];

export const DEMO_NOTIFICATIONS = [
  { _id: 'n1', type: 'task_overdue', title: 'Task Overdue', message: 'Review Customer Complaint #4521 is past deadline', isRead: false, createdAt: new Date(Date.now() - 3600000).toISOString() },
  { _id: 'n2', type: 'escalation', title: 'Task Escalated', message: 'Payment Gateway investigation escalated to your attention', isRead: false, createdAt: new Date(Date.now() - 7200000).toISOString() },
  { _id: 'n3', type: 'task_completed', title: 'Task Completed', message: 'VIP Client Account Setup has been completed by Imran', isRead: false, createdAt: new Date(Date.now() - 10800000).toISOString() },
  { _id: 'n4', type: 'system', title: 'Websoft Sync Complete', message: '35 tasks synced from Websoft Day Planner', isRead: true, createdAt: new Date(Date.now() - 43200000).toISOString() },
  { _id: 'n5', type: 'reminder', title: 'Deadline Tomorrow', message: 'Process Month-End Reconciliation due tomorrow', isRead: true, createdAt: new Date(Date.now() - 86400000).toISOString() },
];
