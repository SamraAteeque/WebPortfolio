import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, Mail, Phone, MapPin, X, Star, Briefcase, Smile, PenTool } from 'lucide-react';

// --- Custom Cursor Component ---
const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isTextHovering, setIsTextHovering] = useState(false);

    useEffect(() => {
        const moveCursor = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            const target = e.target;
            const isPointer = window.getComputedStyle(target).getPropertyValue('cursor') === 'pointer';
            setIsHovering(isPointer);
            const isText = target.tagName === 'P' || target.tagName === 'H1' || target.tagName === 'H2' || target.tagName === 'H3' || target.tagName === 'H4' || target.tagName === 'SPAN';
            setIsTextHovering(isText && !isPointer);
        };
        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
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
            width: 80,
            height: 80,
            backgroundColor: "rgba(52, 211, 153, 0.1)",
            border: "1px solid rgba(52, 211, 153, 0.3)",
            x: position.x - 40,
            y: position.y - 40,
        },
        text: {
            width: 8,
            height: 80,
            borderRadius: "4px",
            backgroundColor: "rgba(52, 211, 153, 0.5)",
            border: "none",
            x: position.x - 4,
            y: position.y - 40,
        }
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
export default function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);
  
  const openReviewModal = () => setIsReviewModalOpen(true);
  const closeReviewModal = () => setIsReviewModalOpen(false);

  return (
    <div className="bg-gray-900 min-h-screen text-gray-200 font-sans antialiased md:cursor-none">
      <CustomCursor />
      <Footer onContactClick={openContactModal} />
    </div>
  );
}

// Reusable text animation variants
const textRevealVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
        }
    })
};

// --- Footer ---
// --- Footer ---
const Footer = () => {
    const footerLinks = [
        { name: "Instagram", url: "https://www.instagram.com/buildwithsamra/" },
        { name: "LinkedIn", url: "https://www.linkedin.com/in/samra-ateeque/" },
        { name: "GitHub", url: "https://github.com/samraateeque" }
    ];

    return (
        <footer className="bg-gray-900 text-gray-400 py-16">
            <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                <div>
                    <h3 className="text-xl font-bold text-white">Samra Ateeque</h3>
                    <p className="mt-2">Full Stack Developer | React, MERN, Tailwind, GSAP & Framer Motion</p>
                    <p className="mt-1">Creating responsive portfolios to interactive E-commerce and Business Website</p>
                </div>
                <div>
                    <h4 className="font-semibold text-white mb-4">Contact Info</h4>
                    <ul className="space-y-2">
                        <li className="flex items-center justify-center md:justify-start gap-2"><Mail className="w-4 h-4" /> <span>samraateeque12@gmail.com</span></li>
                        <li className="flex items-center justify-center md:justify-start gap-2"><Phone className="w-4 h-4" /> <span>+91 7755845557</span></li>
                        <li className="flex items-center justify-center md:justify-start gap-2"><MapPin className="w-4 h-4" /> <span>Remote | India</span></li>
                    </ul>
                </div>
                <div>
                     <h4 className="font-semibold text-white mb-4">Follow Me</h4>
                     <div className="flex justify-center md:justify-start gap-4">
                        {footerLinks.map(link => (
                            <motion.a 
                                key={link.name} 
                                href={link.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="hover:text-white" 
                                whileHover={{ y: -2 }}
                            >
                                {link.name}
                            </motion.a>
                        ))}
                     </div>
                </div>
            </div>
            <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm">
                <p>&copy; {new Date().getFullYear()} Samra Ateeque. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

