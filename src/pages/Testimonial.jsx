import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Star, X, ArrowLeft, ArrowRight } from 'lucide-react';

// Using placeholder for Avatar as local paths might not work
// Replace with: import Avatar from '../assets/Avatar.jpg'; if your setup allows
const Avatar_placeholder = 'https://placehold.co/48x48/333333/FFFFFF?text=A';

// --- Custom Cursor Component ---
const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isTextHovering, setIsTextHovering] = useState(false);

    useEffect(() => {
        const moveCursor = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            const target = e.target;
            const isPointer = target.closest("a, button, [role='button']") || window.getComputedStyle(target).getPropertyValue('cursor') === 'pointer';
            setIsHovering(isPointer);
            const isText = ['P','H1','H2','H3','H4','SPAN', 'BLOCKQUOTE'].includes(target.tagName);
            setIsTextHovering(isText && !isPointer);
        };
        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);

    const cursorVariants = {
        default: { width: 32, height: 32, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(0,0,0,0.2)", x: position.x - 16, y: position.y - 16 }, // Adjusted for light theme potentially
        hover: { width: 80, height: 80, backgroundColor: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.3)", x: position.x - 40, y: position.y - 40 },
        text: { width: 8, height: 80, borderRadius: "4px", backgroundColor: "rgba(52,211,153,0.5)", border: "none", x: position.x - 4, y: position.y - 40 }
    };

    let currentVariant = "default";
    if (isHovering) currentVariant = "hover";
    if (isTextHovering) currentVariant = "text";

    return (
        <motion.div
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block"
            variants={cursorVariants}
            animate={currentVariant}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
    );
};

// --- Initial Testimonials ---
const initialTestimonials = [
    { id: 1, quote: "Samra created an amazing animated portfolio for us. Her attention to detail and creative use of React & GSAP animations made our website stand out.", name: "Anita Sharma", company: "Startup Founder", image: Avatar_placeholder, rating: 5 },
    { id: 2, quote: "The MERN full-stack project delivered by Samra was top-notch. Smooth functionality, responsive UI, and SEO-friendly design—highly recommended!", name: "Azad Khan", company: "Tech Entrepreneur", image: Avatar_placeholder, rating: 5 },
    { id: 3, quote: "Samra transformed our Figma designs into clean, responsive code. Her frontend animation skills with GSAP and Tailwind are excellent.", name: "Neha Kapoor", company: "UI/UX Lead", image: Avatar_placeholder, rating: 4 },
    { id: 4, quote: "Working with Samra was a breeze. Professional, timely, and the final product exceeded our expectations. The animations are fantastic!", name: "Ravi Singh", company: "Marketing Manager", image: Avatar_placeholder, rating: 5 }
];

// --- Main App Component ---
export default function App() {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  
  const openReviewModal = () => setIsReviewModalOpen(true);
  const closeReviewModal = () => setIsReviewModalOpen(false);

  const handleAddReview = (newReview) => {
    const reviewWithId = { ...newReview, id: Date.now(), image: Avatar_placeholder };
    setTestimonials(prevTestimonials => [reviewWithId, ...prevTestimonials]);
  };

  return (
    // Keep overall bg dark, ReviewTriggerSection will override it
    <div className="bg-[#121212] min-h-screen text-gray-200 font-sans antialiased md:cursor-none">
      <CustomCursor />
      <TestimonialsCarousel testimonials={testimonials} />
      <ReviewTriggerSection onButtonClick={openReviewModal} />
      <ReviewModal isOpen={isReviewModalOpen} onClose={closeReviewModal} onReviewSubmit={handleAddReview} />
    </div>
  );
}

