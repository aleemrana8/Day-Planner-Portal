const router = require('express').Router();
const auth = require('../controllers/auth.controller');
const authenticate = require('../middleware/auth');

router.post('/login', auth.login);
router.post('/refresh-token', auth.refreshToken);
router.get('/profile', authenticate, auth.getProfile);
router.put('/profile', authenticate, auth.updateProfile);
router.put('/change-password', authenticate, auth.changePassword);
router.post('/logout', authenticate, auth.logout);

module.exports = router;
