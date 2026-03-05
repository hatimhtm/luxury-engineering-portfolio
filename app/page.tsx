"use client";

import LiveTerminal from "@/components/ui/LiveTerminal";
import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { AboutSection } from "@/components/home/AboutSection";
import { TechLogoMarquee } from "@/components/home/TechLogoMarquee";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { PhilosophySection } from "@/components/home/PhilosophySection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { CtaSection } from "@/components/home/CtaSection";

/* ─── Konami Code Easter Egg ─── */
function useKonamiCode(callback: () => void) {
    const sequence = useMemo(() => [
        "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
        "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
        "b", "a",
    ], []);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === sequence[index]) {
                const next = index + 1;
                if (next === sequence.length) {
                    callback();
                    setIndex(0);
                } else {
                    setIndex(next);
                }
            } else {
                setIndex(0);
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [index, callback, sequence]);
}

export default function Home() {
    const [konamiActive, setKonamiActive] = useState(false);
    useKonamiCode(() => setKonamiActive(true));

    return (
        <div className={`min-h-screen bg-cream pb-24 ${konamiActive ? "hue-rotate-180 transition-all duration-1000" : ""}`}>

            {/* ══════════════════════════════════════
                TOP MARQUEE
               ══════════════════════════════════════ */}
            <div className="w-full bg-acid border-b-[3px] border-ink py-2 overflow-hidden">
                <div className="marquee-container font-mono font-bold text-ink uppercase tracking-widest text-xs">
                    <div className="marquee-content animate-marquee">
                        <span className="px-4 md:px-6">FULL-STACK ENGINEER&nbsp;///&nbsp;</span>
                        <span className="px-4 md:px-6">SHIP IN HOURS NOT WEEKS&nbsp;///&nbsp;</span>
                        <span className="px-4 md:px-6">AI-POWERED&nbsp;///&nbsp;</span>
                        <span className="px-4 md:px-6">ANTI-BLOAT&nbsp;///&nbsp;</span>
                        <span className="px-4 md:px-6">FULL-STACK ENGINEER&nbsp;///&nbsp;</span>
                        <span className="px-4 md:px-6">SHIP IN HOURS NOT WEEKS&nbsp;///&nbsp;</span>
                    </div>
                    <div className="marquee-content animate-marquee" aria-hidden="true">
                        <span className="px-4 md:px-6">FULL-STACK ENGINEER&nbsp;///&nbsp;</span>
                        <span className="px-4 md:px-6">SHIP IN HOURS NOT WEEKS&nbsp;///&nbsp;</span>
                        <span className="px-4 md:px-6">AI-POWERED&nbsp;///&nbsp;</span>
                        <span className="px-4 md:px-6">ANTI-BLOAT&nbsp;///&nbsp;</span>
                        <span className="px-4 md:px-6">FULL-STACK ENGINEER&nbsp;///&nbsp;</span>
                        <span className="px-4 md:px-6">SHIP IN HOURS NOT WEEKS&nbsp;///&nbsp;</span>
                    </div>
                </div>
            </div>

            <HeroSection />

            <StatsSection />

            <AboutSection />

            {/* ══════════════════════════════════════
                LIVE TERMINAL
               ══════════════════════════════════════ */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20">
                <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/40 mb-2">Live Feed</div>
                <h2 className="font-heading font-bold text-2xl md:text-3xl uppercase tracking-tight text-ink mb-4">System Status</h2>
                <LiveTerminal />
            </section>

            <TechLogoMarquee />

            <ProjectsSection />

            <PhilosophySection />

            <TestimonialsSection />

            <ServicesSection />

            <CtaSection />

            {/* ══════════════════════════════════════
                BOTTOM MARQUEE
               ══════════════════════════════════════ */}
            <div className="w-full bg-acid border-t-[3px] border-ink py-3 overflow-hidden">
                <div className="marquee-container font-mono font-bold text-ink uppercase tracking-widest text-sm">
                    <div className="marquee-content animate-marquee-reverse">
                        <span className="px-6">AVAILABLE FOR HIRE&nbsp;///&nbsp;</span>
                        <span className="px-6">OPEN FOR CONTRACT&nbsp;///&nbsp;</span>
                        <span className="px-6">REMOTE READY&nbsp;///&nbsp;</span>
                        <span className="px-6">AVAILABLE FOR HIRE&nbsp;///&nbsp;</span>
                        <span className="px-6">OPEN FOR CONTRACT&nbsp;///&nbsp;</span>
                        <span className="px-6">REMOTE READY&nbsp;///&nbsp;</span>
                    </div>
                    <div className="marquee-content animate-marquee-reverse" aria-hidden="true">
                        <span className="px-6">AVAILABLE FOR HIRE&nbsp;///&nbsp;</span>
                        <span className="px-6">OPEN FOR CONTRACT&nbsp;///&nbsp;</span>
                        <span className="px-6">REMOTE READY&nbsp;///&nbsp;</span>
                        <span className="px-6">AVAILABLE FOR HIRE&nbsp;///&nbsp;</span>
                        <span className="px-6">OPEN FOR CONTRACT&nbsp;///&nbsp;</span>
                        <span className="px-6">REMOTE READY&nbsp;///&nbsp;</span>
                    </div>
                </div>
            </div>

            {/* Easter egg - Konami code resets */}
            {konamiActive && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="fixed top-20 left-1/2 -translate-x-1/2 z-[400] neo-card bg-acid text-ink px-6 py-3 font-mono text-sm font-bold uppercase"
                >
                    🎮 lord_decay mode activated
                    <button onClick={() => setKonamiActive(false)} className="ml-4 underline text-xs">dismiss</button>
                </motion.div>
            )}
        </div>
    );
}
