import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Check, Trash2 } from 'lucide-react';

// --- Custom Cursor Component (No Changes) ---
const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    useEffect(() => {
        const moveCursor = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            const target = e.target;
            if (target.closest("a, button, [role='button']")) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };
        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);
    const cursorVariants = {
        default: { width: 32, height: 32, backgroundColor: "rgba(255, 255, 255, 0.1)", border: "1px solid rgba(255, 255, 255, 0.2)", x: position.x - 16, y: position.y - 16, transition: { type: 'spring', stiffness: 500, damping: 30 } },
        hover: { width: 64, height: 64, backgroundColor: "rgba(52, 211, 153, 0.1)", border: "1px solid rgba(52, 211, 153, 0.3)", x: position.x - 32, y: position.y - 32, transition: { type: 'spring', stiffness: 500, damping: 30 } }
    };
    return <motion.div className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block" variants={cursorVariants} animate={isHovering ? "hover" : "default"} />;
};

// --- ✨ Main App Component ---
export default function App() {
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
        <div className="bg-[#111111] min-h-screen text-gray-200 font-sans antialiased md:cursor-none">
            <CustomCursor />
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
        </div>
    );
}

// --- Cart Sidebar Component (No Changes) ---
const CartSidebar = ({ isOpen, onClose, cartItems, onRemoveItem, onCheckout }) => {
    const subtotal = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    }, [cartItems]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/60 z-[9000] "
                >
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: '0%' }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-0 right-0 w-full max-w-md h-full bg-[#1C1C1C] text-white shadow-2xl flex flex-col"
                    >
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <h2 className="text-2xl font-bold">Your Cart</h2>
                            <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors"><X/></button>
                        </div>
                        
                        {cartItems.length > 0 ? (
                            <>
                                <div className="flex-grow p-6 space-y-4 overflow-y-auto">
                                    {cartItems.map(item => (
                                        <div key={item.id} className="flex items-start justify-between">
                                            <div>
                                                <p className="font-semibold">{item.service}</p>
                                                <p className="text-sm text-gray-400">{item.plan} Plan</p>
                                            </div>
                                            <div className="text-right flex items-center gap-4">
                                                <p className="font-semibold">₹{item.price.toLocaleString()}</p>
                                                <button onClick={() => onRemoveItem(item.id)} className="text-gray-500 hover:text-red-500 transition-colors">
                                                    <Trash2 size={18}/>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-6 border-t border-white/10 space-y-4">
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Subtotal</span>
                                        <span>₹{subtotal.toLocaleString()}</span>
                                    </div>
                                    <button 
                                        onClick={onCheckout}
                                        className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-500 transition-all duration-300 transform active:scale-95"
                                    >
                                        Proceed to Checkout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
                                <ShoppingCart size={48} className="text-gray-600 mb-4"/>
                                <h3 className="font-bold text-xl">Your cart is empty</h3>
                                <p className="text-gray-400 mt-1">Add a service to get started.</p>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// --- Package Card Component (Updated for INR and Domain/Hosting) ---
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
            whileHover={{ y: -8, scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className={`flex flex-col p-6 rounded-2xl border h-full transition-shadow duration-300 ${isFeatured ? 'bg-white border-emerald-500 shadow-2xl shadow-emerald-500/20' : 'bg-white/70 backdrop-blur-sm border-gray-200 hover:shadow-xl'}`}
        >
            <h4 className="text-lg font-bold text-gray-900">{pkg.name}</h4>
            <p className="mt-2 text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">₹{pkg.price.toLocaleString()}</p>
            <p className="mt-1 text-sm text-gray-500">one-time payment</p>
            <ul className="mt-6 space-y-3 text-sm text-gray-600 flex-grow">
                {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            <p className="mt-2 text-sm text-gray-400">{pkg.includes}</p>
            <button 
                role="button" 
                onClick={handleAddToCart} 
                disabled={isAdded || isAlreadyInCart}
                className={`mt-8 w-full py-3 rounded-lg font-semibold transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 ${isAdded || isAlreadyInCart ? 'bg-green-500 text-white cursor-not-allowed' : isFeatured ? 'bg-emerald-600 text-white hover:bg-emerald-500' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
            >
                {isAdded || isAlreadyInCart ? <><Check size={20} /> Added!</> : 'Add to Cart'}
            </button>
        </motion.div>
    );
};

// --- ✨ UPDATED Pricing Page Component ---
const PricingPage = ({ onAddToCart, cart, onCartClick }) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const services = [
        { 
            title: "Portfolio Websites", 
            packages: [
                { name: "Basic", price: 100 * 83, features: ["Single Page Layout", "Up to 5 Projects", "Responsive Design", "Contact Form"], includes: "Domain & Hosting: ❌" },
                { name: "Standard", price: 180 * 83, features: ["All Basic Features", "Multi-Page Site", "CMS for Projects", "Custom Animations "], includes: "Domain & Hosting: ✅" },
                { name: "Advanced", price: 250 * 83, features: ["All Standard Features", "Case Study Pages", "Advanced Filtering", "Priority Support"], includes: "Domain & Hosting: ✅" }
            ] 
        },
        { 
            title: "Landing Pages", 
            packages: [
                { name: "Basic", price: 140 * 83, features: ["Single Page Design", "Responsive Layout", "Contact Form", "3 Day Delivery"], includes: "Domain & Hosting: ❌" },
                { name: "Standard", price: 250 * 83, features: ["All Basic Features", "Simple Animations", "Content Upload", "5 Day Delivery"], includes: "Domain & Hosting: ✅" },
                { name: "Advanced", price: 300 * 83, features: ["All Standard Features", "Complex GSAP Animations", "A/B Testing Setup", "7 Day Delivery"], includes: "Domain & Hosting: ✅" }
            ] 
        },
        { 
            title: "Business Websites", 
            packages: [
                { name: "Basic", price: 350 * 83, features: ["Up to 5 Pages", "Custom Design", "Stock Photos", "Basic SEO"], includes: "Domain & Hosting: ✅" },
                { name: "Standard", price: 600 * 83, features: ["All Basic Features", "CMS Integration", "Blog Setup", "Social Media Integration"], includes: "Domain & Hosting: ✅" },
                { name: "Advanced", price: 900 * 83, features: ["All Standard Features", "Advanced Animations", "Lead Magnet Setup", "Analytics Dashboard"], includes: "Domain & Hosting: ✅" }
            ] 
        },
        { 
            title: "E-commerce Stores", 
            packages: [
                { name: "Basic", price: 800 * 83, features: ["Up to 20 Products", "Payment Gateway Setup", "Basic Inventory", "Standard Themes"], includes: "Domain & Hosting: ✅" },
                { name: "Standard", price: 1400 * 83, features: ["All Basic Features", "Up to 100 Products", "Custom Theme Design", "Customer Accounts"], includes: "Domain & Hosting: ✅" },
                { name: "Advanced", price: 1800 * 83, features: ["All Standard Features", "Unlimited Products", "Advanced Shipping", "API Integrations"], includes: "Domain & Hosting: ✅" }
            ] 
        },
    ];
    const selectedService = services[selectedTab];
    const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

    return (
        <section className="py-20 md:py-32 bg-[#111111] text-gray-800 relative overflow-hidden">
            
            {/* ✨ Floating Cart Button */}
            <button 
                onClick={onCartClick} 
                className="fixed bottom-6 right-6 md:top-6 md:bottom-auto z-50 text-white p-3 rounded-full bg-black/30 backdrop-blur-lg border border-white/10 hover:bg-white/20 transition-colors"
            >
                <ShoppingCart size={24} />
                <AnimatePresence>
                {cart.length > 0 && (
                    <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
                    >
                        {cart.length}
                    </motion.span>
                )}
                </AnimatePresence>
            </button>
            
            <div className="absolute inset-0 z-0 opacity-50">
                <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-radial from-emerald-500/20 to-transparent blur-3xl"></div>
                <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-radial from-blue-500/20 to-transparent blur-3xl"></div>
            </div>
            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    <div className="lg:col-span-4 lg:sticky lg:top-24">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">Our Services & Pricing</h2>
                        <p className="mt-4 text-gray-400 leading-relaxed">Select a service to see our tailored packages. Add any plan to the cart to get started.</p>
                        <div className="mt-10 space-y-2">
                            {services.map((service, index) => (
                                <button key={service.title} onClick={() => setSelectedTab(index)} className="w-full text-left p-4 rounded-lg relative transition-colors duration-300 group">
                                    {selectedTab === index && (
                                        <motion.div layoutId="active-tab-indicator" className="absolute inset-0 bg-white/10 border border-white/20 rounded-lg" />
                                    )}
                                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                                    <span className={`relative z-10 font-semibold text-lg transition-colors ${selectedTab === index ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>{service.title}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            <motion.div key={selectedTab} initial="hidden" animate="visible" exit="hidden" variants={containerVariants} transition={{ type: 'spring', stiffness: 200, damping: 25 }}>
                                <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10">
                                    <motion.h3 variants={{hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }}} className="text-3xl font-bold text-white mb-6">{selectedService.title}</motion.h3>
                                     {/* ⚠️ Price Note */}
    <p className="text-sm text-gray-400 mb-6 italic">
        Note: The prices shown are indicative and may change based on your specific requirements.
    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {selectedService.packages.map((pkg, i) => (
                                            <PackageCard key={i} pkg={pkg} isFeatured={pkg.name === 'Standard'} onAddToCart={onAddToCart} serviceTitle={selectedService.title} cart={cart}/>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- Contact Modal for Checkout (No Changes) ---
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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="bg-[#1C1C1C] text-white rounded-xl p-8 w-full max-w-lg"
                        onClick={e => e.stopPropagation()}
                    >
                        <h3 className="text-2xl font-bold mb-4">Contact Us to Proceed</h3>
                        <textarea readOnly value={formData.message} className="w-full h-60 p-4 rounded-lg bg-[#111111] text-white border border-gray-700 resize-none"/>
                        <div className="mt-4 flex justify-end">
                            <button onClick={onClose} className="px-6 py-2 bg-emerald-600 rounded-lg font-semibold hover:bg-emerald-500 transition-colors">Close</button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
