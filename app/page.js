import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Products from '../components/Products';
import Collections from '../components/Collections';
import About from '../components/About';
import Features from '../components/Features';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black font-sans scroll-smooth">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Products />
        <Collections />
        <About />
        <Features />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
