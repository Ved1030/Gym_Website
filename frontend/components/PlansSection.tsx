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
    <section id="plans" className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col rounded-2xl border transition-all duration-300 h-[520px] ${
                plan.popular
                  ? 'border-primary/40 bg-gradient-to-b from-primary/[0.08] to-transparent shadow-[0_0_40px_rgba(255,59,59,0.15)]'
                  : 'border-white/[0.08] bg-white/[0.03] hover:border-white/[0.15]'
              } hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,59,59,0.1)]`}
              style={plan.popular ? { transform: 'scale(1.03)' } : undefined}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                  <div className="bg-primary text-primary-foreground text-[11px] font-semibold px-5 py-1.5 rounded-full shadow-[0_0_20px_rgba(255,59,59,0.4)]">
                    Best Value
                  </div>
                </div>
              )}

              <div className="flex flex-col flex-1 p-8">
                <div className="text-center">
                  <h3 className="text-xl font-bold tracking-tight">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground/70 mt-1">{plan.description}</p>

                  <div className="mt-6 mb-6">
                    <span className="text-4xl font-bold tracking-tight">
                      ₹{plan.price.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground/60 text-sm ml-1">/{plan.duration}</span>
                  </div>
                </div>

                <ul className="space-y-3 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  <a href="#trial" className="block">
                    <Button
                      className={`w-full gap-2 transition-all duration-300 ${
                        plan.popular
                          ? 'shadow-[0_0_20px_rgba(255,59,59,0.3)] hover:shadow-[0_0_30px_rgba(255,59,59,0.5)]'
                          : 'bg-white/[0.06] text-foreground hover:bg-white/[0.10] border border-white/[0.08]'
                      }`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
