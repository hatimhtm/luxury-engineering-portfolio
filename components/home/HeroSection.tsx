"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

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
    // Scroll parallax competes with scroll on low-end devices: static hero on
    // mobile and for reduced-motion users.
    const animationsOff = prefersReduced || isMobile;
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section ref={heroRef} className="relative min-h-[88dvh] md:min-h-[100dvh] flex items-center overflow-hidden">
            {/* One accent wash, desktop only. The page has a single accent. */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
                <div className="absolute -top-32 -right-24 w-[520px] h-[520px] bg-acid/10 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-20 pb-16 md:pt-24 md:pb-24 w-full relative z-10">
                <motion.div style={animationsOff ? undefined : { y: heroY, opacity: heroOpacity }}>
                    <div className="grid md:grid-cols-12 gap-10 md:gap-10 items-center">
                        <motion.div
                            className="md:col-span-6"
                            initial={{ opacity: 0, x: -48 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <h1 className="font-heading font-bold text-ink uppercase leading-[0.84] tracking-tighter text-[3rem] sm:text-6xl md:text-[5.5rem] lg:text-[7rem]">
                                Hatim<br />El Hassak
                            </h1>
                            <p className="font-sans text-base md:text-xl text-ink/80 mt-6 max-w-[46ch] leading-relaxed">
                                I ship iOS and macOS apps, production web tools and AI pipelines
                                end to end. Solo, on tight timelines.
                            </p>
                            <div className="mt-8 flex flex-wrap items-center gap-3">
                                <a
                                    href="https://cal.com/hatimelhassak/engineering-discovery"
                                    target="_blank" rel="noopener noreferrer"
                                    className="neo-card bg-acid text-ink px-6 py-3 font-heading font-bold text-sm uppercase tracking-wider inline-flex items-center gap-2 whitespace-nowrap hover:bg-ink hover:text-acid transition-colors group"
                                >
                                    <CalendarDays size={16} />
                                    Book a call
                                    <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </a>
                                <a
                                    href="/work"
                                    className="neo-card bg-ink text-cream px-6 py-3 font-heading font-bold text-sm uppercase tracking-wider inline-flex items-center gap-2 whitespace-nowrap hover:bg-acid hover:text-ink transition-colors group"
                                >
                                    See the work
                                    <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </a>
                            </div>
                            <div className="mt-6 flex items-center gap-3 text-ink/70">
                                <div className="w-2 h-2 bg-acid animate-pulse-dot" />
                                <span className="font-mono text-xs font-bold uppercase tracking-wider">Available for new work</span>
                            </div>
                        </motion.div>

                        {/* A real client site, shown at the size it deserves. */}
                        <motion.div
                            className="md:col-span-6"
                            initial={{ opacity: 0, y: 28 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <figure>
                                <div className="relative aspect-[16/10] border-[3px] border-ink shadow-neo overflow-hidden bg-ink">
                                    <Image
                                        src="/projects/lorani.jpg"
                                        alt="Lorani, an editorial site built for a Moroccan hijab house"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 46vw"
                                        className="object-cover object-top"
                                        priority
                                    />
                                </div>
                                <figcaption className="mt-3 font-mono text-[11px] font-bold uppercase tracking-wider text-ink/60">
                                    Lorani. Trilingual editorial site, built without a framework.
                                </figcaption>
                            </figure>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
