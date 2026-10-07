"use client";

import { useRef, useState } from "react";
import { Play } from "@phosphor-icons/react";
import { clock } from "@/lib/films";

// one film plays at a time on the page
let playing: HTMLVideoElement | null = null;

/** A film behind its poster. Nothing downloads until the viewer presses play; then it plays with sound and real controls. */
export default function FilmPlayer({ src, poster, label, seconds, tall = false }: { src: string; poster: string; label: string; seconds?: number; tall?: boolean }) {
    const ref = useRef<HTMLVideoElement>(null);
    const [started, setStarted] = useState(false);

    return (
        <div className={`relative bg-black ${tall ? "aspect-[9/16]" : "aspect-video"}`}>
            <video
                ref={ref}
                src={src}
                poster={poster}
                controls={started}
                playsInline
                preload="none"
                aria-label={label}
                onPlay={(e) => {
                    if (playing && playing !== e.currentTarget) playing.pause();
                    playing = e.currentTarget;
                }}
                className="absolute inset-0 h-full w-full object-contain"
            />
            {!started && (
                <button
                    type="button"
                    aria-label={`Play ${label}`}
                    onClick={() => {
                        setStarted(true);
                        // called inside the tap, so phones let it start with sound
                        ref.current?.play().catch(() => {});
                    }}
                    className="group absolute inset-0 grid place-items-center bg-gradient-to-t from-black/45 via-black/0 to-black/0"
                >
                    <span className={`grid place-items-center ${tall ? "h-[68px] w-[68px]" : "h-[56px] w-[56px] md:h-[68px] md:w-[68px]"} rounded-full bg-white/[0.92] text-[rgb(20,21,26)] shadow-[0_14px_34px_-10px_rgb(0_0_0/0.55),inset_0_1px_0_rgb(255_255_255/0.9)] transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-active:scale-[0.94] [@media(hover:hover)]:group-hover:scale-[1.06]`}>
                        <Play size={tall ? 24 : 22} weight="fill" className="translate-x-[2px]" />
                    </span>
                    {seconds !== undefined && (
                        <span className="absolute bottom-3.5 left-4 text-[14px] font-semibold tabular-nums text-white">{clock(seconds)}</span>
                    )}
                </button>
            )}
        </div>
    );
}