// --- Star Rating Component ---
const StarRating = ({ rating, className = "" }) => (
    <div className={`flex items-center ${className}`}>
        {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}`} />
        ))}
    </div>
);

// --- Testimonial Card Component (for Carousel) ---
const TestimonialCard = ({ testimonial, isActive }) => {
     const cardHover = {
        hover: { boxShadow: "0px 15px 40px -10px rgba(52, 211, 153, 0.2)", transition: { type: 'spring', stiffness: 300, damping: 20 } }
    };
    if (!testimonial) return null;
    return (
        <motion.div
            className={`bg-[#1f1f1f] border border-white/10 rounded-2xl shadow-lg p-6 md:p-8 flex flex-col relative overflow-hidden transition-all duration-300 ease-in-out h-full ${isActive ? 'opacity-100 scale-100' : 'opacity-50 scale-90 md:scale-85'}`}
            variants={isActive ? cardHover : {}}
            whileHover={isActive ? "hover" : ""}
        >
            <span className="absolute top-4 right-6 text-7xl md:text-8xl text-white/5 font-serif z-0" aria-hidden="true">”</span>
             <div className="relative z-10 flex flex-col h-full">
                <StarRating rating={testimonial.rating} />
                <blockquote className="mt-4 text-gray-300 italic flex-grow text-base md:text-lg leading-relaxed">"{testimonial.quote}"</blockquote>
                <div className="flex items-center mt-6 pt-4 border-t border-white/10">
                    <img src={testimonial.image} alt={testimonial.name} className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover mr-4 border-2 border-emerald-500/50" onError={(e)=>{e.target.onerror=null;e.target.src=`https://placehold.co/48x48/333333/FFFFFF?text=${testimonial.name ? testimonial.name.charAt(0) : '?'}`}}/>
                    <div>
                        <h4 className="font-bold text-white text-sm md:text-base">{testimonial.name || 'Anonymous'}</h4>
                        <p className="text-xs md:text-sm text-gray-400">{testimonial.company || 'Reviewer'}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// --- Testimonials Carousel Component (No functional changes) ---
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
        enter: (direction) => ({ x: direction > 0 ? '150%' : '-150%', opacity: 0, scale: 0.7, zIndex: 0 }),
        center: { x: 0, opacity: 1, scale: 1, zIndex: 1, transition: { duration: 0.5, ease: "easeOut" } },
        sideLeft: { x: '-70%', opacity: 0.4, scale: 0.8, zIndex: 0, transition: { duration: 0.5, ease: "easeOut" } },
        sideRight: { x: '70%', opacity: 0.4, scale: 0.8, zIndex: 0, transition: { duration: 0.5, ease: "easeOut" } },
        exit: (direction) => ({ x: direction < 0 ? '150%' : '-150%', opacity: 0, scale: 0.7, zIndex: 0, transition: { duration: 0.4, ease: "easeOut" } })
    };

    return (
        <section id="testimonials" className="bg-[#121212] text-white py-20 md:py-32 overflow-hidden relative">
            <div className="absolute inset-0 z-0 opacity-30">
                <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-radial from-emerald-900/40 via-transparent to-transparent blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                 <motion.div className="text-center mb-12 md:mb-16" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8, ease: "easeOut" }}>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Kind Words From Clients</h2>
                    <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">See what others have to say about my work and collaboration.</p>
                </motion.div>
                <div className="relative h-[450px] md:h-[400px] flex items-center justify-center">
                    <button className="absolute left-0 md:-left-8 top-1/2 -translate-y-1/2 z-20 bg-white/5 text-white p-2 rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm disabled:opacity-30 disabled:cursor-not-allowed" onClick={() => paginate(-1)} disabled={numTestimonials <= 1}><ArrowLeft size={24} /></button>
                    <button className="absolute right-0 md:-right-8 top-1/2 -translate-y-1/2 z-20 bg-white/5 text-white p-2 rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm disabled:opacity-30 disabled:cursor-not-allowed" onClick={() => paginate(1)} disabled={numTestimonials <= 1}><ArrowRight size={24} /></button>
                    {numTestimonials > 0 ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                             <AnimatePresence initial={false} custom={direction}>
                                {numTestimonials > 1 && prevTestimonial && (<motion.div key={`prev-${prevTestimonial.id}`} custom={direction} variants={cardVariants} initial="enter" animate="sideLeft" exit="exit" className="absolute w-[80%] md:w-[65%] lg:w-[50%]" style={{ originX: 0.5, originY: 0.5 }}><TestimonialCard testimonial={prevTestimonial} isActive={false} /></motion.div>)}
                                 {currentTestimonial && (<motion.div key={`current-${currentTestimonial.id}`} custom={direction} variants={cardVariants} initial="enter" animate="center" exit="exit" className="absolute w-[90%] md:w-[75%] lg:w-[60%]" style={{ originX: 0.5, originY: 0.5 }}><TestimonialCard testimonial={currentTestimonial} isActive={true} /></motion.div>)}
                                 {numTestimonials > 1 && nextTestimonial && (<motion.div key={`next-${nextTestimonial.id}`} custom={direction} variants={cardVariants} initial="enter" animate="sideRight" exit="exit" className="absolute w-[80%] md:w-[65%] lg:w-[50%]" style={{ originX: 0.5, originY: 0.5 }}><TestimonialCard testimonial={nextTestimonial} isActive={false} /></motion.div>)}
                             </AnimatePresence>
                        </div>
                     ) : ( <div className="text-center text-gray-500">No testimonials yet.</div> )}
                </div>
                 <div className="flex justify-center gap-2 mt-8">
                     {numTestimonials > 1 && validTestimonials.map((_, index) => (<button key={index} onClick={() => { let newDirection = 0; if (index > currentIndex) newDirection = 1; else if (index < currentIndex) newDirection = -1; setDirection(newDirection); setCurrentIndex(index);}} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${ currentIndex === index ? 'bg-emerald-500 scale-125' : 'bg-gray-600 hover:bg-gray-400'}`}/>))}
                </div>
            </div>
        </section>
    );
};


// --- Star Rating Input (No changes) ---
const StarRatingInput = ({ rating, setRating }) => {
    const [hoverRating, setHoverRating] = useState(0);
    return (
        <div className="flex items-center gap-1" onMouseLeave={()=>setHoverRating(0)}>
            {[...Array(5)].map((_, i) => {
                const ratingValue = i + 1;
                return ( <motion.button key={i} type="button" onClick={()=>setRating(ratingValue)} onMouseEnter={()=>setHoverRating(ratingValue)} whileHover={{ scale:1.2 }} whileTap={{ scale:0.9 }}><Star className={`w-8 h-8 cursor-pointer transition-colors ${ratingValue <= (hoverRating || rating) ? 'text-yellow-400 fill-yellow-400':'text-gray-500 hover:text-yellow-300/50'}`} /></motion.button> );
            })}
        </div>
    );
};

// --- ✨ UPDATED Review Trigger Section (Light Theme) ---
const ReviewTriggerSection = ({ onButtonClick }) => {
     const textRevealVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] } })
    };
    return (
        // ✨ Changed background, text, border colors
        <section id="review" className="bg-white text-gray-800 py-20 md:py-32 border-t border-gray-200">
            <div className="max-w-3xl mx-auto px-4 md:px-8">
                <motion.div className="text-center flex flex-col items-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} transition={{ staggerChildren: 0.2 }}>
                    {/* ✨ Changed text color */}
                    <motion.h2 variants={textRevealVariants} className="text-3xl md:text-4xl font-bold tracking-tighter text-gray-900">
                        Share Your Experience
                    </motion.h2>
                    {/* ✨ Changed text color */}
                    <motion.p variants={textRevealVariants} custom={2} className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Loved the animations, React skills, or full-stack work? Let others know!
                    </motion.p>
                    <motion.div variants={textRevealVariants} custom={3}>
                        <motion.button
                            onClick={onButtonClick}
                             // ✨ Changed text color
                            className="mt-8 text-lg font-semibold text-emerald-600 inline-flex items-center gap-2 group"
                             whileHover={{ gap: "1rem", scale: 1.05 }}
                             transition={{type: 'spring', stiffness: 300}}
                        >
                            <span>Write a Review</span>
                            <motion.div whileHover={{ rotate: 45 }}>
                                <ArrowUpRight className="w-5 h-5 transition-transform" />
                            </motion.div>
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

// --- Review Modal (Dark Theme - No changes needed) ---
const ReviewModal = ({ isOpen, onClose, onReviewSubmit }) => {
    const [name, setName] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    useEffect(() => { if (!isOpen) { const timer = setTimeout(() => { setName(''); setReview(''); setRating(0); setSubmitted(false); }, 300); return () => clearTimeout(timer); } }, [isOpen]);
    const handleSubmit = (e) => { e.preventDefault(); if(!name || !review || rating===0) { alert("Please fill all fields & provide a rating."); return; } onReviewSubmit({ quote: review, name, company:"Valued Client", rating }); setSubmitted(true); setTimeout(onClose, 2000); };
    const inputClasses = "w-full px-4 py-2 bg-[#2a2a2a] border border-white/20 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition";
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-md z-[10000] flex items-center justify-center p-4">
                    <motion.div initial={{scale:0.9, opacity:0, y:50}} animate={{scale:1, opacity:1, y:0}} exit={{scale:0.9, opacity:0, y:50}} transition={{ type:'spring', stiffness:300, damping:30 }} onClick={(e)=>e.stopPropagation()} className="bg-[#1f1f1f] border border-white/10 text-gray-200 rounded-2xl shadow-2xl w-full max-w-lg p-8 relative">
                        <motion.button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white" whileHover={{ scale: 1.1, rotate: 90 }}><X size={24}/></motion.button>
                        <AnimatePresence mode="wait">
                            {!submitted ? (
                                <motion.div key="form" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                                    <h2 className="text-3xl font-bold mb-6 text-white">Share Your Feedback</h2>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="flex flex-col items-center"><label className="text-lg font-semibold mb-2 text-gray-300">Your Rating</label><StarRatingInput rating={rating} setRating={setRating} /></div>
                                        <div><label htmlFor="modal-name" className="block text-sm font-medium text-gray-400 mb-1">Name</label><input type="text" id="modal-name" value={name} onChange={(e)=>setName(e.target.value)} className={inputClasses} required /></div>
                                        <div><label htmlFor="modal-review" className="block text-sm font-medium text-gray-400 mb-1">Review</label><textarea id="modal-review" rows="4" value={review} onChange={(e)=>setReview(e.target.value)} className={inputClasses} required></textarea></div>
                                        <div><motion.button type="submit" className="w-full bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold inline-block hover:bg-emerald-500 transition-colors" whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }} transition={{ type:'spring', stiffness:400, damping:10 }}>Submit Review</motion.button></div>
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div key="thank-you" className="text-center py-8" initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.8}}>
                                    <h3 className="text-3xl font-bold text-emerald-400">Thank You!</h3>
                                    <p className="mt-2 text-lg text-gray-300">Your review has been submitted.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

