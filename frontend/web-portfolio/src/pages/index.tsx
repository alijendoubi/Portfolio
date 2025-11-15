/**
 * Homepage - Landing page with all sections
 */

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import MainLayout from '../layouts/MainLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import AnimatedCounter from '../components/AnimatedCounter';
import { projectsApi } from '../services/api';
import type { Project } from '@portfolio/common/types';
import { ProjectCategory } from '@portfolio/common/types';

const HomePage: React.FC = () => {
  const [projectsByCategory, setProjectsByCategory] = useState<Record<string, Project[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const [webDev, appDev, iot, automation] = await Promise.all([
          projectsApi.getAll({ category: ProjectCategory.WEB_DEV, limit: 6 }),
          projectsApi.getAll({ category: ProjectCategory.APP_DEV, limit: 6 }),
          projectsApi.getAll({ category: ProjectCategory.IOT, limit: 6 }),
          projectsApi.getAll({ category: ProjectCategory.AUTOMATION, limit: 6 }),
        ]);

        setProjectsByCategory({
          webDev: webDev.projects,
          appDev: appDev.projects,
          iot: iot.projects,
          automation: automation.projects,
        });
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const skills = {
    languages: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C++', 'Go', 'Rust', 'SQL'],
    frontend: ['React', 'Next.js', 'Vue.js', 'Tailwind CSS', 'HTML5', 'CSS3', 'Redux', 'Framer Motion'],
    backend: ['Node.js', 'Express', 'FastAPI', 'Django', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL'],
    mobile: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'iOS', 'Android'],
    iot: ['Arduino', 'Raspberry Pi', 'MQTT', 'WebSocket', 'ESP32', 'Sensors'],
    devops: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'GitHub Actions', 'Terraform'],
    tools: ['Git', 'VS Code', 'Figma', 'Postman', 'Jest', 'Linux'],
  };

  const ProjectGrid = ({ projects, category }: { projects: Project[]; category: string }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.slice(0, 6).map((project) => (
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
                <Badge variant="accent" size="sm">⭐</Badge>
              )}
            </div>
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
  );

  return (
    <MainLayout>
      <Head>
        <title>Portfolio | Web Dev, App Dev, IoT & Automations</title>
        <meta
          name="description"
          content="Showcase of cutting-edge projects in Web Development, App Development, IoT, and Automation"
        />
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta property="og:image" content="/logo.png" />
      </Head>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 grid-background opacity-30" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-blob" />
          <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-accent-cyan/15 rounded-full blur-3xl animate-blob-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-400/15 rounded-full blur-3xl animate-blob" style={{animationDelay: '2s'}} />
          <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-accent-neon/10 rounded-full blur-3xl animate-blob-slow" style={{animationDelay: '4s'}} />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 animate-fade-in-up">
            Welcome to the
            <span className="block text-neon mt-2">Future of Tech</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto animate-fade-in-up animate-delay-200">
            Full-Stack Developer • IoT Engineer • Automation Specialist
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-300">
            <Button size="lg">
              <a href="#projects">View Projects</a>
            </Button>
            <Button variant="outline" size="lg">
              <a href="#contact">Work With Me</a>
            </Button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Projects Completed', value: 24, suffix: '+' },
              { label: 'Technologies', value: 30, suffix: '+' },
              { label: 'Years Experience', value: 5, suffix: '+' },
              { label: 'Happy Clients', value: 15, suffix: '+' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              About <span className="text-neon">Me</span>
            </h2>
            <Card className="p-8">
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p className="text-lg">
                  Hi! I'm a passionate <span className="text-primary-400 font-semibold">Full-Stack Developer</span> and 
                  <span className="text-primary-400 font-semibold"> Technology Enthusiast</span> specializing in building 
                  modern web applications, mobile apps, IoT solutions, and automation systems.
                </p>
                <p>
                  With expertise spanning from <span className="text-accent-cyan">frontend frameworks</span> like React and Next.js 
                  to <span className="text-accent-cyan">backend technologies</span> like Node.js and Python, I create 
                  end-to-end solutions that are scalable, efficient, and user-friendly.
                </p>
                <p>
                  My journey in tech has led me to explore cutting-edge fields including IoT device integration, 
                  automation workflows, and AI-powered applications. I'm always excited to learn new technologies 
                  and tackle challenging problems.
                </p>
                <p className="text-primary-400 font-semibold">
                  Let's build something amazing together! 🚀
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Tech <span className="text-neon">Stack</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-6">
                A comprehensive toolkit of modern technologies and frameworks I use to build exceptional solutions
              </p>
              
              {/* Proficiency Indicators */}
              <div className="inline-flex items-center gap-6 glass rounded-full px-8 py-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent-cyan shadow-neon"></div>
                  <span className="text-sm text-gray-400">Expert</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                  <span className="text-sm text-gray-400">Proficient</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-dark-600"></div>
                  <span className="text-sm text-gray-400">Familiar</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.entries(skills).map(([category, items]) => {
                const icons = {
                  languages: '💻',
                  frontend: '🎨',
                  backend: '⚙️',
                  mobile: '📱',
                  iot: '🔌',
                  devops: '🚀',
                  tools: '🛠️',
                };
                
                return (
                  <Card key={category} className="p-8 hover:shadow-glow-lg transition-all duration-300">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="text-4xl">{icons[category as keyof typeof icons]}</div>
                      <h3 className="text-2xl font-bold text-primary-400 capitalize">
                        {category === 'devops' ? 'DevOps' : category === 'iot' ? 'IoT' : category}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill) => (
                        <Badge key={skill} variant="primary" size="md">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
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
            ].map((category) => (
              <Link key={category.title} href={category.href}>
                <Card className="text-center cursor-pointer">
                  <div className="text-5xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-bold text-primary-400 mb-2">{category.title}</h3>
                  <p className="text-gray-400">{category.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Sections */}
      <section id="projects" className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Web Dev */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">
                <span className="text-primary-400">Web Dev</span> Projects
              </h2>
              <Link href="/projects/web-dev" className="btn-outline">View All</Link>
            </div>
            {loading ? (
              <div className="text-center text-gray-400">Loading projects...</div>
            ) : (
              <ProjectGrid projects={projectsByCategory.webDev || []} category="web" />
            )}
          </div>

          {/* App Dev */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">
                <span className="text-primary-400">App Dev</span> Projects
              </h2>
              <Link href="/projects/app-dev" className="btn-outline">View All</Link>
            </div>
            {loading ? (
              <div className="text-center text-gray-400">Loading projects...</div>
            ) : (
              <ProjectGrid projects={projectsByCategory.appDev || []} category="app" />
            )}
          </div>

          {/* IoT */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">
                <span className="text-primary-400">IoT</span> Projects
              </h2>
              <Link href="/projects/iot" className="btn-outline">View All</Link>
            </div>
            {loading ? (
              <div className="text-center text-gray-400">Loading projects...</div>
            ) : (
              <ProjectGrid projects={projectsByCategory.iot || []} category="iot" />
            )}
          </div>

          {/* Automations */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">
                <span className="text-primary-400">Automations</span>
              </h2>
              <Link href="/projects/automations" className="btn-outline">View All</Link>
            </div>
            {loading ? (
              <div className="text-center text-gray-400">Loading projects...</div>
            ) : (
              <ProjectGrid projects={projectsByCategory.automation || []} category="automation" />
            )}
          </div>

          <div className="text-center">
            <Button size="lg">
              <Link href="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">
            Work <span className="text-neon">With Me</span>
          </h2>
          <div className="max-w-3xl mx-auto">
            <Card className="p-8">
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thanks! I will get back to you shortly.');
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-600 focus:outline-none focus:border-primary-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-600 focus:outline-none focus:border-primary-500"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Project Type</label>
                  <select className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-600 focus:outline-none focus:border-primary-500">
                    <option>Web Development</option>
                    <option>App Development</option>
                    <option>IoT</option>
                    <option>Automations</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Message</label>
                  <textarea
                    rows={5}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-600 focus:outline-none focus:border-primary-500"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <div className="text-center">
                  <Button type="submit" size="lg">Send Message</Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;
