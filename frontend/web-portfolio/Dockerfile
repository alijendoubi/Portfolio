# Multi-stage build for Frontend
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY common/package*.json ./common/
COPY frontend/web-portfolio/package*.json ./frontend/web-portfolio/

# Install dependencies
RUN npm ci

# Copy source code
COPY common ./common
COPY frontend/web-portfolio ./frontend/web-portfolio

# Build
WORKDIR /app/frontend/web-portfolio
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY frontend/web-portfolio/package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy built files
COPY --from=builder /app/frontend/web-portfolio/.next ./.next
COPY --from=builder /app/frontend/web-portfolio/public ./public
COPY --from=builder /app/frontend/web-portfolio/next.config.js ./

# Expose port
EXPOSE 3000

# Start server
CMD ["npm", "start"]
