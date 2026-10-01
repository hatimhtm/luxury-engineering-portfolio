"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import LiquidGlass from "@/components/glass/LiquidGlass";
import Tile from "@/components/home3/Tile";

export type GridItem = { slug: string; name: string; kind: string; group: string; tier: "flagship" | "notable" | "small" };

const FILTERS = [
    { id: "all", label: "Everything" },
    { id: "apps", label: "Apps" },
    { id: "systems", label: "Systems and AI" },
    { id: "client", label: "Websites" },
    { id: "tools", label: "Tools and play" },
];

export default function WorkGrid({ items }: { items: GridItem[] }) {
    const [filter, setFilter] = useState("all");
    const reduce = useReducedMotion();
    const shown = useMemo(() => (filter === "all" ? items : items.filter((i) => i.group === filter)), [filter, items]);
    const count = (id: string) => (id === "all" ? items.length : items.filter((i) => i.group === id).length);

    // big tiles for flagships, a steady rhythm for the rest
    const span = (it: GridItem, idx: number) => {
        if (filter === "all" && it.tier === "flagship") return idx % 3 === 0 ? "md:col-span-8 md:row-span-2 min-h-[460px]" : "md:col-span-4 md:row-span-2 min-h-[460px]";
        return "md:col-span-4 min-h-[320px]";
    };

    return (
        <LayoutGroup>
            <div className="sticky top-[88px] z-30 flex justify-center px-4 md:top-[104px]">
                <LiquidGlass radius={999} bezel={10} strength={14} frost={12} tint="var(--gt-hi)" className="flex max-w-full items-center gap-1 overflow-x-auto p-1.5 [scrollbar-width:none]">
                    {FILTERS.map((f) => (
                        <button
                            key={f.id}
                            type="button"
                            onClick={() => setFilter(f.id)}
                            aria-pressed={filter === f.id}
                            className="relative whitespace-nowrap rounded-full px-4 py-2.5 text-[14.5px] font-semibold text-ink2 transition-colors hover:text-ink aria-pressed:text-white"
                        >
                            {filter === f.id && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />}
                            <span className="relative">
                                {f.label} <span className="opacity-60">{count(f.id)}</span>
                            </span>
                        </button>
                    ))}
                </LiquidGlass>
            </div>

            <motion.div layout className="mx-auto mt-10 grid max-w-[1280px] grid-flow-dense gap-4 px-4 md:grid-cols-12 md:gap-5 md:px-10">
                <AnimatePresence mode="popLayout">
                    {shown.map((it, idx) => (
                        <motion.div
                            key={it.slug}
                            layout={!reduce}
                            initial={reduce ? false : { opacity: 0, scale: 0.94, y: 24 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={reduce ? undefined : { opacity: 0, scale: 0.94, transition: { duration: 0.18 } }}
                            transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                            className={span(it, idx)}
                        >
                            <Tile slug={it.slug} name={it.name} kind={it.kind} className="h-full" sizes={it.tier === "flagship" ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </LayoutGroup>
    );
}
