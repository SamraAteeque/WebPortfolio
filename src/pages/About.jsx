import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Img from '../assets/samra-pic.jpg'

// --- Custom Cursor Component ---
const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const moveCursor = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });

            const target = e.target;
            if (window.getComputedStyle(target).getPropertyValue('cursor') === 'pointer') {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
        };
    }, []);

    const cursorVariants = {
        default: {
            width: 32,
            height: 32,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            x: position.x - 16,
            y: position.y - 16,
        },
        hover: {
            width: 64,
            height: 64,
            backgroundColor: "rgba(52, 211, 153, 0.1)",
            border: "1px solid rgba(52, 211, 153, 0.3)",
            x: position.x - 32,
            y: position.y - 32,
        }
    };

    return (
        <motion.div
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block"
            variants={cursorVariants}
            animate={isHovering ? "hover" : "default"}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
    );
};


// --- Main App Component ---
export default function App() {
  return (
    <div className="bg-[#1E1E1E] min-h-screen text-gray-200 font-sans antialiased md:cursor-none">
      <CustomCursor />
      <AboutSection />
      <PrinciplesSection />
    </div>
  );
}

// --- About Section ---
const AboutSection = () => {
    const freelancer = {
        name: 'Samra Ateeque',
        title: 'Full-Stack Developer | MERN Stack | GSAP & Framer Motion',
        img: Img,
        color: 'bg-teal-300'
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };
    
    const cardContentVariants = {
         hidden: { opacity: 0, y: 20 },
         visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    };

    return (
        <section id="about" className="bg-[#F0EEEB] text-gray-800 py-20 md:py-32 overflow-hidden flex items-center justify-center">
            <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                {/* Left Content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-900">About Me</motion.h2>
                    <motion.p variants={itemVariants} className="mt-6 text-gray-600 max-w-lg leading-relaxed">
                        I’m a passionate <strong>Full-Stack Developer</strong> and <strong>MERN Stack Enthusiast</strong> who loves building 
                        modern, fast, and visually engaging web experiences. From crafting <strong>portfolio websites</strong> 
                        to developing <strong>full-stack apps</strong>, I blend creativity with clean code.  
                        <br /><br />
                        My expertise includes <strong>React, TailwindCSS, GSAP & Framer Motion animations, Node.js, Express, and MongoDB</strong>.  
                        As a freelancer, I’ve worked on <strong>landing pages, animated UIs, and SEO-friendly websites</strong>, 
                        delivering high-quality projects tailored to client needs. 🚀
                    </motion.p>
                    <motion.div variants={itemVariants}>
                        <motion.a 
                            href="#contact"
                            className="bg-gray-800 text-white px-8 py-3 rounded-full font-semibold mt-8 inline-block"
                            whileHover={{ scale: 1.05, backgroundColor: '#111827' }}
                            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                        >
                            Let’s Work Together
                        </motion.a>
                    </motion.div>
                </motion.div>

                {/* Right Content - Profile Card */}
                <div className="relative h-[400px] lg:h-[500px] flex items-center justify-center">
                       <motion.div
                            className="w-[280px] md:w-[320px]"
                            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            whileHover={{ scale: 1.05, rotate: -2, transition: { type: 'spring', stiffness: 300 } }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                         >
                            <div className="bg-white p-6 rounded-3xl shadow-2xl">
                                <motion.div 
                                    className="relative"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
                                >
                                    <img 
                                        src={freelancer.img} 
                                        alt={freelancer.name} 
                                        className="w-full h-auto rounded-2xl relative z-10 aspect-[4/5] object-cover" 
                                    />
                                    <motion.div 
                                        className={`absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 w-full h-full ${freelancer.color} rounded-2xl z-0`}
                                        initial={{ x: 10, y: 10 }}
                                        whileInView={{ x: 0, y: 0 }}
                                        viewport={{ once: true, amount: 0.5 }}
                                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
                                    />
                                </motion.div>
                                <motion.div 
                                    className="mt-8 text-center"
                                    variants={cardContentVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    <h3 className="text-2xl font-bold text-gray-900">{freelancer.name}</h3>
                                    <p className="text-gray-500 mt-1">{freelancer.title}</p>
                                </motion.div>
                            </div>
                        </motion.div>
                </div>
            </div>
        </section>
    );
};

// --- Principles Section ---
const PrinciplesSection = () => {
    const principles = [
        {
            title: "Creative UI & UX",
            description: "I specialize in building modern, minimal, and animated user interfaces using React, TailwindCSS, and GSAP."
        },
        {
            title: "MERN Stack Development",
            description: "From frontend to backend, I create responsive and scalable full-stack apps using React, Node.js, Express, and MongoDB."
        },
        {
            title: "Freelancing Experience",
            description: "I have worked with clients on portfolios, landing pages, and e-commerce projects—delivering SEO-friendly and responsive solutions."
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <section className="bg-[#F0EEEB] text-gray-800 pt-0 pb-20 md:pb-32">
            <motion.div
                className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                {principles.map((principle, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        className={`md:border-gray-300 ${index > 0 ? 'md:border-l md:pl-8' : ''}`}
                    >
                        <h3 className="text-2xl font-bold tracking-tighter text-gray-900">{principle.title}</h3>
                        <p className="mt-4 text-gray-600 leading-relaxed">{principle.description}</p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};
