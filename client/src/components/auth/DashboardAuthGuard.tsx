'use client';

import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/store';
import { Lock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface DashboardAuthGuardProps {
  children: React.ReactNode;
  requiredRole: 'Author' | 'Admin';
}

export default function DashboardAuthGuard({ children, requiredRole }: DashboardAuthGuardProps) {
  const { user, isAuthenticated } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const userRole = user?.role?.toLowerCase();
  const reqRole = requiredRole.toLowerCase();

  const isAuthorized =
    isAuthenticated &&
    user &&
    (reqRole === 'author'
      ? userRole === 'author' || userRole === 'admin' || userRole === 'super_admin'
      : userRole === 'admin' || userRole === 'super_admin');

  if (isAuthorized) {
    return <>{children}</>;
  }

  // Safe fallback if client state has not hydrated yet or user is unauthorized
  return (
    <div className="min-h-screen bg-[#FBF8F2] flex items-center justify-center p-4 text-[#171717]">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-[#E5DED3] text-center shadow-xs space-y-5">
        <div className="w-14 h-14 rounded-full bg-[#F7F1E8] border border-[#E5DED3] flex items-center justify-center mx-auto text-[#8B1A1A]">
          <Lock className="w-6 h-6" />
        </div>

        <h2 className="font-playfair text-2xl font-bold text-[#171717]">
          {requiredRole} Authentication Required
        </h2>

        <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
          Please sign in with your verified {requiredRole} account credentials to access this protected dashboard.
        </p>

        <div className="pt-2 space-y-2.5">
          <Link
            href={reqRole === 'author' ? '/author/login' : '/login'}
            className="w-full py-3 bg-[#8B1A1A] hover:bg-[#722F37] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
          >
            <span>Sign In to {requiredRole} Portal</span>
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>

          <Link
            href="/"
            className="w-full py-2.5 bg-[#F7F1E8] border border-[#E5DED3] text-[#171717] font-semibold text-xs rounded-xl hover:bg-white transition-all flex items-center justify-center"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
