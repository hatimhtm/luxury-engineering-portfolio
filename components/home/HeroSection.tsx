"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { useRef, useEffect, useState } from "react";

export function HeroSection() {
    const heroRef = useRef(null);
    const prefersReduced = useReducedMotion();
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia("(max-width: 768px)");
        const update = () => setIsMobile(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);
    // Parallax competes with scroll on low-end devices: static on mobile and
    // for reduced-motion users.
    const animationsOff = prefersReduced || isMobile;
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

    return (
        <section ref={heroRef} className="relative min-h-[76dvh] md:min-h-[82dvh] flex items-center">
            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-20 pb-12 md:pt-24 md:pb-16 w-full">
                <motion.div style={animationsOff ? undefined : { y: heroY, opacity: heroOpacity }}>
                    {/* The name is the visual. Nothing competes with it. */}
                    <motion.h1
                        className="font-heading font-bold text-ink uppercase leading-[0.82] tracking-[-0.045em] text-[3.5rem] sm:text-[6rem] md:text-[8.5rem] lg:text-[11rem]"
                        initial={{ opacity: 0, y: 36 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Hatim<br />El Hassak
                    </motion.h1>

                    <motion.div
                        className="mt-8 md:mt-10 border-t-[3px] border-ink pt-7 md:pt-8 grid md:grid-cols-12 gap-7 md:gap-10 items-start"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                    >
                        <p className="md:col-span-6 font-sans text-lg md:text-2xl text-ink/85 leading-snug max-w-[34ch]">
                            I ship iOS and macOS apps, production web tools and AI
                            pipelines end to end. Solo, on tight timelines.
                        </p>

                        <div className="md:col-span-6 flex flex-col items-start md:items-end gap-5">
                            <div className="flex flex-wrap gap-3">
                                <a
                                    href="https://cal.com/hatimelhassak/engineering-discovery"
                                    target="_blank" rel="noopener noreferrer"
                                    className="neo-card bg-acid text-ink px-6 py-3.5 font-heading font-bold text-sm uppercase tracking-wider inline-flex items-center gap-2 whitespace-nowrap hover:bg-ink hover:text-acid transition-colors group"
                                >
                                    <CalendarDays size={16} />
                                    Book a call
                                    <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </a>
                                <a
                                    href="/work"
                                    className="neo-card bg-ink text-cream px-6 py-3.5 font-heading font-bold text-sm uppercase tracking-wider inline-flex items-center gap-2 whitespace-nowrap hover:bg-acid hover:text-ink transition-colors group"
                                >
                                    See the work
                                    <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </a>
                            </div>
                            <div className="flex items-center gap-3 text-ink/70">
                                <div className="w-2 h-2 bg-acid animate-pulse-dot" />
                                <span className="font-mono text-xs font-bold uppercase tracking-wider">Available for new work</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
