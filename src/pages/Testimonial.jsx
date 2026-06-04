import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Star, X, ArrowLeft, ArrowRight } from 'lucide-react';
import Magnetic from '../components/Magnetic.jsx';

gsap.registerPlugin(ScrollTrigger);

const initialTestimonials = [
    { id: 1, quote: "Samra created an amazing animated portfolio for us. Her attention to detail and creative use of React & GSAP animations made our website stand out from the competition.", name: "Anita Sharma", company: "Startup Founder", rating: 5 },
    { id: 2, quote: "The MERN full-stack project delivered by Samra was top-notch. Smooth functionality, responsive UI, and SEO-friendly design — highly recommended for any serious project.", name: "Azad Khan", company: "Tech Entrepreneur", rating: 5 },
    { id: 3, quote: "Samra transformed our Figma designs into clean, responsive code. Her frontend animation skills with GSAP and Tailwind are truly excellent — delivered on time and on budget.", name: "Neha Kapoor", company: "UI/UX Lead", rating: 4 },
    { id: 4, quote: "Working with Samra was a breeze. Professional, timely, and the final product exceeded our expectations. The animations brought our brand to life in ways we didn't think possible.", name: "Ravi Singh", company: "Marketing Manager", rating: 5 }
];

// --- Avatar with initials fallback ---
const Avatar = ({ name, size = "md" }) => {
    const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?';
    const sizeClasses = size === "md" ? "w-12 h-12 text-base" : "w-10 h-10 text-sm";
    return (
        <div className={`${sizeClasses} rounded-full bg-[#E63946]/10 border border-[#E63946]/20 flex items-center justify-center text-[#E63946] font-bold flex-shrink-0`}>
            {initials}
        </div>
    );
};

