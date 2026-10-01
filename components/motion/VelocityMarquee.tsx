"use client";

import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity, wrap } from "framer-motion";

/** A band of type that drifts on its own and speeds up, and leans, with your scroll. */
export default function VelocityMarquee({ words, baseSpeed = 2.2 }: { words: string[]; baseSpeed?: number }) {
    const reduce = useReducedMotion();
    const x = useMotionValue(0);
    const { scrollY } = useScroll();
    const v = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
    const boost = useTransform(v, [-2000, 0, 2000], [-4, 0, 4], { clamp: false });
    const skew = useTransform(v, [-2500, 0, 2500], [7, 0, -7]);
    const dir = useRef(1);
    const xPct = useTransform(x, (val) => `${wrap(-50, 0, val)}%`);

    useAnimationFrame((_, delta) => {
        if (reduce) return;
        const b = boost.get();
        if (b < 0) dir.current = -1;
        else if (b > 0) dir.current = 1;
        x.set(x.get() - dir.current * baseSpeed * (delta / 1000) * (1 + Math.abs(b)));
    });

    const row = [...words, ...words];
    return (
        <section aria-label="Tools I use" className="overflow-hidden border-y border-hairline py-8 md:py-10">
            <motion.div style={{ x: xPct, skewX: reduce ? 0 : skew }} className="flex w-max items-center gap-10 whitespace-nowrap">
                {row.map((w, i) => (
                    <span key={i} className="flex items-center gap-10">
                        <span className={`display text-[2.6rem] md:text-[4.4rem] ${i % 2 ? "outline-text" : "text-ink"}`}>{w}</span>
                        <span aria-hidden className="h-3 w-3 rounded-full bg-accent" />
                    </span>
                ))}
            </motion.div>
        </section>
    );
}
