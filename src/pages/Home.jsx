import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X, Code, Briefcase, Zap, Target } from 'lucide-react'; // Updated icons

// --- Custom Cursor Component ---
const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
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
            width: 12, height: 12, backgroundColor: "rgba(255, 255, 255, 0.8)", // Brighter default
            border: "none", x: position.x - 6, y: position.y - 6, mixBlendMode: 'difference'
        },
        hover: {
            width: 64, height: 64, backgroundColor: "rgba(52, 211, 153, 0.1)", border: "1px solid rgba(52, 211, 153, 0.3)",
            x: position.x - 32, y: position.y - 32, mixBlendMode: 'normal' // Normal blend mode on hover
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

// --- Word Animation Component ---
const AnimatedWords = ({ text, stagger = 0.03, delay = 0, className = "" }) => {
    const words = text.split(" ");
    const container = { hidden: { opacity: 0 }, visible: (i = 1) => ({ opacity: 1, transition: { staggerChildren: stagger, delayChildren: delay * i } }) };
    const child = { visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } }, hidden: { opacity: 0, y: 20, transition: { type: "spring", damping: 12, stiffness: 100 } } };
    return ( <motion.div className={className} variants={container} initial="hidden" animate="visible" > {words.map((word, index) => ( <motion.span variants={child} key={index} className="inline-block mr-[0.25em] mb-1"> {word} </motion.span> ))} </motion.div> );
};

// --- Main App Component ---
export default function App() {
  return (
    <div className="bg-[#121212] min-h-screen text-gray-200 font-sans antialiased md:cursor-none"> {/* Darker Base BG */}
      <CustomCursor />
      <HeroSection />
      <BrandsMarquee /> {/* Renamed BrandsSection */}
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
        <motion.a href="#" className="text-2xl font-bold tracking-tighter text-white" whileHover={{ scale: 1.05 }}>
          Samrateq
        </motion.a>
        
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.a key={link} href={`#${link.toLowerCase()}`} className="text-gray-400 relative group" whileHover={{ color: '#ffffff' }} transition={{ duration: 0.3 }}>
              {link}
              {/* Underline animation */}
              <span className="absolute bottom-0 left-0 h-0.5 bg-emerald-500 w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </motion.a>
          ))}
        </div>
        
        <div className="hidden md:flex items-center gap-4">
            <motion.a
                href="#contact"
                className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-2.5 rounded-full font-semibold flex items-center gap-2 group shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-shadow duration-300" // Gradient Button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              Get in touch
              <motion.div variants={{ rest: { rotate: 0 }, hover: { rotate: -45 } }} initial="rest" whileHover="hover" transition={{ duration: 0.3 }}>
                <ArrowUpRight className="w-5 h-5 transition-transform" />
              </motion.div>
            </motion.a>
        </div>
        
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white z-50 p-2 -mr-2"> {/* Added padding */}
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="md:hidden mt-4 bg-gray-900/90 backdrop-blur-md rounded-lg p-4 flex flex-col items-center gap-2 absolute top-16 left-4 right-4 shadow-xl" // Positioned absolutely
        >
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white text-lg w-full text-center py-3 rounded-md hover:bg-white/5 transition-colors">
              {link}
            </a>
          ))}
          <a href="#contact" onClick={() => setIsOpen(false)} className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-3 rounded-full font-semibold w-full text-center mt-3 flex items-center justify-center gap-2">
            Get in touch <ArrowUpRight className="w-5 h-5" />
          </a>
        </motion.div>
      )}
      </AnimatePresence>
    </nav>
  );
};