// --- Star display ---
const StarRating = ({ rating, className = "" }) => (
    <div className={`flex items-center gap-1 ${className}`}>
        {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-3.5 h-3.5 ${i < rating ? 'text-[#E63946] fill-[#E63946]' : 'text-[#2A2A2A]'}`} />
        ))}
    </div>
);

// --- Testimonial Card ---
const TestimonialCard = ({ testimonial, isActive }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e) => {
        if (!isActive) return;
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    if (!testimonial) return null;

    return (
        <motion.div
            style={{ rotateX: isActive ? rotateX : 0, rotateY: isActive ? rotateY : 0, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { if (isActive) { x.set(0); y.set(0); } }}
            className="perspective-1000 w-full h-full"
        >
            <div
                className={`flex flex-col p-8 md:p-10 rounded-3xl border h-full transition-all duration-500 relative overflow-hidden ${
                    isActive
                        ? 'bg-[#131313] border-[#E63946]/20 opacity-100 scale-100 backdrop-blur-xl shadow-[0_0_50px_rgba(230,57,70,0.06)]'
                        : 'bg-[#0E0E0E] border-[#1A1A1A] opacity-40 scale-95'
                }`}
                style={{ transform: "translateZ(25px)" }}
            >
                {isActive && <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#E63946]/60 to-transparent" />}

                <span className="absolute -top-4 -right-2 text-[9rem] text-[#E63946]/4 font-serif z-0 leading-none select-none" style={{ transform: "translateZ(8px)" }}>"</span>

                <div className="relative z-10 flex flex-col h-full" style={{ transform: "translateZ(30px)" }}>
                    <StarRating rating={testimonial.rating} />
                    <blockquote className="mt-5 text-[#888] font-medium flex-grow text-base md:text-lg leading-relaxed">
                        "{testimonial.quote}"
                    </blockquote>

                    <div className="flex items-center mt-8 pt-6 border-t border-[#1A1A1A] gap-4">
                        <Avatar name={testimonial.name} />
                        <div>
                            <h4 className="font-bold text-[#F0EAE2] text-sm tracking-wide">{testimonial.name || 'Anonymous'}</h4>
                            <p className="text-[10px] text-[#E63946] font-bold tracking-wider uppercase mt-0.5">{testimonial.company || 'Client'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// --- Carousel ---
const TestimonialsCarousel = ({ testimonials }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const validTestimonials = Array.isArray(testimonials) ? testimonials : [];
    const n = validTestimonials.length;

    const paginate = (d) => {
        if (n <= 1) return;
        setDirection(d);
        setCurrentIndex(prev => (prev + d + n) % n);
    };

    const safe = (i) => n > 0 ? (i + n) % n : 0;
    const prevI = safe(currentIndex - 1);
    const nextI = safe(currentIndex + 1);

    const cardVariants = {
        enter: (d) => ({ x: d > 0 ? '150%' : '-150%', opacity: 0, scale: 0.8 }),
        center: { x: 0, opacity: 1, scale: 1, zIndex: 1, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
        sideLeft: { x: '-72%', opacity: 0.5, scale: 0.85, zIndex: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
        sideRight: { x: '72%', opacity: 0.5, scale: 0.85, zIndex: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
        exit: (d) => ({ x: d < 0 ? '150%' : '-150%', opacity: 0, scale: 0.8, transition: { duration: 0.5 } })
    };

    return (
        <section id="testimonials" className="bg-[#0A0A0A] text-[#F0EAE2] py-24 md:py-32 overflow-hidden relative border-t border-[#1A1A1A]">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#E63946]/5 blur-[160px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-6 md:px-14 relative z-10">

                <motion.div className="mb-14 md:mb-20" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <div className="flex items-center gap-5 mb-8">
                        <span className="font-mono text-[11px] tracking-[0.3em] text-[#555] uppercase">05 — Testimonials</span>
                        <div className="flex-grow h-px bg-[#1A1A1A]" />
                    </div>
                    <h2 className="font-extrabold tracking-tighter text-[#F0EAE2]"
                        style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}>
                        Client <span className="font-serif italic text-[#E63946]">Perspectives.</span>
                    </h2>
                </motion.div>

                <div className="relative h-[440px] md:h-[400px] flex items-center justify-center" style={{ perspective: '1500px' }}>
                    <button className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-[#161616] text-[#F0EAE2] p-3.5 rounded-full hover:bg-[#E63946] hover:text-white transition-all border border-[#1E1E1E] shadow-lg disabled:opacity-20 hover:scale-110 active:scale-95" onClick={() => paginate(-1)} disabled={n <= 1}><ArrowLeft size={18} strokeWidth={2.5} /></button>
                    <button className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-[#161616] text-[#F0EAE2] p-3.5 rounded-full hover:bg-[#E63946] hover:text-white transition-all border border-[#1E1E1E] shadow-lg disabled:opacity-20 hover:scale-110 active:scale-95" onClick={() => paginate(1)} disabled={n <= 1}><ArrowRight size={18} strokeWidth={2.5} /></button>

                    {n > 0 ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <AnimatePresence initial={false} custom={direction}>
                                {n > 1 && (<motion.div key={`prev-${prevI}`} custom={direction} variants={cardVariants} initial="enter" animate="sideLeft" exit="exit" className="absolute w-[80%] md:w-[58%] lg:w-[44%] max-w-2xl"><TestimonialCard testimonial={validTestimonials[prevI]} isActive={false} /></motion.div>)}
                                {(<motion.div key={`cur-${currentIndex}`} custom={direction} variants={cardVariants} initial="enter" animate="center" exit="exit" className="absolute w-[88%] md:w-[65%] lg:w-[48%] max-w-3xl z-10"><TestimonialCard testimonial={validTestimonials[currentIndex]} isActive={true} /></motion.div>)}
                                {n > 1 && (<motion.div key={`next-${nextI}`} custom={direction} variants={cardVariants} initial="enter" animate="sideRight" exit="exit" className="absolute w-[80%] md:w-[58%] lg:w-[44%] max-w-2xl"><TestimonialCard testimonial={validTestimonials[nextI]} isActive={false} /></motion.div>)}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <p className="text-[#444] font-medium">No testimonials yet.</p>
                    )}
                </div>

                {n > 1 && (
                    <div className="flex justify-center gap-3 mt-10">
                        {validTestimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => { setDirection(index > currentIndex ? 1 : -1); setCurrentIndex(index); }}
                                className={`h-2 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-[#E63946] w-10 shadow-[0_0_8px_rgba(230,57,70,0.5)]' : 'bg-[#2A2A2A] w-2 hover:bg-[#3A3A3A]'}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

// --- Review Trigger ---
const ReviewTriggerSection = ({ onButtonClick }) => {
    const triggerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.review-trigger-content',
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)", scrollTrigger: { trigger: triggerRef.current, start: "top 80%" } }
            );
        }, triggerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={triggerRef} className="bg-[#0C0C0C] text-[#F0EAE2] py-20 md:py-28 border-t border-[#1A1A1A] relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(230,57,70,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(230,57,70,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-6 md:px-14 relative z-10">
                <div className="review-trigger-content flex flex-col md:flex-row items-start md:items-center justify-between gap-8 bg-[#131313]/80 backdrop-blur-xl border border-[#1E1E1E] rounded-[2.5rem] p-10 md:p-14 shadow-2xl">
                    <div>
                        <h2 className="text-2xl md:text-4xl font-extrabold tracking-tighter text-[#F0EAE2] mb-3">
                            Share Your Experience
                        </h2>
                        <p className="text-[#555] font-medium max-w-md text-base">
                            Worked together? I'd love to hear your feedback. Your review helps others make informed decisions.
                        </p>
                    </div>
                    <Magnetic strength={0.4}>
                        <button
                            onClick={onButtonClick}
                            className="group flex-shrink-0 bg-[#E63946] text-white px-8 py-4 rounded-full font-bold inline-flex items-center gap-2 hover:bg-[#C62633] active:scale-95 transition-all shadow-[0_0_25px_rgba(230,57,70,0.25)] whitespace-nowrap"
                        >
                            Write a Review
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={2.5} />
                        </button>
                    </Magnetic>
                </div>
            </div>
        </section>
    );
};

