'use client';
import Image from 'next/image';
import { useGSAP } from '../hooks/useGSAP';

const stats = [['50K+', 'Customers'], ['200+', 'Designs'], ['12', 'Countries']];

export default function About() {
  const ref = useGSAP((gsap, ScrollTrigger, container) => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: container, start: 'top 75%', toggleActions: 'play none none none' },
    });

    tl.from(container.querySelector('.about-img'), { opacity: 0, x: -100, duration: 1.1, ease: 'power3.out' });
    tl.from(container.querySelectorAll('.about-text-item'), { opacity: 0, x: 80, duration: 0.95, ease: 'power3.out', stagger: 0.12 }, '-=0.7');
    tl.from(container.querySelectorAll('.about-stat'), { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out', stagger: 0.1 }, '-=0.5');

    gsap.to(container.querySelector('.about-img-inner'), {
      y: -40, ease: 'none',
      scrollTrigger: { trigger: container, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
    });
  });

  return (
    <section id="about" className="py-32 px-6 md:px-16 bg-[#050505]">
      <style>{`.about-img-wrap{overflow:hidden}.about-img-wrap:hover .about-img-inner{transform:scale(1.04)}.about-img-inner{transition:transform .6s ease}`}</style>
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="about-img relative">
            <div className="absolute -top-5 -left-5 w-full h-full border border-white/8 pointer-events-none" />
            <div className="about-img-wrap relative aspect-[4/3] bg-[#0f0f0f] border border-white/5">
              <div className="about-img-inner w-full h-full relative">
                <Image src="/hero-sneaker.png" alt="Nock Kicks Brand Story" fill className="object-cover opacity-80" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.7) 0%, transparent 60%)' }} />
              </div>
            </div>
            <div className="absolute bottom-8 right-8 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-4">
              <span className="block text-[9px] font-bold text-white/40 uppercase tracking-[0.3em] mb-1">Est.</span>
              <span className="block text-3xl font-black text-white italic">2024</span>
            </div>
          </div>
          <div>
            <span className="about-text-item block text-[11px] font-bold uppercase tracking-[0.4em] text-white/30 mb-6">Our Story</span>
            <h2 className="about-text-item font-black text-white uppercase italic leading-none mb-8"
              style={{ fontSize: 'clamp(2.5rem,4.5vw,4.5rem)', letterSpacing: '-0.03em' }}>
              Not Just a Brand,<br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.6)' }}>A Lifestyle.</span>
            </h2>
            <p className="about-text-item text-white/50 text-base font-medium leading-relaxed mb-6 max-w-lg">
              Nock Kicks was born from the streets, for the streets. We don't just sell sneakers — we curate a culture. Our mission is to provide the youth with footwear that speaks as loud as their ambitions.
            </p>
            <p className="about-text-item text-white/35 text-sm font-medium leading-relaxed mb-12 max-w-lg">
              Every pair in our collection is a testament to quality, innovation, and self-expression. From limited drops to everyday essentials, we ensure you always stand out.
            </p>
            <div className="flex items-center gap-10 border-t border-white/8 pt-10">
              {stats.map(([num, label]) => (
                <div key={label} className="about-stat">
                  <span className="block font-black text-white uppercase italic"
                    style={{ fontSize: 'clamp(1.8rem,2.5vw,2.8rem)', letterSpacing: '-0.03em' }}>{num}</span>
                  <span className="block text-[9px] font-bold text-white/30 uppercase tracking-[0.25em] mt-1">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
