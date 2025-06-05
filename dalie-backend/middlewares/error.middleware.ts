import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../errors/api.error';

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      error: {
        message: err.message,
        details: err.details,
      },
    });
  }

  console.error(err);
  res.status(500).json({
    error: {
      message: 'Internal Server Error',
    },
  });
}