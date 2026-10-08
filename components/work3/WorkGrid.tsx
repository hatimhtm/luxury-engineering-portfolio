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

export default function WorkGrid({ items, initialFilter = "all" }: { items: GridItem[]; initialFilter?: string }) {
    // read the filter from the address on mount too: Back reuses a cached page, so the server's value can be stale
    const [filter, setFilterState] = useState(() => {
        const valid = (f: string | null | undefined) => (f && FILTERS.some((x) => x.id === f) ? f : "all");
        if (typeof window !== "undefined") return valid(new URLSearchParams(window.location.search).get("filter"));
        return valid(initialFilter);
    });
    // the filter lives in the address, so Back from a project returns to the same view
    const setFilter = (id: string) => {
        setFilterState(id);
        window.history.replaceState(null, "", id === "all" ? "/work" : `/work?filter=${id}`);
    };
    const reduce = useReducedMotion();
    const shown = useMemo(() => (filter === "all" ? items : items.filter((i) => i.group === filter)), [filter, items]);
    const count = (id: string) => (id === "all" ? items.length : items.filter((i) => i.group === id).length);

    // big tiles for flagships, a steady rhythm for the rest
    const span = (it: GridItem, idx: number) => {
        if (filter === "all" && it.tier === "flagship") return idx % 3 === 0 ? "md:col-span-8 md:row-span-2 md:min-h-[460px]" : "md:col-span-4 md:row-span-2 md:min-h-[460px]";
        return "md:col-span-4 md:min-h-[320px]";
    };

    return (
        <LayoutGroup>
            <div className="sticky top-[80px] z-30 flex justify-center px-3 md:top-[104px] md:px-4">
                <LiquidGlass radius={999} bezel={10} strength={14} frost={12} tint="var(--gt-hi)" className="flex max-w-full items-center gap-1 overflow-x-auto p-1.5 [scrollbar-width:none]">
                    {FILTERS.map((f) => (
                        <button
                            key={f.id}
                            type="button"
                            onClick={() => setFilter(f.id)}
                            aria-pressed={filter === f.id}
                            className="relative whitespace-nowrap rounded-full px-4 py-2.5 text-[14.5px] font-semibold text-ink2 transition-colors hover:text-ink aria-pressed:text-page"
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
                            initial={reduce ? false : { opacity: 0, y: 36, filter: "blur(8px)" }}
                            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            viewport={{ once: true, amount: 0.2 }}
                            exit={reduce ? undefined : { opacity: 0, y: 12, filter: "blur(6px)", transition: { duration: 0.18 } }}
                            transition={{
                                opacity: { duration: 0.7, delay: (idx % 3) * 0.07, ease: [0.23, 1, 0.32, 1] },
                                y: { duration: 0.8, delay: (idx % 3) * 0.07, ease: [0.23, 1, 0.32, 1] },
                                filter: { duration: 0.6, delay: (idx % 3) * 0.07 },
                                layout: { type: "spring", bounce: 0.12, duration: 0.6 },
                            }}
                            className={`calm-touch ${span(it, idx)}`}
                        >
                            <Tile slug={it.slug} name={it.name} kind={it.kind} className="h-full" sizes={it.tier === "flagship" ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </LayoutGroup>
    );
}
