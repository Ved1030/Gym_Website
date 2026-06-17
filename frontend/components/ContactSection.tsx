'use client';

import { motion } from 'framer-motion';
import { MapPin, MessageCircle, Clock, Star, Users, TrendingUp, Navigation } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="section-padding relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-10 md:mb-12 lg:mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-[0.3em] uppercase">
            Contact
          </span>
          <h2 className="heading-lg mt-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="mt-3 md:mt-4 text-sm md:text-base lg:text-lg text-muted-foreground">
            Ready to begin your fitness journey at Mythos Fitness? We&apos;re here to help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4 md:space-y-5 lg:space-y-6 order-1"
          >
            <div
              className="relative glass-strong rounded-2xl overflow-hidden h-52 sm:h-56 md:h-60 lg:h-64 border border-white/10 group cursor-pointer"
              onClick={() => window.open('https://maps.google.com/?q=Mythos+Fitness+Ghatkopar+East+Mumbai', '_blank')}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.282!2d72.915!3d19.082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c7a1b1b1b1b1%3A0x1a1a1a1a1a1a1a1a!2sGhatkopar%20East%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'brightness(0.65) saturate(0.4) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mythos Fitness Location"
                className="pointer-events-none transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative flex flex-col items-center">
                    <div className="animate-bounce-slow">
                      <MapPin className="h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12 text-[#DC2626] drop-shadow-[0_0_12px_rgba(220,38,38,0.7)]" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-3 left-3 right-3 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="glass rounded-xl px-3 py-2 mx-auto max-w-[220px]">
                  <p className="text-xs font-semibold text-center">Mythos Fitness</p>
                  <p className="text-[10px] text-muted-foreground text-center">Ghatkopar East, Mumbai</p>
                  <p className="text-[10px] text-muted-foreground text-center">Contact us for membership details</p>
                </div>
              </div>
              <div className="absolute top-3 right-3 glass rounded-full px-3 py-1.5 flex items-center gap-1.5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Navigation className="h-3 w-3 text-primary" />
                <span className="text-[10px] font-medium">Directions</span>
              </div>
              <div className="absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-primary/20 transition-all duration-500 pointer-events-none" />
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <a
                href="https://wa.me/919226362409"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-strong rounded-xl p-4 md:p-5 flex items-center gap-3 md:gap-4 hover:border-green-500/30 transition-all duration-300 group border border-white/10"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                  <MessageCircle className="h-5 w-5 md:h-6 md:w-6 text-green-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] md:text-xs text-muted-foreground">Chat on</p>
                  <p className="text-sm md:font-semibold truncate">WhatsApp</p>
                </div>
              </a>

              <div className="glass-strong rounded-xl p-4 md:p-5 flex items-center gap-3 md:gap-4 border border-white/10">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] md:text-xs text-muted-foreground">Contact us for</p>
                  <p className="text-sm md:font-semibold truncate">Membership details</p>
                </div>
              </div>
            </div>

            <div className="glass-strong rounded-xl p-5 md:p-6 space-y-3 md:space-y-4 border border-white/10">
              <div className="flex items-start gap-3 text-xs md:text-sm">
                <MapPin className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-muted-foreground">N/R Brahmin Samaj Hall, Pranay Sudarshan A Wing, Joshi Lane, Ghatkopar East, Mumbai, Maharashtra 400077</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-xs md:text-sm">
                <Clock className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Working Hours</p>
                  <p className="text-muted-foreground">Mon-Sat: 6:00 AM - 1:00 PM & 4:00 PM - 11:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-xs md:text-sm">
                <MapPin className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Plus Code</p>
                  <p className="text-muted-foreground">3WJ4+P6 Mumbai, Maharashtra</p>
                </div>
              </div>
              <a href="tel:+919226362409" className="flex items-start gap-3 text-xs md:text-sm group">
                <MessageCircle className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Contact</p>
                  <p className="text-muted-foreground group-hover:text-primary transition-colors">+91 92263 62409</p>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-strong rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-8 border border-white/10 order-2"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-1">Start Your Transformation Today</h3>
            <p className="text-muted-foreground text-xs md:text-sm mb-6 md:mb-8">Free trial. No commitment. Just results.</p>

            <form className="space-y-3 md:space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full h-11 md:h-12 px-4 rounded-xl md:rounded-2xl bg-black/30 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full h-11 md:h-12 px-4 rounded-xl md:rounded-2xl bg-black/30 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all"
              />
              <select className="w-full h-11 md:h-12 px-4 rounded-xl md:rounded-2xl bg-black/30 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 text-sm text-foreground transition-all appearance-none">
                <option value="" className="bg-[#111]">Select Fitness Goal</option>
                <option value="weight-loss" className="bg-[#111]">Weight Loss</option>
                <option value="muscle-gain" className="bg-[#111]">Muscle Gain</option>
                <option value="toning" className="bg-[#111]">Toning &amp; Sculpting</option>
                <option value="endurance" className="bg-[#111]">Endurance &amp; Cardio</option>
                <option value="flexibility" className="bg-[#111]">Flexibility &amp; Mobility</option>
              </select>
              <select className="w-full h-11 md:h-12 px-4 rounded-xl md:rounded-2xl bg-black/30 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 text-sm text-foreground transition-all appearance-none">
                <option value="" className="bg-[#111]">Select Preferred Time</option>
                <option value="morning" className="bg-[#111]">Morning (6 - 9 AM)</option>
                <option value="mid-morning" className="bg-[#111]">Mid-Morning (9 - 11 AM)</option>
                <option value="afternoon" className="bg-[#111]">Afternoon (12 - 3 PM)</option>
                <option value="evening" className="bg-[#111]">Evening (4 - 7 PM)</option>
                <option value="night" className="bg-[#111]">Night (7 - 10 PM)</option>
              </select>
              <button
                type="submit"
                className="w-full h-12 md:h-14 rounded-xl md:rounded-2xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              >
                Book Free Trial
              </button>
            </form>

            <div className="grid grid-cols-3 gap-3 md:gap-4 mt-6 md:mt-8 pt-5 md:pt-6 border-t border-white/10">
              <div className="text-center">
                <div className="flex items-center justify-center gap-0.5 md:gap-1 text-red-500 mb-1">
                  <Star className="h-3 w-3 md:h-3.5 md:w-3.5 fill-red-500" />
                  <Star className="h-3 w-3 md:h-3.5 md:w-3.5 fill-red-500" />
                  <Star className="h-3 w-3 md:h-3.5 md:w-3.5 fill-red-500" />
                  <Star className="h-3 w-3 md:h-3.5 md:w-3.5 fill-red-500" />
                  <Star className="h-3 w-3 md:h-3.5 md:w-3.5 fill-red-500" />
                </div>
                <p className="text-base md:text-lg font-bold">4.5</p>
                <p className="text-[10px] md:text-[11px] text-muted-foreground">Google Rating</p>
              </div>
              <div className="text-center border-x border-white/10">
                <Users className="h-4 w-4 md:h-5 md:w-5 text-primary mx-auto mb-1" />
                <p className="text-base md:text-lg font-bold">100+</p>
                <p className="text-[10px] md:text-[11px] text-muted-foreground">Reviews</p>
              </div>
              <div className="text-center">
                <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-primary mx-auto mb-1" />
                <p className="text-base md:text-lg font-bold">500+</p>
                <p className="text-[10px] md:text-[11px] text-muted-foreground">Transformations</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}