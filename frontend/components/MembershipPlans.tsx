'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    monthlyPrice: 1999,
    quarterlyPrice: 5399,
    yearlyPrice: 19190,
    description: 'Perfect for beginners',
    features: ['Gym Access (6 AM - 11 PM)', 'Basic Equipment Access', 'Locker Facilities', 'Fitness Assessment', 'One Free PT Session'],
    popular: false,
  },
  {
    name: 'Pro',
    monthlyPrice: 3999,
    quarterlyPrice: 10799,
    yearlyPrice: 38390,
    description: 'Most popular choice',
    features: ['Full Day Access', 'All Equipment & Zones', 'Functional Training', 'Weekly PT Sessions', 'Group Classes', 'Locker & Towel Service', 'Class Access'],
    popular: true,
  },
  {
    name: 'Elite',
    monthlyPrice: 6999,
    quarterlyPrice: 18899,
    yearlyPrice: 67190,
    description: 'The ultimate experience',
    features: ['Full Day Access', 'All Equipment & Zones', 'Personal Training', '4 PT Sessions/Week', 'Custom Meal Plan', 'VIP Locker Room', 'Priority Support', 'Guest Passes'],
    popular: false,
  },
];

export default function MembershipPlans() {
  const [billing, setBilling] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');

  const getPrice = (plan: typeof plans[0]) => {
    switch (billing) {
      case 'monthly': return plan.monthlyPrice;
      case 'quarterly': return plan.quarterlyPrice;
      case 'yearly': return plan.yearlyPrice;
    }
  };

  const getLabel = () => {
    switch (billing) {
      case 'monthly': return '/month';
      case 'quarterly': return '/quarter';
      case 'yearly': return '/year';
    }
  };

  return (
    <section id="plans" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-primary text-sm font-medium tracking-[0.3em] uppercase">
            Pricing
          </span>
          <h2 className="heading-lg mt-4">
            Choose Your <span className="text-gradient">Membership</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Flexible plans designed for every fitness journey.
          </p>
        </motion.div>

        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          {(['monthly', 'quarterly', 'yearly'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setBilling(period)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 capitalize ${
                billing === period
                  ? 'bg-primary text-primary-foreground neon-glow-sm'
                  : 'glass text-muted-foreground hover:text-foreground'
              }`}
            >
              {period}
              {period === 'yearly' && (
                <span className="ml-1.5 text-[10px] text-green-400 font-semibold">Save 20%</span>
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              layout
              className={`relative flex flex-col rounded-2xl border transition-all duration-300 h-[560px] ${
                plan.popular
                  ? 'border-primary/40 bg-gradient-to-b from-primary/[0.08] to-transparent shadow-[0_0_40px_rgba(255,215,0,0.15)] md:scale-[1.02]'
                  : 'border-white/[0.08] bg-white/[0.03] hover:border-white/[0.15]'
              } hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,215,0,0.1)]`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                  <div className="bg-primary text-primary-foreground text-[11px] font-semibold px-5 py-1.5 rounded-full shadow-[0_0_20px_rgba(255,215,0,0.4)]">
                    Best Value
                  </div>
                </div>
              )}

              <div className="flex flex-col flex-1 p-8">
                <div className="text-center">
                  <h3 className="text-xl font-bold tracking-tight">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground/70 mt-1">{plan.description}</p>

                  <div className="mt-6 mb-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={billing}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <span className="text-4xl font-bold tracking-tight">
                          ₹{getPrice(plan).toLocaleString()}
                        </span>
                        <span className="text-muted-foreground/60 text-sm ml-1">{getLabel()}</span>
                      </motion.div>
                    </AnimatePresence>
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
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                        plan.popular
                          ? 'bg-primary text-primary-foreground shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)]'
                          : 'bg-white/[0.06] text-foreground hover:bg-white/[0.10] border border-white/[0.08]'
                      }`}
                    >
                      Get Started <ArrowRight className="h-4 w-4" />
                    </motion.button>
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
