import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, Mail, Phone, MapPin, X } from 'lucide-react';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-[#1E1E1E] min-h-screen text-gray-200 font-sans antialiased md:cursor-none">
      <CustomCursor />
      <ContactSection onButtonClick={openModal} />
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

// --- Animated Tag Component ---
const AnimatedTag = ({ tag, initialPosition, animation }) => {
    return (
        <motion.div
            className={`absolute px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${tag.color} ${tag.textColor}`}
            style={{
                top: initialPosition.top,
                left: initialPosition.left,
                right: initialPosition.right,
                bottom: initialPosition.bottom,
            }}
            animate={{ y: animation.y, x: animation.x }}
            transition={{
                duration: animation.duration,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
            }}
        >
            {tag.name}
        </motion.div>
    );
};

// --- Contact Section ---
const ContactSection = ({ onButtonClick }) => {
    const tags = [
        { name: "React JS", color: "bg-blue-200", textColor: "text-blue-800" },
        { name: "Tailwind CSS", color: "bg-green-200", textColor: "text-green-800" },
        { name: "GSAP Animations", color: "bg-pink-200", textColor: "text-pink-800" },
        { name: "MERN Stack", color: "bg-yellow-200", textColor: "text-yellow-800" },
        { name: "Portfolio Websites", color: "bg-purple-200", textColor: "text-purple-800" },
          { name: "Business Website", color: "bg-purple-200", textColor: "text-purple-800" },
            { name: "E-Commerce Websites", color: "bg-purple-200", textColor: "text-purple-800" },
        { name: "Responsive UI", color: "bg-cyan-200", textColor: "text-cyan-800" },
         { name: "Full Stack Development", color: "bg-indigo-200", textColor: "text-indigo-800" },
        { name: "SEO Friendly", color: "bg-orange-200", textColor: "text-orange-800" },
        { name: "Animations & Transitions", color: "bg-red-200", textColor: "text-red-800" },
    ];

    const tagConfigurations = [
        { pos: { top: '15%', left: '10%' }, anim: { y: [0, 20], x: [0, -10], duration: 15 } },
        { pos: { top: '25%', right: '5%' }, anim: { y: [0, -25], x: [0, 15], duration: 18 } },
        { pos: { top: '60%', left: '5%' }, anim: { y: [0, 15], x: [0, 20], duration: 12 } },
        { pos: { bottom: '15%', right: '12%' }, anim: { y: [0, -20], x: [0, -15], duration: 20 } },
        { pos: { top: '40%', left: '25%' }, anim: { y: [0, -15], x: [0, 10], duration: 17 } },
        { pos: { bottom: '20%', left: '30%' }, anim: { y: [0, 25], x: [0, -10], duration: 14 } },
        { pos: { top: '10%', right: '30%' }, anim: { y: [0, 10], x: [0, 15], duration: 19 } },
        { pos: { bottom: '5%', left: '45%' }, anim: { y: [0, -15], x: [0, 0], duration: 16 } },
        { pos: { top: '70%', right: '25%' }, anim: { y: [0, -10], x: [0, 20], duration: 13 } },
        { pos: { top: '5%', left: '40%' }, anim: { y: [0, 20], x: [0, 10], duration: 22 } },
    ];
    
    return(
        <section id="contact" className="bg-slate-200 text-gray-800 py-24 md:py-48 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <motion.div 
                    className="text-center flex flex-col items-center"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-gray-900">Let's Build Something Amazing Together</h2>
                    <p className="mt-6 text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        I specialize in creating stunning frontend experiences using React, Tailwind CSS, and GSAP animations. From portfolio websites to full-stack MERN applications, I craft interactive, responsive, and SEO-friendly solutions tailored to your needs.
                    </p>
                    <motion.button 
                        onClick={onButtonClick}
                        className="bg-gray-800 text-white px-10 py-4 rounded-full font-semibold mt-10 inline-block"
                        whileHover={{ scale: 1.05, backgroundColor: '#111827' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                        Let's Work Together
                    </motion.button>
                </motion.div>
            </div>
            <div className="absolute inset-0 z-0 hidden md:block">
                {tags.map((tag, i) => (
                    <AnimatedTag key={tag.name} tag={tag} initialPosition={tagConfigurations[i % tagConfigurations.length].pos} animation={tagConfigurations[i % tagConfigurations.length].anim} />
                ))}
            </div>
        </section>
    );
};

// --- Contact Modal Component ---
const ContactModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);
        
        const subject = encodeURIComponent(`New message from ${formData.name}`);
        const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
        
        setTimeout(() => {
            window.location.href = `mailto:samra@gmail.com?subject=${subject}&body=${body}`;
            setIsSubmitting(false);
            setSubmitStatus('success');
             setTimeout(() => {
                onClose();
                setSubmitStatus(null);
                setFormData({ name: '', email: '', message: '' });
             }, 2000);
        }, 1000);
    };


    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[10000] flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 50 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white text-gray-800 rounded-2xl shadow-2xl w-full max-w-lg p-8 relative"
                    >
                         <motion.button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"
                            whileHover={{ scale: 1.1, rotate: 90 }}
                        >
                            <X size={24} />
                        </motion.button>

                        <h2 className="text-3xl font-bold mb-6">Contact Me</h2>
                        
                        {submitStatus === 'success' ? (
                            <div className="text-center py-8">
                                <h3 className="text-2xl font-bold text-green-600">Thank You!</h3>
                                <p className="mt-2">Your email client should open shortly. If not, your message is ready to be sent.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">Your Name</label>
                                        <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent outline-none transition" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                                        <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent outline-none transition" />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-600 mb-1">Your Message</label>
                                        <textarea name="message" id="message" rows="4" required value={formData.message} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent outline-none transition"></textarea>
                                    </div>
                                </div>
                                <div className="mt-6">
                                     <motion.button 
                                        type="submit"
                                        className="w-full bg-gray-800 text-white px-8 py-3 rounded-full font-semibold inline-block disabled:bg-gray-400"
                                        whileHover={{ scale: 1.05, backgroundColor: '#111827' }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                    </motion.button>
                                </div>
                            </form>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
