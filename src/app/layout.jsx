import '@/src/styles/global.css'
import { Roboto } from 'next/font/google'

export const metadata = {
  title: 'CSV Editor',
  description: 'дааа, давай наклепаем тысячу строк в этом чудесном интерфейсе, чтобы загрузить их все скорее в АСТРУ',
}

export const roboto = Roboto({ subsets: ['latin'], weight: ['100', '300', '400', '500', '700'] });

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={`${roboto.className} antialiased bg-[#272B37] h-screen pt-6 pb-6`}>
        {children}
      </body>
    </html>
  )
}