'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Lock } from 'lucide-react';

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    phone: z.string().optional(),
    agreeTerms: z.boolean().refine((val) => val === true, 'You must agree to the terms'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      agreeTerms: false,
    },
    mode: 'onTouched',
  });

  const nextStep = async (fieldsToValidate: any[]) => {
    const isValid = await trigger(fieldsToValidate as any);
    if (isValid) setStep((prev) => prev + 1);
  };

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/auth/author-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: data.password,
          confirmPassword: data.confirmPassword,
          agreeTerms: data.agreeTerms,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Registration failed.');
      }

      toast.success('Registration successful! Please sign in.');
      router.push('/login');
    } catch (error: any) {
      setErrorMessage(error.message || 'Registration failed');
      toast.error(error.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl border border-gray-100"
    >
      <div className="text-center mb-6">
        <h1 className="text-3xl font-playfair font-bold text-[#8B1A1A] mb-2">Create Account</h1>
        <p className="text-gray-500 text-sm font-inter">Join Page Craft today</p>
      </div>

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
          <Lock className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-2">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= i ? 'bg-[#8B1A1A] text-white' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {i}
              </div>
              {i < 2 && <div className={`w-8 h-1 ${step > i ? 'bg-[#8B1A1A]' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  {...register('name')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#8B1A1A] outline-none text-sm"
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#8B1A1A] outline-none text-sm"
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  {...register('password')}
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#8B1A1A] outline-none text-sm"
                  placeholder="••••••••"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  {...register('confirmPassword')}
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#8B1A1A] outline-none text-sm"
                  placeholder="••••••••"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              <button
                type="button"
                onClick={() => nextStep(['name', 'email', 'password', 'confirmPassword'])}
                className="w-full py-2.5 bg-[#8B1A1A] text-white font-bold rounded-xl mt-4 hover:bg-[#722F37] transition-all cursor-pointer shadow-xs"
              >
                Next
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
                <input
                  {...register('phone')}
                  type="tel"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#8B1A1A] outline-none text-sm"
                  placeholder="+1 555 0100"
                />
              </div>

              <div className="flex items-start mt-4">
                <input
                  {...register('agreeTerms')}
                  type="checkbox"
                  id="regTerms"
                  className="mt-1 mr-2 text-[#8B1A1A] focus:ring-[#8B1A1A] rounded"
                />
                <label htmlFor="regTerms" className="text-xs text-gray-600 cursor-pointer">
                  I agree to the{' '}
                  <Link href="/terms" className="text-[#8B1A1A] underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy-policy" className="text-[#8B1A1A] underline">
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>
              {errors.agreeTerms && <p className="text-red-500 text-xs">{errors.agreeTerms.message}</p>}

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-2 bg-gray-100 text-gray-700 font-semibold rounded-xl"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-2/3 py-2.5 bg-[#8B1A1A] text-white font-bold rounded-xl hover:bg-[#722F37] transition-all flex justify-center items-center cursor-pointer shadow-xs disabled:opacity-50"
                >
                  {isLoading ? 'Creating...' : 'Create Account'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-[#8B1A1A] hover:underline">
          Sign In
        </Link>
      </p>
    </motion.div>
  );
}
