/**
 * API Routes
 */

import { Router } from 'express';
import * as projectController from './ProjectController';
import { authenticate } from '../middlewares';

const router = Router();

// Health check
router.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Project routes
router.get('/projects', projectController.getAllProjects);
router.get('/projects/featured', projectController.getFeaturedProjects);
router.get('/projects/:id', projectController.getProjectById);

// Protected routes (require authentication)
router.post('/projects', authenticate, projectController.createProject);
router.put('/projects/:id', authenticate, projectController.updateProject);
router.delete('/projects/:id', authenticate, projectController.deleteProject);

export default router;
