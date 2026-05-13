const router = require('express').Router();
const users = require('../controllers/user.controller');
const authenticate = require('../middleware/auth');
const { authorize, canCreateRole } = require('../middleware/rbac');

router.use(authenticate);
router.get('/', users.getUsers);
router.get('/stats', users.getUserStats);
router.get('/:id', users.getUser);
router.post('/', authorize('super_admin', 'director', 'assistant_director', 'lead'), canCreateRole, users.createUser);
router.put('/:id', authorize('super_admin', 'director', 'assistant_director'), users.updateUser);
router.delete('/:id', authorize('super_admin', 'director'), users.deleteUser);

module.exports = router;
