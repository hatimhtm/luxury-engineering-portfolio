"use client";

import Image from "next/image";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import { CircuitPattern } from "@/components/ui/Decorative";
import { ArrowUpRight, Smartphone, Activity, Globe, Wrench, Code2 } from "lucide-react";
import { projects, divisions, getProjectsByDivision } from "@/lib/projects";

/* Stable (non-random) bar heights so SSR and hydration match */
const BAR_HEIGHTS = [62, 38, 84, 46, 70, 32, 58, 78, 44, 66, 28, 90, 52, 40, 74, 36, 60, 82, 48, 68, 30, 72, 54, 86];

/** "TryIt · Relay · Fader +5": first few titles of a division. */
function divisionNames(id: (typeof divisions)[number]["id"], take: number): string {
    const items = getProjectsByDivision(id);
    const names = items.slice(0, take).map((p) => p.title);
    const rest = items.length - take;
    return rest > 0 ? `${names.join(" · ")} +${rest}` : names.join(" · ");
}

export function ProjectsSection() {
    const apps = getProjectsByDivision("apps");
    const live = apps.filter((p) => p.appStore);
    const rest = apps.filter((p) => !p.appStore);
    const systems = getProjectsByDivision("systems");
    const client = getProjectsByDivision("client");
    const tools = getProjectsByDivision("tools");

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20">
            <div className="flex items-end justify-between mb-6 reveal-up">
                <div>
                    <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight text-ink">The Work</h2>
                </div>
                <a href="/work" className="font-mono text-sm font-bold uppercase tracking-wider text-ink hover:text-electric transition-colors flex items-center gap-1 group">
                    View All {projects.length} <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
            </div>

            <BentoGrid className="md:auto-rows-[18rem] gap-5">
                {/* Apps: the flagship division. The tile carries the live
                    App Store ships by name, which is the proof worth showing. */}
                <BentoGridItem
                    index={0}
                    className="md:col-span-2 md:row-span-2"
                    title={`Apps · ${apps.length}`}
                    bgColor="bg-acid"
                    textColor="text-ink"
                    icon={<Smartphone size={36} className="text-ink" />}
                    href="/work#apps"
                    mediaHeader
                    header={
                        <div className="h-full flex flex-col justify-start pl-4 md:pl-6 pr-4 md:pr-6 pt-6 md:pt-7">
                            <div className="font-heading font-bold text-ink/80 text-sm uppercase tracking-[0.2em] mb-4">
                                Live on the App Store
                            </div>
                            <ul className="space-y-2.5">
                                {live.map((app) => (
                                    <li key={app.slug} className="flex items-baseline gap-3 border-b-2 border-ink/15 pb-2">
                                        <span className="font-heading font-bold text-ink text-lg md:text-2xl uppercase tracking-tight leading-none">
                                            {app.title}
                                        </span>
                                        <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-wider text-ink/70 ml-auto whitespace-nowrap">
                                            {app.category}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 pt-5 border-t-2 border-ink/15">
                                <div className="font-heading font-bold text-ink/80 text-sm uppercase tracking-[0.2em] mb-2">
                                    Also shipped
                                </div>
                                <p className="font-mono text-[11px] md:text-xs font-bold uppercase tracking-wider text-ink/70 leading-relaxed">
                                    {rest.map((p) => p.title).join(" · ")}
                                </p>
                            </div>
                        </div>
                    }
                />

                {/* 02 · AI & Systems: tall, terminal aesthetic */}
                <BentoGridItem
                    index={1}
                    className="md:col-span-1 md:row-span-2"
                    title={`AI & Systems · ${systems.length}`}
                    description={divisionNames("systems", 4)}
                    bgColor="bg-electric"
                    textColor="text-cream"
                    icon={<Activity size={36} className="text-cream" />}
                    href="/work#systems"
                    header={
                        <div className="h-full flex flex-col justify-center space-y-3 font-mono text-sm font-bold pl-3 border-l-[3px] border-cream/40 ml-4 mt-4">
                            <p className="text-cream/85">&gt; Webhook ingested.</p>
                            <p className="text-cream/85">&gt; Anomaly detected.</p>
                            <p className="text-cream/85">&gt; Appointment booked.</p>
                            <p className="text-cream/85">&gt; Slack notified.</p>
                            <p className="text-cream animate-blink">_</p>
                        </div>
                    }
                />

                {/* 03 · Client Web: real client-site capture */}
                <BentoGridItem
                    index={2}
                    className="md:col-span-1"
                    title={`Client Web · ${client.length}`}
                    description={divisionNames("client", 3)}
                    bgColor="bg-hotpink"
                    textColor="text-cream"
                    icon={<Globe size={28} className="text-cream" />}
                    href="/work#client"
                    mediaHeader
                    header={
                        <div className="absolute inset-0 pointer-events-none">
                            <Image
                                src="/projects/nota-parfum.jpg"
                                alt="Nota Parfum: client site"
                                fill
                                className="object-cover object-top"
                                sizes="(max-width: 768px) 100vw, 33vw"
                                loading="lazy"
                            />
                            {/* scrim so the tile text stays legible over the capture */}
                            <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-hotpink via-hotpink/80 to-transparent" />
                        </div>
                    }
                />

                {/* 04 · Tools & Play */}
                <BentoGridItem
                    index={3}
                    className="md:col-span-1"
                    title={`Tools & Play · ${tools.length}`}
                    description={divisionNames("tools", 3)}
                    bgColor="bg-vivid"
                    textColor="text-cream"
                    icon={<Wrench size={28} className="text-cream" />}
                    href="/work#tools"
                    header={
                        <div className="absolute inset-0 pointer-events-none">
                            <CircuitPattern className="w-full h-full text-cream/15" />
                        </div>
                    }
                />

                {/* Stack link */}
                <BentoGridItem
                    index={4}
                    className="md:col-span-1"
                    title="The Stack"
                    description="Full stack · Tooling · Current focus"
                    bgColor="bg-ink"
                    textColor="text-cream"
                    icon={<Code2 size={28} className="text-cream" />}
                    href="/stack"
                    header={
                        <div className="h-full w-full flex flex-col p-4 pb-24">
                            <div className="flex justify-between items-end h-16 w-full gap-[2px] mt-auto">
                                {BAR_HEIGHTS.map((h, i) => (
                                    <div key={i} className="bg-acid/60 w-[3px]" style={{ height: `${h}%` }} />
                                ))}
                            </div>
                        </div>
                    }
                />
            </BentoGrid>
        </section>
    );
}
