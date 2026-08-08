'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store';
import { Shield, ArrowRight, UserCheck, Sparkles, Check } from 'lucide-react';

const signupSchema = z
  .object({
    name: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Please enter a valid phone number'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm password required'),
    agreeTerms: z.boolean().refine((val) => val === true, 'You must accept Terms & Conditions'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const packageParam = searchParams.get('package') || 'professional';
  const emailParam = searchParams.get('email') || '';
  const nameParam = searchParams.get('name') || '';
  const purchaseIdParam = searchParams.get('purchaseId') || '';

  const [isLoading, setIsLoading] = useState(false);
  const setAuth = useAuthStore((state: any) => state.setAuth);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: nameParam || '',
      email: emailParam || '',
      phone: '',
      password: '',
      confirmPassword: '',
      agreeTerms: true,
    },
  });

  useEffect(() => {
    if (nameParam) setValue('name', nameParam);
    if (emailParam) setValue('email', emailParam);
  }, [nameParam, emailParam, setValue]);

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const authorUser = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: 'author',
        packageId: packageParam,
        hasPurchasedPackage: true,
      };

      if (setAuth) {
        setAuth({ user: authorUser, token: `auth-token-${Date.now()}` });
      }

      toast.success(`🎉 Welcome to Page Craft, ${data.name}! Redirecting to DIY Book Studio...`);
      
      // Redirect author directly to DIY Book Creation Tool with their selected package!
      router.push(`/author/books/new?package=${encodeURIComponent(packageParam)}`);
    } catch (err: any) {
      toast.error('Signup error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFAF6] py-12 px-4 flex items-center justify-center text-[#1A1A2E]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg p-8 sm:p-10 bg-white rounded-3xl shadow-2xl border border-gray-100 space-y-6"
      >
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-red-100 text-[#8B1A1A] rounded-full flex items-center justify-center mx-auto shadow-xs">
            <Sparkles className="w-7 h-7" />
          </div>
          <span className="px-3 py-1 bg-amber-50 text-[#8B1A1A] text-xs font-bold rounded-full uppercase tracking-wider">
            Author Registration
          </span>
          <h1 className="text-3xl font-playfair font-bold text-[#1A1A2E]">
            Create Your Author Account
          </h1>
          <p className="text-gray-500 text-xs font-inter max-w-sm mx-auto">
            Get instant access to the DIY Book Creation Tool & publish with 100% royalty.
          </p>
        </div>

        {/* Selected Package Banner */}
        <div className="p-4 bg-[#FDFAF6] border border-amber-200 rounded-2xl flex items-center justify-between text-xs">
          <div>
            <span className="text-[10px] font-bold uppercase text-[#8B1A1A] block">Selected Tier</span>
            <strong className="text-sm text-[#1A1A2E] capitalize font-playfair">{packageParam} Publishing Plan</strong>
          </div>
          <span className="px-2.5 py-1 bg-green-100 text-green-800 rounded-full font-bold text-[11px]">
            100% Royalty
          </span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Full Name *</label>
            <input
              {...register('name')}
              type="text"
              placeholder="e.g. Eleanor Vance"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B1A1A]/20 focus:border-[#8B1A1A] outline-none text-sm"
            />
            {errors.name && <p className="text-red-500 text-[10px] mt-1">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Email Address *</label>
              <input
                {...register('email')}
                type="email"
                placeholder="author@example.com"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B1A1A]/20 focus:border-[#8B1A1A] outline-none text-sm"
              />
              {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Phone Number *</label>
              <input
                {...register('phone')}
                type="tel"
                placeholder="+91 98765 43210"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B1A1A]/20 focus:border-[#8B1A1A] outline-none text-sm"
              />
              {errors.phone && <p className="text-red-500 text-[10px] mt-1">{errors.phone.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Password *</label>
              <input
                {...register('password')}
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B1A1A]/20 focus:border-[#8B1A1A] outline-none text-sm"
              />
              {errors.password && <p className="text-red-500 text-[10px] mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Confirm Password *</label>
              <input
                {...register('confirmPassword')}
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B1A1A]/20 focus:border-[#8B1A1A] outline-none text-sm"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-[10px] mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-2 pt-1">
            <input
              {...register('agreeTerms')}
              type="checkbox"
              id="agreeTerms"
              className="mt-1 text-[#8B1A1A] focus:ring-[#8B1A1A] rounded border-gray-300 cursor-pointer"
            />
            <label htmlFor="agreeTerms" className="text-[11px] text-gray-600 cursor-pointer leading-tight">
              I agree to the{' '}
              <Link href="/terms" className="text-[#8B1A1A] underline font-semibold" target="_blank">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy-policy" className="text-[#8B1A1A] underline font-semibold" target="_blank">
                Privacy Policy
              </Link>
              .
            </label>
          </div>
          {errors.agreeTerms && <p className="text-red-500 text-[10px]">{errors.agreeTerms.message}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-[#8B1A1A] hover:bg-[#722F37] text-white rounded-xl font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-sm disabled:opacity-50 active:scale-98"
          >
            {isLoading ? 'Creating Author Account...' : 'Create Account & Open DIY Studio'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-gray-500">
          Already have an account?{' '}
          <Link
            href={`/login?redirect=/author/books/new?package=${encodeURIComponent(packageParam)}`}
            className="font-bold text-[#8B1A1A] hover:underline"
          >
            Login to Author Portal
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
