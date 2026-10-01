import type { Metadata } from "next";
import { flagships, kindOf, projects, tierOf } from "@/lib/projects";
import SplitReveal from "@/components/motion/SplitReveal";
import Reveal from "@/components/v2/Reveal";
import WorkGrid, { type GridItem } from "@/components/work3/WorkGrid";

export const metadata: Metadata = {
    title: "Work",
    description: "Every project Hatim El Hassak has shipped since 2020: apps, systems, websites and tools, the big ones with case studies.",
};

export default function WorkPage() {
    const flag = new Set(flagships.map((p) => p.slug));
    const ordered = [...flagships, ...projects.filter((p) => !flag.has(p.slug) && tierOf(p.slug) !== "small"), ...projects.filter((p) => !flag.has(p.slug) && tierOf(p.slug) === "small")];
    const items: GridItem[] = ordered.map((p) => ({ slug: p.slug, name: p.title.replace(": Manifest Affirmations", ""), kind: kindOf(p), group: p.division, tier: tierOf(p.slug) }));
    return (
        <div className="pb-24 pt-32 md:pt-40">
            <header className="mx-auto max-w-[1280px] px-5 md:px-10">
                <SplitReveal as="h1" text="Work" className="display text-[4.2rem] text-ink md:text-[8rem]" />
                <Reveal delay={0.3}>
                    <p className="mt-2 max-w-2xl text-[19px] leading-relaxed text-ink2">
                        {projects.length} projects since 2020: apps on three platforms, the systems behind them, websites for clients, and a few things built for fun. Pick one to read how it was built.
                    </p>
                </Reveal>
            </header>
            <div className="mt-12">
                <WorkGrid items={items} />
            </div>
        </div>
    );
}
