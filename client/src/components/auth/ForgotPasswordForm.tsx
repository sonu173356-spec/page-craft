'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import Link from 'next/link';
import toast from 'react-hot-toast';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordValues) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSuccess(true);
      toast.success('Reset link sent!');
    } catch (error) {
      toast.error('Failed to send reset link');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl border border-gray-100"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-playfair font-bold text-primary mb-2">Reset Password</h1>
        <p className="text-muted text-sm font-inter">
          {isSuccess ? "Check your email for instructions" : "Enter your email to receive a reset link"}
        </p>
      </div>

      {!isSuccess ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Email Address</label>
            <input
              {...register('email')}
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary outline-none"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-primary text-white rounded-md hover:bg-maroon transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      ) : (
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-green-50 p-4 rounded-md border border-green-200 text-center mb-6">
          <p className="text-green-800 text-sm">
            We've sent a password reset link to your email address. Please check your inbox and spam folder.
          </p>
        </motion.div>
      )}

      <div className="mt-8 text-center">
        <Link href="/login" className="text-sm font-medium text-accent hover:text-primary">
          &larr; Back to Login
        </Link>
      </div>
    </motion.div>
  );
}
