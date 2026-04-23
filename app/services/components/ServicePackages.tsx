"use client";

import { motion } from "framer-motion";
import { Zap, Bot, ArrowUpRight, Check, X, Shield, Rocket, RefreshCw, Code2, Smartphone, Database, Brain } from "lucide-react";
import { CircuitPattern, CrossHatch } from "@/components/ui/Decorative";

const velocityFeatures = [
    { icon: <Code2 size={20} />, label: "Full-Stack Web App", desc: "React + Node/Python + DB" },
    { icon: <Smartphone size={20} />, label: "Native iOS App", desc: "SwiftUI + Backend Integration" },
    { icon: <Database size={20} />, label: "API & Database", desc: "RESTful APIs + PostgreSQL" },
    { icon: <Shield size={20} />, label: "Production Deploy", desc: "CI/CD + monitoring + domain" },
];

const aiFeatures = [
    { icon: <Brain size={20} />, label: "LLM Integration", desc: "OpenAI, Claude, Gemini — model of your choice" },
    { icon: <Bot size={20} />, label: "Custom Agents", desc: "Task-specific workflows with retries and tools" },
    { icon: <RefreshCw size={20} />, label: "RAG Pipelines", desc: "Vector search over your own data" },
    { icon: <Rocket size={20} />, label: "Fine-Tuning", desc: "Domain-tuned models where it pays off" },
];

export function ServicePackages() {
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20">
            <div className="grid md:grid-cols-2 gap-5">
                {/* Velocity Launch */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="neo-card bg-acid text-ink p-6 md:p-8 h-full relative overflow-hidden group gradient-top-accent">
                        <CrossHatch className="absolute top-0 right-0 w-32 h-32 text-ink opacity-[0.04]" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <Zap size={28} />
                                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] opacity-80">Build a product</span>
                            </div>
                            <h2 className="font-heading font-bold text-3xl md:text-4xl uppercase tracking-tight mb-3">Ship It</h2>
                            <p className="font-mono text-sm opacity-85 leading-relaxed mb-6">
                                End-to-end builds for solo founders and small teams. Web, iOS, or both.
                                You describe the product; I return a live, reviewed, and deployed version
                                on a realistic timeline we agree on up front.
                            </p>

                            <div className="space-y-4 mb-6">
                                {velocityFeatures.map((f) => (
                                    <div key={f.label} className="flex items-start gap-3 group/item">
                                        <div className="text-ink/60 mt-0.5">{f.icon}</div>
                                        <div>
                                            <div className="font-heading font-bold text-sm uppercase tracking-tight">{f.label}</div>
                                            <div className="font-mono text-xs opacity-80">{f.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <a
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-ink text-cream px-5 py-3 font-heading font-bold text-sm uppercase tracking-wider border-[3px] border-ink hover:bg-cream hover:text-ink transition-all group"
                            >
                                Start Building
                                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* AI Augmentation */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="neo-card bg-electric text-cream p-6 md:p-8 h-full relative overflow-hidden group gradient-top-accent neo-glow-blue">
                        <CircuitPattern className="absolute bottom-0 left-0 w-40 h-40 text-cream/5" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <Bot size={28} className="text-acid" />
                                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-cream/80">Augment existing</span>
                            </div>
                            <h2 className="font-heading font-bold text-3xl md:text-4xl uppercase tracking-tight mb-3">Add AI</h2>
                            <p className="font-mono text-sm text-cream/90 leading-relaxed mb-6">
                                LLM workflows, custom agents, and RAG pipelines for products that
                                already ship. I fit into your existing repo, write small PRs, and
                                make the AI do a specific job — not just a demo.
                            </p>

                            <div className="space-y-4 mb-6">
                                {aiFeatures.map((f) => (
                                    <div key={f.label} className="flex items-start gap-3 group/item">
                                        <div className="text-acid mt-0.5">{f.icon}</div>
                                        <div>
                                            <div className="font-heading font-bold text-sm uppercase tracking-tight">{f.label}</div>
                                            <div className="font-mono text-xs text-cream/80">{f.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <a
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-acid text-ink px-5 py-3 font-heading font-bold text-sm uppercase tracking-wider border-[3px] border-ink hover:bg-cream transition-all group"
                            >
                                Explore AI
                                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
