const User = require('../models/User');
const ActivityLog = require('../models/ActivityLog');
const { ROLE_PERMISSIONS } = require('../middleware/rbac');
const logger = require('../config/logger');

exports.getUsers = async (req, res) => {
  try {
    const { role, status, department, search, page = 1, limit = 20 } = req.query;
    const filter = {};

    // Hierarchical filtering
    if (req.user.role !== 'super_admin') {
      const creatableRoles = ROLE_PERMISSIONS[req.user.role]?.canCreate || [];
      filter.role = { $in: [...creatableRoles, req.user.role] };
      if (req.user.department) filter.department = req.user.department;
    }

    if (role) filter.role = role;
    if (status) filter.status = status;
    if (department) filter.department = department;
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const users = await User.find(filter)
      .populate('department team managedBy')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(filter);

    res.json({
      success: true,
      data: users,
      pagination: { total, page: parseInt(page), limit: parseInt(limit), pages: Math.ceil(total / parseInt(limit)) }
    });
  } catch (error) {
    logger.error('Get users error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch users' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, department, team, designation, phone } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'Email already registered' });
    }

    const user = await User.create({
      firstName, lastName, email, password, role,
      department, team, designation, phone,
      managedBy: req.user._id
    });

    await ActivityLog.create({
      user: req.user._id,
      action: 'create_user',
      resource: 'users',
      resourceId: user._id,
      details: `Created user ${user.fullName} with role ${role}`
    });

    res.status(201).json({ success: true, data: user });
  } catch (error) {
    logger.error('Create user error:', error);
    res.status(500).json({ success: false, error: 'Failed to create user' });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('department team managedBy');
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch user' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const allowedFields = ['firstName', 'lastName', 'role', 'department', 'team', 'status', 'designation', 'phone'];
    const updates = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    }

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update user' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { status: 'inactive' }, { new: true });
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.json({ success: true, message: 'User deactivated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete user' });
  }
};

exports.getUserStats = async (req, res) => {
  try {
    const stats = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } },
    ]);
    const statusStats = await User.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);
    const total = await User.countDocuments();

    res.json({
      success: true,
      data: { total, byRole: stats, byStatus: statusStats }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch user stats' });
  }
};
