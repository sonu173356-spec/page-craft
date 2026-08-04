'use client';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardAuthGuard from '@/components/auth/DashboardAuthGuard';
import { 
  LayoutDashboard, BookOpen, TrendingUp, DollarSign, 
  BarChart2, ShoppingCart, MessageSquare, Bell, Settings, PlusCircle
} from 'lucide-react';
import React from 'react';

const authorNavItems = [
  { label: 'Dashboard', href: '/author/dashboard', icon: <LayoutDashboard size={20} /> },
  { label: 'My Books', href: '/author/books', icon: <BookOpen size={20} /> },
  { label: 'Sales', href: '/author/sales', icon: <TrendingUp size={20} /> },
  { label: 'Royalty', href: '/author/royalty', icon: <DollarSign size={20} /> },
  { label: 'Analytics', href: '/author/analytics', icon: <BarChart2 size={20} /> },
  { label: 'Orders', href: '/author/orders', icon: <ShoppingCart size={20} /> },
  { label: 'Messages', href: '/author/messages', icon: <MessageSquare size={20} /> },
  { label: 'Notifications', href: '/author/notifications', icon: <Bell size={20} /> },
  { label: 'Settings', href: '/author/settings', icon: <Settings size={20} /> },
  { label: 'Upload Book', href: '/author/upload-book', icon: <PlusCircle size={20} /> },
];

export default function AuthorLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardAuthGuard requiredRole="Author">
      <DashboardLayout navItems={authorNavItems} userRole="Author">
        {children}
      </DashboardLayout>
    </DashboardAuthGuard>
  );
}