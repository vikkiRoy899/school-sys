import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './error.middleware.js';

export interface AuthUser {
  id: string;
  institutionId: string;
  role: string;
  email?: string;
  phoneNumber: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
      institutionId?: string;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-school-key-change-in-production';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return next(new AppError('Authentication token required', 401, 'UNAUTHORIZED'));
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new AppError('Invalid or expired authentication token', 403, 'FORBIDDEN'));
    }
    req.user = decoded as AuthUser;
    req.institutionId = (decoded as AuthUser).institutionId;
    next();
  });
};

export const requireRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401, 'UNAUTHORIZED'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new AppError('Insufficient permissions for this operation', 403, 'INSUFFICIENT_PERMISSIONS'));
    }

    next();
  };
};