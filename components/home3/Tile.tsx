"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight, Play } from "@phosphor-icons/react";
import LiquidGlass from "@/components/glass/LiquidGlass";
import AutoVideo from "@/components/v2/AutoVideo";
import { MEDIA } from "@/lib/media.generated";

/**
 * A project tile: its trailer or edited shot, a glass caption, and a light that follows the pointer.
 * On a phone the picture keeps its own shape (nothing is cropped to fill a tall box) and the caption sits under it;
 * a trailer shows as its poster with a small film mark, and plays on the project's page.
 */
export default function Tile({ slug, name, kind, className = "", priority = false, sizes = "(min-width: 768px) 50vw, 100vw" }: { slug: string; name: string; kind: string; className?: string; priority?: boolean; sizes?: string }) {
    const m = MEDIA[slug] ?? {};
    const ref = useRef<HTMLAnchorElement>(null);
    const onMove = (e: React.PointerEvent) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--sx", `${e.clientX - r.left}px`);
        el.style.setProperty("--sy", `${e.clientY - r.top}px`);
    };
    return (
        <div className={`tray ${className}`}>
            <Link ref={ref} href={`/work/${slug}`} onPointerMove={onMove} className="plate spot group relative flex h-full w-full flex-col md:block md:min-h-[300px]">
                <div className="relative aspect-[16/10] w-full overflow-hidden md:absolute md:inset-0 md:aspect-auto md:rounded-[28px]">
                    {m.trailer ? (
                        <>
                            <AutoVideo src={m.trailer} poster={m.poster ?? ""} label={`${name} trailer`} className="hidden h-full w-full md:block" hover silent />
                            {m.poster && <Image src={m.poster} alt={`${name}, a frame of its film`} fill priority={priority} sizes="(max-width: 767px) 100vw, 1px" quality={90} className="object-cover md:hidden" />}
                            <span aria-hidden className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/[0.92] text-[rgb(20,21,26)] shadow-[0_8px_20px_-8px_rgb(0_0_0/0.5)] md:hidden">
                                <Play size={14} weight="fill" className="translate-x-[1px]" />
                            </span>
                        </>
                    ) : m.cover ? (
                        <>
                            <Image src={m.cover} alt={`${name}, edited screenshot`} fill priority={priority} sizes={sizes} quality={90} className={`${m.night ? "theme-day " : ""}object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.025]`} />
                            {m.night && <Image src={m.night} alt="" fill sizes={sizes} quality={90} className="theme-night object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.025]" />}
                        </>
                    ) : (
                        <div className="field flex h-full w-full items-center justify-center">
                            {m.icon ? (
                                <Image src={m.icon} alt="" width={140} height={140} quality={95} className="w-[104px] rounded-[22%] shadow-[0_24px_48px_-16px_rgb(16_22_44/0.45)] transition-transform duration-700 group-hover:scale-105 md:w-[140px]" />
                            ) : (
                                <span className="display px-4 text-center text-[2.6rem] text-ink/80 md:text-[3.4rem]">{name}</span>
                            )}
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-3 px-4 py-3.5 md:hidden">
                    {m.icon && <Image src={m.icon} alt="" width={40} height={40} quality={95} className="rounded-[22%]" />}
                    <span className="min-w-0 flex-1">
                        <span className="block truncate text-[16px] font-bold leading-tight text-ink">{name}</span>
                        <span className="mt-0.5 block truncate text-[13.5px] leading-tight text-ink2">{kind}</span>
                    </span>
                    <ArrowUpRight size={17} weight="bold" className="flex-none text-ink3" />
                </div>
                <div className="pointer-events-none absolute bottom-4 left-4 right-4 hidden md:flex">
                    <LiquidGlass radius={20} bezel={10} strength={14} frost={10} tint="var(--gt-mid)" className="flex items-center gap-3 py-2.5 pl-2.5 pr-4">
                        {m.icon && <Image src={m.icon} alt="" width={36} height={36} quality={95} className="rounded-[22%]" />}
                        <span>
                            <span className="block text-[15px] font-bold leading-tight text-ink">{name}</span>
                            <span className="block text-[12.5px] leading-tight text-ink2">{kind}</span>
                        </span>
                    </LiquidGlass>
                </div>
            </Link>
        </div>
    );
}
