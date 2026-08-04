'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store';
import { Shield, ArrowRight, UserCheck, AlertTriangle, ShoppingBag, Sparkles, X } from 'lucide-react';

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
  const [showNoPackagePopup, setShowNoPackagePopup] = useState(false);
  const [unmatchedEmail, setUnmatchedEmail] = useState('');

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
      
      const cleanEmail = data.email.trim().toLowerCase();
      
      // Known accounts in database that have purchased packages
      const validAuthors = ['author@pagecraft.com', 'ananya@pagecraft.com', 'test@pagecraft.com'];
      const validAdmins = ['admin@pagecraft.com'];
      
      // Check if credentials match a database record with a purchased package
      const isAuthorMatch = role === 'author' && validAuthors.includes(cleanEmail) && data.password === 'password123';
      const isAdminMatch = role === 'admin' && validAdmins.includes(cleanEmail) && data.password === 'admin123';

      if (!isAuthorMatch && !isAdminMatch) {
        // No matching record / No package purchased -> Trigger Popup Modal!
        setUnmatchedEmail(data.email);
        setShowNoPackagePopup(true);
        setIsLoading(false);
        return;
      }

      // Valid match in database
      const userPayload = {
        name: role === 'author' ? 'Ananya Roy (Published Author)' : 'Page Craft Administrator',
        email: data.email,
        role: role,
        hasPurchasedPackage: true,
      };

      if (setAuth) {
        setAuth({ user: userPayload, token: `token-${Date.now()}` });
      }

      toast.success(`Welcome back, ${userPayload.name}! Package verified.`);
      router.push(redirectTarget);
    } catch (error) {
      toast.error('Login error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const useDemoPurchasedAccount = () => {
    setShowNoPackagePopup(false);
    setRole('author');
    setValue('email', 'author@pagecraft.com');
    setValue('password', 'password123');
    
    // Automatically submit form with valid purchased author credentials
    onSubmit({
      email: 'author@pagecraft.com',
      password: 'password123',
      rememberMe: true,
    });
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
    <div className="relative">
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

        {/* Role Tabs */}
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
            {isLoading ? 'Verifying Package Record...' : 'Login & Access Dashboard'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Credentials Helper */}
        <div className="mt-6 p-4 bg-[#FDFAF6] border border-rose-100 rounded-2xl text-[11px] text-gray-600 space-y-1">
          <div className="flex items-center gap-1 font-bold text-[#8B1A1A]">
            <UserCheck className="w-4 h-4" /> Registered Author Credentials:
          </div>
          <p>• Email: <strong className="text-gray-900">author@pagecraft.com</strong></p>
          <p>• Password: <strong className="text-gray-900">password123</strong></p>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          Don't have an author account yet?{' '}
          <Link href="/publishing-plans" className="font-bold text-[#8B1A1A] hover:underline">
            Buy Publishing Package
          </Link>
        </p>
      </motion.div>

      {/* 🚨 Popup Modal: No Package Purchased / Credentials Not Found */}
      <AnimatePresence>
        {showNoPackagePopup && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-rose-100 text-center relative space-y-5"
            >
              <button
                onClick={() => setShowNoPackagePopup(false)}
                className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
              >
                <X size={18} />
              </button>

              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <AlertTriangle className="w-8 h-8 animate-pulse" />
              </div>

              <div className="space-y-2">
                <span className="px-3 py-1 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-full uppercase tracking-wider">
                  No Matching Record Found
                </span>
                <h3 className="text-2xl font-bold font-playfair text-[#1A1A2E]">
                  Publishing Package Required
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed px-2">
                  No active publishing package record was found in our database for <strong className="text-gray-900">{unmatchedEmail}</strong>.
                  Before accessing the Author Dashboard, authors must first purchase a publishing or marketing package.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <Link
                  href="/publishing-plans"
                  className="w-full py-3.5 bg-[#8B1A1A] hover:bg-[#722F37] text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Explore & Purchase Publishing Package
                </Link>

                <button
                  onClick={useDemoPurchasedAccount}
                  className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Try Demo Purchased Author Account
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
