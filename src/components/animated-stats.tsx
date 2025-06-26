"use client";

import { useEffect, useState, useRef } from 'react';

const AnimatedStats = () => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const baseCount = 1096;
    const incrementPerDay = 5;
    const launchDate = new Date('2024-06-01T00:00:00Z');
    const now = new Date();
    const timeDiff = now.getTime() - launchDate.getTime();
    const daysSinceLaunch = Math.max(0, Math.floor(timeDiff / (1000 * 60 * 60 * 24)));
    const endValue = baseCount + (daysSinceLaunch * incrementPerDay);
    const duration = 2500;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          if (start === endValue) {
            setCount(endValue);
            return;
          };

          let startTime: number | null = null;

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const currentCount = Math.floor(progress * (endValue - start) + start);
            setCount(currentCount);
            if (progress < 1) {
              window.requestAnimationFrame(animate);
            } else {
              setCount(endValue);
            }
          };
          window.requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section className="bg-secondary/50 py-20" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          CVs Upgraded and Counting
        </h2>
        <div className="mt-8 text-5xl font-bold text-primary md:text-7xl">
          {count.toLocaleString()}
        </div>
        <p className="mt-4 text-lg text-muted-foreground">
          We’ve helped over 1,000 professionals elevate their careers — and counting.
        </p>
      </div>
    </section>
  );
};

export default AnimatedStats;
