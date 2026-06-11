'use client';

import { motion } from 'framer-motion';
import { Dumbbell, Target, Users, Trophy } from 'lucide-react';

const highlights = [
  {
    icon: Dumbbell,
    title: 'Premium Equipment',
    description: 'State-of-the-art machines and free weights from top global brands.',
  },
  {
    icon: Target,
    title: 'Expert Trainers',
    description: 'Certified professionals dedicated to your fitness journey.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Join a supportive community of fitness enthusiasts.',
  },
  {
    icon: Trophy,
    title: 'Proven Results',
    description: '5000+ successful transformations and counting.',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-28 relative">
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
            About Us
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold">
            Why{' '}
            <span className="text-gradient">Glorious Fitness</span>?
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            Founded by Prashant Wadekar, Glorious Fitness is Ghatkopar East&apos;s premier
            fitness destination. We combine world-class equipment with expert guidance
            to help you achieve your fitness goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-xl p-6 text-center group hover:neon-border transition-all duration-500"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <item.icon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
