/**
 * Zod validation schemas for request validation
 */

import { z } from 'zod';

// ======================
// Project Schemas
// ======================
export const ProjectCategorySchema = z.enum(['WEB_DEV', 'APP_DEV', 'IOT', 'AUTOMATION']);

export const ProjectStatusSchema = z.enum(['COMPLETED', 'IN_PROGRESS', 'PLANNED']);

export const CreateProjectSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(1000),
  category: ProjectCategorySchema,
  status: ProjectStatusSchema.default('IN_PROGRESS'),
  technologies: z.array(z.string()).min(1),
  imageUrl: z.string().url().optional(),
  demoUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  featured: z.boolean().default(false),
});

export const UpdateProjectSchema = CreateProjectSchema.partial();

export const ProjectFiltersSchema = z.object({
  category: ProjectCategorySchema.optional(),
  status: ProjectStatusSchema.optional(),
  technologies: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  search: z.string().optional(),
});

// ======================
// Pagination Schemas
// ======================
export const PaginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(12),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// ======================
// User & Auth Schemas
// ======================
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2).max(50),
});

// ======================
// IoT Schemas
// ======================
export const IoTTelemetrySchema = z.object({
  deviceId: z.string(),
  timestamp: z.coerce.date(),
  data: z.record(z.unknown()),
});

export const IoTDeviceSchema = z.object({
  name: z.string().min(2).max(50),
  type: z.string(),
  status: z.enum(['online', 'offline']).default('offline'),
});

// ======================
// Export types from schemas
// ======================
export type CreateProjectDTO = z.infer<typeof CreateProjectSchema>;
export type UpdateProjectDTO = z.infer<typeof UpdateProjectSchema>;
export type ProjectFiltersDTO = z.infer<typeof ProjectFiltersSchema>;
export type PaginationQueryDTO = z.infer<typeof PaginationQuerySchema>;
export type LoginDTO = z.infer<typeof LoginSchema>;
export type RegisterDTO = z.infer<typeof RegisterSchema>;
export type IoTTelemetryDTO = z.infer<typeof IoTTelemetrySchema>;
export type IoTDeviceDTO = z.infer<typeof IoTDeviceSchema>;
