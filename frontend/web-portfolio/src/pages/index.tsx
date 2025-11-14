/**
 * Homepage - Landing page with hero and featured projects
 */

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import MainLayout from '../layouts/MainLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { projectsApi } from '../services/api';
import type { Project } from '@portfolio/common/types';

const HomePage: React.FC = () => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        const projects = await projectsApi.getFeatured(6);
        setFeaturedProjects(projects);
      } catch (error) {
        console.error('Failed to fetch featured projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);

  return (
    <MainLayout>
      <Head>
        <title>Portfolio | Web Dev, App Dev, IoT & Automations</title>
        <meta
          name="description"
          content="Showcase of cutting-edge projects in Web Development, App Development, IoT, and Automation"
        />
      </Head>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 grid-background opacity-30" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl animate-pulse-slow animate-delay-500" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 animate-fade-in-up">
            Welcome to the
            <span className="block text-neon mt-2">Future of Tech</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto animate-fade-in-up animate-delay-200">
            Exploring the boundaries of Web Development, App Development, IoT, and Automation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-300">
            <Button size="lg">
              <a href="#projects">View Projects</a>
            </Button>
            <Button variant="outline" size="lg">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-primary-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="text-primary-400">Explore</span> Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Web Dev',
                icon: '🌐',
                description: 'Modern web applications',
                href: '/projects/web-dev',
              },
              {
                title: 'App Dev',
                icon: '📱',
                description: 'Mobile & desktop apps',
                href: '/projects/app-dev',
              },
              {
                title: 'IoT',
                icon: '🔌',
                description: 'Smart device solutions',
                href: '/projects/iot',
              },
              {
                title: 'Automations',
                icon: '🤖',
                description: 'Bots & workflows',
                href: '/projects/automations',
              },
            ].map((category, index) => (
              <Link key={category.title} href={category.href}>
                <Card
                  className={`text-center cursor-pointer animate-fade-in-up animate-delay-${index * 100}`}
                >
                  <div className="text-5xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-bold text-primary-400 mb-2">{category.title}</h3>
                  <p className="text-gray-400">{category.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="text-primary-400">Featured</span> Projects
          </h2>

          {loading ? (
            <div className="text-center text-gray-400">Loading projects...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <Link key={project.id} href={`/projects/${project.id}`}>
                  <Card className="h-full cursor-pointer">
                    {project.imageUrl && (
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                        />
                      </div>
                    )}
                    <h3 className="text-xl font-bold mb-2 text-primary-300">{project.title}</h3>
                    <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>
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

          <div className="text-center mt-12">
            <Button size="lg">
              <Link href="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;
