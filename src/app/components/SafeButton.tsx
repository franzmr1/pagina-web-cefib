// app/components/SafeButton.tsx
'use client';

import React from 'react';

interface SafeButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

export default function SafeButton({
  onClick,
  children,
  variant = 'primary',
  className = '',
  disabled = false,
  ariaLabel
}: SafeButtonProps) {
  const baseStyles = 'px-6 py-3 rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-4';
  
  const variants = {
    primary: 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 focus:ring-red-300',
    secondary: 'bg-white text-red-500 hover:bg-gray-100 focus:ring-gray-300',
    outline: 'border-2 border-white text-white hover:bg-white hover:text-red-500 focus:ring-white'
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      // Prevenir doble click
      const button = document.activeElement as HTMLButtonElement;
      button.disabled = true;
      onClick();
      setTimeout(() => {
        button.disabled = false;
      }, 1000);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${baseStyles} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
}