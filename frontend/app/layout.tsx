import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const siteUrl = 'https://gymmantrafitness.in';
const siteName = 'Gym Mantra Fitness Studio';
const title = 'Gym Mantra Fitness Studio | Best Gym in Ghatkopar West Mumbai';
const description =
  'Join Gym Mantra Fitness Studio in Ghatkopar West. Premium fitness center with expert trainers, modern equipment, personal training, weight loss programs, and muscle building programs.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    'gym', 'fitness', 'Ghatkopar', 'Mumbai', 'personal training',
    'membership', 'transformation', 'strength training', 'cardio',
    'Gym Mantra', 'weight loss', 'muscle gain', 'fitness studio',
    'premium gym', 'certified trainers', 'hi-tech equipment',
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
        alt: 'Gym Mantra Fitness Studio - Best Gym in Ghatkopar West Mumbai',
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
    'Premium fitness studio in Ghatkopar West with certified trainers, modern equipment, personal training, weight loss programs, and muscle gain programs.',
  url: siteUrl,
  telephone: '+91 91797 97197',
  address: {
    '@type': 'PostalAddress',
    streetAddress:
      'Shop No. 2, Plot No. 2, 589, Raj Rajeshwari Society, Landmark - Bisleri Company, Building Road, Opp. Akashdyam Building, Narayan Nagar',
    addressLocality: 'Ghatkopar West',
    addressRegion: 'Mumbai',
    addressCountry: 'IN',
    postalCode: '400086',
  },
  openingHours: 'Mo-Sa 06:00-13:00,16:00-23:00',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '157',
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
