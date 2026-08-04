'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { createPortal } from 'react-dom';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export function Tooltip({
  content,
  children,
  position = 'top',
  delay = 200,
  className,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updatePosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    
    // Add scroll offsets
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    const positions = {
      top: {
        x: rect.left + rect.width / 2 + scrollX,
        y: rect.top - 8 + scrollY,
      },
      bottom: {
        x: rect.left + rect.width / 2 + scrollX,
        y: rect.bottom + 8 + scrollY,
      },
      left: {
        x: rect.left - 8 + scrollX,
        y: rect.top + rect.height / 2 + scrollY,
      },
      right: {
        x: rect.right + 8 + scrollX,
        y: rect.top + rect.height / 2 + scrollY,
      },
    };

    setCoords(positions[position]);
  };

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      updatePosition();
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible) {
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
    }
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isVisible]);

  const originTransforms = {
    top: 'translate(-50%, -100%)',
    bottom: 'translate(-50%, 0)',
    left: 'translate(-100%, -50%)',
    right: 'translate(0, -50%)',
  };

  return (
    <>
      <span
        ref={triggerRef as any}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        className="inline-block"
      >
        {children}
      </span>
      
      {typeof window !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isVisible && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: 'absolute',
                  left: coords.x,
                  top: coords.y,
                  transform: originTransforms[position],
                  pointerEvents: 'none',
                  zIndex: 9999,
                }}
                className={cn(
                  'px-2.5 py-1.5 bg-[#1A1A2E] text-white text-xs font-medium rounded shadow-lg whitespace-nowrap',
                  className
                )}
                role="tooltip"
              >
                {content}
                {/* Arrow */}
                <div
                  className={cn(
                    'absolute w-2 h-2 bg-[#1A1A2E] rotate-45',
                    position === 'top' && 'bottom-[-4px] left-1/2 -translate-x-1/2',
                    position === 'bottom' && 'top-[-4px] left-1/2 -translate-x-1/2',
                    position === 'left' && 'right-[-4px] top-1/2 -translate-y-1/2',
                    position === 'right' && 'left-[-4px] top-1/2 -translate-y-1/2'
                  )}
                />
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
