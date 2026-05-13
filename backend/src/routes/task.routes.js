const router = require('express').Router();
const tasks = require('../controllers/task.controller');
const authenticate = require('../middleware/auth');

router.use(authenticate);
router.get('/', tasks.getTasks);
router.get('/stats', tasks.getTaskStats);
router.get('/:id', tasks.getTask);
router.post('/', tasks.createTask);
router.put('/:id', tasks.updateTask);
router.delete('/:id', tasks.deleteTask);
router.post('/:id/comments', tasks.addComment);
router.post('/:id/escalate', tasks.escalateTask);

module.exports = router;
