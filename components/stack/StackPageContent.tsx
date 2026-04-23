"use client";

import { motion } from "framer-motion";
import { CircuitPattern, GridDots } from "@/components/ui/Decorative";
import { BookOpen, Flame } from "lucide-react";

/* Animations */
const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/* Proficiency tag — categorical, not quantitative */
type Depth = "daily" | "frequent" | "proficient";
type Tool = { name: string; depth: Depth; detail: string };
type Category = { name: string; color: string; textColor: string; tools: Tool[] };

const depthLabel: Record<Depth, string> = {
    daily: "Daily driver",
    frequent: "Frequent",
    proficient: "Proficient",
};

export const categories: Category[] = [
    {
        name: "Frontend",
        color: "bg-acid",
        textColor: "text-ink",
        tools: [
            { name: "Next.js 14 / React", depth: "daily", detail: "App Router, RSC, Server Actions — the default for every web build." },
            { name: "TypeScript", depth: "daily", detail: "Strict mode across every project. The type system is part of the design." },
            { name: "Tailwind CSS", depth: "daily", detail: "Utility-first with a custom design system layered on top." },
            { name: "Framer Motion", depth: "frequent", detail: "For motion systems where I want physics, not just easing curves." },
            { name: "SwiftUI", depth: "daily", detail: "Native iOS UI. Charts, Live Activities, symbol effects on iOS 17+." },
            { name: "GSAP", depth: "frequent", detail: "When a marketing site needs scroll-driven choreography, not just reveals." },
        ],
    },
    {
        name: "Backend",
        color: "bg-electric",
        textColor: "text-cream",
        tools: [
            { name: "Python", depth: "daily", detail: "FastAPI for APIs. Playwright for crawlers. Pandas where the data lives." },
            { name: "Node.js", depth: "frequent", detail: "API routes, background workers, serverless functions." },
            { name: "PostgreSQL", depth: "frequent", detail: "Relational data with deliberate schema design, not auto-generated blobs." },
            { name: "Supabase", depth: "daily", detail: "Postgres + Auth + Storage + Edge Functions — default BaaS for small teams." },
            { name: "Redis", depth: "proficient", detail: "Caching, queues, rate limits, session storage." },
            { name: "Docker", depth: "frequent", detail: "For pipelines that need to run the same on my laptop and in CI." },
        ],
    },
    {
        name: "AI / ML",
        color: "bg-hotpink",
        textColor: "text-cream",
        tools: [
            { name: "OpenAI / GPT", depth: "daily", detail: "Prompt design, function calling, structured outputs, embeddings." },
            { name: "Gemini 2.5", depth: "frequent", detail: "Primary for cost-sensitive draft generation (used in LeadSniper)." },
            { name: "LangChain", depth: "frequent", detail: "For agent loops and retry-aware chains — not for simple prompts." },
            { name: "RAG pipelines", depth: "frequent", detail: "Vector search + retrieval over domain docs, not generic wrappers." },
            { name: "Speech-to-Text", depth: "frequent", detail: "Google Cloud STT for non-English; Whisper for offline contexts." },
        ],
    },
    {
        name: "Infra & DevOps",
        color: "bg-vivid",
        textColor: "text-cream",
        tools: [
            { name: "Vercel", depth: "daily", detail: "Default host for Next.js work. Preview deploys on every PR." },
            { name: "GitHub Actions", depth: "frequent", detail: "Tests, builds, and deploys — everything that shouldn't be manual." },
            { name: "AWS / GCP", depth: "proficient", detail: "Used where the client already lives; not my default for greenfield." },
            { name: "Playwright", depth: "daily", detail: "Headless browsers for scraping, e2e tests, and visual diff." },
        ],
    },
];

export const learning = [
    { name: "Rust", reason: "Systems-level reach when Python is the bottleneck." },
    { name: "Kubernetes", reason: "For stacks that outgrow a single-VM footprint." },
    { name: "Three.js / WebGL", reason: "Real-time 3D on the web — product visualisations and interactive demos." },
    { name: "Solidity", reason: "Smart contracts — selectively, where on-chain is genuinely the right fit." },
];

