import React from 'react';
import type { Metadata } from 'next';

import '@/styles/global.css';

export const metadata: Metadata = {
  title: 'CSV Helper',
  description: '✨Собираем CSV для загрузки в CMS✨',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={`h-screen pt-6 pb-6 font-apercu font-light antialiased bg-surface`}>
        {children}
      </body>
    </html>
  )
}
