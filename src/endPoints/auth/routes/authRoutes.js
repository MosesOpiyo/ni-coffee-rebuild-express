const express = require('express');
const AuthController = require('../controllers/authControllers');
const { verifyToken, verifyRole } = require('../../../middleware/authMiddleware');
const sanitizeInput = require('../../../middleware/inputSecurityMiddleware');
const { loginLimiter } = require('../../../middleware/rateLimitingMiddleware');

const authRouter = express.Router();

authRouter.post('/register', sanitizeInput, AuthController.register);
authRouter.post('/login', loginLimiter, sanitizeInput, AuthController.login);
authRouter.post('/verify-phone', sanitizeInput, AuthController.verifyPhone);
authRouter.post('/reset-password', sanitizeInput, AuthController.resetPassword);
authRouter.post('/mfa/enable', sanitizeInput, verifyToken, verifyRole(['exporter', 'admin']), AuthController.enableMFA);
authRouter.post('/logout', sanitizeInput, verifyToken, AuthController.logout);

module.exports = authRouter;
