import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingCart, X, Check, Trash2, ArrowUpRight } from 'lucide-react';
import Magnetic from '../components/Magnetic.jsx';

gsap.registerPlugin(ScrollTrigger);

// --- Cart Sidebar ---
const CartSidebar = ({ isOpen, onClose, cartItems, onRemoveItem, onCheckout }) => {
    const subtotal = useMemo(() => cartItems.reduce((total, item) => total + item.price, 0), [cartItems]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9000]"
                >
                    <motion.div
                        initial={{ x: '100%' }} animate={{ x: '0%' }} exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-0 right-0 w-full max-w-md h-full bg-[#111] border-l border-[#1E1E1E] text-[#F0EAE2] shadow-2xl flex flex-col"
                    >
                        <div className="flex items-center justify-between p-6 border-b border-[#1E1E1E]">
                            <h2 className="text-xl font-extrabold tracking-tight">Your Cart</h2>
                            <button onClick={onClose} className="p-2 rounded-full hover:bg-white/5 transition-colors text-[#888] hover:text-[#F0EAE2]"><X size={18} /></button>
                        </div>

                        {cartItems.length > 0 ? (
                            <>
                                <div className="flex-grow p-6 space-y-4 overflow-y-auto custom-scrollbar">
                                    {cartItems.map(item => (
                                        <div key={item.id} className="flex flex-col bg-[#161616] border border-[#222] rounded-2xl p-5 gap-3">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-bold text-[#E63946] text-sm">{item.service}</p>
                                                    <p className="text-xs text-[#666] mt-0.5">{item.plan} Plan</p>
                                                </div>
                                                <button onClick={() => onRemoveItem(item.id)} className="text-[#444] hover:text-red-400 transition-colors p-1">
                                                    <Trash2 size={15} />
                                                </button>
                                            </div>
                                            <div className="flex justify-between items-center pt-3 border-t border-[#1E1E1E]">
                                                <span className="text-[10px] text-[#555] uppercase tracking-wider font-bold">Price</span>
                                                <p className="font-extrabold text-[#F0EAE2] text-sm">₹{item.price.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-6 border-t border-[#1E1E1E] space-y-5 bg-[#111]">
                                    <div className="flex justify-between font-bold text-lg">
                                        <span className="text-[#666] font-medium text-base">Subtotal</span>
                                        <span className="text-[#E63946]">₹{subtotal.toLocaleString()}</span>
                                    </div>
                                    <Magnetic strength={0.1}>
                                        <button
                                            onClick={onCheckout}
                                            className="w-full bg-[#E63946] text-white py-4 rounded-full font-bold hover:bg-[#C62633] transition-all shadow-[0_0_20px_rgba(230,57,70,0.2)]"
                                        >
                                            Proceed to Checkout
                                        </button>
                                    </Magnetic>
                                </div>
                            </>
                        ) : (
                            <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
                                <div className="w-16 h-16 rounded-full bg-[#161616] flex items-center justify-center mb-5 border border-[#222]">
                                    <ShoppingCart size={26} className="text-[#444]" />
                                </div>
                                <h3 className="font-bold text-lg text-[#F0EAE2]">Your cart is empty</h3>
                                <p className="text-[#555] mt-2 text-sm font-medium">Add a service to get started.</p>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// --- 3D Tilt Package Card ---
const PackageCard = ({ pkg, isFeatured, onAddToCart, serviceTitle, cart }) => {
    const [isAdded, setIsAdded] = useState(false);
    const isAlreadyInCart = cart.some(item => item.service === serviceTitle && item.plan === pkg.name);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleAddToCart = () => {
        if (isAlreadyInCart) return;
        onAddToCart({ service: serviceTitle, plan: pkg.name, price: pkg.price });
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <motion.div
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            className="perspective-1000 w-full h-full"
        >
            <div
                className={`package-card flex flex-col p-7 rounded-3xl border h-full transition-all duration-300 relative overflow-hidden ${
                    isFeatured
                        ? 'bg-[#161616] border-[#E63946]/25 shadow-[0_0_40px_rgba(230,57,70,0.08)]'
                        : 'bg-[#111] border-[#1E1E1E] hover:border-[#E63946]/20'
                }`}
                style={{ transform: "translateZ(30px)" }}
            >
                {isFeatured && (
                    <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#E63946] to-[#C62633]" />
                )}
                {isFeatured && (
                    <div className="absolute top-4 right-4 px-2.5 py-1 bg-[#E63946]/10 border border-[#E63946]/20 rounded-full text-[#E63946] text-[10px] font-bold tracking-wider uppercase">
                        Popular
                    </div>
                )}

                <h4 className="text-xl font-extrabold text-[#F0EAE2] mb-2" style={{ transform: "translateZ(50px)" }}>{pkg.name}</h4>
                <div className="flex items-baseline gap-1 mb-1" style={{ transform: "translateZ(40px)" }}>
                    <span className="text-2xl font-bold text-[#E63946]">₹</span>
                    <p className="text-4xl font-extrabold tracking-tight text-[#F0EAE2]">{pkg.price.toLocaleString()}</p>
                </div>
                <p className="text-xs text-[#444] font-bold tracking-wide mb-6 border-b border-[#1E1E1E] pb-5" style={{ transform: "translateZ(30px)" }}>
                    one-time payment
                </p>

                <ul className="space-y-3.5 flex-grow" style={{ transform: "translateZ(20px)" }}>
                    {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <div className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${isFeatured ? 'bg-[#E63946]/10 text-[#E63946]' : 'bg-[#1A1A1A] text-[#555]'}`}>
                                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-[#888] text-sm font-medium leading-snug">{feature}</span>
                        </li>
                    ))}
                </ul>

                <div className="mt-7 pt-5 border-t border-[#1E1E1E]" style={{ transform: "translateZ(40px)" }}>
                    <p className="text-[10px] text-[#444] tracking-wider uppercase mb-4 font-bold">{pkg.includes}</p>
                    <Magnetic strength={0.2}>
                        <button
                            onClick={handleAddToCart}
                            disabled={isAdded || isAlreadyInCart}
                            className={`w-full py-3.5 px-5 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 text-sm ${
                                isAdded || isAlreadyInCart
                                    ? 'bg-[#1A1A1A] text-[#444] border border-[#222] cursor-not-allowed'
                                    : isFeatured
                                        ? 'bg-[#E63946] text-white hover:bg-[#C62633] shadow-[0_0_20px_rgba(230,57,70,0.2)]'
                                        : 'bg-transparent text-[#888] border border-[#2A2A2A] hover:bg-[#E63946]/8 hover:text-[#E63946] hover:border-[#E63946]/25'
                            }`}
                        >
                            {isAdded || isAlreadyInCart ? <><Check size={16} /> Added</> : 'Get Started'}
                        </button>
                    </Magnetic>
                </div>
            </div>
        </motion.div>
    );
};

// --- Order Confirmation Modal ---
const ContactModal = ({ isOpen, onClose, cartItems }) => {
    const subtotal = useMemo(() => cartItems.reduce((total, item) => total + item.price, 0), [cartItems]);

    const handleConfirmOrder = () => {
        const cartDetails = cartItems.map(item =>
            `• ${item.service} — ${item.plan} Plan: ₹${item.price.toLocaleString()}`
        ).join('\n');
        const subject = encodeURIComponent(`Service Order Inquiry — ₹${subtotal.toLocaleString()}`);
        const body = encodeURIComponent(
            `Hello Samra,\n\nI'd like to proceed with the following services:\n\n${cartDetails}\n\nTotal: ₹${subtotal.toLocaleString()}\n\nPlease get back to me at your earliest convenience.\n\nBest regards`
        );
        window.open(`mailto:samraateeque12@gmail.com?subject=${subject}&body=${body}`, '_blank');
        onClose();
        setTimeout(() => {
            const contactEl = document.getElementById('contact');
            if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
        }, 300);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[9999] px-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="bg-[#111] border border-[#222] text-[#F0EAE2] rounded-3xl p-8 w-full max-w-lg shadow-2xl relative overflow-hidden"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#E63946] to-[#C62633]" />
                        <h3 className="text-2xl font-extrabold tracking-tight mb-1 mt-2">Review Order</h3>
                        <p className="text-[#555] text-sm mb-6 font-medium">Clicking confirm will open your email client with the order details pre-filled.</p>

                        <div className="space-y-3 mb-6">
                            {cartItems.map((item, i) => (
                                <div key={i} className="flex justify-between items-center py-3 border-b border-[#1A1A1A]">
                                    <div>
                                        <p className="text-sm font-bold text-[#F0EAE2]">{item.service}</p>
                                        <p className="text-xs text-[#555]">{item.plan} Plan</p>
                                    </div>
                                    <p className="font-bold text-[#E63946] text-sm">₹{item.price.toLocaleString()}</p>
                                </div>
                            ))}
                            <div className="flex justify-between items-center pt-2">
                                <span className="font-bold text-[#F0EAE2]">Total</span>
                                <span className="font-extrabold text-[#E63946] text-lg">₹{subtotal.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3">
                            <button onClick={onClose} className="px-6 py-2.5 rounded-full font-bold text-[#555] hover:text-[#F0EAE2] hover:bg-white/5 transition-colors text-sm">Cancel</button>
                            <Magnetic strength={0.2}>
                                <button
                                    onClick={handleConfirmOrder}
                                    className="px-6 py-2.5 bg-[#E63946] rounded-full font-bold text-white hover:bg-[#C62633] transition-colors text-sm shadow-[0_0_20px_rgba(230,57,70,0.25)] flex items-center gap-2"
                                >
                                    Confirm & Send <ArrowUpRight size={14} />
                                </button>
                            </Magnetic>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// --- Pricing Page ---
const PricingPage = ({ onAddToCart, cart, onCartClick }) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const containerRef = useRef(null);

    const services = [
        {
            title: "Portfolio Websites",
            packages: [
                { name: "Basic", price: 100 * 83, features: ["Single Page Layout", "Up to 5 Projects", "Responsive Design", "Contact Form"], includes: "Domain & Hosting: Not Included" },
                { name: "Standard", price: 180 * 83, features: ["All Basic Features", "Multi-Page Site", "CMS for Projects", "Custom Animations"], includes: "Domain & Hosting: Included (1 Yr)" },
                { name: "Advanced", price: 250 * 83, features: ["All Standard Features", "Case Study Pages", "Advanced Filtering", "Priority Support"], includes: "Domain & Hosting: Included (1 Yr)" }
            ]
        },
        {
            title: "Landing Pages",
            packages: [
                { name: "Basic", price: 140 * 83, features: ["Single Page Design", "Responsive Layout", "Contact Form", "3 Day Delivery"], includes: "Domain & Hosting: Not Included" },
                { name: "Standard", price: 250 * 83, features: ["All Basic Features", "Simple Animations", "Content Upload", "5 Day Delivery"], includes: "Domain & Hosting: Included (1 Yr)" },
                { name: "Advanced", price: 300 * 83, features: ["All Standard Features", "Complex GSAP Animations", "A/B Testing Setup", "7 Day Delivery"], includes: "Domain & Hosting: Included (1 Yr)" }
            ]
        },
        {
            title: "Business Websites",
            packages: [
                { name: "Basic", price: 350 * 83, features: ["Up to 5 Pages", "Custom Design", "Stock Photos", "Basic SEO"], includes: "Domain & Hosting: Included (1 Yr)" },
                { name: "Standard", price: 600 * 83, features: ["All Basic Features", "CMS Integration", "Blog Setup", "Social Media Integration"], includes: "Domain & Hosting: Included (1 Yr)" },
                { name: "Advanced", price: 900 * 83, features: ["All Standard Features", "Advanced Animations", "Lead Magnet Setup", "Analytics Dashboard"], includes: "Domain & Hosting: Included (1 Yr)" }
            ]
        },
        {
            title: "E-commerce Stores",
            packages: [
                { name: "Basic", price: 800 * 83, features: ["Up to 20 Products", "Payment Gateway Setup", "Basic Inventory", "Standard Themes"], includes: "Domain & Hosting: Included (1 Yr)" },
                { name: "Standard", price: 1400 * 83, features: ["All Basic Features", "Up to 100 Products", "Custom Theme Design", "Customer Accounts"], includes: "Domain & Hosting: Included (1 Yr)" },
                { name: "Advanced", price: 1800 * 83, features: ["All Standard Features", "Unlimited Products", "Advanced Shipping", "API Integrations"], includes: "Domain & Hosting: Included (1 Yr)" }
            ]
        },
    ];

    const selectedService = services[selectedTab];

    useEffect(() => {
        gsap.fromTo('.package-card',
            { opacity: 0, y: 35 },
            { opacity: 1, y: 0, stagger: 0.12, duration: 0.75, ease: "power4.out", overwrite: true }
        );
    }, [selectedTab]);

    return (
        <section ref={containerRef} id="services" className="py-24 md:py-36 bg-[#0A0A0A] text-[#F0EAE2] relative overflow-hidden border-t border-[#1A1A1A]">

            {/* Cart button */}
            <Magnetic strength={0.3}>
                <button
                    onClick={onCartClick}
                    className="fixed bottom-6 right-6 md:top-6 md:bottom-auto z-50 text-[#E63946] p-4 rounded-full bg-[#111]/95 backdrop-blur-xl border border-[#E63946]/20 hover:bg-[#161616] transition-colors shadow-2xl hover:scale-105 active:scale-95"
                >
                    <ShoppingCart size={22} strokeWidth={2.5} />
                    <AnimatePresence>
                        {cart.length > 0 && (
                            <motion.span
                                initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                                className="absolute -top-1.5 -right-1.5 bg-[#E63946] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold"
                            >
                                {cart.length}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>
            </Magnetic>

            {/* Background glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E63946]/4 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E63946]/3 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-6 md:px-14 relative z-10">

                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-5 mb-16 md:mb-20"
                >
                    <span className="font-mono text-[11px] tracking-[0.3em] text-[#555] uppercase">03 — Services</span>
                    <div className="flex-grow h-px bg-[#1A1A1A]" />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                    {/* Left sticky column */}
                    <div className="lg:col-span-4 lg:sticky lg:top-32">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <h2 className="font-extrabold tracking-tighter text-[#F0EAE2] leading-tight mb-6"
                                style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}>
                                Tailored <span className="font-serif italic text-[#E63946]">Pricing.</span>
                            </h2>
                            <p className="text-[#555] leading-relaxed font-medium text-base mb-10">Select a service to explore plans. Transparent pricing for premium results.</p>
                            <div className="space-y-2">
                                {services.map((service, index) => (
                                    <button
                                        key={service.title}
                                        onClick={() => setSelectedTab(index)}
                                        className="w-full text-left p-4 rounded-2xl relative transition-all duration-300 group overflow-hidden"
                                    >
                                        {selectedTab === index && (
                                            <motion.div layoutId="active-service-tab" className="absolute inset-0 bg-[#161616] border border-[#E63946]/20 rounded-2xl" />
                                        )}
                                        <div className="relative z-10 flex items-center justify-between">
                                            <span className={`font-bold text-sm transition-colors ${selectedTab === index ? 'text-[#E63946]' : 'text-[#555] group-hover:text-[#F0EAE2]'}`}>
                                                {service.title}
                                            </span>
                                            {selectedTab === index && (
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#E63946] shadow-[0_0_8px_rgba(230,57,70,0.6)] animate-pulse" />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right cards */}
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedTab}
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
                            >
                                <div className="mb-8">
                                    <h3 className="text-3xl font-extrabold text-[#F0EAE2] tracking-tight mb-1">{selectedService.title}</h3>
                                    <p className="text-xs text-[#444] font-medium italic">Prices are indicative and may vary based on requirements.</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                                    {selectedService.packages.map((pkg, i) => (
                                        <PackageCard key={i} pkg={pkg} isFeatured={pkg.name === 'Standard'} onAddToCart={onAddToCart} serviceTitle={selectedService.title} cart={cart} />
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default function Service() {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addToCart = (plan) => setCart(prev => [...prev, { ...plan, id: Date.now() }]);
    const removeFromCart = (itemId) => setCart(prev => prev.filter(item => item.id !== itemId));
    const handleCheckout = () => { setIsCartOpen(false); setIsModalOpen(true); };

    return (
        <>
            <PricingPage onAddToCart={addToCart} cart={cart} onCartClick={() => setIsCartOpen(true)} />
            <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cart} onRemoveItem={removeFromCart} onCheckout={handleCheckout} />
            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} cartItems={cart} />
        </>
    );
}
