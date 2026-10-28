import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  statusCode: number;
  errorCode?: string;

  constructor(message: string, statusCode: number = 400, errorCode?: string) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error Stack:', err.stack);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error_code: err.errorCode || 'APPLICATION_ERROR',
      message: err.message
    });
  }

  return res.status(500).json({
    success: false,
    error_code: 'INTERNAL_SERVER_ERROR',
    message: err.message || 'An unexpected internal server error occurred'
  });
};