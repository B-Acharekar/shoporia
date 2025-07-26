import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from '@/context/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Shoporia – Premium Store',
  description: 'Mock e-commerce app built in Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-white text-black dark:bg-zinc-900 dark:text-white`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
