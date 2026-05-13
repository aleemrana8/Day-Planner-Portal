const Task = require('../models/Task');
const User = require('../models/User');
const logger = require('../config/logger');

exports.getProductivityAnalytics = async (req, res) => {
  try {
    const { range = 'month' } = req.query;
    const days = range === 'week' ? 7 : range === 'month' ? 30 : 90;

    const trend = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const start = new Date(date.setHours(0, 0, 0, 0));
      const end = new Date(date.setHours(23, 59, 59, 999));
      const [completed, created] = await Promise.all([
        Task.countDocuments({ status: 'completed', completedAt: { $gte: start, $lte: end } }),
        Task.countDocuments({ createdAt: { $gte: start, $lte: end } })
      ]);
      trend.push({ date: start.toISOString().split('T')[0], completed, created });
    }

    res.json({ success: true, data: { trend } });
  } catch (error) {
    logger.error('Productivity analytics error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch analytics' });
  }
};

exports.getTeamPerformance = async (req, res) => {
  try {
    const performance = await Task.aggregate([
      { $lookup: { from: 'users', localField: 'assignedTo', foreignField: '_id', as: 'user' } },
      { $unwind: '$user' },
      { $group: {
        _id: '$user._id',
        name: { $first: { $concat: ['$user.firstName', ' ', '$user.lastName'] } },
        role: { $first: '$user.role' },
        totalTasks: { $sum: 1 },
        completed: { $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] } },
        overdue: { $sum: { $cond: [{ $and: [{ $lt: ['$dueDate', new Date()] }, { $ne: ['$status', 'completed'] }] }, 1, 0] } }
      }},
      { $addFields: { completionRate: { $multiply: [{ $divide: ['$completed', { $max: ['$totalTasks', 1] }] }, 100] } } },
      { $sort: { completionRate: -1 } },
      { $limit: 20 }
    ]);

    res.json({ success: true, data: performance });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch team performance' });
  }
};

exports.getDepartmentAnalytics = async (req, res) => {
  try {
    const analytics = await Task.aggregate([
      { $lookup: { from: 'departments', localField: 'department', foreignField: '_id', as: 'dept' } },
      { $unwind: { path: '$dept', preserveNullAndEmptyArrays: true } },
      { $group: {
        _id: '$dept.name',
        totalTasks: { $sum: 1 },
        completed: { $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] } },
        inProgress: { $sum: { $cond: [{ $eq: ['$status', 'in_progress'] }, 1, 0] } },
        overdue: { $sum: { $cond: [{ $and: [{ $lt: ['$dueDate', new Date()] }, { $ne: ['$status', 'completed'] }] }, 1, 0] } }
      }}
    ]);

    res.json({ success: true, data: analytics });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch department analytics' });
  }
};

exports.getWorkloadDistribution = async (req, res) => {
  try {
    const workload = await Task.aggregate([
      { $match: { status: { $in: ['pending', 'in_progress'] } } },
      { $lookup: { from: 'users', localField: 'assignedTo', foreignField: '_id', as: 'user' } },
      { $unwind: '$user' },
      { $group: {
        _id: '$user._id',
        name: { $first: { $concat: ['$user.firstName', ' ', '$user.lastName'] } },
        activeTasks: { $sum: 1 },
        criticalTasks: { $sum: { $cond: [{ $eq: ['$priority', 'critical'] }, 1, 0] } },
        highTasks: { $sum: { $cond: [{ $eq: ['$priority', 'high'] }, 1, 0] } }
      }},
      { $sort: { activeTasks: -1 } }
    ]);

    res.json({ success: true, data: workload });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch workload distribution' });
  }
};
