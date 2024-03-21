import express from 'express';
import rateLimiter from 'express-rate-limit';

import {
  register,
  login,
  logout,
} from '../controllers/authController.js';

const router = express.Router();
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 7,
  message: 'Too many attemps. Please try again in 15 minutes',
});

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(logout);

export default router;