// --- ✨ REDESIGNED Hero Section Component ---
const HeroSection = () => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } }
  };

  // Variants for the geometric shapes
  const shapeVariants = (delay = 0) => ({
    initial: { opacity: 0, scale: 0.5 },
    animate: {
      opacity: [0, 0.5, 0.3, 0.5, 0], // Fade in/out
      scale: [0.5, 1, 1.1, 1, 0.5],
      rotate: [0, 180, 360],
      transition: {
        duration: 15 + Math.random() * 10, // Slower, varied duration
        ease: "linear",
        repeat: Infinity,
        delay: delay + Math.random() * 3
      }
    },
    whileInView: {
         opacity: [0, 0.4], scale: [0.5, 1],
         transition: { duration: 1, ease: "easeOut", delay: 0.8 + delay} // Stagger appearance
    }
  });


  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-[#121212] flex items-center"> {/* Darker BG */}
        {/* Animated Gradient Mesh Background */}
         <motion.div
            className="absolute inset-0 z-0 opacity-40" // Adjust opacity as needed
            animate={{
                 backgroundImage: [
                    "radial-gradient(circle at 10% 20%, #16a085 0%, transparent 40%), radial-gradient(circle at 80% 30%, #2980b9 0%, transparent 40%), radial-gradient(circle at 50% 80%, #8e44ad 0%, transparent 40%)",
                    "radial-gradient(circle at 20% 50%, #1abc9c 0%, transparent 40%), radial-gradient(circle at 70% 70%, #3498db 0%, transparent 40%), radial-gradient(circle at 30% 10%, #9b59b6 0%, transparent 40%)",
                    "radial-gradient(circle at 50% 15%, #27ae60 0%, transparent 40%), radial-gradient(circle at 15% 75%, #2c3e50 0%, transparent 40%), radial-gradient(circle at 85% 60%, #f39c12 0%, transparent 40%)",
                    "radial-gradient(circle at 10% 20%, #16a085 0%, transparent 40%), radial-gradient(circle at 80% 30%, #2980b9 0%, transparent 40%), radial-gradient(circle at 50% 80%, #8e44ad 0%, transparent 40%)", // Loop back
                 ]
            }}
            transition={{
                duration: 20, // Duration for one cycle
                ease: "linear",
                repeat: Infinity
            }}
         />

        <Navbar />

        <motion.div
            className="relative z-10 max-w-7xl w-full mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center" // Increased gap
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Left Content */}
            <div className="flex flex-col gap-5"> {/* Increased gap */}
                <motion.p variants={itemVariants} className="text-emerald-400 font-medium tracking-wider">SAMRA ATEEQUE</motion.p>
                {/* Animated Headline */}
                 <AnimatedWords
                    text="Full Stack Developer"
                    stagger={0.05} // Stagger letters/words
                    delay={0.1} // Start slightly after container
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none text-white" // Larger text
                 />

                <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 max-w-lg leading-relaxed mt-2">
                    Crafting elegant, performant, and visually stunning web experiences from concept to deployment using the MERN stack and modern animation libraries.
                </motion.p>
                <motion.div variants={itemVariants} className="mt-6">
                    <motion.a
                        href="#contact"
                         className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-8 py-3.5 rounded-full font-semibold group shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300 transform hover:-translate-y-1"
                         whileHover={{ scale: 1.05, boxShadow:"0 12px 25px -5px rgba(52, 211, 153, 0.3)" }}
                         whileTap={{ scale: 0.95 }}
                         transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    >
                        Let's Collaborate
                        <motion.div variants={{ rest: { rotate: 0 }, hover: { rotate: -45 } }} initial="rest" whileHover="hover" transition={{ duration: 0.3 }}>
                            <ArrowUpRight className="w-5 h-5 transition-transform" />
                         </motion.div>
                    </motion.a>
                </motion.div>
            </div>

             {/* Right Content - Abstract Shapes */}
             <div className="relative h-80 lg:h-96 hidden lg:flex items-center justify-center">
                 {/* Shape 1: Cube */}
                 <motion.div
                    className="absolute w-24 h-24 bg-gradient-to-br from-emerald-500/30 to-blue-500/30 border border-white/10 backdrop-blur-sm rounded-lg"
                    variants={shapeVariants(0)} initial="initial" whileInView="whileInView" animate="animate"
                    style={{ top: '10%', left: '15%'}}
                 />
                  {/* Shape 2: Sphere */}
                 <motion.div
                    className="absolute w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/5 backdrop-blur-md rounded-full"
                     variants={shapeVariants(0.5)} initial="initial" whileInView="whileInView" animate="animate"
                    style={{ bottom: '15%', right: '20%'}}
                 />
                 {/* Shape 3: Rounded Square */}
                  <motion.div
                    className="absolute w-20 h-20 bg-gradient-to-br from-yellow-500/30 to-orange-500/30 border border-white/10 backdrop-blur-sm rounded-xl"
                     variants={shapeVariants(1)} initial="initial" whileInView="whileInView" animate="animate"
                     style={{ top: '40%', right: '5%'}}
                 />
                 {/* Center Shape */}
                  <motion.div
                    className="absolute w-40 h-40 bg-gradient-to-br from-white/5 to-white/10 border border-white/10 backdrop-blur-lg rounded-2xl" // More prominent center shape
                     variants={shapeVariants(0.2)} initial="initial" whileInView="whileInView" animate="animate"
                     style={{ top: '50%', left: '50%', translateX: '-50%', translateY: '-50%'}} // Center precisely
                 />
            </div>
        </motion.div>
    </section>
  );
};

// --- ✨ REDESIGNED Brands Marquee ---
const BrandsMarquee = () => {
    const brands = [
        "Portfolio Projects", "Interior Designer Website", "Wedding Planner Website", "Animated UIs",
        "E-Commerce Solutions", "MERN Stack Apps", "React Development", "Client Collaborations" // Added more items
    ];

    // Duplicate the array for seamless looping
    const extendedBrands = [...brands, ...brands];

    const marqueeVariants = {
        animate: {
            x: ['0%', '-100%'], // Move from start to end
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30, // Adjust duration for speed
                    ease: "linear",
                },
            },
        },
    };

    return (
        // Changed BG, removed rounded top, added padding
        <div className="bg-[#121212] text-gray-600 py-10 md:py-16 overflow-hidden border-t border-b border-white/10 relative">
             {/* Gradient Fades */}
             <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-[#121212] via-[#121212]/80 to-transparent z-10"></div>
             <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-[#121212] via-[#121212]/80 to-transparent z-10"></div>

            <motion.div
                className="flex whitespace-nowrap"
                variants={marqueeVariants}
                animate="animate"
            >
                {extendedBrands.map((brand, index) => (
                    <div key={index} className="flex items-center mx-6 md:mx-10 flex-shrink-0">
                         {/* Simple text or add icons later */}
                         <span className="font-medium text-lg md:text-xl text-gray-500 italic">{brand}</span>
                         {/* Separator */}
                         <span className="mx-6 md:mx-10 text-gray-700">&bull;</span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};
