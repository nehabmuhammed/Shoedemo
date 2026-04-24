'use client';
import { useEffect, useRef } from 'react';

/**
 * Thin wrapper that handles GSAP + ScrollTrigger registration.
 * Accepts a callback: (gsap, ScrollTrigger, container) => cleanup?
 * The container ref is returned so you can attach it to a DOM node.
 */
export function useGSAP(callback, deps = []) {
  const ref = useRef(null);

  useEffect(() => {
    let cleanup;

    async function run() {
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger }  = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (ref.current) {
        cleanup = callback(gsap, ScrollTrigger, ref.current);
      }
    }

    run();

    return () => {
      if (typeof cleanup === 'function') cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
