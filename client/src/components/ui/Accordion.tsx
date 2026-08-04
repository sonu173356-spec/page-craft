'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AccordionItemProps {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItemProps[];
  allowMultiple?: boolean;
  className?: string;
  defaultExpanded?: string[];
}

export function Accordion({
  items,
  allowMultiple = false,
  className,
  defaultExpanded = [],
}: AccordionProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set(defaultExpanded)
  );

  const toggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) {
          next.clear();
        }
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={cn('w-full divide-y divide-[#E5E7EB] border-t border-b border-[#E5E7EB]', className)}>
      {items.map((item) => {
        const isExpanded = expandedIds.has(item.id);
        
        return (
          <div key={item.id} className="w-full">
            <button
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B1A1A] rounded-sm"
              aria-expanded={isExpanded}
            >
              <span className="font-medium text-[#1A1A2E]">{item.title}</span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-gray-500 ml-4 flex-shrink-0"
              >
                <ChevronDown size={20} />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div className="pb-4 text-[#4A4A5A]">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
