
import React from 'react';
import { cn } from '@/lib/utils';


const CTAButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className,
  onClick 
}) => {
  const baseClasses = "relative group font-medium rounded-xl transition-all duration-300 overflow-hidden";
  
  const variants = {
    primary: "bg-white text-gray-950 hover:bg-gray-100 shadow-lg hover:shadow-xl",
    secondary: "bg-gray-800/50 text-white border border-gray-700/50 hover:bg-gray-700/50 hover:border-gray-600/50 backdrop-blur-sm"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button 
      onClick={onClick}
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
    >
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};

export default CTAButton;
