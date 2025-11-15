/**
 * Loading Spinner Component
 * Futuristic loading animation
 */

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizes[size]} relative`}>
        {/* Outer ring */}
        <div className="absolute inset-0 border-4 border-primary-500/30 rounded-full"></div>
        
        {/* Spinning ring */}
        <div className="absolute inset-0 border-4 border-transparent border-t-primary-500 rounded-full animate-spin"></div>
        
        {/* Inner glow */}
        <div className="absolute inset-2 bg-primary-500/20 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
