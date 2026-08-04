import { Metadata } from 'next';
import VerifyEmailClient from '@/components/auth/VerifyEmailClient';

export const metadata: Metadata = {
  title: 'Verify Email - Page Craft',
  description: 'Verify your email address to continue',
};

export default function VerifyEmailPage() {
  return <VerifyEmailClient />;
}
