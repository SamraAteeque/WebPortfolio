import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

import Img1 from '../assets/Img1.png';
import Img3 from '../assets/Img3.png';
import Img4 from '../assets/Img4.png';
import Img5 from '../assets/Img5.png';

gsap.registerPlugin(ScrollTrigger);

const workProjects = [
    { id: 1, title: "Jewellry Shop", category: "E-Commerce Website", image: Img3, link: "https://69e65bda2b136f16dfae4964--jewellryshop.netlify.app/", type: 'demo', description: "Full-stack e-commerce platform with product management, user accounts, and a clean UI using the MERN stack." },
    { id: 2, title: "Wedding Planner", category: "Wedding Planner Website", image: Img4, link: "https://wedding-planner-p2ho.vercel.app/", type: 'demo', description: "Visually appealing website for a professional wedding planner, featuring high-quality galleries and easy contact forms." },
    { id: 3, title: "RealState", category: "Real Estate Website", image: Img1, link: "https://reallstates.netlify.app/", type: 'demo', description: "Sleek real estate website built with Next.js and Framer Motion, with smooth transitions and premium design." },
    { id: 5, title: "Interior Design Co.", category: "Interior Designer Website", image: Img5, link: "https://awadhinteriordesigner.in/", type: 'client', description: "Live client project for an interior design firm, focused on large imagery and detailed case studies." },
];

