import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MLOps Studio',
  description: 'Build and visualize your MLOps stack',
  icons: {
    icon: '/logo.svg'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
