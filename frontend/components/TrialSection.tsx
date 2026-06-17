'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { trialApi } from '@/services/api';

export default function TrialSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', goal: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await trialApi(form);
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', goal: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <section id="trial" className="py-20 lg:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto glass rounded-2xl p-8 md:p-10 text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 text-green-400 mb-4">
              <Check className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold mb-2">You&apos;re In!</h3>
            <p className="text-muted-foreground mb-6">
              Welcome to Gym Mantra Fitness Studio! We&apos;ll contact you shortly to schedule your free trial session.
            </p>
            <Button onClick={() => setSuccess(false)} variant="outline">
              Register Another
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="trial" className="py-20 lg:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Free Trial
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold">
            Start Your <span className="text-gradient">Free Trial</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            No commitment. No credit card required. Just results.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-md mx-auto"
        >
          <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-8 space-y-4">
            <Input
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="bg-background/50"
            />
            <Input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="bg-background/50"
            />
            <Input
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
              className="bg-background/50"
            />
            <Input
              placeholder="Fitness Goal (optional)"
              value={form.goal}
              onChange={(e) => setForm({ ...form, goal: e.target.value })}
              className="bg-background/50"
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full gap-2" size="lg" disabled={submitting}>
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
              {submitting ? 'Submitting...' : 'Start Free Trial'}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
