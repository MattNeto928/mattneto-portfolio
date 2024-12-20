import './globals.css'
import Layout from '@/components/Layout'
import { Baskervville } from 'next/font/google'

export const metadata = {
  title: 'Matthew J. Neto',
  description: 'Photographer | Videographer | Engineer | Georgia Tech',
}

const basker = Baskervville({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-basker',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={basker.variable}>
      <body >
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}