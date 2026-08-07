'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, BookOpen, PenTool, Globe, Printer, BookType, Sparkles, Megaphone, CheckCircle2, ExternalLink, ShieldCheck, LayoutDashboard } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { NAV_ITEMS, NavItem } from '@/lib/constants';

// A mapping for dynamic icons in the mega menu
const iconMap: Record<string, React.ReactNode> = {
  'Publishing Plans': <BookOpen className="w-5 h-5" />,
  'Publishing Process': <CheckCircle2 className="w-5 h-5" />,
  'Self Publishing': <PenTool className="w-5 h-5" />,
  'Distribution': <Globe className="w-5 h-5" />,
  'Marketing Services': <Megaphone className="w-5 h-5" />,
  'Book Editing': <BookType className="w-5 h-5" />,
  'Author Portal': <LayoutDashboard className="w-5 h-5 text-[#8B1A1A]" />,
  'Upload Book Desk': <PenTool className="w-5 h-5 text-[#8B1A1A]" />,
  'Content Manager': <Sparkles className="w-5 h-5 text-[#8B1A1A]" />,
  'Order Requests Desk': <ShieldCheck className="w-5 h-5 text-[#8B1A1A]" />,
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Background transition on scroll
      setIsScrolled(currentScrollY > 20);

      // Hide/Show on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const handleMouseEnter = (label: string) => {
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              const hasChildren = !!item.children;

              return (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => hasChildren && handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.isDashboard ? `/login?redirect=${encodeURIComponent(item.href)}` : item.href}
                    target={item.isDashboard ? '_blank' : undefined}
                    rel={item.isDashboard ? 'noopener noreferrer' : undefined}
                    className={`flex items-center text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-[#8B1A1A]'
                        : 'text-gray-700 hover:text-[#8B1A1A]'
                    }`}
                  >
                    {item.label}
                    {hasChildren && (
                      <ChevronDown className="ml-1 w-4 h-4 opacity-70" />
                    )}
                  </Link>

                  {/* Mega Menu Dropdown */}
                  {hasChildren && (
                    <AnimatePresence>
                      {activeDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-screen max-w-xl"
                        >
                          <div className="bg-white rounded-xl shadow-xl ring-1 ring-black/5 overflow-hidden border border-gray-100">
                            <div className="p-6 grid grid-cols-2 gap-6">
                              {item.children?.map((child) => {
                                const isDashboardTarget = child.isDashboard || child.href.startsWith('/author') || child.href.startsWith('/admin');
                                const targetUrl = isDashboardTarget ? `/login?redirect=${encodeURIComponent(child.href)}` : child.href;

                                return (
                                  <Link
                                    key={child.label}
                                    href={targetUrl}
                                    target={isDashboardTarget ? '_blank' : undefined}
                                    rel={isDashboardTarget ? 'noopener noreferrer' : undefined}
                                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-[#FDFAF6] transition-colors group/item"
                                  >
                                    <div className="flex-shrink-0 mt-1 text-[#C5A55A] group-hover/item:text-[#8B1A1A] transition-colors">
                                      {iconMap[child.label] || <BookOpen className="w-5 h-5" />}
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-semibold text-gray-900 mb-1 group-hover/item:text-[#8B1A1A] transition-colors flex items-center gap-1">
                                        {child.label}
                                        {isDashboardTarget && (
                                          <ExternalLink className="w-3 h-3 text-gray-400" />
                                        )}
                                      </h4>
                                      <p className="text-xs text-gray-500 leading-snug">
                                        {child.description}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/login?redirect=/author/upload-book"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-[#8B1A1A] rounded-full hover:bg-[#722F37] transition-colors shadow-md hover:shadow-lg gap-1.5"
            >
              Get Published
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </Link>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-[#8B1A1A] transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 overflow-y-auto"
            style={{ maxHeight: 'calc(100vh - 80px)' }}
          >
            <div className="px-4 py-6 space-y-4">
              {NAV_ITEMS.map((item) => (
                <MobileNavItem
                  key={item.label}
                  item={item}
                  pathname={pathname}
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                />
              ))}
              <div className="pt-6 border-t border-gray-100">
                <Link
                  href="/login?redirect=/author/upload-book"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full px-6 py-3 text-base font-semibold text-white bg-[#8B1A1A] rounded-full hover:bg-[#722F37] transition-colors gap-2"
                >
                  Get Published ↗
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function MobileNavItem({
  item,
  pathname,
  activeDropdown,
  setActiveDropdown,
}: {
  item: NavItem;
  pathname: string;
  activeDropdown: string | null;
  setActiveDropdown: (v: string | null) => void;
}) {
  const hasChildren = !!item.children;
  const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
  const isExpanded = activeDropdown === item.label;

  if (!hasChildren) {
    return (
      <Link
        href={item.isDashboard ? `/login?redirect=${encodeURIComponent(item.href)}` : item.href}
        target={item.isDashboard ? '_blank' : undefined}
        rel={item.isDashboard ? 'noopener noreferrer' : undefined}
        className={`block px-4 py-2 text-base font-medium rounded-lg transition-colors ${
          isActive ? 'text-[#8B1A1A] bg-[#FDFAF6]' : 'text-gray-900 hover:bg-gray-50'
        }`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="space-y-1">
      <button
        onClick={() => setActiveDropdown(isExpanded ? null : item.label)}
        className={`flex items-center justify-between w-full px-4 py-2 text-base font-medium rounded-lg transition-colors ${
          isActive || isExpanded ? 'text-[#8B1A1A] bg-[#FDFAF6]' : 'text-gray-900 hover:bg-gray-50'
        }`}
      >
        {item.label}
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 py-2 space-y-2 pl-8 border-l-2 border-[#FDFAF6] ml-4">
              {item.children?.map((child) => {
                const isDashboardTarget = child.isDashboard || child.href.startsWith('/author') || child.href.startsWith('/admin');
                const targetUrl = isDashboardTarget ? `/login?redirect=${encodeURIComponent(child.href)}` : child.href;

                return (
                  <Link
                    key={child.label}
                    href={targetUrl}
                    target={isDashboardTarget ? '_blank' : undefined}
                    rel={isDashboardTarget ? 'noopener noreferrer' : undefined}
                    className={`block py-2 text-sm transition-colors ${
                      pathname === child.href ? 'text-[#8B1A1A] font-medium' : 'text-gray-600 hover:text-[#8B1A1A]'
                    }`}
                  >
                    {child.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
