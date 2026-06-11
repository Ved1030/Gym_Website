'use client';

import { Dumbbell, MapPin, Phone, Mail, Clock, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-background">
      <div className="section-container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Dumbbell className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">
                <span className="text-primary">GLORIOUS</span>{' '}
                <span className="text-foreground/80">FITNESS</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Mumbai&apos;s premium fitness destination. Transform your body, unlock your potential
              with world-class trainers and equipment.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Plans', 'Trainers', 'Transformations', 'Testimonials', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>Ghatkopar East, Mumbai, Maharashtra</span>
              </li>
              <li>
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  <span>+91 98765 43210</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@gloriousfitness.com"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4 text-primary shrink-0" />
                  <span>info@gloriousfitness.com</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>Mon - Sat: 6:00 AM - 10:00 PM<br />Sun: 7:00 AM - 2:00 PM</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Follow Us</h3>
            <p className="text-sm text-muted-foreground">
              Stay connected on social media for fitness tips, transformations, and updates.
            </p>
              <div className="flex gap-3">
                {['Instagram', 'Facebook', 'YouTube', 'Twitter'].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="glass rounded-lg p-3 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300"
                    aria-label={platform}
                  >
                  <span className="text-xs font-medium">{platform[0]}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Glorious Fitness By Prashant Wadekar. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="glass rounded-full p-3 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
