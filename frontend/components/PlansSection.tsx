'use client';

import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const plans = [
  {
    name: 'Starter',
    price: 1999,
    duration: 'month',
    description: 'Perfect for beginners',
    features: ['Gym Access (6 AM - 10 AM)', 'Basic Equipment', 'Locker Access', 'Fitness Assessment'],
    popular: false,
  },
  {
    name: 'Pro',
    price: 3999,
    duration: 'month',
    description: 'Most popular choice',
    features: [
      'Full Day Access',
      'All Equipment',
      'Steam Room Access',
      '1 PT Session/Week',
      'Nutrition Guidance',
      'Locker & Towel',
    ],
    popular: true,
  },
  {
    name: 'Elite',
    price: 6999,
    duration: 'month',
    description: 'Ultimate fitness experience',
    features: [
      '24/7 Access',
      'All Equipment & Classes',
      'Steam Room & Sauna',
      '4 PT Sessions/Week',
      'Custom Meal Plan',
      'Priority Support',
      'VIP Locker Room',
    ],
    popular: false,
  },
];

export default function PlansSection() {
  return (
    <section id="plans" className="py-20 lg:py-28 relative">
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
            Pricing
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold">
            Choose Your <span className="text-gradient">Plan</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Flexible membership options designed for every fitness journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-6 lg:p-8 ${
                plan.popular
                  ? 'neon-border bg-background scale-105 lg:scale-110'
                  : 'glass hover:neon-border'
              } transition-all duration-500`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold">₹{plan.price.toLocaleString()}</span>
                  <span className="text-muted-foreground text-sm">/{plan.duration}</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <a href="#trial">
                <Button
                  className={`w-full gap-2 ${plan.popular ? '' : 'glass bg-transparent hover:bg-white/5'}`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
