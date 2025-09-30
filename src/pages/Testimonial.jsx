import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Star, X } from 'lucide-react';
import Avatar from '../assets/Avatar.jpg'

// --- Custom Cursor Component ---
const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isTextHovering, setIsTextHovering] = useState(false);

    useEffect(() => {
        const moveCursor = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            const target = e.target;
            const isPointer = window.getComputedStyle(target).getPropertyValue('cursor') === 'pointer';
            setIsHovering(isPointer);
            const isText = ['P','H1','H2','H3','H4','SPAN'].includes(target.tagName);
            setIsTextHovering(isText && !isPointer);
        };
        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);

    const cursorVariants = {
        default: { width: 32, height: 32, backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", x: position.x - 16, y: position.y - 16 },
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
    {
        quote: "Samra created an amazing animated portfolio for us. Her attention to detail and creative use of React & GSAP animations made our website stand out.",
        name: "Anita Sharma",
        company: "Startup Founder",
        image: Avatar,
        rating: 5,
    },
    {
        quote: "The MERN full-stack project delivered by Samra was top-notch. Smooth functionality, responsive UI, and SEO-friendly design—highly recommended!",
        name: "Azad Khan",
        company: "Tech Entrepreneur",
        image: Avatar,
        rating: 5,
    },
    {
        quote: "Samra transformed our Figma designs into clean, responsive code. Her frontend animation skills with GSAP and Tailwind are excellent.",
        name: "Neha Kapoor",
        company: "UI/UX Lead",
        image: Avatar,
        rating: 4,
    }
];

// --- Main App Component ---
export default function App() {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  
  const openReviewModal = () => setIsReviewModalOpen(true);
  const closeReviewModal = () => setIsReviewModalOpen(false);

  const handleAddReview = (newReview) => {
    setTestimonials(prevTestimonials => [newReview, ...prevTestimonials]);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-gray-200 font-sans antialiased md:cursor-none">
      <CustomCursor />
      <TestimonialsSection testimonials={testimonials} />
      <ReviewTriggerSection onButtonClick={openReviewModal} />
      <ReviewModal isOpen={isReviewModalOpen} onClose={closeReviewModal} onReviewSubmit={handleAddReview} />
    </div>
  );
}

// --- Text Animation Variants ---
const textRevealVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    })
};

// --- Star Rating Component ---
const StarRating = ({ rating, className = "" }) => (
    <div className={`flex items-center ${className}`}>
        {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
        ))}
    </div>
);

