"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { projectCount } from "@/lib/projects";

function Count({ to, decimals = 0, suffix = "" }: { to: number; decimals?: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const seen = useInView(ref, { once: true, margin: "-80px" });
    const reduce = useReducedMotion();
    const [v, setV] = useState(to);
    useEffect(() => {
        if (!seen || reduce) return;
        const c = animate(0, to, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: setV });
        return () => c.stop();
    }, [seen, reduce, to]);
    return <span ref={ref}>{v.toFixed(decimals)}{suffix}</span>;
}

const STATS = [
    { to: projectCount, label: "projects shipped since 2020" },
    { to: 4, label: "apps on the App Store, one also on Google Play" },
    { to: 4.4, decimals: 1, suffix: "★", label: "GoPilates in France, from 208 ratings" },
    { to: 148, label: "countries where Estelle is live" },
];

export default function Numbers() {
    return (
        <section className="mx-auto max-w-[1280px] px-5 pb-24 md:px-10 md:pb-32" aria-label="In numbers">
            <div className="grid grid-cols-2 gap-x-6 gap-y-12 border-t border-hairline pt-12 md:grid-cols-4">
                {STATS.map((s, i) => (
                    <div key={s.label}>
                        <p className={`display text-[3.4rem] md:text-[5rem] ${i === 2 ? "text-accent" : "text-ink"}`}>
                            <Count to={s.to} decimals={s.decimals} suffix={s.suffix} />
                        </p>
                        <p className="mt-2 max-w-[14rem] text-[15px] leading-snug text-ink2">{s.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
