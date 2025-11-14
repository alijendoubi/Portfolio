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
        title: 'Telegram Productivity Bot',
        description: 'AI-powered Telegram bot for task automation, reminders, and productivity tracking with natural language processing.',
        category: ProjectCategory.AUTOMATION,
        status: ProjectStatus.COMPLETED,
        technologies: ['Python', 'Telegram API', 'PostgreSQL', 'Redis'],
        imageUrl: 'https://picsum.photos/seed/telebot/800/600',
        featured: false,
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20'),
      },
    ];
  }
}

export const projectRepository = new ProjectRepository();
export default ProjectRepository;
