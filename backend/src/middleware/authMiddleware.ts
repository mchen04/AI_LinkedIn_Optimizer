import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorMiddleware.js';
import { verifyToken, extractTokenFromHeader } from '../utils/auth.js';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    next(new AppError('Not authorized', 401));
  }
};

// Middleware to ensure user exists in request
export const ensureUser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return next(new AppError('User not found in request', 401));
  }
  next();
};