export default function WorkPage() {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [activeTab, setActiveTab] = useState('demo');

    const displayedProjects = useMemo(() => workProjects.filter(p => p.type === activeTab), [activeTab]);
    const currentProject = displayedProjects.length > 0 ? displayedProjects[currentIndex % displayedProjects.length] : null;

    const clientCount = workProjects.filter(p => p.type === 'client').length;
    const demoCount = workProjects.filter(p => p.type === 'demo').length;

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(headerRef.current, {
                y: 50, opacity: 0, duration: 1.1, ease: "power4.out",
                scrollTrigger: { trigger: sectionRef.current, start: "top 78%" }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const changeTab = (tabType) => {
        if (tabType !== activeTab) { setActiveTab(tabType); setCurrentIndex(0); setDirection(0); }
    };

    const paginate = (newDirection) => {
        if (!displayedProjects || displayedProjects.length <= 1) return;
        setDirection(newDirection);
        setCurrentIndex(prev => (newDirection > 0 ? (prev + 1) % displayedProjects.length : (prev - 1 + displayedProjects.length) % displayedProjects.length));
    };

    const goToIndex = (index) => {
        if (!displayedProjects || index < 0 || index >= displayedProjects.length) return;
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    const sliderVariants = {
        enter: (d) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0, scale: 0.92, filter: "blur(8px)" }),
        center: { x: 0, opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
        exit: (d) => ({ x: d < 0 ? '100%' : '-100%', opacity: 0, scale: 0.92, filter: "blur(8px)", transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } })
    };

    const contentVariants = {
        enter: { opacity: 0, y: 30 },
        center: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut", delay: 0.25 } },
        exit: { opacity: 0, y: -15, transition: { duration: 0.35 } }
    };

    return (
        <section ref={sectionRef} id="work" className="bg-[#0A0A0A] text-[#F0EAE2] min-h-screen flex flex-col justify-center py-24 md:py-32 overflow-hidden relative border-t border-[#1A1A1A]">

            <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-[#E63946]/4 rounded-full blur-[80px] pointer-events-none -z-10" />
            <div className="absolute bottom-[10%] right-[8%] w-80 h-80 bg-[#E63946]/5 rounded-full blur-[100px] pointer-events-none -z-10" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none -z-10" />

            <div className="max-w-[1400px] w-full mx-auto px-6 md:px-14 relative z-10 flex flex-col items-center">

                <div ref={headerRef} className="w-full mb-10 md:mb-14">
                    <div className="flex items-center gap-5 mb-10">
                        <span className="font-mono text-[11px] tracking-[0.3em] text-[#555] uppercase">04 — Work</span>
                        <div className="flex-grow h-px bg-[#1A1A1A]" />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <h2 className="font-extrabold tracking-tighter text-[#F0EAE2] leading-tight"
                            style={{ fontSize: 'clamp(2.8rem, 7vw, 8rem)' }}>
                            Featured <span className="font-serif italic text-[#E63946]">Work.</span>
                        </h2>
                        <p className="text-[#555] max-w-sm text-base font-medium">A curated selection of projects showcasing modern web development and creative animations.</p>
                    </div>
                </div>

                {/* Tab switcher */}
                <div className="flex self-start mb-10 md:mb-12 space-x-2 bg-[#111]/90 border border-[#1E1E1E] p-1.5 rounded-full backdrop-blur-xl shadow-xl z-20">
                    {[
                        { type: 'demo', label: 'Demo Projects', count: demoCount },
                        { type: 'client', label: 'Client Projects', count: clientCount },
                    ].map(({ type, label, count }) => (
                        <button
                            key={type}
                            onClick={() => changeTab(type)}
                            className={`relative py-2.5 px-6 rounded-full text-sm font-bold tracking-wide transition-all duration-300 flex items-center gap-2 ${activeTab === type ? 'text-white' : 'text-[#555] hover:text-[#F0EAE2]'}`}
                        >
                            {activeTab === type && (
                                <motion.div layoutId="active-work-tab" className="absolute inset-0 bg-[#E63946] rounded-full z-0 shadow-[0_0_20px_rgba(230,57,70,0.3)]" />
                            )}
                            <span className="relative z-10">{label}</span>
                            <span className={`relative z-10 text-[10px] font-mono px-1.5 py-0.5 rounded-full ${activeTab === type ? 'bg-white/20' : 'bg-[#1A1A1A]'}`}>
                                {count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Slider container */}
                <div className="relative w-full h-[560px] md:h-[680px] lg:h-[760px] max-h-[85vh] overflow-hidden rounded-[2rem] bg-[#111] border border-[#1A1A1A] shadow-2xl group">
                    <AnimatePresence initial={false} custom={direction}>
                        {currentProject ? (
                            <motion.div
                                key={`${activeTab}-${currentIndex}`}
                                custom={direction}
                                variants={sliderVariants}
                                initial="enter" animate="center" exit="exit"
                                className="absolute inset-0 bg-[#0A0A0A] overflow-hidden rounded-[2rem]"
                            >
                                {/* Image */}
                                <motion.div className="absolute inset-0 w-full h-full" initial={{ scale: 1.04 }} whileHover={{ scale: 1.08, transition: { duration: 8, ease: "linear" } }}>
                                    <img
                                        src={currentProject.image}
                                        alt={currentProject.title}
                                        className="w-[110%] h-[110%] object-cover object-center -ml-[5%] -mt-[5%]"
                                        style={{ filter: "brightness(0.55)" }}
                                    />
                                </motion.div>

                                {/* Overlays */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent opacity-95" />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/90 via-[#0A0A0A]/30 to-transparent" />

                                {/* Content card */}
                                <motion.div
                                    variants={contentVariants}
                                    initial="enter" animate="center" exit="exit"
                                    className="absolute bottom-8 left-8 md:bottom-14 md:left-14 right-8 md:right-auto md:max-w-xl z-10 p-7 md:p-10 rounded-[1.75rem] bg-[#111]/50 backdrop-blur-xl border border-white/8 shadow-[0_25px_50px_rgba(0,0,0,0.6)] overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#E63946] to-transparent opacity-60" />

                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="px-3 py-1 bg-[#E63946]/10 text-[#E63946] border border-[#E63946]/20 rounded-full text-[10px] font-bold tracking-widest uppercase">
                                            {currentProject.category}
                                        </span>
                                    </div>

                                    <h3 className="font-extrabold mb-5 text-[#F0EAE2] tracking-tight leading-none"
                                        style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
                                        {currentProject.title}
                                    </h3>

                                    <p className="text-[#888] mb-8 text-sm md:text-base leading-relaxed font-medium">
                                        {currentProject.description}
                                    </p>

                                    <a
                                        href={currentProject.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`group/btn inline-flex items-center gap-2 bg-[#E63946] text-white font-bold py-3.5 px-7 rounded-full transition-all hover:bg-[#C62633] shadow-[0_0_20px_rgba(230,57,70,0.2)] text-sm ${currentProject.link === '#' ? 'opacity-40 cursor-not-allowed' : ''}`}
                                        onClick={(e) => currentProject.link === '#' && e.preventDefault()}
                                    >
                                        Explore Project
                                        <ExternalLink className="w-4 h-4 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
                                    </a>
                                </motion.div>

                            </motion.div>
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#111]">
                                <p className="text-[#444] font-medium tracking-wide">No projects in this category yet.</p>
                            </div>
                        )}
                    </AnimatePresence>

                    {/* Navigation arrows */}
                    {displayedProjects.length > 1 && (
                        <div className="absolute bottom-8 right-8 md:bottom-14 md:right-14 z-20 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                            <button
                                className="bg-[#111]/80 text-[#F0EAE2] p-4 rounded-full hover:bg-[#E63946] transition-all duration-300 backdrop-blur-xl border border-white/8 shadow-xl hover:scale-110 active:scale-95 disabled:opacity-30"
                                onClick={() => paginate(-1)}
                            >
                                <ArrowLeft size={20} strokeWidth={2.5} />
                            </button>
                            <button
                                className="bg-[#111]/80 text-[#F0EAE2] p-4 rounded-full hover:bg-[#E63946] transition-all duration-300 backdrop-blur-xl border border-white/8 shadow-xl hover:scale-110 active:scale-95 disabled:opacity-30"
                                onClick={() => paginate(1)}
                            >
                                <ArrowRight size={20} strokeWidth={2.5} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Dot indicators */}
                {displayedProjects.length > 1 && (
                    <div className="flex justify-center items-center gap-3 mt-8">
                        {displayedProjects.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToIndex(index)}
                                className={`h-2 rounded-full transition-all duration-400 ${currentIndex === index ? 'bg-[#E63946] w-12 shadow-[0_0_12px_rgba(230,57,70,0.5)]' : 'bg-[#2A2A2A] w-2 hover:bg-[#444]'}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
