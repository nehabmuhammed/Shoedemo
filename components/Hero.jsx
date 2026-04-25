'use client';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { useGSAP } from '../hooks/useGSAP';
import Shoe3D from './Shoe3D';

export default function Hero() {
  /* ─── Refs for each parallax depth layer ─── */
  const sectionRef = useRef(null);
  const bgLayerRef = useRef(null);   // Layer 1 – background gradient blob (slowest)
  const orbLayerRef = useRef(null);   // Layer 2 – glow orb          (medium)
  const sneakerRef = useRef(null);   // Layer 3 – sneaker image       (fastest)
  const textColRef = useRef(null);   // Text column subtle shift

  /* ─── Mouse tilt ─── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Reduced motion media query check
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let rafId;
    const MAX_TILT = 12; // px

    const onMouseMove = (e) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const { left, top, width, height } = section.getBoundingClientRect();
        const x = ((e.clientX - left) / width - 0.5) * 2; // -1 → 1
        const y = ((e.clientY - top) / height - 0.5) * 2; // -1 → 1

        // Sneaker reacts most to cursor (layer 3)
        if (sneakerRef.current) {
          sneakerRef.current.style.transform = `translate(${x * MAX_TILT}px, ${y * MAX_TILT * 0.6}px) rotate(-8deg)`;
        }
        // Orb drifts gently opposite (parallax feel)
        if (orbLayerRef.current) {
          orbLayerRef.current.style.transform = `translate(${x * -8}px, ${y * -8}px)`;
        }
        // Background barely moves
        if (bgLayerRef.current) {
          bgLayerRef.current.style.transform = `translate(${x * -3}px, ${y * -3}px)`;
        }
      });
    };

    const onMouseLeave = () => {
      cancelAnimationFrame(rafId);
      // Spring back to default on leave
      [sneakerRef, orbLayerRef, bgLayerRef].forEach((ref) => {
        if (ref.current) ref.current.style.transform = '';
      });
    };

    section.addEventListener('mousemove', onMouseMove);
    section.addEventListener('mouseleave', onMouseLeave);
    return () => {
      section.removeEventListener('mousemove', onMouseMove);
      section.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  /* ─── GSAP: entrance + scroll parallax ─── */
  useGSAP((gsap, ScrollTrigger, container) => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ── 1. Entrance animations ── */
    gsap.from('.hero-anim', {
      opacity: 0, y: 45,
      duration: 1.1, ease: 'power3.out', stagger: 0.14,
    });

    gsap.from(sneakerRef.current, {
      opacity: 0, x: 120, duration: 1.3, ease: 'power3.out', delay: 0.25,
    });

    gsap.from(orbLayerRef.current, {
      opacity: 0, scale: 0.7, duration: 1.6, ease: 'power2.out', delay: 0.1,
    });

    if (prefersReduced) {
      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }

    /* ── 2. Scroll-scrub parallax (3 depth layers) ── */
    const st = { trigger: container, start: 'top top', end: 'bottom top', scrub: 1.8 };

    // Layer 1 – background blob: drifts down (opposite direction = depth)
    gsap.to(bgLayerRef.current, { y: 60, ease: 'none', scrollTrigger: st });

    // Layer 2 – orb: medium drift upward + slight lateral
    gsap.to(orbLayerRef.current, { y: -50, x: -30, ease: 'none', scrollTrigger: st });

    // Layer 3 – sneaker: fastest, moves up + subtle scale + subtle rotation
    gsap.to(sneakerRef.current, {
      y: -120, scale: 1.08, rotation: -4,
      ease: 'none', scrollTrigger: { ...st, scrub: 1 },
    });

    // Text column: soft upward shift (smallest movement)
    gsap.to(textColRef.current, { y: -40, ease: 'none', scrollTrigger: st });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  });

  return (
    <>
      <style>{`
        @keyframes floatSneaker {
          0%, 100% { transform: translateY(0px) rotate(-8deg); }
          50%       { transform: translateY(-18px) rotate(-8deg); }
        }
        @keyframes breatheOrb {
          0%, 100% { opacity: 0.18; transform: scale(1); }
          50%       { opacity: 0.28; transform: scale(1.12); }
        }
        @keyframes driftGradient {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .hero-section-bg {
          background: radial-gradient(ellipse at 70% 50%, #1a1a2e 0%, #0d0d0d 55%, #000 100%);
        }
        .orb-main {
          animation: breatheOrb 5s ease-in-out infinite;
          will-change: transform, opacity;
        }
        .orb-secondary {
          animation: breatheOrb 7s ease-in-out infinite reverse;
          will-change: transform, opacity;
        }
        .sneaker-float {
          animation: floatSneaker 5.5s ease-in-out infinite;
          will-change: transform;
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .bg-layer {
          will-change: transform;
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .orb-layer {
          will-change: transform;
          transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .btn-shop:hover  { transform: scale(1.06); box-shadow: 0 0 32px 8px rgba(255,255,255,0.22); }
        .btn-explore:hover { background: white; color: black; }
        .btn-shop, .btn-explore { transition: all 0.25s ease; }

        /* Animated conic sweep light on bg */
        .hero-conic-sweep {
          background: conic-gradient(from 0deg at 70% 50%, transparent 0deg, rgba(90,80,200,0.06) 30deg, transparent 60deg);
          animation: rotateSlow 18s linear infinite;
          transform-origin: 70% 50%;
        }
      `}</style>

      <section
        ref={sectionRef}
        id="home"
        className="hero-section-bg relative min-h-screen w-full flex items-center overflow-hidden"
      >
        {/* ════ LAYER 1: Background atmosphere ════ */}
        <div ref={bgLayerRef} className="bg-layer absolute inset-0 pointer-events-none">
          {/* Animated conic sweep */}
          <div className="hero-conic-sweep absolute inset-0 opacity-60" />

          {/* Noise grain */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: '160px 160px',
            }}
          />

          {/* Top-left accent vignette */}
          <div className="absolute -top-1/4 -left-1/4 w-[60vw] h-[60vw] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(30,20,80,0.35) 0%, transparent 70%)' }} />
        </div>

        {/* ════ LAYER 2: Orb / glow elements ════ */}
        <div ref={orbLayerRef} className="orb-layer absolute inset-0 pointer-events-none">
          {/* Main right-side orb */}
          <div className="orb-main absolute top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
            style={{
              right: '-80px',
              background: 'radial-gradient(circle, rgba(90,90,200,0.18) 0%, transparent 70%)',
            }}
          />
          {/* Secondary smaller orb — creates depth */}
          <div className="orb-secondary absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(120,80,240,0.1) 0%, transparent 70%)' }}
          />
          {/* Ring accents */}
          <div className="absolute top-1/2 right-[5%] -translate-y-1/2 w-[480px] h-[480px] rounded-full border border-white/5"
            style={{ boxShadow: 'inset 0 0 120px rgba(255,255,255,0.03)' }}
          />
          <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-white/5" />
        </div>

        {/* ════ Content grid ════ */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 grid grid-cols-1 lg:grid-cols-2 items-start gap-12 pt-40 pb-32">

          {/* LEFT: Text (Layer 0.5 – subtle parallax) */}
          <div ref={textColRef} className="flex flex-col items-start">
            <div className="hero-anim flex items-center gap-3 mb-8">
              <span className="inline-block w-8 h-[2px] bg-white/50" />
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-white/50">New Season — 2024 Drop</span>
            </div>

            <h1 className="hero-anim font-black text-white leading-[0.9] uppercase mb-8"
              style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)', letterSpacing: '-0.03em' }}>
              Step Into<br />
              <span className="text-transparent" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}>The Future</span>
            </h1>

            <p className="hero-anim text-white/60 font-medium leading-relaxed mb-12 max-w-md"
              style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)' }}>
              Engineered for the streets. Built for the relentless. Every step you take is a statement — make it count.
            </p>

            <div className="hero-anim flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-16">
              <button className="btn-shop px-10 py-4 bg-white text-black text-sm font-black uppercase tracking-widest">Shop Now</button>
              <button className="btn-explore px-10 py-4 border border-white/30 text-white text-sm font-black uppercase tracking-widest">Explore</button>
            </div>

            <div className="hero-anim flex items-center gap-10 border-t border-white/10 pt-8">
              {[['50K+', 'Happy Customers'], ['200+', 'Exclusive Designs'], ['12', 'Countries']].map(([num, label]) => (
                <div key={label}>
                  <span className="block text-2xl font-black text-white uppercase">{num}</span>
                  <span className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mt-1">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Sneaker (Layer 3 – fastest) */}
          <div className="relative flex items-start justify-center lg:justify-end lg:pt-8">
            {/* Sneaker */}
            <div
              ref={sneakerRef}
              className="sneaker-float relative z-10 w-full"
              style={{ height: '480px', maxWidth: '560px' }}
            >
              <Shoe3D />
            </div>

            {/* Price card */}
            <div className="absolute bottom-12 left-4 lg:left-0 bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-4 flex items-center gap-4 hero-anim">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-lg">👟</div>
              <div>
                <span className="block text-[10px] font-bold text-white/50 uppercase tracking-widest">Featured Drop</span>
                <span className="block text-base font-black text-white">Air Nock Max — $190</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-[9px] font-bold text-white uppercase tracking-[0.4em]">Scroll</span>
          <div className="w-[1px] h-10 bg-white/60" />
        </div>
      </section>
    </>
  );
}
