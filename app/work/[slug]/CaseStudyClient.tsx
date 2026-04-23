"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, type Project } from "@/lib/projects";
import { CircuitPattern, GridDots, CrossHatch } from "@/components/ui/Decorative";

export default function CaseStudyClient({ slug }: { slug: string }) {
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-cream pb-24">
            {/* Status bar */}
            <div className="w-full bg-ink border-b-[3px] border-ink py-2 px-4 md:px-8 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-acid animate-pulse-dot" />
                    <span className="font-mono text-xs font-bold text-cream/70 uppercase tracking-widest">
                        case://study-{project.id}
                    </span>
                </div>
                <span className="font-mono text-xs font-bold text-cream/60 tracking-widest uppercase">
                    {project.category}
                </span>
            </div>

            {/* Back nav */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 mt-6">
                <Link
                    href="/work"
                    className="inline-flex items-center gap-2 font-mono text-xs font-bold text-ink/40 uppercase tracking-wider hover:text-ink transition-colors group"
                >
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Work
                </Link>
            </div>

            {/* Header */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 mt-6 mb-8 md:mb-12">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/60 mb-3">
                        Project {project.id}
                    </div>
                    <h1 className="text-4xl sm:text-6xl md:text-[7rem] font-heading font-bold text-ink leading-[0.85] tracking-tighter uppercase mb-6">
                        {project.title}
                    </h1>
                    <p className="font-mono text-sm md:text-base text-ink/85 max-w-2xl leading-relaxed">
                        {project.longDescription}
                    </p>
                </motion.div>
            </section>

            {/* Metrics strip */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 mb-10 md:mb-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {project.metrics.map((m) => (
                        <motion.div
                            key={m.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="neo-card bg-ink text-cream p-4 text-center neo-glow"
                        >
                            <div className="font-heading font-bold text-2xl md:text-3xl text-acid">{m.value}</div>
                            <div className="font-mono text-xs font-bold uppercase tracking-widest mt-1 opacity-80">{m.label}</div>
                        </motion.div>
                    ))}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="neo-card bg-ink text-cream p-4 text-center neo-glow"
                    >
                        <div className="font-heading font-bold text-2xl md:text-3xl text-acid">{project.category}</div>
                        <div className="font-mono text-xs font-bold uppercase tracking-widest mt-1 opacity-80">Category</div>
                    </motion.div>
                </div>
            </section>

            {/* Problem / Solution */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 mb-10 md:mb-16">
                <div className="grid md:grid-cols-2 gap-5">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className={`neo-card ${project.color} ${project.textColor} p-6 md:p-8 h-full relative overflow-hidden`}>
                            <CircuitPattern className="absolute top-0 right-0 w-32 h-32 opacity-[0.08]" />
                            <div className="relative z-10">
                                <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] opacity-50 mb-3">The Problem</div>
                                <h3 className="font-heading font-bold text-2xl md:text-3xl uppercase tracking-tight mb-4">What Wasn&apos;t Working</h3>
                                <p className="font-mono text-sm font-bold opacity-70 leading-relaxed">
                                    {project.problem}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="neo-card bg-ink text-cream p-6 md:p-8 h-full relative overflow-hidden gradient-top-accent">
                            <GridDots className="absolute top-0 right-0 w-32 h-32 text-cream/5" />
                            <div className="relative z-10">
                                <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-cream/30 mb-3">The Solution</div>
                                <h3 className="font-heading font-bold text-2xl md:text-3xl uppercase tracking-tight mb-4">
                                    How I <span className="gradient-text-acid">Fixed It</span>
                                </h3>
                                <p className="font-mono text-sm font-bold text-cream/60 leading-relaxed">
                                    {project.solution}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 mb-10 md:mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/40 mb-2">Stack</div>
                    <h2 className="font-heading font-bold text-3xl md:text-4xl uppercase tracking-tight text-ink mb-6">Technologies Used</h2>
                    <div className="flex flex-wrap gap-3">
                        {project.tech.map((t) => (
                            <div
                                key={t}
                                className="neo-card bg-cream px-4 py-2 font-mono text-sm font-bold text-ink hover:bg-acid transition-colors"
                            >
                                {t}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Outcomes */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 mb-10 md:mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="neo-card bg-cream p-6 md:p-8 relative overflow-hidden"
                >
                    <CrossHatch className="absolute top-0 right-0 w-32 h-32 text-ink" />
                    <div className="relative z-10">
                        <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/40 mb-2">Results</div>
                        <h2 className="font-heading font-bold text-3xl md:text-4xl uppercase tracking-tight text-ink mb-6">Key Outcomes</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {project.outcomes.map((outcome, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-start gap-3"
                                >
                                    <div className="w-6 h-6 bg-acid border-[2px] border-ink flex-shrink-0 flex items-center justify-center font-mono text-xs font-bold">
                                        ✓
                                    </div>
                                    <span className="font-mono text-sm font-bold text-ink/70">{outcome}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* CTA */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12">
                <div className="neo-card bg-ink text-cream p-6 md:p-10 relative overflow-hidden gradient-top-accent">
                    <GridDots className="absolute inset-0 w-full h-full text-cream/3" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="font-heading font-bold text-2xl md:text-3xl uppercase tracking-tight mb-2">
                                Want something like this?
                            </h3>
                            <p className="font-mono text-xs font-bold text-cream/50">
                                Let&apos;s build it. I ship fast and I ship clean.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <a
                                href={project.link}
                                target="_blank" rel="noopener noreferrer"
                                className="neo-card bg-cream text-ink px-5 py-3 font-heading font-bold text-sm uppercase tracking-wider flex items-center gap-2 hover:bg-acid transition-colors group"
                            >
                                <Github size={16} />
                                View Code
                                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                            <Link
                                href="/contact"
                                className="neo-card bg-acid text-ink px-5 py-3 font-heading font-bold text-sm uppercase tracking-wider flex items-center gap-2 hover:bg-electric hover:text-cream transition-colors group"
                            >
                                Hire Me
                                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
