"use client";

import { motion } from "framer-motion";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import { Smartphone, Bot, Shield, Terminal, Code2, ArrowUpRight } from "lucide-react";
import { CircuitPattern } from "@/components/ui/Decorative";

export default function BentoSection() {
    return (
        <>
            {/* ══════════════════════════════════════
                BENTO GRID — PROJECTS
               ══════════════════════════════════════ */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex items-end justify-between mb-6"
                >
                    <div>
                        <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/40 mb-2">Featured</div>
                        <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight text-ink">Selected Work</h2>
                    </div>
                    <a href="/work" className="font-mono text-sm font-bold uppercase tracking-wider text-ink hover:text-electric transition-colors flex items-center gap-1 group">
                        View All <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                </motion.div>

                <BentoGrid className="md:auto-rows-[18rem] gap-5">
                    {/* AG1 Dashboard */}
                    <BentoGridItem
                        index={0}
                        className="md:col-span-2 md:row-span-2"
                        title="AG1 Dashboard"
                        description="iOS 17 • SwiftUI • 60FPS Analytics"
                        bgColor="bg-electric"
                        textColor="text-cream"
                        icon={<Smartphone size={36} className="text-cream" />}
                        href="/work/ag1-dashboard"
                        header={
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="text-[8rem] md:text-[14rem] font-heading font-bold tracking-tighter text-cream/8 leading-none select-none">iOS</span>
                            </div>
                        }
                    />

                    {/* EchoScribe */}
                    <BentoGridItem
                        index={1}
                        className="md:col-span-1 md:row-span-2"
                        title="EchoScribe"
                        description="AI Agent • Python • OpenAI"
                        bgColor="bg-hotpink"
                        textColor="text-cream"
                        icon={<Bot size={36} className="text-cream" />}
                        href="/work/echoscribe"
                        header={
                            <div className="h-full flex flex-col justify-center space-y-3 font-mono text-sm font-bold pl-3 border-l-[3px] border-cream/30 ml-4 mt-4">
                                <p className="text-cream/60">&gt; Audio Transcribed.</p>
                                <p className="text-cream/60">&gt; Summary Generated.</p>
                                <p className="text-cream/60">&gt; Sent to Slack.</p>
                                <p className="text-cream animate-blink">_</p>
                            </div>
                        }
                    />

                    {/* Fortress */}
                    <BentoGridItem
                        index={2}
                        className="md:col-span-1"
                        title="Fortress"
                        description="Security CLI • Python"
                        bgColor="bg-vivid"
                        textColor="text-cream"
                        icon={<Shield size={28} className="text-cream" />}
                        href="/work/fortress"
                        header={
                            <div className="absolute inset-0 pointer-events-none">
                                <CircuitPattern className="w-full h-full text-cream/10" />
                            </div>
                        }
                    />

                    {/* The Arsenal Link */}
                    <BentoGridItem
                        index={3}
                        className="md:col-span-1"
                        title="The Arsenal"
                        description="My full tech stack"
                        bgColor="bg-acid"
                        textColor="text-ink"
                        icon={<Terminal size={28} className="text-ink" />}
                        href="/stack"
                        header={
                            <div className="absolute top-3 right-3 animate-spin-slow">
                                <Code2 size={40} className="opacity-10 text-ink" />
                            </div>
                        }
                    />

                    {/* System status filler */}
                    <BentoGridItem
                        index={4}
                        className="md:col-span-1"
                        title=""
                        description=""
                        bgColor="bg-ink"
                        header={
                            <div className="h-full w-full flex flex-col justify-between p-4">
                                <div className="font-mono text-[0.6rem] font-bold text-cream/30 text-right tracking-widest uppercase">SYS://882-991-X</div>
                                <div className="flex justify-between items-end h-16 w-full gap-[2px]">
                                    {[...Array(24)].map((_, i) => (
                                        <div key={i} className="bg-acid/50 w-[3px] transition-all duration-300" style={{ height: `${20 + Math.random() * 80}%` }} />
                                    ))}
                                </div>
                                <div className="font-heading font-bold text-base text-cream uppercase tracking-tight">System Normal</div>
                            </div>
                        }
                    />
                </BentoGrid>
            </section>

        </>
    );
}
