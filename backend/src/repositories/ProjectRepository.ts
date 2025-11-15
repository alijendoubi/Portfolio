/**
 * Project Repository - In-memory implementation (mock database)
 */

import { Project, ProjectCategory, ProjectStatus, ProjectFilters } from '@portfolio/common/types';
import { generateId } from '@portfolio/common/utils';

class ProjectRepository {
  private projects: Project[] = [];

  constructor() {
    // Seed with sample data
    this.seedData();
  }

  /**
   * Find all projects with filters and pagination
   */
  async findAll(
    filters?: ProjectFilters,
    skip = 0,
    limit = 12
  ): Promise<{ projects: Project[]; total: number }> {
    let filtered = [...this.projects];

    // Apply filters
    if (filters?.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
    }
    if (filters?.status) {
      filtered = filtered.filter((p) => p.status === filters.status);
    }
    if (filters?.featured !== undefined) {
      filtered = filtered.filter((p) => p.featured === filters.featured);
    }
    if (filters?.technologies && filters.technologies.length > 0) {
      filtered = filtered.filter((p) =>
        filters.technologies!.some((tech) => p.technologies.includes(tech))
      );
    }
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
      );
    }

    const total = filtered.length;
    const projects = filtered.slice(skip, skip + limit);

    return { projects, total };
  }

  /**
   * Find project by ID
   */
  async findById(id: string): Promise<Project | null> {
    return this.projects.find((p) => p.id === id) || null;
  }

  /**
   * Create new project
   */
  async create(data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    const project: Project = {
      ...data,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.projects.push(project);
    return project;
  }

  /**
   * Update project
   */
  async update(id: string, data: Partial<Project>): Promise<Project | null> {
    const index = this.projects.findIndex((p) => p.id === id);
    if (index === -1) return null;

    this.projects[index] = {
      ...this.projects[index],
      ...data,
      updatedAt: new Date(),
    };
    return this.projects[index];
  }

  /**
   * Delete project
   */
  async delete(id: string): Promise<boolean> {
    const index = this.projects.findIndex((p) => p.id === id);
    if (index === -1) return false;

    this.projects.splice(index, 1);
    return true;
  }

  /**
   * Seed initial data
   */
  private seedData() {
    this.projects = [
      // Web Development Projects
      {
        id: generateId(),
        title: 'E-Commerce Platform',
        description: 'Full-stack e-commerce platform with payment integration, admin dashboard, and real-time inventory management.',
        category: ProjectCategory.WEB_DEV,
        status: ProjectStatus.COMPLETED,
        technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe'],
        imageUrl: 'https://picsum.photos/seed/ecommerce/800/600',
        demoUrl: 'https://demo.example.com',
        githubUrl: 'https://github.com/example/ecommerce',
        featured: true,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
      },
      {
        id: generateId(),
        title: 'Social Media Dashboard',
        description: 'Analytics dashboard for social media management with real-time metrics, scheduling, and multi-platform support.',
        category: ProjectCategory.WEB_DEV,
        status: ProjectStatus.COMPLETED,
        technologies: ['Vue.js', 'TypeScript', 'Express', 'MongoDB', 'Redis'],
        imageUrl: 'https://picsum.photos/seed/social/800/600',
        featured: false,
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-02-01'),
      },
      {
        id: generateId(),
        title: 'Real Estate Portal',
        description: 'Property listing platform with advanced search filters, virtual tours, and integrated booking system.',
        category: ProjectCategory.WEB_DEV,
        status: ProjectStatus.COMPLETED,
        technologies: ['React', 'Next.js', 'Tailwind', 'Prisma', 'PostgreSQL'],
        imageUrl: 'https://picsum.photos/seed/realestate/800/600',
        featured: false,
        createdAt: new Date('2024-03-10'),
        updatedAt: new Date('2024-03-10'),
      },
      {
        id: generateId(),
        title: 'Learning Management System',
        description: 'Complete LMS with course creation, student tracking, video streaming, and assessment tools.',
        category: ProjectCategory.WEB_DEV,
        status: ProjectStatus.IN_PROGRESS,
        technologies: ['Next.js', 'TypeScript', 'AWS', 'PostgreSQL', 'Stripe'],
        imageUrl: 'https://picsum.photos/seed/lms/800/600',
        featured: true,
        createdAt: new Date('2024-04-05'),
        updatedAt: new Date('2024-04-05'),
      },
      {
        id: generateId(),
        title: 'Restaurant Ordering System',
        description: 'Online food ordering platform with real-time order tracking, payment processing, and delivery management.',
        category: ProjectCategory.WEB_DEV,
        status: ProjectStatus.COMPLETED,
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
        imageUrl: 'https://picsum.photos/seed/restaurant/800/600',
        featured: false,
        createdAt: new Date('2024-05-12'),
        updatedAt: new Date('2024-05-12'),
      },
      {
        id: generateId(),
        title: 'Project Management Tool',
        description: 'Collaborative project management platform with kanban boards, time tracking, and team communication.',
        category: ProjectCategory.WEB_DEV,
        status: ProjectStatus.COMPLETED,
        technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Redis', 'WebSocket'],
        imageUrl: 'https://picsum.photos/seed/projectmgmt/800/600',
        featured: false,
        createdAt: new Date('2024-06-20'),
        updatedAt: new Date('2024-06-20'),
      },

      // App Development Projects
      {
        id: generateId(),
        title: 'Task Management App',
        description: 'Cross-platform mobile app for task management with offline support, push notifications, and team collaboration.',
        category: ProjectCategory.APP_DEV,
        status: ProjectStatus.COMPLETED,
        technologies: ['React Native', 'TypeScript', 'Firebase', 'Redux'],
        imageUrl: 'https://picsum.photos/seed/taskapp/800/600',
        featured: true,
        createdAt: new Date('2024-02-10'),
        updatedAt: new Date('2024-02-10'),
      },
      {
        id: generateId(),
        title: 'Fitness Tracker',
        description: 'Health and fitness tracking app with workout plans, calorie counter, and progress visualization.',
        category: ProjectCategory.APP_DEV,
        status: ProjectStatus.COMPLETED,
        technologies: ['Flutter', 'Dart', 'Firebase', 'Google Fit'],
        imageUrl: 'https://picsum.photos/seed/fitness/800/600',
        featured: false,
        createdAt: new Date('2024-03-15'),
        updatedAt: new Date('2024-03-15'),
      },
      {
        id: generateId(),
        title: 'Budget Manager',
        description: 'Personal finance app with expense tracking, budget planning, and financial insights.',
        category: ProjectCategory.APP_DEV,
        status: ProjectStatus.COMPLETED,
        technologies: ['Swift', 'SwiftUI', 'CoreData', 'Charts'],
        imageUrl: 'https://picsum.photos/seed/budget/800/600',
        featured: true,
        createdAt: new Date('2024-04-20'),
        updatedAt: new Date('2024-04-20'),
      },
      {
        id: generateId(),
        title: 'Language Learning App',
        description: 'Interactive language learning platform with gamification, speech recognition, and progress tracking.',
        category: ProjectCategory.APP_DEV,
        status: ProjectStatus.IN_PROGRESS,
        technologies: ['React Native', 'TypeScript', 'AWS', 'TensorFlow'],
        imageUrl: 'https://picsum.photos/seed/language/800/600',
        featured: false,
        createdAt: new Date('2024-05-10'),
        updatedAt: new Date('2024-05-10'),
      },
      {
        id: generateId(),
        title: 'Music Streaming App',
        description: 'Music player with offline playback, playlist creation, and social sharing features.',
        category: ProjectCategory.APP_DEV,
        status: ProjectStatus.COMPLETED,
        technologies: ['Kotlin', 'Android', 'ExoPlayer', 'Room'],
        imageUrl: 'https://picsum.photos/seed/music/800/600',
        featured: false,
        createdAt: new Date('2024-06-05'),
        updatedAt: new Date('2024-06-05'),
      },
      {
        id: generateId(),
        title: 'Weather Forecast App',
        description: 'Beautiful weather app with hourly forecasts, weather alerts, and location-based updates.',
        category: ProjectCategory.APP_DEV,
        status: ProjectStatus.COMPLETED,
        technologies: ['Flutter', 'Dart', 'OpenWeather API', 'Geolocator'],
        imageUrl: 'https://picsum.photos/seed/weather/800/600',
        featured: false,
        createdAt: new Date('2024-07-15'),
        updatedAt: new Date('2024-07-15'),
      },

      // IoT Projects
      {
        id: generateId(),
        title: 'Smart Home Dashboard',
        description: 'IoT dashboard for monitoring and controlling smart home devices with real-time telemetry and automation rules.',
        category: ProjectCategory.IOT,
        status: ProjectStatus.IN_PROGRESS,
        technologies: ['Node.js', 'MQTT', 'WebSocket', 'React', 'Arduino'],
        imageUrl: 'https://picsum.photos/seed/smarthome/800/600',
        featured: true,
        createdAt: new Date('2024-03-05'),
        updatedAt: new Date('2024-03-05'),
      },
      {
        id: generateId(),
        title: 'Environmental Monitoring System',
        description: 'IoT system for tracking air quality, temperature, humidity, and pollution levels in real-time.',
        category: ProjectCategory.IOT,
        status: ProjectStatus.COMPLETED,
        technologies: ['Raspberry Pi', 'Python', 'MQTT', 'InfluxDB', 'Grafana'],
        imageUrl: 'https://picsum.photos/seed/environment/800/600',
        featured: false,
        createdAt: new Date('2024-04-12'),
        updatedAt: new Date('2024-04-12'),
      },
      {
        id: generateId(),
        title: 'Smart Agriculture System',
        description: 'Automated irrigation and crop monitoring system with soil sensors and weather integration.',
        category: ProjectCategory.IOT,
        status: ProjectStatus.COMPLETED,
        technologies: ['Arduino', 'ESP32', 'Node.js', 'MongoDB', 'Sensors'],
        imageUrl: 'https://picsum.photos/seed/agriculture/800/600',
        featured: true,
        createdAt: new Date('2024-05-18'),
        updatedAt: new Date('2024-05-18'),
      },
      {
        id: generateId(),
        title: 'Industrial Equipment Monitor',
        description: 'Real-time monitoring system for industrial machinery with predictive maintenance alerts.',
        category: ProjectCategory.IOT,
        status: ProjectStatus.COMPLETED,
        technologies: ['Python', 'MQTT', 'TimescaleDB', 'Machine Learning'],
        imageUrl: 'https://picsum.photos/seed/industrial/800/600',
        featured: false,
        createdAt: new Date('2024-06-22'),
        updatedAt: new Date('2024-06-22'),
      },
      {
        id: generateId(),
        title: 'Smart Parking System',
        description: 'IoT-based parking management with real-time availability tracking and mobile app integration.',
        category: ProjectCategory.IOT,
        status: ProjectStatus.IN_PROGRESS,
        technologies: ['ESP8266', 'Node.js', 'WebSocket', 'React', 'PostgreSQL'],
        imageUrl: 'https://picsum.photos/seed/parking/800/600',
        featured: false,
        createdAt: new Date('2024-07-08'),
        updatedAt: new Date('2024-07-08'),
      },
      {
        id: generateId(),
        title: 'Energy Monitoring System',
        description: 'Smart energy meter with consumption analytics, cost tracking, and efficiency recommendations.',
        category: ProjectCategory.IOT,
        status: ProjectStatus.COMPLETED,
        technologies: ['Raspberry Pi', 'Python', 'MQTT', 'React', 'InfluxDB'],
        imageUrl: 'https://picsum.photos/seed/energy/800/600',
        featured: false,
        createdAt: new Date('2024-08-14'),
        updatedAt: new Date('2024-08-14'),
      },

      // Automation Projects
      {
        id: generateId(),
        title: 'Telegram Productivity Bot',
        description: 'AI-powered Telegram bot for task automation, reminders, and productivity tracking with natural language processing.',
        category: ProjectCategory.AUTOMATION,
        status: ProjectStatus.COMPLETED,
        technologies: ['Python', 'Telegram API', 'PostgreSQL', 'Redis'],
        imageUrl: 'https://picsum.photos/seed/telebot/800/600',
        featured: true,
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20'),
      },
      {
        id: generateId(),
        title: 'Discord Community Manager',
        description: 'Automated moderation bot with custom commands, role management, and welcome messages.',
        category: ProjectCategory.AUTOMATION,
        status: ProjectStatus.COMPLETED,
        technologies: ['Node.js', 'Discord.js', 'MongoDB', 'Redis'],
        imageUrl: 'https://picsum.photos/seed/discord/800/600',
        featured: false,
        createdAt: new Date('2024-03-25'),
        updatedAt: new Date('2024-03-25'),
      },
      {
        id: generateId(),
        title: 'Email Marketing Automation',
        description: 'Automated email campaign system with segmentation, A/B testing, and analytics.',
        category: ProjectCategory.AUTOMATION,
        status: ProjectStatus.COMPLETED,
        technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Celery', 'SendGrid'],
        imageUrl: 'https://picsum.photos/seed/email/800/600',
        featured: true,
        createdAt: new Date('2024-04-30'),
        updatedAt: new Date('2024-04-30'),
      },
      {
        id: generateId(),
        title: 'Social Media Auto-Poster',
        description: 'Multi-platform social media scheduler with content calendar and performance analytics.',
        category: ProjectCategory.AUTOMATION,
        status: ProjectStatus.IN_PROGRESS,
        technologies: ['Node.js', 'TypeScript', 'BullMQ', 'PostgreSQL', 'APIs'],
        imageUrl: 'https://picsum.photos/seed/socialmedia/800/600',
        featured: false,
        createdAt: new Date('2024-05-28'),
        updatedAt: new Date('2024-05-28'),
      },
      {
        id: generateId(),
        title: 'Data Backup Automation',
        description: 'Automated backup system for databases and files with scheduling and cloud storage integration.',
        category: ProjectCategory.AUTOMATION,
        status: ProjectStatus.COMPLETED,
        technologies: ['Python', 'Bash', 'Cron', 'AWS S3', 'PostgreSQL'],
        imageUrl: 'https://picsum.photos/seed/backup/800/600',
        featured: false,
        createdAt: new Date('2024-06-18'),
        updatedAt: new Date('2024-06-18'),
      },
      {
        id: generateId(),
        title: 'CI/CD Pipeline Bot',
        description: 'GitHub bot for automated testing, deployment, and pull request management.',
        category: ProjectCategory.AUTOMATION,
        status: ProjectStatus.COMPLETED,
        technologies: ['Node.js', 'GitHub API', 'Docker', 'Kubernetes', 'Slack'],
        imageUrl: 'https://picsum.photos/seed/cicd/800/600',
        featured: false,
        createdAt: new Date('2024-07-25'),
        updatedAt: new Date('2024-07-25'),
      },
    ];
  }
}

export const projectRepository = new ProjectRepository();
export default ProjectRepository;
