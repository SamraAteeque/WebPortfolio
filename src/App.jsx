import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from '@studio-freight/lenis';

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Service from './pages/Service.jsx'
import Work from './pages/Work.jsx'
import Testimonial from './pages/Testimonial.jsx'
import CallToAction from './pages/CallToAction.jsx'
import Contact from './pages/Contact.jsx'
import Footer from './pages/Footer.jsx'
import Preloader from './components/Preloader.jsx'
import NoiseOverlay from './components/NoiseOverlay.jsx'

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState("default");

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target;
      if (target.closest("[data-cursor='drag']")) {
        setCursorState("drag");
      } else if (target.closest("[data-cursor='view']") || target.closest(".group\\/img")) {
        setCursorState("view");
      } else if (
        target.closest("a, button, [role='button'], select, input, textarea") ||
        window.getComputedStyle(target).getPropertyValue('cursor') === 'pointer'
      ) {
        setCursorState("hover");
      } else {
        setCursorState("default");
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  const cursorVariants = {
    default: {
      width: 10, height: 10,
      backgroundColor: "rgba(240, 234, 226, 1)",
      x: position.x - 5, y: position.y - 5,
      border: "0px solid transparent",
      mixBlendMode: "difference",
      transition: { type: 'spring', stiffness: 900, damping: 40, mass: 0.1 }
    },
    hover: {
      width: 56, height: 56,
      backgroundColor: "transparent",
      border: "1.5px solid rgba(230, 57, 70, 0.7)",
      x: position.x - 28, y: position.y - 28,
      mixBlendMode: "normal",
      transition: { type: 'spring', stiffness: 300, damping: 25 }
    },
    drag: {
      width: 72, height: 72,
      backgroundColor: "rgba(230, 57, 70, 0.9)",
      border: "0px solid transparent",
      x: position.x - 36, y: position.y - 36,
      mixBlendMode: "normal",
      transition: { type: 'spring', stiffness: 400, damping: 30 }
    },
    view: {
      width: 72, height: 72,
      backgroundColor: "rgba(230, 57, 70, 0.9)",
      border: "0px solid transparent",
      x: position.x - 36, y: position.y - 36,
      mixBlendMode: "normal",
      transition: { type: 'spring', stiffness: 400, damping: 30 }
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[99999] hidden md:flex items-center justify-center text-white font-bold text-[10px] tracking-widest uppercase overflow-hidden"
      variants={cursorVariants}
      animate={cursorState}
    >
      <AnimatePresence mode="wait">
        {cursorState === "drag" && (
          <motion.span key="drag" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}>Drag</motion.span>
        )}
        {cursorState === "view" && (
          <motion.span key="view" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}>View</motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      });
      function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
      requestAnimationFrame(raf);
      return () => { lenis.destroy(); };
    }
  }, [loading]);

  return (
    <div className={`bg-[#0A0A0A] text-[#F0EAE2] min-h-screen font-sans antialiased md:cursor-none selection:bg-[#E63946]/20 selection:text-[#E63946] ${loading ? 'overflow-hidden h-screen' : ''}`}>
      <CustomCursor />
      <NoiseOverlay />

      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <main className={`flex flex-col relative w-full overflow-hidden transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Home />
        <About />
        <Service />
        <Work />
        <Testimonial />
        <CallToAction />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

export default App;
