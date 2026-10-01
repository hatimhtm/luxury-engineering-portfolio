"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import AutoVideo from "@/components/v2/AutoVideo";
import type { Media } from "@/lib/media.generated";

/** The case study's lead visual: trailer, then edited cover, then the app icon on a soft field. */
export function LeadMedia({ m, name }: { m: Media; name: string }) {
    const reduce = useReducedMotion();
    return (
        <motion.div
            initial={reduce ? false : { clipPath: "inset(10% 8% 10% 8% round 40px)", opacity: 0.5 }}
            animate={{ clipPath: "inset(0% 0% 0% 0% round 34px)", opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="relative overflow-hidden rounded-[34px] bg-ink/5"
        >
            {m.trailer ? (
                <AutoVideo src={m.trailer} poster={m.poster ?? ""} label={`${name} trailer`} className="aspect-video w-full" />
            ) : m.cover ? (
                <div className="relative aspect-[16/10] w-full">
                    <Image src={m.cover} alt={`${name}, edited screenshot`} fill priority sizes="(min-width: 1280px) 1200px, 100vw" className={`${m.night ? "theme-day " : ""}object-cover`} />
                    {m.night && <Image src={m.night} alt="" fill priority sizes="(min-width: 1280px) 1200px, 100vw" className="theme-night object-cover" />}
                </div>
            ) : (
                <div className="field flex aspect-[16/8] w-full items-center justify-center">
                    {m.icon ? <Image src={m.icon} alt={`${name} app icon`} width={200} height={200} className="rounded-[22%] shadow-[0_30px_60px_-20px_rgb(16_22_44/0.5)]" /> : <span className="display text-[4rem] text-ink/80">{name}</span>}
                </div>
            )}
        </motion.div>
    );
}

/** More edited shots, revealed one after another as they scroll in. */
export function Gallery({ shots, name }: { shots: string[]; name: string }) {
    const reduce = useReducedMotion();
    if (!shots.length) return null;
    return (
        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            {shots.map((src, i) => (
                <motion.div
                    key={src}
                    initial={reduce ? false : { clipPath: "inset(14% 10% 14% 10% round 30px)", opacity: 0.4 }}
                    whileInView={{ clipPath: "inset(0% 0% 0% 0% round 28px)", opacity: 1 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 1, delay: (i % 2) * 0.08, ease: [0.23, 1, 0.32, 1] }}
                    className={`relative overflow-hidden rounded-[28px] ${shots.length % 2 === 1 && i === 0 ? "md:col-span-2" : ""}`}
                >
                    <div className="relative aspect-[16/10] w-full">
                        <Image src={src} alt={`${name}, screen ${i + 2}`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
