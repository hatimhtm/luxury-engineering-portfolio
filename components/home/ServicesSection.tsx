"use client";

import { motion } from "framer-motion";
import { CrossHatch, CircuitPattern } from "@/components/ui/Decorative";
import { ArrowUpRight, Zap, Bot } from "lucide-react";
import { stagger, fadeUp } from "./animations";

export function ServicesSection() {
    return (
        <motion.section
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20"
        >
            <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/60 mb-2">What I Do</div>
            <div className="flex items-end justify-between mb-6">
                <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight text-ink">Services</h2>
                <a href="/services" className="font-mono text-sm font-bold uppercase tracking-wider text-ink hover:text-vivid transition-colors flex items-center gap-1 group">
                    Details <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
                <motion.div variants={fadeUp}>
                    <div className="neo-card bg-acid text-ink p-6 md:p-8 h-full relative overflow-hidden group gradient-top-accent neo-glow">
                        <CrossHatch className="absolute top-0 right-0 w-24 h-24 text-ink opacity-50" />
                        <div className="relative z-10">
                            <Zap size={32} className="mb-4" />
                            <h3 className="font-heading font-bold text-2xl md:text-3xl uppercase tracking-tight mb-3">Ship a Product</h3>
                            <p className="font-mono text-sm opacity-85 leading-relaxed mb-4">
                                End-to-end builds for solo founders and small teams — iOS, web, or both.
                                You describe the thing; I return a live product on a tight timeline.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {["Web App", "iOS", "API", "DB"].map((t) => (
                                    <span key={t} className="px-2 py-1 border-2 border-ink/40 font-mono text-xs font-bold uppercase">{t}</span>
                                ))}
                            </div>
                            <a href="/services" className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                                Learn More <ArrowUpRight size={14} />
                            </a>
                        </div>
                    </div>
                </motion.div>
                <motion.div variants={fadeUp}>
                    <div className="neo-card bg-electric text-cream p-6 md:p-8 h-full relative overflow-hidden group gradient-top-accent neo-glow-blue">
                        <CircuitPattern className="absolute bottom-0 left-0 w-32 h-32 text-cream/10" />
                        <div className="relative z-10">
                            <Bot size={32} className="mb-4 text-acid" />
                            <h3 className="font-heading font-bold text-2xl md:text-3xl uppercase tracking-tight mb-3">AI Integration</h3>
                            <p className="font-mono text-sm opacity-85 leading-relaxed mb-4">
                                LLM workflows, custom agents, and RAG pipelines — designed to do one
                                job well inside an existing product, not tacked on as a demo.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {["LLMs", "Agents", "RAG", "Fine-tune"].map((t) => (
                                    <span key={t} className="px-2 py-1 border-2 border-cream/40 font-mono text-xs font-bold uppercase">{t}</span>
                                ))}
                            </div>
                            <a href="/services" className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                                Learn More <ArrowUpRight size={14} />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}
