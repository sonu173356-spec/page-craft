'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, KeyRound, Copy, Check, ExternalLink } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { toast } from 'react-hot-toast';

export default function AuthorForgotPasswordClient() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [resetData, setResetData] = useState<{
    email: string;
    resetUrl: string;
    demoToken: string;
    expiresIn: string;
    deliveryMethod: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Please enter your registered author email address.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to process request.');
      }

      setSubmitted(true);
      setResetData({
        email: data.email || email,
        resetUrl: data.resetUrl || `/author/reset-password?token=${data.demoToken}&email=${encodeURIComponent(email)}`,
        demoToken: data.demoToken,
        expiresIn: data.expiresIn || '60 minutes',
        deliveryMethod: data.deliveryMethod || 'Direct Secure Link',
      });
      toast.success('Password reset email dispatched!');
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred.');
      toast.error('Failed to send reset link.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = () => {
    if (resetData?.resetUrl && typeof window !== 'undefined') {
      navigator.clipboard.writeText(resetData.resetUrl);
      setCopied(true);
      toast.success('Reset link copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF8F2] flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-[#171717]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center px-4">
        <Link href="/" className="inline-block mb-4">
          <Logo size="lg" />
        </Link>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F1E8] border border-[#E5DED3] text-[#8B1A1A] text-xs font-bold uppercase tracking-widest mb-2">
          <KeyRound className="w-3.5 h-3.5" />
          Author Security Desk
        </div>
        <h1 className="text-3xl font-playfair font-bold text-[#171717]">
          Reset Your Password
        </h1>
        <p className="mt-2 text-sm text-[#666666] max-w-sm mx-auto">
          Enter your registered author email address to receive password reset instructions.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg px-4">
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

          {submitted && resetData ? (
            <div className="space-y-5 text-center">
              <div className="w-14 h-14 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto text-green-600">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <h2 className="font-playfair text-2xl font-bold text-[#171717]">
                  Password Reset Dispatched
                </h2>
                <p className="text-xs sm:text-sm text-[#666666] leading-relaxed mt-1">
                  We have prepared the secure password reset instructions for <strong>{resetData.email}</strong>.
                </p>
              </div>

              {/* Interactive Email Notification Box */}
              <div className="bg-[#FBF8F2] border border-[#E5DED3] p-5 rounded-2xl text-left space-y-3">
                <div className="flex items-center justify-between border-b border-[#E5DED3] pb-2 text-xs">
                  <span className="font-bold text-[#8B1A1A] flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    Email Notification Details
                  </span>
                  <span className="text-[10px] bg-green-100 text-green-800 px-2 py-0.5 rounded font-bold">
                    Valid for {resetData.expiresIn}
                  </span>
                </div>

                <div className="text-xs text-[#666666] space-y-1">
                  <p><strong>To:</strong> {resetData.email}</p>
                  <p><strong>Subject:</strong> Reset Your Page Craft Author Portal Password</p>
                  <p><strong>Security:</strong> One-time cryptographic token verification</p>
                </div>

                <div className="pt-2">
                  <Link
                    href={resetData.resetUrl}
                    className="w-full py-3 bg-[#8B1A1A] hover:bg-[#722F37] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
                  >
                    <span>Click Here to Reset Password Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[11px] text-[#888888] truncate max-w-[260px] sm:max-w-[320px]">
                    {resetData.resetUrl}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#8B1A1A] hover:underline cursor-pointer flex-shrink-0"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-600" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E5DED3] flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-[#666666] hover:text-[#171717] font-semibold"
                >
                  ← Try another email
                </button>
                <Link
                  href="/author/login"
                  className="font-bold text-[#8B1A1A] hover:underline flex items-center gap-1"
                >
                  Return to Author Login
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-1.5">
                  Author Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. eleanor@pagecraft.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#FBF8F2] border border-[#E5DED3] rounded-xl text-sm text-[#171717] placeholder:text-[#999999] focus:outline-none focus:ring-2 focus:ring-[#8B1A1A] focus:bg-white transition-all"
                  />
                </div>
                <p className="text-[11px] text-[#888888] mt-1.5">
                  We will send a one-time secure password reset link to this address.
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-[#8B1A1A] hover:bg-[#722F37] text-white font-bold text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 active:scale-98"
              >
                {isLoading ? (
                  <span>Dispatching reset link...</span>
                ) : (
                  <>
                    <span>Send Password Reset Email</span>
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
