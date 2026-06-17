'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  { name: 'Rahul Mehta', rating: 5, text: 'Excellent experience for beginners. Certified trainers, advanced equipment, and a motivating atmosphere make workouts enjoyable and effective.' },
  { name: 'Priya Sharma', rating: 5, text: 'A great place to stay fit and healthy. The trainers are knowledgeable, professional, and provide personalized guidance based on individual goals.' },
  { name: 'Amit Patel', rating: 5, text: 'Friendly atmosphere, modern equipment, fully air-conditioned facilities, and experienced trainers. One of the best fitness studios in Ghatkopar.' },
  { name: 'Neha Desai', rating: 5, text: 'Professional environment with quality training. The equipment is updated regularly and the coaching is excellent.' },
  { name: 'Vikram Joshi', rating: 5, text: 'The personalized attention from the trainers here is unmatched. They genuinely care about your progress and fitness journey.' },
  { name: 'Sneha Kapoor', rating: 4, text: 'Great facility with a welcoming atmosphere. The trainers are supportive and help you stay motivated throughout your fitness journey.' },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Testimonials
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold">
            What Our <span className="text-gradient">Members Say</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Real feedback from our growing family.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-xl p-6 hover:neon-border transition-all duration-500"
            >
              <Quote className="h-6 w-6 text-primary/30 mb-3" />
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">{t.name}</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < t.rating ? 'text-red-500 fill-red-500' : 'text-muted'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
