'use client';
import { useGSAP } from '../hooks/useGSAP';

export default function CallToAction() {
  const ref = useGSAP((gsap, ScrollTrigger, container) => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: container, start: 'top 75%', toggleActions: 'play none none none' },
    });
    tl.from(container.querySelector('.cta-label'), { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' });
    tl.from(container.querySelector('.cta-heading'), { opacity: 0, y: 60, duration: 1, ease: 'power3.out' }, '-=0.5');
    tl.from(container.querySelector('.cta-sub'), { opacity: 0, y: 40, duration: 0.9, ease: 'power3.out' }, '-=0.6');
    tl.from(container.querySelector('.cta-actions'), { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, '-=0.5');
  });

  return (
    <section className="relative py-40 px-6 md:px-16 overflow-hidden bg-[#050505]">
      <style>{`
        .cta-bg-glow { background: radial-gradient(ellipse at center, rgba(80,60,200,0.22) 0%, transparent 70%); }
        .cta-btn-primary { transition: transform .25s ease, box-shadow .25s ease; }
        .cta-btn-primary:hover { transform: scale(1.06); box-shadow: 0 0 40px 10px rgba(255,255,255,0.2); }
        .cta-btn-secondary { transition: background .25s ease, color .25s ease; }
        .cta-btn-secondary:hover { background: white; color: black; }
      `}</style>
      <div className="cta-bg-glow absolute inset-0 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-black italic uppercase text-white/[0.03] select-none whitespace-nowrap pointer-events-none"
        style={{ fontSize: 'clamp(5rem,18vw,18rem)', letterSpacing: '-0.04em' }}>
        NOCK
      </div>
      <div className="relative z-10 max-w-4xl mx-auto text-center" ref={ref}>
        <span className="cta-label block text-[11px] font-bold uppercase tracking-[0.5em] text-white/30 mb-6">Limited Time</span>
        <h2 className="cta-heading font-black text-white uppercase italic leading-none mb-8"
          style={{ fontSize: 'clamp(3rem,7vw,6.5rem)', letterSpacing: '-0.04em' }}>
          Upgrade Your <br />
          <span className="text-transparent" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.7)' }}>Style Today</span>
        </h2>
        <p className="cta-sub text-white/45 text-lg font-medium mb-14 max-w-2xl mx-auto">
          Join 50,000+ sneakerheads. Get early access to limited drops and members-only exclusive collections.
        </p>
        <div className="cta-actions flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="cta-btn-primary w-full sm:w-auto px-12 py-5 bg-white text-black font-black text-sm uppercase tracking-widest">Shop Now</button>
          <button className="cta-btn-secondary w-full sm:w-auto px-12 py-5 border border-white/25 text-white font-black text-sm uppercase tracking-widest">Join the Club</button>
        </div>
      </div>
    </section>
  );
}
