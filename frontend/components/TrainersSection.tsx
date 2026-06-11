'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Star, Medal, Target } from 'lucide-react';

const trainers = [
  {
    name: 'Prashant Wadekar',
    role: 'Founder & Head Trainer',
    experience: '15+ Years',
    specialization: 'Strength & Conditioning',
    achievements: ['NSCA-CSCS Certified', 'ACE-CPT', 'CrossFit Level 2', '1,000+ Transformations'],
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&q=80',
    isFounder: true,
  },
  {
    name: 'Vikram Joshi',
    role: 'Senior Strength Coach',
    experience: '10+ Years',
    specialization: 'Functional Training',
    achievements: ['ACE-CPT', 'NASM-CES', 'Precision Nutrition Coach'],
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80',
    isFounder: false,
  },
  {
    name: 'Neha Singh',
    role: 'Yoga & Flexibility Lead',
    experience: '8+ Years',
    specialization: 'Yoga & Pilates',
    achievements: ['RYT-500', 'ACE-GFI', '200+ Workshops'],
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80',
    isFounder: false,
  },
  {
    name: 'Rohan Desai',
    role: 'Head Nutrition Coach',
    experience: '7+ Years',
    specialization: 'Sports Nutrition',
    achievements: ['ISSN-SNS', 'ACE-CPT', '500+ Meal Plans'],
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80',
    isFounder: false,
  },
];

export default function TrainersSection() {
  const [touchedIndex, setTouchedIndex] = useState<number | null>(null);
  return (
    <section id="trainers" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-[0.3em] uppercase">
            Our Team
          </span>
          <h2 className="heading-lg mt-4">
            Meet Your <span className="text-gradient">Coaches</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            World-class trainers dedicated to unlocking your full potential.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainers.map((trainer, index) => (
            <motion.div
              key={trainer.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative h-full"
              onClick={() => setTouchedIndex(touchedIndex === index ? null : index)}
            >
              <div
                className={`relative h-full rounded-2xl overflow-hidden ${
                  trainer.isFounder ? 'ring-2 ring-primary/30' : ''
                }`}
              >
                <motion.img
                  src={trainer.image}
                  alt={trainer.name}
                  className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white">{trainer.name}</h3>
                  <p className="text-primary text-sm font-medium">{trainer.role}</p>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  animate={{ opacity: touchedIndex === index ? 1 : 0 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 to-black/40 p-6 flex flex-col justify-end sm:flex"
                >
                  <h3 className="text-xl font-bold text-white mb-1">{trainer.name}</h3>
                  <p className="text-primary text-sm font-medium mb-3">{trainer.role}</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="h-3.5 w-3.5 text-primary" />
                      <span>{trainer.experience} experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Target className="h-3.5 w-3.5 text-primary" />
                      <span>{trainer.specialization}</span>
                    </div>
                    <div className="mt-3 space-y-1">
                      {trainer.achievements.map((a) => (
                        <div key={a} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Medal className="h-3 w-3 text-primary/60" />
                          {a}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {trainer.isFounder && (
                  <div className="absolute top-4 left-4">
                    <div className="glass rounded-full px-3 py-1 flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5 text-primary" />
                      <span className="text-xs font-medium text-white">Founder</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
