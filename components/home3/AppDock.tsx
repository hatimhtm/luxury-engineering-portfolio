"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";
import LiquidGlass from "@/components/glass/LiquidGlass";
import { MEDIA } from "@/lib/media.generated";

const APPS: { slug: string; name: string; where: string; full?: boolean }[] = [
    { slug: "gopilates", name: "GoPilates", where: "iPhone, Apple Watch, Android", full: true },
    { slug: "estelle", name: "Estelle", where: "iPhone", full: true },
    { slug: "tryit", name: "TryIt", where: "iPhone", full: true },
    { slug: "sunz", name: "Sunz", where: "iPhone", full: true },
    { slug: "practicesync", name: "Hope Assistant", where: "Mac", full: true },
    { slug: "relay", name: "Relay", where: "Mac" },
    { slug: "deck", name: "Deck", where: "Mac" },
    { slug: "fader", name: "Fader", where: "Mac" },
    { slug: "eli", name: "Eli", where: "Mac" },
    { slug: "click2minimize", name: "Click2Minimize", where: "Mac", full: true },
    { slug: "adpulse", name: "AdPulse", where: "iPhone", full: true },
    { slug: "pause", name: "Pause", where: "Android", full: true },
];

function Icon({ app, mouseX, reduce }: { app: (typeof APPS)[number]; mouseX: MotionValue<number>; reduce: boolean }) {
    const ref = useRef<HTMLAnchorElement>(null);
    const [hover, setHover] = useState(false);
    const distance = useTransform(mouseX, (x) => {
        const r = ref.current?.getBoundingClientRect();
        return r ? x - (r.left + r.width / 2) : 9999;
    });
    const size = useSpring(useTransform(distance, [-170, 0, 170], [58, 96, 58]), { mass: 0.12, stiffness: 180, damping: 14 });
    const src = MEDIA[app.slug]?.icon;
    return (
        <motion.div style={{ width: reduce ? 58 : size, height: reduce ? 58 : size }} className="relative flex-none">
            <Link ref={ref} href={`/work/${app.slug}`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onFocus={() => setHover(true)} onBlur={() => setHover(false)} className="block h-full w-full" aria-label={`${app.name}, ${app.where}`}>
                {src && (
                    <Image src={src} alt="" fill sizes="96px" className={`object-cover ${app.full ? "rounded-[22%] shadow-[0_6px_14px_-6px_rgb(16_22_44/0.45)]" : "drop-shadow-[0_6px_10px_rgb(16_22_44/0.3)]"}`} />
                )}
            </Link>
            <motion.div initial={false} animate={{ opacity: hover ? 1 : 0, y: hover ? 0 : 6 }} transition={{ duration: 0.18 }} className="pointer-events-none absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <LiquidGlass radius={999} bezel={6} strength={8} frost={10} tint="var(--gt-hi)" className="px-3 py-1.5 text-center">
                    <span className="block text-[13px] font-bold leading-tight text-ink">{app.name}</span>
                    <span className="block text-[11px] leading-tight text-ink2">{app.where}</span>
                </LiquidGlass>
            </motion.div>
        </motion.div>
    );
}

/** The apps, in a dock you can run your cursor along, like the one on a Mac. */
export default function AppDock() {
    const reduce = Boolean(useReducedMotion());
    const mouseX = useMotionValue(Infinity);
    return (
        <section className="relative overflow-hidden py-24 md:py-32" aria-labelledby="dock-title">
            <div className="mx-auto max-w-[1280px] px-5 md:px-10">
                <h2 id="dock-title" className="display max-w-3xl text-[2.6rem] text-ink md:text-[4rem]">Twelve apps, on iPhone, Mac and Android.</h2>
                <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-ink2">Run your cursor along the dock. Click one to see how it was built.</p>
            </div>
            <div className="relative mt-14 overflow-x-auto px-5 pb-10 pt-16 [scrollbar-width:none] md:overflow-visible">
                {/* a wall of real app screens behind the dock, for the glass to bend */}
                <motion.div
                    aria-hidden
                    initial={reduce ? false : { opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute inset-x-0 -top-6 bottom-0 bg-[url('/work/screens-wall.jpg')] bg-[length:auto_100%] bg-center bg-repeat-x"
                    style={{ maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)" }}
                />
                <LiquidGlass
                    radius={30}
                    bezel={16}
                    strength={22}
                    frost={4}
                    tint="var(--gt-lo)"
                    onMouseMove={(e) => mouseX.set(e.clientX)}
                    onMouseLeave={() => mouseX.set(Infinity)}
                    className="relative mx-auto mt-[120px] flex w-max items-end gap-3 px-4 pb-3 pt-3"
                >
                    {APPS.map((a) => (
                        <Icon key={a.slug} app={a} mouseX={mouseX} reduce={reduce} />
                    ))}
                </LiquidGlass>
            </div>
        </section>
    );
}
