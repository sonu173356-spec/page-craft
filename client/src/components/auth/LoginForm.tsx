'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store';
import { Button } from '@/components/ui/Button'; // Assuming standard UI components exist or using generic imports
import { Input } from '@/components/ui/Input';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [role, setRole] = useState<'reader' | 'author' | 'admin'>('reader');
  const [isLoading, setIsLoading] = useState(false);
  const setAuth = useAuthStore((state: any) => state.setAuth); // Assuming setAuth exists

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      // Mock login
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (data.email === 'test@pagecraft.com' && data.password === 'password123') {
        if (setAuth) {
            setAuth({ user: { email: data.email, role }, token: 'mock-token' });
        }
        toast.success('Successfully logged in!');
        router.push('/dashboard');
      } else {
        toast.error('Invalid credentials. Try test@pagecraft.com / password123');
      }
    } catch (error) {
      toast.error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl border border-gray-100"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-playfair font-bold text-primary mb-2">Welcome Back</h1>
        <p className="text-muted text-sm font-inter">Sign in to your account to continue</p>
      </div>

      <div className="flex justify-between mb-6 border-b border-gray-200">
        {(['reader', 'author', 'admin'] as const).map((r) => (
          <button
            key={r}
            type="button"
            className={`pb-2 px-4 text-sm font-medium capitalize ${role === r ? 'border-b-2 border-primary text-primary' : 'text-muted hover:text-gray-700'}`}
            onClick={() => setRole(r)}
          >
            {r}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-dark mb-1">Email</label>
          <input
            {...register('email')}
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none"
            placeholder="you@example.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-1">Password</label>
          <input
            {...register('password')}
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none"
            placeholder="••••••••"
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center text-muted">
            <input type="checkbox" {...register('rememberMe')} className="mr-2 text-primary focus:ring-primary border-gray-300 rounded" />
            Remember me
          </label>
          <Link href="/forgot-password" className="text-accent hover:text-primary transition-colors">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-maroon transition-colors disabled:opacity-50 flex items-center justify-center font-medium"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-muted">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button type="button" className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-dark hover:bg-gray-50">
            Google
          </button>
          <button type="button" className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-dark hover:bg-gray-50">
            Facebook
          </button>
        </div>
      </div>

      <p className="mt-8 text-center text-sm text-muted">
        Don't have an account?{' '}
        <Link href="/register" className="font-medium text-accent hover:text-primary">
          Register
        </Link>
      </p>
    </motion.div>
  );
}
