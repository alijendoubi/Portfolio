# Multi-stage build for Backend
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY common/package*.json ./common/
COPY backend/package*.json ./backend/

# Install dependencies
RUN npm ci

# Copy source code
COPY common ./common
COPY backend ./backend

# Build
WORKDIR /app/backend
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY backend/package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy built files
COPY --from=builder /app/backend/dist ./dist

# Expose port
EXPOSE 5000

# Start server
CMD ["node", "dist/index.js"]