// --- Testimonials Section ---
const TestimonialsSection = ({ testimonials }) => {
    const sectionVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
    const cardVariants = { hidden: { opacity: 0, y: 50, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22,1,0.36,1] } } };

    return (
        <section id="testimonials" className="bg-gradient-to-br from-slate-50 to-slate-200 text-gray-800 py-20 md:py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                 <motion.div className="text-center" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8, ease: "easeOut" }}>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-900">
                        What Clients Say About Samra
                    </h2>
                    <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
                        From React portfolios to full-stack MERN projects, hear from clients who loved my work.
                    </p>
                </motion.div>

                <motion.div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                    <AnimatePresence>
                        {testimonials.map((testimonial, index) => (
                            <motion.div key={testimonial.name + index} variants={cardVariants} initial="hidden" animate="visible" exit={{ opacity: 0, scale: 0.8 }} layout whileHover={{ y: -8, boxShadow: '0px 25px 50px -12px rgba(0,0,0,0.15)' }} transition={{ type: 'spring', stiffness: 300 }} className="bg-white p-8 rounded-2xl shadow-lg flex flex-col relative overflow-hidden">
                                 <span className="absolute top-4 right-6 text-8xl text-gray-100 font-serif opacity-75 z-0" aria-hidden="true">”</span>
                                 <div className="relative z-10 flex flex-col h-full">
                                    <StarRating rating={testimonial.rating} />
                                    <p className="mt-6 text-gray-600 italic flex-grow text-lg">"{testimonial.quote}"</p>
                                    <div className="flex items-center mt-6">
                                        <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover mr-4" onError={(e)=>{e.target.onerror=null;e.target.src=`https://placehold.co/48x48/F0EEEB/333333?text=${testimonial.name.charAt(0)}`}} />
                                        <div>
                                            <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                            <p className="text-sm text-gray-500">{testimonial.company}</p>
                                        </div>
                                    </div>
                                 </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

// --- Star Rating Input ---
const StarRatingInput = ({ rating, setRating }) => {
    const [hoverRating, setHoverRating] = useState(0);
    return (
        <div className="flex items-center gap-1" onMouseLeave={()=>setHoverRating(0)}>
            {[...Array(5)].map((_, i) => {
                const ratingValue = i + 1;
                return (
                    <motion.button key={i} type="button" onClick={()=>setRating(ratingValue)} onMouseEnter={()=>setHoverRating(ratingValue)} whileHover={{ scale:1.2 }} whileTap={{ scale:0.9 }}>
                        <Star className={`w-8 h-8 cursor-pointer transition-colors ${ratingValue <= (hoverRating || rating) ? 'text-yellow-400 fill-yellow-400':'text-gray-300'}`} />
                    </motion.button>
                );
            })}
        </div>
    );
};

// --- Review Trigger Section ---
const ReviewTriggerSection = ({ onButtonClick }) => {
    return (
        <section id="review" className="bg-gradient-to-br from-slate-50 to-slate-200 text-gray-800 py-20 md:py-32">
            <div className="max-w-3xl mx-auto px-4 md:px-8">
                <motion.div className="text-center flex flex-col items-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} transition={{ staggerChildren: 0.2 }}>
                    <motion.h2 variants={textRevealVariants} className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-900">
                        Leave a Review
                    </motion.h2>
                    <motion.p variants={textRevealVariants} custom={2} className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
                        Loved my frontend animations, React skills, or full-stack projects? Share your experience below!
                    </motion.p>
                    <motion.div variants={textRevealVariants} custom={3}>
                        <motion.button onClick={onButtonClick} className="mt-8 text-lg font-semibold text-gray-800 inline-flex items-center gap-2 group" whileHover={{ gap: "1rem" }}>
                            <span>Write a Review</span>
                            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:rotate-45" />
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name || !review || rating===0) { alert("Please fill all fields & rating."); return; }

        onReviewSubmit({ quote: review, name, company:"Valued Client", image:"", rating });
        setSubmitted(true);

        setTimeout(()=>{ onClose(); setTimeout(()=>{ setName(''); setReview(''); setRating(0); setSubmitted(false); },300); },2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[10000] flex items-center justify-center p-4">
                    <motion.div initial={{scale:0.9, opacity:0, y:50}} animate={{scale:1, opacity:1, y:0}} exit={{scale:0.9, opacity:0, y:50}} transition={{ type:'spring', stiffness:300, damping:30 }} onClick={(e)=>e.stopPropagation()} className="bg-white text-gray-800 rounded-2xl shadow-2xl w-full max-w-lg p-8 relative">
                        <motion.button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800" whileHover={{ scale: 1.1, rotate: 90 }}><X size={24}/></motion.button>

                        <AnimatePresence mode="wait">
                            {!submitted ? (
                                <motion.div key="form">
                                    <h2 className="text-3xl font-bold mb-6">Share Your Feedback</h2>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="flex flex-col items-center">
                                            <label className="text-lg font-semibold mb-2">Your Rating</label>
                                            <StarRatingInput rating={rating} setRating={setRating} />
                                        </div>
                                        <div>
                                            <label htmlFor="modal-name" className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                                            <input type="text" id="modal-name" value={name} onChange={(e)=>setName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 outline-none transition" required />
                                        </div>
                                        <div>
                                            <label htmlFor="modal-review" className="block text-sm font-medium text-gray-600 mb-1">Review</label>
                                            <textarea id="modal-review" rows="4" value={review} onChange={(e)=>setReview(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 outline-none transition" required></textarea>
                                        </div>
                                        <div>
                                            <motion.button type="submit" className="w-full bg-gray-800 text-white px-8 py-3 rounded-full font-semibold inline-block" whileHover={{ scale:1.05, backgroundColor:'#111827' }} whileTap={{ scale:0.95 }} transition={{ type:'spring', stiffness:400, damping:10 }}>
                                                Submit Review
                                            </motion.button>
                                        </div>
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div key="thank-you" className="text-center py-8" initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.8}}>
                                    <h3 className="text-3xl font-bold text-green-600">Thank You!</h3>
                                    <p className="mt-2 text-lg">Your review has been submitted successfully.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
