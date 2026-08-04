'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function VerifyOTPForm() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    if (/[^0-9]/.test(val)) return;

    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    if (val && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').slice(0, 6).replace(/[^0-9]/g, '');
    const newOtp = [...otp];
    for (let i = 0; i < pasted.length; i++) {
      newOtp[i] = pasted[i];
    }
    setOtp(newOtp);
    if (pasted.length > 0) {
      inputs.current[Math.min(pasted.length, 5)]?.focus();
    }
  };

  const onSubmit = async () => {
    const code = otp.join('');
    if (code.length < 6) {
      toast.error('Please enter the full 6-digit code');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (code === '123456') {
        toast.success('Verification successful!');
        router.push('/dashboard');
      } else {
        toast.error('Invalid OTP. Use 123456 for testing.');
      }
    } catch (error) {
      toast.error('Verification failed');
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
        <h1 className="text-3xl font-playfair font-bold text-primary mb-2">Two-Factor Authentication</h1>
        <p className="text-muted text-sm font-inter">Enter the 6-digit code sent to your device</p>
      </div>

      <div className="flex justify-between mb-8 gap-2" onPaste={handlePaste}>
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => { inputs.current[index] = el; }}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-0 outline-none transition-colors"
          />
        ))}
      </div>

      <button
        onClick={onSubmit}
        disabled={isLoading}
        className="w-full py-3 bg-primary text-white rounded-md hover:bg-maroon transition-colors font-medium disabled:opacity-50"
      >
        {isLoading ? 'Verifying...' : 'Verify Code'}
      </button>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted">
          Didn't receive the code?{' '}
          {countdown > 0 ? (
            <span className="text-gray-500">Resend in {countdown}s</span>
          ) : (
            <button onClick={() => setCountdown(30)} className="text-accent font-medium hover:text-primary transition-colors">
              Resend Code
            </button>
          )}
        </p>
      </div>
    </motion.div>
  );
}
