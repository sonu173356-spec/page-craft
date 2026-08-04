import AuthLayout from '@/components/layout/AuthLayout';

export default function AuthSiteLayout({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
