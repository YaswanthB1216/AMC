import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kaara Compliance',
  description: 'Created by Kaara',
  generator: 'kaara.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
