/**
 * Futuristic Card Component with Glass Morphism
 */

import React from 'react';
import classNames from 'classnames';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className, hover = true, glow = false }) => {
  const classes = classNames(
    'card-futuristic',
    {
      'glass-hover': hover,
      'shadow-glow-md': glow,
    },
    className
  );
  
  return <div className={classes}>{children}</div>;
};

export default Card;
