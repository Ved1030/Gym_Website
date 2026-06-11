'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '919876543210';
const WHATSAPP_MESSAGE = 'Hi! I want to know more about Glorious Fitness.';

export default function FloatingWhatsApp() {
  return (
    <motion.a
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2.5, type: 'spring', stiffness: 200 }}
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group"
    >
      <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#25d366] to-[#128C7E] flex items-center justify-center shadow-lg shadow-[#25d366]/30 hover:shadow-[#25d366]/50 hover:scale-105 transition-all">
        <div className="absolute inset-0 rounded-full bg-[#25d366]/40 blur-md animate-pulse-ring" />
        <MessageCircle className="h-6 w-6 text-white relative z-10" />
      </div>
    </motion.a>
  );
}
