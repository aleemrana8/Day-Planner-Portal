const router = require('express').Router();
const analytics = require('../controllers/analytics.controller');
const authenticate = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');

router.use(authenticate);
router.get('/productivity', analytics.getProductivityAnalytics);
router.get('/team-performance', authorize('super_admin', 'director', 'assistant_director', 'lead'), analytics.getTeamPerformance);
router.get('/departments', authorize('super_admin', 'director'), analytics.getDepartmentAnalytics);
router.get('/workload', authorize('super_admin', 'director', 'assistant_director'), analytics.getWorkloadDistribution);

module.exports = router;
