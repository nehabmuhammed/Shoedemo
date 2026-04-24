'use client';
import { useEffect, useRef } from 'react';

/**
 * Attach to a container ref. Every child with [data-reveal] will
 * fade-slide-up into view when it enters the viewport.
 * Optional staggerDelay (ms) staggers each child.
 */
export function useReveal(staggerDelay = 80) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const items = container.querySelectorAll('[data-reveal]');
    items.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      el.style.transition = `opacity 0.65s ease ${i * staggerDelay}ms, transform 0.65s ease ${i * staggerDelay}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = entry.target.querySelectorAll('[data-reveal]');
            els.forEach((el) => {
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [staggerDelay]);

  return ref;
}
