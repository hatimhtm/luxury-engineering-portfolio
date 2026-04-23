"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useRef } from "react";

export function HeroSection() {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section ref={heroRef} className="relative min-h-[80vh] md:min-h-screen flex items-center overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-20 -right-20 w-72 md:w-[500px] h-72 md:h-[500px] bg-acid/10 rounded-full blur-3xl animate-blob" />
                <div className="absolute bottom-10 -left-20 w-60 md:w-[400px] h-60 md:h-[400px] bg-electric/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: "2s" }} />
                <div className="absolute top-1/3 left-1/3 w-48 md:w-[300px] h-48 md:h-[300px] bg-hotpink/8 rounded-full blur-3xl animate-blob" style={{ animationDelay: "4s" }} />
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 w-full relative z-10">
                <motion.div style={{ y: heroY, opacity: heroOpacity }}>
                    <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -60 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                        >
                            <div className="font-mono text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-ink/70 mb-4">
                                Portfolio / {new Date().getFullYear()}
                            </div>
                            <h1 className="text-5xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-heading font-bold text-ink leading-[0.85] tracking-tighter uppercase">
                                Hatim<br />
                                <span className="relative inline-block">
                                    El Hassak
                                    <span className="absolute -right-2 -top-2 md:-right-5 md:-top-5 w-5 h-5 md:w-8 md:h-8 bg-acid border-[3px] border-ink animate-spin-slow" />
                                </span>
                            </h1>
                            <p className="font-mono text-sm md:text-lg text-ink/80 mt-6 max-w-xl leading-relaxed">
                                Full-stack engineer. I build iOS apps, AI pipelines, and production
                                web tools end-to-end — from brief to App Store, or brief to
                                Vercel, on tight timelines.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col items-start md:items-end gap-4"
                        >
                            <a
                                href="/contact"
                                className="neo-card bg-ink text-cream px-6 py-3 font-heading font-bold text-sm uppercase tracking-wider flex items-center gap-2 hover:bg-acid hover:text-ink transition-all group neo-glow"
                            >
                                Start a Project
                                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                            <div className="flex items-center gap-3 text-ink/70">
                                <div className="w-2 h-2 bg-acid animate-pulse-dot" />
                                <span className="font-mono text-xs font-bold uppercase tracking-wider">Available for new work</span>
                            </div>
                        </motion.div>
                    </header>

                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="mt-12 md:mt-20 flex justify-center"
                    >
                        <ChevronDown size={24} className="text-ink/50" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
