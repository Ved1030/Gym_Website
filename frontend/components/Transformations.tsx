'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const transformations = [
  {
    name: 'Rahul Sharma',
    before: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80',
    weightLoss: '18 kg',
    duration: '4 Months',
  },
  {
    name: 'Priya Patel',
    before: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80',
    weightLoss: '12 kg',
    duration: '3 Months',
  },
  {
    name: 'Amit Verma',
    before: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=600&q=80',
    weightLoss: '25 kg',
    duration: '6 Months',
  },
  {
    name: 'Sneha Kapoor',
    before: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
    weightLoss: '15 kg',
    duration: '5 Months',
  },
];

function BeforeAfterSlider({
  before,
  after,
  name,
  weightLoss,
  duration,
}: {
  before: string;
  after: string;
  name: string;
  weightLoss: string;
  duration: string;
}) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(Math.max(x, 5), 95));
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden group cursor-ew-resize select-none touch-pan-y"
      onMouseMove={(e) => handleMove(e.clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
    >
      <img src={before} alt="Before" className="absolute inset-0 h-full w-full object-cover" />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img src={after} alt="After" className="absolute inset-0 h-full w-full object-cover" />
      </div>

      <div
        className="absolute top-0 bottom-0 w-1 bg-primary shadow-[0_0_15px_rgba(255,59,59,0.5)]"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
          <div className="flex gap-1">
            <span className="text-white text-xs font-bold">&larr;</span>
            <span className="text-white text-xs font-bold">&rarr;</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <p className="text-white font-semibold text-lg">{name}</p>
        <div className="flex gap-3 mt-1">
          <span className="text-primary text-sm font-medium">Lost {weightLoss}</span>
          <span className="text-muted-foreground text-sm">in {duration}</span>
        </div>
      </div>

      <div className="absolute top-4 left-4 glass rounded-full px-3 py-1 text-xs font-medium text-white">
        Before
      </div>
      <div className="absolute top-4 right-4 glass rounded-full px-3 py-1 text-xs font-medium text-primary">
        After
      </div>
    </div>
  );
}

export default function Transformations() {
  return (
    <section id="transformations" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-[0.3em] uppercase">
            Real Results
          </span>
          <h2 className="heading-lg mt-4">
            Real <span className="text-gradient">Transformations</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Every transformation tells a story of dedication, hard work, and unwavering commitment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {transformations.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <BeforeAfterSlider {...t} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
