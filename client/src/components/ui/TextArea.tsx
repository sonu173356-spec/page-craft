'use client';

import React, { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'filled';
  showCount?: boolean;
  maxLength?: number;
  autoResize?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      variant = 'default',
      showCount,
      maxLength,
      autoResize,
      id,
      onChange,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const [charCount, setCharCount] = useState(0);

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      
      if (autoResize) {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
      }
      
      if (onChange) {
        onChange(e);
      }
    };

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
        <textarea
          id={inputId}
          ref={ref}
          maxLength={maxLength}
          onChange={handleInput}
          className={cn(
            'flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm text-[#1A1A2E] transition-colors',
            'placeholder:text-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-[#8B1A1A] focus:border-transparent',
            'disabled:cursor-not-allowed disabled:opacity-50',
            variants[variant],
            error ? 'border-red-500 focus:ring-red-500' : '',
            className
          )}
          {...props}
        />
        
        <div className="flex justify-between items-start mt-1">
          <p
            className={cn(
              'text-xs',
              error ? 'text-red-500' : 'text-[#6B7280]'
            )}
          >
            {error || helperText}
          </p>
          
          {(showCount && maxLength) && (
            <span className="text-xs text-[#6B7280] ml-auto">
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export { TextArea };
