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
    features: ['Gym Access (6 AM - 10 AM)', 'Basic Equipment Access', 'Locker Facilities', 'Fitness Assessment', 'One Free PT Session'],
    popular: false,
  },
  {
    name: 'Pro',
    monthlyPrice: 3999,
    quarterlyPrice: 10799,
    yearlyPrice: 38390,
    description: 'Most popular choice',
    features: ['Full Day Access', 'All Equipment & Zones', 'Steam Room Access', 'Weekly PT Sessions', 'Nutrition Guidance', 'Locker & Towel Service', 'Class Access'],
    popular: true,
  },
  {
    name: 'Elite',
    monthlyPrice: 6999,
    quarterlyPrice: 18899,
    yearlyPrice: 67190,
    description: 'The ultimate experience',
    features: ['24/7 Gym Access', 'All Equipment & Zones', 'Steam Room & Sauna', '4 PT Sessions/Week', 'Custom Meal Plan', 'VIP Locker Room', 'Priority Support', 'Guest Passes'],
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
    <section id="plans" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-center">
          {plans.map((plan, index) => {
            const isCenter = index === 1;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                layout
                style={{ transform: isCenter ? 'scale(1.05)' : 'scale(0.95)' }}
                className={`relative rounded-2xl p-8 transition-all duration-500 ${
                  plan.popular
                    ? 'bg-gradient-to-b from-primary/10 to-transparent border-2 border-primary/40 shadow-[0_0_30px_rgba(255,59,59,0.2)]'
                    : 'glass border border-white/10 hover:border-primary/30'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-5 py-1.5 rounded-full neon-glow-sm">
                    Best Value
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                  <div className="mt-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={billing}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <span className="text-5xl font-bold">₹{getPrice(plan).toLocaleString()}</span>
                        <span className="text-muted-foreground text-sm ml-1">{getLabel()}</span>
                      </motion.div>
                    </AnimatePresence>
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
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                      plan.popular
                        ? 'bg-primary text-primary-foreground neon-glow-sm'
                        : 'glass hover:bg-white/5 text-foreground'
                    }`}
                  >
                    Get Started <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
