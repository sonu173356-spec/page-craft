import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

// ============================================================
// Page Craft — Root Layout
// Premium Book Publishing House
// ============================================================

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'Page Craft — Your Story, Professionally Published',
    template: '%s | Page Craft',
  },
  description:
    'Page Craft is a premium self-publishing platform helping authors publish, distribute, and market their books worldwide. Publish in paperback and eBook, sell globally in 150+ countries.',
  keywords: [
    'self publishing',
    'book publishing',
    'publish my book',
    'book printing',
    'page craft',
    'self publishing india',
    'ebook publishing',
    'book distribution',
    'ISBN',
    'author platform',
  ],
  authors: [{ name: 'Page Craft' }],
  creator: 'Page Craft',
  publisher: 'Page Craft',
  metadataBase: new URL('https://www.thepagecraft.com'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.thepagecraft.com',
    siteName: 'Page Craft',
    title: 'Page Craft — Your Story, Professionally Published',
    description:
      'Premium self-publishing platform. Publish, distribute, and market your book worldwide.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Page Craft — Premium Book Publishing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Page Craft — Your Story, Professionally Published',
    description:
      'Premium self-publishing platform. Publish, distribute, and market your book worldwide.',
    images: ['/images/og-image.jpg'],
    creator: '@thepagecraft',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-text-primary font-[family-name:var(--font-inter)]">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1A1A2E',
              color: '#FDFAF6',
              borderRadius: '12px',
              padding: '14px 20px',
              fontSize: '14px',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              border: '1px solid rgba(197, 165, 90, 0.3)',
            },
            success: {
              iconTheme: {
                primary: '#16A34A',
                secondary: '#FDFAF6',
              },
            },
            error: {
              iconTheme: {
                primary: '#DC2626',
                secondary: '#FDFAF6',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
