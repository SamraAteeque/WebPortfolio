import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Star, X, ArrowLeft, ArrowRight } from 'lucide-react';

const Avatar_placeholder = 'https://placehold.co/48x48/1A1A1A/FFFFFF?text=A';

// --- Initial Testimonials ---
const initialTestimonials = [
    { id: 1, quote: "Samra created an amazing animated portfolio for us. Her attention to detail and creative use of React & GSAP animations made our website stand out.", name: "Anita Sharma", company: "Startup Founder", image: Avatar_placeholder, rating: 5 },
    { id: 2, quote: "The MERN full-stack project delivered by Samra was top-notch. Smooth functionality, responsive UI, and SEO-friendly design—highly recommended!", name: "Azad Khan", company: "Tech Entrepreneur", image: Avatar_placeholder, rating: 5 },
    { id: 3, quote: "Samra transformed our Figma designs into clean, responsive code. Her frontend animation skills with GSAP and Tailwind are excellent.", name: "Neha Kapoor", company: "UI/UX Lead", image: Avatar_placeholder, rating: 4 },
    { id: 4, quote: "Working with Samra was a breeze. Professional, timely, and the final product exceeded our expectations. The animations are fantastic!", name: "Ravi Singh", company: "Marketing Manager", image: Avatar_placeholder, rating: 5 }
];

export default function Testimonial() {
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [testimonials, setTestimonials] = useState(initialTestimonials);

    const openReviewModal = () => setIsReviewModalOpen(true);
    const closeReviewModal = () => setIsReviewModalOpen(false);

    const handleAddReview = (newReview) => {
        const reviewWithId = { ...newReview, id: Date.now(), image: Avatar_placeholder };
        setTestimonials(prevTestimonials => [reviewWithId, ...prevTestimonials]);
    };

    return (
        <>
            <TestimonialsCarousel testimonials={testimonials} />
            <ReviewTriggerSection onButtonClick={openReviewModal} />
            <ReviewModal isOpen={isReviewModalOpen} onClose={closeReviewModal} onReviewSubmit={handleAddReview} />
        </>
    );
}

// --- Star Rating Component ---
const StarRating = ({ rating, className = "" }) => (
    <div className={`flex items-center gap-1 ${className}`}>
        {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-emerald-400 fill-emerald-400' : 'text-white/10'}`} />
        ))}
    </div>
);

