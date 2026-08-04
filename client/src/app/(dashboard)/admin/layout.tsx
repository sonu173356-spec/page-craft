'use client';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardAuthGuard from '@/components/auth/DashboardAuthGuard';
import { 
  LayoutDashboard, BookOpen, Users, ShoppingCart, DollarSign, 
  FileText, Tag, Star, MessageSquare, Mail, LifeBuoy, Settings, Shield
} from 'lucide-react';
import React from 'react';

const adminNavItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
  { label: 'Internal Dashboard', href: '/admin/internal-dashboard', icon: <BookOpen size={20} /> },
  { label: 'Books Manager', href: '/admin/books', icon: <BookOpen size={20} /> },
  { label: 'Order Requests', href: '/admin/orders', icon: <ShoppingCart size={20} /> },
  { label: 'Authors', href: '/admin/authors', icon: <Users size={20} /> },
  { label: 'Payments', href: '/admin/payments', icon: <DollarSign size={20} /> },
  { label: 'Users', href: '/admin/users', icon: <Users size={20} /> },
  { label: 'Blogs', href: '/admin/blogs', icon: <FileText size={20} /> },
  { label: 'Coupons', href: '/admin/coupons', icon: <Tag size={20} /> },
  { label: 'Reviews', href: '/admin/reviews', icon: <Star size={20} /> },
  { label: 'Messages', href: '/admin/messages', icon: <MessageSquare size={20} /> },
  { label: 'Newsletter', href: '/admin/newsletter', icon: <Mail size={20} /> },
  { label: 'Support', href: '/admin/support', icon: <LifeBuoy size={20} /> },
  { label: 'Settings', href: '/admin/settings', icon: <Settings size={20} /> },
  { label: 'Roles', href: '/admin/roles', icon: <Shield size={20} /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardAuthGuard requiredRole="Admin">
      <DashboardLayout navItems={adminNavItems} userRole="Admin">
        {children}
      </DashboardLayout>
    </DashboardAuthGuard>
  );
}