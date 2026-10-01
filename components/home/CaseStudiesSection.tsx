import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects, divisions } from "@/lib/projects";

/** Three flagship builds, written up as case studies: what it is, the decisions, the proof. */
const PICKS: { slug: string; kicker: string; summary: string }[] = [
    {
        slug: "gopilates",
        kicker: "iOS and watchOS, client app",
        summary:
            "A French-first Pilates subscription app, rated 4.4 from 208 ratings in France. SwiftUI by feature, SwiftData synced through CloudKit, RevenueCat entitlements, and an AI meal scan behind a server-side proxy.",
    },
    {
        slug: "practicesync",
        kicker: "Healthcare automation, client app",
        summary:
            "Books coded appointments across two clinical systems for a therapy practice, with on-device AI and a strict parser, so the model can never invent a billing code.",
    },
    {
        slug: "viralos",
        kicker: "Operations platform, client system",
        summary:
            "The control room for a portfolio of iOS apps: revenue, subscriptions, ad spend and alerts in one 63-table Postgres schema, with role-based access.",
    },
];

export function CaseStudiesSection() {
    const items = PICKS.map((pick) => {
        const project = projects.find((p) => p.slug === pick.slug)!;
        const division = divisions.find((d) => d.id === project.division)!;
        return { ...pick, project, division };
    });

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-20 reveal-up">
            <div className="flex items-end justify-between gap-4 mb-6 md:mb-8">
                <div>
                    <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight text-ink">Case studies</h2>
                    <p className="font-sans text-sm md:text-base text-ink/70 mt-2">
                        Three builds in production, written up with the decisions behind them.
                    </p>
                </div>
                <Link
                    href="/work"
                    className="font-mono text-sm font-bold uppercase tracking-wider text-ink hover:text-electric transition-colors flex items-center gap-1 group shrink-0"
                >
                    All {projects.length}
                    <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
                {items.map(({ slug, kicker, summary, project, division }) => (
                    <Link
                        key={slug}
                        href={`/work/${slug}`}
                        className="neo-card bg-cream text-ink p-6 md:p-7 flex flex-col group"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <span className={`w-3 h-3 border-[2px] border-ink ${division.color}`} aria-hidden />
                            <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink/70">{kicker}</span>
                        </div>
                        <h3 className="font-heading font-bold text-2xl md:text-3xl uppercase tracking-tight mb-3">{project.title}</h3>
                        <p className="font-sans text-sm leading-relaxed text-ink/85 mb-6">{summary}</p>
                        <dl className="grid grid-cols-3 gap-3 mt-auto pt-4 border-t-[3px] border-ink/10">
                            {project.metrics.slice(0, 3).map((metric) => (
                                <div key={metric.label}>
                                    <dt className="font-mono text-[10px] uppercase tracking-wider text-ink/60 leading-tight">{metric.label}</dt>
                                    <dd className="font-heading font-bold text-base md:text-lg leading-tight mt-1">{metric.value}</dd>
                                </div>
                            ))}
                        </dl>
                        <span className="mt-5 inline-flex items-center gap-1 font-mono text-xs font-bold uppercase tracking-wider">
                            Read the case study
                            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
