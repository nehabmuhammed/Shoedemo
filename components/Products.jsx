'use client';
import { useGSAP } from '../hooks/useGSAP';

const shoes = [
  { id: 1, name: 'Air Nock Max',      price: '$190', category: 'Basketball', badge: 'New' },
  { id: 2, name: 'Cloud Runner X',    price: '$145', category: 'Running',    badge: null },
  { id: 3, name: 'Urban Glide Low',   price: '$110', category: 'Casual',     badge: 'Sale' },
  { id: 4, name: 'Neon Strike High',  price: '$175', category: 'Limited',    badge: 'Hot' },
  { id: 5, name: 'Vortex Mesh',       price: '$130', category: 'Training',   badge: null },
  { id: 6, name: 'Classic Street 77', price: '$95',  category: 'Lifestyle',  badge: null },
  { id: 7, name: 'Peak Pro V2',       price: '$210', category: 'Performance',badge: 'New' },
  { id: 8, name: 'Shadow Walker',     price: '$125', category: 'Streetwear', badge: null },
];
const badgeColor = { New: 'bg-blue-500', Sale: 'bg-red-500', Hot: 'bg-orange-500' };

export default function Products() {
  const ref = useGSAP((gsap, ScrollTrigger, container) => {
    // Header from left
    gsap.from(container.querySelector('.prod-header'), {
      opacity: 0, x: -80, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: container, start: 'top 80%', toggleActions: 'play none none none' },
    });

    // Cards staggered from bottom
    gsap.from(container.querySelectorAll('.prod-card'), {
      opacity: 0, y: 80, duration: 0.9, ease: 'power3.out',
      stagger: 0.09,
      scrollTrigger: { trigger: container.querySelector('.prod-grid'), start: 'top 80%', toggleActions: 'play none none none' },
    });

    // View all button from bottom
    gsap.from(container.querySelector('.prod-viewall'), {
      opacity: 0, y: 40, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: container.querySelector('.prod-viewall'), start: 'top 90%', toggleActions: 'play none none none' },
    });
  });

  return (
    <section id="shop" className="py-32 px-6 md:px-16 bg-[#080808]">
      <style>{`
        .product-card .card-img { transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94); }
        .product-card:hover .card-img { transform: scale(1.08); }
        .product-card .card-actions { transform: translateY(56px); opacity: 0; transition: transform 0.35s ease, opacity 0.35s ease; }
        .product-card:hover .card-actions { transform: translateY(0); opacity: 1; }
        .product-card { transition: box-shadow 0.3s ease, transform 0.3s ease; }
        .product-card:hover { box-shadow: 0 0 40px rgba(100,80,255,0.15); transform: translateY(-4px); }
        .btn-cart:hover { background: white; color: black; }
        .btn-cart { transition: all 0.2s ease; }
      `}</style>

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <div className="prod-header flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-[0.4em] text-white/30 mb-3">Latest Drops</span>
            <h2 className="font-black text-white uppercase italic leading-none"
              style={{ fontSize: 'clamp(2.5rem,5vw,4.5rem)', letterSpacing: '-0.03em' }}>
              Featured <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.6)' }}>Kicks</span>
            </h2>
          </div>
          <div className="flex gap-6">
            {['All', 'New', 'Sale', 'Limited'].map((f) => (
              <button key={f}
                className={`text-[11px] font-black uppercase tracking-widest pb-1 transition-colors ${f === 'All' ? 'text-white border-b-2 border-white' : 'text-white/30 hover:text-white/70'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="prod-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {shoes.map((shoe) => (
            <div key={shoe.id}
              className="prod-card product-card group cursor-pointer relative bg-[#111] border border-white/5 overflow-hidden">
              {shoe.badge && (
                <span className={`absolute top-4 left-4 z-20 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-white ${badgeColor[shoe.badge]}`}>
                  {shoe.badge}
                </span>
              )}
              <div className="relative aspect-square overflow-hidden bg-[#161616]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e]/40 to-transparent z-10 pointer-events-none" />
                <div className="card-img w-full h-full"
                  style={{
                    backgroundImage: 'url(/product-grid.png)',
                    backgroundSize: '200% 200%',
                    backgroundPosition: shoe.id % 2 === 0 ? '100% 100%' : '0% 0%',
                  }}
                />
                <div className="card-actions absolute bottom-0 left-0 right-0 z-20 flex gap-2 p-4">
                  <button className="btn-cart flex-1 py-3 border border-white text-white text-[10px] font-black uppercase tracking-widest">Add to Cart</button>
                  <button className="w-12 flex-shrink-0 py-3 bg-white/10 border border-white/20 text-white text-[11px] flex items-center justify-center hover:bg-white/20 transition-colors">♡</button>
                </div>
              </div>
              <div className="p-5 flex items-end justify-between">
                <div>
                  <span className="block text-[9px] font-bold uppercase tracking-[0.25em] text-white/30 mb-1">{shoe.category}</span>
                  <h3 className="text-sm font-black text-white uppercase tracking-tight">{shoe.name}</h3>
                </div>
                <span className="text-base font-black text-white">{shoe.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="prod-viewall text-center mt-16">
          <button className="px-12 py-4 border border-white/20 text-white text-[11px] font-black uppercase tracking-widest hover:border-white hover:bg-white hover:text-black transition-all duration-300">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}
