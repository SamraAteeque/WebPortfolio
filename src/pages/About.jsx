import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Download } from "lucide-react";
import Magnetic from '../components/Magnetic.jsx';

gsap.registerPlugin(ScrollTrigger);

// --- About Section ---
const AboutSection = () => {
  const sectionRef = useRef(null);
  const { scrollY } = useScroll();
  const yOrb = useTransform(scrollY, [0, 2000], [0, 200]);

  const skills = [
    "React.js", "Node.js", "MongoDB", "Express.js",
    "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion",
    "Next.js", "REST APIs", "Git", "Figma",
  ];

  const stats = [
    { num: "10+", label: "Projects" },
    { num: "2+", label: "Years" },
    { num: "5+", label: "Clients" },
  ];

  return (
    <section ref={sectionRef} id="about" className="bg-[#0A0A0A] text-[#F0EAE2] py-24 md:py-36 relative overflow-hidden border-t border-[#1A1A1A]">

      {/* Decorative orb */}
      <motion.div style={{ y: yOrb }}
        className="absolute top-[-15%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#E63946]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-14 relative z-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-5 mb-16 md:mb-24"
        >
          <span className="font-mono text-[11px] tracking-[0.3em] text-[#555] uppercase">02 — About</span>
          <div className="flex-grow h-px bg-[#1A1A1A]" />
        </motion.div>

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">

          {/* Left: Large editorial heading */}
          <div className="lg:col-span-5">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-extrabold tracking-tighter text-[#F0EAE2] leading-[0.9]"
              style={{ fontSize: 'clamp(3rem, 6vw, 6.5rem)' }}
            >
              THE<br />
              <span className="font-serif italic text-[#E63946]">Developer</span><br />
              BEHIND<br />
              THE WORK.
            </motion.h2>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center gap-8 mt-12 pt-8 border-t border-[#1A1A1A]"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl md:text-4xl font-extrabold text-[#F0EAE2] tracking-tight">{stat.num}</div>
                  <div className="text-[10px] text-[#555] tracking-[0.2em] uppercase font-bold mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Bio + skills + CTAs */}
          <div className="lg:col-span-7 lg:pt-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E63946]/8 border border-[#E63946]/20 text-[#E63946] text-[11px] font-bold tracking-[0.15em] uppercase mb-8">
                Full-Stack MERN Developer
              </div>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#F0EAE2] mb-6"
            >
              Samra Ateeque
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="space-y-4 text-[#666] text-base md:text-lg leading-relaxed font-medium mb-10"
            >
              <p>
                I'm a passionate Full-Stack developer with a deep focus on crafting modern, fast, and visually engaging web applications using the MERN stack.
              </p>
              <p>
                I specialize in React, Node.js, and seamless animation architectures using Framer Motion & GSAP — turning ideas into cinematic digital experiences that convert visitors into clients.
              </p>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-10"
            >
              <p className="font-mono text-[10px] tracking-[0.3em] text-[#444] uppercase mb-4">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-bold border border-[#222] text-[#888] rounded-full hover:border-[#E63946]/40 hover:text-[#F0EAE2] transition-all duration-200 bg-[#111]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <Magnetic strength={0.3}>
                <a href="#contact"
                  className="group inline-flex items-center gap-2 bg-[#E63946] text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-[#C62633] transition-all shadow-[0_0_25px_rgba(230,57,70,0.2)]">
                  Let's Connect
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </Magnetic>
              <Magnetic strength={0.3}>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[#2A2A2A] text-[#888] px-8 py-4 rounded-full font-bold text-sm hover:border-[#E63946]/40 hover:text-[#F0EAE2] transition-all"
                >
                  <Download className="w-4 h-4" /> View CV
                </a>
              </Magnetic>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

// --- Principles Section ---
const PrinciplesSection = () => {
  const sectionRef = useRef(null);

  const principles = [
    { num: "01", title: "Creative UI & UX", description: "Building modern, minimal, and animated interfaces using React, TailwindCSS, and Framer Motion that delight users." },
    { num: "02", title: "MERN Stack Expertise", description: "Creating responsive, scalable full-stack applications with React, Node.js, Express, and MongoDB from ground up." },
    { num: "03", title: "Client-Focused Results", description: "Delivering SEO-optimized portfolios, landing pages, and e-commerce solutions tailored precisely to client goals." },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.principle-card', {
        y: 50, opacity: 0, stagger: 0.18, duration: 1, ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0C0C0C] text-[#F0EAE2] py-24 md:py-32 border-t border-[#1A1A1A] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-[#E63946]/15 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {principles.map((p, i) => (
            <div key={i} className={`principle-card ${i > 0 ? "md:border-l md:pl-10 md:border-[#1A1A1A]" : ""}`}>
              <div className="font-mono text-xs tracking-widest text-[#E63946] bg-[#E63946]/8 border border-[#E63946]/15 inline-block px-3 py-1 rounded-full mb-6">
                {p.num}
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#F0EAE2] mb-4">{p.title}</h3>
              <p className="text-[#555] leading-relaxed font-medium text-base">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Process Timeline ---
const ProcessTimeline = () => {
  const timelineRef = useRef(null);
  const steps = [
    { num: "01", title: "Discovery & Strategy", desc: "Understanding your vision, target audience, and project requirements to set a clear, actionable roadmap." },
    { num: "02", title: "UI/UX Design", desc: "Crafting wireframes and high-fidelity mockups ensuring a premium, user-centric experience before a single line of code." },
    { num: "03", title: "Full-Stack Development", desc: "Building with the MERN stack and Framer Motion for highly optimized, responsive, and animated experiences." },
    { num: "04", title: "Testing & Launch", desc: "Rigorous QA, deployment, and performance optimization for a flawless, high-impact go-live with post-launch support." }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.timeline-step', {
        x: -40, opacity: 0, stagger: 0.25, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: timelineRef.current, start: "top 75%" }
      });
    }, timelineRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={timelineRef} className="bg-[#0A0A0A] text-[#F0EAE2] py-24 md:py-36 border-t border-[#1A1A1A] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#E63946]/4 blur-[130px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-14 relative z-10">

        <motion.div
          className="mb-16 md:mb-24"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-5 mb-8">
            <span className="font-mono text-[11px] tracking-[0.3em] text-[#555] uppercase">Process</span>
            <div className="h-px bg-[#1A1A1A] w-16" />
          </div>
          <h2 className="font-extrabold tracking-tighter text-[#F0EAE2]"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}>
            How I <span className="font-serif italic text-[#E63946]">Work.</span>
          </h2>
        </motion.div>

        <div className="relative border-l border-[#1A1A1A] ml-4 md:ml-6 space-y-14 md:space-y-20 pb-4">
          {steps.map((step, idx) => (
            <div key={idx} className="timeline-step relative pl-10 md:pl-16">
              <div className="absolute left-[-9px] top-2 w-4 h-4 rounded-full bg-[#0A0A0A] border-2 border-[#E63946] shadow-[0_0_16px_rgba(230,57,70,0.4)]" />
              <div className="font-mono text-[11px] tracking-widest text-[#E63946] bg-[#E63946]/8 border border-[#E63946]/15 inline-block px-3 py-1 rounded-full mb-3">{step.num}</div>
              <h3 className="text-2xl md:text-3xl font-extrabold mb-3 text-[#F0EAE2] tracking-tight">{step.title}</h3>
              <p className="text-[#555] font-medium leading-relaxed max-w-xl text-base md:text-lg">{step.desc}</p>
            </div>
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
