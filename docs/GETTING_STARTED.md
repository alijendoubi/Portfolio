# Getting Started with Your Portfolio

Welcome to your **futuristic portfolio platform**! This guide will help you get up and running quickly.

## 📋 What You've Got

### ✅ Complete Monorepo Structure
- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **Backend**: Node.js + Express API with TypeScript
- **Common**: Shared types, utilities, and validation
- **Infrastructure**: Docker, CI/CD, and deployment configs

### ✅ Futuristic UI Design
- **Dark Theme**: Deep blacks with blue/cyan accents
- **Glass Morphism**: Translucent cards with backdrop blur
- **Neon Effects**: Glowing text and borders
- **Smooth Animations**: Fade-ins, hover effects, floating elements
- **Responsive**: Mobile-first design

### ✅ Production-Ready Features
- JWT Authentication (placeholders ready)
- Input Validation with Zod
- Rate Limiting
- CORS Configuration
- Error Handling
- TypeScript Strict Mode
- ESLint + Prettier
- Docker Support
- GitHub Actions CI/CD

## 🚀 Quick Start (3 Steps)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Setup Backend Environment
```bash
cd backend
cp .env.example .env
cd ..
```

### Step 3: Start Development Servers

**Terminal 1 - Backend API:**
```bash
npm run dev:backend
```
Backend will run on: `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
npm run dev:frontend
```
Frontend will run on: `http://localhost:3000`

That's it! Open `http://localhost:3000` in your browser.

## 📁 Project Structure Overview

```
Portfolio/
├── frontend/web-portfolio/    # Next.js app
│   ├── src/
│   │   ├── pages/              # Routes (index.tsx = homepage)
│   │   ├── components/         # Reusable UI components
│   │   ├── layouts/            # Page layouts
│   │   ├── services/           # API clients
│   │   └── styles/             # Global styles
│   └── package.json
│
├── backend/                    # Express API
│   ├── src/
│   │   ├── api/                # Controllers (ProjectController.ts)
│   │   ├── services/           # Business logic
│   │   ├── repositories/       # Data access (in-memory for now)
│   │   ├── middlewares/        # Express middlewares
│   │   ├── config/             # Configuration
│   │   └── index.ts            # Server entrypoint
│   └── package.json
│
├── common/                     # Shared code
│   ├── types/                  # TypeScript interfaces
│   ├── constants/              # Shared constants
│   ├── utils/                  # Helper functions
│   └── validation/             # Zod schemas
│
├── iot/                        # IoT projects (ready for your code)
├── automation/                 # Bots & automation (ready for your code)
├── scripts/                    # Utility scripts
├── .github/workflows/          # CI/CD pipelines
└── docs/                       # Documentation
```

## 🎨 Design System

### Color Scheme
```css
/* Primary Blue */
#0078ff - Main accent, buttons, links

/* Accent Cyan */
#00d4ff - Secondary highlights, hover states

/* Dark Backgrounds */
#000511 - Deepest dark (body background)
#0a0e1a - Card backgrounds
#161b2e - Elevated elements

/* Neon Green (for success) */
#00ff9f
```

### Key CSS Classes
```css
/* Cards */
.card-futuristic   - Glass morphism card with hover effects
.glass             - Translucent background with blur

/* Buttons */
.btn-primary       - Primary blue button
.btn-outline       - Outlined button
.btn-ghost         - Minimal button

/* Effects */
.text-neon         - Glowing neon text
.animate-fade-in-up - Fade in from bottom
.glow-border       - Glowing border effect
```

## 🔌 API Endpoints

Your backend is already set up with these endpoints:

### Public
- `GET /api/v1/health` - Health check
- `GET /api/v1/projects` - Get all projects (with filters)
- `GET /api/v1/projects/featured` - Get featured projects
- `GET /api/v1/projects/:id` - Get single project

### Protected (require auth token)
- `POST /api/v1/projects` - Create project
- `PUT /api/v1/projects/:id` - Update project
- `DELETE /api/v1/projects/:id` - Delete project

