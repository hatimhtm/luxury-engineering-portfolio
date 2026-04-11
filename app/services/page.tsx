"use client";

import { motion } from "framer-motion";
import { Zap, Bot, ArrowUpRight, Shield, Rocket, RefreshCw, Code2, Smartphone, Database, Brain } from "lucide-react";
import { CircuitPattern, GridDots, CrossHatch } from "@/components/ui/Decorative";

/* ─── Animations ─── */
const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* ─── Data ─── */
const velocityFeatures = [
    { icon: <Code2 size={20} />, label: "Full-Stack Web App", desc: "React + Node/Python + DB" },
    { icon: <Smartphone size={20} />, label: "Native iOS App", desc: "SwiftUI + Backend Integration" },
    { icon: <Database size={20} />, label: "API & Database", desc: "RESTful APIs + PostgreSQL" },
    { icon: <Shield size={20} />, label: "Production Deploy", desc: "CI/CD + monitoring + domain" },
];

const aiFeatures = [
    { icon: <Brain size={20} />, label: "LLM Integration", desc: "OpenAI, Claude, Gemini — your pick" },
    { icon: <Bot size={20} />, label: "Custom Agents", desc: "Autonomous workflows that think" },
    { icon: <RefreshCw size={20} />, label: "RAG Pipelines", desc: "Your data, AI-searchable" },
    { icon: <Rocket size={20} />, label: "Fine-Tuning", desc: "Models trained on your domain" },
];

