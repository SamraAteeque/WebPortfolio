import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, MapPin, Linkedin, Github, Instagram, ArrowUp } from 'lucide-react';

export default function Footer({ onContactClick }) {
    const quickLinks = ["About", "Services", "Work", "Testimonials"];
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
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <motion.footer
            className="bg-[#0A0A0A] text-gray-400 py-16 md:py-20 relative overflow-hidden border-t border-white/10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
                    {/* Column 1: Brand */}
                    <motion.div variants={itemVariants} className="sm:col-span-2 lg:col-span-4">
                        <a href="#home" className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2 mb-4">
                            <div className="w-5 h-5 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                            Samrateq
                        </a>
                        <p className="text-sm font-light leading-relaxed max-w-sm text-gray-400">
                            Full-Stack Developer passionate about crafting elegant, performant digital experiences with modern web technologies, specifically the MERN stack and GSAP/Framer Motion.
                        </p>
                    </motion.div>

                    {/* Column 2: Quick Links */}
                    <motion.div variants={itemVariants} className="lg:col-span-2 lg:col-start-6">
                        <h4 className="font-semibold text-white mb-5 tracking-widest uppercase text-xs">Navigate</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link}>
                                    <a
                                        href={`#${link.toLowerCase()}`}
                                        className="text-sm font-light hover:text-white transition-colors duration-200 text-gray-400"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Column 3: Contact Info */}
                    <motion.div variants={itemVariants} className="lg:col-span-3">
                        <h4 className="font-semibold text-white mb-5 tracking-widest uppercase text-xs">Contact</h4>
                        <ul className="space-y-4 text-sm font-light">
                            <li className="flex items-center gap-3 group">
                                <Mail className="w-4 h-4 text-emerald-500" />
                                <a href="mailto:samraateeque12@gmail.com" className="hover:text-white transition-colors">samraateeque12@gmail.com</a>
                            </li>

                            <li className="flex items-center gap-3 group">
                                <MapPin className="w-4 h-4 text-emerald-500" />
                                <span className="text-gray-400">Azamgarh, UP, India</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Column 4: Social */}
                    <motion.div variants={itemVariants} className="lg:col-span-3 flex flex-col items-start lg:items-end">
                        <h4 className="font-semibold text-white mb-5 tracking-widest uppercase text-xs w-full lg:text-right">Connect</h4>
                        <div className="flex gap-4">
                            {socialLinks.map(link => {
                                const Icon = link.icon;
                                return (
                                    <motion.a
                                        key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-300 shadow-lg"
                                        whileHover={{ y: -3 }}
                                        title={link.name}
                                    >
                                        <Icon size={18} />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
                    variants={itemVariants}
                >
                    <p className="text-xs font-light text-gray-500">&copy; {new Date().getFullYear()} Samrateq. All rights reserved.</p>
                    <button
                        onClick={scrollToTop}
                        className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white transition-colors group px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10"
                    >
                        Back to Top <ArrowUp size={14} className="transition-transform group-hover:-translate-y-1" />
                    </button>
                </motion.div>
            </div>
        </motion.footer>
    );
}
