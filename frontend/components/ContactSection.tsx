'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, MessageCircle, Clock, Mail, Star, Users, TrendingUp } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="section-padding relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-[0.3em] uppercase">
            Contact
          </span>
          <h2 className="heading-lg mt-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Ready to begin your fitness journey? We&apos;re here to help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass-strong rounded-2xl overflow-hidden h-64 border border-white/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.0!2d72.908!3d19.078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA0JzQwLjgiTiA3MsKwNTQnMjguOCJF!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Glorious Fitness Location"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-strong rounded-xl p-5 flex items-center gap-4 hover:border-green-500/30 transition-all duration-300 group border border-white/10"
              >
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageCircle className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Chat on</p>
                  <p className="font-semibold">WhatsApp</p>
                </div>
              </a>

              <a
                href="tel:+919876543210"
                className="glass-strong rounded-xl p-5 flex items-center gap-4 hover:border-primary/30 transition-all duration-300 group border border-white/10"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Call us</p>
                  <p className="font-semibold">+91 98765 43210</p>
                </div>
              </a>
            </div>

            <div className="glass-strong rounded-xl p-6 space-y-4 border border-white/10">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-muted-foreground">Ghatkopar East, Mumbai, Maharashtra 400077</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <Clock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Working Hours</p>
                  <p className="text-muted-foreground">Mon - Sat: 6:00 AM - 10:00 PM</p>
                  <p className="text-muted-foreground">Sunday: 7:00 AM - 2:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <Mail className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">info@gloriousfitness.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-strong rounded-3xl p-8 border border-white/10"
          >
            <h3 className="text-2xl font-bold mb-1">Start Your Transformation Today</h3>
            <p className="text-muted-foreground text-sm mb-8">Free trial. No commitment. Just results.</p>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full h-12 px-4 rounded-2xl bg-black/30 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full h-12 px-4 rounded-2xl bg-black/30 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all"
              />
              <select className="w-full h-12 px-4 rounded-2xl bg-black/30 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 text-sm text-foreground transition-all appearance-none">
                <option value="" className="bg-[#111]">Select Fitness Goal</option>
                <option value="weight-loss" className="bg-[#111]">Weight Loss</option>
                <option value="muscle-gain" className="bg-[#111]">Muscle Gain</option>
                <option value="toning" className="bg-[#111]">Toning &amp; Sculpting</option>
                <option value="endurance" className="bg-[#111]">Endurance &amp; Cardio</option>
                <option value="flexibility" className="bg-[#111]">Flexibility &amp; Mobility</option>
              </select>
              <select className="w-full h-12 px-4 rounded-2xl bg-black/30 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 text-sm text-foreground transition-all appearance-none">
                <option value="" className="bg-[#111]">Select Preferred Time</option>
                <option value="morning" className="bg-[#111]">Morning (6 - 9 AM)</option>
                <option value="mid-morning" className="bg-[#111]">Mid-Morning (9 - 11 AM)</option>
                <option value="afternoon" className="bg-[#111]">Afternoon (12 - 3 PM)</option>
                <option value="evening" className="bg-[#111]">Evening (4 - 7 PM)</option>
                <option value="night" className="bg-[#111]">Night (7 - 10 PM)</option>
              </select>
              <button
                type="submit"
                className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              >
                Book Free Trial
              </button>
            </form>

            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-yellow-400 mb-1">
                  <Star className="h-3.5 w-3.5 fill-yellow-400" />
                  <Star className="h-3.5 w-3.5 fill-yellow-400" />
                  <Star className="h-3.5 w-3.5 fill-yellow-400" />
                  <Star className="h-3.5 w-3.5 fill-yellow-400" />
                  <Star className="h-3.5 w-3.5 fill-yellow-400" />
                </div>
                <p className="text-lg font-bold">4.5</p>
                <p className="text-[11px] text-muted-foreground">Google Rating</p>
              </div>
              <div className="text-center border-x border-white/10">
                <Users className="h-5 w-5 text-primary mx-auto mb-1" />
                <p className="text-lg font-bold">103+</p>
                <p className="text-[11px] text-muted-foreground">Reviews</p>
              </div>
              <div className="text-center">
                <TrendingUp className="h-5 w-5 text-primary mx-auto mb-1" />
                <p className="text-lg font-bold">5000+</p>
                <p className="text-[11px] text-muted-foreground">Transformations</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
