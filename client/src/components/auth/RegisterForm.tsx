'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  role: z.enum(['reader', 'author']),
  phone: z.string().optional(),
  agreeTerms: z.boolean().refine(val => val === true, 'You must agree to the terms'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, trigger, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'reader',
      phone: '',
      agreeTerms: false,
    },
    mode: 'onTouched'
  });

  const nextStep = async (fieldsToValidate: any[]) => {
    const isValid = await trigger(fieldsToValidate as any);
    if (isValid) setStep(prev => prev + 1);
  };

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Registration successful! Please verify your email.');
      router.push('/verify-email');
    } catch (error) {
      toast.error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl border border-gray-100"
    >
      <div className="text-center mb-6">
        <h1 className="text-3xl font-playfair font-bold text-primary mb-2">Create Account</h1>
        <p className="text-muted text-sm font-inter">Join Page Craft today</p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= i ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                {i}
              </div>
              {i < 3 && <div className={`w-8 h-1 ${step > i ? 'bg-primary' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-1">Full Name</label>
                <input {...register('name')} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary outline-none" placeholder="John Doe" />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1">Email</label>
                <input {...register('email')} type="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary outline-none" placeholder="you@example.com" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1">Password</label>
                <input {...register('password')} type="password" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary outline-none" placeholder="••••••••" />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1">Confirm Password</label>
                <input {...register('confirmPassword')} type="password" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary outline-none" placeholder="••••••••" />
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
              </div>
              <button type="button" onClick={() => nextStep(['name', 'email', 'password', 'confirmPassword'])} className="w-full py-2 bg-primary text-white rounded-md mt-4">Next</button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-dark mb-2">Select your role</label>
                <label className="flex p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <input {...register('role')} type="radio" value="reader" className="mt-1 text-primary" />
                  <div className="ml-3">
                    <span className="block font-medium text-dark">Reader</span>
                    <span className="block text-sm text-muted">Discover and read amazing books.</span>
                  </div>
                </label>
                <label className="flex p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <input {...register('role')} type="radio" value="author" className="mt-1 text-primary" />
                  <div className="ml-3">
                    <span className="block font-medium text-dark">Author</span>
                    <span className="block text-sm text-muted">Publish your work and reach readers.</span>
                  </div>
                </label>
                {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setStep(1)} className="w-1/3 py-2 bg-gray-100 text-dark rounded-md">Back</button>
                <button type="button" onClick={() => nextStep(['role'])} className="w-2/3 py-2 bg-primary text-white rounded-md">Next</button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-1">Phone Number (Optional)</label>
                <input {...register('phone')} type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary outline-none" placeholder="+1 234 567 890" />
              </div>
              <div className="flex items-start mt-4">
                <input {...register('agreeTerms')} type="checkbox" className="mt-1 mr-2 text-primary focus:ring-primary" />
                <label className="text-sm text-muted">
                  I agree to the <Link href="/terms" className="text-accent underline">Terms of Service</Link> and <Link href="/privacy" className="text-accent underline">Privacy Policy</Link>.
                </label>
              </div>
              {errors.agreeTerms && <p className="text-red-500 text-xs">{errors.agreeTerms.message}</p>}
              
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setStep(2)} className="w-1/3 py-2 bg-gray-100 text-dark rounded-md">Back</button>
                <button type="submit" disabled={isLoading} className="w-2/3 py-2 bg-primary text-white rounded-md flex justify-center items-center">
                  {isLoading ? 'Creating...' : 'Create Account'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Already have an account? <Link href="/login" className="font-medium text-accent hover:text-primary">Login</Link>
      </p>
    </motion.div>
  );
}
