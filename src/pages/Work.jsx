import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';

// ✅ Import all local images
import Img1 from '../assets/Img1.png';
import Img2 from '../assets/Img2.png';
import Img3 from '../assets/Img3.png';
import Img4 from '../assets/Img4.png';

// --- Project Data with Type and Description ---
const workProjects = [
    // --- Demo Projects ---
    { id: 1, title: "Smart Shopping Hub", category: "E-Commerce Website", image: Img3, link: "https://ecommerce-project-app-l9af.onrender.com/", type: 'demo', description: "Developed a full-stack e-commerce platform with product management, user accounts, and a clean user interface using the MERN stack." },
    { id: 2, title: "Modern Website Design", category: "Wedding Planner Website", image: Img4, link: "https://wedding-planner-p2ho.vercel.app/", type: 'demo', description: "Created a visually appealing and informative website for a professional wedding planner, focusing on high-quality image galleries and easy-to-use contact forms." },
    { id: 3, title: "Modern Portfolio Template", category: "Portfolio Website", image: Img1, link: "https://duo-plum.vercel.app/", type: 'demo', description: "A sleek and modern portfolio template designed with React and Framer Motion, showcasing project sections and smooth page transitions." },
    { id: 4, title: "Jewellery Brand Concept", category: "Jewellry Website", image: Img2, link: "https://jewellry-business.vercel.app/", type: 'demo', description: "Elegant landing page design concept developed for a luxury jewellery brand, emphasizing visual appeal and brand storytelling." },

    // --- Client Project ---
    { id: 5, title: "Interior Design Showcase (WIP)", category: "Interior Designer Website", image: "https://images.unsplash.com/photo-1533090481720-856c6e7c6c34?q=80&w=800&auto=format&fit=crop", link: "#", type: 'client', description: "A conceptual design for an interior design firm's website, focusing on large, high-impact imagery and detailed project case studies. (Work In Progress)" },
];

export default function WorkPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [activeTab, setActiveTab] = useState('client'); // 'client' or 'demo'

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
        center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
        exit: (direction) => ({ x: direction < 0 ? '100%' : '-100%', opacity: 0, scale: 0.95, transition: { duration: 0.4, ease: "easeOut" } })
    };
    const textVariants = {
        enter: { opacity: 0, y: 20 },
        center: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.3 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } }
    };
    const imageVariants = {
        enter: { opacity: 0, scale: 0.9 },
        center: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut", delay: 0.1 } },
        exit: { opacity: 0, scale: 0.9, transition: { duration: 0.4, ease: "easeIn" } }
    };

    const TabButton = ({ type, label }) => (
        <button
            onClick={() => changeTab(type)}
            className={`relative py-2 px-5 rounded-full text-sm font-medium transition-colors duration-300 ${activeTab === type ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
        >
            {activeTab === type && (
                <motion.div layoutId="active-tab-indicator-work" className="absolute inset-0 bg-gray-200 rounded-full z-0" />
            )}
            <span className="relative z-10">{label}</span>
        </button>
    );

    return (
        <section className="bg-white text-gray-900 min-h-screen flex flex-col justify-center py-16 md:py-24 overflow-hidden relative">
            <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
                <motion.div className="text-center mb-8 md:mb-12" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
                    <p className="text-emerald-600 font-semibold text-sm mb-2 uppercase tracking-widest">Featured Work</p>
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">Project Showcase</h1>
                </motion.div>

                <div className="flex justify-center space-x-3 bg-gray-100 border border-gray-200 p-1.5 rounded-full mb-8 md:mb-10">
                    <TabButton type="client" label="Client Projects" />
                    <TabButton type="demo" label="Demo Projects" />
                </div>

                <div className="relative w-full aspect-[16/10] md:aspect-[16/8] max-h-[65vh] overflow-hidden rounded-2xl bg-gray-50 border border-gray-200 shadow-xl">
                    <AnimatePresence initial={false} custom={direction}>
                        {currentProject ? (
                            <motion.div key={`${activeTab}-${currentIndex}`} custom={direction} variants={sliderVariants} initial="enter" animate="center" exit="exit" className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">
                                <div className="flex flex-col justify-center p-6 md:p-10 lg:p-12 order-2 md:order-1">
                                    <motion.p variants={textVariants} className="text-sm text-emerald-600 font-medium mb-2">{currentProject.category}</motion.p>
                                    <motion.h2 variants={textVariants} transition={{ delay: 0.1 }} className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">{currentProject.title}</motion.h2>
                                    <motion.p variants={textVariants} transition={{ delay: 0.2 }} className="text-gray-600 mb-6 lg:mb-8 text-base lg:text-lg flex-grow max-h-40 overflow-y-auto pr-2 scrollbar-thin-light">{currentProject.description}</motion.p>
                                    <motion.a
                                        variants={textVariants}
                                        transition={{ delay: 0.3 }}
                                        href={currentProject.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`inline-flex items-center bg-gray-900 text-white font-semibold py-2.5 px-6 rounded-full transition-colors duration-300 hover:bg-gray-700 self-start text-sm md:text-base ${currentProject.link === '#' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        whileHover={currentProject.link !== '#' ? { scale: 1.05 } : {}}
                                        whileTap={currentProject.link !== '#' ? { scale: 0.95 } : {}}
                                        onClick={(e) => currentProject.link === '#' && e.preventDefault()}
                                    >
                                        Visit Site <ArrowUpRight className="w-4 h-4 ml-1.5" />
                                    </motion.a>
                                </div>

                                <motion.div variants={imageVariants} className="overflow-hidden order-1 md:order-2 h-64 md:h-auto">
                                    <img src={currentProject.image} alt={currentProject.title} className="w-full h-full object-cover" />
                                </motion.div>
                            </motion.div>
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <p className="text-gray-500">No projects found in this category.</p>
                            </div>
                        )}
                    </AnimatePresence>

                    <button className="absolute top-1/2 left-2 md:left-4 -translate-y-1/2 z-20 bg-white/50 text-gray-900 p-2 rounded-full hover:bg-white/80 transition-colors backdrop-blur-sm shadow-md" onClick={() => paginate(-1)} disabled={displayedProjects.length <= 1}><ArrowLeft size={20} /></button>
                    <button className="absolute top-1/2 right-2 md:right-4 -translate-y-1/2 z-20 bg-white/50 text-gray-900 p-2 rounded-full hover:bg-white/80 transition-colors backdrop-blur-sm shadow-md" onClick={() => paginate(1)} disabled={displayedProjects.length <= 1}><ArrowRight size={20} /></button>
                </div>

                <div className="flex justify-center gap-2 mt-6">
                    {displayedProjects.map((_, index) => (
                        <button key={index} onClick={() => goToIndex(index)} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-emerald-500 scale-125' : 'bg-gray-300 hover:bg-gray-400'}`} />
                    ))}
                </div>
            </div>
        </section>
    );
}
