"use client";

import { motion } from "framer-motion";
import { CircuitPattern, GridDots } from "@/components/ui/Decorative";
import { BookOpen, Flame } from "lucide-react";

/* ─── Animations ─── */
const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* ─── Data ─── */
const categories = [
    {
        name: "Frontend",
        color: "bg-acid",
        textColor: "text-ink",
        tools: [
            { name: "React / Next.js", level: 95, detail: "My daily driver. SSR, App Router, the works." },
            { name: "TypeScript", level: 90, detail: "Strict mode always. Types save lives." },
            { name: "Tailwind CSS", level: 92, detail: "Utility-first. Ship styles at the speed of thought." },
            { name: "Framer Motion", level: 85, detail: "Smooth as butter. Every animation you see here." },
            { name: "SwiftUI", level: 80, detail: "Native iOS. No React Native compromise." },
        ],
    },
    {
        name: "Backend",
        color: "bg-electric",
        textColor: "text-cream",
        tools: [
            { name: "Node.js", level: 88, detail: "Express, Fastify — APIs at lightspeed." },
            { name: "Python", level: 90, detail: "FastAPI, Django. AI/ML backbone." },
            { name: "PostgreSQL", level: 85, detail: "Relational power. Supabase when speed matters." },
            { name: "Redis", level: 75, detail: "Caching and pub/sub for scale." },
            { name: "Docker", level: 78, detail: "Containerize everything. Works on my machine™." },
        ],
    },
    {
        name: "AI / ML",
        color: "bg-hotpink",
        textColor: "text-cream",
        tools: [
            { name: "OpenAI / GPT-4", level: 92, detail: "Prompt engineering, function calling, embeddings." },
            { name: "LangChain", level: 85, detail: "Agent orchestration and chain composition." },
            { name: "RAG Pipelines", level: 80, detail: "Vector search + retrieval-augmented generation." },
            { name: "Whisper", level: 78, detail: "Speech-to-text with near-human accuracy." },
            { name: "Fine-Tuning", level: 70, detail: "Custom models for specific domains." },
        ],
    },
    {
        name: "DevOps",
        color: "bg-vivid",
        textColor: "text-cream",
        tools: [
            { name: "Vercel", level: 90, detail: "Deploy in seconds. Zero-config Next.js." },
            { name: "GitHub Actions", level: 82, detail: "CI/CD automation for every push." },
            { name: "AWS / GCP", level: 72, detail: "EC2, Lambda, Cloud Functions when needed." },
            { name: "Nginx", level: 70, detail: "Reverse proxy and load balancing." },
        ],
    },
];

const learning = [
    { name: "Rust", reason: "Systems programming for when Python is too slow." },
    { name: "Kubernetes", reason: "Orchestration at scale." },
    { name: "Three.js / WebGL", reason: "3D experiences on the web." },
    { name: "Solidity", reason: "Smart contracts. Web3 when it makes sense." },
];

export default function StackPage() {
    return (
        <div className="min-h-screen bg-cream pb-24">

            {/* Status bar */}
            <div className="w-full bg-ink border-b-[3px] border-ink py-2 px-4 md:px-8 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-acid animate-pulse-dot" />
                    <span className="font-mono text-xs font-bold text-cream/50 uppercase tracking-widest">system://arsenal</span>
                </div>
                <span className="font-mono text-xs font-bold text-cream/30 tracking-widest uppercase">
                    {categories.reduce((acc, c) => acc + c.tools.length, 0)} TOOLS LOADED
                </span>
            </div>

            {/* Header */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 mt-8 md:mt-16 mb-8 md:mb-12">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/40 mb-3">Tech Stack</div>
                    <h1 className="text-4xl sm:text-6xl md:text-[7rem] font-heading font-bold text-ink leading-[0.85] tracking-tighter uppercase mb-6">
                        The<br />Arsenal
                    </h1>
                    <p className="font-mono text-sm md:text-base font-bold text-ink/60 max-w-lg leading-relaxed">
                        I don&apos;t pick tools because they&apos;re trendy. I pick them because they ship.
                        Here&apos;s what&apos;s in the arsenal — battle-tested, production-proven.
                    </p>
                </motion.div>
            </section>

            {/* ──── Categories ──── */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20 space-y-5">
                {categories.map((cat, catIndex) => (
                    <motion.div
                        key={cat.name}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: catIndex * 0.05 }}
                    >
                        <div className={`neo-card ${cat.color} ${cat.textColor} p-6 md:p-8 relative overflow-hidden`}>
                            {catIndex % 2 === 0 ? (
                                <CircuitPattern className="absolute top-0 right-0 w-32 h-32 opacity-[0.06]" />
                            ) : (
                                <GridDots className="absolute top-0 right-0 w-32 h-32 opacity-[0.06]" />
                            )}

                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="font-heading font-bold text-2xl md:text-3xl uppercase tracking-tight">{cat.name}</h2>
                                    <span className="font-mono text-[0.6rem] font-bold uppercase tracking-widest opacity-50">
                                        {cat.tools.length} tools
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    {cat.tools.map((tool) => (
                                        <div key={tool.name} className="group">
                                            <div className="flex justify-between items-center mb-1.5">
                                                <span className="font-heading font-bold text-sm uppercase tracking-tight">{tool.name}</span>
                                                <span className="font-mono text-xs font-bold opacity-50">{tool.level}%</span>
                                            </div>
                                            <div className="h-2 bg-current/10 overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${tool.level}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                                                    className={`h-full ${cat.textColor === "text-ink" ? "bg-ink" : "bg-cream"
                                                        }`}
                                                />
                                            </div>
                                            <p className="font-mono text-xs font-bold opacity-40 mt-1">{tool.detail}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </section>

            {/* ──── Currently Learning ──── */}
            <motion.section
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20"
            >
                <div className="flex items-center gap-2 mb-2">
                    <Flame size={16} className="text-hotpink" />
                    <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/40">Level Up</div>
                </div>
                <h2 className="font-heading font-bold text-3xl md:text-4xl uppercase tracking-tight text-ink mb-6">Currently Learning</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {learning.map((item) => (
                        <motion.div key={item.name} variants={fadeUp}>
                            <div className="neo-card bg-cream p-5 h-full group hover:bg-ink hover:text-cream transition-all">
                                <div className="flex items-center gap-2 mb-2">
                                    <BookOpen size={16} className="opacity-40 group-hover:text-acid" />
                                    <h3 className="font-heading font-bold text-base uppercase tracking-tight">{item.name}</h3>
                                </div>
                                <p className="font-mono text-xs font-bold opacity-50 leading-relaxed">{item.reason}</p>
                            </div>
                        </motion.div>
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
                    <div className="relative z-10">
                        <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight mb-4">
                            Need This Stack<br /><span className="gradient-text-acid">On Your Team?</span>
                        </h2>
                        <p className="font-mono text-sm font-bold text-cream/60 max-w-lg mx-auto mb-8">
                            Every tool listed here has been used in production. Let me put them to work for you.
                        </p>
                        <a
                            href="/contact"
                            className="inline-block bg-acid text-ink font-heading font-bold text-lg uppercase tracking-wider px-8 py-4 border-[3px] border-ink shadow-neo hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all"
                        >
                            Let&apos;s Build →
                        </a>
                    </div>
                </div>
            </motion.section>
        </div>
    );
}
