import React from "react";
import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";

export default function CallToAction() {
    return (
        <section className="relative w-full py-24 md:py-32 px-4 md:px-8 bg-[#0A0A0A]">
            <div className="max-w-7xl mx-auto flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="w-full bg-[#121212] overflow-hidden rounded-[2rem] p-8 md:p-16 lg:p-24 text-center relative border border-white/5"
                >
                    {/* Background Highlight / Glow effect */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[500px] bg-emerald-500/10 blur-[100px] rounded-full point-events-none" />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col items-center gap-6 relative z-10"
                    >
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-emerald-400 mb-4 ring-1 ring-white/10">
                            <Mail size={32} />
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight">
                            Have a project in mind?
                        </h2>
                        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            Let's create something extraordinary together. Whether it's a seamless user experience, a stunning website, or a disruptive app—I'm ready to bring your vision to life.
                        </p>

                        <button className="mt-8 flex items-center justify-center gap-3 bg-white text-black hover:bg-emerald-500 hover:text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 group">
                            <span>Start a Conversation</span>
                            <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform w-6 h-6" />
                        </button>

                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
