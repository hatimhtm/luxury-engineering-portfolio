"use client";

import { GridDots } from "@/components/ui/Decorative";
import { Mail, CalendarDays } from "lucide-react";

export function CtaSection() {
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12 reveal-up">
            <div className="neo-card bg-hotpink text-cream p-8 md:p-12 text-center relative overflow-hidden gradient-top-accent">
                <GridDots className="absolute inset-0 w-full h-full text-cream/5" />
                <div className="absolute top-0 left-1/4 w-1/2 h-32 bg-acid/10 blur-3xl pointer-events-none" />
                <div className="relative z-10">
                    <h2 className="font-heading font-bold text-3xl md:text-6xl uppercase tracking-tight mb-4">Have something to build?</h2>
                    <p className="font-sans text-sm md:text-base opacity-90 mb-8 max-w-xl mx-auto leading-relaxed">
                        Brief to App Store. Brief to Vercel. On tight timelines. Tell me what
                        you&apos;re building and I&apos;ll come back with a realistic plan within
                        the day, or we can talk it through on a call.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <a
                            href="https://cal.com/hatimelhassak/engineering-discovery"
                            target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-acid text-ink font-heading font-bold text-lg uppercase tracking-wider px-8 py-4 border-[3px] border-ink shadow-neo hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all hover-shake"
                        >
                            <CalendarDays size={18} /> Book a call
                        </a>
                        <a
                            href="mailto:hatimelhassak.official@gmail.com"
                            className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider underline decoration-2 underline-offset-4 hover:text-acid transition-colors"
                        >
                            <Mail size={16} /> or email me directly
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
