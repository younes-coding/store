import express from 'express';
import { adminLogin, getAdminProfile } from '../controllers/authController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { authLimiter } from '../middleware/rateLimiters.js';

const router = express.Router();

router.post('/login', authLimiter, adminLogin);
router.get('/me', protectAdmin, getAdminProfile);

export default router;
