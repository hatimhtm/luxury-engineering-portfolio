"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import LiquidGlass from "@/components/glass/LiquidGlass";
import Reveal from "@/components/v2/Reveal";
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
                <Image quality={90} src={img} alt={`${c.name}, edited screenshot`} fill sizes="62vw" className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]" />
            ) : (
                <div className="field flex h-full w-full items-center justify-center">
                    {m.icon ? <Image quality={90} src={m.icon} alt="" width={160} height={160} className="rounded-[22%] shadow-2xl" /> : <span className="display text-[4rem] text-ink/75">{c.name}</span>}
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

const two = (n: number) => String(n).padStart(2, "0");

/** On a phone a case study is a card you swipe to: the whole picture at its own shape, the words under it. */
function PhoneCard({ c }: { c: (typeof CASES)[number] }) {
    const m = MEDIA[c.slug] ?? {};
    const img = m.cover ?? m.poster;
    return (
        <Link href={`/work/${c.slug}`} data-case className="tray block w-[84vw] max-w-[400px] flex-none snap-start transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.985]">
            <div className="plate flex h-full flex-col">
                <div className="relative aspect-[16/10] w-full bg-ink/5">
                    {img ? (
                        <Image quality={90} src={img} alt={`${c.name}, edited screenshot`} fill sizes="(max-width: 767px) 84vw, 1px" className="object-cover" />
                    ) : (
                        <div className="field flex h-full w-full items-center justify-center">
                            {m.icon ? <Image quality={90} src={m.icon} alt="" width={96} height={96} className="rounded-[22%] shadow-xl" /> : <span className="display text-[2.4rem] text-ink/75">{c.name}</span>}
                        </div>
                    )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                    <p className="text-[13px] font-semibold text-ink2">{c.kind}</p>
                    <p className="display mt-1.5 text-[1.8rem] text-ink">{c.name}</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink2">{c.line}</p>
                    <span className="link mt-auto inline-flex items-center gap-1 pt-4 text-[15px]">
                        Read the case study <ArrowUpRight size={14} weight="bold" />
                    </span>
                </div>
            </div>
        </Link>
    );
}

/** The phone's rail moves under a thumb, sideways, with a counter and a line that fills as you go. */
function PhoneRail() {
    const rail = useRef<HTMLDivElement>(null);
    const [at, setAt] = useState(0);
    const { scrollXProgress } = useScroll({ container: rail });
    const fill = useTransform(scrollXProgress, [0, 1], [1 / CASES.length, 1]);

    useEffect(() => {
        const el = rail.current;
        if (!el) return;
        let raf = 0;
        const read = () => {
            raf = 0;
            const card = el.querySelector<HTMLElement>("[data-case]");
            const step = card ? card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "14") : 1;
            const end = el.scrollLeft >= el.scrollWidth - el.clientWidth - 4;
            const i = end ? CASES.length - 1 : Math.round(el.scrollLeft / step);
            setAt((p) => (p === i ? p : i));
        };
        const onScroll = () => {
            if (!raf) raf = requestAnimationFrame(read);
        };
        el.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            el.removeEventListener("scroll", onScroll);
            if (raf) cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <section className="py-20 md:hidden" aria-labelledby="rail-title-phone">
            <Reveal className="px-5">
                <h2 id="rail-title-phone" className="display text-[2.6rem] text-ink">Case studies</h2>
                <p className="mt-3 text-[16.5px] leading-relaxed text-ink2">Six projects written up: the problem, what I built, and what came of it.</p>
            </Reveal>
            <Reveal delay={0.08} className="mt-7">
                <div ref={rail} role="list" aria-label="Case studies" className="flex snap-x snap-mandatory scroll-px-4 gap-3.5 overflow-x-auto overscroll-x-contain px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {CASES.map((c) => (
                        <PhoneCard key={c.slug} c={c} />
                    ))}
                </div>
                <div className="mt-6 flex items-center gap-4 px-5">
                    <span className="text-[15px] font-semibold tabular-nums text-ink3">
                        <span className="text-ink">{two(at + 1)}</span> / {two(CASES.length)}
                    </span>
                    <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-ink/10">
                        <motion.div style={{ scaleX: fill }} className="h-full origin-left rounded-full bg-ink" />
                    </div>
                    <span className="text-[15px] font-medium text-ink3">Swipe</span>
                </div>
            </Reveal>
        </section>
    );
}

/** Case studies on a rail: on a desktop the page scrolls down and the rail moves sideways; on a phone you swipe it. */
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
            <>
                <PhoneRail />
                <section className="mx-auto hidden max-w-[1280px] overflow-x-auto px-4 py-24 md:block md:px-10">
                    <div className="flex gap-5">{CASES.map((c) => <Card key={c.slug} c={c} />)}</div>
                </section>
            </>
        );
    }
    return (
        <>
        <PhoneRail />
        <section ref={ref} className="relative hidden h-[420vh] md:block" aria-labelledby="rail-title">
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
        </>
    );
}
