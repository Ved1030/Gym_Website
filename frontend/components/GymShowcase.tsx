'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
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
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200',
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
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 5,
    zone: 'ZONE 05',
    name: 'Steam Recovery',
    subtitle: 'Recharge. Recover. Repeat.',
    description:
      'Premium steam rooms, sauna facilities, and relaxation areas for post-workout recovery.',
    image:
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=1200',
  },
];

export default function GymShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsPerViewRef = useRef(3);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);

  cardsPerViewRef.current = cardsPerView;

  const maxIndex = Math.max(0, facilities.length - cardsPerView);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setCardsPerView(1);
      else if (window.innerWidth < 1024) setCardsPerView(2);
      else setCardsPerView(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const getCardFlex = () => {
    if (cardsPerView === 3) return '0 0 420px';
    if (cardsPerView === 2) return '0 0 calc((100% - 24px) / 2)';
    return '0 0 100%';
  };

  const getCardHeight = () => {
    if (cardsPerView === 1) return 450;
    if (cardsPerView === 2) return 550;
    return 650;
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, (latest) => {
    const cpv = cardsPerViewRef.current;
    const effectiveMax = Math.max(0, facilities.length - cpv);
    if (effectiveMax === 0) return 0;
    const step = cpv === 3 ? 444 : cpv === 2 ? Math.round((window.innerWidth - 72) / 2) : window.innerWidth - 48;
    const adjusted = Math.min(1, Math.max(0, (latest - 0.15) / 0.7));
    return -(adjusted * effectiveMax * step);
  });

  const smoothX = useSpring(x, { stiffness: 80, damping: 25, restDelta: 0.001 });

  const headingOpacity = useTransform(scrollYProgress, (latest) => {
    return Math.min(1, Math.max(0, 1 - latest / 0.15));
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const cpv = cardsPerViewRef.current;
    const effectiveMax = Math.max(0, facilities.length - cpv);
    if (effectiveMax === 0) {
      setCurrentIndex(0);
      return;
    }
    const adjusted = Math.min(1, Math.max(0, (latest - 0.15) / 0.7));
    const idx = Math.round(adjusted * effectiveMax);
    setCurrentIndex(Math.max(0, Math.min(idx, effectiveMax)));
  });

  const goTo = useCallback(
    (index: number) => {
      const target = Math.max(0, Math.min(index, maxIndex));
      if (!sectionRef.current || maxIndex === 0) return;
      const sectionTop = sectionRef.current.offsetTop;
      const scrollable =
        sectionRef.current.offsetHeight - window.innerHeight;
      const targetScroll =
        sectionTop + (target / maxIndex) * scrollable;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    },
    [maxIndex]
  );

  const sectionHeight = (maxIndex + 1) * 100;

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${sectionHeight}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col" style={{ zIndex: 2 }}>
        <div className="pt-[60px] sm:pt-[80px] lg:pt-[120px] pb-4 sm:pb-6 shrink-0">
          <motion.div
            className="text-center max-w-[900px] mx-auto px-6"
            style={{ opacity: headingOpacity }}
          >
            <span className="text-primary text-sm font-medium tracking-[0.3em] uppercase">
              OUR FACILITIES
            </span>
            <h2 className="heading-lg mt-5 mb-6 text-balance">
              The <span className="text-gradient">Ultimate</span> Gym
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our world-class facilities designed to push your
              limits.
            </p>
          </motion.div>
        </div>

        <div className="flex-1 flex items-center justify-center min-h-0">
          <div className="relative select-none w-full px-6">
            {currentIndex > 0 && (
              <button
                onClick={() => goTo(currentIndex - 1)}
                className="absolute -left-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/50 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-primary transition-all z-10"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            {currentIndex < maxIndex && (
              <button
                onClick={() => goTo(currentIndex + 1)}
                className="absolute -right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/50 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-primary transition-all z-10"
              >
                <ChevronRight size={24} />
              </button>
            )}

            <div className="overflow-hidden">
              <motion.div
                className="flex gap-6"
                style={{ x: smoothX, cursor: 'grab' }}
              >
                {facilities.map((f, i) => (
                  <motion.div
                    key={f.id}
                    className="group relative flex-shrink-0 overflow-hidden rounded-3xl"
                    style={{
                      flex: getCardFlex(),
                      height: getCardHeight(),
                      maxHeight: cardsPerView === 1 ? 'calc(100dvh - 180px)' : 'none',
                    }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.1,
                      ease: 'easeOut',
                    }}
                    whileHover={{ y: -8 }}
                  >
                    <img
                      src={f.image}
                      alt={f.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.9)] via-black/30 to-transparent" />
                    <div className="absolute bottom-12 left-10 right-10 z-10">
                      <span className="text-sm text-primary font-semibold tracking-[0.2em] uppercase block mb-3">
                        {f.zone}
                      </span>
                      <h3 className="text-4xl md:text-[54px] font-bold font-serif mb-2 leading-[1.1]">
                        {f.name}
                      </h3>
                      <p className="text-xl md:text-2xl text-muted-foreground font-light mb-3 leading-snug">
                        {f.subtitle}
                      </p>
                      <p className="text-sm sm:text-base md:text-lg text-muted-foreground/80 leading-relaxed opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-3">
                        {f.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
