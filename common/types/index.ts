/**
 * Common types shared across the portfolio platform
 */

// ======================
// User & Authentication
// ======================
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

// ======================
// Project Types
// ======================
export enum ProjectCategory {
  WEB_DEV = 'WEB_DEV',
  APP_DEV = 'APP_DEV',
  IOT = 'IOT',
  AUTOMATION = 'AUTOMATION',
}

export enum ProjectStatus {
  COMPLETED = 'COMPLETED',
  IN_PROGRESS = 'IN_PROGRESS',
  PLANNED = 'PLANNED',
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  technologies: string[];
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ======================
// Web Development
// ======================
export interface WebProject extends Project {
  category: ProjectCategory.WEB_DEV;
  isResponsive: boolean;
  hasBackend: boolean;
  deploymentUrl?: string;
}

// ======================
// App Development
// ======================
export enum AppPlatform {
  IOS = 'IOS',
  ANDROID = 'ANDROID',
  DESKTOP = 'DESKTOP',
  CROSS_PLATFORM = 'CROSS_PLATFORM',
}

export interface AppProject extends Project {
  category: ProjectCategory.APP_DEV;
  platforms: AppPlatform[];
  downloadUrl?: string;
  screenshots: string[];
}

// ======================
// IoT Projects
// ======================
export interface IoTProject extends Project {
  category: ProjectCategory.IOT;
  devices: IoTDevice[];
  dashboardUrl?: string;
  dataVisualization: boolean;
}

export interface IoTDevice {
  id: string;
  name: string;
  type: string;
  status: 'online' | 'offline';
  lastSeen?: Date;
}

export interface IoTTelemetry {
  deviceId: string;
  timestamp: Date;
  data: Record<string, unknown>;
}

// ======================
// Automation Projects
// ======================
export enum AutomationType {
  BOT = 'BOT',
  WORKFLOW = 'WORKFLOW',
  SCRIPT = 'SCRIPT',
}

export interface AutomationProject extends Project {
  category: ProjectCategory.AUTOMATION;
  automationType: AutomationType;
  platform?: string;
  triggerType?: string;
}

// ======================
// API Response Types
// ======================
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: PaginationMeta;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ======================
// Filter & Search
// ======================
export interface ProjectFilters {
  category?: ProjectCategory;
  status?: ProjectStatus;
  technologies?: string[];
  featured?: boolean;
  search?: string;
}
