'use client';
import React from 'react';

export default function Button({
  children,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}) {
  const base = 'inline-flex items-center justify-center font-semibold';
  if (variant === 'primary') {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`${base} btn-primary ${className}`}
      >
        {children}
      </button>
    );
  }
  if (variant === 'outline') {
    return (
      <button type={type} onClick={onClick} className={`${base} border border-gray-200 rounded-lg px-4 py-2 ${className}`}>
        {children}
      </button>
    );
  }
  return (
    <button type={type} onClick={onClick} className={`${base} btn-ghost ${className}`}>
      {children}
    </button>
  );
}