"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { ArrowUpRight, HandGrabbing } from "@phosphor-icons/react";
import LiquidGlass from "@/components/glass/LiquidGlass";
import SplitReveal from "@/components/motion/SplitReveal";
import { BOOK_CALL } from "@/lib/site";

export default function Hero() {
    const reduce = useReducedMotion();
    const box = useRef<HTMLElement>(null);
    const px = useMotionValue(0);
    const py = useMotionValue(0);
    const sx = useSpring(px, { stiffness: 50, damping: 18 });
    const sy = useSpring(py, { stiffness: 50, damping: 18 });
    const { scrollYProgress } = useScroll({ target: box, offset: ["start start", "end start"] });
    const drift = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const bgX = useTransform(sx, (v) => v * -18);
    const bgY = useTransform([sy, drift] as never, ([a, b]: number[]) => a * -12 + b);
    const bgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.2]);
    const copyY = useTransform(scrollYProgress, [0, 1], [0, -220]);
    const copyOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

    // the lens squashes along its direction of travel, like a drop of water
    const lx = useMotionValue(0);
    const ly = useMotionValue(0);
    const vx = useVelocity(lx);
    const vy = useVelocity(ly);
    const squash = useSpring(useTransform([vx, vy] as never, ([a, b]: number[]) => Math.min(0.16, Math.hypot(a, b) / 9000)), { stiffness: 300, damping: 22 });
    const scaleX = useTransform(squash, (s) => 1 + s);
    const scaleY = useTransform(squash, (s) => 1 - s * 0.8);
    const [dragged, setDragged] = useState(false);

    const onMove = (e: React.PointerEvent) => {
        if (reduce || e.pointerType !== "mouse" || !box.current) return;
        const r = box.current.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width - 0.5);
        py.set((e.clientY - r.top) / r.height - 0.5);
    };

    return (
        <section ref={box} onPointerMove={onMove} className="relative min-h-[100dvh] overflow-hidden">
            <motion.div aria-hidden style={reduce ? undefined : { x: bgX, y: bgY, scale: bgScale }} className="absolute inset-x-0 top-0 h-[58vh] md:inset-0 md:h-auto">
                {reduce ? (
                    <Image src="/work/hero-day.jpg" alt="" fill priority sizes="100vw" className="theme-day object-cover object-[80%_55%] md:object-[center_46%]" />
                ) : (
                    // a slow 3D camera drift around the devices, rendered in Blender, looping
                    <video
                        className="theme-day absolute inset-0 h-full w-full object-cover object-[80%_55%] md:object-[center_46%]"
                        src="/work/hero-loop.mp4"
                        poster="/work/hero-day.jpg"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        aria-hidden
                    />
                )}
                <Image src="/work/hero-night.jpg" alt="" fill priority sizes="100vw" className="theme-night object-cover object-[80%_55%] md:object-[center_46%]" />
            </motion.div>
            <div aria-hidden className="absolute inset-x-0 top-[32vh] h-[30vh] bg-gradient-to-b from-transparent via-page/70 to-page md:bottom-0 md:top-auto md:h-40 md:via-transparent" />
            <div aria-hidden className="hero-scrim pointer-events-none absolute inset-y-0 left-0 w-[58%] bg-gradient-to-r from-page/85 via-page/50 to-transparent" />

            <div className="relative mx-auto flex min-h-[100dvh] max-w-[1280px] flex-col justify-end px-5 pb-14 pt-[52vh] md:justify-center md:px-10 md:pb-24 md:pt-32">
                <motion.div style={reduce ? undefined : { y: copyY, opacity: copyOpacity }} className="max-w-[640px]">
                    <LiquidGlass radius={999} bezel={8} strength={10} frost={8} tint="var(--gt-mid)" className="inline-flex items-center gap-2.5 py-2 pl-3 pr-4 text-[14px] font-semibold text-ink">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60" />
                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                        </span>
                        Taking new projects for October
                    </LiquidGlass>
                    <SplitReveal as="h1" text="I build native apps for iPhone, Mac and Android." delay={0.15} className="display mt-6 text-[3rem] text-ink sm:text-[3.9rem] lg:text-[4.5rem]" />
                    <motion.p initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.7, ease: [0.23, 1, 0.32, 1] }} className="mt-6 max-w-[34rem] text-[18px] leading-relaxed text-ink2 md:text-[20px]">
                        GoPilates is rated 4.4 by 208 people in France. Hope Assistant books a therapy practice&apos;s appointments on its own. I built both.
                    </motion.p>
                    <motion.div initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.7, ease: [0.23, 1, 0.32, 1] }} className="mt-9 flex flex-wrap items-center gap-3">
                        <a href={BOOK_CALL} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
                            Book a call <span className="dot"><ArrowUpRight size={15} weight="bold" /></span>
                        </a>
                        <Link href="/work">
                            <LiquidGlass radius={999} bezel={10} strength={14} frost={6} tint="var(--gt-lo)" className="px-6 py-3.5 text-[15.5px] font-semibold text-ink transition-transform active:scale-[0.97]">
                                See the work
                            </LiquidGlass>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* A lens of liquid glass you can drag over the scene */}
            <motion.div
                drag={!reduce}
                dragConstraints={box}
                dragElastic={0.14}
                dragMomentum
                onDragStart={() => setDragged(true)}
                style={{ x: lx, y: ly, scaleX: reduce ? 1 : scaleX, scaleY: reduce ? 1 : scaleY, touchAction: "none" }}
                className="absolute right-[7%] top-[15vh] z-10 cursor-grab active:cursor-grabbing md:right-[22%] md:top-[33%]"
                aria-label="A glass lens you can drag over the picture"
                role="img"
            >
                <motion.div animate={dragged || reduce ? { y: 0 } : { y: [0, -8, 0] }} transition={dragged ? { duration: 0.3 } : { duration: 3.2, repeat: 4, ease: "easeInOut" }}>
                    <LiquidGlass radius={999} bezel={40} strength={40} magnify={0.2} frost={0} className="h-[120px] w-[120px] md:h-[200px] md:w-[200px]" />
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: dragged ? 0 : 1 }} transition={{ delay: dragged ? 0 : 1.6, duration: 0.4 }} className="pointer-events-none absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <LiquidGlass radius={999} bezel={6} strength={8} frost={8} tint="var(--gt-mid)" className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-semibold text-ink">
                        <HandGrabbing size={15} weight="bold" /> Drag the glass
                    </LiquidGlass>
                </motion.div>
            </motion.div>
        </section>
    );
}