// --- Star Rating Input ---
const StarRatingInput = ({ rating, setRating }) => {
    const [hoverRating, setHoverRating] = useState(0);
    return (
        <div className="flex items-center gap-2" onMouseLeave={() => setHoverRating(0)}>
            {[...Array(5)].map((_, i) => {
                const v = i + 1;
                return (
                    <motion.button key={i} type="button" onClick={() => setRating(v)} onMouseEnter={() => setHoverRating(v)} whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                        <Star className={`w-7 h-7 cursor-pointer transition-colors ${v <= (hoverRating || rating) ? 'text-[#E63946] fill-[#E63946]' : 'text-[#2A2A2A] hover:text-[#E63946]/50'}`} />
                    </motion.button>
                );
            })}
        </div>
    );
};

// --- Review Modal ---
const ReviewModal = ({ isOpen, onClose, onReviewSubmit }) => {
    const [name, setName] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            const t = setTimeout(() => { setName(''); setReview(''); setRating(0); setSubmitted(false); }, 300);
            return () => clearTimeout(t);
        }
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !review || rating === 0) { alert("Please fill all fields and provide a rating."); return; }
        onReviewSubmit({ quote: review, name, company: "Valued Client", rating });
        setSubmitted(true);
        setTimeout(onClose, 2200);
    };

    const inputClasses = "w-full px-4 py-3.5 bg-[#161616] border border-[#222] rounded-xl text-[#F0EAE2] placeholder-[#444] focus:ring-2 focus:ring-[#E63946]/40 focus:border-[#E63946]/40 outline-none transition font-medium text-sm";

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/70 backdrop-blur-md z-[10000] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        onClick={e => e.stopPropagation()}
                        className="bg-[#111] border border-[#222] text-[#F0EAE2] rounded-3xl shadow-2xl w-full max-w-lg p-8 md:p-10 relative overflow-hidden"
                    >
                        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#E63946] to-[#C62633]" />
                        <motion.button onClick={onClose} className="absolute top-6 right-6 text-[#444] hover:text-[#F0EAE2]" whileHover={{ scale: 1.1, rotate: 90 }}><X size={22} strokeWidth={2.5} /></motion.button>

                        <AnimatePresence mode="wait">
                            {!submitted ? (
                                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <h2 className="text-2xl font-extrabold mb-1.5 text-[#F0EAE2] tracking-tight mt-1">Leave Feedback</h2>
                                    <p className="text-[#555] text-sm font-medium mb-7">Share your thoughts on working together.</p>

                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div>
                                            <label className="text-xs font-bold mb-2 text-[#888] uppercase tracking-wider block">Your Rating</label>
                                            <StarRatingInput rating={rating} setRating={setRating} />
                                        </div>
                                        <div>
                                            <label htmlFor="r-name" className="block text-xs font-bold text-[#888] uppercase tracking-wider mb-2">Name</label>
                                            <input type="text" id="r-name" value={name} onChange={e => setName(e.target.value)} className={inputClasses} placeholder="John Doe" required />
                                        </div>
                                        <div>
                                            <label htmlFor="r-review" className="block text-xs font-bold text-[#888] uppercase tracking-wider mb-2">Review</label>
                                            <textarea id="r-review" rows="4" value={review} onChange={e => setReview(e.target.value)} className={`${inputClasses} resize-none custom-scrollbar`} placeholder="Share your experience..." required />
                                        </div>
                                        <div className="pt-1">
                                            <Magnetic strength={0.1}>
                                                <motion.button type="submit" className="w-full bg-[#E63946] text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-[#C62633] transition-colors shadow-[0_0_20px_rgba(230,57,70,0.2)]" whileTap={{ scale: 0.98 }}>
                                                    Submit Review
                                                </motion.button>
                                            </Magnetic>
                                        </div>
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div key="thanks" className="text-center py-12 flex flex-col items-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                                    <div className="w-16 h-16 bg-[#E63946]/10 rounded-full flex items-center justify-center mb-5 border border-[#E63946]/20">
                                        <Star className="w-7 h-7 text-[#E63946] fill-[#E63946]" />
                                    </div>
                                    <h3 className="text-2xl font-extrabold text-[#F0EAE2] mb-2">Thank You!</h3>
                                    <p className="text-[#555] font-medium text-sm">Your review has been submitted successfully.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default function Testimonial() {
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [testimonials, setTestimonials] = useState(initialTestimonials);

    const handleAddReview = (newReview) => {
        setTestimonials(prev => [{ ...newReview, id: Date.now() }, ...prev]);
    };

    return (
        <>
            <TestimonialsCarousel testimonials={testimonials} />
            <ReviewTriggerSection onButtonClick={() => setIsReviewModalOpen(true)} />
            <ReviewModal isOpen={isReviewModalOpen} onClose={() => setIsReviewModalOpen(false)} onReviewSubmit={handleAddReview} />
        </>
    );
}
