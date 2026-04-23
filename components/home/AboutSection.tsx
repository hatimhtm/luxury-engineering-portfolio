"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CrossHatch } from "@/components/ui/Decorative";
import { Github, Linkedin, Mail } from "lucide-react";

export function AboutSection() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20"
        >
            <div className="grid md:grid-cols-5 gap-5">
                <div className="md:col-span-2 neo-card bg-acid p-0 relative overflow-hidden min-h-[300px] md:min-h-[400px]">
                    <Image
                        src="/headshot.png"
                        alt="Hatim El Hassak"
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, 40vw"
                        priority
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/80 to-transparent p-6">
                        <div className="font-mono text-xs font-bold text-cream tracking-widest uppercase">Based in the Philippines · Remote worldwide</div>
                    </div>
                    <div className="absolute top-3 right-3 w-8 h-8 border-[3px] border-ink bg-acid animate-spin-slow" />
                </div>

                <div className="md:col-span-3 neo-card bg-cream p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
                    <CrossHatch className="absolute top-0 right-0 w-32 h-32 text-ink" />
                    <div className="relative z-10">
                        <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/60 mb-3">About</div>
                        <h2 className="font-heading font-bold text-3xl md:text-4xl uppercase tracking-tight text-ink mb-6 leading-tight">
                            End-to-end<br />product engineer
                        </h2>
                        <p className="font-mono text-sm md:text-base text-ink/85 leading-relaxed mb-4">
                            Tangier → Nanchang → the Philippines. Five years building products —
                            native iOS in Swift, web apps in Next.js, AI pipelines in Python —
                            most of them shipped for solo founders and small teams who needed a
                            full-stack engineer, not a committee.
                        </p>
                        <p className="font-mono text-sm md:text-base text-ink/85 leading-relaxed">
                            I own the whole loop: design choices, architecture, shipping,
                            and staying on-call after launch. I speak English, French, Arabic,
                            and Mandarin, which helps when the client&apos;s not in my time zone.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t-[3px] border-ink/10 relative z-10">
                        <a href="https://github.com/hatimhtm" target="_blank" rel="noopener noreferrer" className="neo-pill bg-ink text-cream hover:bg-acid hover:text-ink flex items-center gap-2">
                            <Github size={14} /> GitHub
                        </a>
                        <a href="https://www.linkedin.com/in/hatim-elhassak/" target="_blank" rel="noopener noreferrer" className="neo-pill bg-ink text-cream hover:bg-electric hover:text-cream flex items-center gap-2">
                            <Linkedin size={14} /> LinkedIn
                        </a>
                        <a href="mailto:hatimelhassak.official@gmail.com" className="neo-pill bg-ink text-cream hover:bg-vivid hover:text-cream flex items-center gap-2">
                            <Mail size={14} /> Email
                        </a>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
