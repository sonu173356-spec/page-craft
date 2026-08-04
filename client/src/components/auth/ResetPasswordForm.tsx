'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const watchPassword = watch("password", "");

  // Simple password strength calculation
  const calculateStrength = (pass: string) => {
    let score = 0;
    if (pass.length > 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const str = calculateStrength(e.target.value);
    setPasswordStrength(str);
  };

  const onSubmit = async (data: ResetPasswordValues) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Password updated successfully!');
      router.push('/login');
    } catch (error) {
      toast.error('Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };

  const strengthColors = ['bg-gray-200', 'bg-red-400', 'bg-yellow-400', 'bg-green-400', 'bg-green-600'];
  const strengthLabels = ['Too Weak', 'Weak', 'Fair', 'Good', 'Strong'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl border border-gray-100"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-playfair font-bold text-primary mb-2">Create New Password</h1>
        <p className="text-muted text-sm font-inter">Please enter your new password below</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-dark mb-1">New Password</label>
          <input
            {...register('password')}
            onChange={(e) => {
              register('password').onChange(e);
              handlePasswordChange(e);
            }}
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary outline-none"
            placeholder="••••••••"
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          
          {watchPassword && (
            <div className="mt-2">
              <div className="flex h-1 gap-1">
                {[1, 2, 3, 4].map((level) => (
                  <div key={level} className={`h-full flex-1 rounded-full ${passwordStrength >= level ? strengthColors[passwordStrength] : 'bg-gray-200'}`}></div>
                ))}
              </div>
              <p className="text-xs text-right mt-1 text-muted">{strengthLabels[passwordStrength]}</p>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-1">Confirm Password</label>
          <input
            {...register('confirmPassword')}
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary outline-none"
            placeholder="••••••••"
          />
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 mt-4 bg-primary text-white rounded-md hover:bg-maroon transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Updating...' : 'Reset Password'}
        </button>
      </form>
    </motion.div>
  );
}
