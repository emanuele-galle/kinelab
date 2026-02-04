import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
})

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FAF8F5',
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://kinelab.fodivps2.cloud'),
  title: {
    default: 'KineLab Milano - Studio di Movimento | Pilates, Functional, Personal Training',
    template: '%s | KineLab Milano',
  },
  description: 'Studio di movimento a Milano. Pilates, Functional Training e Personal Training con professionisti qualificati. Prenota la tua lezione in Via Pascoli 15.',
  keywords: [
    'pilates milano',
    'functional training milano',
    'personal trainer milano',
    'studio movimento milano',
    'pilates porta venezia',
    'allenamento personalizzato milano',
  ],
  authors: [{ name: 'KineLab SSD' }],
  creator: 'KineLab',
  publisher: 'KINELAB SSD',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: '/',
    siteName: 'KineLab Milano',
    title: 'KineLab Milano - Studio di Movimento',
    description: 'Pilates, Functional Training e Personal Training a Milano con professionisti qualificati.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'KineLab Milano - Studio di Movimento',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KineLab Milano - Studio di Movimento',
    description: 'Pilates, Functional Training e Personal Training a Milano',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: '/',
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/images/favicon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: '/images/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
