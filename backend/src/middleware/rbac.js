const ROLE_HIERARCHY = {
  super_admin: 6,
  director: 5,
  assistant_director: 4,
  lead: 3,
  accounts_manager: 2,
  employee: 1
};

const ROLE_PERMISSIONS = {
  super_admin: {
    canCreate: ['director', 'assistant_director', 'lead', 'accounts_manager', 'employee'],
    canView: ['all'],
    canManage: ['all'],
    modules: ['dashboard', 'users', 'tasks', 'analytics', 'reports', 'settings', 'api_monitor', 'departments', 'teams', 'notifications', 'audit']
  },
  director: {
    canCreate: ['assistant_director', 'lead', 'employee'],
    canView: ['department'],
    canManage: ['department'],
    modules: ['dashboard', 'users', 'tasks', 'analytics', 'reports', 'teams', 'notifications']
  },
  assistant_director: {
    canCreate: ['lead', 'employee'],
    canView: ['team'],
    canManage: ['team'],
    modules: ['dashboard', 'tasks', 'analytics', 'reports', 'notifications']
  },
  lead: {
    canCreate: ['employee'],
    canView: ['assigned'],
    canManage: ['assigned'],
    modules: ['dashboard', 'tasks', 'reports', 'notifications']
  },
  accounts_manager: {
    canCreate: [],
    canView: ['financial'],
    canManage: ['financial'],
    modules: ['dashboard', 'tasks', 'reports', 'notifications', 'billing']
  },
  employee: {
    canCreate: [],
    canView: ['own'],
    canManage: ['own'],
    modules: ['dashboard', 'tasks', 'notifications']
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Authentication required' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, error: 'Insufficient permissions for this action' });
    }
    next();
  };
};

const authorizeModule = (module) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Authentication required' });
    }
    const permissions = ROLE_PERMISSIONS[req.user.role];
    if (!permissions || !permissions.modules.includes(module)) {
      return res.status(403).json({ success: false, error: 'Access to this module is restricted' });
    }
    next();
  };
};

const canCreateRole = (req, res, next) => {
  const targetRole = req.body.role;
  if (!targetRole) return next();

  const permissions = ROLE_PERMISSIONS[req.user.role];
  if (!permissions || !permissions.canCreate.includes(targetRole)) {
    return res.status(403).json({
      success: false,
      error: `Your role cannot create users with role: ${targetRole}`
    });
  }
  next();
};

const hierarchicalAccess = async (req, res, next) => {
  if (req.user.role === 'super_admin') return next();

  const userLevel = ROLE_HIERARCHY[req.user.role] || 0;
  req.hierarchyLevel = userLevel;
  req.rolePermissions = ROLE_PERMISSIONS[req.user.role];
  next();
};

module.exports = {
  authorize,
  authorizeModule,
  canCreateRole,
  hierarchicalAccess,
  ROLE_HIERARCHY,
  ROLE_PERMISSIONS
};
