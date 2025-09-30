import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- Custom Cursor Component ---
const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const moveCursor = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });

            const target = e.target;
            // Check if hovering on interactive elements
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
        default: {
            width: 32,
            height: 32,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            x: position.x - 16,
            y: position.y - 16,
        },
        hover: {
            width: 64,
            height: 64,
            backgroundColor: "rgba(52, 211, 153, 0.1)",
            border: "1px solid rgba(52, 211, 153, 0.3)",
            x: position.x - 32,
            y: position.y - 32,
        }
    };

    return (
        <motion.div
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block"
            variants={cursorVariants}
            animate={isHovering ? "hover" : "default"}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
    );
};

// --- Main App Component ---
export default function App() {
  return (
    <div className="bg-[#1E1E1E] min-h-screen text-gray-200 font-sans antialiased md:cursor-none">
      <CustomCursor />
      <ServicesSection />
    </div>
  );
}

// --- Service Card with Stacking and Parallax ---
const ServiceCard = ({ service, index, progress, range }) => {
    const scale = useTransform(progress, range, [1 - (index * 0.05), 1]);

    const cardRef = useRef(null);
    const { scrollYProgress: imageScrollProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });
    const y = useTransform(imageScrollProgress, [0, 1], ['-20%', '20%']);

    return (
        <motion.div
            ref={cardRef}
            style={{
                position: 'sticky',
                top: `calc(8rem + ${index * 2}rem)`,
                scale
            }}
            className="bg-white p-8 rounded-3xl shadow-lg"
        >
            <div className="mb-6">
                <h3 className="text-3xl font-bold text-gray-900">{service.title}</h3>
                <ul className="mt-4 space-y-2 text-gray-600">
                    {service.items.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </div>
            <div className="overflow-hidden rounded-2xl aspect-video relative">
                <motion.img
                    src={service.imageUrl}
                    alt={service.title}
                    className="absolute left-0 top-[-25%] w-full h-[150%] object-cover"
                    style={{ y }}
                    onError={(e) => { 
                        e.target.onerror = null; 
                        e.target.src=`https://placehold.co/600x400/f1f5f9/333333?text=${service.title.replace(' ', '+')}`;
                    }}
                />
            </div>
        </motion.div>
    );
};

// --- Services Section with Stacking Cards ---
const ServicesSection = () => {
   const services = [
    {
      title: "Portfolio Websites",
      items: [
        "Modern responsive design",
        "Tailwind + React integration",
        "GSAP animations for smooth experience",
        "Custom branding & themes",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Animated Landing Pages",
      items: [
        "High-conversion landing designs",
        "Scroll-triggered animations",
        "Interactive UI elements",
        "Performance optimized builds",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1581276879432-15e50529f34d?q=80&w=1974&auto=format&fit=crop",
    },
    {
      title: "Full-stack MERN Websites",
      items: [
        "Custom dashboards & admin panels",
        "E-commerce with rental features",
        "JWT authentication & APIs",
        "MongoDB & MySQL database setup",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1974&auto=format&fit=crop",
    },
    {
      title: "SEO-friendly Responsive UIs",
      items: [
        "Optimized page speed & SEO tags",
        "Mobile & cross-browser testing",
        "Accessibility compliance",
        "Deployment & analytics integration",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop",
    },
  ];


    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section id="services" className="bg-slate-100 text-gray-800 py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    
                    {/* Left Content */}
                    <motion.div 
                        className="lg:sticky top-32"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-900">
                            What I Do
                        </h2>
                        <p className="mt-6 text-gray-600 max-w-lg leading-relaxed">
                            I specialize in building responsive and engaging digital experiences using the MERN stack. 
                            From interactive UIs to full-stack web apps, I bring ideas to life with clean code and modern design practices.
                        </p>
                    </motion.div>

                    {/* Right Content - Service Cards */}
                    <div ref={containerRef} className="flex flex-col gap-16 relative">
                        {services.map((service, index) => (
                            <ServiceCard 
                                key={index}
                                service={service}
                                index={index}
                                progress={scrollYProgress}
                                range={[index * 0.25, 1]}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
