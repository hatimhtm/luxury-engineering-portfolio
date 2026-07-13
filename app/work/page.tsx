"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, Apple } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { projects, divisions, getProjectsByDivision, type Project } from "@/lib/projects";
import { CircuitPattern, GridDots } from "@/components/ui/Decorative";

/* Animations */
const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

function ProjectCard({ project }: { project: Project }) {
    return (
        <motion.div variants={fadeUp}>
            <Link href={`/work/${project.slug}`} className="block h-full group">
                <div className={`neo-card ${project.color} ${project.textColor} h-full flex flex-col justify-between min-h-[20rem] md:min-h-[22rem] relative overflow-hidden neo-glow`}>
                    {project.image && (
                        <div className="relative w-full aspect-[2/1] border-b-[3px] border-current/30 overflow-hidden bg-ink/10">
                            <Image
                                src={project.image}
                                alt={`${project.title} — screenshot`}
                                fill
                                className={`${project.imageFit === "contain" ? "object-contain" : "object-cover object-top"} group-hover:scale-[1.02] transition-transform duration-500`}
                                sizes="(max-width: 768px) 100vw, 50vw"
                                loading="lazy"
                            />
                        </div>
                    )}

                    <div className="p-6 md:p-7 flex flex-col justify-between flex-1 relative">
                        <CircuitPattern className="absolute top-0 right-0 w-32 h-32 opacity-[0.08]" />

                        {!project.image && (
                            <div className="absolute top-4 right-4 font-heading font-bold text-[4rem] md:text-[6rem] leading-none opacity-[0.08] select-none tracking-tighter">
                                {project.id}
                            </div>
                        )}

                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-3 flex-wrap">
                                <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] opacity-80">
                                    {project.category}
                                </div>
                                {project.appStore && (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-current/10 border border-current/30 font-mono text-[10px] font-bold uppercase tracking-wider">
                                        <Apple size={10} /> App Store
                                    </span>
                                )}
                                {project.liveDemo && (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-current/10 border border-current/30 font-mono text-[10px] font-bold uppercase tracking-wider">
                                        <ExternalLink size={10} /> Live
                                    </span>
                                )}
                                {project.clientWork && (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-current/10 border border-current/30 font-mono text-[10px] font-bold uppercase tracking-wider">
                                        Client
                                    </span>
                                )}
                                {project.private && (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-current/10 border border-current/30 font-mono text-[10px] font-bold uppercase tracking-wider opacity-70">
                                        Private
                                    </span>
                                )}
                            </div>
                            <h3 className="font-heading font-bold text-2xl md:text-3xl uppercase tracking-tight mb-3 group-hover:translate-x-1 transition-transform">
                                {project.title}
                            </h3>
                            <p className="font-mono text-sm opacity-90 leading-relaxed max-w-md">
                                {project.description}
                            </p>
                        </div>

                        <div className="relative z-10 mt-6">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tech.slice(0, 4).map((t) => (
                                    <span key={t} className="px-2 py-1 border-2 border-current/40 font-mono text-xs font-bold uppercase tracking-wider">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-4 flex-wrap">
                                {project.metrics.slice(0, 2).map((m) => (
                                    <div key={m.label}>
                                        <div className="font-heading font-bold text-base md:text-lg">{m.value}</div>
                                        <div className="font-mono text-xs font-bold uppercase tracking-wider opacity-80">{m.label}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="absolute bottom-0 right-0 w-10 h-10 border-[3px] border-current/30 flex items-center justify-center group-hover:bg-current/10 transition-colors">
                                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </div>
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
            <div className="w-full bg-ink border-b-[3px] border-ink py-2 px-4 md:px-8 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-acid animate-pulse-dot" />
                    <span className="font-mono text-xs font-bold text-cream/70 uppercase tracking-widest">{"/// work"}</span>
                </div>
                <span className="font-mono text-xs font-bold text-cream/60 tracking-widest uppercase">{projects.length} shipped</span>
            </div>

            {/* Header */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 mt-8 md:mt-16 mb-8 md:mb-12">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/60 mb-3">Portfolio</div>
                    <h1 className="text-4xl sm:text-6xl md:text-[7rem] font-heading font-bold text-ink leading-[0.85] tracking-tighter uppercase mb-6">
                        Selected<br />Work
                    </h1>
                    <p className="font-mono text-sm md:text-base text-ink/85 max-w-xl leading-relaxed mb-8">
                        {projects.length} shipped projects across four divisions. Every one was built
                        for a real user or client. Code is open where I could make it open;
                        private client work is described without the repo. Click any card for
                        the full case study.
                    </p>

                    {/* Division index */}
                    <div className="flex flex-wrap gap-3">
                        {divisions.map((d) => (
                            <a
                                key={d.id}
                                href={`#${d.id}`}
                                className="neo-pill bg-cream text-ink hover:bg-ink hover:text-cream"
                            >
                                <span className="opacity-60">{d.index}</span> {d.title}
                                <span className="opacity-60">· {getProjectsByDivision(d.id).length}</span>
                            </a>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Division sections */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20 space-y-14 md:space-y-24">
                {divisions.map((division) => {
                    const items = getProjectsByDivision(division.id);
                    if (items.length === 0) return null;
                    return (
                        <section key={division.id} id={division.id} className="scroll-mt-8">
                            {/* Division header */}
                            <div className="mb-6 md:mb-8">
                                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
                                    <span className="font-heading font-bold text-5xl md:text-7xl text-ink/10 leading-none tracking-tighter select-none">
                                        {division.index}
                                    </span>
                                    <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight text-ink">
                                        {division.title}
                                    </h2>
                                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-ink/60 ml-auto">
                                        {items.length} {items.length === 1 ? "project" : "projects"}
                                    </span>
                                </div>
                                <p className="font-mono text-sm text-ink/70 max-w-xl leading-relaxed border-l-[3px] border-acid pl-4">
                                    {division.tagline}
                                </p>
                            </div>

                            <motion.div
                                variants={stagger}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                className="grid md:grid-cols-2 gap-5"
                            >
                                {items.map((project) => (
                                    <ProjectCard key={project.id} project={project} />
                                ))}
                            </motion.div>
                        </section>
                    );
                })}
            </div>

            {/* GitHub CTA */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-7xl mx-auto px-4 md:px-8 mb-12"
            >
                <div className="neo-card bg-ink text-cream p-6 md:p-10 relative overflow-hidden gradient-top-accent">
                    <GridDots className="absolute inset-0 w-full h-full text-cream/5" />
                    <div className="absolute top-0 left-1/4 w-1/2 h-20 bg-acid/10 blur-3xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="font-heading font-bold text-2xl md:text-3xl uppercase tracking-tight mb-2">
                                See the source
                            </h3>
                            <p className="font-mono text-sm text-cream/80 max-w-md leading-relaxed">
                                Most of these repos are public. Fork them, read them, or hire me to build
                                something like them for you.
                            </p>
                        </div>
                        <a
                            href="https://github.com/hatimhtm"
                            target="_blank" rel="noopener noreferrer"
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
