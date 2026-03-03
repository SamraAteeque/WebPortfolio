import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// --- Animated Words Component ---
const AnimatedWords = ({ text, stagger = 0.03, delay = 0, className = "" }) => {
  const words = text.split(" ");
  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0 },
        visible: (i = 1) => ({ opacity: 1, transition: { staggerChildren: stagger, delayChildren: delay * i } })
      }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-[0.25em]"
          variants={{
            visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } },
            hidden: { opacity: 0, y: 20, transition: { type: "spring", damping: 12, stiffness: 100 } }
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};

// --- Premium About Section with Dark Floating Logos ---
const AboutSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delayChildren: 0.3 } },
  };

  const nameLetter = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 14 } },
  };

  const borderRectVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { delay: 0.5, duration: 2.5, ease: "easeInOut" }, opacity: { delay: 0.5, duration: 0.01 } },
    },
  };

  return (
    <motion.section
      id="about"
      className="bg-[#0A0A0A] text-gray-200 py-24 md:py-40 overflow-hidden relative isolate min-h-screen flex items-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Subtle SVG Border Glow (Dark Mode Adjusted) */}
      <motion.svg className="absolute inset-0 w-full h-full opacity-30" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
          <motion.linearGradient
            id="borderGradientFlowDark"
            gradientUnits="userSpaceOnUse"
            initial={{ x1: "0%", y1: "0%", x2: "0%", y2: "100%" }}
            animate={{
              x1: ["0%", "100%", "100%", "0%", "0%"],
              y1: ["0%", "0%", "100%", "100%", "0%"],
              x2: ["100%", "100%", "0%", "0%", "100%"],
              y2: ["100%", "0%", "0%", "100%", "100%"],
            }}
            transition={{ duration: 10, ease: "linear", repeat: Infinity }}
          >
            <stop offset="0%" stopColor="#059669" /> {/* Emerald 600 */}
            <stop offset="50%" stopColor="#0f766e" /> {/* Teal 700 */}
            <stop offset="100%" stopColor="#10b981" /> {/* Emerald 500 */}
          </motion.linearGradient>
        </defs>
        <motion.rect x="3" y="3" width="94" height="94" rx="4" stroke="url(#borderGradientFlowDark)" strokeWidth="0.1" variants={borderRectVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} />
      </motion.svg>

      {/* Dark Mode Blobs */}
      <motion.div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-emerald-900/20 rounded-full blur-[120px] -z-10 animate-blob"></motion.div>
      <motion.div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-teal-900/10 rounded-full blur-[150px] -z-10 animate-blob animation-delay-2000"></motion.div>

      {/* 🌐 Floating Tech Logos (Grayscale/Inverted for Dark Mode) */}
      <div className="absolute inset-0 overflow-hidden -z-10 opacity-15">
        {[
          { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", top: "15%", left: "10%" },
          { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", top: "25%", right: "12%" },
          { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", bottom: "20%", left: "12%" },
          { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg", bottom: "30%", right: "10%", invert: true },
          { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg", top: "40%", left: "30%" },
          { src: "https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg", bottom: "15%", left: "45%" },
          { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", top: "20%", right: "30%", invert: true },
          { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", bottom: "10%", right: "35%" },
        ].map((logo, i) => (
          <motion.img
            key={i}
            src={logo.src}
            alt="Tech logo"
            className={`absolute w-12 md:w-16 grayscale transition-all duration-500 hover:grayscale-0 hover:opacity-100 ${logo.invert ? 'filter invert brightness-0 invert' : ''}`}
            style={{ top: logo.top, left: logo.left, right: logo.right, bottom: logo.bottom }}
            animate={{ y: [0, -20, 0], rotate: [0, 8, -8, 0] }}
            transition={{ duration: 10 + i * 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10">
        <motion.div variants={containerVariants}>
          {/* Subtle Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-medium tracking-widest uppercase mb-6 backdrop-blur-sm"
          >
            About The Developer
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-[5rem] font-medium tracking-tight text-white leading-[1.1] mb-2"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
            }}
          >
            {"Samra Ateeque".split("").map((char, index) => (
              <motion.span key={index} variants={nameLetter} className="inline-block drop-shadow-lg">
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-6 text-xl md:text-2xl font-light text-emerald-400/90 tracking-wide"
          >
            Full-Stack Developer <span className="text-gray-600 mx-2">|</span> MERN Stack Expert
          </motion.h2>

          <div className="mt-10 text-gray-400 max-w-2xl mx-auto leading-relaxed text-lg space-y-6 font-light">
            <AnimatedWords
              text="Passionate developer crafting modern, fast, and visually engaging web applications with the MERN stack."
              delay={1.0}
            />
            <AnimatedWords
              text="Expertise in React, Node.js, and seamless animations using Framer Motion & GSAP."
              delay={1.4}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 1.8 }}
            className="mt-14"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 bg-white text-black px-8 py-3.5 rounded-full font-semibold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              Let’s Connect
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: translate(0px, 0px) scale(1); }
          33% { border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%; transform: translate(30px, -20px) scale(1.05); }
          66% { border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%; transform: translate(-20px, 30px) scale(0.95); }
        }
        .animate-blob { animation: blob 25s infinite ease-in-out; }
        .animation-delay-2000 { animation-delay: -5s; }
      `}</style>
    </motion.section>
  );
};

// --- Principles Section (Dark Mode) ---
const PrinciplesSection = () => {
  const principles = [
    { title: "Creative UI & UX", description: "Building modern, minimal, and animated interfaces using React, TailwindCSS, and framer-motion." },
    { title: "MERN Stack Expertise", description: "Creating responsive and scalable full-stack apps with React, Node.js, Express, and MongoDB." },
    { title: "Client-Focused", description: "Delivering SEO-friendly portfolios, landing pages, and e-commerce solutions tailored to client needs." },
  ];

  return (
    <section className="bg-[#0A0A0A] text-gray-200 py-20 md:py-32 border-t border-white/5 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <motion.div
        className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
        }}
      >
        {principles.map((principle, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
            }}
            className={`text-center md:text-left ${index > 0 ? "md:border-l md:pl-10 md:border-white/5" : "md:pr-2"}`}
          >
            <div className="text-emerald-500/50 mb-4 font-mono text-sm tracking-wider">0{index + 1}</div>
            <h3 className="text-xl font-semibold tracking-tight text-white mb-3">{principle.title}</h3>
            <p className="text-gray-400 leading-relaxed font-light text-sm md:text-base">{principle.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

// --- Process Timeline Section (Dark Mode) ---
const ProcessTimeline = () => {
  const steps = [
    { num: "01", title: "Discovery & Strategy", desc: "Understanding your vision, target audience, and project requirements to set a clear, actionable roadmap." },
    { num: "02", title: "UI/UX Design", desc: "Crafting modern, glassmorphic wireframes and high-fidelity mockups, ensuring a premium, user-centric experience." },
    { num: "03", title: "Full-Stack Development", desc: "Building the application using the MERN stack and Framer Motion for highly optimized, responsive, and animated code." },
    { num: "04", title: "Testing & Launch", desc: "Rigorous quality assurance, deployment, and performance optimization for a flawless, high-impact go-live." }
  ];

  return (
    <section className="bg-[#0A0A0A] text-white py-24 md:py-32 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-900/10 blur-[130px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
        <motion.div className="text-center mb-16 md:mb-24" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-4 backdrop-blur-sm">
            How I Work
          </div>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">The <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Process.</span></h2>
        </motion.div>

        <div className="relative border-l border-white/10 ml-4 md:ml-8 space-y-12 md:space-y-16 pb-8">
          {steps.map((step, idx) => (
            <motion.div key={idx} className="relative pl-8 md:pl-12" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: idx * 0.15 }}>
              <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
              <div className="text-emerald-500/50 mb-1 font-mono text-sm tracking-wider">{step.num}</div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-400 font-light leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function About() {
  return (
    <>
      <AboutSection />
      <PrinciplesSection />
      <ProcessTimeline />
    </>
  );
}
