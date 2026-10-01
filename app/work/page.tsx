import type { Metadata } from "next";
import Link from "next/link";
import { flagships, kindOf, projects, tierOf, type Project } from "@/lib/projects";
import ProjectMedia, { hasMedia } from "@/components/v2/ProjectMedia";
import Reveal from "@/components/v2/Reveal";

export const metadata: Metadata = {
    title: "Work",
    description: "Every project Hatim El Hassak has shipped since 2020, the larger ones written up as case studies.",
};

function Facts({ p }: { p: Project }) {
    return (
        <dl className="mt-5 flex flex-wrap gap-x-7 gap-y-3">
            {p.metrics.slice(0, 3).map((m) => (
                <div key={m.label}>
                    <dt className="text-[13px] text-ink3">{m.label}</dt>
                    <dd className="text-[17px] font-bold tracking-[-0.01em]">{m.value}</dd>
                </div>
            ))}
        </dl>
    );
}

function Flagship({ p, wide }: { p: Project; wide: boolean }) {
    const media = hasMedia(p);
    return (
        <Link
            href={`/work/${p.slug}`}
            className={`group flex h-full flex-col overflow-hidden rounded-[28px] border border-hairline ${media ? "bg-raised" : "bg-accent/[0.06] ring-1 ring-inset ring-accent/10"}`}
        >
            {media && <ProjectMedia project={p} sizes={wide ? "(min-width: 768px) 58vw, 100vw" : "(min-width: 768px) 42vw, 100vw"} />}
            <div className="flex flex-1 flex-col p-7 md:p-8">
                <p className="text-sm font-medium text-ink3">{kindOf(p)}</p>
                <h3 className="mt-2 text-[1.7rem] font-bold tracking-title transition-colors group-hover:text-accent">{p.title}</h3>
                <p className="mt-2 max-w-2xl text-[16px] leading-relaxed text-ink2">{p.description}</p>
                <div className="mt-auto">
                    <Facts p={p} />
                </div>
            </div>
        </Link>
    );
}

export default function WorkPage() {
    const by = (slug: string) => flagships.find((p) => p.slug === slug)!;
    const placed = new Set(["gopilates", "practicesync", "estelle", "viralos", "cloneos"]);
    const rest = flagships.filter((p) => !placed.has(p.slug));
    const shown = new Set(flagships.map((p) => p.slug));
    const sites = projects.filter((p) => !shown.has(p.slug) && p.division === "client" && hasMedia(p));
    const notable = projects.filter((p) => !shown.has(p.slug) && !sites.includes(p) && tierOf(p.slug) !== "small");
    const small = projects.filter((p) => !shown.has(p.slug) && !sites.includes(p) && tierOf(p.slug) === "small");

    return (
        <div className="mx-auto max-w-page px-4 pt-32 md:px-10 md:pt-40">
            <header className="px-2">
                <h1 className="text-[2.8rem] font-bold leading-[1.02] tracking-display md:text-[4rem]">Work</h1>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink2">
                    {projects.length} projects since 2020. The ones that matter most come first, each with a case study.
                </p>
            </header>

            {/* With pictures: two up, then Estelle's film beside two text tiles, then the rest two by two. */}
            <div className="mt-12 grid gap-4 md:grid-cols-12 md:gap-5">
                <Reveal className="md:col-span-7"><Flagship p={by("gopilates")} wide /></Reveal>
                <Reveal className="md:col-span-5" delay={0.05}><Flagship p={by("practicesync")} wide={false} /></Reveal>
                <Reveal className="md:col-span-7"><Flagship p={by("estelle")} wide /></Reveal>
                <div className="grid gap-4 md:col-span-5 md:gap-5">
                    <Reveal delay={0.05}><Flagship p={by("viralos")} wide={false} /></Reveal>
                    <Reveal delay={0.08}><Flagship p={by("cloneos")} wide={false} /></Reveal>
                </div>
                {rest.map((p, i) => (
                    <Reveal key={p.slug} className="md:col-span-6" delay={(i % 2) * 0.05}>
                        <Flagship p={p} wide={false} />
                    </Reveal>
                ))}
            </div>

            <section className="mt-28 px-2" aria-labelledby="sites-title">
                <Reveal>
                    <h2 id="sites-title" className="text-[2.2rem] font-bold tracking-title md:text-[2.7rem]">Websites for clients</h2>
                </Reveal>
                <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                    {sites.map((p, i) => (
                        <Reveal key={p.slug} delay={(i % 3) * 0.04}>
                            <Link href={`/work/${p.slug}`} className="group block">
                                <div className="overflow-hidden rounded-[22px] border border-hairline">
                                    <ProjectMedia project={p} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="transition-transform duration-700 ease-out group-hover:scale-[1.02]" />
                                </div>
                                <h3 className="mt-4 text-[1.25rem] font-bold tracking-title transition-colors group-hover:text-accent">{p.title}</h3>
                                <p className="mt-1 line-clamp-2 text-[15px] leading-relaxed text-ink2">{p.description}</p>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </section>

            <section className="mt-28 px-2" aria-labelledby="other-title">
                <Reveal>
                    <h2 id="other-title" className="text-[2.2rem] font-bold tracking-title md:text-[2.7rem]">Other builds</h2>
                </Reveal>
                <div className="mt-8 grid gap-x-16 gap-y-9 md:grid-cols-2">
                    {notable.map((p, i) => (
                        <Reveal key={p.slug} delay={(i % 2) * 0.04}>
                            <Link href={`/work/${p.slug}`} className="group block">
                                <p className="text-sm font-medium text-ink3">{kindOf(p)}</p>
                                <h3 className="mt-1 text-[1.4rem] font-bold tracking-title transition-colors group-hover:text-accent">{p.title}</h3>
                                <p className="mt-1 text-[15.5px] leading-relaxed text-ink2">{p.description}</p>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </section>

            <section className="mt-28 px-2" aria-labelledby="small-title">
                <Reveal>
                    <h2 id="small-title" className="text-[1.6rem] font-bold tracking-title">Smaller things</h2>
                </Reveal>
                <ul className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
                    {small.map((p) => (
                        <li key={p.slug}>
                            <Link href={`/work/${p.slug}`} className="group block">
                                <span className="font-bold transition-colors group-hover:text-accent">{p.title}</span>
                                <span className="block line-clamp-2 text-[14.5px] leading-relaxed text-ink3">{p.description}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
