"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import LiquidGlass from "@/components/glass/LiquidGlass";
import AutoVideo from "@/components/v2/AutoVideo";
import { MEDIA } from "@/lib/media.generated";

/** The GoPilates film starts as a card and grows to fill the screen as you scroll; the facts arrive on glass. */
export default function FilmZoom() {
    const ref = useRef<HTMLElement>(null);
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
    const inset = useTransform(scrollYProgress, [0, 0.45], ["30% 20% 8% 20%", "0% 0% 0% 0%"]);
    const radius = useTransform(scrollYProgress, [0, 0.45], [40, 0]);
    const clip = useTransform([inset, radius] as never, ([i, r]: [string, number]) => `inset(${i} round ${r}px)`);
    const scale = useTransform(scrollYProgress, [0, 0.45], [1.18, 1]);
    const titleY = useTransform(scrollYProgress, [0, 0.3], ["0%", "-60%"]);
    const titleOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
    const panelOpacity = useTransform(scrollYProgress, [0.5, 0.62], [0, 1]);
    const panelY = useTransform(scrollYProgress, [0.5, 0.62], [40, 0]);
    const m = MEDIA.gopilates ?? {};

    if (reduce) {
        return (
            <section className="mx-auto max-w-[1280px] px-4 py-24 md:px-10">
                <div className="overflow-hidden rounded-[34px]">{m.trailer && <AutoVideo src={m.trailer} poster={m.poster ?? ""} label="GoPilates film" className="aspect-video w-full" />}</div>
            </section>
        );
    }

    return (
        <section ref={ref} className="relative h-[260vh]" aria-labelledby="film-title">
            <div className="sticky top-0 flex h-[100dvh] items-center justify-center overflow-hidden">
                <motion.div style={{ y: titleY, opacity: titleOpacity }} className="pointer-events-none absolute inset-x-0 top-[12%] z-10 px-5 text-center">
                    <h2 id="film-title" className="display text-[2.6rem] text-ink md:text-[4.6rem]">GoPilates, in 40 seconds.</h2>
                    <p className="mt-3 text-[17px] text-ink2">Keep scrolling. Sound is one click away.</p>
                </motion.div>
                <motion.div style={{ clipPath: clip }} className="absolute inset-0 bg-black">
                    <motion.div style={{ scale }} className="h-full w-full">
                        {m.trailer && <AutoVideo src={m.trailer} poster={m.poster ?? ""} label="GoPilates film" className="h-full w-full" />}
                    </motion.div>
                </motion.div>
                <motion.div style={{ opacity: panelOpacity, y: panelY }} className="absolute bottom-6 left-4 right-4 z-10 md:bottom-10 md:left-10 md:right-auto md:w-[460px]">
                    <LiquidGlass radius={28} bezel={18} strength={26} frost={14} tint="var(--gt-hi)" className="p-7 md:p-8">
                        <p className="text-[13px] font-semibold text-ink2">Client app, iPhone, Apple Watch and Android</p>
                        <p className="display mt-2 text-[2.2rem] text-ink">GoPilates</p>
                        <p className="mt-3 text-[15.5px] leading-relaxed text-ink2">
                            A French-first Pilates subscription app, rated 4.4 by 208 people in France. About 16,000 lines of Swift, a native Kotlin app on Android, and an Apple Watch companion.
                        </p>
                        <Link href="/work/gopilates" className="link pointer-events-auto mt-4 inline-block">Read the case study</Link>
                    </LiquidGlass>
                </motion.div>
            </div>
        </section>
    );
}
