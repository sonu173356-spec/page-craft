import { Metadata } from 'next';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

export const metadata: Metadata = {
  title: 'Set New Password - Page Craft',
  description: 'Set a new password for your account',
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
