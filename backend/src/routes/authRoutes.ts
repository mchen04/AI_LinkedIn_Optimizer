import express, { Router } from 'express';
import {
  register,
  login,
  getProfile,
  updateProfile,
  validateRegistration,
  validateLogin
} from '../controllers/authController.js';
import { requireAuth, ensureUser } from '../middleware/authMiddleware.js';

const router: Router = express.Router();

// Public routes
router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);

// Protected routes - apply auth middleware to all routes below
router.use(requireAuth);
router.use(ensureUser);

// Routes that require authentication
router.get('/profile', getProfile as express.RequestHandler);
router.patch('/profile', updateProfile as express.RequestHandler);

export default router;