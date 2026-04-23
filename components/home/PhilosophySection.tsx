"use client";

import { motion } from "framer-motion";
import { CircuitPattern, GridDots } from "@/components/ui/Decorative";

export default function PhilosophySection() {
    return (
        <>
            {/* ══════════════════════════════════════
                PHILOSOPHY / APPROACH
               ══════════════════════════════════════ */}
            <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20"
            >
                <div className="neo-card bg-ink text-cream p-6 md:p-12 relative overflow-hidden gradient-top-accent">
                    <CircuitPattern className="absolute top-0 right-0 w-48 md:w-80 h-48 md:h-80 text-cream/5" />
                    <GridDots className="absolute bottom-0 left-0 w-40 h-40 text-cream/5" />
                    {/* Subtle gradient glow */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-electric/5 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 grid md:grid-cols-2 gap-8 md:gap-16">
                        <div>
                            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-cream/30 mb-3">Philosophy</div>
                            <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight text-cream leading-tight mb-6">
                                Anti-Bloat.<br /><span className="gradient-text-acid">Pro-Speed.</span>
                            </h2>
                            <p className="font-mono text-sm font-bold text-cream/60 leading-relaxed mb-6">
                                I hate inefficiency the way most people hate traffic.
                                While teams spend weeks debating architecture, I&apos;m already
                                shipping. Every hour of delay is an hour of lost insight.
                                I use AI not because I&apos;m lazy — but because I want to move
                                at the speed of thought. I am the driver; AI is the engine.
                            </p>
                            <div className="flex items-center gap-3 p-4 border-[3px] border-cream/10">
                                <div className="w-3 h-3 bg-acid animate-pulse-dot flex-shrink-0" />
                                <span className="font-mono text-xs font-bold text-cream/40 uppercase tracking-wider">Currently shipping at full velocity</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {[
                                { num: "01", title: "Brief", desc: "30-min call. I understand your vision, constraints, and timeline." },
                                { num: "02", title: "Build", desc: "Heads-down engineering. Real commits, not slide decks." },
                                { num: "03", title: "Ship", desc: "Production deployment. Real users, real feedback." },
                                { num: "04", title: "Scale", desc: "Optimize, iterate, and grow based on data." },
                            ].map((step, idx) => (
                                <motion.div
                                    key={step.num}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                                    className="flex gap-4 items-start group"
                                >
                                    <div className="font-heading font-bold text-2xl md:text-3xl text-acid w-12 flex-shrink-0 group-hover:translate-x-1 transition-transform">{step.num}</div>
                                    <div className="border-l-[3px] border-cream/10 pl-4 group-hover:border-acid/40 transition-colors">
                                        <div className="font-heading font-bold text-lg uppercase tracking-tight">{step.title}</div>
                                        <div className="font-mono text-xs font-bold text-cream/40 mt-1">{step.desc}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.section>

        </>
    );
}
