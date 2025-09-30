import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X, Code, PenTool, Search } from 'lucide-react';

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
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);

    const cursorVariants = {
        default: {
            width: 12,
            height: 12,
            backgroundColor: "black",
            border: "1px solid white",
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
      <HeroSection />
      <BrandsSection />
    </div>
  );
}

// --- Navigation Component ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = ["Home","About", "Services", "Work", "Contact"];

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.a 
            href="#" 
            className="text-2xl font-bold tracking-tighter"
            whileHover={{ scale: 1.05 }}
        >
            Samrateq
        </motion.a>
        
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.a 
              key={link} 
              href={`#${link.toLowerCase()}`} 
              className="text-gray-400"
              whileHover={{ color: '#ffffff', scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              {link}
            </motion.a>
          ))}
        </div>
        
        <div className="hidden md:flex items-center gap-4">
            <motion.a 
                href="#contact" 
                className="bg-white text-black px-6 py-2 rounded-full font-semibold flex items-center gap-2 group"
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(255,255,255,0.2)" }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
                Get in touch
                <motion.div
                    animate={{ rotate: 0 }}
                    whileHover={{ rotate: 45 }}
                >
                    <ArrowUpRight className="w-5 h-5" />
                </motion.div>
            </motion.a>
        </div>
        
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white z-50">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden mt-4 bg-gray-900/80 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center gap-4"
        >
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white text-lg w-full text-center py-2">
              {link}
            </a>
          ))}
          <a href="#contact" onClick={() => setIsOpen(false)} className="bg-white text-black px-6 py-3 rounded-full font-semibold w-full text-center mt-2 flex items-center justify-center gap-2">
            Get in touch
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </motion.div>
      )}
      </AnimatePresence>
    </nav>
  );
};

// --- Hero Section Component ---
const HeroSection = () => {
  const services = [
    { number: "#01", title: "Frontend Development" },
    { number: "#02", title: "React JS & MERN Stack" },
    { number: "#03", title: "UI/UX Design" },
    { number: "#04", title: "Application Development" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          src="https://images.unsplash.com/photo-1522252234503-e356532cafd5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Developer working on a laptop"
          className="w-full h-full object-cover opacity-30"
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/1920x1080/1E1E1E/FFFFFF?text=Image+Not+Found'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-transparent to-transparent"></div>
      </div>
      
      <Navbar />

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-32 md:pt-48 pb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
          <div className="flex flex-col gap-4">
            <motion.p variants={itemVariants} className="text-green-400 font-semibold">Hey, I'm Samra</motion.p>
            <motion.h1 variants={itemVariants} className="text-5xl md:text-8xl font-bold tracking-tighter leading-none">
              Full Stack<br />Developer
            </motion.h1>
          </div>
          <motion.div variants={itemVariants} className="flex flex-col gap-6 lg:pb-12">
            <p className="text-xl md:text-2xl text-gray-300">Creating beautiful, responsive websites with React & MERN.</p>
            <p className="text-gray-400 max-w-md">
              I specialize in building modern, performant web applications and animated landing pages. I also help clients bring their freelance projects to life with clean and interactive designs.
            </p>
          </motion.div>
        </div>

        <motion.div 
            className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 items-center"
            variants={containerVariants}
        >
          {services.map((service) => (
            <motion.div key={service.number} variants={itemVariants} className="text-center md:text-left">
              <p className="text-sm text-gray-500">{service.number}</p>
              <h3 className="font-semibold mt-1">{service.title}</h3>
            </motion.div>
          ))}
          
        </motion.div>
      </motion.div>
    </section>
  );
};

// --- Brands Section ---
const BrandsSection = () => {
    const brands = [
        { name: "Portfolio Projects", icon: <Code size={24} /> },
        { name: "Interior Designer Website", icon: <PenTool size={24} /> },
        { name: "Wedding Planner Website", icon: <Search size={24} /> },
        { name: "Animated UIs", icon: <Code size={24} /> },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };
    
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="bg-[#F0EEEB] text-gray-600 py-12 md:py-20 rounded-t-3xl md:rounded-t-[4rem] -mt-10 md:-mt-16 relative z-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <p className="text-center md:text-left text-sm mb-8">Trusted by brands and clients I've worked with</p>
                <motion.div 
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center md:justify-items-start"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                >
                    {brands.map((brand, index) => (
                        <motion.div 
                            key={index} 
                            className="flex items-center gap-3 text-gray-500"
                            variants={itemVariants}
                            whileHover={{ scale: 1.1, color: '#111827' }}
                        >
                            {brand.icon}
                            <span className="font-bold text-lg">{brand.name}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};
