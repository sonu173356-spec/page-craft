'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store';
import { Shield, ArrowRight, Lock } from 'lucide-react';
import { validateRedirectUrl } from '@/lib/redirect';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawRedirect = searchParams.get('redirect') || '/';
  const redirectTarget = validateRedirectUrl(rawRedirect, '/');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Invalid email or password.');
      }

      login({
        id: result.user.userId,
        name: result.user.name,
        email: result.user.email,
        role: result.user.role.toLowerCase(),
        isVerified: true,
        avatar: '/logo-icon.png',
        createdAt: new Date().toISOString(),
      });

      toast.success(`Welcome back, ${result.user.name}!`);

      // Determine appropriate destination based on verified role if redirectTarget is generic root
      let target = redirectTarget;
      if (target === '/') {
        const userRole = (result.user.role || '').toUpperCase();
        if (['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'EDITOR', 'FINANCE', 'SUPPORT'].includes(userRole)) {
          target = '/admin/dashboard';
        } else if (userRole === 'AUTHOR') {
          target = '/author/dashboard';
        } else {
          target = '/bookstore';
        }
      }

      router.push(target);
      router.refresh();
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication failed. Please try again.');
      toast.error(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md mx-auto p-8 sm:p-10 bg-white rounded-3xl shadow-2xl border border-gray-100 space-y-6"
      >
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-red-100 text-[#8B1A1A] rounded-full flex items-center justify-center mx-auto shadow-xs">
            <Shield className="w-7 h-7" />
          </div>
          <span className="px-3 py-1 bg-amber-50 text-[#8B1A1A] text-xs font-bold rounded-full uppercase tracking-wider">
            Secure Account Sign In
          </span>
          <h1 className="text-3xl font-playfair font-bold text-[#1A1A2E]">Sign In</h1>
          <p className="text-gray-500 text-xs font-inter">
            Enter your credentials to access your Page Craft account
          </p>
        </div>

        {errorMessage && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
            <Lock className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Email Address</label>
            <input
              {...register('email')}
              type="email"
              autoComplete="email"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B1A1A]/20 focus:border-[#8B1A1A] outline-none text-sm transition-all"
              placeholder="name@example.com"
            />
            {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Password</label>
            <input
              {...register('password')}
              type="password"
              autoComplete="current-password"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B1A1A]/20 focus:border-[#8B1A1A] outline-none text-sm transition-all"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-[10px] mt-1">{errors.password.message}</p>}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-gray-500 font-medium cursor-pointer">
              <input
                type="checkbox"
                {...register('rememberMe')}
                className="mr-2 text-[#8B1A1A] focus:ring-[#8B1A1A] border-gray-300 rounded"
              />
              Remember me
            </label>
            <Link
              href="/forgot-password"
              className="text-[#C5A55A] hover:text-[#8B1A1A] font-semibold transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-[#8B1A1A] hover:bg-[#722F37] text-white rounded-xl font-bold shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer text-sm active:scale-98"
          >
            {isLoading ? 'Verifying Credentials...' : 'Sign In'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center space-y-2 border-t border-gray-100 text-xs">
          <p className="text-gray-500">
            Don&apos;t have an account yet?{' '}
            <Link href="/register" className="font-bold text-[#8B1A1A] hover:underline">
              Create an Account
            </Link>
          </p>
          <p className="text-gray-400 text-[11px]">
            Are you an Author?{' '}
            <Link href="/author/login" className="text-gray-600 hover:text-[#8B1A1A] underline">
              Author Portal Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
