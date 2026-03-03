import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Check, Trash2 } from 'lucide-react';

// --- Cart Sidebar Component ---
const CartSidebar = ({ isOpen, onClose, cartItems, onRemoveItem, onCheckout }) => {
    const subtotal = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    }, [cartItems]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9000]"
                >
                    <motion.div
                        initial={{ x: '100%' }} animate={{ x: '0%' }} exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-0 right-0 w-full max-w-md h-full bg-[#0A0A0A] border-l border-white/10 text-white shadow-2xl flex flex-col"
                    >
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <h2 className="text-2xl font-bold tracking-tight">Your Cart</h2>
                            <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors"><X size={20} /></button>
                        </div>

                        {cartItems.length > 0 ? (
                            <>
                                <div className="flex-grow p-6 space-y-4 overflow-y-auto custom-scrollbar">
                                    {cartItems.map(item => (
                                        <div key={item.id} className="flex flex-col bg-white/5 border border-white/5 rounded-xl p-4 gap-3">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-semibold text-emerald-400">{item.service}</p>
                                                    <p className="text-sm text-gray-400">{item.plan} Plan</p>
                                                </div>
                                                <button onClick={() => onRemoveItem(item.id)} className="text-gray-500 hover:text-red-400 transition-colors p-1">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            <div className="flex justify-between items-center pt-2 border-t border-white/5">
                                                <span className="text-xs text-gray-500 uppercase tracking-wider">Price</span>
                                                <p className="font-semibold text-white">₹{item.price.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-6 border-t border-white/10 space-y-5 bg-[#0A0A0A]">
                                    <div className="flex justify-between font-bold text-lg">
                                        <span className="text-gray-400 font-medium">Subtotal</span>
                                        <span className="text-emerald-400">₹{subtotal.toLocaleString()}</span>
                                    </div>
                                    <button
                                        onClick={onCheckout}
                                        className="w-full bg-emerald-600 text-white py-3.5 rounded-full font-semibold hover:bg-emerald-500 transition-all duration-300 transform active:scale-95 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                                    >
                                        Proceed to Checkout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
                                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                                    <ShoppingCart size={32} className="text-gray-500" />
                                </div>
                                <h3 className="font-bold text-xl text-white">Your cart is empty</h3>
                                <p className="text-gray-400 mt-2 text-sm">Add a service to get started.</p>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// --- Package Card Design ---
const PackageCard = ({ pkg, isFeatured, onAddToCart, serviceTitle, cart }) => {
    const [isAdded, setIsAdded] = useState(false);
    const isAlreadyInCart = cart.some(item => item.service === serviceTitle && item.plan === pkg.name);

    const handleAddToCart = () => {
        if (isAlreadyInCart) return;
        onAddToCart({ service: serviceTitle, plan: pkg.name, price: pkg.price });
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <motion.div
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className={`flex flex-col p-8 rounded-3xl border h-full transition-shadow duration-300 relative overflow-hidden backdrop-blur-md ${isFeatured ? 'bg-emerald-900/10 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.1)]' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
        >
            {isFeatured && (
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-teal-400 to-emerald-500" />
            )}

            <h4 className="text-xl font-bold text-white mb-2">{pkg.name}</h4>
            <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-bold text-emerald-400">₹</span>
                <p className="text-5xl font-extrabold tracking-tight text-white">{pkg.price.toLocaleString()}</p>
            </div>
            <p className="text-sm text-gray-500 font-medium tracking-wide mb-8 border-b border-white/10 pb-6">one-time payment</p>

            <ul className="space-y-4 flex-grow">
                {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                        <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${isFeatured ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-gray-300'}`}>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <span className="text-gray-300 text-sm font-light leading-snug">{feature}</span>
                    </li>
                ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-xs text-gray-400 tracking-wider uppercase mb-6">{pkg.includes}</p>
                <button
                    role="button"
                    onClick={handleAddToCart}
                    disabled={isAdded || isAlreadyInCart}
                    className={`w-full py-3.5 rounded-full font-semibold transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 text-sm ${isAdded || isAlreadyInCart
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-not-allowed'
                        : isFeatured
                            ? 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                            : 'bg-white text-black hover:bg-gray-200'
                        }`}
                >
                    {isAdded || isAlreadyInCart ? <><Check size={18} /> Added to Cart</> : 'Get Started'}
                </button>
            </div>
        </motion.div>
    );
};

// --- Contact Modal ---
const ContactModal = ({ isOpen, onClose, cartItems }) => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const subtotal = useMemo(() => cartItems.reduce((total, item) => total + item.price, 0), [cartItems]);

    useEffect(() => {
        if (cartItems.length > 0) {
            const cartDetails = cartItems.map(item => `- ${item.service} (${item.plan} Plan): ₹${item.price.toLocaleString()}`).join('\n');
            setFormData(prev => ({ ...prev, message: `Hello, I would like to purchase the following packages:\n${cartDetails}\nTotal: ₹${subtotal.toLocaleString()}` }));
        }
    }, [cartItems, subtotal]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[9999] px-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="bg-[#0A0A0A] border border-white/10 text-white rounded-3xl p-8 w-full max-w-lg shadow-2xl relative overflow-hidden"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
                        <h3 className="text-2xl font-bold tracking-tight mb-2">Checkout Detail</h3>
                        <p className="text-gray-400 text-sm mb-6">Review your order details below before proceeding.</p>

                        <textarea
                            readOnly
                            value={formData.message}
                            className="w-full h-48 p-4 rounded-xl bg-white/5 text-gray-300 border border-white/10 resize-none font-mono text-sm focus:outline-none custom-scrollbar"
                        />

                        <div className="mt-8 flex justify-end gap-3">
                            <button onClick={onClose} className="px-6 py-2.5 rounded-full font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors">Cancel</button>
                            <button className="px-6 py-2.5 bg-emerald-600 rounded-full font-medium text-white hover:bg-emerald-500 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.2)]">Confirm Order</button>
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

    return (
        <section id="services" className="py-24 md:py-40 bg-[#0A0A0A] text-gray-200 relative overflow-hidden">

            {/* Floating Cart Button */}
            <button
                onClick={onCartClick}
                className="fixed bottom-6 right-6 md:top-6 md:bottom-auto z-50 text-emerald-400 p-4 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-colors shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_32px_rgba(16,185,129,0.2)]"
            >
                <ShoppingCart size={24} />
                <AnimatePresence>
                    {cart.length > 0 && (
                        <motion.span
                            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                            className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold shadow-lg"
                        >
                            {cart.length}
                        </motion.span>
                    )}
                </AnimatePresence>
            </button>

            {/* Background Glows */}
            <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-900/20 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-900/10 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                    <div className="lg:col-span-4 lg:sticky lg:top-32">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-tight">
                                Tailored <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Pricing.</span>
                            </h2>
                            <p className="mt-6 text-gray-400 leading-relaxed font-light text-lg">Select a service category to explore plans. Simple, transparent pricing for premium results.</p>
                            <div className="mt-12 space-y-3">
                                {services.map((service, index) => (
                                    <button
                                        key={service.title}
                                        onClick={() => setSelectedTab(index)}
                                        className="w-full text-left p-4 rounded-2xl relative transition-all duration-300 group overflow-hidden"
                                    >
                                        {selectedTab === index && (
                                            <motion.div layoutId="active-tab-indicator-service" className="absolute inset-0 bg-white/5 border border-white/10 rounded-2xl" />
                                        )}
                                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                                        <div className="relative z-10 flex items-center justify-between">
                                            <span className={`font-medium tracking-wide transition-colors ${selectedTab === index ? 'text-emerald-400' : 'text-gray-400 group-hover:text-gray-200'}`}>{service.title}</span>
                                            {selectedTab === index && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedTab}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                className="w-full"
                            >
                                <div className="mb-8">
                                    <h3 className="text-3xl font-bold text-white mb-2">{selectedService.title}</h3>
                                    <p className="text-sm text-gray-500 font-light italic">Prices shown are indicative and may vary based on specific feature requirements.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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

    const addToCart = (plan) => {
        setCart(prev => [...prev, { ...plan, id: Date.now() }]);
    };

    const removeFromCart = (itemId) => {
        setCart(prev => prev.filter(item => item.id !== itemId));
    };

    const handleCheckout = () => {
        setIsCartOpen(false);
        setIsModalOpen(true);
    };

    return (
        <>
            <PricingPage
                onAddToCart={addToCart}
                cart={cart}
                onCartClick={() => setIsCartOpen(true)}
            />
            <CartSidebar
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cart}
                onRemoveItem={removeFromCart}
                onCheckout={handleCheckout}
            />
            <ContactModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                cartItems={cart}
            />
        </>
    );
}
