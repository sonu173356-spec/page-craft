'use client';

import React, { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'filled';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      variant = 'default',
      leftIcon,
      rightIcon,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const [isFocused, setIsFocused] = useState(false);

    const variants = {
      default: 'bg-white border-[#E5E7EB]',
      filled: 'bg-black/5 border-transparent focus:bg-white',
    };

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[#1A1A2E]"
          >
            {label}
          </label>
        )}
        <div className="relative w-full">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              'flex h-11 w-full rounded-md border px-3 py-2 text-sm text-[#1A1A2E] transition-colors',
              'placeholder:text-gray-400',
              'focus:outline-none focus:ring-2 focus:ring-[#8B1A1A] focus:border-transparent',
              'disabled:cursor-not-allowed disabled:opacity-50',
              leftIcon ? 'pl-10' : '',
              rightIcon ? 'pr-10' : '',
              variants[variant],
              error ? 'border-red-500 focus:ring-red-500' : '',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
        {(error || helperText) && (
          <p
            className={cn(
              'text-xs mt-1',
              error ? 'text-red-500' : 'text-[#6B7280]'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
