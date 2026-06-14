'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, Check, Dumbbell } from 'lucide-react';
import { trialApi } from '@/services/api';

export default function TrialCTA() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', goal: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await trialApi({ ...form });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto glass-strong rounded-2xl p-8 text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 text-green-400 mb-4">
              <Check className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Welcome to Mythos Fitness!</h3>
            <p className="text-muted-foreground mb-6">
              We&apos;ll contact you shortly to schedule your free trial session.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="text-primary hover:underline text-sm"
            >
              Register another person
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="trial" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 25% 50%, #FF3B3B 0%, transparent 50%)',
          }}
        />
      </div>

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Dumbbell className="h-12 w-12 text-primary mb-6 animate-float" />
            <h2 className="heading-lg">
              START YOUR
              <br />
              <span className="text-gradient">TRANSFORMATION</span>
              <br />
              TODAY
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-md leading-relaxed">
              No commitment. No credit card required. Just results.
              Take the first step towards a stronger, healthier you.
            </p>
            <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-background bg-gradient-to-br from-primary/30 to-secondary"
                  />
                ))}
              </div>
              <span>Join 5000+ happy members</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="glass-strong rounded-2xl p-8 space-y-5 border border-white/10">
              <div>
                <label className="text-sm font-medium mb-1.5 block text-muted-foreground">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full h-12 px-4 rounded-xl bg-background/50 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground/50 transition-all"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block text-muted-foreground">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full h-12 px-4 rounded-xl bg-background/50 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground/50 transition-all"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block text-muted-foreground">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                  className="w-full h-12 px-4 rounded-xl bg-background/50 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground/50 transition-all"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block text-muted-foreground">Fitness Goal</label>
                <select
                  value={form.goal}
                  onChange={(e) => setForm({ ...form, goal: e.target.value })}
                  className="w-full h-12 px-4 rounded-xl bg-background/50 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 text-foreground transition-all"
                >
                  <option value="">Select your goal</option>
                  <option value="Weight Loss">Weight Loss</option>
                  <option value="Muscle Building">Muscle Building</option>
                  <option value="General Fitness">General Fitness</option>
                  <option value="Flexibility">Flexibility</option>
                </select>
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary w-full neon-glow disabled:opacity-50"
              >
                {submitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Book Your Free Trial <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
