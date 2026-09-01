'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import Link from 'next/link';
import toast from 'react-hot-toast';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordValues) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to process request.');
      }

      setIsSuccess(true);
      toast.success('Reset instructions dispatched!');
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to send reset instructions');
      toast.error('Failed to send reset link');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl border border-gray-100"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-playfair font-bold text-[#8B1A1A] mb-2">Reset Password</h1>
        <p className="text-gray-500 text-sm font-inter">
          {isSuccess
            ? 'Check your email for reset instructions'
            : 'Enter your email to receive password reset instructions'}
        </p>
      </div>

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
          {errorMessage}
        </div>
      )}

      {!isSuccess ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              {...register('email')}
              type="email"
              autoComplete="email"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#8B1A1A]/20 focus:border-[#8B1A1A] outline-none text-sm"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#8B1A1A] text-white rounded-xl font-bold hover:bg-[#722F37] transition-all disabled:opacity-50 shadow-xs cursor-pointer text-sm"
          >
            {isLoading ? 'Sending Instructions...' : 'Send Reset Instructions'}
          </button>
        </form>
      ) : (
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-center mb-6 space-y-2"
        >
          <p className="text-emerald-800 text-sm font-semibold">
            Password reset instructions dispatched.
          </p>
          <p className="text-emerald-700 text-xs leading-relaxed">
            If an account is associated with this email address, you will receive a secure reset link shortly. Please check your inbox and spam folder.
          </p>
        </motion.div>
      )}

      <div className="mt-8 text-center">
        <Link href="/login" className="text-sm font-semibold text-[#8B1A1A] hover:underline">
          &larr; Back to Login
        </Link>
      </div>
    </motion.div>
  );
}
