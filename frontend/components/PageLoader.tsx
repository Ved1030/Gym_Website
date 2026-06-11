'use client';

import { motion } from 'framer-motion';
import { Dumbbell } from 'lucide-react';

export default function PageLoader() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Dumbbell className="h-16 w-16 text-primary" />
      </motion.div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 200 }}
        transition={{ duration: 1.8, ease: 'easeInOut' }}
        className="h-0.5 bg-gradient-to-r from-primary to-primary/50 mt-8 rounded-full"
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-sm text-muted-foreground tracking-widest uppercase"
      >
        Glorious Fitness
      </motion.p>
    </motion.div>
  );
}
