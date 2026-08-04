'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Bell, Search, ChevronLeft, LogOut, User } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

export interface DashboardNavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  navItems: DashboardNavItem[];
  userRole?: 'Author' | 'Admin';
}

export default function DashboardLayout({
  children,
  navItems,
  userRole = 'Author',
}: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    handleResize(); // Init
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathname]);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isSidebarOpen ? 280 : 80,
          x: isMobileSidebarOpen ? 0 : (window.innerWidth < 1024 ? -280 : 0)
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 z-50 flex flex-col transition-all overflow-hidden ${
          window.innerWidth < 1024 && !isMobileSidebarOpen ? '-translate-x-full absolute' : ''
        }`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100 flex-shrink-0">
          <Link href="/" className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            {isSidebarOpen || isMobileSidebarOpen ? (
              <Logo size="sm" />
            ) : (
              <Logo variant="icon" size="sm" />
            )}
          </Link>
          
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden lg:flex p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <ChevronLeft className={`w-5 h-5 transition-transform duration-300 ${!isSidebarOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <button
            onClick={() => setIsMobileSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center px-3 py-3 rounded-xl transition-all group ${
                  isActive
                    ? 'bg-[#8B1A1A] text-white shadow-md shadow-red-900/10'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-[#8B1A1A]'
                }`}
                title={!isSidebarOpen ? item.label : undefined}
              >
                <span className={`${isActive ? 'text-white' : 'text-gray-400 group-hover:text-[#8B1A1A]'}`}>
                  {item.icon}
                </span>
                <AnimatePresence>
                  {(isSidebarOpen || isMobileSidebarOpen) && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="ml-3 whitespace-nowrap font-medium text-sm"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-gray-100 flex-shrink-0">
          <Link
            href="/logout"
            className="flex items-center px-3 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors group"
            title={!isSidebarOpen ? 'Logout' : undefined}
          >
            <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-600" />
            {(isSidebarOpen || isMobileSidebarOpen) && (
              <span className="ml-3 font-medium text-sm">Logout</span>
            )}
          </Link>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 z-30 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="hidden md:flex relative max-w-md w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/20 focus:border-[#8B1A1A] transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
            
            <button className="flex items-center gap-3 hover:bg-gray-50 p-1.5 rounded-full lg:rounded-xl transition-colors">
              <div className="w-8 h-8 rounded-full bg-[#FDFAF6] border border-[#E5D5B5] flex items-center justify-center text-[#8B1A1A]">
                <User className="w-4 h-4" />
              </div>
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-sm font-semibold text-gray-900 leading-none mb-1">John Doe</span>
                <span className="text-xs text-gray-500 leading-none">{userRole}</span>
              </div>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-7xl mx-auto"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
