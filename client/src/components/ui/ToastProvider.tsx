'use client';

import { Toaster } from 'react-hot-toast';

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: '#ffffff',
          color: '#1A1A2E',
          border: '1px solid rgba(0,0,0,0.05)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          borderRadius: '0.5rem',
          fontFamily: 'var(--font-inter), sans-serif',
        },
        success: {
          iconTheme: {
            primary: '#10B981',
            secondary: '#ffffff',
          },
        },
        error: {
          iconTheme: {
            primary: '#EF4444',
            secondary: '#ffffff',
          },
        },
      }}
    />
  );
}