const comparisonData = [
    { feature: "Average delivery time", agency: "4–8 weeks", me: "12–48 hours" },
    { feature: "Who does the work", agency: "Junior devs", me: "Me. Personally." },
    { feature: "Communication", agency: "Account managers", me: "Direct Slack/Email" },
    { feature: "Tech stack decisions", agency: "Whatever we know", me: "Best tool for the job" },
    { feature: "Post-launch support", agency: "Extra contract", me: "Included" },
    { feature: "AI capabilities", agency: "❌ No", me: "✅ Built-in" },
    { feature: "Bloat factor", agency: "High", me: "Zero" },
];

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-cream pb-24">

            {/* Status bar */}
            <div className="w-full bg-ink border-b-[3px] border-ink py-2 px-4 md:px-8 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-acid animate-pulse-dot" />
                    <span className="font-mono text-xs font-bold text-cream/50 uppercase tracking-widest">system://services</span>
                </div>
                <span className="font-mono text-xs font-bold text-cream/30 tracking-widest uppercase">2 Packages</span>
            </div>

            {/* Header */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 mt-8 md:mt-16 mb-8 md:mb-12">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/40 mb-3">What I Do</div>
                    <h1 className="text-4xl sm:text-6xl md:text-[7rem] font-heading font-bold text-ink leading-[0.85] tracking-tighter uppercase mb-6">
                        Services
                    </h1>
                    <p className="font-mono text-sm md:text-base font-bold text-ink/60 max-w-lg leading-relaxed">
                        No BS proposals. No scope creep. No junior devs hiding behind a brand.
                        Just me, shipping your product at warp speed. Two ways we can work together:
                    </p>
                </motion.div>
            </section>

            {/* ──── Service Packages ──── */}
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
                                    <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.2em] opacity-50">Ship Fast</span>
                                </div>
                                <h2 className="font-heading font-bold text-3xl md:text-4xl uppercase tracking-tight mb-3">Velocity Launch</h2>
                                <p className="font-mono text-sm font-bold opacity-70 leading-relaxed mb-6">
                                    Production-ready MVPs in 12–48 hours. Full-stack, deployed, and converting.
                                    Ideal for startups that need to validate fast.
                                </p>

                                <div className="space-y-4 mb-6">
                                    {velocityFeatures.map((f) => (
                                        <div key={f.label} className="flex items-start gap-3 group/item">
                                            <div className="text-ink/60 mt-0.5">{f.icon}</div>
                                            <div>
                                                <div className="font-heading font-bold text-sm uppercase tracking-tight">{f.label}</div>
                                                <div className="font-mono text-xs font-bold opacity-50">{f.desc}</div>
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
                                    <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.2em] text-cream/50">Think Different</span>
                                </div>
                                <h2 className="font-heading font-bold text-3xl md:text-4xl uppercase tracking-tight mb-3">AI Augmentation</h2>
                                <p className="font-mono text-sm font-bold text-cream/70 leading-relaxed mb-6">
                                    LLM integration, custom agents, and RAG pipelines.
                                    Intelligence embedded into every layer of your product.
                                </p>

                                <div className="space-y-4 mb-6">
                                    {aiFeatures.map((f) => (
                                        <div key={f.label} className="flex items-start gap-3 group/item">
                                            <div className="text-acid mt-0.5">{f.icon}</div>
                                            <div>
                                                <div className="font-heading font-bold text-sm uppercase tracking-tight">{f.label}</div>
                                                <div className="font-mono text-xs font-bold text-cream/50">{f.desc}</div>
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

            {/* ──── Process ──── */}
            <motion.section
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20"
            >
                <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/40 mb-2">How It Works</div>
                <h2 className="font-heading font-bold text-3xl md:text-4xl uppercase tracking-tight text-ink mb-8">The Process</h2>

                <div className="grid md:grid-cols-4 gap-5">
                    {[
                        { num: "01", title: "Brief", desc: "30-min call. We align on scope, stack, and timeline. No fluff, no PowerPoints.", color: "bg-acid", textColor: "text-ink" },
                        { num: "02", title: "Build", desc: "Heads-down engineering. You get daily updates and a staging link from day one.", color: "bg-ink", textColor: "text-cream" },
                        { num: "03", title: "Ship", desc: "Production deployment with CI/CD, monitoring, and domain setup. Real users from day one.", color: "bg-electric", textColor: "text-cream" },
                        { num: "04", title: "Scale", desc: "Post-launch support. I optimize based on real data, not assumptions.", color: "bg-hotpink", textColor: "text-cream" },
                    ].map((step) => (
                        <motion.div key={step.num} variants={fadeUp}>
                            <div className={`neo-card ${step.color} ${step.textColor} p-6 h-full relative overflow-hidden`}>
                                <div className="absolute top-3 right-3 font-heading font-bold text-4xl opacity-10 select-none">{step.num}</div>
                                <div className="relative z-10">
                                    <h3 className="font-heading font-bold text-xl uppercase tracking-tight mb-3">{step.title}</h3>
                                    <p className="font-mono text-xs font-bold opacity-70 leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* ──── Me vs Agency Comparison ──── */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20"
            >
                <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/40 mb-2">Why Me</div>
                <h2 className="font-heading font-bold text-3xl md:text-4xl uppercase tracking-tight text-ink mb-8">Me vs. An Agency</h2>

                <div className="neo-card bg-cream overflow-hidden">
                    {/* Header row */}
                    <div className="grid grid-cols-3 bg-ink text-cream">
                        <div className="p-4 font-mono text-xs font-bold uppercase tracking-wider border-r border-cream/10"></div>
                        <div className="p-4 font-mono text-xs font-bold uppercase tracking-wider text-center border-r border-cream/10 text-cream/50">
                            Typical Agency
                        </div>
                        <div className="p-4 font-mono text-xs font-bold uppercase tracking-wider text-center text-acid">
                            Hatim
                        </div>
                    </div>

                    {/* Rows */}
                    {comparisonData.map((row, i) => (
                        <div key={i} className={`grid grid-cols-3 ${i % 2 === 0 ? "bg-cream" : "bg-ink/[0.02]"} border-t-[2px] border-ink/10`}>
                            <div className="p-4 font-mono text-xs font-bold text-ink/60">{row.feature}</div>
                            <div className="p-4 font-mono text-xs font-bold text-ink/40 text-center border-x-[2px] border-ink/10">{row.agency}</div>
                            <div className="p-4 font-mono text-xs font-bold text-ink text-center">{row.me}</div>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* ──── CTA ──── */}
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
                            Stop Debating.<br /><span className="gradient-text-acid">Start Shipping.</span>
                        </h2>
                        <p className="font-mono text-sm font-bold text-cream/60 max-w-lg mx-auto mb-8">
                            Every day you wait is a day your competitors get ahead.
                            I&apos;m available now. Let&apos;s go.
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
        </div>
    );
}
