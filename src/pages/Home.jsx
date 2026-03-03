import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X, Terminal, Code } from 'lucide-react';

// --- Navbar (Sleek Floating Pill) ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navLinks = ["About", "Services", "Work", "Testimonials", "Contact"];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl transition-all duration-300 ${scrolled ? "bg-[#0A0A0A]/70 backdrop-blur-xl border border-white/10 shadow-2xl py-3 rounded-full" : "bg-transparent py-4 border-transparent"
        }`}
    >
      <div className="px-6 flex justify-between items-center">
        <a href="#home" className="text-xl font-bold tracking-tighter text-white flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
          Samrateq
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              {link}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="text-sm font-medium bg-white text-black px-5 py-2 rounded-full hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
          >
            Get in touch
          </a>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full mt-2 bg-[#121212]/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden flex flex-col px-4 py-2 shadow-2xl"
          >
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white text-base font-medium py-3 border-b border-white/5 last:border-0">
                {link}
              </a>
            ))}
            <a href="#contact" onClick={() => setIsOpen(false)} className="mt-4 mb-2 text-center text-sm font-medium bg-white text-black px-5 py-2.5 rounded-full hover:bg-gray-200 transition-colors">
              Get in touch
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// --- Center-Aligned Premium Hero ---
const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20 overflow-hidden">
      {/* Premium Dark Gradients & Grid */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-500/15 rounded-full blur-[120px] opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none" />

      <Navbar />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide mb-8 backdrop-blur-sm shadow-[0_0_15px_rgba(16,185,129,0.1)]"
          whileHover={{ scale: 1.05 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          AVAILABLE FOR FREELANCE
        </motion.div>

        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tight text-white leading-[1.1] mb-6 drop-shadow-2xl">
          Crafting Digital<br />
          <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-300">
            Masterpieces.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10 font-light">
          I build high-performance, visually stunning web applications using the MERN stack and modern animation architectures.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-5">
          <a
            href="#work"
            className="group relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold text-black bg-white rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.15)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Work
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold text-white bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all hover:scale-105 active:scale-95 backdrop-blur-sm"
          >
            Let's Collaborate
          </a>
        </div>
      </motion.div>

      {/* Floating Ambient Elements */}
      <motion.div
        className="hidden md:flex absolute bottom-[15%] left-[10%] w-16 h-16 rounded-2xl bg-[#111] border border-white/5 shadow-2xl items-center justify-center text-gray-500"
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <Code size={20} />
      </motion.div>
      <motion.div
        className="hidden md:flex absolute top-[25%] right-[15%] w-14 h-14 rounded-full bg-emerald-900/20 border border-emerald-500/20 shadow-2xl items-center justify-center text-emerald-500 backdrop-blur-md"
        animate={{ y: [0, 25, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Terminal size={18} />
      </motion.div>
    </section>
  );
};

// --- Refined Marquee ---
const BrandsMarquee = () => {
  const brands = [
    "React Architecture", "Full-Stack MERN", "Creative Development", "System Design",
    "Interactive Experiences", "GSAP Animations", "Tailwind CSS Focus", "Scalable Interfaces"
  ];
  return (
    <div className="bg-[#0A0A0A] border-y border-white/5 py-8 overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10" />
      <motion.div
        className="flex whitespace-nowrap min-w-full"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      >
        {[...brands, ...brands, ...brands].map((brand, index) => (
          <div key={index} className="flex items-center mx-8 shrink-0">
            <span className="font-mono tracking-widest text-xs md:text-sm text-gray-500 uppercase">{brand}</span>
            <span className="mx-8 text-emerald-500/20 text-xs">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <BrandsMarquee />
    </>
  );
}
