// app/components/SafeInput.tsx
'use client';

import React, { useState } from 'react';
import { sanitizeInput, validateEmail } from '../lib/security';

interface SafeInputProps {
  type: 'text' | 'email' | 'tel';
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  maxLength?: number;
  className?: string;
}

export default function SafeInput({
  type,
  placeholder,
  value,
  onChange,
  required = false,
  maxLength = 200,
  className = ''
}: SafeInputProps) {
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeInput(e.target.value);
    
    if (type === 'email' && sanitized.length > 0) {
      if (!validateEmail(sanitized)) {
        setError('Email inválido');
      } else {
        setError('');
      }
    }
    
    onChange(sanitized);
  };

  return (
    <div className="w-full">
      <input
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        className={`w-full px-6 py-4 rounded-full border-2 focus:outline-none focus:ring-4 focus:ring-red-300 transition-all ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
        autoComplete={type === 'email' ? 'email' : type === 'tel' ? 'tel' : 'off'}
      />
      {error && <p className="text-red-500 text-sm mt-2 ml-4">{error}</p>}
    </div>
  );
}