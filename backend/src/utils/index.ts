/**
 * Backend utility functions
 */

import { Response } from 'express';
import { ApiResponse, ApiError } from '@portfolio/common/types';
import { HTTP_STATUS, ERROR_CODES } from '@portfolio/common/constants';

/**
 * Send success response
 */
export function sendSuccess<T>(
  res: Response,
  data: T,
  status: number = HTTP_STATUS.OK,
  meta?: unknown
): void {
  const response: ApiResponse<T> = {
    success: true,
    data,
    ...(meta && { meta }),
  };
  res.status(status).json(response);
}

/**
 * Send error response
 */
export function sendError(
  res: Response,
  error: ApiError,
  status: number = HTTP_STATUS.INTERNAL_SERVER_ERROR
): void {
  const response: ApiResponse = {
    success: false,
    error,
  };
  res.status(status).json(response);
}

/**
 * Custom error classes
 */
export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(ERROR_CODES.VALIDATION_ERROR, message, HTTP_STATUS.BAD_REQUEST, details);
    this.name = 'ValidationError';
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(ERROR_CODES.UNAUTHORIZED, message, HTTP_STATUS.UNAUTHORIZED);
    this.name = 'UnauthorizedError';
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(ERROR_CODES.NOT_FOUND, message, HTTP_STATUS.NOT_FOUND);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(ERROR_CODES.CONFLICT, message, HTTP_STATUS.CONFLICT);
    this.name = 'ConflictError';
  }
}

/**
 * Async handler wrapper to catch errors
 */
export function asyncHandler(fn: Function) {
  return (req: unknown, res: unknown, next: unknown) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

/**
 * Generate JWT token (placeholder - implement with jsonwebtoken)
 */
export async function generateToken(payload: Record<string, unknown>, secret: string, expiresIn: string): Promise<string> {
  // TODO: Implement with jsonwebtoken
  return 'mock-token';
}

/**
 * Verify JWT token (placeholder - implement with jsonwebtoken)
 */
export async function verifyToken(token: string, secret: string): Promise<Record<string, unknown>> {
  // TODO: Implement with jsonwebtoken
  return {};
}

/**
 * Hash password
 */
export async function hashPassword(password: string): Promise<string> {
  // TODO: Implement with bcrypt
  return 'hashed-' + password;
}

/**
 * Compare password
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  // TODO: Implement with bcrypt
  return hash === 'hashed-' + password;
}
