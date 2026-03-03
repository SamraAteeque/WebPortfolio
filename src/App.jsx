import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Lenis from '@studio-freight/lenis';
// ...
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Service from './pages/Service.jsx'
import Work from './pages/Work.jsx'
import Testimonial from './pages/Testimonial.jsx'
import CallToAction from './pages/CallToAction.jsx' /* NEWLY ADDED */
import Contact from './pages/Contact.jsx'
import Footer from './pages/Footer.jsx'

// --- Global Custom Cursor Component ---
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target;
      if (target.closest("a, button, [role='button']") || window.getComputedStyle(target).getPropertyValue('cursor') === 'pointer') {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  const cursorVariants = {
    default: {
      width: 8, height: 8, backgroundColor: "rgba(16, 185, 129, 0.8)", // subtle emerald dot
      x: position.x - 4, y: position.y - 4,
      transition: { type: 'spring', stiffness: 1000, damping: 50, mass: 0.1 }
    },
    hover: {
      width: 48, height: 48, backgroundColor: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)",
      x: position.x - 24, y: position.y - 24,
      transition: { type: 'spring', stiffness: 500, damping: 28 }
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[99999] hidden md:block"
      variants={cursorVariants}
      animate={isHovering ? "hover" : "default"}
    />
  );
};

function App() {
  useEffect(() => {
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

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-[#0A0A0A] text-gray-200 min-h-screen font-sans antialiased md:cursor-none selection:bg-emerald-500/30">
      <CustomCursor />
      <main className="flex flex-col relative w-full overflow-hidden">
        <Home />
        <About />
        <Service />
        <Work />
        <Testimonial />
        <CallToAction /> {/* NEWLY ADDED */}
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

export default App;
