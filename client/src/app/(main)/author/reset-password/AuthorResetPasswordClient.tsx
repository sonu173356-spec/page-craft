'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { toast } from 'react-hot-toast';

export default function AuthorResetPasswordClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const emailParam = searchParams.get('email') || '';

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setErrorMsg('Please fill in both password fields.');
      return;
    }

    if (newPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          email: emailParam,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update password.');
      }

      setSuccess(true);
      toast.success('Your password has been successfully reset.');
      setTimeout(() => {
        router.push('/author/login');
      }, 2000);
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred while resetting your password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF8F2] flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-[#171717]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block mb-4">
          <Logo size="lg" />
        </Link>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F1E8] border border-[#E5DED3] text-[#8B1A1A] text-xs font-bold uppercase tracking-widest mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          Secure Password Update
        </div>
        <h1 className="text-3xl font-playfair font-bold text-[#171717]">
          Set New Password
        </h1>
        <p className="mt-2 text-sm text-[#666666] max-w-sm mx-auto">
          Choose a strong, unique password for your Author Portal account.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-[#E5DED3] shadow-2xs space-y-6"
        >
          {errorMsg && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {success ? (
            <div className="space-y-4 text-center">
              <div className="w-14 h-14 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto text-green-600">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h2 className="font-playfair text-xl font-bold text-[#171717]">
                Password Updated!
              </h2>
              <p className="text-xs sm:text-sm text-[#666666]">
                Your password has been changed successfully. Redirecting you to the Author Portal login...
              </p>
              <div className="pt-4 border-t border-[#E5DED3]">
                <Link
                  href="/author/login"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#8B1A1A] text-white text-xs font-bold rounded-xl hover:bg-[#722F37] transition-colors"
                >
                  Log In Now
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="At least 6 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-[#FBF8F2] border border-[#E5DED3] rounded-xl text-sm text-[#171717] placeholder:text-[#999999] focus:outline-none focus:ring-2 focus:ring-[#8B1A1A] focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#171717] p-1"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Re-enter new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#FBF8F2] border border-[#E5DED3] rounded-xl text-sm text-[#171717] placeholder:text-[#999999] focus:outline-none focus:ring-2 focus:ring-[#8B1A1A] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-[#8B1A1A] hover:bg-[#722F37] text-white font-bold text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 active:scale-98"
              >
                {isLoading ? (
                  <span>Updating password...</span>
                ) : (
                  <>
                    <span>Set New Password</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-4 border-t border-[#E5DED3] text-center">
                <Link
                  href="/author/login"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#666666] hover:text-[#8B1A1A] transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to Author Login
                </Link>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
