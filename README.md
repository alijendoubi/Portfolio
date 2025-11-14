# 🚀 Futuristic Portfolio Platform

A **production-grade monorepo** showcasing cutting-edge projects in **Web Development**, **App Development**, **IoT**, and **Automations** with a futuristic dark theme and blue accents.

## ✨ Features

- 🎨 **Futuristic UI/UX** - Dark theme with blue accents, glass morphism, and smooth animations
- 🏗️ **Monorepo Architecture** - Strict separation of concerns between frontend, backend, IoT, and automation
- ⚡ **Modern Tech Stack** - Next.js, TypeScript, Tailwind CSS, Node.js, Express
- 🔐 **Security First** - JWT authentication, input validation, rate limiting
- 📱 **Fully Responsive** - Optimized for all devices
- 🎯 **Type-Safe** - End-to-end TypeScript coverage
- 🧪 **Production Ready** - Testing, linting, CI/CD, Docker support

## 🏛️ Architecture

```
portfolio/
├── frontend/          # Next.js web applications
│   └── web-portfolio/ # Main portfolio website
├── backend/           # Node.js/Express API server
├── iot/              # IoT device simulators and services
├── automation/       # Bots and workflow automation
├── common/           # Shared types, utilities, validation
├── scripts/          # DevOps and utility scripts
├── .github/          # CI/CD workflows
└── docs/             # Documentation
```

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- (Optional) PostgreSQL for database
- (Optional) Redis for caching and queues

### Installation

1. **Clone the repository**
   ```bash
   cd ~/desktop/Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   
   **Backend:**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development servers**
   
   **Terminal 1 - Backend:**
   ```bash
   npm run dev:backend
   ```
   
   **Terminal 2 - Frontend:**
   ```bash
   npm run dev:frontend
   ```

5. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api/v1

## 📦 Available Scripts

### Root Level
- `npm run dev:frontend` - Start frontend dev server
- `npm run dev:backend` - Start backend dev server
- `npm run build` - Build all workspaces
- `npm run lint` - Lint all code
- `npm run lint:fix` - Fix linting issues
- `npm run format` - Format code with Prettier
- `npm test` - Run all tests
- `npm run typecheck` - Type check all workspaces

### Frontend
```bash
cd frontend/web-portfolio
npm run dev        # Start dev server
npm run build      # Production build
npm run start      # Start production server
npm run lint       # Lint code
```

### Backend
```bash
cd backend
npm run dev        # Start with hot reload
npm run build      # Compile TypeScript
npm run start      # Start production server
npm test           # Run tests
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#0078ff` - Main accent color
- **Accent Cyan**: `#00d4ff` - Secondary highlights
- **Dark Background**: `#000511` to `#2a3149` - Layered depths
- **Neon Green**: `#00ff9f` - Success states

### Components
- **Glass Morphism Cards** - Translucent backgrounds with blur
- **Neon Effects** - Glowing text and borders
- **Animated Buttons** - Smooth hover states with scaling
- **Grid Backgrounds** - Futuristic grid patterns
- **Smooth Animations** - Fade-ins, slide-ins, float effects

## 🔌 API Endpoints

### Projects
- `GET /api/v1/projects` - Get all projects (with filters)
- `GET /api/v1/projects/featured` - Get featured projects
- `GET /api/v1/projects/:id` - Get project by ID
- `POST /api/v1/projects` - Create project (auth required)
- `PUT /api/v1/projects/:id` - Update project (auth required)
- `DELETE /api/v1/projects/:id` - Delete project (auth required)

### Health
- `GET /api/v1/health` - API health check

## 🧪 Testing

```bash
# Run all tests
npm test

# Run frontend tests
cd frontend/web-portfolio && npm test

# Run backend tests
cd backend && npm test
```

## 🐳 Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d

# Stop services
docker-compose down
```

## 📁 Project Structure

### Frontend (`/frontend/web-portfolio/`)
- `/src/pages/` - Next.js routes
- `/src/components/` - Reusable UI components
- `/src/layouts/` - Page layouts
- `/src/services/` - API clients
- `/src/styles/` - Global styles and Tailwind config

### Backend (`/backend/`)
- `/src/api/` - Controllers and route handlers
- `/src/services/` - Business logic
- `/src/repositories/` - Data access layer
- `/src/middlewares/` - Express middlewares
- `/src/config/` - Configuration management

### Common (`/common/`)
- `/types/` - Shared TypeScript types
- `/constants/` - Shared constants
- `/utils/` - Shared utility functions
- `/validation/` - Zod validation schemas

## 🎯 Features by Category

### Web Development
- Responsive e-commerce platforms
- SaaS applications
- Progressive Web Apps (PWAs)
- Real-time dashboards

### App Development
- Cross-platform mobile apps
- Desktop applications
- Native iOS/Android apps
- Electron apps

### IoT Projects
- Smart home systems
- Sensor networks
- Real-time telemetry dashboards
- Device simulators

### Automations
- Telegram/Discord/Slack bots
- Workflow automation
- Scheduled tasks
- API integrations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Standards
- Follow the existing code style
- Write TypeScript with strict mode
- Add tests for new features
- Update documentation as needed
- Follow the architecture guidelines in `ARCHITECTURE.md`

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- The open-source community

## 📧 Contact

For questions or suggestions, please open an issue or contact the maintainer.

---

**Built with ❤️ using TypeScript, Next.js, and modern web technologies**
