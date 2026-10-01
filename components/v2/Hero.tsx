"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { BOOK_CALL } from "@/lib/site";

export default function Hero() {
    const reduce = useReducedMotion();
    const box = useRef<HTMLElement>(null);
    const px = useMotionValue(0);
    const py = useMotionValue(0);
    const sx = useSpring(px, { stiffness: 60, damping: 20, mass: 0.6 });
    const sy = useSpring(py, { stiffness: 60, damping: 20, mass: 0.6 });
    const x = useTransform(sx, (v) => v * -14);
    const y = useTransform(sy, (v) => v * -9);

    // The photo drifts a few pixels against the pointer, as if you were leaning over the table.
    const onMove = (e: React.PointerEvent) => {
        if (reduce || e.pointerType !== "mouse" || !box.current) return;
        const r = box.current.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width - 0.5);
        py.set((e.clientY - r.top) / r.height - 0.5);
    };

    return (
        <section ref={box} onPointerMove={onMove} className="relative overflow-hidden">
            <div className="pt-20 xl:absolute xl:inset-0 xl:pt-0">
                <motion.div style={reduce ? undefined : { x, y, scale: 1.035 }} className="relative aspect-[5/4] w-full sm:aspect-[16/9] xl:aspect-auto xl:h-full">
                    <Image
                        src="/media/hero-day-v3.png"
                        alt="GoPilates, Estelle and Hope Assistant running on phones and a Mac display, on a stone table in late sun"
                        fill
                        priority
                        sizes="100vw"
                        className="theme-day object-cover object-[88%_45%] xl:object-[center_46%]"
                    />
                    <Image
                        src="/media/hero-night-v3.png"
                        alt="The same phones and display at night, their screens lighting the stone"
                        fill
                        priority
                        sizes="100vw"
                        className="theme-night object-cover object-[88%_45%] xl:object-[center_46%]"
                    />
                </motion.div>
                <div className="hero-scrim pointer-events-none absolute inset-y-0 left-0 w-[58%] bg-gradient-to-r from-page/85 via-page/50 to-transparent" />
            </div>
            <div className="relative mx-auto flex max-w-page flex-col justify-center px-6 pb-16 pt-8 md:px-10 xl:min-h-[92dvh] xl:pb-20 xl:pt-28">
                <div className="max-w-[740px]">
                    <p className="text-[15px] font-medium text-ink2 md:text-base">Hatim El Hassak, senior product engineer</p>
                    <h1 className="mt-4 max-w-[13.5em] text-[2.6rem] font-bold leading-[1.04] tracking-display md:text-[3rem] min-[1400px]:text-[3.25rem]">
                        I build native apps for iPhone, Mac and Android.
                    </h1>
                    <p className="mt-6 max-w-[33rem] text-lg leading-relaxed text-ink2 md:text-[19px]">
                        Lately GoPilates, rated 4.4 by 208 people in France, and Hope Assistant, which books a therapy practice&apos;s appointments.
                    </p>
                    <div className="mt-9 flex flex-wrap gap-3">
                        <a href={BOOK_CALL} target="_blank" rel="noopener noreferrer" className="pill pill-accent">
                            Book a call
                        </a>
                        <Link href="/work" className="pill glass glass-over text-ink">
                            See the work
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
