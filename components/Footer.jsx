'use client';
import Link from 'next/link';
import { useGSAP } from '../hooks/useGSAP';

const shopLinks    = ['New Arrivals', 'Best Sellers', 'Sale', 'Collections'];
const supportLinks = ['Order Status', 'Shipping & Returns', 'Size Guide', 'Contact Us'];

export default function Footer() {
  const ref = useGSAP((gsap, ScrollTrigger, container) => {
    gsap.from(container.querySelectorAll('.footer-col'), {
      opacity: 0, y: 50, duration: 0.9, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: container, start: 'top 90%', toggleActions: 'play none none none' },
    });
    gsap.from(container.querySelector('.footer-bottom'), {
      opacity: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: container.querySelector('.footer-bottom'), start: 'top 98%', toggleActions: 'play none none none' },
    });
  });

  return (
    <footer id="contact" className="bg-[#080808] border-t border-white/5 pt-20 pb-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="footer-col lg:col-span-1">
            <div className="font-black text-white uppercase italic tracking-tighter text-2xl mb-5">NOCK KICKS</div>
            <p className="text-white/35 text-sm font-medium leading-relaxed mb-8 max-w-xs">
              Redefining footwear for the modern era. Quality, culture, and community in every step.
            </p>
            <div className="flex space-x-3">
              {['𝕏', 'IG', 'TT'].map((s) => (
                <div key={s} className="w-9 h-9 bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black text-white/50 cursor-pointer hover:bg-white hover:text-black hover:border-white transition-all duration-200">
                  {s}
                </div>
              ))}
            </div>
          </div>
          <div className="footer-col">
            <h4 className="font-black text-white uppercase italic text-sm tracking-widest mb-7">Shop</h4>
            <ul className="space-y-3">
              {shopLinks.map((l) => (
                <li key={l}><Link href="#" className="text-white/35 font-bold text-xs uppercase tracking-wide hover:text-white transition-colors duration-200">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="font-black text-white uppercase italic text-sm tracking-widest mb-7">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((l) => (
                <li key={l}><Link href="#" className="text-white/35 font-bold text-xs uppercase tracking-wide hover:text-white transition-colors duration-200">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="font-black text-white uppercase italic text-sm tracking-widest mb-7">Contact</h4>
            <ul className="space-y-3 text-white/35 font-bold text-xs uppercase tracking-wide">
              <li>123 Sneaker St, Metro City</li>
              <li>support@nockkicks.com</li>
              <li>+1 (555) 000-0000</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} NOCK KICKS. All rights reserved.
          </p>
          <div className="flex gap-8">
            {['Privacy Policy', 'Terms of Service'].map((l) => (
              <Link key={l} href="#" className="text-[10px] font-bold text-white/20 uppercase tracking-widest hover:text-white/60 transition-colors">{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
