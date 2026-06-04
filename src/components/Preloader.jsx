import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const containerRef = useRef(null);
    const counterRef = useRef(null);
    const barRef = useRef(null);
    const brandRef = useRef(null);

    useEffect(() => {
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += Math.floor(Math.random() * 15) + 5;
            if (currentProgress > 100) currentProgress = 100;
            setProgress(currentProgress);

            if (currentProgress === 100) {
                clearInterval(interval);
                const tl = gsap.timeline({ onComplete: () => { if (onComplete) onComplete(); } });
                tl.to(counterRef.current, { y: -60, opacity: 0, duration: 0.7, ease: "power4.in" }, "+=0.3")
                  .to(brandRef.current, { y: -60, opacity: 0, duration: 0.6, ease: "power4.in" }, "-=0.5")
                  .to(barRef.current, { scaleX: 0, transformOrigin: "right", duration: 0.8, ease: "power4.inOut" }, "-=0.4")
                  .to(containerRef.current, { yPercent: -100, duration: 1.2, ease: "power4.inOut" }, "-=0.3");
            }
        }, 100);
        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[999999] bg-[#0A0A0A] flex flex-col items-center justify-center pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />

            <div ref={brandRef} className="absolute top-10 left-10 flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#E63946]" />
                <span className="font-bold tracking-tighter text-[#F0EAE2] text-lg">SAMRATEQ</span>
            </div>

            <div ref={counterRef} className="flex flex-col items-center">
                <span className="font-extrabold tracking-tighter text-[#F0EAE2] leading-none"
                    style={{ fontSize: 'clamp(5rem, 18vw, 16rem)' }}>
                    {progress}
                </span>
                <div className="flex items-center gap-3 mt-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E63946] animate-pulse" />
                    <span className="font-mono text-xs tracking-[0.4em] text-[#555] uppercase">Loading Experience</span>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#1A1A1A] overflow-hidden">
                <div
                    ref={barRef}
                    className="h-full bg-[#E63946] origin-left"
                    style={{ width: `${progress}%`, transition: 'width 0.12s linear' }}
                />
            </div>
        </div>
    );
}
