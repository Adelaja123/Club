import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Oluwagbotemi Adelaja | Full-Stack Developer',
  description: 'Award-winning full-stack developer crafting exceptional digital experiences. Specializing in modern web applications, scalable architectures, and intuitive user interfaces.',
  keywords: ['full-stack developer', 'web developer', 'React', 'Next.js', 'TypeScript', 'software engineer'],
  authors: [{ name: 'Oluwagbotemi Adelaja' }],
  openGraph: {
    title: 'Oluwagbotemi Adelaja | Full-Stack Developer',
    description: 'Award-winning full-stack developer crafting exceptional digital experiences.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
