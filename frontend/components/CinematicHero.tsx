'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ArrowRight, MessageCircle, Star, Award, Users, Clock } from 'lucide-react';
import Counter from './Counter';

const stats = [
  { icon: Star, value: 103, suffix: '+', label: 'Reviews' },
  { icon: Star, value: 4.5, suffix: '', label: 'Rating', decimals: 1 },
  { icon: Award, value: 5000, suffix: '+', label: 'Transformations' },
  { icon: Clock, value: 10, suffix: '+', label: 'Years Experience' },
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
        className="relative z-20 h-full flex flex-col justify-center section-container md:pl-16 lg:pl-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span
            className="text-lg font-medium tracking-wider"
            style={{ color: '#FF3B3B' }}
          >
            Ghatkopar&apos;s Premium Fitness Destination
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="heading-xl mt-4 max-w-[700px]"
        >
          <span className="text-foreground">Transform Your Body.</span>
          <br />
          <span className="text-gradient">Transform Your Life.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 max-w-[650px] text-lg md:text-[22px] font-normal leading-[1.7]"
          style={{ color: 'rgba(255,255,255,0.75)' }}
        >
          Experience world-class training with state-of-the-art equipment and expert guidance
          at Mumbai&apos;s most elite fitness facility.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <a href="#trial">
            <button className="btn-primary neon-glow">
              Book Free Trial <ArrowRight className="h-5 w-5" />
            </button>
          </a>
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
            <button className="btn-ghost">
              <MessageCircle className="h-5 w-5 text-green-400" />
              WhatsApp Us
            </button>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16"
        >
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-2 sm:gap-x-4 sm:gap-y-3">
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
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5"
          >
            <div className="w-1 h-3 rounded-full bg-white/60" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
