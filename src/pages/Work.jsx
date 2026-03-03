import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';

// ✅ Preserved local image imports
import Img1 from '../assets/Img1.png';
import Img2 from '../assets/Img2.png';
import Img3 from '../assets/Img3.png';
import Img4 from '../assets/Img4.png';
import Img5 from '../assets/Img5.png';


// --- Project Data ---
const workProjects = [
    { id: 1, title: "Smart Shopping Hub", category: "E-Commerce Website", image: Img3, link: "https://ecommerce-project-app-l9af.onrender.com/", type: 'demo', description: "Developed a full-stack e-commerce platform with product management, user accounts, and a clean user interface using the MERN stack." },
    { id: 2, title: "Modern Website Design", category: "Wedding Planner Website", image: Img4, link: "https://wedding-planner-p2ho.vercel.app/", type: 'demo', description: "Created a visually appealing and informative website for a professional wedding planner, focusing on high-quality image galleries and easy-to-use contact forms." },
    { id: 3, title: "Modern Portfolio Template", category: "Portfolio Website", image: Img1, link: "https://duo-plum.vercel.app/", type: 'demo', description: "A sleek and modern portfolio template designed with React and Framer Motion, showcasing project sections and smooth page transitions." },
    { id: 4, title: "Jewellery Brand Concept", category: "Jewellry Website", image: Img2, link: "https://jewellry-business.vercel.app/", type: 'demo', description: "Elegant landing page design concept developed for a luxury jewellery brand, emphasizing visual appeal and brand storytelling." },
    { id: 5, title: "Interior Design Website", category: "Interior Designer Website", image: Img5, link: "https://awadhinteriordesigner.in/", type: 'client', description: "A conceptual design for an interior design firm's website, focusing on large, high-impact imagery and detailed project case studies. (Work In Progress)" },
];

export default function WorkPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [activeTab, setActiveTab] = useState('client');

    const displayedProjects = useMemo(() => workProjects.filter(p => p.type === activeTab), [activeTab]);
    const currentProject = displayedProjects.length > 0 ? displayedProjects[currentIndex % displayedProjects.length] : null;

    const changeTab = (tabType) => {
        if (tabType !== activeTab) {
            setActiveTab(tabType);
            setCurrentIndex(0);
            setDirection(0);
        }
    };

    const paginate = (newDirection) => {
        if (!displayedProjects || displayedProjects.length === 0) return;
        setDirection(newDirection);
        const numProjects = displayedProjects.length;
        setCurrentIndex((prevIndex) => (newDirection > 0 ? (prevIndex + 1) % numProjects : (prevIndex - 1 + numProjects) % numProjects));
    };

    const goToIndex = (index) => {
        if (!displayedProjects || index < 0 || index >= displayedProjects.length) return;
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    }

    const sliderVariants = {
        enter: (direction) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0, scale: 0.95 }),
        center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
        exit: (direction) => ({ x: direction < 0 ? '100%' : '-100%', opacity: 0, scale: 0.95, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } })
    };

    const textVariants = {
        enter: { opacity: 0, y: 20 },
        center: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } }
    };

    const imageVariants = {
        enter: { opacity: 0, scale: 0.9, filter: "blur(10px)" },
        center: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut", delay: 0.1 } },
        exit: { opacity: 0, scale: 0.9, filter: "blur(10px)", transition: { duration: 0.4, ease: "easeIn" } }
    };

    const TabButton = ({ type, label }) => (
        <button
            onClick={() => changeTab(type)}
            className={`relative py-2 px-6 rounded-full text-sm font-medium transition-colors duration-300 ${activeTab === type ? 'text-black' : 'text-gray-400 hover:text-white'}`}
        >
            {activeTab === type && (
                <motion.div layoutId="active-tab-indicator-work" className="absolute inset-0 bg-white rounded-full z-0 shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
            )}
            <span className="relative z-10">{label}</span>
        </button>
    );

    return (
        <section id="work" className="bg-[#0A0A0A] text-white min-h-screen flex flex-col justify-center py-24 md:py-32 overflow-hidden relative">

            {/* Ambient Background Glow */}
            <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[60%] h-[60%] bg-emerald-900/10 rounded-full blur-[150px] pointer-events-none -z-10" />

            <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">

                <motion.div
                    className="text-center mb-10 md:mb-16"
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-4 backdrop-blur-sm">
                        Featured Work
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-tight">
                        Project <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Showcase.</span>
                    </h2>
                </motion.div>

                <div className="flex justify-center space-x-2 bg-white/5 border border-white/10 p-1.5 rounded-full mb-10 backdrop-blur-md">
                    <TabButton type="client" label="Client Projects" />
                    <TabButton type="demo" label="Demo Projects" />
                </div>

                <div className="relative w-full h-[550px] sm:h-[600px] md:h-auto md:aspect-[16/7] max-h-[70vh] overflow-hidden rounded-[2rem] bg-[#111] border border-white/10 shadow-2xl group">
                    <AnimatePresence initial={false} custom={direction}>
                        {currentProject ? (
                            <motion.div key={`${activeTab}-${currentIndex}`} custom={direction} variants={sliderVariants} initial="enter" animate="center" exit="exit" className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">

                                <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 order-2 md:order-1 relative z-10 bg-gradient-to-r from-[#111] via-[#111]/95 to-transparent">
                                    <motion.p variants={textVariants} className="text-xs font-semibold tracking-widest uppercase text-emerald-500 mb-3">{currentProject.category}</motion.p>
                                    <motion.h3 variants={textVariants} transition={{ delay: 0.1 }} className="text-3xl lg:text-4xl font-bold mb-5 text-white tracking-tight">{currentProject.title}</motion.h3>
                                    <motion.p variants={textVariants} transition={{ delay: 0.2 }} className="text-gray-400 mb-8 lg:mb-10 text-base leading-relaxed max-w-md font-light">{currentProject.description}</motion.p>

                                    <motion.div variants={textVariants} transition={{ delay: 0.3 }}>
                                        <a
                                            href={currentProject.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`inline-flex items-center gap-2 bg-white text-black font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 text-sm ${currentProject.link === '#' ? 'opacity-50 cursor-not-allowed hover:scale-100' : 'shadow-[0_0_20px_rgba(255,255,255,0.1)]'}`}
                                            onClick={(e) => currentProject.link === '#' && e.preventDefault()}
                                        >
                                            View Project <ArrowUpRight className="w-4 h-4 ml-1" />
                                        </a>
                                    </motion.div>
                                </div>

                                <motion.div variants={imageVariants} className="overflow-hidden order-1 md:order-2 h-64 md:h-auto relative">
                                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#111] z-10 hidden md:block" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent z-10 md:hidden" />
                                    <img src={currentProject.image} alt={currentProject.title} className="w-full h-full object-cover object-center" />
                                </motion.div>
                            </motion.div>
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <p className="text-gray-500 font-light">No projects found in this category.</p>
                            </div>
                        )}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <button
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition-colors backdrop-blur-md border border-white/10 shadow-xl opacity-0 md:group-hover:opacity-100 disabled:opacity-0"
                        onClick={() => paginate(-1)}
                        disabled={displayedProjects.length <= 1}
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition-colors backdrop-blur-md border border-white/10 shadow-xl opacity-0 md:group-hover:opacity-100 disabled:opacity-0"
                        onClick={() => paginate(1)}
                        disabled={displayedProjects.length <= 1}
                    >
                        <ArrowRight size={20} />
                    </button>
                </div>

                <div className="flex justify-center gap-3 mt-8">
                    {displayedProjects.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-emerald-500 w-8 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-white/20 hover:bg-white/40'}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
