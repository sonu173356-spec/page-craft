'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store';
import { Shield, Sparkles, ArrowRight, UserCheck } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('redirect') || '/author/dashboard';
  
  const [role, setRole] = useState<'reader' | 'author' | 'admin'>('author');
  const [isLoading, setIsLoading] = useState(false);
  const setAuth = useAuthStore((state: any) => state.setAuth);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'author@pagecraft.com',
      password: 'password123',
      rememberMe: true,
    },
  });

  useEffect(() => {
    if (redirectTarget.startsWith('/admin')) {
      setRole('admin');
      setValue('email', 'admin@pagecraft.com');
    } else if (redirectTarget.startsWith('/author')) {
      setRole('author');
      setValue('email', 'author@pagecraft.com');
    }
  }, [redirectTarget, setValue]);

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const userPayload = {
        name: role === 'author' ? 'Ananya Roy (Author)' : role === 'admin' ? 'Page Craft Admin' : 'Reader User',
        email: data.email,
        role: role,
      };

      if (setAuth) {
        setAuth({ user: userPayload, token: `token-${Date.now()}` });
      }

      toast.success(`Welcome back, ${userPayload.name}! Access granted.`);
      router.push(redirectTarget);
    } catch (error) {
      toast.error('Login failed. Please check credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillQuickCredentials = (selectedRole: 'author' | 'admin' | 'reader') => {
    setRole(selectedRole);
    if (selectedRole === 'author') {
      setValue('email', 'author@pagecraft.com');
      setValue('password', 'password123');
    } else if (selectedRole === 'admin') {
      setValue('email', 'admin@pagecraft.com');
      setValue('password', 'admin123');
    } else {
      setValue('email', 'reader@pagecraft.com');
      setValue('password', 'reader123');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto p-8 bg-white rounded-3xl shadow-2xl border border-gray-100 my-12"
    >
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-red-100 text-[#8B1A1A] rounded-full flex items-center justify-center mx-auto mb-3">
          <Shield className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-playfair font-bold text-[#1A1A2E] mb-1">Author Portal Login</h1>
        <p className="text-gray-500 text-xs font-inter">Sign in with your registered account credentials to access your dashboard</p>
      </div>

      {/* Role Selection Tabs */}
      <div className="flex justify-around mb-6 border-b border-gray-100 pb-2 text-xs font-bold">
        {(['author', 'admin', 'reader'] as const).map((r) => (
          <button
            key={r}
            type="button"
            className={`pb-2 px-3 capitalize transition-all ${
              role === r
                ? 'border-b-2 border-[#8B1A1A] text-[#8B1A1A]'
                : 'text-gray-400 hover:text-gray-600'
            }`}
            onClick={() => fillQuickCredentials(r)}
          >
            {r === 'author' ? '✍️ Author' : r === 'admin' ? '🛠️ Admin' : '📖 Reader'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs">
        <div>
          <label className="block font-bold text-gray-700 mb-1">Email Address</label>
          <input
            {...register('email')}
            type="email"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B1A1A]/20 focus:border-[#8B1A1A] outline-none transition-all"
            placeholder="author@pagecraft.com"
          />
          {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block font-bold text-gray-700 mb-1">Password</label>
          <input
            {...register('password')}
            type="password"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B1A1A]/20 focus:border-[#8B1A1A] outline-none transition-all"
            placeholder="••••••••"
          />
          {errors.password && <p className="text-red-500 text-[10px] mt-1">{errors.password.message}</p>}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center text-gray-500 font-medium cursor-pointer">
            <input type="checkbox" {...register('rememberMe')} className="mr-2 text-[#8B1A1A] focus:ring-[#8B1A1A] border-gray-300 rounded" />
            Remember me
          </label>
          <Link href="/forgot-password" className="text-[#C5A55A] hover:text-[#8B1A1A] font-semibold transition-colors">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 bg-[#8B1A1A] hover:bg-[#722F37] text-white rounded-xl font-bold shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer text-sm"
        >
          {isLoading ? 'Authenticating...' : 'Login & Access Dashboard'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Demo Credentials Helper Box */}
      <div className="mt-6 p-4 bg-[#FDFAF6] border border-rose-100 rounded-2xl text-[11px] text-gray-600 space-y-1">
        <div className="flex items-center gap-1 font-bold text-[#8B1A1A]">
          <UserCheck className="w-4 h-4" /> Preset Author Login Credentials:
        </div>
        <p>• Email: <strong className="text-gray-900">author@pagecraft.com</strong></p>
        <p>• Password: <strong className="text-gray-900">password123</strong></p>
      </div>

      <p className="mt-6 text-center text-xs text-gray-500">
        Don't have an author account yet?{' '}
        <Link href="/register" className="font-bold text-[#8B1A1A] hover:underline">
          Register Here
        </Link>
      </p>
    </motion.div>
  );
}
