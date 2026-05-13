require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Department = require('../models/Department');
const Team = require('../models/Team');
const Task = require('../models/Task');
const Notification = require('../models/Notification');
const ApiSyncLog = require('../models/ApiSyncLog');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/day-planner-portal');
    console.log('📦 Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}), Department.deleteMany({}), Team.deleteMany({}),
      Task.deleteMany({}), Notification.deleteMany({}), ApiSyncLog.deleteMany({})
    ]);
    console.log('🧹 Cleared existing data');

    // Create departments
    const departments = await Department.insertMany([
      { name: 'Operations', code: 'OPS', color: '#6366f1', description: 'Core operations & day planning' },
      { name: 'Finance & Billing', code: 'FIN', color: '#f59e0b', description: 'Financial operations & billing' },
      { name: 'Support', code: 'SUP', color: '#10b981', description: 'Customer support & service' },
      { name: 'Development', code: 'DEV', color: '#3b82f6', description: 'Software development & IT' },
      { name: 'Human Resources', code: 'HR', color: '#ec4899', description: 'HR management & recruitment' }
    ]);
    console.log('🏢 Departments created');

    // Create Super Admin
    const superAdmin = await User.create({
      firstName: 'Muhammad', lastName: 'Aleem', email: 'admin@dayplanner.com',
      password: 'Admin@123456', role: 'super_admin', designation: 'Chief Executive',
      performanceScore: 98, status: 'active'
    });

    // Create Directors
    const directors = await User.insertMany([
      { firstName: 'Ahmed', lastName: 'Khan', email: 'ahmed.khan@dayplanner.com', password: await bcrypt.hash('Director@123', 12), role: 'director', department: departments[0]._id, managedBy: superAdmin._id, designation: 'Director of Operations', performanceScore: 92 },
      { firstName: 'Sara', lastName: 'Ali', email: 'sara.ali@dayplanner.com', password: await bcrypt.hash('Director@123', 12), role: 'director', department: departments[1]._id, managedBy: superAdmin._id, designation: 'Director of Finance', performanceScore: 88 },
      { firstName: 'Usman', lastName: 'Malik', email: 'usman.malik@dayplanner.com', password: await bcrypt.hash('Director@123', 12), role: 'director', department: departments[2]._id, managedBy: superAdmin._id, designation: 'Director of Support', performanceScore: 85 },
    ]);

    // Create Assistant Directors
    const assistantDirectors = await User.insertMany([
      { firstName: 'Fatima', lastName: 'Zahra', email: 'fatima.zahra@dayplanner.com', password: await bcrypt.hash('AD@123456', 12), role: 'assistant_director', department: departments[0]._id, managedBy: directors[0]._id, designation: 'Asst. Director Operations', performanceScore: 87 },
      { firstName: 'Hassan', lastName: 'Raza', email: 'hassan.raza@dayplanner.com', password: await bcrypt.hash('AD@123456', 12), role: 'assistant_director', department: departments[1]._id, managedBy: directors[1]._id, designation: 'Asst. Director Finance', performanceScore: 83 },
      { firstName: 'Ayesha', lastName: 'Siddiqui', email: 'ayesha.s@dayplanner.com', password: await bcrypt.hash('AD@123456', 12), role: 'assistant_director', department: departments[2]._id, managedBy: directors[2]._id, designation: 'Asst. Director Support', performanceScore: 90 },
    ]);

    // Create Teams
    const teams = await Team.insertMany([
      { name: 'Alpha Operations', department: departments[0]._id, lead: null, color: '#818cf8' },
      { name: 'Beta Operations', department: departments[0]._id, lead: null, color: '#a78bfa' },
      { name: 'Billing Team', department: departments[1]._id, lead: null, color: '#fbbf24' },
      { name: 'Support Team A', department: departments[2]._id, lead: null, color: '#34d399' },
      { name: 'Support Team B', department: departments[2]._id, lead: null, color: '#6ee7b7' },
    ]);

    // Create Leads
    const leads = await User.insertMany([
      { firstName: 'Ali', lastName: 'Ahmed', email: 'ali.ahmed@dayplanner.com', password: await bcrypt.hash('Lead@12345', 12), role: 'lead', department: departments[0]._id, team: teams[0]._id, managedBy: assistantDirectors[0]._id, designation: 'Team Lead - Alpha', performanceScore: 82 },
      { firstName: 'Bilal', lastName: 'Hussain', email: 'bilal.h@dayplanner.com', password: await bcrypt.hash('Lead@12345', 12), role: 'lead', department: departments[0]._id, team: teams[1]._id, managedBy: assistantDirectors[0]._id, designation: 'Team Lead - Beta', performanceScore: 79 },
      { firstName: 'Zainab', lastName: 'Noor', email: 'zainab.n@dayplanner.com', password: await bcrypt.hash('Lead@12345', 12), role: 'lead', department: departments[2]._id, team: teams[3]._id, managedBy: assistantDirectors[2]._id, designation: 'Team Lead - Support A', performanceScore: 91 },
    ]);

    // Update team leads
    await Team.findByIdAndUpdate(teams[0]._id, { lead: leads[0]._id });
    await Team.findByIdAndUpdate(teams[1]._id, { lead: leads[1]._id });
    await Team.findByIdAndUpdate(teams[3]._id, { lead: leads[2]._id });

    // Create Accounts Manager
    const accountsManager = await User.create({
      firstName: 'Kashif', lastName: 'Mehmood', email: 'kashif.m@dayplanner.com',
      password: await bcrypt.hash('Accounts@123', 12), role: 'accounts_manager',
      department: departments[1]._id, managedBy: directors[1]._id,
      designation: 'Accounts Manager', performanceScore: 86
    });

    // Create Employees
    const employees = await User.insertMany([
      { firstName: 'Hamza', lastName: 'Tariq', email: 'hamza.t@dayplanner.com', password: await bcrypt.hash('Emp@123456', 12), role: 'employee', department: departments[0]._id, team: teams[0]._id, managedBy: leads[0]._id, designation: 'Operations Executive', performanceScore: 75 },
      { firstName: 'Maryam', lastName: 'Khan', email: 'maryam.k@dayplanner.com', password: await bcrypt.hash('Emp@123456', 12), role: 'employee', department: departments[0]._id, team: teams[0]._id, managedBy: leads[0]._id, designation: 'Operations Executive', performanceScore: 82 },
      { firstName: 'Talha', lastName: 'Sohail', email: 'talha.s@dayplanner.com', password: await bcrypt.hash('Emp@123456', 12), role: 'employee', department: departments[0]._id, team: teams[1]._id, managedBy: leads[1]._id, designation: 'Operations Analyst', performanceScore: 68 },
      { firstName: 'Nadia', lastName: 'Akram', email: 'nadia.a@dayplanner.com', password: await bcrypt.hash('Emp@123456', 12), role: 'employee', department: departments[1]._id, team: teams[2]._id, managedBy: accountsManager._id, designation: 'Billing Executive', performanceScore: 88 },
      { firstName: 'Imran', lastName: 'Haider', email: 'imran.h@dayplanner.com', password: await bcrypt.hash('Emp@123456', 12), role: 'employee', department: departments[2]._id, team: teams[3]._id, managedBy: leads[2]._id, designation: 'Support Executive', performanceScore: 71 },
      { firstName: 'Sana', lastName: 'Fatima', email: 'sana.f@dayplanner.com', password: await bcrypt.hash('Emp@123456', 12), role: 'employee', department: departments[2]._id, team: teams[4]._id, managedBy: leads[2]._id, designation: 'Support Specialist', performanceScore: 89 },
    ]);
    console.log('👥 Users created');

    // Create Tasks (Day Planner demo data)
    const allUsers = [superAdmin, ...directors, ...assistantDirectors, ...leads, accountsManager, ...employees];
    const statuses = ['pending', 'in_progress', 'under_review', 'completed', 'overdue', 'escalated'];
    const priorities = ['critical', 'high', 'medium', 'low'];
    const categories = ['billing', 'operations', 'support', 'development', 'admin', 'finance'];

    const taskTemplates = [
      { title: 'Process Daily Billing Reports', category: 'billing', priority: 'high' },
      { title: 'Review Customer Complaint #4521', category: 'support', priority: 'critical' },
      { title: 'Update Client Account Records', category: 'billing', priority: 'medium' },
      { title: 'Complete Monthly Operations Review', category: 'operations', priority: 'high' },
      { title: 'Prepare Executive Summary Report', category: 'admin', priority: 'high' },
      { title: 'Resolve Billing Discrepancy - Invoice #7823', category: 'finance', priority: 'critical' },
      { title: 'Train New Team Members on Portal', category: 'operations', priority: 'medium' },
      { title: 'Audit System Access Permissions', category: 'admin', priority: 'high' },
      { title: 'Process Refund Request - Ticket #3344', category: 'billing', priority: 'medium' },
      { title: 'Setup Automated Daily Reports', category: 'development', priority: 'medium' },
      { title: 'Review SLA Compliance Metrics', category: 'operations', priority: 'high' },
      { title: 'Prepare Department Budget Proposal', category: 'finance', priority: 'high' },
      { title: 'Investigate Payment Gateway Errors', category: 'billing', priority: 'critical' },
      { title: 'Customer Onboarding - Enterprise Client', category: 'operations', priority: 'high' },
      { title: 'Update Billing System Configuration', category: 'billing', priority: 'medium' },
      { title: 'Process Insurance Claims Batch #892', category: 'finance', priority: 'high' },
      { title: 'Resolve Network Connectivity Issues', category: 'support', priority: 'critical' },
      { title: 'Complete Quarterly Performance Reviews', category: 'admin', priority: 'medium' },
      { title: 'Migrate Legacy Data to New System', category: 'development', priority: 'high' },
      { title: 'Handle Escalated Client Request #5567', category: 'support', priority: 'critical' },
      { title: 'Generate Weekly Productivity Report', category: 'operations', priority: 'medium' },
      { title: 'Review and Approve Expense Claims', category: 'finance', priority: 'medium' },
      { title: 'Configure Automated Alert System', category: 'development', priority: 'low' },
      { title: 'Conduct Team Stand-up Meeting Notes', category: 'operations', priority: 'low' },
      { title: 'Update Customer Service Protocols', category: 'support', priority: 'medium' },
      { title: 'Process Month-End Reconciliation', category: 'finance', priority: 'critical' },
      { title: 'Create Training Documentation', category: 'admin', priority: 'low' },
      { title: 'Optimize Database Performance', category: 'development', priority: 'high' },
      { title: 'Handle VIP Client Account Setup', category: 'operations', priority: 'critical' },
      { title: 'Review Third-Party API Integration', category: 'development', priority: 'medium' },
      { title: 'Daily Cash Flow Analysis', category: 'finance', priority: 'high' },
      { title: 'Process Staff Attendance Records', category: 'admin', priority: 'low' },
      { title: 'Resolve Data Sync Issues with Websoft', category: 'development', priority: 'critical' },
      { title: 'Prepare Client Presentation Materials', category: 'operations', priority: 'medium' },
      { title: 'Complete Tax Filing Documentation', category: 'finance', priority: 'critical' },
    ];

    const tasks = [];
    for (let i = 0; i < taskTemplates.length; i++) {
      const tmpl = taskTemplates[i];
      const assignee = employees[i % employees.length];
      const assigner = leads[i % leads.length];
      const daysAgo = Math.floor(Math.random() * 14);
      const dueInDays = Math.floor(Math.random() * 10) - 3;
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      const createdAt = new Date();
      createdAt.setDate(createdAt.getDate() - daysAgo);
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + dueInDays);

      tasks.push({
        title: tmpl.title,
        description: `Task synced from Websoft Day Planner. ${tmpl.title} - assigned for processing and completion.`,
        status,
        priority: tmpl.priority || priorities[Math.floor(Math.random() * priorities.length)],
        category: tmpl.category,
        assignedTo: assignee._id,
        assignedBy: assigner._id,
        department: assignee.department,
        team: assignee.team,
        dueDate,
        startDate: createdAt,
        completedAt: status === 'completed' ? new Date() : undefined,
        estimatedHours: Math.floor(Math.random() * 8) + 1,
        actualHours: status === 'completed' ? Math.floor(Math.random() * 10) + 1 : 0,
        progressPercentage: status === 'completed' ? 100 : Math.floor(Math.random() * 80),
        isEscalated: status === 'escalated',
        websoftTaskId: `WS-${2024}-${String(i + 1).padStart(4, '0')}`,
        websoftSyncedAt: new Date(),
        tags: [tmpl.category, tmpl.priority],
        createdAt
      });
    }

    await Task.insertMany(tasks);
    console.log('📋 Tasks created');

    // Create notifications
    const notifTemplates = [
      { type: 'task_assigned', title: 'New Task Assigned', message: 'You have been assigned a new task: Process Daily Billing Reports' },
      { type: 'task_overdue', title: 'Task Overdue', message: 'Task "Review Customer Complaint #4521" is past its deadline' },
      { type: 'escalation', title: 'Task Escalated', message: 'Task "Resolve Billing Discrepancy" has been escalated to your attention' },
      { type: 'system', title: 'System Update', message: 'Day Planner Portal v1.0 is now live with new analytics features' },
      { type: 'reminder', title: 'Deadline Approaching', message: 'Task "Complete Monthly Operations Review" is due tomorrow' },
    ];

    const notifications = [];
    for (const user of allUsers.slice(0, 8)) {
      for (const notif of notifTemplates) {
        notifications.push({ ...notif, user: user._id, isRead: Math.random() > 0.5 });
      }
    }
    await Notification.insertMany(notifications);
    console.log('🔔 Notifications created');

    // Create API sync logs
    await ApiSyncLog.insertMany([
      { source: 'websoft', endpoint: '/day-planner/tasks', status: 'success', recordsFetched: 35, recordsSynced: 35, duration: 1240, syncedBy: superAdmin._id },
      { source: 'websoft', endpoint: '/day-planner/tasks', status: 'success', recordsFetched: 28, recordsSynced: 28, duration: 980, syncedBy: superAdmin._id },
      { source: 'websoft', endpoint: '/billing/accounts', status: 'success', recordsFetched: 15, recordsSynced: 15, duration: 720, syncedBy: superAdmin._id },
      { source: 'securesoft', endpoint: '/users/sync', status: 'partial', recordsFetched: 20, recordsSynced: 18, recordsFailed: 2, duration: 2100, syncedBy: superAdmin._id, errorMessage: '2 records had validation errors' },
    ]);
    console.log('🔄 Sync logs created');

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📧 Login Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Super Admin:  admin@dayplanner.com / Admin@123456');
    console.log('Director:     ahmed.khan@dayplanner.com / Director@123');
    console.log('Asst. Dir:    fatima.zahra@dayplanner.com / AD@123456');
    console.log('Lead:         ali.ahmed@dayplanner.com / Lead@12345');
    console.log('Accounts:     kashif.m@dayplanner.com / Accounts@123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seed();
