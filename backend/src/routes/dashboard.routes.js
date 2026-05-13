const router = require('express').Router();
const dashboard = require('../controllers/dashboard.controller');
const authenticate = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');

router.use(authenticate);
router.get('/super-admin', authorize('super_admin'), dashboard.getSuperAdminDashboard);
router.get('/director', authorize('super_admin', 'director'), dashboard.getDirectorDashboard);
router.get('/assistant-director', authorize('super_admin', 'director', 'assistant_director'), dashboard.getDirectorDashboard);
router.get('/lead', authorize('super_admin', 'director', 'assistant_director', 'lead'), dashboard.getLeadDashboard);
router.get('/accounts', authorize('super_admin', 'accounts_manager'), dashboard.getAccountsDashboard);

module.exports = router;
