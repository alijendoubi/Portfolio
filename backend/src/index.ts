/**
 * Backend Server Entrypoint
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import config from './config';
import routes from './api/routes';
import { errorHandler, notFoundHandler } from './middlewares';
import { API_BASE_PATH } from '@portfolio/common/constants';

const app = express();

// Security & logging middleware
app.use(helmet());
app.use(cors({ origin: config.cors.origin }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  message: 'Too many requests from this IP, please try again later.',
});
app.use(API_BASE_PATH, limiter);

// API routes
app.use(API_BASE_PATH, routes);

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  console.log(`
  ╔═══════════════════════════════════════╗
  ║   Portfolio Backend API Server        ║
  ║   Environment: ${config.nodeEnv.padEnd(24)}║
  ║   Port: ${config.port.toString().padEnd(32)}║
  ║   API Base: ${API_BASE_PATH.padEnd(28)}║
  ╚═══════════════════════════════════════╝
  `);
});

export default app;