// --- Testimonial Card Component (for Carousel) ---
const TestimonialCard = ({ testimonial, isActive }) => {
    const cardHover = {
        hover: { boxShadow: "0px 15px 40px -10px rgba(16, 185, 129, 0.15)", transition: { type: 'spring', stiffness: 300, damping: 20 } }
    };
    if (!testimonial) return null;
    return (
        <motion.div
            className={`bg-[#111] border border-white/5 rounded-3xl shadow-2xl p-8 md:p-10 flex flex-col relative overflow-hidden transition-all duration-500 ease-[0.16_1_0.3_1] h-full ${isActive ? 'opacity-100 scale-100 border-white/10 bg-white/5 backdrop-blur-xl' : 'opacity-40 scale-90 md:scale-95'}`}
            variants={isActive ? cardHover : {}}
            whileHover={isActive ? "hover" : ""}
        >
            <span className="absolute -top-4 -right-2 text-[10rem] text-white/5 font-serif z-0 leading-none select-none" aria-hidden="true">”</span>

            <div className="relative z-10 flex flex-col h-full">
                <StarRating rating={testimonial.rating} />
                <blockquote className="mt-6 text-gray-300 font-light flex-grow text-lg md:text-xl leading-relaxed">"{testimonial.quote}"</blockquote>

                <div className="flex items-center mt-8 pt-6 border-t border-white/10">
                    <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover mr-4 border border-white/10 shadow-lg"
                        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/48x48/1A1A1A/FFFFFF?text=${testimonial.name ? testimonial.name.charAt(0) : '?'}` }}
                    />
                    <div>
                        <h4 className="font-semibold text-white text-base md:text-lg tracking-wide">{testimonial.name || 'Anonymous'}</h4>
                        <p className="text-xs md:text-sm text-emerald-500 font-medium tracking-wide uppercase mt-0.5">{testimonial.company || 'Reviewer'}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// --- Testimonials Carousel Component ---
const TestimonialsCarousel = ({ testimonials }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const validTestimonials = Array.isArray(testimonials) ? testimonials : [];
    const numTestimonials = validTestimonials.length;

    const paginate = (newDirection) => {
        if (numTestimonials <= 1) return;
        setDirection(newDirection);
        setCurrentIndex(prevIndex => (prevIndex + newDirection + numTestimonials) % numTestimonials);
    };

    const safeIndex = (index) => numTestimonials > 0 ? (index + numTestimonials) % numTestimonials : 0;
    const prevIndex = safeIndex(currentIndex - 1);
    const nextIndex = safeIndex(currentIndex + 1);
    const getTestimonial = (index) => numTestimonials > 0 ? validTestimonials[index] : null;
    const prevTestimonial = getTestimonial(prevIndex);
    const currentTestimonial = getTestimonial(currentIndex);
    const nextTestimonial = getTestimonial(nextIndex);

    const cardVariants = {
        enter: (direction) => ({ x: direction > 0 ? '150%' : '-150%', opacity: 0, scale: 0.8, zIndex: 0 }),
        center: { x: 0, opacity: 1, scale: 1, zIndex: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
        sideLeft: { x: '-75%', opacity: 0.4, scale: 0.85, zIndex: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
        sideRight: { x: '75%', opacity: 0.4, scale: 0.85, zIndex: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
        exit: (direction) => ({ x: direction < 0 ? '150%' : '-150%', opacity: 0, scale: 0.8, zIndex: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } })
    };

    return (
        <section id="testimonials" className="bg-[#0A0A0A] text-white py-24 md:py-32 overflow-hidden relative border-t border-white/5">
            <div className="absolute inset-0 z-0 opacity-40">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-900/10 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-screen pointer-events-none"></div>
            </div>

            <div className="max-w-[90rem] mx-auto px-4 md:px-8 relative z-10">
                <motion.div className="text-center mb-16 md:mb-24" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }}>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-4 backdrop-blur-sm">
                        Testimonials
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-tight">
                        Client <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Perspectives.</span>
                    </h2>
                </motion.div>

                <div className="relative h-[480px] md:h-[420px] flex items-center justify-center">
                    <button className="absolute left-2 md:left-12 top-1/2 -translate-y-1/2 z-20 bg-white/5 text-white p-3.5 rounded-full hover:bg-white/10 transition-colors backdrop-blur-xl border border-white/10 shadow-2xl disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 active:scale-95" onClick={() => paginate(-1)} disabled={numTestimonials <= 1}><ArrowLeft size={20} /></button>
                    <button className="absolute right-2 md:right-12 top-1/2 -translate-y-1/2 z-20 bg-white/5 text-white p-3.5 rounded-full hover:bg-white/10 transition-colors backdrop-blur-xl border border-white/10 shadow-2xl disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 active:scale-95" onClick={() => paginate(1)} disabled={numTestimonials <= 1}><ArrowRight size={20} /></button>

                    {numTestimonials > 0 ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <AnimatePresence initial={false} custom={direction}>
                                {numTestimonials > 1 && prevTestimonial && (<motion.div key={`prev-${prevTestimonial.id}`} custom={direction} variants={cardVariants} initial="enter" animate="sideLeft" exit="exit" className="absolute w-[80%] md:w-[60%] lg:w-[45%] max-w-2xl"><TestimonialCard testimonial={prevTestimonial} isActive={false} /></motion.div>)}
                                {currentTestimonial && (<motion.div key={`current-${currentTestimonial.id}`} custom={direction} variants={cardVariants} initial="enter" animate="center" exit="exit" className="absolute w-[85%] md:w-[70%] lg:w-[50%] max-w-3xl z-10"><TestimonialCard testimonial={currentTestimonial} isActive={true} /></motion.div>)}
                                {numTestimonials > 1 && nextTestimonial && (<motion.div key={`next-${nextTestimonial.id}`} custom={direction} variants={cardVariants} initial="enter" animate="sideRight" exit="exit" className="absolute w-[80%] md:w-[60%] lg:w-[45%] max-w-2xl"><TestimonialCard testimonial={nextTestimonial} isActive={false} /></motion.div>)}
                            </AnimatePresence>
                        </div>
                    ) : (<div className="text-center text-gray-500">No testimonials yet.</div>)}
                </div>

                <div className="flex justify-center gap-3 mt-12">
                    {numTestimonials > 1 && validTestimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => { let newDirection = 0; if (index > currentIndex) newDirection = 1; else if (index < currentIndex) newDirection = -1; setDirection(newDirection); setCurrentIndex(index); }}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-emerald-500 w-8 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-white/20 hover:bg-white/40'}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- Star Rating Input ---
const StarRatingInput = ({ rating, setRating }) => {
    const [hoverRating, setHoverRating] = useState(0);
    return (
        <div className="flex items-center gap-1.5" onMouseLeave={() => setHoverRating(0)}>
            {[...Array(5)].map((_, i) => {
                const ratingValue = i + 1;
                return (
                    <motion.button
                        key={i} type="button"
                        onClick={() => setRating(ratingValue)}
                        onMouseEnter={() => setHoverRating(ratingValue)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Star className={`w-8 h-8 cursor-pointer transition-colors ${ratingValue <= (hoverRating || rating) ? 'text-emerald-400 fill-emerald-400' : 'text-white/10 hover:text-emerald-500/50'}`} />
                    </motion.button>
                );
            })}
        </div>
    );
};

// --- Review Trigger Section ---
const ReviewTriggerSection = ({ onButtonClick }) => {
    const textRevealVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] } })
    };
    return (
        <section className="bg-[#111] text-white py-24 md:py-32 border-t border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
                <motion.div className="text-center flex flex-col items-center bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-[3rem] p-12 md:p-16 shadow-2xl" initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ staggerChildren: 0.1 }}>
                    <motion.h2 variants={textRevealVariants} className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-4">
                        Share Your Experience
                    </motion.h2>
                    <motion.p variants={textRevealVariants} custom={2} className="text-lg text-gray-400 font-light max-w-xl mx-auto mb-10">
                        Loved the animations, React skills, or the overall design? I highly value your feedback. Let others know!
                    </motion.p>
                    <motion.div variants={textRevealVariants} custom={3}>
                        <motion.button
                            onClick={onButtonClick}
                            className="bg-white text-black px-8 py-3.5 rounded-full font-semibold inline-flex items-center gap-2 group hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] text-sm"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Write a Review
                                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </span>
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

// --- Review Modal ---
const ReviewModal = ({ isOpen, onClose, onReviewSubmit }) => {
    const [name, setName] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { if (!isOpen) { const timer = setTimeout(() => { setName(''); setReview(''); setRating(0); setSubmitted(false); }, 300); return () => clearTimeout(timer); } }, [isOpen]);

    const handleSubmit = (e) => { e.preventDefault(); if (!name || !review || rating === 0) { alert("Please fill all fields & provide a rating."); return; } onReviewSubmit({ quote: review, name, company: "Valued Client", rating }); setSubmitted(true); setTimeout(onClose, 2000); };

    const inputClasses = "w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition font-light text-sm";

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-md z-[10000] flex items-center justify-center p-4">
                    <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} onClick={(e) => e.stopPropagation()} className="bg-[#0A0A0A] border border-white/10 text-gray-200 rounded-3xl shadow-2xl w-full max-w-lg p-8 md:p-10 relative overflow-hidden">

                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
                        <motion.button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white" whileHover={{ scale: 1.1, rotate: 90 }}><X size={24} /></motion.button>

                        <AnimatePresence mode="wait">
                            {!submitted ? (
                                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <h2 className="text-2xl font-bold mb-2 text-white tracking-tight">Leave Feedback</h2>
                                    <p className="text-gray-400 text-sm font-light mb-8">Share your thoughts on working together.</p>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="flex flex-col"><label className="text-sm font-medium mb-2 text-gray-300">Your Rating</label><StarRatingInput rating={rating} setRating={setRating} /></div>
                                        <div><label htmlFor="modal-name" className="block text-sm font-medium text-gray-300 mb-2">Name</label><input type="text" id="modal-name" value={name} onChange={(e) => setName(e.target.value)} className={inputClasses} placeholder="John Doe" required /></div>
                                        <div><label htmlFor="modal-review" className="block text-sm font-medium text-gray-300 mb-2">Review</label><textarea id="modal-review" rows="4" value={review} onChange={(e) => setReview(e.target.value)} className={`${inputClasses} resize-none custom-scrollbar`} placeholder="Write your experience here..." required></textarea></div>
                                        <div className="pt-2"><motion.button type="submit" className="w-full bg-emerald-600 text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-emerald-500 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.2)]" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>Submit Review</motion.button></div>
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div key="thank-you" className="text-center py-12 flex flex-col items-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                                    <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20">
                                        <Star className="w-8 h-8 text-emerald-400 fill-emerald-400" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-2">Thank You!</h3>
                                    <p className="text-gray-400 font-light">Your review has been successfully submitted and will be displayed shortly.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
