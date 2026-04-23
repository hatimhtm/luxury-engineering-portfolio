"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

/* ─── Animated Counter Hook ─── */
function useCounter(end: number, duration: number = 2000, startCounting: boolean = false) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!startCounting) return;
        let startTime: number | null = null;
        let animationFrame: number;

        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
                animationFrame = requestAnimationFrame(step);
            }
        };

        animationFrame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, startCounting]);

    return count;
}

/* ─── Animated Stat Component ─── */
function AnimatedStat({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const count = useCounter(value, 2000, isInView);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="neo-card bg-ink text-cream p-4 md:p-6 text-center relative overflow-hidden neo-glow"
        >
            <div className="relative z-10">
                <div className="font-heading font-bold text-3xl md:text-4xl text-acid">
                    {count}{suffix}
                </div>
                <div className="font-mono text-[0.6rem] font-bold uppercase tracking-widest mt-1 text-cream/50">
                    {label}
                </div>
            </div>
        </motion.div>
    );
}

export default function StatsSection() {
    return (
        <>
            {/* ══════════════════════════════════════
                STATS STRIP
               ══════════════════════════════════════ */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 -mt-4 mb-12 md:mb-20 relative z-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <AnimatedStat value={5} suffix="+" label="Projects Shipped" />
                    <AnimatedStat value={12} suffix="h" label="Avg Delivery" />
                    <AnimatedStat value={5} suffix="+" label="Languages Spoken" />
                    <AnimatedStat value={3} suffix="+" label="Years Building" />
                </div>
            </section>

        </>
    );
}
