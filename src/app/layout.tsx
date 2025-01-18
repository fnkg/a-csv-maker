import "@/src/styles/global.css"
import { Roboto } from "next/font/google"
import { ReactNode } from "react";

export const metadata = {
  title: 'CSV Editor',
  description: '✨Собираем CSV для загрузки в CMS✨',
}

export const roboto = Roboto({ subsets: ['latin'], weight: ['100', '300', '400', '500'] });

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang='ru'>
      <body className={`${roboto.className} antialiased bg-[#272B37] h-screen pt-6 pb-6`}>
        {children}
      </body>
    </html>
  )
}