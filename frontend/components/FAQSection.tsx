'use client';

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

const faqs = [
  { q: 'What are your operating hours?', a: 'We are open daily from 6:00 AM to 11:00 PM.' },
  { q: 'Do you offer a free trial?', a: 'Yes! We offer a free trial period. Fill out the form on this page to schedule your first session.' },
  { q: 'What equipment do you have?', a: 'We have state-of-the-art equipment including power racks, free weights, cable machines, treadmills, bikes, rowing machines, and functional training gear.' },
  { q: 'Do you provide personal training?', a: 'Absolutely. We have certified personal trainers available for one-on-one sessions. Our Pro and Elite plans include PT sessions.' },
  { q: 'Is there parking available?', a: 'Yes, we have dedicated parking space for our members.' },
  { q: 'Can I freeze my membership?', a: 'Yes, we offer flexible freeze options. Contact our team for details.' },
  { q: 'Do you have a ladies gym section?', a: 'Yes, we have a separate dedicated ladies gym section with specialized equipment and female trainers.' },
  { q: 'What safety measures are in place?', a: 'We maintain the highest standards of cleanliness. Our equipment is sanitized regularly, and the facility is well-ventilated.' },
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-20 lg:py-28 relative">
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
            FAQ
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="glass rounded-xl px-4 border border-border">
                <AccordionTrigger className="text-sm font-medium text-left hover:text-primary">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
