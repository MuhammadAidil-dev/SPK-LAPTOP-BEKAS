import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

const BASE_URL = 'https://laptopstore-inhil.my.id';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'SPK Laptop Bekas Indragiri Hilir',
    template: '%s | SPK Laptop Bekas',
  },
  description:
    'Sistem Pendukung Keputusan pemilihan laptop bekas terbaik menggunakan metode SMART. Temukan laptop bekas berkualitas di Indragiri Hilir.',
  keywords: [
    'laptop bekas',
    'laptop bekas inhil',
    'laptop bekas indragiri hilir',
    'rekomendasi laptop bekas',
    'SPK laptop',
    'beli laptop bekas',
    'laptop murah',
  ],
  authors: [{ name: 'SPK Laptop Bekas Inhil' }],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: BASE_URL,
    siteName: 'SPK Laptop Bekas',
    title: 'SPK Laptop Bekas Indragiri Hilir',
    description:
      'Sistem Pendukung Keputusan pemilihan laptop bekas terbaik menggunakan metode SMART.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SPK Laptop Bekas Indragiri Hilir',
    description:
      'Sistem Pendukung Keputusan pemilihan laptop bekas terbaik menggunakan metode SMART.',
  },
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
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
