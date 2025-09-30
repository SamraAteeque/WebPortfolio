import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// Import your project images
import Img1 from '../assets/Img1.png';
import Img2 from '../assets/Img2.png';
import Img3 from '../assets/Img3.png';
import Img4 from '../assets/Img4.png';

const workProjects = [
    {
        title: "Modern Portfolio Website Design",
        category: "Portfolio Website",
        image: Img1,
        link: "https://duo-plum.vercel.app/"
    },
    {
        title: "Jewellery Business Landing Page",
        category: "Jewellry Website",
        image: Img2,
        link: "https://jewellry-business.vercel.app/"
    },
    {
        title: "Smart Shopping Hub",
        category: "E-Commerce Website",
        image: Img3,
        link: "https://ecommerce-project-app-l9af.onrender.com/"
    },
    {
        title: "Modern Website Design",
        category: "Wedding Planner Website",
        image: Img4,
        link: "https://wedding-planner-p2ho.vercel.app/"
    },
    {
        title: "Interior Design Showcase(Work in progress)",
        category: "Interior Designer Website",
        image: "https://images.unsplash.com/photo-1487017159037-56e632f91605?q=80&w=2070&auto=format&fit=crop",
        link: "#"
    },
    {
        title: "Landing Page(Work in progress)",
        category: "Cafe Landing Page",
        image: "https://images.unsplash.com/photo-1616763355548-1b606f47481c?q=80&w=2070&auto=format&fit=crop",
        link: "#"
    },
];

// --- UPDATED Project Card with whileInView animation ---
const ProjectGridCard = ({ project }) => {
    return (
        <motion.div
            className="relative rounded-2xl overflow-hidden group shadow-md"
            initial={{ opacity: 0, y: 20 }} // Start invisible and slightly down
            whileInView={{ opacity: 1, y: 0 }} // Animate to visible and original position
            viewport={{ once: true }} // Only animate once
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/F0EEEB/333333?text=${project.title.replace(' ', '+')}`; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                    <p className="text-sm opacity-80 mb-1">{project.category}</p>
                    <h3 className="text-xl font-semibold mb-4">{project.title}</h3>

                    <div
                        className="absolute bottom-6 right-6 bg-yellow-400 text-gray-900 p-3 rounded-full 
                                   flex items-center justify-center transform translate-y-0 group-hover:-translate-y-1 
                                   group-hover:rotate-45 transition-all duration-300 ease-out"
                    >
                        <ArrowUpRight className="w-5 h-5" />
                    </div>
                </div>
            </a>
        </motion.div>
    );
};



export default function WorkPage() {
    return (
        <section id="work" className="bg-white text-gray-900 py-16 md:py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <motion.div
                    className="text-center mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <p className="text-yellow-500 font-medium text-sm mb-2">&bull; Case Studies</p>
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tighter">
                        See Our All Latest <br /> Creative Work
                    </h1>
                    <motion.a
                        href="#"
                        className="mt-8 inline-flex items-center bg-yellow-400 text-gray-900 font-semibold py-3 px-6 rounded-full transition-all duration-300 ease-in-out hover:bg-yellow-500 hover:shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View All
                        <ArrowUpRight className="w-5 h-5 ml-2" />
                    </motion.a>
                </motion.div>

                {/* Project Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {workProjects.map((project, index) => (
                        <ProjectGridCard key={index} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
}