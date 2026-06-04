import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, MapPin, Linkedin, Github, Instagram, ArrowUp } from 'lucide-react';
import Magnetic from '../components/Magnetic.jsx';

export default function Footer() {
    const quickLinks = ["About", "Services", "Work", "Testimonials", "Contact"];
    const socialLinks = [
        { name: "Instagram", url: "https://www.instagram.com/buildwithsamra/", icon: Instagram },
        { name: "LinkedIn", url: "https://www.linkedin.com/in/samra-ateeque/", icon: Linkedin },
        { name: "GitHub", url: "https://github.com/samraateeque", icon: Github }
    ];

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 18 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } }
    };

    return (
        <motion.footer
            className="bg-[#0A0A0A] text-[#555] py-16 md:py-20 relative overflow-hidden border-t border-[#1A1A1A]"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
            {/* Top gradient line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-px bg-gradient-to-r from-transparent via-[#E63946]/20 to-transparent" />

            <div className="max-w-[1400px] mx-auto px-6 md:px-14 relative z-10">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-14">

                    {/* Brand */}
                    <motion.div variants={itemVariants} className="sm:col-span-2 lg:col-span-4">
                        <a href="#home" className="text-xl font-extrabold tracking-tighter text-[#F0EAE2] flex items-center gap-2.5 mb-5">
                            <div className="w-4 h-4 rounded-full bg-[#E63946] shadow-[0_0_10px_rgba(230,57,70,0.4)]" />
                            SAMRATEQ
                        </a>
                        <p className="text-sm font-medium leading-relaxed max-w-sm text-[#444]">
                            Full-Stack Developer crafting elegant, performant digital experiences with the MERN stack, GSAP, and Framer Motion.
                        </p>
                    </motion.div>

                    {/* Navigate */}
                    <motion.div variants={itemVariants} className="lg:col-span-2 lg:col-start-6">
                        <h4 className="font-bold text-[#F0EAE2] mb-5 tracking-widest uppercase text-[10px]">Navigate</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link}>
                                    <a
                                        href={`#${link.toLowerCase()}`}
                                        className="text-sm font-medium hover:text-[#E63946] transition-colors duration-200 text-[#444]"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact info */}
                    <motion.div variants={itemVariants} className="lg:col-span-3">
                        <h4 className="font-bold text-[#F0EAE2] mb-5 tracking-widest uppercase text-[10px]">Contact</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li className="flex items-center gap-3">
                                <Mail className="w-3.5 h-3.5 text-[#E63946] flex-shrink-0" />
                                <a href="mailto:samraateeque12@gmail.com" className="hover:text-[#E63946] transition-colors text-[#444] break-all">
                                    samraateeque12@gmail.com
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <MapPin className="w-3.5 h-3.5 text-[#E63946] flex-shrink-0" />
                                <span className="text-[#444]">Azamgarh, UP, India</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Social */}
                    <motion.div variants={itemVariants} className="lg:col-span-3 flex flex-col items-start lg:items-end">
                        <h4 className="font-bold text-[#F0EAE2] mb-5 tracking-widest uppercase text-[10px] w-full lg:text-right">Connect</h4>
                        <div className="flex gap-3">
                            {socialLinks.map(link => {
                                const Icon = link.icon;
                                return (
                                    <motion.a
                                        key={link.name}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-9 h-9 rounded-full bg-[#111] border border-[#1E1E1E] flex items-center justify-center text-[#444] hover:text-[#E63946] hover:bg-[#161616] hover:border-[#E63946]/25 transition-all duration-300"
                                        whileHover={{ y: -2 }}
                                        title={link.name}
                                    >
                                        <Icon size={16} strokeWidth={2} />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>

                {/* Bottom bar */}
                <motion.div
                    className="pt-8 border-t border-[#1A1A1A] flex flex-col md:flex-row justify-between items-center gap-4"
                    variants={itemVariants}
                >
                    <p className="text-[10px] font-medium text-[#333] tracking-wider">&copy; {new Date().getFullYear()} Samrateq. All rights reserved.</p>
                    <Magnetic strength={0.3}>
                        <button
                            onClick={scrollToTop}
                            className="flex items-center gap-2 text-[10px] font-bold text-[#444] hover:text-[#E63946] transition-colors group px-4 py-2 rounded-full bg-[#111] border border-[#1E1E1E] hover:border-[#E63946]/20 tracking-widest uppercase"
                        >
                            Back to Top <ArrowUp size={12} className="transition-transform group-hover:-translate-y-1" strokeWidth={2.5} />
                        </button>
                    </Magnetic>
                </motion.div>
            </div>
        </motion.footer>
    );
}
