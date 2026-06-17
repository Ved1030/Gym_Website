'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionValueEvent,
} from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const facilities = [
  {
    id: 1,
    zone: 'ZONE 01',
    name: 'Strength Zone',
    subtitle: 'Power. Performance. Progress.',
    description:
      'Heavy free weights, squat racks, deadlift platforms, bench press areas, and professional strength athletes.',
    image:
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 2,
    zone: 'ZONE 02',
    name: 'Cardio Arena',
    subtitle: 'Endless Energy. Maximum Burn.',
    description:
      'Premium treadmills, cross trainers, stationary bikes, and cutting-edge cardio machines.',
    image:
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 3,
    zone: 'ZONE 03',
    name: 'Functional Training',
    subtitle: 'Move Better. Feel Stronger.',
    description:
      'Battle ropes, kettlebells, TRX suspension, agility training equipment, and open training area.',
    image:
      'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 4,
    zone: 'ZONE 04',
    name: 'Personal Training',
    subtitle: 'Expert Guidance. Real Results.',
    description:
      'One-on-one coaching with certified trainers, custom programs, and dedicated support.',
    image:
      'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 5,
    zone: 'ZONE 05',
    name: 'Ladies Gym',
    subtitle: 'Empower. Train. Transform.',
    description:
      'A separate dedicated section for women with specialized equipment and female trainers.',
    image:
      'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&q=80&w=1200',
  },
];

