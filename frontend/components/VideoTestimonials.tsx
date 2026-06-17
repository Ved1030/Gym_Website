'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Rahul Mehta',
    rating: 5,
    text: 'The trainers are highly professional, supportive, and truly care about your fitness journey. I\'ve seen amazing results in just 3 months.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    achievement: 'Lost 15 kg in 4 months',
  },
  {
    name: 'Priya Sharma',
    rating: 5,
    text: 'Best equipment, certified trainers, and an amazing CrossFit area. The vibe is energetic and motivating. Highly recommended!',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    achievement: 'Lost 10 kg in 3 months',
  },
  {
    name: 'Amit Patel',
    rating: 5,
    text: 'Air-conditioned and well-maintained facilities with friendly staff and excellent workout environment. One of the best in Ghatkopar East.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    achievement: 'Member since 2024',
  },
  {
    name: 'Neha Desai',
    rating: 5,
    text: 'One of the best fitness centers in Ghatkopar East with premium equipment and expert coaching. Truly a premium fitness experience.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    achievement: 'Gained 6 kg lean muscle',
  },
  {
    name: 'Vikram Joshi',
    rating: 5,
    text: 'The personalized attention from the trainers here is unmatched. They genuinely care about your progress and help you stay motivated every single day.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
    achievement: 'Lost 12 kg in 4 months',
  },
];

export default function VideoTestimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (dir: number) => {
    setDirection(dir);
    setCurrent((p) => (p + dir + testimonials.length) % testimonials.length);
  };

  const t = testimonials[current];

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d < 0 ? 300 : -300, opacity: 0 }),
  };

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-[0.3em] uppercase">
            Testimonials
          </span>
          <h2 className="heading-lg mt-4">
            What Our <span className="text-gradient">Members Say</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Real stories from our growing family of fitness enthusiasts.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="relative min-h-[300px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="w-full"
              >
                <div className="glass rounded-2xl p-8 md:p-10 text-center">
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < t.rating ? 'text-red-500 fill-red-500' : 'text-muted'
                        }`}
                      />
                    ))}
                  </div>

                  <Quote className="h-8 w-8 text-primary/20 mx-auto mb-4" />

                  <p className="text-muted-foreground text-lg leading-relaxed italic">
                    &ldquo;{t.text}&rdquo;
                  </p>

                  <div className="flex items-center justify-center gap-4 mt-6">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                    />
                    <div className="text-left">
                      <p className="font-semibold text-foreground">{t.name}</p>
                      <p className="text-sm text-primary">{t.achievement}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => paginate(-1)}
              className="glass rounded-full p-3 hover:text-primary hover:border-primary/30 transition-all"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'bg-primary w-8' : 'bg-muted w-2 hover:bg-muted-foreground'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => paginate(1)}
              className="glass rounded-full p-3 hover:text-primary hover:border-primary/30 transition-all"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-12 glass rounded-2xl p-6">
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">4.5</div>
                <div className="flex gap-0.5 justify-center mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-red-500 fill-red-500" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Google Rating</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">100+</div>
                <p className="text-xs text-muted-foreground mt-2">Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
