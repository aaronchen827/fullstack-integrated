import type { Metadata } from 'next'
import './globals.css'
import AppProvider from '@/app/AppProvider'

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'A modern admin dashboard built with Next.js and Material-UI',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh">
      <body className="flex h-screen">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
