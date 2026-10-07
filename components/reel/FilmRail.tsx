"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import Reveal from "@/components/v2/Reveal";
import FilmPlayer from "@/components/reel/FilmPlayer";
import type { ShortFilm } from "@/lib/films";

const two = (n: number) => String(n).padStart(2, "0");

/** Vertical films in one row you swipe through: two films or twenty, the row stays one screen tall. */
export default function FilmRail({ title, intro, films }: { title: string; intro: string; films: ShortFilm[] }) {
    const rail = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();
    const kinds = useMemo(() => Array.from(new Set(films.map((f) => f.kind))), [films]);
    const [kind, setKind] = useState("all");
    const shown = kind === "all" ? films : films.filter((f) => f.kind === kind);
    const [at, setAt] = useState(0);
    const [more, setMore] = useState({ left: false, right: false });
    const { scrollXProgress } = useScroll({ container: rail });
    const fill = useTransform(scrollXProgress, [0, 1], [1 / Math.max(1, shown.length), 1]);
    const scrolls = more.left || more.right;
    const filters = films.length >= 5 && kinds.length >= 2;

    const step = () => {
        const el = rail.current;
        const card = el?.querySelector<HTMLElement>("[data-film]");
        return el && card ? card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "16") : 1;
    };

    useEffect(() => {
        const el = rail.current;
        if (!el) return;
        let raf = 0;
        const read = () => {
            raf = 0;
            const i = Math.round(el.scrollLeft / step());
            const left = el.scrollLeft > 4;
            const right = el.scrollLeft < el.scrollWidth - el.clientWidth - 4;
            setAt((p) => (p === i ? p : i));
            setMore((p) => (p.left === left && p.right === right ? p : { left, right }));
        };
        const onScroll = () => {
            if (!raf) raf = requestAnimationFrame(read);
        };
        read();
        el.addEventListener("scroll", onScroll, { passive: true });
        const ro = new ResizeObserver(read);
        ro.observe(el);
        return () => {
            el.removeEventListener("scroll", onScroll);
            ro.disconnect();
            if (raf) cancelAnimationFrame(raf);
        };
    }, [shown.length]);

    const go = (dir: 1 | -1) => rail.current?.scrollBy({ left: dir * step(), behavior: reduce ? "auto" : "smooth" });
    const pick = (k: string) => {
        setKind(k);
        rail.current?.scrollTo({ left: 0 });
    };

    return (
        <section className="mx-auto mt-9 grid max-w-[1280px] gap-6 px-5 md:mt-20 md:grid-cols-12 md:gap-8 md:px-10">
            <div className="md:col-span-4">
                <h2 className="display text-[2.2rem] leading-[1.05] text-ink md:text-[3rem]">{title}</h2>
                <p className="mt-3 text-[17px] leading-relaxed text-ink2 md:mt-4">{intro}</p>
                {scrolls && (
                    <div className="mt-8 hidden items-center gap-3 md:flex">
                        <button type="button" onClick={() => go(-1)} disabled={!more.left} aria-label="Earlier films" className="grid h-12 w-12 place-items-center rounded-full bg-ink/[0.06] text-ink transition-[transform,background-color,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-ink/[0.1] active:scale-[0.95] disabled:opacity-35 disabled:hover:bg-ink/[0.06]">
                            <ArrowLeft size={18} weight="bold" />
                        </button>
                        <button type="button" onClick={() => go(1)} disabled={!more.right} aria-label="More films" className="grid h-12 w-12 place-items-center rounded-full bg-ink text-page transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.95] disabled:opacity-35">
                            <ArrowRight size={18} weight="bold" />
                        </button>
                        <span className="ml-2 text-[15px] font-semibold tabular-nums text-ink3">
                            <span className="text-ink">{two(more.right ? at + 1 : shown.length)}</span> / {two(shown.length)}
                        </span>
                    </div>
                )}
            </div>

            <Reveal delay={0.15} className="min-w-0 md:col-span-8">
                {filters && (
                    <div className="-mx-5 mb-5 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden">
                        {["all", ...kinds].map((k) => (
                            <button
                                key={k}
                                type="button"
                                onClick={() => pick(k)}
                                aria-pressed={kind === k}
                                className="min-h-[44px] whitespace-nowrap rounded-full bg-ink/[0.06] px-4 text-[15px] font-semibold text-ink2 transition-[transform,background-color,color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] aria-pressed:bg-ink aria-pressed:text-page"
                            >
                                {k === "all" ? "All" : k} <span className="opacity-60">{k === "all" ? films.length : films.filter((f) => f.kind === k).length}</span>
                            </button>
                        ))}
                    </div>
                )}

                <div
                    ref={rail}
                    role="list"
                    aria-label={title}
                    // on wide screens the row fades out where more films wait, instead of ending in a hard cut
                    style={{ "--fr": more.right ? "40px" : "0px" } as React.CSSProperties}
                    className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto overscroll-x-contain px-5 [scrollbar-width:none] md:mx-0 md:-mr-10 md:scroll-px-0 md:gap-6 md:px-0 md:pr-10 md:[mask-image:linear-gradient(to_right,#000_calc(100%-var(--fr)),transparent)] [&::-webkit-scrollbar]:hidden"
                >
                    {shown.map((f) => (
                        <div key={f.slug} data-film role="listitem" className="w-[74vw] max-w-[330px] shrink-0 snap-start md:w-[292px]">
                            <div className="tray">
                                <div className="plate">
                                    <FilmPlayer tall src={`/work/${f.slug}.mp4`} poster={`/work/${f.slug}-poster.jpg`} label={`the film for ${f.name}`} seconds={f.seconds} />
                                </div>
                            </div>
                            <p className="mt-4 px-1.5 text-[13px] font-semibold uppercase tracking-[0.09em] text-ink3">
                                {f.kind} · {f.place}
                            </p>
                            <p className="mt-1.5 px-1.5 text-[16px] leading-relaxed text-ink2">
                                <span className="font-semibold text-ink">{f.name}.</span> {f.note}
                            </p>
                        </div>
                    ))}
                </div>

                {scrolls && (
                    <div className="mt-6 flex items-center gap-4 md:hidden">
                        <span className="text-[15px] font-semibold tabular-nums text-ink3">
                            <span className="text-ink">{two(more.right ? at + 1 : shown.length)}</span> / {two(shown.length)}
                        </span>
                        <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-ink/10">
                            <motion.div style={{ scaleX: fill }} className="h-full origin-left rounded-full bg-ink" />
                        </div>
                        <span className="text-[15px] font-medium text-ink3">Swipe</span>
                    </div>
                )}
            </Reveal>
        </section>
    );
}
