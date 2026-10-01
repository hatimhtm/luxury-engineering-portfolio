"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import LiquidGlass from "@/components/glass/LiquidGlass";
import AutoVideo from "@/components/v2/AutoVideo";
import { MEDIA } from "@/lib/media.generated";

/** A project tile: its trailer or edited shot, a glass caption, and a light that follows the pointer. */
export default function Tile({ slug, name, kind, className = "", priority = false, sizes = "(min-width: 768px) 50vw, 100vw" }: { slug: string; name: string; kind: string; className?: string; priority?: boolean; sizes?: string }) {
    const m = MEDIA[slug] ?? {};
    const ref = useRef<HTMLAnchorElement>(null);
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const innerY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
    const onMove = (e: React.PointerEvent) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--sx", `${e.clientX - r.left}px`);
        el.style.setProperty("--sy", `${e.clientY - r.top}px`);
    };
    return (
        <div className={`tray ${className}`}>
            <Link ref={ref} href={`/work/${slug}`} onPointerMove={onMove} className="plate spot group relative block h-full min-h-[300px] w-full">
                <motion.div
                    initial={reduce ? false : { clipPath: "inset(18% 12% 18% 12% round 28px)", opacity: 0.4 }}
                    whileInView={{ clipPath: "inset(0% 0% 0% 0% round 28px)", opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1.1, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute inset-0 overflow-hidden rounded-[28px]"
                >
                    <motion.div style={reduce ? undefined : { y: innerY, scale: 1.12 }} className="absolute inset-0">
                    {m.trailer ? (
                        <AutoVideo src={m.trailer} poster={m.poster ?? ""} label={`${name} trailer`} className="h-full w-full" hover silent />
                    ) : m.cover ? (
                        <>
                            <Image src={m.cover} alt={`${name}, edited screenshot`} fill priority={priority} sizes={sizes} className={`${m.night ? "theme-day " : ""}object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.035]`} />
                            {m.night && <Image src={m.night} alt="" fill sizes={sizes} className="theme-night object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.035]" />}
                        </>
                    ) : (
                        <div className="field flex h-full w-full items-center justify-center">
                            {m.icon ? (
                                <Image src={m.icon} alt="" width={140} height={140} className="rounded-[22%] shadow-[0_24px_48px_-16px_rgb(16_22_44/0.45)] transition-transform duration-700 group-hover:scale-105" />
                            ) : (
                                <span className="display text-[3.4rem] text-ink/80">{name}</span>
                            )}
                        </div>
                    )}
                    </motion.div>
                </motion.div>
                <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex">
                    <LiquidGlass radius={20} bezel={10} strength={14} frost={10} tint="var(--gt-mid)" className="flex items-center gap-3 py-2.5 pl-2.5 pr-4">
                        {m.icon && <Image src={m.icon} alt="" width={36} height={36} className="rounded-[22%]" />}
                        <span>
                            <span className="block text-[15px] font-bold leading-tight text-ink">{name}</span>
                            <span className="block text-[12.5px] leading-tight text-ink2">{kind}</span>
                        </span>
                    </LiquidGlass>
                </div>
            </Link>
        </div>
    );
}
