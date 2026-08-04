import { Metadata } from 'next';
import LoginForm from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Login - Page Craft',
  description: 'Login to your Page Craft account',
};

export default function LoginPage() {
  return <LoginForm />;
}
