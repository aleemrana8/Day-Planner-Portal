const Task = require('../models/Task');
const User = require('../models/User');
const Department = require('../models/Department');
const ApiSyncLog = require('../models/ApiSyncLog');
const logger = require('../config/logger');

const getDateRange = (range) => {
  const now = new Date();
  const start = new Date();
  switch (range) {
    case 'today': start.setHours(0, 0, 0, 0); break;
    case 'week': start.setDate(now.getDate() - 7); break;
    case 'month': start.setMonth(now.getMonth() - 1); break;
    case 'quarter': start.setMonth(now.getMonth() - 3); break;
    case 'year': start.setFullYear(now.getFullYear() - 1); break;
    default: start.setDate(now.getDate() - 30);
  }
  return { start, end: now };
};

exports.getSuperAdminDashboard = async (req, res) => {
  try {
    const [
      totalUsers, totalTasks, departments,
      tasksByStatus, tasksByPriority, tasksByDepartment,
      recentTasks, overdueCount, completedToday,
      syncLogs, usersByRole
    ] = await Promise.all([
      User.countDocuments({ status: 'active' }),
      Task.countDocuments(),
      Department.find({ status: 'active' }),
      Task.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
      Task.aggregate([{ $group: { _id: '$priority', count: { $sum: 1 } } }]),
      Task.aggregate([
        { $lookup: { from: 'departments', localField: 'department', foreignField: '_id', as: 'dept' } },
        { $unwind: { path: '$dept', preserveNullAndEmptyArrays: true } },
        { $group: { _id: '$dept.name', count: { $sum: 1 }, completed: { $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] } } } }
      ]),
      Task.find().populate('assignedTo', 'firstName lastName avatar').sort('-createdAt').limit(10),
      Task.countDocuments({ dueDate: { $lt: new Date() }, status: { $nin: ['completed', 'cancelled'] } }),
      Task.countDocuments({ status: 'completed', completedAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) } }),
      ApiSyncLog.find().sort('-createdAt').limit(5),
      User.aggregate([{ $match: { status: 'active' } }, { $group: { _id: '$role', count: { $sum: 1 } } }])
    ]);

    // Weekly productivity trend
    const weeklyTrend = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayStart = new Date(date.setHours(0, 0, 0, 0));
      const dayEnd = new Date(date.setHours(23, 59, 59, 999));
      const completed = await Task.countDocuments({ status: 'completed', completedAt: { $gte: dayStart, $lte: dayEnd } });
      const created = await Task.countDocuments({ createdAt: { $gte: dayStart, $lte: dayEnd } });
      weeklyTrend.push({
        date: dayStart.toISOString().split('T')[0],
        day: dayStart.toLocaleDateString('en', { weekday: 'short' }),
        completed, created
      });
    }

    const completionRate = totalTasks > 0
      ? Math.round((tasksByStatus.find(s => s._id === 'completed')?.count || 0) / totalTasks * 100) : 0;

    res.json({
      success: true,
      data: {
        kpis: {
          totalUsers, totalTasks, overdueCount, completedToday,
          completionRate, activeDepartments: departments.length,
          escalatedTasks: tasksByStatus.find(s => s._id === 'escalated')?.count || 0
        },
        tasksByStatus, tasksByPriority, tasksByDepartment,
        weeklyTrend, recentTasks, syncLogs, usersByRole, departments
      }
    });
  } catch (error) {
    logger.error('Super admin dashboard error:', error);
    res.status(500).json({ success: false, error: 'Failed to load dashboard' });
  }
};

exports.getDirectorDashboard = async (req, res) => {
  try {
    const deptFilter = req.user.department ? { department: req.user.department } : {};
    const [totalTasks, tasksByStatus, tasksByPriority, teamMembers, recentTasks] = await Promise.all([
      Task.countDocuments(deptFilter),
      Task.aggregate([{ $match: deptFilter }, { $group: { _id: '$status', count: { $sum: 1 } } }]),
      Task.aggregate([{ $match: deptFilter }, { $group: { _id: '$priority', count: { $sum: 1 } } }]),
      User.countDocuments({ department: req.user.department, status: 'active' }),
      Task.find(deptFilter).populate('assignedTo', 'firstName lastName').sort('-createdAt').limit(10)
    ]);

    const overdueCount = await Task.countDocuments({ ...deptFilter, dueDate: { $lt: new Date() }, status: { $nin: ['completed', 'cancelled'] } });

    res.json({
      success: true,
      data: {
        kpis: { totalTasks, teamMembers, overdueCount, completionRate: totalTasks > 0 ? Math.round((tasksByStatus.find(s => s._id === 'completed')?.count || 0) / totalTasks * 100) : 0 },
        tasksByStatus, tasksByPriority, recentTasks
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to load dashboard' });
  }
};

exports.getLeadDashboard = async (req, res) => {
  try {
    const filter = { $or: [{ assignedTo: req.user._id }, { assignedBy: req.user._id }] };
    const [totalTasks, tasksByStatus, tasksByPriority, recentTasks] = await Promise.all([
      Task.countDocuments(filter),
      Task.aggregate([{ $match: filter }, { $group: { _id: '$status', count: { $sum: 1 } } }]),
      Task.aggregate([{ $match: filter }, { $group: { _id: '$priority', count: { $sum: 1 } } }]),
      Task.find(filter).populate('assignedTo', 'firstName lastName').sort('-createdAt').limit(10)
    ]);

    res.json({
      success: true,
      data: {
        kpis: { totalTasks, completionRate: totalTasks > 0 ? Math.round((tasksByStatus.find(s => s._id === 'completed')?.count || 0) / totalTasks * 100) : 0 },
        tasksByStatus, tasksByPriority, recentTasks
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to load dashboard' });
  }
};

exports.getAccountsDashboard = async (req, res) => {
  try {
    const filter = { category: { $in: ['finance', 'billing'] } };
    const [totalTasks, tasksByStatus, recentTasks] = await Promise.all([
      Task.countDocuments(filter),
      Task.aggregate([{ $match: filter }, { $group: { _id: '$status', count: { $sum: 1 } } }]),
      Task.find(filter).populate('assignedTo', 'firstName lastName').sort('-createdAt').limit(10)
    ]);

    res.json({
      success: true,
      data: {
        kpis: { totalTasks, pendingApprovals: tasksByStatus.find(s => s._id === 'under_review')?.count || 0 },
        tasksByStatus, recentTasks
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to load dashboard' });
  }
};
