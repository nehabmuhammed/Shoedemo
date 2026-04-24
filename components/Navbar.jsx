'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-5 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(10,10,10,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
      }}
    >
      {/* Logo */}
      <div className="text-xl font-black text-white uppercase italic tracking-tighter">
        <Link href="/">NOCK KICKS</Link>
      </div>

      {/* Links */}
      <div className="hidden md:flex space-x-8 text-[11px] font-bold text-white/60 uppercase tracking-[0.18em]">
        {['Home', 'Shop', 'Collections', 'About', 'Contact'].map((item) => (
          <Link
            key={item}
            href={`#${item.toLowerCase()}`}
            className="hover:text-white transition-colors duration-200"
          >
            {item}
          </Link>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        <div className="relative cursor-pointer p-2 hover:bg-white/10 rounded-full transition-colors">
          <span className="text-lg">🛒</span>
          <span className="absolute top-0 right-0 bg-white text-black text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full">0</span>
        </div>
        <button className="hidden sm:block px-5 py-2 bg-white text-black text-[11px] font-black uppercase tracking-widest hover:bg-white/90 transition-colors">
          Login
        </button>
      </div>
    </nav>
  );
}
