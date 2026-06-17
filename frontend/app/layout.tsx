import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const siteUrl = 'https://mythosfitness.in';
const siteName = 'Mythos Fitness';
const title = 'Mythos Fitness | Premium Fitness Center in Ghatkopar East Mumbai';
const description =
  'Join Mythos Fitness in Ghatkopar East. Certified trainers, premium equipment, CrossFit area, personal training, strength programs, and fitness coaching.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    'gym', 'fitness', 'Ghatkopar', 'Mumbai', 'personal training',
    'membership', 'transformation', 'strength training', 'cardio',
    'Mythos Fitness', 'weight loss', 'muscle gain', 'CrossFit',
    'premium gym', 'certified trainers', 'premium equipment',
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
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
    locale: 'en_US',
    siteName,
    url: siteUrl,
    title,
    description,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mythos Fitness - Premium Fitness Center in Ghatkopar East Mumbai',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HealthClub',
  name: siteName,
  description:
    'Premium fitness center in Ghatkopar East with certified trainers, premium equipment, CrossFit area, personal training, strength programs, and weight management programs.',
  url: siteUrl,
  address: {
    '@type': 'PostalAddress',
    streetAddress:
      'N/R Brahmin Samaj Hall, Pranay Sudarshan A Wing, Joshi Lane',
    addressLocality: 'Ghatkopar East',
    addressRegion: 'Mumbai',
    addressCountry: 'IN',
    postalCode: '400077',
  },
  openingHours: 'Mo-Sa 06:00-13:00,16:00-23:00',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.5',
    reviewCount: '100',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} min-h-screen bg-background antialiased font-sans`} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
