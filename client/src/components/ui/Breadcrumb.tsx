'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  showHomeIcon?: boolean;
}

export function Breadcrumb({
  items,
  className,
  showHomeIcon = true,
}: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex', className)}>
      <ol className="flex items-center space-x-2 text-sm text-[#6B7280]">
        {showHomeIcon && (
          <li>
            <Link
              href="/"
              className="flex items-center hover:text-[#8B1A1A] transition-colors"
            >
              <Home size={16} />
              <span className="sr-only">Home</span>
            </Link>
          </li>
        )}
        
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="flex items-center space-x-2">
              {(index > 0 || showHomeIcon) && (
                <ChevronRight size={16} className="text-gray-400" />
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="flex items-center space-x-1 hover:text-[#8B1A1A] transition-colors truncate max-w-[120px] sm:max-w-none"
                >
                  {item.icon && <span className="mr-1">{item.icon}</span>}
                  <span className="truncate">{item.label}</span>
                </Link>
              ) : (
                <span className="flex items-center space-x-1 text-[#1A1A2E] font-medium truncate max-w-[150px] sm:max-w-none" aria-current="page">
                  {item.icon && <span className="mr-1">{item.icon}</span>}
                  <span className="truncate">{item.label}</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
