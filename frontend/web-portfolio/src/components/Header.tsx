/**
 * Header Navigation Component
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import classNames from 'classnames';

const Header: React.FC = () => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Web Dev', path: '/projects/web-dev' },
    { name: 'App Dev', path: '/projects/app-dev' },
    { name: 'IoT', path: '/projects/iot' },
    { name: 'Automations', path: '/projects/automations' },
  ];
  
  const isActive = (path: string) => router.pathname === path;
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-dark-600/50 py-[10px]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="relative w-24 h-24 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/logo.png"
                alt="Portfolio Logo"
                width={96}
                height={96}
                className="object-contain"
                priority
              />
            </div>
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={classNames(
                  'px-4 py-2 rounded-lg transition-all duration-300 font-medium',
                  isActive(item.path)
                    ? 'text-primary-400 bg-primary-500/10'
                    : 'text-gray-300 hover:text-primary-400 hover:bg-dark-800'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-primary-400 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass border-t border-dark-600/50 animate-fade-in">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={classNames(
                  'block px-4 py-3 rounded-lg transition-all duration-300 font-medium',
                  isActive(item.path)
                    ? 'text-primary-400 bg-primary-500/10'
                    : 'text-gray-300 hover:text-primary-400 hover:bg-dark-800'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
