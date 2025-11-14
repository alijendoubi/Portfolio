/**
 * Project Service - Business logic layer
 */

import { projectRepository } from '../repositories/ProjectRepository';
import { Project, ProjectFilters } from '@portfolio/common/types';
import { NotFoundError } from '../utils';
import { parsePaginationQuery, createPaginationMeta } from '@portfolio/common/utils';

class ProjectService {
  /**
   * Get all projects with filters and pagination
   */
  async getProjects(filters?: ProjectFilters, page = 1, limit = 12) {
    const { skip } = parsePaginationQuery({ page, limit });
    const { projects, total } = await projectRepository.findAll(filters, skip, limit);
    const meta = createPaginationMeta(page, limit, total);

    return { projects, meta };
  }

  /**
   * Get project by ID
   */
  async getProjectById(id: string): Promise<Project> {
    const project = await projectRepository.findById(id);
    if (!project) {
      throw new NotFoundError(`Project with ID ${id} not found`);
    }
    return project;
  }

  /**
   * Create new project
   */
  async createProject(data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    return await projectRepository.create(data);
  }

  /**
   * Update project
   */
  async updateProject(id: string, data: Partial<Project>): Promise<Project> {
    const project = await projectRepository.update(id, data);
    if (!project) {
      throw new NotFoundError(`Project with ID ${id} not found`);
    }
    return project;
  }

  /**
   * Delete project
   */
  async deleteProject(id: string): Promise<void> {
    const deleted = await projectRepository.delete(id);
    if (!deleted) {
      throw new NotFoundError(`Project with ID ${id} not found`);
    }
  }

  /**
   * Get featured projects
   */
  async getFeaturedProjects(limit = 6) {
    const { projects } = await projectRepository.findAll({ featured: true }, 0, limit);
    return projects;
  }
}

export const projectService = new ProjectService();
export default ProjectService;
