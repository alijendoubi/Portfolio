/**
 * API Service - HTTP client for backend communication
 */

import axios from 'axios';
import type { Project, ProjectFilters, ApiResponse, PaginationMeta } from '@portfolio/common/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use((config) => {
  // Add auth token if available
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/**
 * Project API
 */
export const projectsApi = {
  /**
   * Get all projects with filters
   */
  async getAll(filters?: ProjectFilters & { page?: number; limit?: number }) {
    const response = await api.get<ApiResponse<Project[]>>('/projects', {
      params: filters,
    });
    return {
      projects: response.data.data || [],
      meta: response.data.meta as PaginationMeta | undefined,
    };
  },

  /**
   * Get featured projects
   */
  async getFeatured(limit = 6) {
    const response = await api.get<ApiResponse<Project[]>>('/projects/featured', {
      params: { limit },
    });
    return response.data.data || [];
  },

  /**
   * Get project by ID
   */
  async getById(id: string) {
    const response = await api.get<ApiResponse<Project>>(`/projects/${id}`);
    return response.data.data;
  },

  /**
   * Create new project (admin only)
   */
  async create(data: Partial<Project>) {
    const response = await api.post<ApiResponse<Project>>('/projects', data);
    return response.data.data;
  },

  /**
   * Update project (admin only)
   */
  async update(id: string, data: Partial<Project>) {
    const response = await api.put<ApiResponse<Project>>(`/projects/${id}`, data);
    return response.data.data;
  },

  /**
   * Delete project (admin only)
   */
  async delete(id: string) {
    await api.delete(`/projects/${id}`);
  },
};

export default api;
