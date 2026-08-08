'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, Shield, UserCheck, AlertCircle, Eye, EyeOff, BookOpen, Key, Copy, Check } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { useAuthStore } from '@/store';
import { toast } from 'react-hot-toast';

export default function AuthorLoginClient() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter your email and password.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/author-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to log in to Author Portal.');
      }

      // Update client session store
      login(
        {
          id: data.user.userId,
          name: data.user.name,
          email: data.user.email,
          role: 'author',
          isVerified: true,
          avatar: '/logo-icon.png',
          createdAt: new Date().toISOString(),
        },
        data.token,
        data.token
      );

      toast.success(`Welcome back, ${data.user.name}!`);
      router.push(data.redirectTo || '/author/dashboard');
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid email or password.');
      toast.error(err.message || 'Login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickFill = (demoEmail: string, demoPass: string, demoName: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrorMsg('');
  };

  const handleCopy = (text: string, label: string) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(text);
      setCopiedKey(label);
      toast.success(`Copied ${label} to clipboard!`);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF8F2] flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-[#171717]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block mb-4">
          <Logo size="lg" />
        </Link>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F1E8] border border-[#E5DED3] text-[#8B1A1A] text-xs font-bold uppercase tracking-widest mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          Author Portal
        </div>
        <h1 className="text-3xl font-playfair font-bold text-[#171717]">
          Welcome back, Author.
        </h1>
        <p className="mt-2 text-sm text-[#666666] max-w-sm mx-auto">
          Enter your credentials to access your published book royalties, analytics, and fulfillment desk.
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#666666] mb-1.5">
                Email Address
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
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#666666]">
                  Password
                </label>
                <Link
                  href="/author/forgot-password"
                  className="text-xs font-semibold text-[#8B1A1A] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#8B1A1A] hover:bg-[#722F37] text-white font-bold text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 active:scale-98"
            >
              {isLoading ? (
                <span>Verifying credentials...</span>
              ) : (
                <>
                  <span>Log In to Author Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Demo Helper Box */}
          <div className="bg-[#F7F1E8] border border-[#E5DED3] p-4 rounded-2xl space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#8B1A1A] flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5" />
                Demo Author Credentials
              </span>
              <span className="text-[10px] bg-white border border-[#E5DED3] text-[#666666] px-2 py-0.5 rounded font-bold">
                Quick Fill
              </span>
            </div>

            <div className="flex items-center justify-between bg-white px-3 py-1.5 rounded-lg border border-[#E5DED3]">
              <span className="text-[#171717]">
                <strong>Author:</strong> author@pagecraft.com / author123
              </span>
              <button
                type="button"
                onClick={() => handleQuickFill('author@pagecraft.com', 'author123', 'Elena Vance')}
                className="text-[#8B1A1A] hover:underline font-bold text-[11px] cursor-pointer"
              >
                Use
              </button>
            </div>
          </div>

          {/* Footer Call to Action */}
          <div className="pt-4 border-t border-[#E5DED3] text-center space-y-2">
            <p className="text-xs text-[#666666]">
              Don&apos;t have an Author account yet?
            </p>
            <Link
              href="/author/signup"
              className="inline-block w-full py-2.5 border border-[#E5DED3] hover:border-[#8B1A1A] hover:bg-[#F7F1E8] text-[#171717] font-semibold text-xs rounded-xl transition-all"
            >
              Create Author Account
            </Link>
          </div>
        </motion.div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs font-semibold text-[#666666] hover:text-[#8B1A1A] transition-colors"
          >
            ← Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
