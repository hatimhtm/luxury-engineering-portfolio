"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { GridDots } from "@/components/ui/Decorative";

export default function CtaSection() {
    return (
        <>
            {/* ══════════════════════════════════════
                CTA SECTION
               ══════════════════════════════════════ */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto px-4 md:px-8 mb-12"
            >
                <div className="neo-card bg-hotpink text-cream p-8 md:p-12 text-center relative overflow-hidden gradient-top-accent">
                    <GridDots className="absolute inset-0 w-full h-full text-cream/5" />
                    {/* Gradient glow */}
                    <div className="absolute top-0 left-1/4 w-1/2 h-32 bg-acid/10 blur-3xl pointer-events-none" />
                    <div className="relative z-10">
                        <h2 className="font-heading font-bold text-3xl md:text-6xl uppercase tracking-tight mb-4">Ready to build?</h2>
                        <p className="font-mono text-sm md:text-base font-bold opacity-80 mb-4 max-w-xl mx-auto">
                            I&apos;m currently available for freelance projects, contract work, and high-velocity collaborations.
                            No BS. Just results.
                        </p>
                        <div className="flex items-center justify-center gap-2 mb-8 text-cream/60">
                            <Star size={14} className="text-acid" />
                            <span className="font-mono text-xs font-bold uppercase tracking-wider">Average response time: &lt; 2 hours</span>
                            <Star size={14} className="text-acid" />
                        </div>
                        <a
                            href="/contact"
                            className="inline-block bg-cream text-ink font-heading font-bold text-lg uppercase tracking-wider px-8 py-4 border-[3px] border-ink shadow-neo hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all hover-shake"
                        >
                            Start a Project →
                        </a>
                    </div>
                </div>
            </motion.section>

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

        </>
    );
}
