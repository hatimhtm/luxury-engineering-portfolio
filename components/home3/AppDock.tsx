"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
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

const BASE = 58;
const PEAK = 92;
const GAP = 12;
const PAD = 16;
// the glass is sized once for the fully magnified dock, so it never changes size (no refraction redraw, no recentering)
const DOCK_W = APPS.length * BASE + (APPS.length - 1) * GAP + 2 * PAD + 2 * (PEAK - BASE) + 40;
const DOCK_H = PEAK + 2 * 12;

function Icon({ app, index, mouseX, centers, reduce }: { app: (typeof APPS)[number]; index: number; mouseX: MotionValue<number>; centers: React.MutableRefObject<number[]>; reduce: boolean }) {
    const [hover, setHover] = useState(false);
    // distance to where the icon rests, measured once: no feedback from neighbours growing
    const distance = useTransform(mouseX, (x) => (Number.isFinite(x) && centers.current[index] !== undefined ? x - centers.current[index] : 9999));
    const target = useTransform(distance, [-180, 0, 180], [BASE, PEAK, BASE]);
    const size = useSpring(target, { stiffness: 320, damping: 32, mass: 0.25 });
    const src = MEDIA[app.slug]?.icon;
    return (
        <motion.div style={{ width: reduce ? BASE : size, height: reduce ? BASE : size }} className="relative flex-none">
            <Link
                href={`/work/${app.slug}`}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onFocus={() => setHover(true)}
                onBlur={() => setHover(false)}
                className="block h-full w-full"
                aria-label={`${app.name}, ${app.where}`}
            >
                {src && (
                    <Image src={src} alt="" fill sizes="96px" quality={95} className={`object-cover ${app.full ? "rounded-[22%] shadow-[0_6px_14px_-6px_rgb(16_22_44/0.45)]" : "drop-shadow-[0_6px_10px_rgb(16_22_44/0.3)]"}`} />
                )}
            </Link>
            <motion.div initial={false} animate={{ opacity: hover ? 1 : 0, y: hover ? 0 : 6 }} transition={{ duration: 0.16 }} className="pointer-events-none absolute -top-14 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap">
                <div className="rounded-full bg-ink px-3 py-1.5 text-center shadow-lg">
                    <span className="block text-[13px] font-bold leading-tight text-page">{app.name}</span>
                    <span className="block text-[11px] leading-tight text-page/70">{app.where}</span>
                </div>
            </motion.div>
        </motion.div>
    );
}

/**
 * The apps on a phone: laid out like a home screen, one tap each, under a row of their real screens that
 * slides sideways as the page moves. A dock twelve icons wide has no place on a screen four icons wide.
 */
function PhoneApps({ reduce }: { reduce: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const slide = useTransform(scrollYProgress, [0, 1], ["2%", "-56%"]);
    return (
        <div className="md:hidden">
            <div ref={ref} aria-hidden className="mt-9 overflow-hidden">
                <motion.div style={reduce ? undefined : { x: slide }} className="h-[236px] w-[836px] bg-[url('/work/screens-wall.webp')] bg-contain bg-left bg-no-repeat" />
            </div>
            <div className="mt-7 px-4">
                <div className="tray">
                    <ul className="plate grid grid-cols-3 gap-x-1 gap-y-6 px-3 py-7">
                        {APPS.map((a, i) => {
                            const src = MEDIA[a.slug]?.icon;
                            return (
                                <motion.li
                                    key={a.slug}
                                    initial={reduce ? false : { opacity: 0, scale: 0.86, y: 10 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.4 }}
                                    transition={{ type: "spring", duration: 0.55, bounce: 0.24, delay: (i % 3) * 0.045 + Math.floor(i / 3) * 0.05 }}
                                >
                                    <Link href={`/work/${a.slug}`} aria-label={`${a.name}, ${a.where}`} className="group flex flex-col items-center gap-2">
                                        <span className="relative block h-[64px] w-[64px] transition-transform duration-150 ease-out group-active:scale-[0.92]">
                                            {src && <Image src={src} alt="" fill sizes="64px" quality={95} className={`object-cover ${a.full ? "rounded-[22%] shadow-[0_6px_14px_-6px_rgb(16_22_44/0.45)]" : "drop-shadow-[0_6px_10px_rgb(16_22_44/0.3)]"}`} />}
                                        </span>
                                        <span className="text-center">
                                            <span className="block text-[13.5px] font-bold leading-tight text-ink">{a.name}</span>
                                            <span className="mt-0.5 block text-[12px] leading-tight text-ink3">{a.where.replace("iPhone, Apple Watch, Android", "iPhone, Android")}</span>
                                        </span>
                                    </Link>
                                </motion.li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}

/** The apps, in a dock you can run your cursor along, like the one on a Mac. */
export default function AppDock() {
    const reduce = Boolean(useReducedMotion());
    const mouseX = useMotionValue(Infinity);
    const row = useRef<HTMLDivElement>(null);
    const centers = useRef<number[]>([]);

    // measure every icon's resting centre while the dock is at rest
    const measure = useCallback(() => {
        const el = row.current;
        if (!el) return;
        const start = el.getBoundingClientRect();
        const total = APPS.length * BASE + (APPS.length - 1) * GAP;
        const left = start.left + (start.width - total) / 2;
        centers.current = APPS.map((_, i) => left + i * (BASE + GAP) + BASE / 2);
    }, []);

    return (
        <section className="relative overflow-hidden py-20 md:py-32" aria-labelledby="dock-title">
            <div className="mx-auto max-w-[1280px] px-5 md:px-10">
                <h2 id="dock-title" className="display max-w-3xl text-[2.6rem] text-ink md:text-[4rem]">Apps for iPhone, Mac and Android.</h2>
                <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-ink2">
                    Four are on the App Store, one is also on Google Play. <span className="md:hidden">Tap one to see how it was built.</span>
                    <span className="hidden md:inline">Run your cursor along the dock and click one to see how it was built.</span>
                </p>
            </div>
            <PhoneApps reduce={reduce} />
            <div className="relative mt-12 hidden px-5 pb-10 md:block">
                {/* real screens from the apps, behind the dock, for the glass to bend */}
                <motion.div
                    aria-hidden
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
                    className="relative mx-auto h-[300px] w-[1120px] max-w-none bg-[url('/work/screens-wall.webp')] bg-contain bg-center bg-no-repeat md:h-[340px] md:w-[1240px]"
                />
                <div className="relative -mt-[78px] flex justify-center">
                    <LiquidGlass
                        radius={30}
                        bezel={16}
                        strength={22}
                        frost={3}
                        tint="var(--gt-lo)"
                        onMouseEnter={(e) => {
                            measure();
                            mouseX.set(e.clientX);
                        }}
                        onMouseMove={(e) => mouseX.set(e.clientX)}
                        onMouseLeave={() => mouseX.set(Infinity)}
                        style={{ width: DOCK_W, height: DOCK_H }}
                        className="flex-none"
                    >
                        <div ref={row} className="flex h-full w-full items-end justify-center pb-3" style={{ gap: GAP }}>
                            {APPS.map((a, i) => (
                                <Icon key={a.slug} app={a} index={i} mouseX={mouseX} centers={centers} reduce={reduce} />
                            ))}
                        </div>
                    </LiquidGlass>
                </div>
            </div>
        </section>
    );
}
