'use client';
import { useGSAP } from '../hooks/useGSAP';

const features = [
  { id: 1, icon: '🚚', title: 'Free Shipping',   description: 'Complimentary delivery on all orders over $150. Fast, tracked, and insured worldwide.' },
  { id: 2, icon: '🔄', title: 'Easy Returns',    description: '30-day hassle-free returns. No questions asked — your satisfaction guaranteed.' },
  { id: 3, icon: '⭐', title: 'Premium Quality', description: 'Every pair built with aerospace-grade materials for performance that lasts.' },
  { id: 4, icon: '🔒', title: 'Secure Payment',  description: '256-bit SSL encryption. Multiple payment options including crypto and installments.' },
];

export default function Features() {
  const ref = useGSAP((gsap, ScrollTrigger, container) => {
    gsap.from(container.querySelector('.feat-header'), {
      opacity: 0, y: 50, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: container, start: 'top 80%', toggleActions: 'play none none none' },
    });
    gsap.from(container.querySelectorAll('.feat-card'), {
      opacity: 0, y: 60, scale: 0.96, duration: 0.9, ease: 'power3.out', stagger: 0.12,
      scrollTrigger: { trigger: container.querySelector('.feat-grid'), start: 'top 82%', toggleActions: 'play none none none' },
    });
  });

  return (
    <section className="py-32 px-6 md:px-16 bg-[#080808] border-y border-white/5">
      <style>{`
        .feat-card { transition: border-color .3s ease, box-shadow .3s ease, transform .3s ease; }
        .feat-card:hover { border-color: rgba(255,255,255,0.15) !important; box-shadow: 0 0 48px rgba(100,80,255,0.12); transform: translateY(-6px); }
        .feat-icon { transition: transform .3s ease; }
        .feat-card:hover .feat-icon { transform: scale(1.2); }
        .feat-line { transition: width .5s ease; width: 2rem; }
        .feat-card:hover .feat-line { width: 100%; }
      `}</style>
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="feat-header text-center mb-20">
          <span className="block text-[11px] font-bold uppercase tracking-[0.4em] text-white/30 mb-3">Why Nock Kicks</span>
          <h2 className="font-black text-white uppercase italic leading-none"
            style={{ fontSize: 'clamp(2.5rem,5vw,4.5rem)', letterSpacing: '-0.03em' }}>
            Built <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.6)' }}>Different</span>
          </h2>
        </div>
        <div className="feat-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <div key={f.id} className="feat-card group p-8 bg-[#0f0f0f] border border-white/5 flex flex-col">
              <div className="feat-icon text-4xl mb-8">{f.icon}</div>
              <h3 className="text-base font-black text-white uppercase italic tracking-tight mb-4">{f.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed font-medium">{f.description}</p>
              <div className="mt-auto pt-8">
                <div className="feat-line h-[1px] bg-white/20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
