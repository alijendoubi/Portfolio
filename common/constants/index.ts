/**
 * Shared constants across the portfolio platform
 */

// API Configuration
export const API_VERSION = 'v1';
export const API_BASE_PATH = `/api/${API_VERSION}`;

// Pagination
export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 12;
export const MAX_LIMIT = 100;

// JWT Configuration
export const ACCESS_TOKEN_EXPIRY = '15m';
export const REFRESH_TOKEN_EXPIRY = '7d';

// Project Categories
export const PROJECT_CATEGORIES = {
  WEB_DEV: 'Web Development',
  APP_DEV: 'App Development',
  IOT: 'Internet of Things',
  AUTOMATION: 'Bots & Automations',
} as const;

// Technology Tags (common ones)
export const TECH_TAGS = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Express',
  'PostgreSQL',
  'MongoDB',
  'Tailwind CSS',
  'Python',
  'FastAPI',
  'Flutter',
  'React Native',
  'Swift',
  'Kotlin',
  'Arduino',
  'Raspberry Pi',
  'MQTT',
  'WebSocket',
  'Docker',
  'Kubernetes',
  'AWS',
  'Firebase',
] as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Error Codes
export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  DATABASE_ERROR: 'DATABASE_ERROR',
} as const;

// IoT Constants
export const IOT_DEVICE_TYPES = [
  'temperature_sensor',
  'humidity_sensor',
  'motion_detector',
  'smart_light',
  'door_lock',
  'camera',
] as const;

export const TELEMETRY_RETENTION_DAYS = 30;

// Rate Limiting
export const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
export const RATE_LIMIT_MAX_REQUESTS = 100;
