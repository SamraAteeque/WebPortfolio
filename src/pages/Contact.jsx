import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, ChevronDown, CheckCircle, Loader } from 'lucide-react';
import Magnetic from '../components/Magnetic.jsx';

gsap.registerPlugin(ScrollTrigger);

const ContactPage = () => {
    const sectionRef = useRef(null);
    const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'sending' | 'sent'
    const [formData, setFormData] = useState({
        name: '', email: '', service: 'Portfolio Website', message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus('sending');

        const subject = encodeURIComponent(`New Inquiry for ${formData.service} from ${formData.name}`);
        const body = encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\nService: ${formData.service}\n\nMessage:\n${formData.message}`
        );

        setTimeout(() => {
            window.open(`mailto:samraateeque12@gmail.com?subject=${subject}&body=${body}`, '_blank');
            setFormStatus('sent');

            setTimeout(() => {
                setFormStatus('idle');
                setFormData({ name: '', email: '', service: 'Portfolio Website', message: '' });
            }, 5000);
        }, 900);
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.contact-info-item', {
                x: -25, opacity: 0, stagger: 0.18, duration: 0.8, ease: "power2.out",
                scrollTrigger: { trigger: sectionRef.current, start: "top 72%" }
            });
            gsap.from('.contact-form-block', {
                x: 25, opacity: 0, duration: 0.8, ease: "power2.out",
                scrollTrigger: { trigger: sectionRef.current, start: "top 72%" }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const inputClasses = "w-full bg-[#161616] border border-[#222] rounded-xl py-3.5 px-5 text-[#F0EAE2] placeholder-[#444] focus:ring-2 focus:ring-[#E63946]/35 focus:border-[#E63946]/35 outline-none transition font-medium text-sm";
    const labelClasses = "block text-xs font-bold text-[#666] mb-2 pl-1 tracking-widest uppercase";

    return (
        <section ref={sectionRef} id="contact" className="bg-[#0A0A0A] text-[#F0EAE2] py-24 sm:py-32 relative overflow-hidden border-t border-[#1A1A1A]">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E63946]/4 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#E63946]/3 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-6 md:px-14 relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 md:mb-20"
                >
                    <div className="flex items-center gap-5 mb-8">
                        <span className="font-mono text-[11px] tracking-[0.3em] text-[#555] uppercase">06 — Contact</span>
                        <div className="flex-grow h-px bg-[#1A1A1A]" />
                    </div>
                    <h2 className="font-extrabold tracking-tighter text-[#F0EAE2]"
                        style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}>
                        Let's Build Something <span className="font-serif italic text-[#E63946]">Amazing.</span>
                    </h2>
                    <p className="mt-5 text-[#555] font-medium text-base md:text-lg max-w-xl">
                        Have a project in mind? Fill out the form or reach out directly — my inbox is always open.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                    {/* Left: Contact info */}
                    <div className="lg:col-span-4 space-y-10">
                        <div className="flex items-start gap-5 group contact-info-item">
                            <div className="bg-[#161616] border border-[#222] p-4 rounded-2xl group-hover:bg-[#E63946]/8 group-hover:border-[#E63946]/25 transition-all duration-300">
                                <Mail size={20} className="text-[#E63946]" />
                            </div>
                            <div>
                                <p className="font-bold text-[#F0EAE2] tracking-wide text-sm mb-1">Email</p>
                                <a href="mailto:samraateeque12@gmail.com" className="text-[#555] hover:text-[#E63946] transition-colors font-medium text-sm">
                                    samraateeque12@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-5 group contact-info-item">
                            <div className="bg-[#161616] border border-[#222] p-4 rounded-2xl group-hover:bg-[#E63946]/8 group-hover:border-[#E63946]/25 transition-all duration-300">
                                <MapPin size={20} className="text-[#E63946]" />
                            </div>
                            <div>
                                <p className="font-bold text-[#F0EAE2] tracking-wide text-sm mb-1">Location</p>
                                <p className="text-[#555] font-medium text-sm">Remote · Azamgarh, UP, India</p>
                            </div>
                        </div>

                        <div className="contact-info-item bg-[#111] border border-[#1A1A1A] rounded-2xl p-6">
                            <p className="font-mono text-[10px] tracking-[0.25em] text-[#444] uppercase mb-3">Response Time</p>
                            <p className="text-[#F0EAE2] font-bold text-lg">Within 24 hours</p>
                            <p className="text-[#555] text-sm font-medium mt-1">Usually much faster.</p>
                        </div>
                    </div>

                    {/* Right: Contact form */}
                    <div className="lg:col-span-8 bg-[#111] p-8 md:p-10 rounded-[2rem] border border-[#1A1A1A] shadow-2xl relative overflow-hidden contact-form-block">
                        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#E63946] to-transparent" />

                        <AnimatePresence mode="wait">
                            {formStatus === 'sent' ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="flex flex-col items-center justify-center text-center py-16 gap-5"
                                >
                                    <div className="w-16 h-16 bg-[#E63946]/10 rounded-full flex items-center justify-center border border-[#E63946]/20">
                                        <CheckCircle className="w-8 h-8 text-[#E63946]" />
                                    </div>
                                    <h3 className="text-2xl font-extrabold text-[#F0EAE2] tracking-tight">Message Sent!</h3>
                                    <p className="text-[#555] font-medium max-w-sm text-sm leading-relaxed">
                                        Your email client has opened with your message pre-filled. I'll get back to you within 24 hours.
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit}
                                    className="relative z-10"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 mt-1">
                                        <div>
                                            <label htmlFor="name" className={labelClasses}>Your Name</label>
                                            <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className={inputClasses} placeholder="John Doe" />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className={labelClasses}>Email Address</label>
                                            <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className={inputClasses} placeholder="john@example.com" />
                                        </div>
                                    </div>

                                    <div className="mb-5">
                                        <label htmlFor="service" className={labelClasses}>Service of Interest</label>
                                        <div className="relative">
                                            <select name="service" id="service" value={formData.service} onChange={handleChange} className={`${inputClasses} appearance-none cursor-pointer pr-10`}>
                                                <option value="Portfolio Website" className="bg-[#161616]">Portfolio Website</option>
                                                <option value="Landing Page" className="bg-[#161616]">Landing Page</option>
                                                <option value="Business Website" className="bg-[#161616]">Business Website</option>
                                                <option value="E-commerce Store" className="bg-[#161616]">E-commerce Store</option>
                                                <option value="Other" className="bg-[#161616]">Other / General Inquiry</option>
                                            </select>
                                            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#444] pointer-events-none" />
                                        </div>
                                    </div>

                                    <div className="mb-7">
                                        <label htmlFor="message" className={labelClasses}>Your Message</label>
                                        <textarea name="message" id="message" rows="5" required value={formData.message} onChange={handleChange} className={`${inputClasses} resize-none custom-scrollbar`} placeholder="Tell me about your project goals and requirements..." />
                                    </div>

                                    <Magnetic strength={0.2}>
                                        <motion.button
                                            type="submit"
                                            disabled={formStatus === 'sending'}
                                            className="w-full bg-[#E63946] text-white px-8 py-4 rounded-full font-bold transition-all shadow-[0_0_25px_rgba(230,57,70,0.2)] hover:bg-[#C62633] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                            whileHover={formStatus === 'idle' ? { scale: 1.02 } : {}}
                                            whileTap={formStatus === 'idle' ? { scale: 0.98 } : {}}
                                        >
                                            {formStatus === 'sending' ? (
                                                <><Loader className="w-4 h-4 animate-spin" /> Preparing...</>
                                            ) : (
                                                'Send Message'
                                            )}
                                        </motion.button>
                                    </Magnetic>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- FAQ Section ---
const FAQSection = () => {
    const faqRef = useRef(null);
    const faqs = [
        { q: "What is your typical turnaround time?", a: "It varies by complexity. A landing page takes 3–5 days; a full MERN stack solution can take 3–6 weeks. We agree on a strict timeline before starting." },
        { q: "Do you offer post-launch support?", a: "Yes — every project includes a 30-day bug-fixing period. I also offer maintenance packages to keep your site updated, secure, and running smoothly." },
        { q: "How does the payment process work?", a: "I require a 50% deposit upfront to begin work, with the remaining 50% due upon final approval before launch." },
        { q: "Can you work with existing designs or codebases?", a: "Absolutely. Whether you have Figma designs ready for development or an existing React/MERN codebase that needs new features, I can integrate into your workflow seamlessly." }
    ];
    const [openIndex, setOpenIndex] = useState(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.faq-item', {
                y: 18, opacity: 0, stagger: 0.12, duration: 0.6, ease: "power2.out",
                scrollTrigger: { trigger: faqRef.current, start: "top 78%" }
            });
        }, faqRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={faqRef} className="bg-[#0C0C0C] text-[#F0EAE2] py-24 border-t border-[#1A1A1A] relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-14 relative z-10">

                <motion.div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    <div className="lg:col-span-4">
                        <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <div className="font-mono text-[11px] tracking-[0.3em] text-[#555] uppercase mb-6">Common Questions</div>
                            <h2 className="font-extrabold tracking-tighter text-[#F0EAE2] leading-tight"
                                style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }}>
                                Common <span className="font-serif italic text-[#E63946]">Inquiries.</span>
                            </h2>
                            <p className="text-[#555] font-medium text-base mt-4 leading-relaxed">
                                Everything you need to know before we work together.
                            </p>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-8 space-y-3">
                        {faqs.map((faq, idx) => {
                            const isOpen = openIndex === idx;
                            return (
                                <div key={idx} className="faq-item border border-[#1A1A1A] bg-[#111] rounded-2xl overflow-hidden">
                                    <button
                                        onClick={() => setOpenIndex(isOpen ? null : idx)}
                                        className="w-full flex items-center justify-between p-6 text-left hover:bg-[#161616] transition-colors"
                                    >
                                        <span className="font-bold text-[#F0EAE2] text-sm md:text-base pr-6">{faq.q}</span>
                                        <ChevronDown className={`w-4 h-4 text-[#E63946] transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.28 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-6 pb-6 text-[#555] font-medium leading-relaxed text-sm border-t border-[#1A1A1A] pt-4">
                                                    {faq.a}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default function Contact() {
    return (
        <>
            <FAQSection />
            <ContactPage />
        </>
    );
}
