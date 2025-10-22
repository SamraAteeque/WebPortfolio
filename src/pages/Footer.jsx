import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, Phone, MapPin, Linkedin, Github, Instagram, ArrowUp } from 'lucide-react'; // Added Linkedin, Github, Instagram, ArrowUp

// --- Custom Cursor Component ---
const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isTextHovering, setIsTextHovering] = useState(false);

    useEffect(() => {
        const moveCursor = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            const target = e.target;
            const isPointer = target.closest("a, button, [role='button']") || window.getComputedStyle(target).getPropertyValue('cursor') === 'pointer';
            setIsHovering(isPointer);
            const isText = ['P','H1','H2','H3','H4','SPAN', 'BLOCKQUOTE'].includes(target.tagName);
            setIsTextHovering(isText && !isPointer);
        };
        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);

    const cursorVariants = {
        default: { width: 32, height: 32, backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", x: position.x - 16, y: position.y - 16 },
        hover: { width: 80, height: 80, backgroundColor: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.3)", x: position.x - 40, y: position.y - 40 },
        text: { width: 8, height: 80, borderRadius: "4px", backgroundColor: "rgba(52,211,153,0.5)", border: "none", x: position.x - 4, y: position.y - 40 }
    };

    let currentVariant = "default";
    if (isHovering) currentVariant = "hover";
    if (isTextHovering) currentVariant = "text";

    return (
        <motion.div
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block"
            variants={cursorVariants}
            animate={currentVariant}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
    );
};

// --- Main App Component ---
// Assuming this App component manages the modal state
export default function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // You would have your modal logic here
  const openContactModal = () => {
      console.log("Opening Contact Modal..."); // Placeholder action
      // setIsContactModalOpen(true);
  };
   // const closeContactModal = () => setIsContactModalOpen(false);

  return (
    // ✨ Changed App background to black to match footer
    <div className="bg-black min-h-screen text-gray-200 font-sans antialiased md:cursor-none">
      <CustomCursor />
      {/* ✨ Removed Placeholder Content ✨ */}
      <Footer onContactClick={openContactModal} />
      {/* Add your ContactModal component here if it's managed by this App */}
      {/* <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} /> */}
    </div>
  );
}


// Reusable text animation variants - Not strictly needed for footer but kept if used elsewhere
const textRevealVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] } })
};

