import { Metadata } from 'next';
import AuthorForgotPasswordClient from './AuthorForgotPasswordClient';

export const metadata: Metadata = {
  title: 'Forgot Password | Page Craft Author Portal',
  description: 'Request a password reset link for your Page Craft Author Portal account.',
};

export default function AuthorForgotPasswordPage() {
  return <AuthorForgotPasswordClient />;
}
