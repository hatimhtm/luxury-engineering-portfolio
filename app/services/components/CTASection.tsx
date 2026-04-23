"use client";

import { motion } from "framer-motion";
import { GridDots } from "@/components/ui/Decorative";

export function CTASection() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto px-4 md:px-8 mb-12"
        >
            <div className="neo-card bg-ink text-cream p-8 md:p-12 text-center relative overflow-hidden gradient-top-accent">
                <GridDots className="absolute inset-0 w-full h-full text-cream/3" />
                <div className="absolute top-0 left-1/4 w-1/2 h-20 bg-acid/10 blur-3xl pointer-events-none" />
                <div className="relative z-10">
                    <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight mb-4">
                        Think this is the<br /><span className="gradient-text-acid">right fit?</span>
                    </h2>
                    <p className="font-mono text-sm text-cream/85 max-w-lg mx-auto mb-8 leading-relaxed">
                        Send me a brief of what you&apos;re building — current state, target,
                        any deadline. I&apos;ll reply with a plan and a realistic price.
                    </p>
                    <a
                        href="/contact"
                        className="inline-block bg-acid text-ink font-heading font-bold text-lg uppercase tracking-wider px-8 py-4 border-[3px] border-ink shadow-neo hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all"
                    >
                        Book a Call →
                    </a>
                </div>
            </div>
        </motion.section>
    );
}
