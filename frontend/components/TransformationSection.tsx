'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const transformations = [
  {
    name: 'Rahul Sharma',
    weightLoss: '18 kg',
    duration: '4 Months',
    testimonial: 'Evolve Fitness transformed my life. The trainers are incredibly supportive and the equipment is world-class.',
  },
  {
    name: 'Priya Patel',
    weightLoss: '12 kg',
    duration: '3 Months',
    testimonial: 'The best decision I ever made. The personalized attention and nutrition guidance made all the difference.',
  },
  {
    name: 'Amit Verma',
    weightLoss: '25 kg',
    duration: '6 Months',
    testimonial: 'From struggling with stairs to running marathons. Thank you, Evolve Fitness, for this incredible transformation.',
  },
  {
    name: 'Sneha Kapoor',
    weightLoss: '15 kg',
    duration: '5 Months',
    testimonial: 'The trainers here don\'t just build bodies, they build confidence. An amazing journey.',
  },
];

export default function TransformationSection() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((p) => (p + 1) % transformations.length);
  const prev = () => setCurrent((p) => (p - 1 + transformations.length) % transformations.length);

  const t = transformations[current];

  return (
    <section id="transformations" className="py-20 lg:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Transformations
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold">
            Real <span className="text-gradient">Transformations</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Inspiring stories of our members who transformed their lives.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="glass rounded-2xl p-8 md:p-10 text-center"
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-2xl font-bold mb-6">
              {t.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <Quote className="h-8 w-8 text-primary/30 mx-auto mb-4" />
            <p className="text-muted-foreground italic mb-6 leading-relaxed">&ldquo;{t.testimonial}&rdquo;</p>
            <h3 className="text-xl font-semibold">{t.name}</h3>
            <div className="flex items-center justify-center gap-4 mt-4 text-sm">
              <span className="glass rounded-full px-3 py-1 text-primary font-medium">
                Lost {t.weightLoss}
              </span>
              <span className="text-muted-foreground">in {t.duration}</span>
            </div>
          </motion.div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="glass rounded-full p-2.5 hover:text-primary hover:border-primary/30 transition-all"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {transformations.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'bg-primary w-6' : 'bg-muted'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="glass rounded-full p-2.5 hover:text-primary hover:border-primary/30 transition-all"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
