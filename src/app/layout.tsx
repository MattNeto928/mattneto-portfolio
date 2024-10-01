import './globals.css'
import { Baskervville } from 'next/font/google'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const basker = Baskervville({
  subsets: ['latin'],
  weight: ['400', '400'],
  variable: '--font-basker',
})

export const metadata: Metadata = {
  title: 'Matthew J. Neto',
  description: 'A showcase of my work and skills',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={basker.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}