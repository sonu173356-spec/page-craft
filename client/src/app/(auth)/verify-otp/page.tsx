import { Metadata } from 'next';
import VerifyOTPForm from '@/components/auth/VerifyOTPForm';

export const metadata: Metadata = {
  title: 'Verify OTP - Page Craft',
  description: 'Enter your OTP to verify your identity',
};

export default function VerifyOTPPage() {
  return <VerifyOTPForm />;
}
