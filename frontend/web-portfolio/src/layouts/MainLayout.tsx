/**
 * Main Layout Component
 */

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import ScrollToTop from '../components/ScrollToTop';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <ParticleBackground />
      <Header />
      <main className="flex-1 pt-16 relative z-10">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default MainLayout;
