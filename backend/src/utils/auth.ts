import jwt from 'jsonwebtoken';
import { IUser } from '../models/User.js';
import env from '../config/env.js';
import { AppError } from '../middleware/errorMiddleware.js';

interface TokenPayload {
  id: string;
  email: string;
}

export const generateToken = (user: IUser): string => {
  try {
    const payload: TokenPayload = {
      id: user._id.toString(),
      email: user.email
    };

    return jwt.sign(payload, env.JWT_SECRET as jwt.Secret, {
      expiresIn: env.JWT_EXPIRE
    });
  } catch (error) {
    throw new AppError('Error generating token', 500);
  }
};

export const verifyToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AppError('Token expired', 401);
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AppError('Invalid token', 401);
    }
    throw new AppError('Token verification failed', 401);
  }
};

export const extractTokenFromHeader = (authHeader: string | undefined): string => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError('No token provided or invalid format', 401);
  }

  return authHeader.split(' ')[1];
};