export default function GymShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardHeight, setCardHeight] = useState(650);
  const [containerW, setContainerW] = useState(1200);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const maxIndex = Math.max(0, facilities.length - cardsPerView);

  const mobileTargetX = useMotionValue(0);
  const mobileSmoothX = useSpring(mobileTargetX, { stiffness: 80, damping: 25, restDelta: 0.001 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setCardsPerView(1);
      else if (window.innerWidth < 1024) setCardsPerView(2);
      else setCardsPerView(3);
      const vh = window.innerHeight;
      if (vh >= 900) setCardHeight(650);
      else if (vh >= 768) setCardHeight(560);
      else setCardHeight(460);
    };
    handleResize();
    if (trackRef.current?.parentElement) {
      setContainerW(trackRef.current.parentElement.offsetWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (trackRef.current?.parentElement) {
      setContainerW(trackRef.current.parentElement.offsetWidth);
    }
  }, [cardsPerView]);

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const getCardWidth = () => {
    if (cardsPerView === 1) return containerW;
    if (cardsPerView === 2) return 360;
    return 380;
  };

  const step = (() => {
    if (cardsPerView === 1) return containerW + 24;
    if (cardsPerView === 2) return 384;
    return 404;
  })();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, (latest) => {
    const effectiveMax = Math.max(0, facilities.length - (cardsPerView || 3));
    if (effectiveMax === 0) return 0;
    const adjusted = Math.min(1, Math.max(0, (latest - 0.08) / 0.84));
    return -(adjusted * effectiveMax * step);
  });

  const smoothX = useSpring(x, { stiffness: 80, damping: 25, restDelta: 0.001 });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (isMobile) return;
    const effectiveMax = Math.max(0, facilities.length - (cardsPerView || 3));
    if (effectiveMax === 0) {
      setCurrentIndex(0);
      return;
    }
    const adjusted = Math.min(1, Math.max(0, (latest - 0.08) / 0.84));
    const idx = Math.round(adjusted * effectiveMax);
    setCurrentIndex(Math.max(0, Math.min(idx, effectiveMax)));
  });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMobile || !isVisible || interactionPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 2000);
    return () => clearInterval(timer);
  }, [isMobile, isVisible, interactionPaused, maxIndex]);

  useEffect(() => {
    if (isMobile) {
      mobileTargetX.set(-(currentIndex * step));
    }
  }, [isMobile, currentIndex, step, mobileTargetX]);

  const handleNavigation = useCallback(
    (index: number) => {
      const target = Math.max(0, Math.min(index, maxIndex));
      if (isMobile) {
        setCurrentIndex(target);
        setInteractionPaused(true);
        if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
        pauseTimerRef.current = setTimeout(() => setInteractionPaused(false), 5000);
        return;
      }
      if (!sectionRef.current || maxIndex === 0) return;
      const sectionTop = sectionRef.current.offsetTop;
      const scrollable = sectionRef.current.offsetHeight - window.innerHeight;
      const targetScroll = sectionTop + (target / maxIndex) * scrollable;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    },
    [maxIndex, isMobile]
  );

  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, []);

  const sectionHeight = (maxIndex + 1) * 100 + 60;
  const cardWidth = getCardWidth();

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: isMobile ? '100vh' : `${sectionHeight}vh` }}
    >
      <div
        className="sticky top-0 h-screen overflow-hidden bg-background"
        style={{ zIndex: 2, transform: 'translateZ(0)' }}
      >
        <div className="h-full w-full flex flex-col items-center justify-center px-6 sm:px-10">
          <div className="w-full max-w-[1800px] flex flex-col">
            <div className="shrink-0 text-center mb-8 sm:mb-10 lg:mb-12">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-primary text-sm font-medium tracking-[0.3em] uppercase"
              >
                OUR FACILITIES
              </motion.span>
              <div className="h-5" />
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="heading-lg text-balance"
              >
                The <span className="text-gradient">Ultimate</span> Gym
              </motion.h2>
              <div className="h-6" />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-muted-foreground max-w-2xl mx-auto"
              >
                Explore our world-class facilities designed to push your limits.
              </motion.p>
            </div>

            <div className="relative w-full flex-1 min-h-0">
              <div
                className="relative w-full h-full overflow-hidden rounded-[28px]"
                style={{ height: cardHeight }}
              >
                <motion.div
                  ref={trackRef}
                  className="flex gap-6 h-full items-end sm:items-center"
                  style={{ x: isMobile ? mobileSmoothX : smoothX, cursor: 'grab' }}
                >
                  {facilities.map((f, i) => (
                    <motion.div
                      key={f.id}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className={`group relative flex-shrink-0 overflow-hidden rounded-[28px] transition-all duration-300 ease-out ${
                        isMobile ? '' : 'hover:scale-[1.02] hover:shadow-[0_24px_80px_rgba(0,0,0,0.6)]'
                      }`}
                      style={{
                        width: cardWidth,
                        height: cardHeight,
                      }}
                    >
                      <img
                        src={f.image}
                        alt={f.name}
                        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[400ms] ease-out ${
                          isMobile ? '' : 'group-hover:scale-105'
                        }`}
                      />

                      <div
                        className="absolute inset-0 transition-opacity duration-300"
                        style={{
                          background:
                            'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 60%, transparent 100%)',
                        }}
                      />
                      <div
                        className={`absolute inset-0 transition-opacity duration-300 ${
                          isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}
                        style={{
                          background:
                            'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 60%, transparent 100%)',
                        }}
                      />

                      <div className="absolute bottom-[40px] left-[32px] right-[32px] z-10">
                        <span className="text-base text-primary font-semibold tracking-[0.2em] uppercase block mb-4">
                          {f.zone}
                        </span>
                        <h3 className="md:text-[48px] text-4xl font-bold font-serif mb-4 leading-[1.1]">
                          {f.name}
                        </h3>
                        <p className={`text-xl text-muted-foreground font-light mb-5 leading-snug transition-all duration-300 ease-out ${
                          isMobile
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
                        }`}>
                          {f.subtitle}
                        </p>
                        <p className={`text-base text-muted-foreground/80 leading-relaxed transition-all duration-300 ease-out ${
                          isMobile
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
                        }`}>
                          {f.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>

            <div className="shrink-0 flex items-center justify-center gap-6 pt-6 sm:pt-8">
              <button
                onClick={() => handleNavigation(currentIndex - 1)}
                disabled={currentIndex === 0}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
                <span className="hidden sm:inline">Previous</span>
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleNavigation(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === currentIndex
                        ? 'bg-primary w-6'
                        : 'bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => handleNavigation(currentIndex + 1)}
                disabled={currentIndex >= maxIndex}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