export function StatusBar() {
    const total = categories.reduce((acc, c) => acc + c.tools.length, 0);
    return (
        <div className="w-full bg-ink border-b-[3px] border-ink py-2 px-4 md:px-8 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-acid animate-pulse-dot" />
                <span className="font-mono text-xs font-bold text-cream/70 uppercase tracking-widest">system://arsenal</span>
            </div>
            <span className="font-mono text-xs font-bold text-cream/60 tracking-widest uppercase">
                {total} TOOLS · {categories.length} CATEGORIES
            </span>
        </div>
    );
}

export function HeaderSection() {
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mt-8 md:mt-16 mb-8 md:mb-12">
            <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/60 mb-3">Tech Stack</div>
                <h1 className="text-4xl sm:text-6xl md:text-[7rem] font-heading font-bold text-ink leading-[0.85] tracking-tighter uppercase mb-6">
                    The<br />Arsenal
                </h1>
                <p className="font-mono text-sm md:text-base text-ink/85 max-w-xl leading-relaxed">
                    No percentages, no self-graded proficiency charts. These are the tools I
                    reach for on real projects, organised by how often I actually use them.
                </p>
            </motion.div>
        </section>
    );
}

function DepthPill({ depth, textColor }: { depth: Depth; textColor: string }) {
    const onDark = textColor === "text-cream";
    const styles: Record<Depth, string> = {
        daily: onDark ? "bg-acid text-ink border-acid" : "bg-ink text-cream border-ink",
        frequent: onDark ? "bg-cream/15 text-cream border-cream/30" : "bg-ink/10 text-ink border-ink/30",
        proficient: onDark ? "bg-cream/5 text-cream/80 border-cream/20" : "bg-ink/5 text-ink/80 border-ink/20",
    };
    return (
        <span className={`inline-flex items-center px-2 py-0.5 border-2 font-mono text-[0.65rem] font-bold uppercase tracking-wider ${styles[depth]}`}>
            {depthLabel[depth]}
        </span>
    );
}

export function CategoriesSection() {
    return (
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
                            <CircuitPattern className="absolute top-0 right-0 w-32 h-32 opacity-[0.08]" />
                        ) : (
                            <GridDots className="absolute top-0 right-0 w-32 h-32 opacity-[0.08]" />
                        )}

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="font-heading font-bold text-2xl md:text-3xl uppercase tracking-tight">{cat.name}</h2>
                                <span className="font-mono text-xs font-bold uppercase tracking-widest opacity-70">
                                    {cat.tools.length} tools
                                </span>
                            </div>

                            <div className="grid md:grid-cols-2 gap-x-8 gap-y-5">
                                {cat.tools.map((tool) => (
                                    <div key={tool.name} className="flex flex-col gap-1.5">
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="font-heading font-bold text-sm md:text-base uppercase tracking-tight">{tool.name}</span>
                                            <DepthPill depth={tool.depth} textColor={cat.textColor} />
                                        </div>
                                        <p className="font-mono text-xs md:text-sm opacity-85 leading-relaxed">{tool.detail}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </section>
    );
}

export function CurrentlyLearningSection() {
    return (
        <motion.section
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20"
        >
            <div className="flex items-center gap-2 mb-2">
                <Flame size={16} className="text-hotpink" />
                <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/60">Level Up</div>
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl uppercase tracking-tight text-ink mb-6">Currently Learning</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {learning.map((item) => (
                    <motion.div key={item.name} variants={fadeUp}>
                        <div className="neo-card bg-cream p-5 h-full group hover:bg-ink hover:text-cream transition-all">
                            <div className="flex items-center gap-2 mb-2">
                                <BookOpen size={16} className="opacity-60 group-hover:text-acid" />
                                <h3 className="font-heading font-bold text-base uppercase tracking-tight">{item.name}</h3>
                            </div>
                            <p className="font-mono text-xs opacity-80 leading-relaxed">{item.reason}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}

export function CTASection() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto px-4 md:px-8 mb-12"
        >
            <div className="neo-card bg-ink text-cream p-8 md:p-12 text-center relative overflow-hidden gradient-top-accent">
                <GridDots className="absolute inset-0 w-full h-full text-cream/5" />
                <div className="relative z-10">
                    <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight mb-4">
                        Need this stack<br /><span className="gradient-text-acid">on your team?</span>
                    </h2>
                    <p className="font-mono text-sm text-cream/80 max-w-lg mx-auto mb-8 leading-relaxed">
                        Every tool here has been used on at least one shipped project.
                        Let me put them to work on yours.
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
    );
}
