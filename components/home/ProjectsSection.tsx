"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import { CircuitPattern } from "@/components/ui/Decorative";
import { ArrowUpRight, Smartphone, Bot, Terminal, Code2, Sparkles } from "lucide-react";

/* Stable (non-random) bar heights so SSR and hydration match,
   and the same heights show on every render */
const BAR_HEIGHTS = [62, 38, 84, 46, 70, 32, 58, 78, 44, 66, 28, 90, 52, 40, 74, 36, 60, 82, 48, 68, 30, 72, 54, 86];

export function ProjectsSection() {
    const barHeights = useMemo(() => BAR_HEIGHTS, []);

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex items-end justify-between mb-6"
            >
                <div>
                    <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/60 mb-2">Featured</div>
                    <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight text-ink">Selected Work</h2>
                </div>
                <a href="/work" className="font-mono text-sm font-bold uppercase tracking-wider text-ink hover:text-electric transition-colors flex items-center gap-1 group">
                    View All <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
            </motion.div>

            <BentoGrid className="md:auto-rows-[18rem] gap-5">
                {/* LeadSniper — featured large */}
                <BentoGridItem
                    index={0}
                    className="md:col-span-2 md:row-span-2"
                    title="LeadSniper"
                    description="Full-stack AI prospecting engine · 23-factor scoring · $0 infra"
                    bgColor="bg-acid"
                    textColor="text-ink"
                    icon={<Sparkles size={36} className="text-ink" />}
                    href="/work/leadsniper"
                    header={
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="text-[7rem] md:text-[12rem] font-heading font-bold tracking-tighter text-ink/10 leading-none select-none">AI</span>
                        </div>
                    }
                />

                {/* EchoScribe — tall */}
                <BentoGridItem
                    index={1}
                    className="md:col-span-1 md:row-span-2"
                    title="EchoScribe"
                    description="Meeting → Slack pipeline · Python · GPT"
                    bgColor="bg-hotpink"
                    textColor="text-cream"
                    icon={<Bot size={36} className="text-cream" />}
                    href="/work/echoscribe"
                    header={
                        <div className="h-full flex flex-col justify-center space-y-3 font-mono text-sm font-bold pl-3 border-l-[3px] border-cream/40 ml-4 mt-4">
                            <p className="text-cream/85">&gt; Audio transcribed.</p>
                            <p className="text-cream/85">&gt; Summary generated.</p>
                            <p className="text-cream/85">&gt; Sent to Slack.</p>
                            <p className="text-cream animate-blink">_</p>
                        </div>
                    }
                />

                {/* AG1 Dashboard */}
                <BentoGridItem
                    index={2}
                    className="md:col-span-1"
                    title="AG1 Dashboard"
                    description="Meta Ads analytics · SwiftUI Charts · iOS 17"
                    bgColor="bg-electric"
                    textColor="text-cream"
                    icon={<Smartphone size={28} className="text-cream" />}
                    href="/work/ag1-dashboard"
                    header={
                        <div className="absolute inset-0 pointer-events-none">
                            <CircuitPattern className="w-full h-full text-cream/15" />
                        </div>
                    }
                />

                {/* Rudratek Dashboard */}
                <BentoGridItem
                    index={3}
                    className="md:col-span-1"
                    title="Rudratek"
                    description="Production SaaS dashboard · Next.js 14"
                    bgColor="bg-vivid"
                    textColor="text-cream"
                    icon={<Terminal size={28} className="text-cream" />}
                    href="/work/rudratek-dashboard"
                />

                {/* Arsenal link + System status */}
                <BentoGridItem
                    index={4}
                    className="md:col-span-1"
                    title="The Arsenal"
                    description="Full stack · Tooling · Current focus"
                    bgColor="bg-ink"
                    textColor="text-cream"
                    icon={<Code2 size={28} className="text-cream" />}
                    href="/stack"
                    header={
                        <div className="h-full w-full flex flex-col justify-between p-4">
                            <div className="font-mono text-xs font-bold text-cream/60 text-right tracking-widest uppercase">SYS://882-991-X</div>
                            <div className="flex justify-between items-end h-16 w-full gap-[2px]">
                                {barHeights.map((h, i) => (
                                    <div key={i} className="bg-acid/60 w-[3px]" style={{ height: `${h}%` }} />
                                ))}
                            </div>
                            <div className="font-heading font-bold text-base text-cream uppercase tracking-tight">Arsenal Loaded</div>
                        </div>
                    }
                />
            </BentoGrid>
        </section>
    );
}
