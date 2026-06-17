'use client';

import { motion } from 'framer-motion';
import {
  Dumbbell,
  Heart,
  Zap,
  Users,
  User,
  Target,
} from 'lucide-react';

const facilities = [
  { icon: Dumbbell, title: 'Strength Training Zone', description: 'Power racks, free weights, and premium equipment for serious strength training.' },
  { icon: Heart, title: 'Latest Cardio Equipment', description: 'Modern treadmills, bikes, and machines for effective cardio workouts.' },
  { icon: Zap, title: 'Functional Training Area', description: 'Dedicated space for functional movements, battle ropes, kettlebells, and more.' },
  { icon: Target, title: 'Weight Loss Programs', description: 'Structured programs designed to help you shed weight effectively and safely.' },
  { icon: User, title: 'Personal Training Studio', description: 'One-on-one sessions with certified trainers for personalized results.' },
  { icon: Users, title: 'Muscle Gain Programs', description: 'Specialized programs with certified coaches to build lean muscle mass.' },
];

export default function FacilitiesSection() {
  return (
    <section id="facilities" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Facilities
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold">
            Premium <span className="text-gradient">Facilities</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Everything you need for a complete fitness experience under one roof.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility, index) => (
            <motion.div
              key={facility.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden glass rounded-xl p-6 hover:neon-border transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <facility.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {facility.title}
                </h3>
                <p className="text-sm text-muted-foreground">{facility.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
