import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import Magnetic from '../components/Magnetic.jsx';

// --- Navbar ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navLinks = ["About", "Services", "Work", "Testimonials", "Contact"];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl transition-all duration-500 ${
        scrolled
          ? "bg-[#0A0A0A]/90 backdrop-blur-xl border border-[#1E1E1E] shadow-2xl py-3 rounded-full"
          : "bg-transparent py-4"
      }`}
    >
      <div className="px-6 flex justify-between items-center">
        <Magnetic strength={0.2}>
          <a href="#home" className="text-lg font-extrabold tracking-tighter text-[#F0EAE2] flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full bg-[#E63946] shadow-[0_0_12px_rgba(230,57,70,0.5)]" />
            SAMRATEQ
          </a>
        </Magnetic>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Magnetic key={link} strength={0.3}>
              <a
                href={`#${link.toLowerCase()}`}
                className="text-sm font-semibold text-[#888] hover:text-[#F0EAE2] transition-colors duration-200 inline-block px-1 relative group"
              >
                {link}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#E63946] group-hover:w-full transition-all duration-300" />
              </a>
            </Magnetic>
          ))}
        </div>

        <div className="hidden md:block">
          <Magnetic strength={0.4}>
            <a
              href="#contact"
              className="text-sm font-bold bg-[#E63946] text-white px-6 py-2.5 rounded-full hover:bg-[#C62633] transition-colors inline-block shadow-[0_0_20px_rgba(230,57,70,0.25)]"
            >
              Get in touch
            </a>
          </Magnetic>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-[#F0EAE2] p-2">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden absolute top-full left-0 w-full mt-2 bg-[#111]/98 backdrop-blur-xl border border-[#1E1E1E] rounded-2xl overflow-hidden flex flex-col px-4 py-2 shadow-2xl"
        >
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="text-[#888] hover:text-[#F0EAE2] text-base font-semibold py-3.5 border-b border-[#1E1E1E] last:border-0 transition-colors"
            >
              {link}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="mt-4 mb-2 text-center text-sm font-bold bg-[#E63946] text-white px-5 py-3 rounded-full hover:bg-[#C62633] transition-colors"
          >
            Get in touch
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
};

// --- Hero Section ---
const HeroSection = () => {
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 600], [0, 160]);
  const opacityText = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.hero-orb', {
        y: -40, rotation: 8, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut"
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const stats = [
    { num: "10+", label: "Projects" },
    { num: "2+", label: "Years" },
    { num: "5+", label: "Clients" },
    { num: "15+", label: "Technologies" },
  ];

  const wordAnim = {
    hidden: { y: 120, opacity: 0, rotate: 4 },
    visible: (i) => ({
      y: 0, opacity: 1, rotate: 0,
      transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 + i * 0.12 }
    })
  };

  return (
    <section ref={heroRef} id="home" className="relative min-h-screen bg-[#0A0A0A] flex flex-col overflow-hidden">

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />

      {/* Decorative circles */}
      <div className="absolute top-1/2 right-[-18%] -translate-y-1/2 w-[750px] h-[750px] rounded-full border border-[#1A1A1A] pointer-events-none" />
      <div className="absolute top-1/2 right-[-12%] -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-[#E63946]/8 pointer-events-none" />

      {/* Warm glow */}
      <div className="hero-orb absolute top-[30%] right-[15%] w-[400px] h-[400px] rounded-full bg-[#E63946]/4 blur-[120px] pointer-events-none" />

      <Navbar />

      {/* Main content */}
      <motion.div
        className="relative z-10 flex-grow flex flex-col justify-center max-w-[1400px] mx-auto w-full px-6 md:px-14 pt-28 pb-4"
        style={{ y: yText, opacity: opacityText }}
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3 mb-10 md:mb-14"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E63946] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E63946]" />
          </span>
          <span className="font-mono text-[11px] md:text-xs tracking-[0.35em] text-[#888] uppercase">Available for freelance work</span>
          <div className="hidden sm:block h-px bg-[#1E1E1E] w-20" />
        </motion.div>

        {/* Headline */}
        <div className="overflow-hidden">
          <h1 className="font-extrabold tracking-tighter text-[#F0EAE2] leading-[0.88]"
            style={{ fontSize: 'clamp(3.2rem, 11vw, 12rem)' }}>
            <div className="overflow-hidden">
              <motion.div custom={0} variants={wordAnim} initial="hidden" animate="visible">
                CRAFTING
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div custom={1} variants={wordAnim} initial="hidden" animate="visible"
                className="font-serif italic text-[#E63946]">
                Digital
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div custom={2} variants={wordAnim} initial="hidden" animate="visible">
                EXPERIENCES.
              </motion.div>
            </div>
          </h1>
        </div>

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mt-12 md:mt-16"
        >
          <p className="text-[#666] text-base md:text-lg leading-relaxed font-medium max-w-sm">
            Full-Stack MERN developer building high-performance, visually stunning web applications with cinematic animations.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Magnetic strength={0.3}>
              <a href="#work"
                className="group inline-flex items-center gap-2 bg-[#E63946] text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-[#C62633] transition-all shadow-[0_0_30px_rgba(230,57,70,0.2)] hover:shadow-[0_0_40px_rgba(230,57,70,0.35)]">
                Explore Work
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a href="#contact"
                className="inline-flex items-center gap-2 border border-[#2A2A2A] text-[#888] px-8 py-4 rounded-full font-bold text-sm hover:border-[#E63946]/40 hover:text-[#F0EAE2] transition-all">
                Let's Talk
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.3 }}
        className="relative z-10 border-t border-[#1A1A1A] max-w-[1400px] mx-auto w-full px-6 md:px-14"
      >
        <div className="flex flex-wrap items-center gap-x-8 md:gap-x-12 gap-y-4 py-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 + i * 0.08 }}
              className="flex items-baseline gap-2"
            >
              <span className="text-2xl md:text-3xl font-extrabold text-[#F0EAE2] tracking-tight">{stat.num}</span>
              <span className="text-[10px] text-[#555] tracking-[0.2em] uppercase font-bold">{stat.label}</span>
            </motion.div>
          ))}

          {/* Vertical label on far right */}
          <div className="hidden xl:flex ml-auto items-center gap-2">
            <span
              className="text-[10px] tracking-[0.4em] text-[#333] uppercase font-bold"
              style={{ writingMode: 'vertical-rl' }}
            >
              FULL-STACK · MERN · CREATIVE
            </span>
            <div className="w-px h-12 bg-[#1E1E1E]" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

// --- Marquee ---
const Marquee = () => {
  const items = [
    "AVAILABLE FOR WORK",
    "FULL-STACK MERN DEVELOPER",
    "10+ PROJECTS DELIVERED",
    "REACT & NODE.JS",
    "GSAP & FRAMER MOTION",
    "REMOTE FRIENDLY",
    "UI/UX FOCUSED",
    "PREMIUM WEB EXPERIENCES",
  ];

  return (
    <div className="bg-[#0A0A0A] border-y border-[#1A1A1A] py-5 overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10" />
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center mx-8 shrink-0">
            <span className="font-mono font-bold tracking-[0.22em] text-xs text-[#333] uppercase hover:text-[#E63946] transition-colors duration-300">
              {item}
            </span>
            <span className="mx-8 text-[#E63946]/40 text-xs">✦</span>
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
      <Marquee />
    </>
  );
}
