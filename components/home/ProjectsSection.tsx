"use client";

import Image from "next/image";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import { CircuitPattern } from "@/components/ui/Decorative";
import { ArrowUpRight, Smartphone, Activity, Globe, Wrench, Code2 } from "lucide-react";
import { projects, divisions, getProjectsByDivision } from "@/lib/projects";

/* Stable (non-random) bar heights so SSR and hydration match */
const BAR_HEIGHTS = [62, 38, 84, 46, 70, 32, 58, 78, 44, 66, 28, 90, 52, 40, 74, 36, 60, 82, 48, 68, 30, 72, 54, 86];

/** "TryIt · Relay · Fader +5" — first few titles of a division. */
function divisionNames(id: (typeof divisions)[number]["id"], take: number): string {
    const items = getProjectsByDivision(id);
    const names = items.slice(0, take).map((p) => p.title);
    const rest = items.length - take;
    return rest > 0 ? `${names.join(" · ")} +${rest}` : names.join(" · ");
}

export function ProjectsSection() {
    const apps = getProjectsByDivision("apps");
    const systems = getProjectsByDivision("systems");
    const client = getProjectsByDivision("client");
    const tools = getProjectsByDivision("tools");

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20">
            <div className="flex items-end justify-between mb-6 reveal-up">
                <div>
                    <div className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink/60 mb-2">Four divisions · {projects.length} shipped</div>
                    <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight text-ink">The Work</h2>
                </div>
                <a href="/work" className="font-mono text-sm font-bold uppercase tracking-wider text-ink hover:text-electric transition-colors flex items-center gap-1 group">
                    View All {projects.length} <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
            </div>

            <BentoGrid className="md:auto-rows-[18rem] gap-5">
                {/* 01 · Apps — flagship division, real App Store screenshot */}
                <BentoGridItem
                    index={0}
                    className="md:col-span-2 md:row-span-2"
                    title={`01 / Apps · ${apps.length}`}
                    description={divisionNames("apps", 6)}
                    bgColor="bg-acid"
                    textColor="text-ink"
                    icon={<Smartphone size={36} className="text-ink" />}
                    href="/work#apps"
                    mediaHeader
                    header={
                        <div className="absolute inset-0 pointer-events-none">
                            <span className="absolute left-6 top-6 text-[5rem] md:text-[9rem] font-heading font-bold tracking-tighter text-ink/10 leading-none select-none">
                                APPS
                            </span>
                            <div className="absolute right-6 md:right-12 top-8 bottom-24 w-[38%] max-w-[240px] border-[3px] border-ink shadow-neo overflow-hidden bg-ink hidden sm:block">
                                <Image
                                    src="/projects/tryit-1.jpg"
                                    alt="TryIt on the App Store"
                                    fill
                                    className="object-cover object-top"
                                    sizes="240px"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    }
                />

                {/* 02 · AI & Systems — tall, terminal aesthetic */}
                <BentoGridItem
                    index={1}
                    className="md:col-span-1 md:row-span-2"
                    title={`02 / AI & Systems · ${systems.length}`}
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

                {/* 03 · Client Web — real client-site capture */}
                <BentoGridItem
                    index={2}
                    className="md:col-span-1"
                    title={`03 / Client Web · ${client.length}`}
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
                                alt="Nota Parfum — client site"
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
                    title={`04 / Tools & Play · ${tools.length}`}
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
                    title="The Arsenal"
                    description="Full stack · Tooling · Current focus"
                    bgColor="bg-ink"
                    textColor="text-cream"
                    icon={<Code2 size={28} className="text-cream" />}
                    href="/stack"
                    header={
                        <div className="h-full w-full flex flex-col p-4 pb-24">
                            <div className="font-mono text-xs font-bold text-cream/60 text-right tracking-widest uppercase">{"/// stack index"}</div>
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
