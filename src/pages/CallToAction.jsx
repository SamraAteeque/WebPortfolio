import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Magnetic from "../components/Magnetic.jsx";

export default function CallToAction() {
    const handleClick = () => {
        const contactEl = document.getElementById('contact');
        if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative w-full py-20 md:py-28 px-6 md:px-14 bg-[#0A0A0A] border-t border-[#1A1A1A]">
            <div className="max-w-[1400px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full bg-[#E63946] overflow-hidden rounded-[2.5rem] p-10 md:p-16 lg:p-20"
                >
                    {/* Noise texture layer */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.08)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />

                    {/* Glow behind */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#C62633] blur-[100px] rounded-full pointer-events-none opacity-60" />

                    {/* Decorative circles */}
                    <div className="absolute top-[-30%] right-[-10%] w-[400px] h-[400px] rounded-full border border-white/10 pointer-events-none" />
                    <div className="absolute bottom-[-20%] left-[10%] w-[300px] h-[300px] rounded-full border border-white/8 pointer-events-none" />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10"
                    >
                        <div className="max-w-2xl">
                            <p className="font-mono text-[11px] tracking-[0.3em] text-white/60 uppercase mb-5">Ready to start?</p>
                            <h2 className="font-extrabold text-white tracking-tighter leading-[0.92]"
                                style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}>
                                Have a project<br />in mind?
                            </h2>
                            <p className="text-white/70 text-base md:text-lg mt-6 leading-relaxed font-medium max-w-xl">
                                Let's create something extraordinary together — a seamless user experience, a stunning website, or a high-converting app. I'm ready to bring your vision to life.
                            </p>
                        </div>

                        <Magnetic strength={0.3}>
                            <button
                                onClick={handleClick}
                                className="group flex-shrink-0 flex items-center gap-3 bg-[#0A0A0A] text-[#F0EAE2] hover:bg-[#161616] px-9 py-5 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 active:scale-97 shadow-2xl border border-white/10 whitespace-nowrap"
                            >
                                Start a Conversation
                                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={2.5} />
                            </button>
                        </Magnetic>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
