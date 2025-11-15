/**
 * ProjectService Tests
 */

import { projectService } from '../src/services/ProjectService';
import { ProjectCategory } from '@portfolio/common/types';

describe('ProjectService', () => {
  describe('getProjects', () => {
    it('should return projects with pagination', async () => {
      const result = await projectService.getProjects({}, 1, 10);
      
      expect(result.projects).toBeDefined();
      expect(Array.isArray(result.projects)).toBe(true);
      expect(result.meta).toBeDefined();
      expect(result.meta.page).toBe(1);
      expect(result.meta.limit).toBe(10);
    });

    it('should filter projects by category', async () => {
      const result = await projectService.getProjects(
        { category: ProjectCategory.WEB_DEV },
        1,
        10
      );
      
      result.projects.forEach(project => {
        expect(project.category).toBe(ProjectCategory.WEB_DEV);
      });
    });
  });

  describe('getProjectById', () => {
    it('should return a project by id', async () => {
      const allProjects = await projectService.getProjects({}, 1, 1);
      const firstProject = allProjects.projects[0];
      
      if (firstProject) {
        const project = await projectService.getProjectById(firstProject.id);
        expect(project).toBeDefined();
        expect(project.id).toBe(firstProject.id);
      }
    });

    it('should throw error for non-existent project', async () => {
      await expect(
        projectService.getProjectById('non-existent-id')
      ).rejects.toThrow();
    });
  });

  describe('getFeaturedProjects', () => {
    it('should return only featured projects', async () => {
      const projects = await projectService.getFeaturedProjects(10);
      
      projects.forEach(project => {
        expect(project.featured).toBe(true);
      });
    });
  });
});
