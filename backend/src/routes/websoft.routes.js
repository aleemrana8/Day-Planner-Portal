const router = require('express').Router();
const websoft = require('../controllers/websoft.controller');
const authenticate = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');

router.use(authenticate);
router.post('/sync', authorize('super_admin'), websoft.syncDayPlanner);
router.get('/sync-status', authorize('super_admin'), websoft.getSyncStatus);
router.get('/health', authorize('super_admin'), websoft.getApiHealth);

module.exports = router;
