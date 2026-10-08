"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowsOut, SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";

type FullVideo = HTMLVideoElement & { webkitEnterFullscreen?: () => void };
type LockScreen = ScreenOrientation & { lock?: (o: string) => Promise<void> };

/**
 * A film that plays muted while it's on screen and pauses when it isn't. Sound is opt-in.
 * Nothing is fetched until the film comes near the screen, and a phone gets the lighter copy (`phoneSrc`) when there is one.
 * `full` adds a button that opens the film full screen with sound; a wide film also turns the phone to landscape.
 */
export default function AutoVideo({
    src,
    phoneSrc,
    poster,
    label,
    className,
    silent = false,
    hover = false,
    full = false,
    corner = "top-right",
}: {
    src: string;
    phoneSrc?: string;
    poster: string;
    label: string;
    className?: string;
    silent?: boolean;
    hover?: boolean;
    full?: boolean;
    /** Where the sound and full-screen buttons sit: wherever this film keeps its own words out of. */
    corner?: "top-right" | "bottom-left";
}) {
    const ref = useRef<HTMLVideoElement>(null);
    const [muted, setMuted] = useState(true);

    useEffect(() => {
        const v = ref.current;
        if (!v) return;
        const pick = phoneSrc && window.matchMedia("(max-width: 767px)").matches ? phoneSrc : src;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        const byHover = hover && finePointer;
        const host = v.closest("a, [data-hover-host]") ?? v;
        const on = () => v.play().catch(() => {});
        const off = () => { v.pause(); v.currentTime = 0; };

        // the file is asked for when the film is about to come into view; a hidden copy (the other screen size's) never is
        const near = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                v.src = pick;
                near.disconnect();
            },
            { rootMargin: "600px 0px" },
        );
        near.observe(v);
        if (reduce) return () => near.disconnect(); // poster only; the viewer can press play

        if (byHover) {
            // on desktop, tiles play while the pointer is over them
            host.addEventListener("pointerenter", on);
            host.addEventListener("pointerleave", off);
            return () => { near.disconnect(); host.removeEventListener("pointerenter", on); host.removeEventListener("pointerleave", off); };
        }
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) v.play().catch(() => {});
                else if (document.fullscreenElement !== v) v.pause();
            },
            { threshold: 0.35 },
        );
        io.observe(v);
        // full screen shows the player's own controls, and they leave with it
        const onFull = () => { v.controls = document.fullscreenElement === v; };
        document.addEventListener("fullscreenchange", onFull);
        return () => { near.disconnect(); io.disconnect(); document.removeEventListener("fullscreenchange", onFull); };
    }, [hover, src, phoneSrc]);

    const sound = () => {
        const v = ref.current;
        if (!v) return;
        v.muted = !muted;
        setMuted(!muted);
        if (v.paused) v.play().catch(() => {});
    };

    const open = async () => {
        const v = ref.current as FullVideo | null;
        if (!v) return;
        v.muted = false;
        setMuted(false);
        try {
            if (v.requestFullscreen) {
                await v.requestFullscreen();
                if (v.videoWidth > v.videoHeight) await (screen.orientation as LockScreen | undefined)?.lock?.("landscape").catch(() => {});
            } else v.webkitEnterFullscreen?.(); // iPhone: the system player
        } catch {}
        v.play().catch(() => {});
    };

    // the same dark chip on any film and in either theme: a film can be pale or dark whatever the page is
    const chip = "grid h-10 w-10 place-items-center rounded-full bg-black/45 text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.18)] backdrop-blur-md transition-transform duration-150 ease-out active:scale-[0.94]";
    return (
        <div className={`relative ${className ?? ""}`}>
            <video ref={ref} poster={poster} muted={muted} loop playsInline preload="metadata" aria-label={label} className="h-full w-full object-cover" />
            {!silent && (
                <div className={`absolute flex gap-2 ${corner === "bottom-left" ? "bottom-4 left-4" : "right-4 top-4"}`}>
                    {full && (
                        <button type="button" onClick={open} aria-label="Watch full screen with sound" className={chip}>
                            <ArrowsOut size={18} weight="bold" />
                        </button>
                    )}
                    <button type="button" onClick={sound} aria-label={muted ? "Turn sound on" : "Turn sound off"} className={chip}>
                        {muted ? <SpeakerSlash size={18} weight="bold" /> : <SpeakerHigh size={18} weight="bold" />}
                    </button>
                </div>
            )}
        </div>
    );
}
