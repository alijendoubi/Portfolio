/**
 * Badge Component for Technology Tags
 */

import React from 'react';
import classNames from 'classnames';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'accent';
  size?: 'sm' | 'md';
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', size = 'sm' }) => {
  const baseClasses = 'inline-flex items-center rounded-full font-medium transition-all duration-200';
  
  const variantClasses = {
    default: 'bg-dark-700/50 text-gray-300 border border-dark-600',
    primary: 'bg-primary-500/20 text-primary-300 border border-primary-500/30',
    accent: 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30',
  };
  
  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  };
  
  const classes = classNames(baseClasses, variantClasses[variant], sizeClasses[size]);
  
  return <span className={classes}>{children}</span>;
};

export default Badge;
