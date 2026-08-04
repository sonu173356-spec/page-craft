'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store';
import { Logo } from '@/components/ui/Logo';
import { Shield, Lock, UserCheck, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

interface DashboardAuthGuardProps {
  children: React.ReactNode;
  requiredRole: 'Author' | 'Admin';
}

export default function DashboardAuthGuard({ children, requiredRole }: DashboardAuthGuardProps) {
  const { user, isAuthenticated, login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const userRole = user?.role?.toLowerCase();
  const reqRole = requiredRole.toLowerCase();

  const isAuthorized = isAuthenticated && user && (
    reqRole === 'author' ? (userRole === 'author' || userRole === 'admin') : userRole === 'admin'
  );

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please fill in both email and password.');
      return;
    }

    const role: 'admin' | 'author' = email.includes('admin') || reqRole === 'admin' ? 'admin' : 'author';
    const name = role === 'admin' ? 'Admin Manager' : 'Author Published';

    login(
      {
        id: role === 'admin' ? 'usr-admin-1' : 'usr-author-1',
        name,
        email,
        role,
        isVerified: true,
        avatar: '/logo-icon.png',
        createdAt: new Date().toISOString(),
      },
      'mock-access-token-jwt',
      'mock-refresh-token-jwt'
    );

    toast.success(`Welcome back, ${name}! Logged into ${requiredRole} Dashboard.`);
    setErrorMsg('');
  };

  const handleQuickDemoLogin = (targetRole: 'admin' | 'author') => {
    const demoEmail = targetRole === 'admin' ? 'admin@pagecraft.com' : 'author@pagecraft.com';
    const demoName = targetRole === 'admin' ? 'Page Craft Admin' : 'Elena Vance (Author)';

    login(
      {
        id: targetRole === 'admin' ? 'usr-admin-1' : 'usr-author-1',
        name: demoName,
        email: demoEmail,
        role: targetRole,
        isVerified: true,
        avatar: '/logo-icon.png',
        createdAt: new Date().toISOString(),
      },
      'mock-access-token-jwt',
      'mock-refresh-token-jwt'
    );

    toast.success(`Logged in as ${targetRole.toUpperCase()} (${demoEmail})!`);
  };

  if (isAuthorized) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1A2E] via-[#2D2D44] to-[#12121F] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-[#FDFAF6] rounded-3xl shadow-2xl overflow-hidden border border-amber-100"
      >
        {/* Header Banner */}
        <div className="bg-[#8B1A1A] p-8 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Lock className="w-40 h-40" />
          </div>

          <div className="flex justify-center mb-4">
            <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md border border-white/20">
              <Logo size="md" darkBg />
            </div>
          </div>

          <h2 className="text-2xl font-playfair font-bold text-white mt-2">
            {requiredRole} Dashboard Access
          </h2>
          <p className="text-rose-100 text-xs mt-1">
            This dashboard is protected. Log in with your {requiredRole} account.
          </p>
        </div>

        {/* Login Form */}
        <div className="p-8 space-y-6">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-1">
                Account Email
              </label>
              <input
                type="email"
                placeholder={requiredRole === 'Admin' ? 'admin@pagecraft.com' : 'author@pagecraft.com'}
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/20"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/20"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#8B1A1A] hover:bg-[#722F37] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              Log In to {requiredRole} Dashboard
            </button>
          </form>

          {/* Quick Demo Credentials Switcher */}
          <div className="border-t border-gray-200/80 pt-6 space-y-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block text-center">
              Quick 1-Click Login Demo
            </span>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('admin')}
                className="p-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-left transition-all shadow-sm group"
              >
                <div className="flex items-center gap-1.5 font-bold text-[#1A1A2E] text-xs">
                  <Shield className="w-3.5 h-3.5 text-[#8B1A1A]" />
                  Admin Portal
                </div>
                <span className="text-[10px] text-gray-400 block mt-0.5">admin@pagecraft.com</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('author')}
                className="p-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-left transition-all shadow-sm group"
              >
                <div className="flex items-center gap-1.5 font-bold text-[#1A1A2E] text-xs">
                  <UserCheck className="w-3.5 h-3.5 text-[#C5A55A]" />
                  Author Portal
                </div>
                <span className="text-[10px] text-gray-400 block mt-0.5">author@pagecraft.com</span>
              </button>
            </div>
          </div>

          <div className="pt-2 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-[#8B1A1A] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Return to Main Author Website
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
