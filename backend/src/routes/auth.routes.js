const express = require('express');
const router = express.Router();
const { signup, login, adminLogin, verify, logout } = require('../controllers/auth.controller');
const validate = require('../middlewares/validate.middleware');
const { signupSchema, loginSchema } = require('../validators/auth.validator');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);
router.post('/admin/login', validate(loginSchema), adminLogin);
router.get('/verify', authMiddleware, verify);
router.post('/logout', logout);

module.exports = router;