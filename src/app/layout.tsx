import React from 'react';
import localFont from 'next/font/local';
import type { Metadata } from 'next';
import '@/src/styles/global.css';

export const metadata: Metadata = {
  title: 'CSV Editor',
  description: '✨Собираем CSV для загрузки в CMS✨',
}

const apercuPro = localFont({ src: '../styles/ApercuPro-Medium.woff2' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={`${apercuPro.className} antialiased bg-[#272B37] h-screen pt-6 pb-6`}>
        {children}
      </body>
    </html>
  )
}
