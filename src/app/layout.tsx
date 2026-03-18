import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ThemeScript } from '@/components/layout/ThemeScript';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'InsurTech Intelligence | Symfa',
  description:
    'Explore AI-powered insurance solutions: claim processing, fraud detection, predictive pricing, and forecasting. Built by Symfa.',
  openGraph: {
    title: 'InsurTech Intelligence | Symfa',
    description:
      'AI-powered insurance solutions — claim processing, fraud detection, predictive pricing, and forecasting.',
    type: 'website',
    images: [
      {
        url: '/images/logo/symfa.webp',
        width: 1200,
        height: 630,
        alt: 'InsurTech Intelligence - AI-Powered Insurance Solutions by Symfa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InsurTech Intelligence | Symfa',
    description:
      'AI-powered insurance solutions — claim processing, fraud detection, predictive pricing, and forecasting.',
    images: ['/images/logo/symfa.webp'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
