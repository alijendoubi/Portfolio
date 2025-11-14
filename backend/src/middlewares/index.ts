/**
 * Express middlewares
 */

import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { AppError, sendError, ValidationError } from '../utils';
import { HTTP_STATUS, ERROR_CODES } from '@portfolio/common/constants';

/**
 * Zod validation middleware
 */
export function validate(schema: AnyZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = new ValidationError('Validation failed', {
          errors: error.errors,
        });
        sendError(res, {
          code: validationError.code,
          message: validationError.message,
          details: validationError.details,
        }, validationError.statusCode);
      } else {
        next(error);
      }
    }
  };
}

/**
 * Global error handler middleware
 */
export function errorHandler(
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error('Error:', err);

  if (err instanceof AppError) {
    return sendError(
      res,
      {
        code: err.code,
        message: err.message,
        details: err.details,
      },
      err.statusCode
    );
  }

  // Unknown error
  sendError(
    res,
    {
      code: ERROR_CODES.INTERNAL_ERROR,
      message: 'Internal server error',
    },
    HTTP_STATUS.INTERNAL_SERVER_ERROR
  );
}

/**
 * 404 Not Found handler
 */
export function notFoundHandler(_req: Request, res: Response) {
  sendError(
    res,
    {
      code: ERROR_CODES.NOT_FOUND,
      message: 'Route not found',
    },
    HTTP_STATUS.NOT_FOUND
  );
}

/**
 * Auth middleware (placeholder)
 */
export async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(ERROR_CODES.UNAUTHORIZED, 'No token provided', HTTP_STATUS.UNAUTHORIZED);
    }

    const token = authHeader.substring(7);
    
    // TODO: Verify JWT token
    // const decoded = await verifyToken(token, config.jwt.accessSecret);
    // req.user = decoded;
    
    next();
  } catch (error) {
    next(error);
  }
}

/**
 * Optional auth middleware
 */
export async function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      // TODO: Verify JWT token
      // const decoded = await verifyToken(token, config.jwt.accessSecret);
      // req.user = decoded;
    }
    
    next();
  } catch (error) {
    // Ignore auth errors for optional auth
    next();
  }
}
