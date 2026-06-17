import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Evolve Fitness | Premium Gym in Ghatkopar West, Mumbai',
  description:
    'Transform. Strengthen. Evolve. Premium fitness destination in Ghatkopar West with expert trainers, state-of-the-art equipment, and personalized fitness programs at Evolve Fitness.',
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
