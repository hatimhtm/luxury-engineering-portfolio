"use client";

import { motion } from "framer-motion";
import { ServicePackages } from "./components/ServicePackages";
import { ProcessSection } from "./components/ProcessSection";
import { ComparisonSection } from "./components/ComparisonSection";
import { CTASection } from "./components/CTASection";

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-cream pb-24">

            {/* Status bar */}
            <div className="w-full bg-ink border-b-[3px] border-ink py-2 px-4 md:px-8 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-acid animate-pulse-dot" />
                    <span className="font-mono text-xs font-bold text-cream/70 uppercase tracking-widest">system://services</span>
                </div>
                <span className="font-mono text-xs font-bold text-cream/60 tracking-widest uppercase">2 Packages</span>
            </div>

            {/* Header */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 mt-8 md:mt-16 mb-8 md:mb-12">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/60 mb-3">What I Do</div>
                    <h1 className="text-4xl sm:text-6xl md:text-[7rem] font-heading font-bold text-ink leading-[0.85] tracking-tighter uppercase mb-6">
                        Services
                    </h1>
                    <p className="font-mono text-sm md:text-base text-ink/85 max-w-xl leading-relaxed">
                        One engineer, not an agency. Two shapes of engagement depending on
                        whether you&apos;re starting from zero or adding AI to something that
                        already ships.
                    </p>
                </motion.div>
            </section>

            {/* ──── Service Packages ──── */}
            <ServicePackages />

            {/* ──── Process ──── */}
            <ProcessSection />

            {/* ──── Me vs Agency Comparison ──── */}
            <ComparisonSection />

            {/* ──── CTA ──── */}
            <CTASection />
        </div>
    );
}
