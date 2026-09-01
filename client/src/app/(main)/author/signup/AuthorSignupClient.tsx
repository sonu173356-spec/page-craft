'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  Lock,
  Phone,
  Feather,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Headphones,
  ArrowLeft,
  X,
  BookOpen,
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { useAuthStore } from '@/store';
import { toast } from 'react-hot-toast';

export default function AuthorSignupClient() {
  const router = useRouter();
  const { login } = useAuthStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    penName: '',
    agreeTerms: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showIneligibleModal, setShowIneligibleModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!formData.name || !formData.email || !formData.password) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    if (formData.password.length < 6) {
      setErrorMsg('Password must meet the minimum security requirements (at least 6 characters).');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    if (!formData.agreeTerms) {
      setErrorMsg('You must agree to the Terms & Conditions and Privacy Policy.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/author-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        // If server returns author not eligible (403):
        if (res.status === 403 || data.code === 'AUTHOR_NOT_ELIGIBLE') {
          setShowIneligibleModal(true);
          return;
        }
        throw new Error(data.error || 'Failed to create Author account.');
      }

      setSuccessMsg('Your Author Portal account has been created successfully.');
      toast.success('Your Author Portal account has been created successfully!');

      if (data.user) {
        login({
          id: data.user.userId,
          name: data.user.name,
          email: data.user.email,
          role: 'author',
          isVerified: true,
          avatar: '/logo-icon.png',
          createdAt: new Date().toISOString(),
        });
      }

      setTimeout(() => {
        router.push('/author/dashboard');
      }, 1500);
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred.');
      toast.error(err.message || 'Signup failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF8F2] flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-[#171717]">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl text-center px-4">
        <Link href="/" className="inline-block mb-3">
          <Logo size="lg" />
        </Link>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F1E8] border border-[#E5DED3] text-[#8B1A1A] text-xs font-bold uppercase tracking-widest mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          Author Registration
        </div>
        <h1 className="text-3xl sm:text-4xl font-playfair font-bold text-[#171717]">
          Create Author Account
        </h1>
        <p className="mt-2 text-sm text-[#666666] max-w-md mx-auto">
          Activate your verified publishing desk to manage book interior production, distribution, and royalty earnings.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl px-4">
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

          {successMsg && (
            <div className="p-3.5 bg-green-50 border border-green-200 text-green-800 text-xs rounded-xl flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-600" />
              <span>{successMsg} Redirecting to Author Dashboard...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-1.5">
                Full Legal Name <span className="text-[#8B1A1A]">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Eleanor Vance"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-[#FBF8F2] border border-[#E5DED3] rounded-xl text-sm text-[#171717] placeholder:text-[#999999] focus:outline-none focus:ring-2 focus:ring-[#8B1A1A] focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-1.5">
                Email Address (Used in Publishing Order) <span className="text-[#8B1A1A]">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="e.g. eleanor@pagecraft.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-[#FBF8F2] border border-[#E5DED3] rounded-xl text-sm text-[#171717] placeholder:text-[#999999] focus:outline-none focus:ring-2 focus:ring-[#8B1A1A] focus:bg-white transition-all"
                />
              </div>
              <p className="text-[11px] text-[#888888] mt-1">
                Must match the email used when purchasing your publishing package.
              </p>
            </div>

            {/* Passwords in 2 Column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-1.5">
                  Password <span className="text-[#8B1A1A]">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-[#FBF8F2] border border-[#E5DED3] rounded-xl text-sm text-[#171717] placeholder:text-[#999999] focus:outline-none focus:ring-2 focus:ring-[#8B1A1A] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-1.5">
                  Confirm Password <span className="text-[#8B1A1A]">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-[#FBF8F2] border border-[#E5DED3] rounded-xl text-sm text-[#171717] placeholder:text-[#999999] focus:outline-none focus:ring-2 focus:ring-[#8B1A1A] focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Optional Fields: Phone Number + Pen Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-1.5">
                  Phone Number <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-[#FBF8F2] border border-[#E5DED3] rounded-xl text-sm text-[#171717] placeholder:text-[#999999] focus:outline-none focus:ring-2 focus:ring-[#8B1A1A] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-1.5">
                  Author Pen Name <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <Feather className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="penName"
                    placeholder="e.g. E. V. Vance"
                    value={formData.penName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-[#FBF8F2] border border-[#E5DED3] rounded-xl text-sm text-[#171717] placeholder:text-[#999999] focus:outline-none focus:ring-2 focus:ring-[#8B1A1A] focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Checkbox: Terms Agreement */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#666666]">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-0.5 rounded border-[#E5DED3] text-[#8B1A1A] focus:ring-[#8B1A1A] w-4 h-4 cursor-pointer"
                />
                <span>
                  I agree to the{' '}
                  <Link href="/terms" target="_blank" className="text-[#8B1A1A] underline font-semibold">
                    Terms & Conditions
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy-policy" target="_blank" className="text-[#8B1A1A] underline font-semibold">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#8B1A1A] hover:bg-[#722F37] text-white font-bold text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 active:scale-98"
            >
              {isLoading ? (
                <span>Verifying author eligibility...</span>
              ) : (
                <>
                  <span>Create Author Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Already have an account footer */}
          <div className="pt-4 border-t border-[#E5DED3] text-center">
            <p className="text-xs text-[#666666]">
              Already have an account?{' '}
              <Link href="/author/login" className="text-[#8B1A1A] font-bold hover:underline">
                Log in here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* 23. INELIGIBLE AUTHOR MODAL (Professional Server-Side Rejection) */}
      <AnimatePresence>
        {showIneligibleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-[#E5DED3] p-6 sm:p-8 text-center text-[#171717]"
            >
              <div className="w-14 h-14 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-4 text-[#8B1A1A]">
                <ShieldCheck className="w-7 h-7" />
              </div>

              <h3 className="font-playfair text-2xl font-bold text-[#171717] mb-2">
                Author account unavailable
              </h3>

              <p className="text-xs sm:text-sm text-[#666666] leading-relaxed mb-6">
                Your details could not be verified. Please make sure you have purchased an eligible publishing package or contact our support team to activate your account.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  href="/contact"
                  className="w-full py-2.5 bg-[#8B1A1A] text-white text-xs font-bold rounded-xl hover:bg-[#722F37] transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <Headphones className="w-3.5 h-3.5" />
                  Contact Support
                </Link>

                <Link
                  href="/author/login"
                  onClick={() => setShowIneligibleModal(false)}
                  className="w-full py-2.5 bg-[#F7F1E8] border border-[#E5DED3] text-[#171717] text-xs font-bold rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to Login
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
