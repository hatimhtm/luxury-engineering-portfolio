"use client";

import { useEffect, useRef, useState } from "react";
import { SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";

/** A film that plays muted while it's on screen and pauses when it isn't. Sound is opt-in. */
export default function AutoVideo({ src, poster, label, className, silent = false, hover = false }: { src: string; poster: string; label: string; className?: string; silent?: boolean; hover?: boolean }) {
    const ref = useRef<HTMLVideoElement>(null);
    const [muted, setMuted] = useState(true);

    useEffect(() => {
        const v = ref.current;
        if (!v) return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) return; // poster only; the viewer can press play
        const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        if (hover && finePointer) {
            // on desktop, tiles play while the pointer is over them
            const host = v.closest("a, [data-hover-host]") ?? v;
            const on = () => v.play().catch(() => {});
            const off = () => { v.pause(); v.currentTime = 0; };
            host.addEventListener("pointerenter", on);
            host.addEventListener("pointerleave", off);
            return () => { host.removeEventListener("pointerenter", on); host.removeEventListener("pointerleave", off); };
        }
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) v.play().catch(() => {});
                else v.pause();
            },
            { threshold: 0.35 },
        );
        io.observe(v);
        return () => io.disconnect();
    }, [hover]);

    return (
        <div className={`relative ${className ?? ""}`}>
            <video
                ref={ref}
                src={src}
                poster={poster}
                muted={muted}
                loop
                playsInline
                preload="metadata"
                aria-label={label}
                className="h-full w-full object-cover"
            />
            {!silent && (
            <button
                type="button"
                onClick={() => {
                    const v = ref.current;
                    if (!v) return;
                    v.muted = !muted;
                    setMuted(!muted);
                    if (v.paused) v.play().catch(() => {});
                }}
                aria-label={muted ? "Turn sound on" : "Turn sound off"}
                className="glass absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full text-ink"
            >
                {muted ? <SpeakerSlash size={18} weight="bold" /> : <SpeakerHigh size={18} weight="bold" />}
            </button>
            )}
        </div>
    );
}
