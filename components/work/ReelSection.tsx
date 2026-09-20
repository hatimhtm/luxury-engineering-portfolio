"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * A full-bleed band of the real client sites scrolling. It plays silently and
 * only while it is on screen, and reduced-motion visitors get the still.
 */
export function ReelSection() {
    const prefersReduced = useReducedMotion();
    const ref = useRef<HTMLVideoElement>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el || prefersReduced) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting);
                if (entry.isIntersecting) void el.play().catch(() => {});
                else el.pause();
            },
            { threshold: 0.25 },
        );
        io.observe(el);
        return () => io.disconnect();
    }, [prefersReduced]);

    return (
        <section className="mb-12 md:mb-20" aria-label="Recent client sites">
            <div className="border-y-[3px] border-ink bg-ink">
                {prefersReduced ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src="/reel/work-reel-poster.jpg"
                        alt="Three recent client sites: Lorani, Maison Brume and Nabil Mouzoun"
                        className="w-full block"
                    />
                ) : (
                    <video
                        ref={ref}
                        className="w-full block"
                        poster="/reel/work-reel-poster.jpg"
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        aria-label="Three recent client sites, scrolling"
                        data-playing={inView}
                    >
                        <source src="/reel/work-reel.webm" type="video/webm" />
                        <source src="/reel/work-reel.mp4" type="video/mp4" />
                    </video>
                )}
            </div>
        </section>
    );
}
