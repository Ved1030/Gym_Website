'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ArrowRight, MessageCircle, Star, Award, Clock } from 'lucide-react';
import Counter from './Counter';

const stats = [
  { icon: Star, value: 103, suffix: '+', label: 'Reviews' },
  { icon: Star, value: 4.5, suffix: '', label: 'Rating', decimals: 1 },
  { icon: Award, value: 5000, suffix: '+', label: 'Transform.' },
  { icon: Clock, value: 10, suffix: '+', label: 'Experience' },
];

export default function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.6, 0.9]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest > 0.05) setShowScrollIndicator(false);
    else setShowScrollIndicator(true);
  });

  return (
    <section ref={containerRef} id="home" className="relative h-screen overflow-hidden" style={{ zIndex: 1 }}>
      <motion.div style={{ scale: videoScale }} className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          poster="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-people-working-out-in-a-gym-5762/1080p.mp4"
            type="video/mp4"
          />
        </video>
      </motion.div>

      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80 z-10"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 z-10" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 h-full flex flex-col md:justify-center max-md:justify-end max-md:pb-16 section-container md:pl-16 lg:pl-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span
            className="text-xs sm:text-sm md:text-lg font-medium tracking-wider leading-none"
            style={{ color: '#FF3B3B' }}
          >
            Ghatkopar&apos;s Premium Fitness Destination
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-2 sm:mt-3 md:mt-4 max-w-[700px] font-bold tracking-tight max-md:text-[42px] max-sm:text-[36px] max-[375px]:text-[32px] max-[320px]:text-[28px] max-md:leading-[1.1] md:heading-xl"
        >
          <span className="text-foreground">Transform Your Body.</span>
          <br />
          <span className="text-gradient">Transform Your Life.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-2 sm:mt-3 md:mt-6 text-sm sm:text-base md:text-lg lg:text-[22px] font-normal leading-[1.6] sm:leading-[1.6] md:leading-[1.7] max-w-full sm:max-w-[650px]"
          style={{ color: 'rgba(255,255,255,0.75)' }}
        >
          Experience world-class training with state-of-the-art equipment and expert guidance
          at Mumbai&apos;s most elite fitness facility.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-4 sm:mt-5 md:mt-8 flex flex-col sm:flex-row gap-3 items-center sm:items-start w-full"
        >
          <a href="#trial" className="w-full sm:w-auto max-w-[300px] sm:max-w-none">
            <button className="btn-primary neon-glow w-full sm:w-auto justify-center">
              Book Free Trial <ArrowRight className="h-5 w-5 shrink-0" />
            </button>
          </a>
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto max-w-[300px] sm:max-w-none">
            <button className="btn-ghost w-full sm:w-auto justify-center">
              <MessageCircle className="h-5 w-5 text-green-400 shrink-0" />
              WhatsApp Us
            </button>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-4 sm:mt-5 md:mt-16"
        >
          <div className="grid grid-cols-2 gap-3 md:hidden">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass rounded-xl py-3 px-3 text-center border border-white/[0.06] flex flex-col items-center justify-center min-h-[85px]"
              >
                <stat.icon className="h-[18px] w-[18px] text-primary mb-1.5 shrink-0" />
                <div className="text-[28px] sm:text-[32px] font-bold text-foreground leading-none mb-0.5">
                  <Counter from={0} to={stat.value} decimals={stat.decimals || 0} />
                  {stat.suffix}
                </div>
                <div className="text-sm text-muted-foreground leading-tight whitespace-nowrap">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="hidden md:flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-2 sm:gap-x-4 sm:gap-y-3">
            {stats.map((stat, index) => (
              <div key={stat.label} className="flex items-center gap-2 sm:gap-4 px-2 sm:px-6">
                <stat.icon className="h-5 w-5 text-primary shrink-0" />
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-foreground">
                    <Counter from={0} to={stat.value} decimals={stat.decimals || 0} />
                    {stat.suffix}
                  </span>
                  <span className="text-sm text-muted-foreground whitespace-nowrap">{stat.label}</span>
                </div>
                {index < stats.length - 1 && (
                  <div className="h-8 w-px bg-white/10 mx-2 hidden sm:block" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {showScrollIndicator && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1 sm:p-1.5"
          >
            <div className="w-1 h-2 sm:h-3 rounded-full bg-white/60" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
