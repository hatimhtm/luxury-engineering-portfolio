"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Ghost } from "lucide-react";
import Link from "next/link";
import { CircuitPattern, GridDots } from "@/components/ui/Decorative";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-cream flex items-center justify-center pb-24">
            <div className="max-w-2xl mx-auto px-4 text-center relative">
                <CircuitPattern className="absolute top-0 right-0 w-48 h-48 text-ink/5" />
                <GridDots className="absolute bottom-0 left-0 w-32 h-32 text-ink/5" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10"
                >
                    {/* 404 Number */}
                    <div className="font-heading font-bold text-[8rem] md:text-[12rem] text-ink/5 leading-none tracking-tighter select-none">
                        404
                    </div>

                    {/* Ghost icon */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="flex justify-center -mt-16 mb-6"
                    >
                        <div className="w-20 h-20 bg-acid border-[3px] border-ink shadow-neo flex items-center justify-center">
                            <Ghost size={36} className="text-ink" />
                        </div>
                    </motion.div>

                    <h1 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight text-ink mb-4">
                        You&apos;re Lost
                    </h1>

                    <p className="font-mono text-sm md:text-base font-bold text-ink/60 leading-relaxed mb-2 max-w-md mx-auto">
                        But so was I — from Tangier to Nanchang to Manila.
                    </p>
                    <p className="font-mono text-sm font-bold text-ink/40 leading-relaxed mb-8 max-w-md mx-auto">
                        The difference is, I always find my way. Let me help you find yours.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link
                            href="/"
                            className="neo-card bg-acid text-ink px-6 py-3 font-heading font-bold text-sm uppercase tracking-wider flex items-center gap-2 hover:bg-ink hover:text-cream transition-all group"
                        >
                            Go Home
                            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                        <Link
                            href="/contact"
                            className="neo-card bg-ink text-cream px-6 py-3 font-heading font-bold text-sm uppercase tracking-wider flex items-center gap-2 hover:bg-electric transition-colors group"
                        >
                            Let&apos;s Talk Instead
                            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                    </div>

                    {/* Easter egg whisper */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 3, duration: 1 }}
                        className="mt-12 font-mono text-[0.6rem] font-bold text-ink/15 uppercase tracking-[0.3em]"
                    >
                        {"// lord_decay was here too"}
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
}
