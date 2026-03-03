import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, ChevronDown } from 'lucide-react';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        service: 'Portfolio Website', // Default value set explicitly
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const subject = encodeURIComponent(`New Inquiry for ${formData.service} from ${formData.name}`);
        const body = encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\nService of Interest: ${formData.service}\n\nMessage:\n${formData.message}`
        );
        window.location.href = `mailto:samraateeque12@gmail.com?subject=${subject}&body=${body}`;
    };

    const inputClasses = "w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-5 text-white placeholder-gray-500 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition font-light text-sm shadow-inner";
    const labelClasses = "block text-sm font-medium text-gray-300 mb-2 pl-1 tracking-wide";

    return (
        <section id="contact" className="bg-[#0A0A0A] text-white py-24 sm:py-32 relative overflow-hidden border-t border-white/5">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-900/10 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-900/10 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                {/* Main Heading */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-16 md:mb-24"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-4 backdrop-blur-sm">
                        Contact Me
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight">
                        Let's Build Something <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Amazing.</span>
                    </h2>
                    <p className="mt-6 text-gray-400 font-light text-lg max-w-2xl mx-auto">
                        Have a project in mind or just want to explore possibilities? Fill out the form below or reach out directly.
                    </p>
                </motion.div>

                {/* Split Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                    {/* Left Column: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:col-span-5"
                    >
                        <h3 className="text-2xl font-bold mb-6 tracking-tight text-white">Get in Touch</h3>
                        <p className="text-gray-400 mb-10 font-light leading-relaxed">
                            I am currently open to new freelance opportunities. Whether you have a question or just want to say hi, my inbox is always open.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-5 group">
                                <div className="bg-white/5 border border-white/10 p-4 rounded-full group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-all duration-300 shadow-xl">
                                    <Mail size={22} className="text-emerald-400 group-hover:scale-110 transition-transform" />
                                </div>
                                <div>
                                    <p className="font-semibold text-white tracking-wide mb-1">Email</p>
                                    <a href="mailto:samraateeque12@gmail.com" className="text-gray-400 hover:text-emerald-400 transition-colors font-light text-sm">
                                        samraateeque12@gmail.com
                                    </a>
                                </div>
                            </div>



                            <div className="flex items-start gap-5 group">
                                <div className="bg-white/5 border border-white/10 p-4 rounded-full group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-all duration-300 shadow-xl">
                                    <MapPin size={22} className="text-emerald-400 group-hover:scale-110 transition-transform" />
                                </div>
                                <div>
                                    <p className="font-semibold text-white tracking-wide mb-1">Location</p>
                                    <p className="text-gray-400 font-light text-sm">Remote | Azamgarh, Uttar Pradesh, India</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:col-span-7 bg-[#111] p-8 md:p-10 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />

                        <form onSubmit={handleSubmit} className="relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label htmlFor="name" className={labelClasses}>Your Name</label>
                                    <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className={inputClasses} placeholder="John Doe" />
                                </div>
                                <div>
                                    <label htmlFor="email" className={labelClasses}>Email Address</label>
                                    <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className={inputClasses} placeholder="john@example.com" />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="service" className={labelClasses}>Service of Interest</label>
                                <select name="service" id="service" value={formData.service} onChange={handleChange} className={`${inputClasses} appearance-none cursor-pointer`}>
                                    <option value="Portfolio Website">Portfolio Website</option>
                                    <option value="Landing Page">Landing Page</option>
                                    <option value="Business Website">Business Website</option>
                                    <option value="E-commerce Store">E-commerce Store</option>
                                    <option value="Other">Other / General Inquiry</option>
                                </select>
                            </div>

                            <div className="mb-8">
                                <label htmlFor="message" className={labelClasses}>Your Message</label>
                                <textarea name="message" id="message" rows="5" required value={formData.message} onChange={handleChange} className={`${inputClasses} resize-none custom-scrollbar`} placeholder="Tell me about your project goals and requirements..."></textarea>
                            </div>

                            <motion.button
                                type="submit"
                                className="w-full bg-emerald-600 text-white px-8 py-4 rounded-full font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-[#111] transition-all"
                                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)" }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Send Message
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// --- FAQ Section ---
const FAQSection = () => {
    const faqs = [
        { q: "What is your typical turnaround time?", a: "Turnaround times vary based on project complexity. A basic landing page might take 3-5 days, while a full e-commerce or complex MERN stack solution can take 3-6 weeks. We will agree on a strict timeline before starting." },
        { q: "Do you offer post-launch support?", a: "Yes! Every project includes a 30-day bug-fixing period. I also offer scalable maintenance packages to keep your website updated, secure, and running smoothly." },
        { q: "How does the payment process work?", a: "Typically, I require a 50% upfront deposit to secure your spot in my schedule and begin work. The remaining 50% is due upon project completion and final approval, right before launch." },
        { q: "Can you work with existing designs or codebases?", a: "Absolutely. Whether you have complete Figma designs ready for development, or an existing React/MERN codebase that needs refactoring and feature additions, I can seamlessly integrate into your workflow." }
    ];

    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section className="bg-[#0A0A0A] text-white py-24 border-t border-white/5 relative overflow-hidden">
            <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-teal-900/10 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <div className="max-w-3xl mx-auto px-4 md:px-8 relative z-10">
                <motion.div className="text-center mb-16" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-4 backdrop-blur-sm">
                        FAQ
                    </div>
                    <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">Common <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Inquiries.</span></h2>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <motion.div key={idx} className="border border-white/10 bg-white/5 rounded-2xl overflow-hidden backdrop-blur-sm" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                                <button onClick={() => setOpenIndex(isOpen ? null : idx)} className="w-full flex items-center justify-between p-6 text-left focus:outline-none">
                                    <span className="font-medium text-gray-200 pr-8">{faq.q}</span>
                                    <ChevronDown className={`w-5 h-5 text-emerald-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                                            <div className="p-6 pt-0 text-gray-400 font-light leading-relaxed border-t border-white/5 mt-2 mx-6">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
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