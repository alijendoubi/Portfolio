/**
 * All Projects Page with Filtering
 */

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import MainLayout from '../../layouts/MainLayout';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import { projectsApi } from '../../services/api';
import type { Project } from '@portfolio/common/types';
import { ProjectCategory } from '@portfolio/common/types';

const AllProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'ALL'>('ALL');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const filters = selectedCategory !== 'ALL' ? { category: selectedCategory } : {};
        const result = await projectsApi.getAll({ ...filters, limit: 50 });
        setProjects(result.projects);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [selectedCategory]);

  const categories = [
    { value: 'ALL', label: 'All Projects', icon: '🌟' },
    { value: ProjectCategory.WEB_DEV, label: 'Web Dev', icon: '🌐' },
    { value: ProjectCategory.APP_DEV, label: 'App Dev', icon: '📱' },
    { value: ProjectCategory.IOT, label: 'IoT', icon: '🔌' },
    { value: ProjectCategory.AUTOMATION, label: 'Automations', icon: '🤖' },
  ];

  return (
    <MainLayout>
      <Head>
        <title>All Projects | Portfolio</title>
        <meta name="description" content="Browse all my projects across different categories" />
      </Head>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 grid-background opacity-20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              All <span className="text-neon">Projects</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Explore my complete portfolio across Web Dev, App Dev, IoT, and Automation
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value as typeof selectedCategory)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    selectedCategory === cat.value
                      ? 'bg-primary-500 text-white shadow-glow-md scale-105'
                      : 'glass text-gray-300 hover:text-primary-400 hover:border-primary-500/30'
                  }`}
                >
                  <span className="mr-2">{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Count */}
      <section className="py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400">
            {loading ? 'Loading...' : `${projects.length} project${projects.length !== 1 ? 's' : ''} found`}
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-20">
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

export default AllProjectsPage;
