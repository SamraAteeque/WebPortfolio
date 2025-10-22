"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// --- Custom Cursor Component (Light Theme) ---
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target;
      if (
        target.closest("a, button, [role='button']") ||
        window.getComputedStyle(target).getPropertyValue("cursor") === "pointer"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  const cursorVariants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: "rgba(0,0,0,0.05)",
      border: "1px solid rgba(0,0,0,0.1)",
      x: position.x - 16,
      y: position.y - 16,
    },
    hover: {
      width: 64,
      height: 64,
      backgroundColor: "rgba(52,211,153,0.1)",
      border: "1px solid rgba(52,211,153,0.3)",
      x: position.x - 32,
      y: position.y - 32,
    },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block"
      variants={cursorVariants}
      animate={isHovering ? "hover" : "default"}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    />
  );
};

// --- Main App Component ---
export default function App() {
  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans antialiased md:cursor-none">
      <CustomCursor />
      <AboutSection />
      <PrinciplesSection />
    </div>
  );
}

// --- Animated Words Component ---
const AnimatedWords = ({ text, stagger = 0.03, delay = 0, className = "" }) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  };

  return (
    <motion.p
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          key={index}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};

// --- Premium About Section with Floating Logos ---
const AboutSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delayChildren: 0.3 } },
  };

  const nameContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.5 },
    },
  };
  const nameLetter = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 14 },
    },
  };

  const titleFadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut", delay: 1.0 },
    },
  };

  const buttonFadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut", delay: 1.8 },
    },
  };

  const borderRectVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: 0.5, duration: 2, ease: "easeInOut" },
        opacity: { delay: 0.5, duration: 0.01 },
      },
    },
  };

  return (
    <motion.section
      id="about"
      className="bg-[#F0EEEB] text-gray-800 py-24 md:py-40 overflow-hidden relative isolate min-h-screen flex items-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* SVG border */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <defs>
          <motion.linearGradient
            id="borderGradientFlow"
            gradientUnits="userSpaceOnUse"
            initial={{ x1: "0%", y1: "0%", x2: "0%", y2: "100%" }}
            animate={{
              x1: ["0%", "100%", "100%", "0%", "0%"],
              y1: ["0%", "0%", "100%", "100%", "0%"],
              x2: ["100%", "100%", "0%", "0%", "100%"],
              y2: ["100%", "0%", "0%", "100%", "100%"],
            }}
            transition={{ duration: 8, ease: "linear", repeat: Infinity }}
          >
            <stop offset="0%" stopColor="#a7f3d0" />
            <stop offset="50%" stopColor="#bfdbfe" />
            <stop offset="100%" stopColor="#e9d5ff" />
          </motion.linearGradient>
        </defs>

        <motion.rect
          x="5"
          y="5"
          width="90"
          height="90"
          rx="12"
          stroke="url(#borderGradientFlow)"
          strokeWidth="0.3"
          variants={borderRectVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        />
      </motion.svg>

      {/* Blobs */}
      <motion.div
        className="absolute top-[20%] left-[15%] w-64 h-64 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob -z-10"
      ></motion.div>
      <motion.div
        className="absolute bottom-[20%] right-[15%] w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 -z-10"
      ></motion.div>

      {/* 🌐 Floating Tech Logos Background */}
      <div className="absolute inset-0 overflow-hidden -z-10 opacity-30">
        {[
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", top: "10%", left: "8%" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", top: "20%", right: "10%" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", bottom: "18%", left: "15%" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg", bottom: "25%", right: "15%" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg", top: "35%", left: "40%" },
  // ✅ GSAP custom SVG
  { src: "https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg", bottom: "30%", left: "40%" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", top: "15%", right: "35%" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", bottom: "10%", right: "25%" },
  // ✅ Framer Motion SVG (custom)
  { src: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg", top: "45%", right: "45%" },
].map((logo, i) => (
          <motion.img
            key={i}
            src={logo.src}
            alt="Tech logo"
            className="absolute w-14 md:w-20 opacity-70"
            style={{ top: logo.top, left: logo.left, right: logo.right, bottom: logo.bottom }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 md:px-8 text-center relative z-10">
        <motion.div variants={containerVariants}>
          <motion.h1
            variants={nameContainer}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-tight mb-1"
          >
            {"Samra Ateeque".split("").map((char, index) => (
              <motion.span key={index} variants={nameLetter} className="inline-block">
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.h2
            variants={titleFadeUp}
            className="mt-4 text-xl md:text-2xl font-medium text-emerald-700 tracking-wide"
          >
            Full-Stack Developer | MERN Stack Expert
          </motion.h2>

          <div className="mt-8 text-gray-700 max-w-xl mx-auto leading-relaxed text-lg space-y-4">
            <AnimatedWords
              text="Passionate developer crafting modern, fast, and visually engaging web applications with the MERN stack."
              stagger={0.02}
              delay={1.2}
            />
            <AnimatedWords
              text="Expertise in React, Node.js, and seamless animations using Framer Motion & GSAP."
              stagger={0.02}
              delay={1.5}
            />
          </div>

          <motion.div variants={buttonFadeUp} className="mt-12">
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-8 py-3.5 rounded-full font-semibold group shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -3, boxShadow: "0 12px 25px -5px rgba(52, 211, 153, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              Let’s Connect
              <ArrowUpRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Blob animation keyframes */}
      <style>{`
        @keyframes blob {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: translate(0px, 0px) scale(1); }
          33% { border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%; transform: translate(30px, -20px) scale(1.05); }
          66% { border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%; transform: translate(-20px, 30px) scale(0.95); }
        }
        .animate-blob { animation: blob 20s infinite ease-in-out; }
        .animation-delay-2000 { animation-delay: -5s; }
      `}</style>
    </motion.section>
  );
};

// --- Principles Section ---
const PrinciplesSection = () => {
  const principles = [
    { title: "Creative UI & UX", description: "Building modern, minimal, and animated interfaces using React, TailwindCSS, and GSAP/Framer Motion." },
    { title: "MERN Stack Expertise", description: "Creating responsive and scalable full-stack apps with React, Node.js, Express, and MongoDB." },
    { title: "Client-Focused Results", description: "Delivering SEO-friendly portfolios, landing pages, and e-commerce solutions tailored to client needs." },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <section className="bg-white text-gray-800 py-20 md:py-28">
      <motion.div
        className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {principles.map((principle, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`text-center md:text-left ${index > 0 ? "md:border-l md:pl-8 md:border-gray-200" : ""}`}
          >
            <h3 className="text-xl font-bold tracking-tight text-gray-900">{principle.title}</h3>
            <p className="mt-3 text-gray-600 leading-relaxed">{principle.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
