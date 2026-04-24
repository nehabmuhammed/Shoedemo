'use client';
import { useGSAP } from '../hooks/useGSAP';

const categories = [
  { id: 1, name: 'Running',         count: '124 Items', pos: '20% 60%' },
  { id: 2, name: 'Casual',          count: '86 Items',  pos: '70% 30%' },
  { id: 3, name: 'Streetwear',      count: '52 Items',  pos: '30% 80%' },
  { id: 4, name: 'Limited Edition', count: '14 Items',  pos: '80% 70%' },
];

export default function Collections() {
  const ref = useGSAP((gsap, ScrollTrigger, container) => {
    // Header from right
    gsap.from(container.querySelector('.col-header'), {
      opacity: 0, x: 80, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: container, start: 'top 80%', toggleActions: 'play none none none' },
    });

    // Cards alternate from left/right + bottom
    const cards = container.querySelectorAll('.col-card');
    cards.forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        x: i % 2 === 0 ? -60 : 60,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        delay: i * 0.1,
        scrollTrigger: { trigger: container.querySelector('.col-grid'), start: 'top 80%', toggleActions: 'play none none none' },
      });
    });
  });

  return (
    <section id="collections" className="py-32 px-6 md:px-16 bg-[#050505]">
      <style>{`
        .col-card .col-bg { transition: transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94); }
        .col-card:hover .col-bg { transform: scale(1.08); }
        .col-card .col-overlay { transition: opacity 0.4s ease; }
        .col-card:hover .col-overlay { opacity: 0.75 !important; }
        .col-card .col-btn { transform: translateY(20px); opacity: 0; transition: transform 0.35s ease 0.05s, opacity 0.35s ease 0.05s; }
        .col-card:hover .col-btn { transform: translateY(0); opacity: 1; }
      `}</style>

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <div className="col-header text-center mb-20">
          <span className="block text-[11px] font-bold uppercase tracking-[0.4em] text-white/30 mb-3">Shop by Style</span>
          <h2 className="font-black text-white uppercase italic leading-none"
            style={{ fontSize: 'clamp(2.5rem,5vw,4.5rem)', letterSpacing: '-0.03em' }}>
            Our <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.6)' }}>Collections</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="col-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div key={cat.id}
              className="col-card group relative cursor-pointer overflow-hidden aspect-[3/4] border border-white/5">
              <div className="col-bg absolute inset-0"
                style={{
                  backgroundImage: 'url(/collections-banner.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: cat.pos,
                }}
              />
              <div className="col-overlay absolute inset-0 opacity-60"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)' }}
              />
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-8">
                <span className="block text-[9px] font-bold uppercase tracking-[0.3em] text-white/40 mb-2">{cat.count}</span>
                <h3 className="font-black text-white uppercase italic leading-none mb-6"
                  style={{ fontSize: 'clamp(1.6rem,2.5vw,2.2rem)', letterSpacing: '-0.02em' }}>
                  {cat.name}
                </h3>
                <button className="col-btn w-full py-3 border border-white/40 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-200">
                  Explore
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
