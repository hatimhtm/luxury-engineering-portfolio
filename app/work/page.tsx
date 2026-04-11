"use client";

import { StatusBar } from "@/components/ui/StatusBar";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { projects } from "@/lib/projects";
import { CircuitPattern, GridDots } from "@/components/ui/Decorative";

/* ─── Stagger ─── */
const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

/* ─── Project Card ─── */
function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div ref={ref} variants={fadeUp}>
            <Link href={`/work/${project.slug}`} className="block h-full group">
                <div className={`neo-card ${project.color} ${project.textColor} p-6 md:p-8 h-full flex flex-col justify-between min-h-[22rem] md:min-h-[24rem] relative overflow-hidden neo-glow`}>
                    {/* Background accent */}
                    <CircuitPattern className="absolute top-0 right-0 w-32 h-32 opacity-[0.06]" />

                    {/* ID overlay */}
                    <div className="absolute top-4 right-4 font-heading font-bold text-[4rem] md:text-[6rem] leading-none opacity-[0.06] select-none tracking-tighter">
                        {project.id}
                    </div>

                    {/* Top */}
                    <div className="relative z-10">
                        <div className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.2em] opacity-50 mb-3">
                            {project.category}
                        </div>
                        <h3 className="font-heading font-bold text-2xl md:text-3xl uppercase tracking-tight mb-3 group-hover:translate-x-1 transition-transform">
                            {project.title}
                        </h3>
                        <p className="font-mono text-sm font-bold opacity-70 leading-relaxed max-w-md">
                            {project.description}
                        </p>
                    </div>

                    {/* Bottom */}
                    <div className="relative z-10 mt-6">
                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tech.slice(0, 4).map((t) => (
                                <span key={t} className="px-2 py-1 border-2 border-current/30 font-mono text-[0.6rem] font-bold uppercase tracking-wider">
                                    {t}
                                </span>
                            ))}
                        </div>

                        {/* Metrics */}
                        <div className="flex gap-4">
                            {project.metrics.map((m) => (
                                <div key={m.label}>
                                    <div className="font-heading font-bold text-lg">{m.value}</div>
                                    <div className="font-mono text-[0.5rem] font-bold uppercase tracking-wider opacity-50">{m.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Arrow */}
                        <div className="absolute bottom-0 right-0 w-10 h-10 border-[3px] border-current/20 flex items-center justify-center group-hover:bg-current/10 transition-colors">
                            <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export default function WorkPage() {
    return (
        <div className="min-h-screen bg-cream pb-24">

            {/* Status bar */}
            <StatusBar leftLabel="system://projects" rightLabel={`${projects.length} DEPLOYED`} />

            {/* Header */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 mt-8 md:mt-16 mb-8 md:mb-12">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/40 mb-3">Portfolio</div>
                    <h1 className="text-4xl sm:text-6xl md:text-[7rem] font-heading font-bold text-ink leading-[0.85] tracking-tighter uppercase mb-6">
                        Selected<br />Work
                    </h1>
                    <p className="font-mono text-sm md:text-base font-bold text-ink/60 max-w-lg leading-relaxed">
                        Every project here was shipped to production. No prototypes, no side experiments —
                        real code solving real problems. Click any card to see the full case study.
                    </p>
                </motion.div>
            </section>

            {/* ══════════════════════════════════════
                PROJECT CARDS
               ══════════════════════════════════════ */}
            <motion.section
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20"
            >
                <div className="grid md:grid-cols-2 gap-5">
                    {projects.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} />
                    ))}
                </div>
            </motion.section>

            {/* ══════════════════════════════════════
                GITHUB CTA
               ══════════════════════════════════════ */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-7xl mx-auto px-4 md:px-8 mb-12"
            >
                <div className="neo-card bg-ink text-cream p-6 md:p-10 relative overflow-hidden gradient-top-accent">
                    <GridDots className="absolute inset-0 w-full h-full text-cream/3" />
                    <div className="absolute top-0 left-1/4 w-1/2 h-20 bg-acid/10 blur-3xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="font-heading font-bold text-2xl md:text-3xl uppercase tracking-tight mb-2">
                                See All My Code
                            </h3>
                            <p className="font-mono text-sm font-bold text-cream/50 max-w-md">
                                Every project is open-source. Fork it, learn from it, or hire me to build something like it for you.
                            </p>
                        </div>
                        <a
                            href="https://github.com/hatimhtm"
                            target="_blank"
                            className="neo-card bg-cream text-ink px-6 py-3 font-heading font-bold text-sm uppercase tracking-wider flex items-center gap-2 hover:bg-acid transition-colors group flex-shrink-0"
                        >
                            <Github size={18} />
                            GitHub Profile
                            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                    </div>
                </div>
            </motion.section>
        </div>
    );
}
