import { Metadata } from 'next';
import RegisterForm from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Register - Page Craft',
  description: 'Create a new Page Craft account',
};

export default function RegisterPage() {
  return <RegisterForm />;
}