### Test the API
```bash
# Health check
curl http://localhost:5000/api/v1/health

# Get all projects
curl http://localhost:5000/api/v1/projects

# Get featured projects
curl http://localhost:5000/api/v1/projects/featured
```

## 🛠️ Common Tasks

### Adding a New Page
```bash
# Create a new page file
touch frontend/web-portfolio/src/pages/about.tsx
```

```tsx
// about.tsx
import MainLayout from '../layouts/MainLayout';

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-neon">About Me</h1>
        {/* Your content */}
      </div>
    </MainLayout>
  );
}
```

### Adding a New Component
```tsx
// frontend/web-portfolio/src/components/MyComponent.tsx
import React from 'react';
import Card from './Card';

interface MyComponentProps {
  title: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ title }) => {
  return (
    <Card>
      <h2 className="text-2xl font-bold text-primary-400">{title}</h2>
    </Card>
  );
};

export default MyComponent;
```

### Adding Backend API Endpoint
```typescript
// backend/src/api/MyController.ts
import { Request, Response } from 'express';
import { sendSuccess, asyncHandler } from '../utils';

export const getMyData = asyncHandler(async (req: Request, res: Response) => {
  const data = { message: 'Hello from my endpoint!' };
  sendSuccess(res, data);
});

// Add to routes.ts
import * as myController from './MyController';
router.get('/my-data', myController.getMyData);
```

## 📦 Available Scripts

```bash
# Development
npm run dev:frontend      # Start frontend dev server
npm run dev:backend       # Start backend dev server

# Build
npm run build             # Build all workspaces

# Code Quality
npm run lint              # Lint all code
npm run lint:fix          # Fix linting issues
npm run format            # Format with Prettier
npm run typecheck         # Type check TypeScript

# Testing
npm test                  # Run all tests
```

## 🐳 Docker Deployment

```bash
# Start everything with Docker
docker-compose up -d

# View logs
docker-compose logs -f

# Stop everything
docker-compose down
```

## 📝 Next Steps

### 1. Customize Your Content
- Edit `frontend/web-portfolio/src/pages/index.tsx` - Homepage
- Update `backend/src/repositories/ProjectRepository.ts` - Add your real projects

### 2. Add Your Projects
The seed data is in `ProjectRepository.ts`. Replace with your actual projects:
```typescript
{
  title: 'Your Project Name',
  description: 'Project description...',
  category: ProjectCategory.WEB_DEV,
  status: ProjectStatus.COMPLETED,
  technologies: ['React', 'TypeScript'],
  imageUrl: 'your-image-url',
  githubUrl: 'your-github-url',
  featured: true,
}
```

### 3. Connect Real Database
Currently using in-memory storage. To add PostgreSQL:
1. Uncomment Prisma/TypeORM dependencies in `backend/package.json`
2. Setup schema in `backend/prisma/schema.prisma`
3. Run migrations
4. Update repositories to use real DB

### 4. Deploy
- **Frontend**: Deploy to Vercel (Next.js native)
- **Backend**: Deploy to Railway, Render, or AWS
- **Full Stack**: Use Docker Compose on any VPS

## 🎯 Architecture Principles

This portfolio follows strict architecture rules from `ARCHITECTURE.md`:

1. **Separation of Concerns** - Frontend, backend, IoT, automation are separate
2. **Shared Types** - Common types in `/common/` used everywhere
3. **Type Safety** - Full TypeScript coverage
4. **Layered Backend** - Controllers → Services → Repositories
5. **Reusable Frontend** - Components in `/components/`, features in `/features/`

## 🆘 Need Help?

### Common Issues

**Port already in use:**
```bash
# Kill process on port 3000 or 5000
lsof -ti:3000 | xargs kill -9
lsof -ti:5000 | xargs kill -9
```

**Dependencies won't install:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**TypeScript errors:**
```bash
# Run type check to see all errors
npm run typecheck
```

## 🎉 You're Ready!

Your futuristic portfolio platform is ready to go. Start customizing, adding your projects, and make it yours!

**Happy coding! 🚀**
