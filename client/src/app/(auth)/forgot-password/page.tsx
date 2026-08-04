import { Metadata } from 'next';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

export const metadata: Metadata = {
  title: 'Forgot Password - Page Craft',
  description: 'Reset your Page Craft account password',
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
