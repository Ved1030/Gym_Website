'use client';

import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import CinematicHero from '@/components/CinematicHero';
import GymShowcase from '@/components/GymShowcase';
import Transformations from '@/components/Transformations';
import TrainersSection from '@/components/TrainersSection';
import MembershipPlans from '@/components/MembershipPlans';
import VideoTestimonials from '@/components/VideoTestimonials';
import TrialCTA from '@/components/TrialCTA';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import AIAssistant from '@/components/AIAssistant';
import PageLoader from '@/components/PageLoader';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <PageLoader />;

  return (
    <>
      <Navigation />
      <main>
        <CinematicHero />
        <GymShowcase />
        <Transformations />
        <TrainersSection />
        <MembershipPlans />
        <VideoTestimonials />
        <TrialCTA />
        <ContactSection />
      </main>
      <Footer />
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4 items-end">
        <AIAssistant />
        <FloatingWhatsApp />
      </div>
    </>
  );
}
