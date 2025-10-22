import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        service: '', // Default value
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
        // !!! IMPORTANT: Change this email to your own !!!
        window.location.href = `mailto:youremail@example.com?subject=${subject}&body=${body}`;
    };

    const inputClasses = "w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-black placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition";
    const labelClasses = "block text-sm font-medium text-gray-300 mb-2";

    return (
        <section id="contact" className="bg-[#111111] text-white py-24 sm:py-32">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Main Heading */}
                <motion.div 
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
                        Let's Build Something <span className="text-emerald-400">Amazing</span>
                    </h2>
                    <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
                        Have a project in mind or just want to say hi? Fill out the form or use the contact info below.
                    </p>
                </motion.div>

                {/* Split Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    
                    {/* Left Column: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                        <p className="text-gray-400 mb-8">
                            Feel free to reach out via email or phone. I'm always open to discussing new projects and creative ideas.
                        </p>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="bg-white/10 p-3 rounded-full">
                                    <Mail size={20} className="text-emerald-400" />
                                </div>
                                <div>
                                    <p className="font-semibold">Email</p>
                                    <a href="mailto:youremail@example.com" className="text-gray-300 hover:text-emerald-400 transition-colors">
                                        samraateeque12@gmail.com
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="bg-white/10 p-3 rounded-full">
                                    <Phone size={20} className="text-emerald-400" />
                                </div>
                                <div>
                                    <p className="font-semibold">Phone</p>
                                    <a href="tel:+911234567890" className="text-gray-300 hover:text-emerald-400 transition-colors">
                                        +91 7755845557
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="bg-white/10 p-3 rounded-full">
                                    <MapPin size={20} className="text-emerald-400" />
                                </div>
                                <div>
                                    <p className="font-semibold">Location</p>
                                    <p className="text-gray-300">Azamgarh, Uttar Pradesh, India</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-lg"
                    >
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="name" className={labelClasses}>Your Name</label>
                                    <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className={inputClasses} />
                                </div>
                                <div>
                                    <label htmlFor="email" className={labelClasses}>Email Address</label>
                                    <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className={inputClasses} />
                                </div>
                                <div>
                                    <label htmlFor="service" className={labelClasses}>Service of Interest</label>
                                    <select name="service" id="service" value={formData.service} onChange={handleChange} className={inputClasses}>
                                        <option>Portfolio Website</option>
                                        <option>Landing Page</option>
                                        <option>Business Website</option>
                                        <option>E-commerce Store</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="message" className={labelClasses}>Your Message</label>
                                    <textarea name="message" id="message" rows="5" required value={formData.message} onChange={handleChange} className={inputClasses} placeholder="Tell me about your project..."></textarea>
                                </div>
                            </div>
                            <div className="mt-8">
                                <motion.button
                                    type="submit"
                                    className="w-full bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold"
                                    whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(52, 211, 153, 0.5)" }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                                >
                                    Send Message
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactPage;