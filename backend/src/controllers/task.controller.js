const Task = require('../models/Task');
const ActivityLog = require('../models/ActivityLog');
const { ROLE_PERMISSIONS } = require('../middleware/rbac');
const logger = require('../config/logger');

const getTaskFilter = (user) => {
  const filter = {};
  switch (user.role) {
    case 'super_admin': break;
    case 'director': filter.department = user.department; break;
    case 'assistant_director': filter.team = user.team; break;
    case 'lead': filter.$or = [{ assignedTo: user._id }, { assignedBy: user._id }]; break;
    case 'accounts_manager': filter.category = 'finance'; break;
    default: filter.assignedTo = user._id;
  }
  return filter;
};

exports.getTasks = async (req, res) => {
  try {
    const { status, priority, category, assignedTo, search, page = 1, limit = 20, sort = '-createdAt' } = req.query;
    const filter = getTaskFilter(req.user);

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (category) filter.category = category;
    if (assignedTo) filter.assignedTo = assignedTo;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const tasks = await Task.find(filter)
      .populate('assignedTo assignedBy department team')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Task.countDocuments(filter);

    res.json({
      success: true,
      data: tasks,
      pagination: { total, page: parseInt(page), limit: parseInt(limit), pages: Math.ceil(total / parseInt(limit)) }
    });
  } catch (error) {
    logger.error('Get tasks error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch tasks' });
  }
};

exports.createTask = async (req, res) => {
  try {
    const taskData = { ...req.body, assignedBy: req.user._id };
    if (!taskData.department && req.user.department) taskData.department = req.user.department;
    if (!taskData.team && req.user.team) taskData.team = req.user.team;

    const task = await Task.create(taskData);

    await ActivityLog.create({
      user: req.user._id,
      action: 'create_task',
      resource: 'tasks',
      resourceId: task._id,
      details: `Created task: ${task.title}`
    });

    const populated = await task.populate('assignedTo assignedBy department team');
    res.status(201).json({ success: true, data: populated });
  } catch (error) {
    logger.error('Create task error:', error);
    res.status(500).json({ success: false, error: 'Failed to create task' });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('assignedTo assignedBy department team escalatedTo')
      .populate('comments.user', 'firstName lastName avatar');
    if (!task) return res.status(404).json({ success: false, error: 'Task not found' });
    res.json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch task' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ success: false, error: 'Task not found' });

    const updates = req.body;
    if (updates.status === 'completed') updates.completedAt = new Date();

    const updated = await Task.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true })
      .populate('assignedTo assignedBy department team');

    await ActivityLog.create({
      user: req.user._id,
      action: 'update_task',
      resource: 'tasks',
      resourceId: task._id,
      details: `Updated task: ${task.title}`
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update task' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { status: 'cancelled' }, { new: true });
    if (!task) return res.status(404).json({ success: false, error: 'Task not found' });
    res.json({ success: true, message: 'Task cancelled successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete task' });
  }
};

exports.addComment = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: { user: req.user._id, text: req.body.text } } },
      { new: true }
    ).populate('comments.user', 'firstName lastName avatar');

    res.json({ success: true, data: task.comments });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to add comment' });
  }
};

exports.escalateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        isEscalated: true,
        escalatedTo: req.body.escalatedTo,
        escalationReason: req.body.reason,
        status: 'escalated'
      },
      { new: true }
    ).populate('assignedTo escalatedTo');

    res.json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to escalate task' });
  }
};

exports.getTaskStats = async (req, res) => {
  try {
    const filter = getTaskFilter(req.user);
    const [statusStats, priorityStats, categoryStats, total] = await Promise.all([
      Task.aggregate([{ $match: filter }, { $group: { _id: '$status', count: { $sum: 1 } } }]),
      Task.aggregate([{ $match: filter }, { $group: { _id: '$priority', count: { $sum: 1 } } }]),
      Task.aggregate([{ $match: filter }, { $group: { _id: '$category', count: { $sum: 1 } } }]),
      Task.countDocuments(filter)
    ]);

    const overdue = await Task.countDocuments({ ...filter, dueDate: { $lt: new Date() }, status: { $nin: ['completed', 'cancelled'] } });
    const completedToday = await Task.countDocuments({
      ...filter,
      status: 'completed',
      completedAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
    });

    res.json({
      success: true,
      data: { total, overdue, completedToday, byStatus: statusStats, byPriority: priorityStats, byCategory: categoryStats }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch task stats' });
  }
};
