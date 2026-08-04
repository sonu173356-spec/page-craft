'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function VerifyEmailClient() {
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0 && !canResend) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown, canResend]);

  const handleResend = () => {
    setCanResend(false);
    setCountdown(60);
    toast.success('Verification email sent!');
  };

  // Mock auto verification after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setIsVerified(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-xl border border-gray-100 text-center"
    >
      <div className="flex justify-center mb-6">
        {isVerified ? (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-500">
            <CheckCircle size={40} />
          </motion.div>
        ) : (
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-primary">
            <Mail size={40} />
          </motion.div>
        )}
      </div>

      <h1 className="text-3xl font-playfair font-bold text-primary mb-4">
        {isVerified ? 'Email Verified!' : 'Verify your email'}
      </h1>
      
      <p className="text-muted font-inter mb-8">
        {isVerified 
          ? 'Your email has been successfully verified. You can now access all features.'
          : "We've sent a verification link to your email address. Please click the link to verify your account."}
      </p>

      {!isVerified && (
        <button
          onClick={handleResend}
          disabled={!canResend}
          className="w-full py-2 px-4 bg-gray-100 text-dark rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {canResend ? 'Resend Verification Email' : `Resend in ${countdown}s`}
        </button>
      )}

      {isVerified && (
        <button
          onClick={() => window.location.href = '/login'}
          className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-maroon transition-colors font-medium"
        >
          Continue to Login
        </button>
      )}
    </motion.div>
  );
}
