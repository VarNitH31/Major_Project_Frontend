import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'VisionFuse AI',
  description: 'Smart product recommendations',
icons: { icon: "/favicon.ico" }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-blue-50 text-gray-900 min-h-screen">
        {children}
      </body>
    </html>
  )
}
