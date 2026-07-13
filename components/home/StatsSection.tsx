"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { projectCount, appStoreCount, macAppCount } from "@/lib/projects";

/* Animated counter for numeric stats */
function useCounter(end: number, duration: number = 1600, startCounting: boolean = false) {
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

type Stat = { value: number; suffix?: string; prefix?: string; label: string } | { display: string; label: string };

function StatCard({ stat, index }: { stat: Stat; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    // SSR and no-JS render the FINAL value; the count-up only runs
    // client-side once the card scrolls into view.
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    const animated = "value" in stat;
    const count = useCounter(animated ? stat.value : 0, 1600, animated && isInView);
    const shown = animated ? (mounted && isInView ? count : stat.value) : null;

    return (
        <div
            ref={ref}
            className="neo-card bg-ink text-cream p-4 md:p-6 text-center relative overflow-hidden neo-glow reveal-up"
            style={{ animationDelay: `${index * 0.08}s` }}
        >
            <div className="relative z-10">
                <div className="font-heading font-bold text-3xl md:text-4xl text-acid">
                    {animated ? (
                        <>{stat.prefix}{shown}{stat.suffix}</>
                    ) : (
                        stat.display
                    )}
                </div>
                <div className="font-mono text-xs font-bold uppercase tracking-widest mt-1 text-cream/70">
                    {stat.label}
                </div>
            </div>
        </div>
    );
}

const stats: Stat[] = [
    { value: projectCount, suffix: "", label: "Projects Shipped" },
    { value: appStoreCount, suffix: "", label: "Live on App Store" },
    { value: macAppCount, suffix: "", label: "macOS Apps" },
    { display: "Same-Day", label: "Reply Window" },
];

export function StatsSection() {
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 -mt-4 mb-12 md:mb-20 relative z-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {stats.map((s, i) => (
                    <StatCard key={s.label} stat={s} index={i} />
                ))}
            </div>
        </section>
    );
}
