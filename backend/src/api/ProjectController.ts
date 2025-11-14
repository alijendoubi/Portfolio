/**
 * Project Controller - HTTP request handlers
 */

import { Request, Response } from 'express';
import { projectService } from '../services/ProjectService';
import { sendSuccess, asyncHandler } from '../utils';
import { HTTP_STATUS } from '@portfolio/common/constants';
import { ProjectFilters } from '@portfolio/common/types';

/**
 * Get all projects
 * GET /api/v1/projects
 */
export const getAllProjects = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit, category, status, featured, technologies, search } = req.query;

  const filters: ProjectFilters = {
    category: category as ProjectFilters['category'],
    status: status as ProjectFilters['status'],
    featured: featured === 'true' ? true : featured === 'false' ? false : undefined,
    technologies: technologies ? (technologies as string).split(',') : undefined,
    search: search as string,
  };

  const result = await projectService.getProjects(
    filters,
    parseInt(page as string) || 1,
    parseInt(limit as string) || 12
  );

  sendSuccess(res, result.projects, HTTP_STATUS.OK, result.meta);
});

/**
 * Get project by ID
 * GET /api/v1/projects/:id
 */
export const getProjectById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const project = await projectService.getProjectById(id);
  sendSuccess(res, project);
});

/**
 * Get featured projects
 * GET /api/v1/projects/featured
 */
export const getFeaturedProjects = asyncHandler(async (req: Request, res: Response) => {
  const { limit } = req.query;
  const projects = await projectService.getFeaturedProjects(parseInt(limit as string) || 6);
  sendSuccess(res, projects);
});

/**
 * Create project (Admin only)
 * POST /api/v1/projects
 */
export const createProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await projectService.createProject(req.body);
  sendSuccess(res, project, HTTP_STATUS.CREATED);
});

/**
 * Update project (Admin only)
 * PUT /api/v1/projects/:id
 */
export const updateProject = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const project = await projectService.updateProject(id, req.body);
  sendSuccess(res, project);
});

/**
 * Delete project (Admin only)
 * DELETE /api/v1/projects/:id
 */
export const deleteProject = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await projectService.deleteProject(id);
  sendSuccess(res, null, HTTP_STATUS.NO_CONTENT);
});
