'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store';
import { Logo } from '@/components/ui/Logo';
import { Shield, Lock, UserCheck, AlertCircle, ArrowLeft, Key, Copy, Check } from 'lucide-react';
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
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

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
      setErrorMsg('Please fill in both Email/ID and Password.');
      return;
    }

    const role: 'admin' | 'author' = email.includes('admin') || reqRole === 'admin' ? 'admin' : 'author';
    const name = role === 'admin' ? 'Page Craft Admin' : 'Elena Vance (Author)';

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

    toast.success(`Authenticated! Welcome to ${requiredRole} Dashboard.`);
    setErrorMsg('');
  };

  const handleQuickDemoLogin = (targetRole: 'admin' | 'author') => {
    const demoEmail = targetRole === 'admin' ? 'admin@pagecraft.com' : 'author@pagecraft.com';
    const demoName = targetRole === 'admin' ? 'Page Craft Admin' : 'Elena Vance (Author)';

    setEmail(demoEmail);
    setPassword(targetRole === 'admin' ? 'admin123' : 'author123');

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

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    toast.success(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  if (isAuthorized) {
    return <>{children}</>;
  }

  // If unauthorized on an author route, provide clean redirect link to /author/login
  if (reqRole === 'author') {
    return (
      <div className="min-h-screen bg-[#FBF8F2] flex items-center justify-center p-4 text-[#171717]">
        <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-[#E5DED3] text-center shadow-2xs space-y-5">
          <div className="w-14 h-14 rounded-full bg-[#F7F1E8] border border-[#E5DED3] flex items-center justify-center mx-auto text-[#8B1A1A]">
            <Lock className="w-6 h-6" />
          </div>

          <h2 className="font-playfair text-2xl font-bold text-[#171717]">
            Protected Author Dashboard
          </h2>

          <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
            Please log in to your verified Author Portal account to access your published book royalties, orders, and sales reports.
          </p>

          <div className="pt-2 space-y-2.5">
            <Link
              href="/author/login"
              className="w-full py-3 bg-[#8B1A1A] hover:bg-[#722F37] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <span>Go to Author Login</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>

            <Link
              href="/author/signup"
              className="w-full py-2.5 bg-[#F7F1E8] border border-[#E5DED3] text-[#171717] font-semibold text-xs rounded-xl hover:bg-white transition-all flex items-center justify-center"
            >
              Create Author Account
            </Link>
          </div>
        </div>
      </div>
    );
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

          <h2 className="text-xl font-bold text-white mt-1">
            Internal {requiredRole} Dashboard Login
          </h2>
          <p className="text-rose-100 text-xs mt-1">
            Enter your official ID & Password to access the protected control panel.
          </p>
        </div>

        <div className="p-7 space-y-5 text-sm">
          {/* Display Official Credentials Box */}
          <div className="bg-amber-500/10 border border-amber-500/20 p-3.5 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-[#8B1A1A]" />
                Official {requiredRole} ID & Password
              </span>
              <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded font-bold">
                Default Credentials
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-gray-700">
              <div className="flex items-center justify-between bg-white px-3 py-1.5 rounded-lg border border-amber-200/60">
                <span>
                  <strong className="text-[#8B1A1A]">ID / Email:</strong>{' '}
                  {requiredRole === 'Admin' ? 'admin@pagecraft.com' : 'author@pagecraft.com'}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(requiredRole === 'Admin' ? 'admin@pagecraft.com' : 'author@pagecraft.com', 'ID')}
                  className="text-gray-400 hover:text-[#8B1A1A]"
                >
                  {copiedKey === 'ID' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="flex items-center justify-between bg-white px-3 py-1.5 rounded-lg border border-amber-200/60">
                <span>
                  <strong className="text-[#8B1A1A]">Password:</strong>{' '}
                  {requiredRole === 'Admin' ? 'admin123' : 'author123'}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(requiredRole === 'Admin' ? 'admin123' : 'author123', 'Password')}
                  className="text-gray-400 hover:text-[#8B1A1A]"
                >
                  {copiedKey === 'Password' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-3.5">
            <div>
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-1">
                Admin / Author ID or Email
              </label>
              <input
                type="text"
                placeholder={requiredRole === 'Admin' ? 'admin@pagecraft.com' : 'author@pagecraft.com'}
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/20"
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
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/20"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#8B1A1A] hover:bg-[#722F37] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Lock className="w-4 h-4" />
              Log In to {requiredRole} Dashboard
            </button>
          </form>

          {/* Quick 1-Click Fill Buttons */}
          <div className="border-t border-gray-200/80 pt-4 space-y-2">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block text-center">
              Or Click Below to Auto-Login
            </span>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('admin')}
                className="p-2.5 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-left transition-all shadow-sm group"
              >
                <div className="flex items-center gap-1.5 font-bold text-[#1A1A2E] text-xs">
                  <Shield className="w-3.5 h-3.5 text-[#8B1A1A]" />
                  Admin Portal
                </div>
                <span className="text-[10px] text-gray-400 block">admin@pagecraft.com</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('author')}
                className="p-2.5 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-left transition-all shadow-sm group"
              >
                <div className="flex items-center gap-1.5 font-bold text-[#1A1A2E] text-xs">
                  <UserCheck className="w-3.5 h-3.5 text-[#C5A55A]" />
                  Author Portal
                </div>
                <span className="text-[10px] text-gray-400 block">author@pagecraft.com</span>
              </button>
            </div>
          </div>

          <div className="pt-1 text-center">
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
