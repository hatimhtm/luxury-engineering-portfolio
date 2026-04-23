"use client";

import { useEffect, useState } from "react";

import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import AboutSection from "@/components/home/AboutSection";
import LiveTerminalSection from "@/components/home/LiveTerminalSection";
import TechMarqueeSection from "@/components/home/TechMarqueeSection";
import BentoSection from "@/components/home/BentoSection";
import PhilosophySection from "@/components/home/PhilosophySection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ServicesPreviewSection from "@/components/home/ServicesPreviewSection";
import CtaSection from "@/components/home/CtaSection";


/* ─── Konami Code Easter Egg ─── */
const KONAMI_SEQUENCE = [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
    "b", "a",
];

function useKonamiCode(callback: () => void) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === KONAMI_SEQUENCE[index]) {
                const next = index + 1;
                if (next === KONAMI_SEQUENCE.length) {
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
    }, [index, callback]);
}


export default function Home() {
    const [konamiActive, setKonamiActive] = useState(false);
    useKonamiCode(() => setKonamiActive(true));

    return (
        <div className={`min-h-screen bg-cream pb-24 ${konamiActive ? "hue-rotate-180 transition-all duration-1000" : ""}`}>
            <HeroSection />
            <StatsSection />
            <AboutSection />
            <LiveTerminalSection />
            <TechMarqueeSection />
            <BentoSection />
            <PhilosophySection />
            <TestimonialsSection />
            <ServicesPreviewSection />
            <CtaSection />

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
