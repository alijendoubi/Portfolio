/**
 * App Development Projects Page
 */

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import MainLayout from '../../layouts/MainLayout';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import { projectsApi } from '../../services/api';
import type { Project } from '@portfolio/common/types';
import { ProjectCategory } from '@portfolio/common/types';

const AppDevPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await projectsApi.getAll({
          category: ProjectCategory.APP_DEV,
          limit: 12,
        });
        setProjects(result.projects);
      } catch (error) {
        console.error('Failed to fetch app dev projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <MainLayout>
      <Head>
        <title>App Development Projects | Portfolio</title>
        <meta
          name="description"
          content="Mobile and desktop applications including iOS, Android, and cross-platform solutions"
        />
      </Head>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 grid-background opacity-20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="text-6xl mb-4">📱</div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              App Development <span className="text-neon">Projects</span>
            </h1>
            <p className="text-xl text-gray-400">
              Cross-platform mobile and desktop applications with native performance
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center text-gray-400">Loading projects...</div>
          ) : projects.length === 0 ? (
            <div className="text-center text-gray-400">No projects found</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Link key={project.id} href={`/projects/${project.id}`}>
                  <Card className="h-full cursor-pointer group">
                    {project.imageUrl && (
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    )}
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-primary-300 group-hover:text-primary-400 transition-colors">
                        {project.title}
                      </h3>
                      {project.featured && (
                        <Badge variant="accent" size="sm">
                          ⭐ Featured
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge>+{project.technologies.length - 3}</Badge>
                      )}
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default AppDevPage;
