import "@/src/styles/global.css"
import type { Metadata } from 'next'
import { Roboto } from "next/font/google"
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'CSV Editor',
  description: '✨Собираем CSV для загрузки в CMS✨',
}

const roboto = Roboto({
  weight: ['100', '300', '400', '500'],
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='ru'>
      <body className={`${roboto.className} antialiased bg-[#272B37] h-screen pt-6 pb-6`}>
        {children}
      </body>
    </html>
  )
}
