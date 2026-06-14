import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mythos Fitness | Premium Gym in Ghatkopar East, Mumbai',
  description:
    'Mumbai\'s premium fitness experience. Transform your body with expert trainers, state-of-the-art equipment, and personalized programs at Mythos Fitness in Ghatkopar East.',
  keywords: [
    'gym', 'fitness', 'Ghatkopar', 'Mumbai', 'personal training',
    'membership', 'transformation', 'strength training', 'cardio',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} min-h-screen bg-background antialiased font-sans`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
