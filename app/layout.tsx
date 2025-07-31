import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Moderation System',
  description: 'Content Moderation Dashboard with Algorithm Management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
} 