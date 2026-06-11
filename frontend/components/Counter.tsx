'use client';

import { useEffect, useRef, useState } from 'react';

interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
  decimals?: number;
}

export default function Counter({ from = 0, to, duration = 2, decimals = 0 }: CounterProps) {
  const [value, setValue] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = (Date.now() - startTime) / 1000;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(from + (to - from) * eased);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [from, to, duration]);

  return <span ref={ref}>{value.toFixed(decimals)}</span>;
}
