import '@/styles/global.css'
import { Roboto } from 'next/font/google'
import Head from 'next/head'

export const metadata = {
  title: 'CSV Editor',
  description: 'дааа, давай наклепаем тысячу строк в этом чудесном интерфейсе, чтобы загрузить их все скорее в АСТРУ',
}

export const roboto = Roboto({ subsets: ['latin'], weight: ['100', '300', '400', '500', '700'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={`${roboto.className} antialiased bg-[#272B37] h-screen pt-6 pb-6`}>
        {children}
      </body>
    </html>
  )
}