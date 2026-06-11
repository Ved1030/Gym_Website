'use client';

import { useEffect, useState } from 'react';
import { Dumbbell } from 'lucide-react';

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 2));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center">
      <div className="relative">
        <Dumbbell className="h-12 w-12 text-primary animate-pulse" />
        <div className="absolute -inset-4 rounded-full bg-primary/5 animate-ping" />
      </div>
      <div className="mt-8 w-48 h-1 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">Loading Glorious Fitness...</p>
    </div>
  );
}
