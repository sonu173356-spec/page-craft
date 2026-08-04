'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createPortal } from 'react-dom';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Drawer({
  isOpen,
  onClose,
  position = 'right',
  size = 'md',
  title,
  children,
  className,
}: DrawerProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const sizes = {
    sm: 'max-w-xs',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full',
  };

  const initialX = position === 'right' ? '100%' : '-100%';

  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: initialX }}
            animate={{ x: 0 }}
            exit={{ x: initialX }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className={cn(
              'absolute top-0 bottom-0 bg-white shadow-2xl flex flex-col w-full',
              position === 'right' ? 'right-0' : 'left-0',
              sizes[size],
              className
            )}
            role="dialog"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
              <div className="text-xl font-serif font-semibold text-[#1A1A2E]">
                {title}
              </div>
              <button
                onClick={onClose}
                className="p-2 -mr-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-[#1A1A2E] transition-colors"
                aria-label="Close drawer"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