// --- ✨ REDESIGNED Footer ---
const Footer = ({ onContactClick }) => {
    const quickLinks = ["Home", "About", "Services", "Work"];
    const socialLinks = [
        { name: "Instagram", url: "https://www.instagram.com/buildwithsamra/", icon: Instagram },
        { name: "LinkedIn", url: "https://www.linkedin.com/in/samra-ateeque/", icon: Linkedin },
        { name: "GitHub", url: "https://github.com/samraateeque", icon: Github }
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } } // Adjusted stagger
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };


    return (
        <motion.footer
            className="bg-black text-gray-400 py-16 md:py-24 relative isolate" // Black background, relative isolate for glows
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }} // Trigger animation earlier
        >
             {/* Background Glows */}
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-radial from-emerald-900/30 via-transparent to-transparent blur-3xl rounded-full -translate-x-1/4 translate-y-1/4 -z-10 opacity-70"></div>
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-blue-900/20 via-transparent to-transparent blur-3xl rounded-full translate-x-1/4 -translate-y-1/4 -z-10 opacity-70"></div>


            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Top Section with Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-16">

                    {/* Column 1: Brand */}
                    <motion.div variants={itemVariants} className="sm:col-span-2 lg:col-span-1">
                        <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">Samra Ateeque</h3>
                        <p className="text-sm leading-relaxed max-w-xs">
                           Full-Stack Developer passionate about crafting elegant, performant digital experiences with modern web technologies.
                        </p>
                    </motion.div>

                    {/* Column 2: Quick Links */}
                    <motion.div variants={itemVariants}>
                        <h4 className="font-semibold text-white mb-4 tracking-wide uppercase text-sm">Navigate</h4>
                        <ul className="space-y-2.5"> {/* Increased spacing */}
                            {quickLinks.map((link) => (
                                <li key={link}>
                                    <motion.a
                                        href={`#${link.toLowerCase()}`}
                                        className="hover:text-white transition-colors duration-200 inline-block relative group text-gray-300" // Slightly lighter text
                                        whileHover="hover"
                                        initial="rest"
                                    >
                                        {link}
                                        <motion.span
                                            className="absolute bottom-0 left-0 h-[1px] bg-emerald-500 origin-left" // Thinner underline
                                            variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                                            transition={{ duration: 0.3, ease: 'easeOut' }}
                                            style={{ width: '100%' }}
                                        />
                                    </motion.a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Column 3: Contact Info */}
                    <motion.div variants={itemVariants}>
                        <h4 className="font-semibold text-white mb-4 tracking-wide uppercase text-sm">Contact</h4>
                         <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2.5 group"> {/* Increased gap */}
                                <Mail className="w-4 h-4 text-gray-500 mt-0.5 group-hover:text-emerald-400 transition-colors flex-shrink-0" />
                                <a href="mailto:samraateeque12@gmail.com" className="hover:text-white transition-colors break-words">samraateeque12@gmail.com</a>
                            </li>
                            <li className="flex items-start gap-2.5 group">
                                <Phone className="w-4 h-4 text-gray-500 mt-0.5 group-hover:text-emerald-400 transition-colors flex-shrink-0" />
                                <a href="tel:+917755845557" className="hover:text-white transition-colors">+91 7755845557</a>
                            </li>
                            <li className="flex items-start gap-2.5 group">
                                <MapPin className="w-4 h-4 text-gray-500 mt-0.5 group-hover:text-emerald-400 transition-colors flex-shrink-0" />
                                <span className="text-gray-300">Remote | Azamgarh, UP, India</span> {/* More specific */}
                            </li>
                        </ul>
                    </motion.div>

                     {/* Column 4: Social & CTA */}
                    <motion.div variants={itemVariants} className="flex flex-col items-start"> {/* Align items start */}
                       <h4 className="font-semibold text-white mb-4 tracking-wide uppercase text-sm w-full">Connect</h4>
                       <div className="flex justify-start gap-5 mb-6">
                            {socialLinks.map(link => {
                                const Icon = link.icon;
                                return (
                                <motion.a
                                    key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-emerald-400 transition-colors duration-200"
                                    whileHover={{ y: -3, scale: 1.1 }}
                                    title={link.name}
                                >
                                    <Icon size={20} /> {/* Slightly smaller icons */}
                                </motion.a>
                                );
                             })}
                        </div>
                        <motion.button
                            onClick={onContactClick}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-2.5 rounded-full font-semibold group shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300 transform hover:-translate-y-1 text-sm mt-auto" // Pushed to bottom
                            whileHover={{ scale: 1.05, boxShadow:"0 10px 20px -5px rgba(52, 211, 153, 0.3)" }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                        >
                            Get in Touch
                            <motion.div variants={{ rest: { rotate: 0 }, hover: { rotate: -45 } }} initial="rest" whileHover="hover" transition={{ duration: 0.3 }}>
                                <ArrowUpRight className="w-4 h-4 transition-transform" />
                             </motion.div>
                        </motion.button>
                    </motion.div>

                </div>

                {/* Bottom Bar */}
                <motion.div
                    className="mt-16 border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs" // Smaller text
                     initial={{ opacity: 0 }}
                     whileInView={{ opacity: 1 }}
                     viewport={{ once: true, amount: 0.1 }}
                     transition={{ duration: 0.5, delay: 0.4 }} // Adjusted delay
                >
                    <p className="text-gray-500">&copy; {new Date().getFullYear()} Samra Ateeque. Built with React & Framer Motion.</p>
                     <motion.button
                        onClick={scrollToTop}
                        className="mt-4 sm:mt-0 flex items-center gap-1.5 hover:text-white transition-colors group text-gray-500"
                        whileHover={{ y: -3 }}
                     >
                        Back to Top <ArrowUp size={14} className="transition-transform group-hover:-translate-y-0.5" />
                    </motion.button>
                </motion.div>
            </div>
        </motion.footer>
    );
};

