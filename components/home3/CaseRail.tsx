"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import LiquidGlass from "@/components/glass/LiquidGlass";
import { MEDIA } from "@/lib/media.generated";

const CASES = [
    { slug: "practicesync", name: "Hope Assistant", kind: "Healthcare automation, Mac", line: "Books a therapy practice's appointments across two clinical systems. Its on-device AI can't invent a billing code." },
    { slug: "viralos", name: "Viral OS", kind: "Operations platform, web", line: "Revenue, subscriptions, ad spend and alerts for a studio of iOS apps, in one schema of 63 tables." },
    { slug: "cloneos", name: "CloneOS", kind: "AI pipeline, web", line: "One reference post in, on-brand visuals out: Gemini plus three image models, under a dollar a post." },
    { slug: "estelle", name: "Estelle", kind: "My own app, iPhone", line: "Designed, built, priced and published alone. Eleven days from decision to the App Store." },
    { slug: "leadsniper", name: "LeadSniper", kind: "Lead engine, open source", line: "Finds businesses, audits their sites with Playwright, scores 23 signals and drafts the outreach." },
    { slug: "studioos", name: "StudioOS", kind: "My studio's platform", line: "Analytics and an AI content pipeline over one database, with 1,550 unit tests." },
];

function Card({ c }: { c: (typeof CASES)[number] }) {
    const m = MEDIA[c.slug] ?? {};
    const img = m.cover ?? m.poster;
    return (
        <Link href={`/work/${c.slug}`} className="group relative block h-[64vh] min-h-[420px] w-[78vw] max-w-[860px] flex-none overflow-hidden rounded-[34px] bg-ink/5 md:w-[62vw]">
            {img ? (
                <Image src={img} alt={`${c.name}, edited screenshot`} fill sizes="62vw" className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]" />
            ) : (
                <div className="field flex h-full w-full items-center justify-center">
                    {m.icon ? <Image src={m.icon} alt="" width={160} height={160} className="rounded-[22%] shadow-2xl" /> : <span className="display text-[4rem] text-ink/75">{c.name}</span>}
                </div>
            )}
            <div className="absolute bottom-5 left-5 right-5 md:right-auto md:w-[420px]">
                <LiquidGlass radius={24} bezel={14} strength={20} frost={14} tint="var(--gt-hi)" className="p-6">
                    <p className="text-[13px] font-semibold text-ink2">{c.kind}</p>
                    <p className="display mt-1 text-[2rem] text-ink">{c.name}</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink2">{c.line}</p>
                </LiquidGlass>
            </div>
        </Link>
    );
}

/** Case studies on a rail: the page scrolls down, the rail moves sideways. */
export default function CaseRail() {
    const ref = useRef<HTMLElement>(null);
    const track = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
    const x = useTransform(scrollYProgress, (p) => {
        const el = track.current;
        if (!el) return 0;
        const travel = el.scrollWidth - window.innerWidth;
        return -Math.max(0, travel) * Math.min(1, Math.max(0, (p - 0.05) / 0.9));
    });

    if (reduce) {
        return (
            <section className="mx-auto max-w-[1280px] overflow-x-auto px-4 py-24 md:px-10">
                <div className="flex gap-5">{CASES.map((c) => <Card key={c.slug} c={c} />)}</div>
            </section>
        );
    }
    return (
        <section ref={ref} className="relative h-[420vh]" aria-labelledby="rail-title">
            <div className="sticky top-0 flex h-[100dvh] flex-col justify-center overflow-hidden">
                <div className="mx-auto mb-8 w-full max-w-[1280px] px-5 md:px-10">
                    <h2 id="rail-title" className="display text-[2.6rem] text-ink md:text-[4.2rem]">Case studies</h2>
                </div>
                <motion.div ref={track} style={{ x }} className="flex w-max gap-6 pl-5 pr-[10vw] md:pl-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))]">
                    {CASES.map((c) => (
                        <Card key={c.slug} c={c} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
