/**
 * Badge Component for Technology Tags
 */

import React from 'react';
import classNames from 'classnames';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'accent';
  size?: 'sm' | 'md';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', size = 'sm', className }) => {
  const baseClasses = 'inline-flex items-center rounded-full font-medium transition-all duration-200 hover:scale-105';
  
  const variantClasses = {
    default: 'bg-dark-700/50 text-gray-300 border border-dark-600 hover:border-dark-500',
    primary: 'bg-primary-500/20 text-primary-300 border border-primary-500/30 hover:bg-primary-500/30',
    accent: 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30 hover:bg-accent-cyan/30',
  };
  
  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
  };
  
  const classes = classNames(baseClasses, variantClasses[variant], sizeClasses[size], className);
  
  return <span className={classes}>{children}</span>;
};

export default Badge;
