import MainLayout from '@/components/layout/MainLayout';

export default function MainSiteLayout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
