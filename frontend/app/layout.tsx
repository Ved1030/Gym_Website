import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Gym Mantra Fitness Studio | Best Gym in Ghatkopar West Mumbai',
  description:
    'Join Gym Mantra Fitness Studio in Ghatkopar West. Certified trainers, modern equipment, personal training, weight loss programs, and premium fitness facilities.',
  keywords: [
    'gym', 'fitness', 'Ghatkopar', 'Mumbai', 'personal training',
    'membership', 'transformation', 'strength training', 'cardio',
    'Gym Mantra', 'weight loss', 'muscle gain',
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
